import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type NodeObject,
  type LinkObject,
} from "react-force-graph-2d";
import { forceCollide, forceX, forceY } from "d3-force-3d";
import type { KnowledgeNode, GraphData } from "../types";
import { inferEdgeKind, type EdgeKind } from "../constants/edgeKind";
import type { Theme } from "../hooks/useTheme";
import {
  GRAPH_COLORS_DARK,
  GRAPH_COLORS_LIGHT,
  NODE_RADIUS,
  NODE_RADIUS_HOVER,
  OPACITY,
  type NodeTypeStyle,
} from "../constants/theme";

type LinkExtra = { id: string; label: string; directed?: boolean; kind: EdgeKind };
type GraphNode = NodeObject<KnowledgeNode>;
type GraphLink = LinkObject<KnowledgeNode, LinkExtra>;

/** 被详情面板/底部抽屉遮挡的区域（屏幕像素），用于把节点偏移到可见区居中 */
export interface FocusInset {
  right?: number;
  bottom?: number;
}

export interface GraphCanvasHandle {
  /** 平滑聚焦到目标节点；inset 偏移到未被面板遮挡的可视区中心 */
  focusNode: (id: string, inset?: FocusInset) => void;
  /** 重置视角，使所有节点可见 */
  resetView: () => void;
  /** 力导向停稳后自动 fitView（展开全部等无选中场景） */
  scheduleFitView: () => void;
}

interface GraphCanvasProps {
  data: GraphData;
  theme: Theme;
  selectedId: string | null;
  hoveredId: string | null;
  /** 仍有未显示邻居的节点（画"可展开"提示环） */
  expandableIds: Set<string>;
  onSelectNode: (node: KnowledgeNode | null) => void;
  onHoverNode: (id: string | null) => void;
  /** 当前地图的类型→配色映射，找不到 type 时回退到 typeOrder[0] 对应样式 */
  typeStyles: Record<string, NodeTypeStyle>;
  /** 类型展示顺序；typeOrder[0] 作为找不到类型时的安全兜底 */
  typeOrder: string[];
  /** 各连通分量的种子节点 id；用于按「到种子的层级」做径向布局，让任意拓扑都摊成同心环 */
  seedIds: string[];
  /** 完整图谱（含未展开节点）；径向布局基于全图预计算开局槽位，保证展开/刷新时排布稳定。缺省时退化为仅用可见数据。 */
  fullData?: GraphData;
}

// 同心环步长（像素）：相邻层级之间的半径差。
const RING_STEP = 130;

/** 用户点击聚焦：单次平移动画（缩放先瞬时到位，避免 pan+zoom 两拍） */
const FOCUS_PAN_DURATION_MS = 300;

/**
 * 确定性径向树布局：以 seedIds 为根做 BFS 生成树，逐层放射到同心环上。
 *
 * 关键性质（治「刷新乱跳」）：
 *   - 纯函数、无随机：同一份数据每次、每台设备算出的坐标完全一致 → 位置=记忆锚点；
 *   - 排序键 = 父节点角度 → 节点 id 字典序：增删节点时邻居不漂移；
 *   - 生成树「骨架边优先」：先沿 hierarchy 边生长主干，再用其余边兜底连通，
 *     既让主干树清晰，又保证像 ai 这种骨架边稀疏的图也能连通铺开。
 *
 * 返回：节点 id → 画布坐标 {x, y}。
 */
/**
 * visibleIds（可选）：当前实际渲染的节点集合。
 * 传入时，BFS 树结构仍从完整 nodes/edges 建立（保证 L/R 相对顺序不变），
 * 但 computeSize 只统计可见节点——不可见节点视为 size=1（叶节点）。
 * 效果：未展开时同级节点均匀分弧；展开后只有已展开的分支动态扩张弧度。
 */
function computeRadialLayout(
  nodes: { id: string; order?: number }[],
  edges: { source: string; target: string; label: string; kind?: EdgeKind }[],
  seedIds: string[],
  ringStep = RING_STEP,
  visibleIds?: Set<string>
): Map<string, { x: number; y: number }> {
  const ids = new Set(nodes.map((n) => n.id));
  const neighbors = new Map<string, Set<string>>(); // 无向邻接（连通兜底）
  const hierChildren = new Map<string, Set<string>>(); // 有向骨架孩子（骨架边 source→target）
  for (const id of ids) {
    neighbors.set(id, new Set());
    hierChildren.set(id, new Set());
  }
  for (const e of edges) {
    if (!ids.has(e.source) || !ids.has(e.target)) continue;
    neighbors.get(e.source)!.add(e.target);
    neighbors.get(e.target)!.add(e.source);
    if (inferEdgeKind(e.label, e.kind) === "hierarchy") {
      hierChildren.get(e.source)!.add(e.target);
    }
  }

  // 邻居展开顺序：骨架孩子优先（字典序），其余邻居其次（字典序）
  const orderedNeighbors = (id: string): string[] => {
    const hier = [...(hierChildren.get(id) ?? [])].sort();
    const hierSet = new Set(hier);
    const rest = [...(neighbors.get(id) ?? [])].filter((n) => !hierSet.has(n)).sort();
    return [...hier, ...rest];
  };

  // order 值查找表：节点 id → order（用于排序优先级）
  const orderOf = new Map<string, number>();
  for (const n of nodes) if (n.order != null) orderOf.set(n.id, n.order);

  /**
   * 给一组兄弟节点排「角度顺序」：
   *   优先按 order 升序（有 order 的节点排在无 order 的前面）；
   *   无 order 的兄弟回退到关联链 DFS（保持环上相连兄弟相邻），再回退 id 字典序。
   *   纯确定性、无随机。
   */
  const orderSiblings = (kids: string[]): string[] => {
    if (kids.length <= 1) return kids.slice();

    // 分两组：有 order 的按 order 升序确定；无 order 的用原 DFS 策略
    const withOrder = kids.filter((k) => orderOf.has(k));
    const withoutOrder = kids.filter((k) => !orderOf.has(k));

    withOrder.sort((a, b) => orderOf.get(a)! - orderOf.get(b)!);

    if (withoutOrder.length === 0) return withOrder;
    if (withOrder.length === 0) {
      // 全部无 order：走原 DFS 关联链策略
      const kidSet = new Set(kids);
      const sibAdj = new Map<string, string[]>();
      for (const k of kids) {
        sibAdj.set(
          k,
          [...(neighbors.get(k) ?? [])].filter((n) => kidSet.has(n))
        );
      }
      const deg = (id: string) => sibAdj.get(id)!.length;
      const byDegThenId = (a: string, b: string) =>
        deg(a) - deg(b) || (a < b ? -1 : a > b ? 1 : 0);
      for (const k of kids) sibAdj.get(k)!.sort(byDegThenId);
      const startOrder = kids.slice().sort(byDegThenId);
      const visited = new Set<string>();
      const result: string[] = [];
      const dfs = (node: string) => {
        visited.add(node);
        result.push(node);
        for (const nb of sibAdj.get(node)!) if (!visited.has(nb)) dfs(nb);
      };
      for (const s of startOrder) if (!visited.has(s)) dfs(s);
      return result;
    }

    // 混合：有 order 的先排，无 order 的按 id 字典序追加
    withoutOrder.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return [...withOrder, ...withoutOrder];
  };

  const depth = new Map<string, number>();
  const children = new Map<string, string[]>();
  for (const id of ids) children.set(id, []);
  const roots: string[] = [];
  const seen = new Set<string>();

  const bfs = (start: string) => {
    const queue = [start];
    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      for (const nb of orderedNeighbors(cur)) {
        if (!seen.has(nb)) {
          seen.add(nb);
          depth.set(nb, (depth.get(cur) ?? 0) + 1);
          children.get(cur)!.push(nb);
          queue.push(nb);
        }
      }
    }
  };
  for (const s of seedIds) {
    if (ids.has(s) && !seen.has(s)) {
      seen.add(s);
      depth.set(s, 0);
      roots.push(s);
      bfs(s);
    }
  }
  // 兜底：未被任何 seed 覆盖的连通分量，按 id 字典序各挑一个根（理论上不应触发）
  for (const id of [...ids].sort()) {
    if (!seen.has(id)) {
      seen.add(id);
      depth.set(id, 0);
      roots.push(id);
      bfs(id);
    }
  }

  // 子树规模（post-order）：用于按子树大小给同级节点分配角度扇区
  // 若传入 visibleIds，不可见节点一律视为 size=1（叶节点），
  // 使未展开状态下同级节点均匀分弧；展开后已展开分支按实际子树动态扩张。
  const size = new Map<string, number>();
  const computeSize = (id: string): number => {
    if (visibleIds && !visibleIds.has(id)) {
      size.set(id, 1);
      return 1;
    }
    let s = 1;
    for (const c of children.get(id)!) s += computeSize(c);
    size.set(id, s);
    return s;
  };
  for (const r of roots) computeSize(r);

  // 角度分配：根层按子树规模瓜分整个圆周；每个节点把自己的扇区按子树规模再分给孩子
  const angle = new Map<string, number>();
  const assign = (id: string, a0: number, a1: number) => {
    angle.set(id, (a0 + a1) / 2);
    // 角度顺序：顺着兄弟间的关联/前置链排（而非字典序），让相连兄弟在环上相邻、减少交叉
    const kids = orderSiblings(children.get(id)!);
    if (!kids.length) return;
    const total = kids.reduce((s, k) => s + (size.get(k) ?? 1), 0);
    let cursor = a0;
    for (const k of kids) {
      const span = ((a1 - a0) * (size.get(k) ?? 1)) / total;
      assign(k, cursor, cursor + span);
      cursor += span;
    }
  };
  const rootTotal = roots.reduce((s, r) => s + (size.get(r) ?? 1), 0) || 1;
  let cursor = 0;
  for (const r of roots) {
    const span = (2 * Math.PI * (size.get(r) ?? 1)) / rootTotal;
    assign(r, cursor, cursor + span);
    cursor += span;
  }

  // 多连通分量时把各根从圆心错开一环，避免多根重叠在原点
  const rootRadius = roots.length > 1 ? ringStep * 0.85 : 0;
  const pos = new Map<string, { x: number; y: number }>();
  for (const id of ids) {
    const d = depth.get(id) ?? 0;
    const ang = angle.get(id) ?? 0;
    const r = rootRadius + d * ringStep;
    pos.set(id, { x: Math.cos(ang) * r, y: Math.sin(ang) * r });
  }
  return pos;
}

function linkEndId(end: GraphLink["source"]): string {
  if (end == null) return "";
  if (typeof end === "object") return String((end as GraphNode).id ?? "");
  return String(end);
}

export const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(
  function GraphCanvas(
    {
      data,
      theme,
      selectedId,
      hoveredId,
      expandableIds,
      onSelectNode,
      onHoverNode,
      typeStyles,
      typeOrder,
      seedIds,
      fullData,
    },
    ref
  ) {
    const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(
      undefined
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const didFitRef = useRef(false);
    const scheduleFitRef = useRef(false);
    // ── 邻接表：节点 id → 直接相邻节点 id 集合（当前可见数据）──
    const adjacency = useMemo(() => {
      const map = new Map<string, Set<string>>();
      for (const n of data.nodes) map.set(n.id, new Set());
      for (const e of data.edges) {
        map.get(e.source)?.add(e.target);
        map.get(e.target)?.add(e.source);
      }
      return map;
    }, [data]);

    // ── 确定性径向布局：BFS 树结构从全图建立（保证 L/R 相对顺序稳定），
    //   弧度大小按当前可见节点集合计算——未展开的节点视为 size=1，
    //   使默认状态下同级节点均匀分布，展开后只有已展开分支动态扩张弧度。
    const radialPositions = useMemo(() => {
      const src = fullData ?? data;
      const visibleIds = new Set(data.nodes.map((n) => n.id));
      return computeRadialLayout(src.nodes, src.edges, seedIds, RING_STEP, visibleIds);
    }, [fullData, data, seedIds]);

    // ── 构建力导向图数据：用缓存保留节点对象身份，避免渐进展开时整图重挂 ──
    //   开局位置 = computeRadialLayout 算出的确定性径向槽位（纯函数无随机 → 每次刷新
    //   形状一致、排布稳定）；但只写入初始 x/y、绝不写 fx/fy ⇒ 节点始终归力导向管，
    //   会轻晃、可拖拽（活的思维导图手感），同时因开局确定而不会乱重排。
    const nodeCacheRef = useRef(new Map<string, GraphNode>());
    const graphData = useMemo(() => {
      const cache = nodeCacheRef.current;
      const ids = new Set(data.nodes.map((n) => n.id));
      // 无径向槽位时的兜底落点：新节点从某个已定位邻居旁「长出来」
      const neighborAnchor = (id: string): { x: number; y: number } | null => {
        for (const nb of adjacency.get(id) ?? []) {
          const placed = cache.get(nb);
          if (placed && placed.x != null && placed.y != null) {
            return {
              x: placed.x + (Math.random() - 0.5) * 30,
              y: placed.y + (Math.random() - 0.5) * 30,
            };
          }
        }
        return null;
      };
      const nodes = data.nodes.map((n, i) => {
        const existing = cache.get(n.id);
        if (existing) {
          // 仅更新内容字段，保留 x/y/vx/vy 等模拟状态（不回拉、不钉死）
          existing.label = n.label;
          existing.type = n.type;
          existing.details = n.details;
          return existing;
        }
        const created = { ...n } as GraphNode;
        // 开局落点：优先确定性径向槽位 → 其次邻居旁「长出来」→ 最后黄金角铺开。
        //   全程只设 x/y，不设 fx/fy，留给力导向接管。
        const slot = radialPositions.get(n.id);
        if (slot) {
          created.x = slot.x;
          created.y = slot.y;
        } else {
          const anchor = neighborAnchor(n.id);
          if (anchor) {
            created.x = anchor.x;
            created.y = anchor.y;
          } else {
            // 首屏种子簇尚无任何已定位邻居：沿黄金角圆周铺开，避免全堆在原点炸开
            const angle = i * 2.39996;
            const radius = 60 + i * 16;
            created.x = Math.cos(angle) * radius;
            created.y = Math.sin(angle) * radius;
          }
        }
        cache.set(n.id, created);
        return created;
      });
      for (const key of [...cache.keys()]) if (!ids.has(key)) cache.delete(key);
      return {
        nodes,
        links: data.edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          directed: e.directed,
          kind: inferEdgeKind(e.label, e.kind),
        })),
      };
    }, [data, adjacency, radialPositions]);

    const nodeById = useMemo(() => {
      const map = new Map<string, KnowledgeNode>();
      for (const n of data.nodes) map.set(n.id, n);
      return map;
    }, [data]);

    // ── 容器尺寸自适应 ──
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const update = () =>
        setSize({ width: el.clientWidth, height: el.clientHeight });
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    // ── 力参数配置：可拖拽的「活」力导向 + 软锚定 ──
    //   斥力 + 连线弹簧 + 碰撞防重叠：保持「活的思维导图」手感（会晃、可拖、展开时让位）。
    //   关键：用 forceX/forceY 把每个节点往 computeRadialLayout 算好的确定性槽位「软拉」，
    //   等价于给节点拴一根很松的橡皮筋——同时锚定半径与角度（左右/上下），位置稳定成记忆锚点；
    //   拖拽时 react-force-graph 临时写 fx/fy 覆盖锚力，松手后节点会被橡皮筋慢慢拉回原位。
    //   全程不持久写 fx/fy 钉死，所以仍轻晃、可拖。锚定强度调到「晃得动但回得来」。
    //   边分两类（法五）：hierarchy 边用固定弹力维持层级间距；association 边强度为 0，
    //   纯视觉不参与位置计算，彻底消除展开时被关联边拉离槽位的问题。
    const ANCHOR_STRENGTH = 0.18;
    useEffect(() => {
      const fg = fgRef.current;
      if (!fg) return;
      const link = fg.d3Force("link") as
        | (ReturnType<NonNullable<typeof fg.d3Force>> & {
            distance?: (d: number) => unknown;
            strength?: (s: ((link: { kind?: EdgeKind }) => number) | number) => unknown;
          })
        | undefined;
      fg.d3Force("charge")?.strength(-320);
      link?.distance?.(80);
      // hierarchy 边用 0.5 弹力维持层级间距；association 边强度为 0，纯视觉不拉扯节点
      link?.strength?.((l: { kind?: EdgeKind }) =>
        l.kind === "hierarchy" ? 0.5 : 0
      );
      fg.d3Force("collide", forceCollide(NODE_RADIUS_HOVER + 14).iterations(2));
      // 不再使用只约束半径的 forceRadial；改为同时锚定 x、y 的软橡皮筋。
      fg.d3Force("radial", null);
      const slotX = (node: GraphNode) =>
        radialPositions.get(String(node.id))?.x ?? 0;
      const slotY = (node: GraphNode) =>
        radialPositions.get(String(node.id))?.y ?? 0;
      fg.d3Force("anchorX", forceX(slotX).strength(ANCHOR_STRENGTH));
      fg.d3Force("anchorY", forceY(slotY).strength(ANCHOR_STRENGTH));
      fg.d3ReheatSimulation();
    }, [graphData, radialPositions]);

    // 缩放常量：聚焦节点用 FOCUS_ZOOM；自动取景在 MIN/MAX 间夹取，退化情况回退 DEFAULT_ZOOM
    const FOCUS_ZOOM = 2.2;
    const DEFAULT_ZOOM = 1.8;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 2.4;

    // 按当前可见节点的包围盒自动取景：居中 + 夹取缩放，节点少时也不会过度放大
    const fitView = useCallback(
      (durationMs: number) => {
        const fg = fgRef.current;
        if (!fg) return;
        const placed = graphData.nodes.filter(
          (n) => n.x != null && n.y != null
        );
        if (!placed.length) return;
        const xs = placed.map((n) => n.x as number);
        const ys = placed.map((n) => n.y as number);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const bboxW = maxX - minX;
        const bboxH = maxY - minY;
        const resolveZoom = (w: number, h: number): number => {
          if (w <= 1 && h <= 1) {
            return DEFAULT_ZOOM;
          }
          const PADDING = 120; // 视口四周留白（屏幕像素）
          const zx = (size.width - PADDING) / Math.max(w, 1);
          const zy = (size.height - PADDING) / Math.max(h, 1);
          return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min(zx, zy)));
        };
        fg.centerAt(cx, cy, durationMs);
        fg.zoom(resolveZoom(bboxW, bboxH), durationMs);
      },
      [graphData, size]
    );

    const resetView = useCallback(() => {
      fitView(500);
    }, [fitView]);

    const scheduleFitView = useCallback(() => {
      scheduleFitRef.current = true;
    }, []);

    const focusNodeCenter = useCallback(
      (
        id: string,
        panDurationMs: number,
        inset: FocusInset = {},
        options: { skipZoom?: boolean } = {}
      ) => {
        const fg = fgRef.current;
        if (!fg) return;
        const node = graphData.nodes.find((n) => String(n.id) === id) as
          | GraphNode
          | undefined;
        if (!node || node.x == null || node.y == null) return;

        const currentZoom = fg.zoom();
        const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, currentZoom));
        let targetZoom = clampedZoom < 1.35 ? FOCUS_ZOOM : clampedZoom;
        // 滞回：缩放变化很小就不动，避免点击时频繁抽动。
        if (
          Math.abs(targetZoom - currentZoom) / Math.max(currentZoom, 0.001) <
          0.18
        ) {
          targetZoom = currentZoom;
        }

        const zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, targetZoom));
        // 需要缩放时先瞬时到位，再只做平移 → 单次丝滑位移，避免 pan/zoom 两拍
        if (!options.skipZoom) {
          const zoomDelta =
            Math.abs(zoom - currentZoom) / Math.max(currentZoom, 0.001);
          if (zoomDelta >= 0.18) {
            fg.zoom(zoom, 0);
          }
        }

        // 用最终 zoom 计算 inset，避免动画中途目标漂移
        const activeZoom = fg.zoom();
        const ox = (inset.right ?? 0) / (2 * activeZoom);
        const oy = (inset.bottom ?? 0) / (2 * activeZoom);
        fg.centerAt(node.x + ox, node.y + oy, panDurationMs);
      },
      [graphData]
    );

    const focusNode = useCallback(
      (id: string, inset: FocusInset = {}) => {
        focusNodeCenter(id, FOCUS_PAN_DURATION_MS, inset);
      },
      [focusNodeCenter]
    );

    useImperativeHandle(ref, () => ({ focusNode, resetView, scheduleFitView }), [
      focusNode,
      resetView,
      scheduleFitView,
    ]);

    // ── 计算节点透明度（见 PRD 交互规格）──
    const getNodeAlpha = useCallback(
      (id: string): number => {
        if (selectedId) {
          return id === selectedId ? OPACITY.full : OPACITY.dimSelected;
        }
        if (hoveredId) {
          if (id === hoveredId) return OPACITY.full;
          return adjacency.get(hoveredId)?.has(id)
            ? OPACITY.full
            : OPACITY.dimHovered;
        }
        return OPACITY.full;
      },
      [selectedId, hoveredId, adjacency]
    );

    const colors = theme === "dark" ? GRAPH_COLORS_DARK : GRAPH_COLORS_LIGHT;

    // ── 节点绘制：扁平实心圆点 + 标签（无玻璃高光、无辉光）──
    const drawNode = useCallback(
      (
        node: GraphNode,
        ctx: CanvasRenderingContext2D,
        globalScale: number
      ) => {
        const id = String(node.id ?? "");
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        const fallbackStyle = typeStyles[typeOrder[0]];
        const style = typeStyles[node.type] ?? fallbackStyle;
        const alpha = getNodeAlpha(id);
        const isActive = id === selectedId || id === hoveredId;
        const r = isActive ? NODE_RADIUS_HOVER : NODE_RADIUS;

        ctx.save();
        ctx.globalAlpha = alpha;

        // 实心填充（极轻的径向渐变保留一点立体感，但不透明）
        const grad = ctx.createRadialGradient(
          x - r * 0.3,
          y - r * 0.3,
          r * 0.2,
          x,
          y,
          r
        );
        grad.addColorStop(0, hexToRgba(style.base, 0.98));
        grad.addColorStop(1, hexToRgba(style.base, 0.82));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 描边：默认细暖灰，选中/悬停时加粗并用类型色
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.strokeStyle = isActive ? style.base : colors.nodeBorder;
        ctx.stroke();

        // 可展开提示：外圈虚线环（仍有未显示的邻居）
        if (expandableIds.has(id)) {
          ctx.beginPath();
          ctx.arc(x, y, r + 3.5, 0, Math.PI * 2);
          ctx.setLineDash([1.5, 2]);
          ctx.lineWidth = 1;
          ctx.strokeStyle = hexToRgba(style.base, 0.9);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // 标签（缩得太小则隐藏，避免噪音）
        if (globalScale > 0.55) {
          const fontSize = Math.max(3.2, 11 / globalScale);
          ctx.font = `600 ${fontSize}px "DM Sans", -apple-system, "PingFang SC", system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const label = node.label;
          const ly = y + r + 2.5;
          // 文字描边作为光晕，提升可读性
          ctx.lineWidth = 2.6;
          ctx.strokeStyle = colors.nodeLabelHalo;
          ctx.lineJoin = "round";
          ctx.strokeText(label, x, ly);
          ctx.fillStyle = colors.nodeLabel;
          ctx.fillText(label, x, ly);
        }

        ctx.restore();
      },
      [getNodeAlpha, selectedId, hoveredId, colors, expandableIds, typeStyles, typeOrder]
    );

    // 点击热区（放大，便于移动端点击）
    const paintNodePointerArea = useCallback(
      (
        node: GraphNode,
        color: string,
        ctx: CanvasRenderingContext2D
      ) => {
        const x = node.x ?? 0;
        const y = node.y ?? 0;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, NODE_RADIUS_HOVER + 4, 0, Math.PI * 2);
        ctx.fill();
      },
      []
    );

    // ── 是否显示某条边的标签 ──
    const shouldShowLinkLabel = useCallback(
      (link: GraphLink): boolean => {
        const s = linkEndId(link.source);
        const t = linkEndId(link.target);
        if (hoveredId) return s === hoveredId || t === hoveredId;
        if (selectedId) return s === selectedId || t === selectedId;
        return false;
      },
      [hoveredId, selectedId]
    );

    const isLinkActive = useCallback(
      (link: GraphLink): boolean => {
        const s = linkEndId(link.source);
        const t = linkEndId(link.target);
        const focus = hoveredId ?? selectedId;
        if (!focus) return false;
        return s === focus || t === focus;
      },
      [hoveredId, selectedId]
    );

    // 边配色（边分两类 · 法五）：
    //   - 激活态（hover/选中相关）：高亮，最显眼；
    //   - 有焦点但本边非相关：统一压到最暗的 linkDim（保持「聚焦时其余退场」）；
    //   - 静息态：骨架边常显（colors.link），关联边退为背景（linkDim），让主干树一眼可辨。
    const linkColor = useCallback(
      (link: GraphLink): string => {
        if (isLinkActive(link)) return colors.linkHighlight;
        if (selectedId || hoveredId) return colors.linkDim;
        return link.kind === "association" ? colors.linkAssociation : colors.link;
      },
      [isLinkActive, selectedId, hoveredId, colors]
    );

    // 边宽：激活最粗，静息态骨架边略粗于关联边，强化主次。
    const linkWidth = useCallback(
      (link: GraphLink): number => {
        if (isLinkActive(link)) return 1.8;
        return link.kind === "association" ? 0.5 : 0.9;
      },
      [isLinkActive]
    );

    // ── 边标签绘制（悬停 / 选中相关边时）──
    const drawLinkLabel = useCallback(
      (
        link: GraphLink,
        ctx: CanvasRenderingContext2D,
        globalScale: number
      ) => {
        if (!shouldShowLinkLabel(link)) return;
        const source = link.source as GraphNode;
        const target = link.target as GraphNode;
        if (
          typeof source !== "object" ||
          typeof target !== "object" ||
          source.x == null ||
          target.x == null
        )
          return;

        const mx = ((source.x ?? 0) + (target.x ?? 0)) / 2;
        const midY = ((source.y ?? 0) + (target.y ?? 0)) / 2;
        const fontSize = Math.max(3, 9 / globalScale);
        ctx.save();
        ctx.font = `500 ${fontSize}px "DM Sans", -apple-system, "PingFang SC", system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const text = link.label;
        const w = ctx.measureText(text).width;
        const padX = 3 / globalScale;
        const padY = 2 / globalScale;
        const bh = fontSize + padY * 2;
        // 背景胶囊
        ctx.fillStyle = colors.linkLabelBg;
        roundRect(
          ctx,
          mx - w / 2 - padX,
          midY - bh / 2,
          w + padX * 2,
          bh,
          bh / 2
        );
        ctx.fill();
        ctx.fillStyle = colors.linkLabel;
        ctx.fillText(text, mx, midY);
        ctx.restore();
      },
      [shouldShowLinkLabel, colors]
    );

    const handleNodeClick = useCallback(
      (node: GraphNode) => {
        const known = nodeById.get(String(node.id ?? ""));
        if (known) onSelectNode(known);
      },
      [nodeById, onSelectNode]
    );

    const handleNodeHover = useCallback(
      (node: GraphNode | null) => {
        onHoverNode(node ? String(node.id ?? "") : null);
        if (containerRef.current) {
          containerRef.current.style.cursor = node ? "pointer" : "default";
        }
      },
      [onHoverNode]
    );

    return (
      <div ref={containerRef} className="absolute inset-0 h-full w-full">
        {size.width > 0 && (
          <ForceGraph2D<KnowledgeNode, LinkExtra>
            ref={fgRef}
            width={size.width}
            height={size.height}
            graphData={graphData}
            backgroundColor="rgba(0,0,0,0)"
            nodeRelSize={NODE_RADIUS}
            nodeCanvasObject={drawNode}
            nodePointerAreaPaint={paintNodePointerArea}
            linkColor={linkColor}
            linkWidth={(l) => linkWidth(l as GraphLink)}
            linkDirectionalArrowLength={(l) => {
              const link = l as GraphLink;
              if (link.directed === false) return 0;
              return isLinkActive(link) ? 6 : 0;
            }}
            linkDirectionalArrowRelPos={1}
            linkDirectionalArrowColor={(l) => {
              const link = l as GraphLink;
              return isLinkActive(link) ? colors.linkHighlight : "rgba(0,0,0,0)";
            }}
            linkCanvasObjectMode={() => "after"}
            linkCanvasObject={drawLinkLabel}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onBackgroundClick={() => onSelectNode(null)}
            warmupTicks={60}
            cooldownTicks={120}
            onEngineStop={() => {
              // 有选中节点时不 fitView，避免与 focusNode 抢镜头
              if (selectedId) {
                return;
              }
              if (scheduleFitRef.current || !didFitRef.current) {
                scheduleFitRef.current = false;
                didFitRef.current = true;
                fitView(600);
              }
            }}
          />
        )}
      </div>
    );
  }
);

// ── 工具函数 ──
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
