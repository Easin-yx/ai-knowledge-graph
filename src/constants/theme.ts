import type { NodeType } from "../types";

// ============================================================
// 节点类型 → 色系映射（液态玻璃风格）
// PRD 色系方向：
//   concept      蓝色系   architecture 橙色系
//   technique    紫色系   dataset      绿色系
//   framework    灰色系   product      青色系
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

export const NODE_TYPE_STYLES: Record<NodeType, NodeTypeStyle> = {
  concept: {
    base: "#7eaadf",
    glow: "rgba(126, 170, 223, 0.30)",
    label: "概念",
  },
  architecture: {
    base: "#d4824a",
    glow: "rgba(212, 130, 74, 0.30)",
    label: "架构",
  },
  technique: {
    base: "#9b7ec8",
    glow: "rgba(155, 126, 200, 0.30)",
    label: "技术",
  },
  dataset: {
    base: "#5baa8a",
    glow: "rgba(91, 170, 138, 0.30)",
    label: "数据集",
  },
  framework: {
    base: "#9a9488",
    glow: "rgba(154, 148, 136, 0.30)",
    label: "框架",
  },
  product: {
    base: "#4fb0c6",
    glow: "rgba(79, 176, 198, 0.30)",
    label: "产品",
  },
};

// 类型在图例 / 筛选中的展示顺序
export const NODE_TYPE_ORDER: NodeType[] = [
  "architecture",
  "product",
  "concept",
  "technique",
  "dataset",
  "framework",
];

// ============================================================
// 图谱画布配色 — 按主题区分
// ============================================================
export interface GraphColors {
  link: string;
  linkHighlight: string;
  linkDim: string;
  linkLabel: string;
  linkLabelBg: string;
  nodeLabel: string;
  nodeLabelHalo: string;
  nodeBorder: string;
}

// 暖色浅色主题（默认）
export const GRAPH_COLORS_LIGHT: GraphColors = {
  link: "rgba(100, 80, 50, 0.18)",
  linkHighlight: "rgba(100, 80, 50, 0.70)",
  linkDim: "rgba(100, 80, 50, 0.07)",
  linkLabel: "#2d2215",
  linkLabelBg: "rgba(250, 247, 242, 0.92)",
  nodeLabel: "#2d2215",
  nodeLabelHalo: "rgba(250, 247, 242, 0.9)",
  nodeBorder: "rgba(45, 34, 21, 0.22)",
};

// 深色主题
export const GRAPH_COLORS_DARK: GraphColors = {
  link: "rgba(148, 163, 196, 0.28)",
  linkHighlight: "rgba(226, 235, 255, 0.85)",
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
