import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KNOWLEDGE_MAPS } from "./data/maps";
import type { KnowledgeNode } from "./types";
import { useTheme } from "./hooks/useTheme";
import { useIsMobile } from "./hooks/useMediaQuery";
import { Header } from "./components/Header";
import { GraphCanvas, type GraphCanvasHandle } from "./components/GraphCanvas";
import { NodeDetailPanel } from "./components/NodeDetailPanel";
import { BottomSheet } from "./components/BottomSheet";
import { LegendBar, LegendFab } from "./components/Legend";
import { SearchBox, type SearchBoxHandle } from "./components/SearchBox";
import type { Neighbor } from "./components/NodeDetailContent";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const [activeMapId, setActiveMapId] = useState<string>(KNOWLEDGE_MAPS[0].id);
  const activeMap = useMemo(
    () => KNOWLEDGE_MAPS.find((m) => m.id === activeMapId) ?? KNOWLEDGE_MAPS[0],
    [activeMapId]
  );

  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const graphRef = useRef<GraphCanvasHandle>(null);
  const searchRef = useRef<SearchBoxHandle>(null);

  // 搜索命中后：先揭示到目标的最短路径，路径稳定可见后再聚焦（见下方 effect）
  const [pendingFocusId, setPendingFocusId] = useState<string | null>(null);

  const nodeById = useMemo(() => {
    const map = new Map<string, KnowledgeNode>();
    for (const n of activeMap.data.nodes) map.set(n.id, n);
    return map;
  }, [activeMap]);

  // ── 渐进式展开：完整图谱的邻接表 ──
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const n of activeMap.data.nodes) map.set(n.id, new Set());
    for (const e of activeMap.data.edges) {
      map.get(e.source)?.add(e.target);
      map.get(e.target)?.add(e.source);
    }
    return map;
  }, [activeMap]);

  // 种子节点：优先使用 activeMap.preferredSeed，否则取各连通分量度数最高节点
  const seeds = useMemo(() => {
    const degree = (id: string) => adjacency.get(id)?.size ?? 0;
    const visited = new Set<string>();
    const result: string[] = [];
    for (const n of activeMap.data.nodes) {
      if (visited.has(n.id)) continue;
      const comp: string[] = [];
      const queue = [n.id];
      visited.add(n.id);
      while (queue.length) {
        const cur = queue.shift()!;
        comp.push(cur);
        for (const nb of adjacency.get(cur) ?? []) {
          if (!visited.has(nb)) {
            visited.add(nb);
            queue.push(nb);
          }
        }
      }
      comp.sort((a, b) => degree(b) - degree(a));
      const preferred = activeMap.preferredSeed;
      const preferredInComp = preferred ? comp.find((id) => id === preferred) : null;
      if (preferredInComp) {
        result.push(preferredInComp);
      } else {
        result.push(comp[0]);
      }
    }
    return result;
  }, [adjacency, activeMap]);

  // 已展开的节点（点击后浮现其邻居）
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(seeds)
  );

  // 切换地图时重置选中/悬停/展开，并同步 expandedIds 为新图 seeds
  useEffect(() => {
    setSelectedNode(null);
    setHoveredNode(null);
    setExpandedIds(new Set(seeds));
    setPendingFocusId(null);
  }, [activeMapId, seeds]);

  // 可见节点 = 从种子出发 BFS，只穿过"已展开"节点向外延伸
  const visibleIds = useMemo(() => {
    const visible = new Set<string>(seeds);
    const queue = [...seeds];
    while (queue.length) {
      const cur = queue.shift()!;
      if (!expandedIds.has(cur)) continue;
      for (const nb of adjacency.get(cur) ?? []) {
        if (!visible.has(nb)) {
          visible.add(nb);
          queue.push(nb);
        }
      }
    }
    return visible;
  }, [expandedIds, adjacency, seeds]);

  const visibleData = useMemo(
    () => ({
      nodes: activeMap.data.nodes.filter((n) => visibleIds.has(n.id)),
      edges: activeMap.data.edges.filter(
        (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
      ),
    }),
    [visibleIds, activeMap]
  );

  // 仍有未显示邻居的可见节点（画"可展开"提示环）
  const expandableIds = useMemo(() => {
    const s = new Set<string>();
    for (const id of visibleIds) {
      for (const nb of adjacency.get(id) ?? []) {
        if (!visibleIds.has(nb)) {
          s.add(id);
          break;
        }
      }
    }
    return s;
  }, [visibleIds, adjacency]);

  // 当前选中节点的相邻节点 + 关系
  const neighbors = useMemo<Neighbor[]>(() => {
    if (!selectedNode) return [];
    const result: Neighbor[] = [];
    const seen = new Set<string>();
    for (const e of activeMap.data.edges) {
      if (e.source === selectedNode.id) {
        const n = nodeById.get(e.target);
        if (n && !seen.has(n.id)) {
          seen.add(n.id);
          result.push({ node: n, relation: e.label, direction: "out" });
        }
      } else if (e.target === selectedNode.id) {
        const n = nodeById.get(e.source);
        if (n && !seen.has(n.id)) {
          seen.add(n.id);
          result.push({ node: n, relation: e.label, direction: "in" });
        }
      }
    }
    return result;
  }, [selectedNode, nodeById, activeMap]);

  // 种子集合（不可收回）
  const seedSet = useMemo(() => new Set(seeds), [seeds]);

  // 选中节点聚焦时让其落在未被面板/抽屉遮挡的区域
  const focusInset = useMemo(
    () => (isMobile ? { bottom: 0.6 * window.innerHeight } : { right: 360 }),
    [isMobile]
  );

  const expandNode = useCallback((id: string) => {
    setExpandedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  // 收回某节点：从已展开集合中移除（种子不可收），其子树随 visibleIds BFS 自动消失
  const collapseNode = useCallback(
    (id: string) => {
      if (seedSet.has(id)) return;
      setExpandedIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [seedSet]
  );

  // 点击节点：再点已选中节点 = 收回；否则展开 + 选中 + 聚焦到未遮挡区
  const handleSelectNode = useCallback(
    (node: KnowledgeNode | null) => {
      if (node && selectedNode?.id === node.id) {
        collapseNode(node.id);
        setSelectedNode(null);
        return;
      }
      setSelectedNode(node);
      if (node) {
        const willReheat = expandableIds.has(node.id);
        expandNode(node.id);
        graphRef.current?.focusNode(node.id, focusInset, willReheat);
      }
    },
    [selectedNode, collapseNode, expandNode, focusInset, expandableIds]
  );

  // 从种子集合到目标节点的最短路径（含两端），用于揭示被折叠的深层节点
  const findPathFromSeeds = useCallback(
    (targetId: string): string[] => {
      if (seedSet.has(targetId)) {
        return [targetId];
      }
      const parent = new Map<string, string>();
      const visited = new Set<string>(seeds);
      const queue = [...seeds];
      while (queue.length) {
        const cur = queue.shift()!;
        if (cur === targetId) {
          break;
        }
        for (const nb of adjacency.get(cur) ?? []) {
          if (!visited.has(nb)) {
            visited.add(nb);
            parent.set(nb, cur);
            queue.push(nb);
          }
        }
      }
      if (!visited.has(targetId)) {
        return [];
      }
      const path: string[] = [];
      let node: string | undefined = targetId;
      while (node) {
        path.push(node);
        node = parent.get(node);
      }
      return path;
    },
    [seeds, seedSet, adjacency]
  );

  // 搜索命中：展开通往目标的整条路径，选中目标，并登记待聚焦
  const revealAndFocusNode = useCallback(
    (nodeId: string) => {
      const target = nodeById.get(nodeId);
      if (!target) {
        return;
      }
      const path = findPathFromSeeds(nodeId);
      if (path.length === 0) {
        return;
      }
      setExpandedIds((prev) => {
        const next = new Set(prev);
        for (const id of path) {
          next.add(id);
        }
        return next;
      });
      setSelectedNode(target);
      setPendingFocusId(nodeId);
    },
    [nodeById, findPathFromSeeds]
  );

  // 待聚焦节点一旦随路径揭示变为可见，等力导向重排稳定后精确对准
  useEffect(() => {
    if (!pendingFocusId) {
      return;
    }
    if (!visibleIds.has(pendingFocusId)) {
      return;
    }
    graphRef.current?.focusNode(pendingFocusId, focusInset, true);
    setPendingFocusId(null);
  }, [pendingFocusId, visibleIds, focusInset]);

  // 详情面板内点击相邻节点：展开 + 切换选中 + 平滑聚焦
  const handleSelectNeighbor = useCallback(
    (node: KnowledgeNode) => {
      setSelectedNode(node);
      const willReheat = expandableIds.has(node.id);
      expandNode(node.id);
      graphRef.current?.focusNode(node.id, focusInset, willReheat);
    },
    [expandNode, focusInset, expandableIds]
  );

  const handleClose = useCallback(() => setSelectedNode(null), []);

  // 收起当前选中节点的子树并关闭详情卡
  const handleCollapseSelected = useCallback(() => {
    if (!selectedNode) return;
    collapseNode(selectedNode.id);
    setSelectedNode(null);
  }, [selectedNode, collapseNode]);

  // 收起全部，回到起点
  const handleCollapseAll = useCallback(() => {
    setExpandedIds(new Set(seeds));
    setSelectedNode(null);
    window.setTimeout(() => graphRef.current?.resetView(), 450);
  }, [seeds]);

  // 展开全部：把所有节点纳入展开集合，画布在重排结束后自动适配视角
  const handleExpandAll = useCallback(() => {
    setExpandedIds(new Set(activeMap.data.nodes.map((n) => n.id)));
    setSelectedNode(null);
  }, [activeMap]);

  // 切换地图
  const handleSwitchMap = useCallback((id: string) => {
    setActiveMapId(id);
  }, []);

  const canReset = expandedIds.size > seeds.length;
  const canExpandAll = visibleIds.size < activeMap.data.nodes.length;
  const canCollapseSelected = selectedNode ? !seedSet.has(selectedNode.id) : false;

  // Esc 关闭详情面板；Cmd/Ctrl+K 唤起搜索
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNode(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 弥散光背景 — 暖色浅色主题下作为知识领域的柔和分区 */}
      {theme === "light" && <AuraBackground />}

      {/* key={activeMapId} 保证切换地图时整体重挂，清除节点缓存/didFitRef */}
      <GraphCanvas
        key={activeMapId}
        ref={graphRef}
        data={visibleData}
        theme={theme}
        selectedId={selectedNode?.id ?? null}
        hoveredId={hoveredNode}
        expandableIds={expandableIds}
        onSelectNode={handleSelectNode}
        onHoverNode={setHoveredNode}
        typeStyles={activeMap.typeStyles}
        typeOrder={activeMap.typeOrder}
      />

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={handleCollapseAll}
        onExpandAll={handleExpandAll}
        canReset={canReset}
        canExpandAll={canExpandAll}
        maps={KNOWLEDGE_MAPS}
        activeMapId={activeMapId}
        onSwitchMap={handleSwitchMap}
      />

      {/* 搜索：桌面端顶部浮岛 / 移动端左下浮动按钮 */}
      <SearchBox
        ref={searchRef}
        nodes={activeMap.data.nodes}
        typeStyles={activeMap.typeStyles}
        typeOrder={activeMap.typeOrder}
        onPick={revealAndFocusNode}
        mobileHidden={Boolean(selectedNode)}
      />

      {/* 图例 */}
      <LegendBar styles={activeMap.typeStyles} order={activeMap.typeOrder} />
      <LegendFab styles={activeMap.typeStyles} order={activeMap.typeOrder} />

      {/* 详情：桌面端右侧面板 / 移动端底部抽屉 */}
      {isMobile ? (
        <BottomSheet
          node={selectedNode}
          neighbors={neighbors}
          onClose={handleClose}
          onSelectNeighbor={handleSelectNeighbor}
          onCollapse={handleCollapseSelected}
          canCollapse={canCollapseSelected}
          typeStyles={activeMap.typeStyles}
          typeOrder={activeMap.typeOrder}
        />
      ) : (
        <NodeDetailPanel
          node={selectedNode}
          neighbors={neighbors}
          onClose={handleClose}
          onSelectNeighbor={handleSelectNeighbor}
          onCollapse={handleCollapseSelected}
          canCollapse={canCollapseSelected}
          typeStyles={activeMap.typeStyles}
          typeOrder={activeMap.typeOrder}
        />
      )}
    </div>
  );
}

/** 弥散光背景：四团柔和色斑，作为不同知识领域的视觉分区氛围 */
function AuraBackground() {
  const blobs: React.CSSProperties[] = [
    {
      width: 520,
      height: 520,
      top: "-12%",
      left: "2%",
      background:
        "radial-gradient(circle, rgba(126,170,223,0.20) 0%, transparent 70%)",
    },
    {
      width: 560,
      height: 560,
      top: "12%",
      right: "-8%",
      background:
        "radial-gradient(circle, rgba(212,130,74,0.18) 0%, transparent 70%)",
    },
    {
      width: 460,
      height: 460,
      bottom: "-6%",
      left: "22%",
      background:
        "radial-gradient(circle, rgba(155,126,200,0.16) 0%, transparent 70%)",
    },
    {
      width: 340,
      height: 340,
      bottom: "10%",
      right: "12%",
      background:
        "radial-gradient(circle, rgba(91,170,138,0.15) 0%, transparent 70%)",
    },
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {blobs.map((style, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{ filter: "blur(28px)", ...style }}
        />
      ))}
    </div>
  );
}
