import type { NodeTypeStyle } from "../constants/theme";

// ============================================================
// 节点类型语义由每张知识地图自己的调色板（typeStyles）解释，
// 因此节点的 type 放宽为 string；各地图在自身配置里约定类型集合。
// AI 图沿用的固定语义（保留作内部参考）：
//   concept      - 抽象的数学/语言/信息概念，只能被"理解"，没有具体实现步骤
//   architecture - 有完整网络结构设计、可被实例化/训练的模型
//   technique    - 有具体计算公式或操作步骤的方法，是 architecture 的构成单元
//   dataset      - 用于训练或评估的数据集合
//   framework    - 实现和运行模型的工程工具
//   product      - 面向用户可直接使用的模型/应用产品，如 GPT、Sora、Coze
// ============================================================

// ============================================================
// 知识来源类型
// 节点不存储来源作为图谱节点，来源仅作为详情卡片的引用信息
// ============================================================
export type NodeSource =
  | { type: "paper"; title: string; year?: number; authors?: string[]; url?: string }
  | { type: "blog"; title: string; url?: string }
  | { type: "book"; title: string; authors?: string[]; chapter?: string }
  | { type: "conversation" }
  | { type: "doc"; title: string; url?: string };

// ============================================================
// 节点结构
// id 规范：snake_case 英文小写，如 "self_attention"
// label 规范：Title Case，如 "Self-Attention"
// ============================================================
export interface KnowledgeNode {
  id: string;
  label: string;       // 节点上显示的名称（AI 图英文、PM 图中文，由各地图约定）
  type: string;        // 类型语义由所属地图的 typeStyles 解释
  details: {
    zh_label?: string;         // 可选：中文名，详情卡片副标题，如 "多头注意力"
    summary: string;           // 必填：一句话说明这是什么（中文）
    analogy?: string;          // 可选：通俗类比，"打个比方"区块展示
    notes?: string;            // 可选：延伸理解、公式、重要细节
    key_concepts?: string[];   // 可选：关键词或子概念列表
    source?: NodeSource;       // 可选：知识来源
  };
}

// ============================================================
// 边结构
// directed 默认 true（有向箭头）；对称关系（如"对比"）设为 false
// ============================================================
export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  directed?: boolean;
}

// ============================================================
// 图谱数据根类型
// ============================================================
export interface GraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

// ============================================================
// 知识地图：一张可插拔的图谱（自带数据、类型调色板、默认中心）
//   typeStyles - 本图专属「类型 → 配色」，type 语义由此解释
//   typeOrder  - 图例展示顺序；typeOrder[0] 同时作为样式解析的安全兜底
//   preferredSeed - 开场默认展开的中心节点 id
// ============================================================
export interface KnowledgeMap {
  id: string;
  label: string;
  subtitle: string;
  data: GraphData;
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
  preferredSeed?: string;
}
