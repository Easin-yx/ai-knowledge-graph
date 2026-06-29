// ============================================================
// 节点类型 → 色系映射（液态玻璃风格）的样式契约。
// 具体的「类型 → 配色」表与展示顺序下沉到各知识地图（src/data/maps/*）。
//
// 每个类型提供：
//   base   - 节点核心填充色（HEX）
//   glow   - 悬停 / 选中时的辉光色（带透明度）
//   label  - 图例与详情中的中文类型名
// ============================================================

export interface NodeTypeStyle {
  base: string;
  glow: string;
  label: string;
}

// ============================================================
// 图谱画布配色 — 按主题区分
// ============================================================
export interface GraphColors {
  /** 静息态骨架边（hierarchy）：主干，需清晰可见 */
  link: string;
  /** 静息态关联边（association）：次级，比骨架弱但仍要看得清 */
  linkAssociation: string;
  /** 激活态（hover/选中相关）：最显眼 */
  linkHighlight: string;
  /** 有焦点时压暗的「其余无关边」：刻意压到很低以突出焦点 */
  linkDim: string;
  linkLabel: string;
  linkLabelBg: string;
  nodeLabel: string;
  nodeLabelHalo: string;
  nodeBorder: string;
}

// 暖色浅色主题（默认）
export const GRAPH_COLORS_LIGHT: GraphColors = {
  link: "rgba(92, 70, 42, 0.42)",
  linkAssociation: "rgba(92, 70, 42, 0.24)",
  linkHighlight: "rgba(92, 70, 42, 0.78)",
  linkDim: "rgba(92, 70, 42, 0.08)",
  linkLabel: "#2d2215",
  linkLabelBg: "rgba(250, 247, 242, 0.92)",
  nodeLabel: "#2d2215",
  nodeLabelHalo: "rgba(250, 247, 242, 0.9)",
  nodeBorder: "rgba(45, 34, 21, 0.22)",
};

// 深色主题
export const GRAPH_COLORS_DARK: GraphColors = {
  link: "rgba(160, 174, 205, 0.48)",
  linkAssociation: "rgba(160, 174, 205, 0.28)",
  linkHighlight: "rgba(226, 235, 255, 0.9)",
  linkDim: "rgba(148, 163, 196, 0.1)",
  linkLabel: "#dbe4f7",
  linkLabelBg: "rgba(10, 14, 26, 0.78)",
  nodeLabel: "#eef3ff",
  nodeLabelHalo: "rgba(7, 10, 20, 0.85)",
  nodeBorder: "rgba(255, 255, 255, 0.6)",
};

// 节点绘制几何参数
export const NODE_RADIUS = 7;
export const NODE_RADIUS_HOVER = 9;

// 透明度状态（见 PRD 交互规格）
export const OPACITY = {
  full: 1,
  // 选中某节点时，非相关节点
  dimSelected: 0.18,
  // 悬停某节点时，非相邻节点
  dimHovered: 0.45,
};

export const MOBILE_BREAKPOINT = 768;
