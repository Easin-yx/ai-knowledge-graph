import { useEffect, useState } from "react";
import type { KnowledgeNode, NodeSource } from "../types";
import type { NodeTypeStyle } from "../constants/theme";

interface Neighbor {
  node: KnowledgeNode;
  relation: string;
  direction: "out" | "in";
}

interface NodeDetailContentProps {
  node: KnowledgeNode;
  neighbors: Neighbor[];
  onSelectNeighbor: (node: KnowledgeNode) => void;
  onCollapse?: () => void;
  canCollapse?: boolean;
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
}

export function NodeDetailContent({
  node,
  neighbors,
  onSelectNeighbor,
  onCollapse,
  canCollapse,
  typeStyles,
  typeOrder,
}: NodeDetailContentProps) {
  const { details } = node;
  const fallbackStyle = typeStyles[typeOrder[0]];
  const style = typeStyles[node.type] ?? fallbackStyle;
  const backstage = details.backstage;

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

      <div className="h-px w-full bg-[var(--glass-border)]" />

      {/* 双视角内容：有 backstage 时显示切换控件 + 3D 翻转卡片 */}
      {backstage ? (
        <>
          <PerspectiveToggle face={face} onChange={setFace} accent={style.base} />
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
                  notes={details.notes}
                  keyConcepts={details.key_concepts}
                />
              </div>
              {/* 背面：B 端中后台视角 */}
              <div
                className="akg-flip-face akg-flip-back flex flex-col gap-5"
                aria-hidden={!isFlipped}
              >
                <PerspectiveBody
                  summary={backstage.summary}
                  notes={backstage.notes}
                  keyConcepts={backstage.key_concepts}
                  backstage
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <PerspectiveBody
          summary={details.summary}
          analogy={details.analogy}
          notes={details.notes}
          keyConcepts={details.key_concepts}
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

// 视角切换控件：C 端玩家 / B 端中后台
function PerspectiveToggle({
  face,
  onChange,
  accent,
}: {
  face: "front" | "back";
  onChange: (face: "front" | "back") => void;
  accent: string;
}) {
  const options: { value: "front" | "back"; label: string; hint: string }[] = [
    { value: "front", label: "C端", hint: "玩家体验" },
    { value: "back", label: "B端", hint: "中后台" },
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
  notes,
  keyConcepts,
  backstage,
}: {
  summary: string;
  analogy?: string;
  notes?: string;
  keyConcepts?: string[];
  backstage?: boolean;
}) {
  return (
    <>
      <Section title={backstage ? "中后台支撑" : "摘要"}>
        <p className="text-sm leading-relaxed text-[var(--akg-text)]">
          {summary}
        </p>
      </Section>

      {analogy && (
        <Section title="打个比方">
          <p className="rounded-xl border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2.5 text-sm leading-relaxed text-[var(--akg-text)]">
            {analogy}
          </p>
        </Section>
      )}

      {notes && (
        <Section title={backstage ? "中后台思考" : "延伸笔记"}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--akg-text-dim)]">
            {notes}
          </p>
        </Section>
      )}

      {keyConcepts && keyConcepts.length > 0 && (
        <Section title="关键概念">
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
      )}
    </>
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

function ChevronIcon() {
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
      className="shrink-0 text-[var(--akg-text-dim)] transition group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export type { Neighbor };
