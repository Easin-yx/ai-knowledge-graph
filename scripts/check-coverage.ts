import { KNOWLEDGE_MAPS } from "../src/data/maps/index";
import { TAXONOMY_REGISTRY } from "./taxonomy";
import type { TaxonomyDomain, TaxonomyTopic } from "./taxonomy";
import type { KnowledgeMap } from "../src/types";

// ============================================================
// 缺口检测 — Loop 的「L2 覆盖完整性」判定
//
// 把实际图谱节点 diff 大纲（taxonomy.ts），产出缺失主题清单。
//   - core 主题缺失     → 硬缺口，退出码 1（阻断「完成」）
//   - recommended/optional 缺失 → 软缺口，进待办，不阻断
//
// 用法：npm run check-coverage [mapId]   （mapId 默认 ai）
//       npm run check-coverage:pm
// 边界：只读不改；它告诉你「还缺什么」，由你/执行 Agent 去补。
// ============================================================

const PRIORITY_ORDER: Record<TaxonomyTopic["priority"], number> = {
  core: 0,
  recommended: 1,
  optional: 2,
};

function resolveMap(mapId: string): KnowledgeMap {
  const map = KNOWLEDGE_MAPS.find((m) => m.id === mapId);
  if (!map) {
    const ids = KNOWLEDGE_MAPS.map((m) => m.id).join(", ");
    console.error(`找不到图谱「${mapId}」。可用：${ids}`);
    process.exit(2);
  }
  return map;
}

function buildNodeIdSet(map: KnowledgeMap): Set<string> {
  return new Set(map.data.nodes.map((n) => n.id));
}

function dedupeTopics(taxonomy: TaxonomyDomain[]): TaxonomyTopic[] {
  const byId = new Map<string, TaxonomyTopic>();
  for (const domain of taxonomy) {
    for (const topic of domain.topics) {
      const existing = byId.get(topic.id);
      if (!existing) {
        byId.set(topic.id, topic);
        continue;
      }
      if (PRIORITY_ORDER[topic.priority] < PRIORITY_ORDER[existing.priority]) {
        byId.set(topic.id, topic);
      }
    }
  }
  return [...byId.values()];
}

function reportDomain(domainName: string, topics: TaxonomyTopic[], present: Set<string>): number {
  const missing = topics.filter((t) => !present.has(t.id));
  const covered = topics.length - missing.length;
  console.log(`\n━━━ ${domainName} ── 覆盖 ${covered}/${topics.length} ━━━`);
  for (const topic of missing) {
    const tag = topic.priority === "core" ? "✗ core" : topic.priority === "recommended" ? "○ rec " : "· opt ";
    console.log(`  ${tag}  缺失：${topic.id}（${topic.label}）`);
  }
  if (missing.length === 0) {
    console.log("  ✓ 全部覆盖");
  }
  return missing.filter((t) => t.priority === "core").length;
}

function summarize(taxonomy: TaxonomyDomain[], present: Set<string>): void {
  const all = dedupeTopics(taxonomy);
  const missing = all.filter((t) => !present.has(t.id));
  const byPriority = {
    core: missing.filter((t) => t.priority === "core"),
    recommended: missing.filter((t) => t.priority === "recommended"),
    optional: missing.filter((t) => t.priority === "optional"),
  };
  const coveredCount = all.length - missing.length;
  const percent = ((coveredCount / all.length) * 100).toFixed(1);
  console.log(`\n═══ 覆盖总览：${coveredCount}/${all.length}（${percent}%）═══`);
  console.log(`缺口：core ${byPriority.core.length} · recommended ${byPriority.recommended.length} · optional ${byPriority.optional.length}`);
  if (byPriority.core.length > 0) {
    console.log(`\n硬缺口（core，阻断完成）：`);
    console.log(`  ${byPriority.core.map((t) => t.id).join(", ")}`);
  }
  if (byPriority.recommended.length > 0) {
    console.log(`\n软缺口（recommended，建议补，进待办）：`);
    console.log(`  ${byPriority.recommended.map((t) => t.id).join(", ")}`);
  }
}

function main(): void {
  const mapId = process.argv[2] ?? "ai";
  const map = resolveMap(mapId);
  const taxonomy = TAXONOMY_REGISTRY[mapId];

  console.log(`\n=== 覆盖检测：${map.id}（${map.label}）===`);

  if (!taxonomy || taxonomy.length === 0) {
    console.log(`\n图谱「${mapId}」尚未定义大纲（taxonomy.ts 中为空）。`);
    console.log(`先到 scripts/taxonomy.ts 填入领域与主题（这一步就是「定义目标」本身），再跑本检测。\n`);
    return;
  }

  const present = buildNodeIdSet(map);
  let coreMissing = 0;
  for (const domain of taxonomy) {
    coreMissing += reportDomain(domain.domain, domain.topics, present);
  }
  summarize(taxonomy, present);
  if (coreMissing > 0) {
    console.log(`\n覆盖未达标：仍有 ${coreMissing} 个 core 主题缺失。\n`);
    process.exit(1);
  }
  console.log(`\n所有 core 主题已覆盖。\n`);
}

main();
