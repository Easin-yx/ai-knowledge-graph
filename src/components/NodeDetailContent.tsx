import { useEffect, useState } from "react";
import type { CardArchetype, CodeSample, KnowledgeNode, NodeSource } from "../types";
import type { NodeTypeStyle } from "../constants/theme";
import { CodeBlock } from "./CodeBlock";
import { normalizeLang, type CodeLang } from "../lib/highlighter";

interface Neighbor {
  node: KnowledgeNode;
  relation: string;
  direction: "out" | "in";
}

export interface LearningOrder {
  current: number;
  total: number;
  next?: { id: string; label: string };
}

type ArchetypeBlock = "summary" | "analogy" | "code" | "facts" | "steps" | "contrast" | "key_concepts" | "notes";

const DEFAULT_BLOCKS: ArchetypeBlock[] = ["summary", "analogy", "notes", "key_concepts"];

const ARCHETYPE_BLOCKS: Record<CardArchetype, ArchetypeBlock[]> = {
  category: ["summary", "key_concepts", "notes"],
  concept: ["summary", "analogy", "key_concepts", "notes"],
  mechanism: ["summary", "code", "key_concepts", "notes", "analogy"],
  entity: ["summary", "facts", "key_concepts", "notes"],
  practice: ["summary", "steps", "contrast", "notes"],
};

interface NodeDetailContentProps {
  node: KnowledgeNode;
  neighbors: Neighbor[];
  onSelectNeighbor: (node: KnowledgeNode) => void;
  onCollapse?: () => void;
  canCollapse?: boolean;
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
  typeArchetypes?: Record<string, CardArchetype>;
  perspectiveLabels?: { front: string; back: string; frontHint?: string; backHint?: string };
  learningOrder?: LearningOrder;
}

export function NodeDetailContent({
  node,
  neighbors,
  onSelectNeighbor,
  onCollapse,
  canCollapse,
  typeStyles,
  typeOrder,
  typeArchetypes,
  perspectiveLabels,
  learningOrder,
}: NodeDetailContentProps) {
  const { details } = node;
  const fallbackStyle = typeStyles[typeOrder[0]];
  const style = typeStyles[node.type] ?? fallbackStyle;
  const backstage = details.backstage;
  const archetype = node.card ?? typeArchetypes?.[node.type];

  // 视角面：front = C 端玩家视角，back = B 端中后台视角
  const [face, setFace] = useState<"front" | "back">("front");
  // 切换到另一个节点时，复位为正面（C 端）
  useEffect(() => {
    setFace("front");
  }, [node.id]);
  const isFlipped = face === "back";

  return (
    <div className="flex flex-col gap-5">
      {/* 标题区 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
              backgroundColor: style.glow,
              color: "#fff",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: style.base }}
            />
            {style.label}
          </span>
        </div>
        <h2 className="text-xl font-semibold leading-tight tracking-tight">
          {node.label}
        </h2>
        {details.zh_label && (
          <p className="text-sm text-[var(--akg-text-dim)]">
            {details.zh_label}
          </p>
        )}
      </div>

      {learningOrder && (
        <div className="flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2">
          <span className="text-xs font-medium text-[var(--akg-text-dim)]">
            学习顺序 {learningOrder.current} / {learningOrder.total}
          </span>
          {learningOrder.next && (
            <>
              <span className="text-[var(--akg-text-dim)]">·</span>
              <span className="text-xs text-[var(--akg-text-dim)]">
                下一步：{learningOrder.next.label}
              </span>
            </>
          )}
        </div>
      )}

      <div className="h-px w-full bg-[var(--glass-border)]" />

      {/* 双视角内容：有 backstage 时显示切换控件 + 3D 翻转卡片 */}
      {backstage ? (
        <>
          <PerspectiveToggle face={face} onChange={setFace} accent={style.base} labels={perspectiveLabels} />
          <div className="akg-flip">
            <div className={`akg-flip-inner${isFlipped ? " is-flipped" : ""}`}>
              {/* 正面：C 端玩家视角 */}
              <div
                className="akg-flip-face flex flex-col gap-5"
                aria-hidden={isFlipped}
              >
                <PerspectiveBody
                  summary={details.summary}
                  analogy={details.analogy}
                  code={details.code}
                  facts={details.facts}
                  steps={details.steps}
                  contrast={details.contrast}
                  notes={details.notes}
                  keyConcepts={details.key_concepts}
                  archetype={archetype}
                />
              </div>
              {/* 背面：B 端中后台视角 */}
              <div
                className="akg-flip-face akg-flip-back flex flex-col gap-5"
                aria-hidden={!isFlipped}
              >
                <PerspectiveBody
                  summary={backstage.summary}
                  code={backstage.code}
                  facts={backstage.facts}
                  steps={backstage.steps}
                  contrast={backstage.contrast}
                  notes={backstage.notes}
                  keyConcepts={backstage.key_concepts}
                  archetype={archetype}
                  backstage
                  sectionLabels={perspectiveLabels}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <PerspectiveBody
          summary={details.summary}
          analogy={details.analogy}
          code={details.code}
          facts={details.facts}
          steps={details.steps}
          contrast={details.contrast}
          notes={details.notes}
          keyConcepts={details.key_concepts}
          archetype={archetype}
        />
      )}

      {/* 相邻节点 */}
      {neighbors.length > 0 && (
        <Section title={`关联节点 · ${neighbors.length}`}>
          <ul className="flex flex-col gap-1.5">
            {neighbors.map(({ node: n, relation, direction }) => {
              const nStyle = typeStyles[n.type] ?? fallbackStyle;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => onSelectNeighbor(n)}
                    className="group flex w-full items-center gap-2.5 rounded-xl border border-transparent bg-white/[0.04] px-3 py-2 text-left transition hover:border-[var(--glass-border)] hover:bg-white/10"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: nStyle.base }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {n.label}
                      </span>
                      <span className="block truncate text-xs text-[var(--akg-text-dim)]">
                        {direction === "out" ? "→ " : "← "}
                        {relation}
                      </span>
                    </span>
                    <ChevronIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* 来源 */}
      {details.source && (
        <Section title="来源">
          <SourceView source={details.source} />
        </Section>
      )}

      {/* 收起此节点（非种子节点才可收回其子树） */}
      {canCollapse && onCollapse && (
        <button
          type="button"
          onClick={onCollapse}
          className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[var(--akg-text)] transition hover:bg-white/10 active:scale-[0.98]"
        >
          <CollapseIcon />
          收起此节点
        </button>
      )}
    </div>
  );
}

// 视角切换控件：默认 C 端/B 端；各地图可通过 perspectiveLabels 覆盖
function PerspectiveToggle({
  face,
  onChange,
  accent,
  labels,
}: {
  face: "front" | "back";
  onChange: (face: "front" | "back") => void;
  accent: string;
  labels?: { front: string; back: string; frontHint?: string; backHint?: string };
}) {
  const options: { value: "front" | "back"; label: string; hint: string }[] = [
    { value: "front", label: labels?.front ?? "C端", hint: labels?.frontHint ?? "玩家体验" },
    { value: "back", label: labels?.back ?? "B端", hint: labels?.backHint ?? "中后台" },
  ];
  return (
    <div className="flex rounded-xl border border-[var(--glass-border)] bg-white/[0.04] p-1">
      {options.map((opt) => {
        const active = face === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition active:scale-[0.98] ${
              active
                ? "text-white shadow-sm"
                : "text-[var(--akg-text-dim)] hover:text-[var(--akg-text)]"
            }`}
            style={active ? { backgroundColor: accent } : undefined}
          >
            <span>{opt.label}</span>
            <span
              className={`text-[11px] ${active ? "text-white/75" : "text-[var(--akg-text-dim)]"}`}
            >
              {opt.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// 单个视角的正文区块（摘要 / 类比 / 笔记 / 关键概念）
function PerspectiveBody({
  summary,
  analogy,
  code,
  facts,
  steps,
  contrast,
  notes,
  keyConcepts,
  archetype,
  backstage,
  sectionLabels,
}: {
  summary: string;
  analogy?: string;
  code?: CodeSample[];
  facts?: { label: string; value: string }[];
  steps?: string[];
  contrast?: { wrong: string; right: string };
  notes?: string;
  keyConcepts?: string[];
  archetype?: CardArchetype;
  backstage?: boolean;
  sectionLabels?: { front: string; back: string };
}) {
  const backLabel = sectionLabels?.back ?? "中后台";
  const blocks = archetype ? ARCHETYPE_BLOCKS[archetype] : DEFAULT_BLOCKS;

  const renderBlock = (block: ArchetypeBlock) => {
    switch (block) {
      case "summary":
        return (
          <Section key={block} title={backstage ? `${backLabel} 写法` : "摘要"}>
            <p className="text-sm leading-relaxed text-[var(--akg-text)]">
              {summary}
            </p>
          </Section>
        );
      case "analogy":
        return analogy ? (
          <Section key={block} title="打个比方">
            <p className="rounded-xl border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2.5 text-sm leading-relaxed text-[var(--akg-text)]">
              {analogy}
            </p>
          </Section>
        ) : null;
      case "code":
        return code && code.length > 0 ? <CodeSamplesBlock key={block} samples={code} /> : null;
      case "facts":
        return facts && facts.length > 0 ? <FactsBlock key={block} facts={facts} /> : null;
      case "steps":
        return steps && steps.length > 0 ? <StepsBlock key={block} steps={steps} /> : null;
      case "contrast":
        return contrast ? <ContrastBlock key={block} contrast={contrast} /> : null;
      case "notes":
        return notes ? <NotesSection key={block} notes={notes} backstage={backstage} /> : null;
      case "key_concepts":
        return keyConcepts && keyConcepts.length > 0 ? (
          <Section key={block} title="关键概念">
            <div className="flex flex-wrap gap-1.5">
              {keyConcepts.map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-[var(--glass-border)] bg-white/5 px-2 py-1 text-xs text-[var(--akg-text)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      {blocks.map((block) => renderBlock(block))}
    </>
  );
}

function CodeSamplesBlock({ samples }: { samples: CodeSample[] }) {
  return (
    <Section title="代码示例">
      <div className="flex flex-col gap-2.5">
        {samples.map((sample, idx) => (
          <div key={`${sample.lang}-${idx}`} className="flex flex-col gap-1.5">
            {sample.caption && (
              <p className="text-xs text-[var(--akg-text-dim)]">{sample.caption}</p>
            )}
            <CodeBlock code={sample.content} lang={normalizeLang(sample.lang)} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function FactsBlock({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <Section title="属性事实">
      <div className="overflow-hidden rounded-xl border border-[var(--glass-border)] bg-white/[0.04]">
        {facts.map((fact, idx) => (
          <div
            key={`${fact.label}-${idx}`}
            className={`grid grid-cols-[96px,1fr] gap-3 px-3 py-2.5 ${
              idx > 0 ? "border-t border-[var(--glass-border)]" : ""
            }`}
          >
            <span className="text-xs font-medium text-[var(--akg-text-dim)]">{fact.label}</span>
            <span className="text-sm leading-relaxed text-[var(--akg-text)]">{fact.value}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function StepsBlock({ steps }: { steps: string[] }) {
  return (
    <Section title="实践步骤">
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-[var(--akg-text)]">
        {steps.map((step, idx) => (
          <li key={`${idx}-${step}`} className="marker:text-[var(--akg-text-dim)]">
            {step}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ContrastBlock({ contrast }: { contrast: { wrong: string; right: string } }) {
  return (
    <Section title="正误对照">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5">
          <p className="mb-1 text-xs font-medium text-red-200">常见误区</p>
          <p className="text-sm leading-relaxed text-[var(--akg-text)]">{contrast.wrong}</p>
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2.5">
          <p className="mb-1 text-xs font-medium text-emerald-200">推荐做法</p>
          <p className="text-sm leading-relaxed text-[var(--akg-text)]">{contrast.right}</p>
        </div>
      </div>
    </Section>
  );
}

function NotesSection({
  notes,
  backstage,
}: {
  notes: string;
  backstage?: boolean;
}) {
  const tiers = parseLearningTiers(notes);
  if (tiers) {
    return <LearningTierNotes sections={tiers} />;
  }
  return (
    <Section title={backstage ? "代码示例与差异" : "延伸笔记"}>
      <NotesBody text={notes} />
    </Section>
  );
}

type NotesSegment =
  | { type: "text"; text: string }
  | { type: "code"; lang: CodeLang; code: string };

/** 把 notes 字符串按 ``` 围栏切成「文本段 / 代码段」交替序列 */
function parseNotesSegments(notes: string): NotesSegment[] {
  const segments: NotesSegment[] = [];
  const fence = /```([\w+-]*)\r?\n([\s\S]*?)```/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  const pushText = (raw: string) => {
    const text = raw.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
    if (text.trim()) segments.push({ type: "text", text });
  };
  while ((match = fence.exec(notes)) !== null) {
    if (match.index > cursor) pushText(notes.slice(cursor, match.index));
    segments.push({
      type: "code",
      lang: normalizeLang(match[1]),
      code: match[2].replace(/\n$/, ""),
    });
    cursor = fence.lastIndex;
  }
  if (cursor < notes.length) pushText(notes.slice(cursor));
  return segments;
}

/** 渲染 notes：散文段落用文本，``` 围栏代码用 Shiki 代码块 */
function NotesBody({ text }: { text: string }) {
  const segments = parseNotesSegments(text);
  if (segments.length === 0) {
    return (
      <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--akg-text-dim)]">
        {text}
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2.5">
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <p
            key={i}
            className="whitespace-pre-line text-sm leading-relaxed text-[var(--akg-text-dim)]"
          >
            {seg.text}
          </p>
        ) : (
          <CodeBlock key={i} code={seg.code} lang={seg.lang} />
        )
      )}
    </div>
  );
}

interface LearningTier {
  label: string;
  content: string;
  defaultOpen: boolean;
}

function tierSortKey(label: string): number {
  if (label.startsWith("学习顺序")) return 0;
  if (label.startsWith("入门")) return 1;
  if (label.startsWith("进阶")) return 2;
  if (label.startsWith("精通")) return 3;
  return 9;
}

/** 解析 notes 中的【入门】【进阶】【精通】等分层；非分层笔记返回 null */
function parseLearningTiers(notes: string): LearningTier[] | null {
  const re = /【([^】]+)】/g;
  const hits = [...notes.matchAll(re)];
  const learningHits = hits.filter((h) =>
    /^(学习顺序|入门|进阶|精通)/.test(h[1]),
  );
  if (learningHits.length < 2) return null;

  const sections: LearningTier[] = [];
  for (let i = 0; i < hits.length; i++) {
    const label = hits[i][1];
    if (!/^(学习顺序|入门|进阶|精通)/.test(label)) continue;
    const start = hits[i].index! + hits[i][0].length;
    const end = i + 1 < hits.length ? hits[i + 1].index! : notes.length;
    const content = notes.slice(start, end).trim();
    if (!content) continue;
    sections.push({
      label,
      content,
      defaultOpen: label.startsWith("学习顺序") || label.startsWith("入门"),
    });
  }
  if (sections.length < 2) return null;
  sections.sort((a, b) => tierSortKey(a.label) - tierSortKey(b.label));
  return sections;
}

function LearningTierNotes({ sections }: { sections: LearningTier[] }) {
  return (
    <Section title="阅读分层">
      <div className="flex flex-col gap-2">
        {sections.map((sec) => (
          <LearningTierDisclosure key={sec.label} section={sec} />
        ))}
      </div>
    </Section>
  );
}

function LearningTierDisclosure({ section }: { section: LearningTier }) {
  const [open, setOpen] = useState(section.defaultOpen);
  const displayLabel = section.label.startsWith("精通")
    ? "精通"
    : section.label.startsWith("学习顺序")
      ? "学习顺序"
      : section.label;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--glass-border)] bg-white/[0.04]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
      >
        <span className="text-sm font-medium text-[var(--akg-text)]">
          {displayLabel}
        </span>
        <ChevronIcon className={`shrink-0 transition ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-[var(--glass-border)] px-3 py-2.5">
          <NotesBody text={section.content} />
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--akg-text-dim)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function SourceView({ source }: { source: NodeSource }) {
  switch (source.type) {
    case "paper":
      return (
        <SourceCard
          tag="论文"
          title={source.title}
          subtitle={[
            source.authors?.length ? source.authors.join(", ") : null,
            source.year ? String(source.year) : null,
          ]
            .filter(Boolean)
            .join(" · ")}
          url={source.url}
        />
      );
    case "blog":
      return <SourceCard tag="博客" title={source.title} url={source.url} />;
    case "doc":
      return <SourceCard tag="文档" title={source.title} url={source.url} />;
    case "book":
      return (
        <SourceCard
          tag="书籍"
          title={source.title}
          subtitle={source.authors?.join(", ")}
        />
      );
    case "conversation":
      return <SourceCard tag="来源" title="AI 对话" />;
    default:
      return null;
  }
}

function SourceCard({
  tag,
  title,
  subtitle,
  url,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  url?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-0.5 rounded-xl border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2.5 transition hover:bg-white/10">
      <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--akg-text-dim)]">
        {tag}
        {url ? " ↗" : ""}
      </span>
      <span className="text-sm font-medium leading-snug">{title}</span>
      {subtitle && (
        <span className="text-xs text-[var(--akg-text-dim)]">{subtitle}</span>
      )}
    </div>
  );
  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }
  return inner;
}

function CollapseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-[var(--akg-text-dim)] transition group-hover:translate-x-0.5 ${className}`}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export type { Neighbor };
