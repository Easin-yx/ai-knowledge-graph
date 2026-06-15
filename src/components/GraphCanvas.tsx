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
import { forceCollide } from "d3-force-3d";
import type { KnowledgeNode, GraphData } from "../types";
import type { Theme } from "../hooks/useTheme";
import {
  GRAPH_COLORS_DARK,
  GRAPH_COLORS_LIGHT,
  NODE_RADIUS,
  NODE_RADIUS_HOVER,
  OPACITY,
  type NodeTypeStyle,
} from "../constants/theme";

type LinkExtra = { id: string; label: string; directed?: boolean };
type GraphNode = NodeObject<KnowledgeNode>;
type GraphLink = LinkObject<KnowledgeNode, LinkExtra>;

/** 被详情面板/底部抽屉遮挡的区域（屏幕像素），用于把节点偏移到可见区居中 */
export interface FocusInset {
  right?: number;
  bottom?: number;
}

export interface GraphCanvasHandle {
  /** 平滑聚焦到节点所在的局部簇；deferToSettle=true 时等力导向重排稳定后再精确对准 */
  focusNode: (id: string, inset?: FocusInset, deferToSettle?: boolean) => void;
  /** 重置视角，使所有节点可见 */
  resetView: () => void;
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
    },
    ref
  ) {
    const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(
      undefined
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const didFitRef = useRef(false);
    // 点击展开会触发力导向重排，落点延迟到布局稳定（onEngineStop）时再精确对准
    const pendingFocusRef = useRef<{ id: string; inset: FocusInset } | null>(
      null
    );

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

    // ── 构建力导向图数据：用缓存保留已有节点的 x/y，避免渐进展开时整图重排；
    //    新节点从某个已定位的邻居旁边生成，形成"长出来"的效果 ──
    const nodeCacheRef = useRef(new Map<string, GraphNode>());
    const graphData = useMemo(() => {
      const cache = nodeCacheRef.current;
      const ids = new Set(data.nodes.map((n) => n.id));
      // 已定位邻居旁的落点：渐进展开时新节点从邻居处"长出来"
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
          // 仅更新内容字段，保留 x/y/vx/vy 等模拟状态
          existing.label = n.label;
          existing.type = n.type;
          existing.details = n.details;
          return existing;
        }
        const created = { ...n } as GraphNode;
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
        })),
      };
    }, [data, adjacency]);

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

    // ── 力参数微调：加大斥力、拉长连线、并加碰撞力根治节点重叠 ──
    useEffect(() => {
      const fg = fgRef.current;
      if (!fg) return;
      fg.d3Force("charge")?.strength(-320);
      const link = fg.d3Force("link") as
        | (ReturnType<NonNullable<typeof fg.d3Force>> & {
            distance?: (d: number) => unknown;
          })
        | undefined;
      link?.distance?.(80);
      // 碰撞力：保护半径 = 节点半径 + 标签缓冲，避免圆与圆/文字重叠
      fg.d3Force("collide", forceCollide(NODE_RADIUS_HOVER + 14).iterations(2));
      fg.d3ReheatSimulation();
    }, [graphData]);

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

    // ── 数据变化时重置一次自动适配视角 ──
    useEffect(() => {
      didFitRef.current = false;
    }, [graphData]);

    const resetView = useCallback(() => {
      fitView(500);
    }, [fitView]);

    // 聚焦"节点 + 其可见邻居"这一簇：框住局部结构，而非孤零零一个点
    const focusCluster = useCallback(
      (id: string, inset: FocusInset, durationMs: number) => {
        const fg = fgRef.current;
        if (!fg) return;
        const clusterIds = new Set<string>([id]);
        for (const l of graphData.links) {
          const s = linkEndId(l.source);
          const t = linkEndId(l.target);
          if (s === id) clusterIds.add(t);
          if (t === id) clusterIds.add(s);
        }
        const placed = graphData.nodes.filter(
          (n) => clusterIds.has(String(n.id)) && n.x != null && n.y != null
        );
        if (!placed.length) return;
        const xs = placed.map((n) => n.x as number);
        const ys = placed.map((n) => n.y as number);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const bboxW = maxX - minX;
        const bboxH = maxY - minY;
        // 把局部簇放进完整视口（留白）后夹取缩放；簇太小则回退到 FOCUS_ZOOM
        const fitZoom = (w: number, h: number): number => {
          if (w <= 1 && h <= 1) {
            return FOCUS_ZOOM;
          }
          const PADDING = 140;
          const zx = (size.width - PADDING) / Math.max(w, 1);
          const zy = (size.height - PADDING) / Math.max(h, 1);
          return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.min(zx, zy)));
        };
        // 滞回：目标与当前缩放接近就保持不动，避免每次点击都一缩一放
        const resolveZoom = (target: number, current: number): number => {
          if (Math.abs(target - current) / current < 0.25) {
            return current;
          }
          return target;
        };
        const zoom = resolveZoom(fitZoom(bboxW, bboxH), fg.zoom());
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        // 面板在右 → 簇中心右移，落在左侧可见区中央；抽屉在下 → 簇中心上移到顶部可见条带中央
        const dx = (inset.right ?? 0) / 2 / zoom;
        const dy = (inset.bottom ?? 0) / 2 / zoom;
        fg.centerAt(cx + dx, cy + dy, durationMs);
        fg.zoom(zoom, durationMs);
      },
      [graphData, size]
    );

    const focusNode = useCallback(
      (id: string, inset: FocusInset = {}, deferToSettle = false) => {
        const node = graphData.nodes.find((n) => String(n.id) === id) as
          | GraphNode
          | undefined;
        if (!node || node.x == null || node.y == null) return;
        if (deferToSettle) {
          // 会触发展开重排：先按当前缩放快速平移给即时反馈，落点等 onEngineStop 校正
          pendingFocusRef.current = { id, inset };
          const fg = fgRef.current;
          if (fg) {
            const z = fg.zoom();
            const dx = (inset.right ?? 0) / 2 / z;
            const dy = (inset.bottom ?? 0) / 2 / z;
            fg.centerAt(node.x + dx, node.y + dy, 350);
          }
          return;
        }
        focusCluster(id, inset, 600);
      },
      [graphData, focusCluster]
    );

    useImperativeHandle(ref, () => ({ focusNode, resetView }), [
      focusNode,
      resetView,
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

    const linkColor = useCallback(
      (link: GraphLink): string => {
        if (isLinkActive(link)) return colors.linkHighlight;
        if (selectedId || hoveredId) return colors.linkDim;
        return colors.link;
      },
      [isLinkActive, selectedId, hoveredId, colors]
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
            linkWidth={(l) => (isLinkActive(l as GraphLink) ? 1.8 : 0.8)}
            linkDirectionalArrowLength={(l) =>
              (l as GraphLink).directed === false ? 0 : 3.2
            }
            linkDirectionalArrowRelPos={1}
            linkDirectionalArrowColor={linkColor}
            linkCanvasObjectMode={() => "after"}
            linkCanvasObject={drawLinkLabel}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onBackgroundClick={() => onSelectNode(null)}
            warmupTicks={60}
            cooldownTicks={120}
            onEngineStop={() => {
              const pending = pendingFocusRef.current;
              if (pending) {
                pendingFocusRef.current = null;
                focusCluster(pending.id, pending.inset, 600);
                return;
              }
              if (!didFitRef.current) {
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
