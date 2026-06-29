// ============================================================
// 边的两类语义（养图谱六法 · 法五「边分两类」）
//   hierarchy（骨架边）  - 决定层级 / 归属，构成「主干树」，实线常显，参与径向布局定位
//   association（关联边）- 交叉关系 / 补充，表达兄弟节点间的横向知识点，
//                          静息半隐、hover 才显形，不参与布局定位
//
// 词表只维护「骨架」这一封闭小集合；其余 label 一律默认归为关联边。
// 这样新增图谱发明的各种动词（如「赋能」「衔接」「套用」）无需逐一登记，
// 既保证主干树稳定，又不会因长尾动词刷出大量「未归类」噪音。
//
// 共用方：GraphCanvas（视觉分层 + 布局骨架）、scripts/validate-graph.ts（连通校验）。
// ============================================================

export type EdgeKind = "hierarchy" | "association";

// 骨架边 label 白名单：语义为「包含 / 归属 / 构成」的层级关系。
export const HIERARCHY_LABELS: ReadonlySet<string> = new Set([
  "包含",
  "分为",
  "细分为",
  "构成",
  "组成",
  "属于",
]);

/**
 * 推断一条边属于骨架还是关联：
 *   - 显式 `kind` 字段优先（数据可手动覆盖推断结果）；
 *   - 否则按 label 是否在骨架白名单内判定，命中即 hierarchy，否则 association。
 */
export function inferEdgeKind(label: string, explicit?: EdgeKind): EdgeKind {
  if (explicit) return explicit;
  return HIERARCHY_LABELS.has(label) ? "hierarchy" : "association";
}
