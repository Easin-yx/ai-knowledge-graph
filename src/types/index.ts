import type { NodeTypeStyle } from "../constants/theme";
import type { EdgeKind } from "../constants/edgeKind";

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

export type CardArchetype = "category" | "concept" | "mechanism" | "entity" | "practice";

export interface CodeSample {
  lang: "python" | "typescript" | "bash" | "sql";
  content: string;
  caption?: string;
}

// ============================================================
// 节点结构
// id 规范：snake_case 英文小写，如 "self_attention"
// label 规范：Title Case，如 "Self-Attention"
// ============================================================
export interface KnowledgeNode {
  id: string;
  label: string;       // 节点上显示的名称（AI 图英文、PM 图中文，由各地图约定）
  type: string;        // 类型语义由所属地图的 typeStyles 解释
  order?: number;      // 同一父节点下的学习序号（驱动布局排序与面板提示，不占用边）
  card?: CardArchetype; // 可选：节点卡片原型；缺省时由所属地图 typeArchetypes 推断
  details: {
    zh_label?: string;         // 可选：中文名，详情卡片副标题，如 "多头注意力"
    summary: string;           // 必填：一句话说明这是什么（中文）
    analogy?: string;          // 可选：通俗类比，"打个比方"区块展示
    notes?: string;            // 可选：延伸理解、公式、重要细节
    code?: CodeSample[];       // 可选：结构化代码示例（优先于 notes 围栏）
    facts?: { label: string; value: string }[]; // 可选：实体型节点属性表
    steps?: string[];          // 可选：实践型节点步骤
    contrast?: { wrong: string; right: string }; // 可选：实践型节点正误对照
    key_concepts?: string[];   // 可选：关键词或子概念列表
    source?: NodeSource;       // 可选：知识来源
    // 可选：B 端 / 中后台视角（黑神话图谱专用，卡片翻面展示）。
    // 其它图谱不填，详情卡片不显示翻转控件，渲染保持原状。
    backstage?: {
      summary: string;         // 必填（当 backstage 存在时）：背后需要什么中后台能力
      code?: CodeSample[];     // 可选：B 端视角下的结构化代码示例
      facts?: { label: string; value: string }[]; // 可选：B 端属性事实
      steps?: string[];        // 可选：B 端实践步骤
      contrast?: { wrong: string; right: string }; // 可选：B 端正误对照
      notes?: string;          // 可选：配置表 / 埋点 / 数据大屏 / 资产管线的产品思考
      key_concepts?: string[]; // 可选：B 端关键词
    };
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
  // 可选：显式标注骨架边（hierarchy，管层级/归属）或关联边（association，管交叉关系）。
  // 缺省时由 inferEdgeKind() 按 label 推断（见 src/constants/edgeKind.ts）。
  kind?: EdgeKind;
}

// ============================================================
// 图谱数据根类型
// ============================================================
export interface GraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

// ============================================================
// 知识地图意图分组：「为谁看」的轴，用作切换器里每张图的角标。
//   professional - 与求职岗位直接相关，面向 HR 的「专业向」展示
//   interest     - 兴趣/学习类，体现学习力与体系化拆解能力的「加分项」
// ============================================================
export type MapGroup = "professional" | "interest";

// ============================================================
// 知识地图领域：「讲什么主题」的轴，作为切换器下拉的主分区，
// 与 group（意图）正交。图谱增多时按领域聚类、用意图做角标，可平滑扩展。
//   game-dev     - 游戏研发（黑神话案例、研发中台等）
//   language     - 语言表达（英语语法、逻辑表达力等）
//   tech-product - 技术与产品（AI、编程语言、产品经理等）
// ============================================================
export type MapDomain = "game-dev" | "language" | "tech-product";

// ============================================================
// 知识地图：一张可插拔的图谱（自带数据、类型调色板、默认中心）
//   typeStyles - 本图专属「类型 → 配色」，type 语义由此解释
//   typeOrder  - 图例展示顺序；typeOrder[0] 同时作为样式解析的安全兜底
//   preferredSeed - 开场默认展开的中心节点 id
//   group      - 意图角标（专业向 / 兴趣向）
//   domain     - 切换器下拉的主分区（领域）
// ============================================================
export interface KnowledgeMap {
  id: string;
  label: string;
  subtitle: string;
  data: GraphData;
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
  typeArchetypes?: Record<string, CardArchetype>;
  preferredSeed?: string;
  group: MapGroup;
  domain: MapDomain;
  // 翻转卡片两面标签；不填时默认 C端/B端（黑神话）
  perspectiveLabels?: { front: string; back: string; frontHint?: string; backHint?: string };
}
