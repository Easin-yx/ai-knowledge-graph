import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { KnowledgeNode } from "../types";
import type { NodeTypeStyle } from "../constants/theme";

export interface SearchBoxHandle {
  open: () => void;
}

interface SearchBoxProps {
  nodes: KnowledgeNode[];
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
  onPick: (nodeId: string) => void;
  mobileHidden: boolean;
}

interface ScoredNode {
  node: KnowledgeNode;
  score: number;
}

const MAX_RESULTS = 8;

export const SearchBox = forwardRef<SearchBoxHandle, SearchBoxProps>(
  function SearchBox(
    { nodes, typeStyles, typeOrder, onPick, mobileHidden },
    ref
  ) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const desktopInputRef = useRef<HTMLInputElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);

    const fallbackStyle = typeStyles[typeOrder[0]];

    const scoreNode = useCallback((node: KnowledgeNode, q: string): number => {
      const label = node.label.toLowerCase();
      if (label.startsWith(q)) {
        return 100;
      }
      if (label.includes(q)) {
        return 80;
      }
      const zh = node.details.zh_label;
      if (zh && zh.toLowerCase().includes(q)) {
        return 60;
      }
      const concepts = node.details.key_concepts;
      if (concepts && concepts.some((c) => c.toLowerCase().includes(q))) {
        return 40;
      }
      if (node.details.summary.toLowerCase().includes(q)) {
        return 20;
      }
      return 0;
    }, []);

    const results = useMemo<KnowledgeNode[]>(() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return [];
      }
      const scored: ScoredNode[] = [];
      for (const node of nodes) {
        const score = scoreNode(node, q);
        if (score > 0) {
          scored.push({ node, score });
        }
      }
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, MAX_RESULTS).map((s) => s.node);
    }, [query, nodes, scoreNode]);

    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    const resolveStyle = useCallback(
      (type: string): NodeTypeStyle => {
        const style = typeStyles[type];
        if (style) {
          return style;
        }
        return fallbackStyle;
      },
      [typeStyles, fallbackStyle]
    );

    const pickNode = useCallback(
      (nodeId: string) => {
        onPick(nodeId);
        setQuery("");
        setMobileOpen(false);
        desktopInputRef.current?.blur();
      },
      [onPick]
    );

    const openDesktop = useCallback(() => {
      const input = desktopInputRef.current;
      if (input) {
        input.focus();
        input.select();
      }
    }, []);

    const openMobile = useCallback(() => {
      setMobileOpen(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          openDesktop();
          openMobile();
        },
      }),
      [openDesktop, openMobile]
    );

    useEffect(() => {
      if (mobileOpen) {
        mobileInputRef.current?.focus();
      }
    }, [mobileOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, results.length - 1));
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          return;
        }
        if (e.key === "Enter") {
          const target = results[activeIndex];
          if (target) {
            pickNode(target.id);
          }
          return;
        }
        if (e.key === "Escape") {
          setQuery("");
          setMobileOpen(false);
          desktopInputRef.current?.blur();
        }
      },
      [results, activeIndex, pickNode]
    );

    const hasResults = results.length > 0;
    const showEmpty = query.trim().length > 0 && !hasResults;

    return (
      <>
        {/* 桌面端：顶部居中常驻搜索岛 */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 hidden justify-center px-4 sm:top-4 md:flex">
          <div className="pointer-events-auto relative w-64 lg:w-80">
            <div className="glass glass-highlight flex h-12 items-center gap-2 rounded-2xl px-3.5">
              <SearchIcon />
              <input
                ref={desktopInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="搜索节点…"
                aria-label="搜索节点"
                className="min-w-0 flex-1 bg-transparent text-sm text-[var(--akg-text)] placeholder:text-[var(--akg-text-dim)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="清空搜索"
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[var(--akg-text-dim)] transition hover:bg-white/10 hover:text-[var(--akg-text)]"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
            {(hasResults || showEmpty) && (
              <ResultList
                results={results}
                activeIndex={activeIndex}
                showEmpty={showEmpty}
                resolveStyle={resolveStyle}
                onHoverItem={setActiveIndex}
                onPick={pickNode}
              />
            )}
          </div>
        </div>

        {/* 移动端：左下浮动按钮 */}
        {!mobileHidden && (
          <button
            type="button"
            onClick={openMobile}
            aria-label="搜索节点"
            className="glass glass-highlight absolute bottom-4 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full text-[var(--akg-text)] transition active:scale-95 md:hidden"
          >
            <SearchIcon />
          </button>
        )}

        {/* 移动端：搜索浮层 */}
        {mobileOpen && (
          <div className="absolute inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              aria-hidden="true"
              onClick={() => {
                setMobileOpen(false);
                setQuery("");
              }}
            />
            <div className="akg-fade-in absolute inset-x-3 top-3 flex flex-col gap-2">
              <div className="glass glass-highlight flex h-12 items-center gap-2 rounded-2xl px-3.5">
                <SearchIcon />
                <input
                  ref={mobileInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索节点…"
                  aria-label="搜索节点"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[var(--akg-text)] placeholder:text-[var(--akg-text-dim)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setQuery("");
                  }}
                  aria-label="关闭搜索"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--akg-text-dim)] transition hover:bg-white/10 hover:text-[var(--akg-text)]"
                >
                  <ClearIcon />
                </button>
              </div>
              {(hasResults || showEmpty) && (
                <ResultList
                  results={results}
                  activeIndex={activeIndex}
                  showEmpty={showEmpty}
                  resolveStyle={resolveStyle}
                  onHoverItem={setActiveIndex}
                  onPick={pickNode}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);

function ResultList({
  results,
  activeIndex,
  showEmpty,
  resolveStyle,
  onHoverItem,
  onPick,
}: {
  results: KnowledgeNode[];
  activeIndex: number;
  showEmpty: boolean;
  resolveStyle: (type: string) => NodeTypeStyle;
  onHoverItem: (index: number) => void;
  onPick: (nodeId: string) => void;
}) {
  return (
    <div className="glass glass-highlight akg-fade-in mt-2 flex max-h-[60vh] flex-col gap-0.5 overflow-y-auto rounded-2xl p-1.5">
      {showEmpty && (
        <p className="px-3 py-3 text-sm text-[var(--akg-text-dim)]">
          没有匹配的节点
        </p>
      )}
      {results.map((n, i) => {
        const style = resolveStyle(n.type);
        const active = i === activeIndex;
        return (
          <button
            key={n.id}
            type="button"
            onMouseEnter={() => onHoverItem(i)}
            onClick={() => onPick(n.id)}
            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition ${
              active ? "bg-white/12" : "hover:bg-white/8"
            }`}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: style.base }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-[var(--akg-text)]">
                {n.label}
              </span>
              {n.details.zh_label && (
                <span className="block truncate text-xs text-[var(--akg-text-dim)]">
                  {n.details.zh_label}
                </span>
              )}
            </span>
            <span
              className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-[var(--akg-text-dim)]"
              style={{ backgroundColor: style.glow }}
            >
              {style.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-[var(--akg-text-dim)]"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
