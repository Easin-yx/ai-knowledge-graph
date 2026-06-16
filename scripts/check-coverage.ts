import { aiMap } from "../src/data/maps/ai";
import { AI_TAXONOMY } from "./taxonomy";
import type { TaxonomyTopic } from "./taxonomy";

// ============================================================
// 缺口检测 — Loop 的「L2 覆盖完整性」判定
//
// 把实际图谱节点 diff 大纲（taxonomy.ts），产出缺失主题清单。
//   - core 主题缺失     → 硬缺口，退出码 1（阻断「完成」）
//   - recommended/optional 缺失 → 软缺口，进待办，不阻断
//
// 用法：npm run check-coverage
// 边界：只读不改；它告诉你「还缺什么」，由你/执行 Agent 去补。
// ============================================================

const PRIORITY_ORDER: Record<TaxonomyTopic["priority"], number> = {
  core: 0,
  recommended: 1,
  optional: 2,
};

function buildNodeIdSet(): Set<string> {
  return new Set(aiMap.data.nodes.map((n) => n.id));
}

function dedupeTopics(): TaxonomyTopic[] {
  const byId = new Map<string, TaxonomyTopic>();
  for (const domain of AI_TAXONOMY) {
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

function summarize(present: Set<string>): void {
  const all = dedupeTopics();
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
  const present = buildNodeIdSet();
  let coreMissing = 0;
  for (const domain of AI_TAXONOMY) {
    coreMissing += reportDomain(domain.domain, domain.topics, present);
  }
  summarize(present);
  if (coreMissing > 0) {
    console.log(`\n覆盖未达标：仍有 ${coreMissing} 个 core 主题缺失。\n`);
    process.exit(1);
  }
  console.log(`\n所有 core 主题已覆盖。\n`);
}

main();
