import { KNOWLEDGE_MAPS } from "../src/data/maps/index";
import type { KnowledgeMap, KnowledgeNode, KnowledgeEdge } from "../src/types";

// ============================================================
// L0 结构验证器 — Loop Engineering 的「反馈机制」
//
// 职责：把「图谱结构是否正确」翻译成可机器判定的硬规则。
//   - error   : 结构性错误，必须清零（退出码 1）
//   - warning : 风格/完整性提示，不阻断（仅 ai 图执行内容风格检查）
//
// 用法：npm run validate
// 边界：本脚本只读不改；它发现问题，由人或执行 Agent 去修。
// ============================================================

interface Issue {
  level: "error" | "warning";
  rule: string;
  message: string;
}

const SNAKE_CASE = /^[a-z0-9]+(_[a-z0-9]+)*$/;
const MIN_KEY_CONCEPTS = 3;

// 哪些图谱要求「每节点带类比 / 至少 3 个关键概念 / 可溯源 source」的内容风格。
// 新图谱若想吃同一套内容质量门禁，把它的 id 加进来即可。
const CONTENT_STYLE_MAPS = new Set(["ai", "pm"]);

// black-myth 专属 L2 门禁（双视角完整性）所需的常量。
const BLACK_MYTH_ID = "black-myth";
const BM_SUPPORT_LABEL = "支撑"; // C 端 → B 端中后台 的映射边
const BM_CONTAIN_LABEL = "包含"; // 层级边
const BM_MIN_BACKSTAGE_SUMMARY = 10; // backstage.summary 低于该字数视为占位灌水

function checkNodeIds(nodes: KnowledgeNode[]): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();
  for (const node of nodes) {
    if (seen.has(node.id)) {
      issues.push({ level: "error", rule: "duplicate-node-id", message: `节点 id 重复：${node.id}` });
    }
    seen.add(node.id);
    if (!SNAKE_CASE.test(node.id)) {
      issues.push({ level: "error", rule: "node-id-naming", message: `节点 id 不符合 snake_case：${node.id}` });
    }
  }
  return issues;
}

function checkEdgeIntegrity(nodes: KnowledgeNode[], edges: KnowledgeEdge[]): Issue[] {
  const issues: Issue[] = [];
  const nodeIds = new Set(nodes.map((n) => n.id));
  const seenEdgeIds = new Set<string>();
  const seenPairs = new Set<string>();
  for (const edge of edges) {
    if (seenEdgeIds.has(edge.id)) {
      issues.push({ level: "error", rule: "duplicate-edge-id", message: `边 id 重复：${edge.id}` });
    }
    seenEdgeIds.add(edge.id);
    if (!nodeIds.has(edge.source)) {
      issues.push({ level: "error", rule: "dangling-edge", message: `边 ${edge.id} 的 source 不存在：${edge.source}` });
    }
    if (!nodeIds.has(edge.target)) {
      issues.push({ level: "error", rule: "dangling-edge", message: `边 ${edge.id} 的 target 不存在：${edge.target}` });
    }
    if (edge.source === edge.target) {
      issues.push({ level: "warning", rule: "self-loop", message: `边 ${edge.id} 是自环` });
    }
    const pair = `${edge.source}__${edge.target}`;
    if (seenPairs.has(pair)) {
      issues.push({ level: "warning", rule: "duplicate-edge-pair", message: `重复连接：${pair}（边 ${edge.id}）` });
    }
    seenPairs.add(pair);
    if (!edge.id.startsWith(`${edge.source}__`) || !edge.id.endsWith(`__${edge.target}`)) {
      issues.push({ level: "warning", rule: "edge-id-convention", message: `边 id 不符合 source__关系__target 约定：${edge.id}` });
    }
  }
  return issues;
}

function checkOrphans(nodes: KnowledgeNode[], edges: KnowledgeEdge[]): Issue[] {
  const degree = new Map<string, number>();
  for (const node of nodes) {
    degree.set(node.id, 0);
  }
  for (const edge of edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }
  const issues: Issue[] = [];
  for (const node of nodes) {
    if (degree.get(node.id) === 0) {
      issues.push({ level: "error", rule: "orphan-node", message: `孤儿节点（无任何连接）：${node.id}` });
    }
  }
  return issues;
}

function checkTypeConsistency(map: KnowledgeMap): Issue[] {
  const issues: Issue[] = [];
  const styleKeys = new Set(Object.keys(map.typeStyles));
  const orderKeys = new Set(map.typeOrder);
  for (const node of map.data.nodes) {
    if (!styleKeys.has(node.type)) {
      issues.push({ level: "error", rule: "unknown-type", message: `节点 ${node.id} 的 type「${node.type}」未在 typeStyles 中定义` });
    }
  }
  for (const key of styleKeys) {
    if (!orderKeys.has(key)) {
      issues.push({ level: "warning", rule: "type-order-missing", message: `类型「${key}」在 typeStyles 中但不在 typeOrder` });
    }
  }
  for (const key of orderKeys) {
    if (!styleKeys.has(key)) {
      issues.push({ level: "warning", rule: "type-order-extra", message: `类型「${key}」在 typeOrder 中但 typeStyles 未定义` });
    }
  }
  return issues;
}

function checkPreferredSeed(map: KnowledgeMap): Issue[] {
  if (!map.preferredSeed) {
    return [];
  }
  const exists = map.data.nodes.some((n) => n.id === map.preferredSeed);
  if (exists) {
    return [];
  }
  return [{ level: "error", rule: "bad-preferred-seed", message: `preferredSeed「${map.preferredSeed}」不指向任何节点` }];
}

function checkContentStyle(nodes: KnowledgeNode[]): Issue[] {
  const issues: Issue[] = [];
  for (const node of nodes) {
    if (!node.details.analogy) {
      issues.push({ level: "warning", rule: "missing-analogy", message: `节点 ${node.id} 缺少 analogy（内容图谱风格要求每节点带类比）` });
    }
    const concepts = node.details.key_concepts;
    if (!concepts || concepts.length < MIN_KEY_CONCEPTS) {
      issues.push({ level: "warning", rule: "thin-key-concepts", message: `节点 ${node.id} 的 key_concepts 少于 ${MIN_KEY_CONCEPTS} 个` });
    }
    if (!node.details.source) {
      issues.push({ level: "warning", rule: "missing-source", message: `节点 ${node.id} 缺少 source（无法溯源核验）` });
    }
  }
  return issues;
}

// ============================================================
// L2 黑神话双视角完整性 — 只对 black-myth 图触发，纳入 npm run validate 门禁。
//   bm-missing-backstage      error   每个节点必须有非空 backstage.summary
//   bm-platform-no-support-in error   每个 platform 节点必须有 ≥1 条「支撑」入边
//   bm-cend-no-mapping        warning C 端业务节点（含其层级父）应有到 platform 的「支撑」映射
//   bm-backstage-thin         warning backstage.summary 过短，疑似占位灌水
// 边界：只验证、不改图；允许「父节点已映射」算覆盖，避免逼出硬凑边。
// ============================================================
function checkBlackMythRules(map: KnowledgeMap): Issue[] {
  const issues: Issue[] = [];
  const { nodes, edges } = map.data;
  const platformIds = new Set(nodes.filter((n) => n.type === "platform").map((n) => n.id));

  const supportInCount = new Map<string, number>(); // 「支撑」入边计数（按 target）
  const supportsPlatform = new Set<string>(); // 有「支撑」出边指向 platform 的节点
  const parentOf = new Map<string, string>(); // 层级父：包含边 target → source

  for (const edge of edges) {
    if (edge.label === BM_SUPPORT_LABEL) {
      supportInCount.set(edge.target, (supportInCount.get(edge.target) ?? 0) + 1);
      if (platformIds.has(edge.target)) {
        supportsPlatform.add(edge.source);
      }
    } else if (edge.label === BM_CONTAIN_LABEL) {
      parentOf.set(edge.target, edge.source);
    }
  }

  for (const node of nodes) {
    const summary = node.details.backstage?.summary?.trim() ?? "";
    if (!summary) {
      issues.push({
        level: "error",
        rule: "bm-missing-backstage",
        message: `节点 ${node.id} 缺少 details.backstage.summary（双视角必须有 B 端支撑说明）`,
      });
    } else if (summary.length < BM_MIN_BACKSTAGE_SUMMARY) {
      issues.push({
        level: "warning",
        rule: "bm-backstage-thin",
        message: `节点 ${node.id} 的 backstage.summary 过短（< ${BM_MIN_BACKSTAGE_SUMMARY} 字），疑似占位灌水`,
      });
    }
  }

  for (const node of nodes) {
    if (node.type === "platform" && (supportInCount.get(node.id) ?? 0) === 0) {
      issues.push({
        level: "error",
        rule: "bm-platform-no-support-in",
        message: `中后台节点 ${node.id} 没有任何「支撑」入边（孤立的 B 端能力）`,
      });
    }
  }

  // 节点自身或任一层级祖先映射了 platform，即视为双视角覆盖。
  const coveredByMapping = (id: string): boolean => {
    let cur: string | undefined = id;
    const guard = new Set<string>();
    while (cur && !guard.has(cur)) {
      guard.add(cur);
      if (supportsPlatform.has(cur)) return true;
      cur = parentOf.get(cur);
    }
    return false;
  };
  for (const node of nodes) {
    if (node.type === "platform" || node.type === "overview") continue;
    if (!coveredByMapping(node.id)) {
      issues.push({
        level: "warning",
        rule: "bm-cend-no-mapping",
        message: `C 端节点 ${node.id} 及其层级父节点都没有到中后台的「支撑」映射边（双视角可能不完整）`,
      });
    }
  }

  return issues;
}

function collectIssues(map: KnowledgeMap): Issue[] {
  const { nodes, edges } = map.data;
  const issues: Issue[] = [
    ...checkNodeIds(nodes),
    ...checkEdgeIntegrity(nodes, edges),
    ...checkOrphans(nodes, edges),
    ...checkTypeConsistency(map),
    ...checkPreferredSeed(map),
  ];
  if (CONTENT_STYLE_MAPS.has(map.id)) {
    issues.push(...checkContentStyle(nodes));
  }
  if (map.id === BLACK_MYTH_ID) {
    issues.push(...checkBlackMythRules(map));
  }
  return issues;
}

function typeBreakdown(nodes: KnowledgeNode[]): string {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
  }
  return [...counts.entries()].map(([t, c]) => `${t}=${c}`).join(", ");
}

function printMapReport(map: KnowledgeMap, issues: Issue[]): { errors: number; warnings: number } {
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");
  console.log(`\n━━━ 图：${map.id}（${map.label}）━━━`);
  console.log(`节点 ${map.data.nodes.length} · 边 ${map.data.edges.length} · 类型分布：${typeBreakdown(map.data.nodes)}`);
  for (const issue of errors) {
    console.log(`  ✗ [${issue.rule}] ${issue.message}`);
  }
  for (const issue of warnings) {
    console.log(`  ⚠ [${issue.rule}] ${issue.message}`);
  }
  if (issues.length === 0) {
    console.log("  ✓ 无问题");
  }
  console.log(`  小计：${errors.length} 个 error，${warnings.length} 个 warning`);
  return { errors: errors.length, warnings: warnings.length };
}

function main(): void {
  let totalErrors = 0;
  let totalWarnings = 0;
  for (const map of KNOWLEDGE_MAPS) {
    const issues = collectIssues(map);
    const { errors, warnings } = printMapReport(map, issues);
    totalErrors += errors;
    totalWarnings += warnings;
  }
  console.log(`\n═══ 总计：${totalErrors} 个 error，${totalWarnings} 个 warning ═══`);
  if (totalErrors > 0) {
    console.log("L0 结构验证未通过：存在必须修复的 error。\n");
    process.exit(1);
  }
  console.log("L0 结构验证通过。\n");
}

main();
