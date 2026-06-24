import { useEffect, useState } from "react";
import { GITHUB_URL } from "../constants/site";
import { siteConfig } from "../site.config";
import type { Theme } from "../hooks/useTheme";
import type { KnowledgeMap, MapGroup, MapDomain } from "../types";

// 下拉主分区：按「领域」聚类（讲什么主题）
const MAP_DOMAIN_ORDER: MapDomain[] = ["tech-product", "game-dev", "language"];
const MAP_DOMAIN_LABEL: Record<MapDomain, string> = {
  "tech-product": "技术与产品",
  "game-dev": "游戏研发",
  language: "语言表达",
};

// 意图角标：每张图的「为谁看」轴，与领域正交，作为列表项上的小标签
const MAP_GROUP_LABEL: Record<MapGroup, string> = {
  professional: "专业向",
  interest: "兴趣向",
};

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
  onExpandAll: () => void;
  canReset: boolean;
  canExpandAll: boolean;
  maps: KnowledgeMap[];
  activeMapId: string;
  onSwitchMap: (id: string) => void;
}

export function Header({
  theme,
  onToggleTheme,
  onReset,
  onExpandAll,
  canReset,
  canExpandAll,
  maps,
  activeMapId,
  onSwitchMap,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-white/5 text-[var(--akg-text)] transition hover:bg-white/10 active:scale-95";

  const activeMap = maps.find((m) => m.id === activeMapId);
  const canSwitchMap = maps.length > 1;

  const handleSwitch = (id: string) => {
    onSwitchMap(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 pt-3 sm:px-4 sm:pt-4">
      {/* 左上岛：字标 + 当前地图下拉切换器 */}
      <div className="relative pointer-events-auto">
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          disabled={!canSwitchMap}
          className="glass glass-highlight flex h-12 min-w-0 items-center gap-2 rounded-2xl px-3 transition active:scale-[0.99] sm:gap-2.5 sm:px-3.5"
        >
          <Wordmark theme={theme} />
          {canSwitchMap && (
            <>
              <span className="h-6 w-px bg-[var(--glass-border)]" />
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[13px] font-semibold tracking-tight sm:text-sm">
                  {activeMap ? activeMap.label : "知识图谱"}
                </span>
                <ChevronDownIcon open={menuOpen} />
              </span>
            </>
          )}
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="menu"
              className="glass glass-highlight absolute left-0 top-full z-50 mt-2 flex w-64 max-w-[80vw] flex-col gap-0.5 rounded-2xl p-1.5"
            >
              {MAP_DOMAIN_ORDER.map((domain, domainIdx) => {
                const domainMaps = maps.filter((m) => m.domain === domain);
                if (domainMaps.length === 0) {
                  return null;
                }
                return (
                  <div key={domain} className="flex flex-col gap-0.5">
                    {domainIdx > 0 && (
                      <span
                        className="mx-2 my-1 h-px bg-[var(--glass-border)]"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      role="presentation"
                      className="px-3 pb-0.5 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--akg-text-dim)]"
                    >
                      {MAP_DOMAIN_LABEL[domain]}
                    </span>
                    {domainMaps.map((m) => {
                      const active = m.id === activeMapId;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          role="menuitemradio"
                          aria-checked={active}
                          onClick={() => handleSwitch(m.id)}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition active:scale-[0.98] ${
                            active
                              ? "bg-white/12 text-[var(--akg-text)]"
                              : "text-[var(--akg-text)] hover:bg-white/8"
                          }`}
                        >
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="flex min-w-0 items-center gap-1.5">
                              <span className="truncate text-sm font-medium">
                                {m.label}
                              </span>
                              <IntentBadge group={m.group} />
                            </span>
                            <span className="truncate text-xs text-[var(--akg-text-dim)]">
                              {m.subtitle}
                            </span>
                          </span>
                          {active && <CheckIcon />}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 右上岛：主题切换 + GitHub + 全部展开 + 全部收回 */}
      <div className="glass glass-highlight pointer-events-auto flex h-12 items-center gap-1.5 rounded-2xl px-2 sm:gap-2 sm:px-2.5">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
          title={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
          className={iconButtonClass}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="在 GitHub 上查看本项目"
          title="GitHub"
          className={iconButtonClass}
        >
          <GitHubIcon />
        </a>
        {canExpandAll && (
          <button
            type="button"
            onClick={onExpandAll}
            aria-label="展开全部节点"
            title="展开全部节点"
            className={iconButtonClass}
          >
            <ExpandAllIcon />
          </button>
        )}
        {canReset && (
          <button
            type="button"
            onClick={onReset}
            aria-label="收起全部，回到起点"
            title="收起全部，回到起点"
            className={iconButtonClass}
          >
            <ResetIcon />
          </button>
        )}
      </div>
    </header>
  );
}

// 意图角标：专业向偏冷蓝、兴趣向偏暖橙，弱化为低饱和小标签
function IntentBadge({ group }: { group: MapGroup }) {
  const isPro = group === "professional";
  return (
    <span
      className={`shrink-0 rounded-md px-1.5 py-px text-[10px] font-medium leading-tight ${
        isPro
          ? "bg-[rgba(74,134,196,0.18)] text-[#6ea3d8]"
          : "bg-[rgba(224,138,60,0.18)] text-[#d4914f]"
      }`}
    >
      {MAP_GROUP_LABEL[group]}
    </span>
  );
}

function Wordmark({ theme }: { theme: Theme }) {
  const src = `${import.meta.env.BASE_URL}${
    theme === "dark" ? siteConfig.logoDark : siteConfig.logo
  }`;
  return (
    <img
      src={src}
      alt={siteConfig.titleEn}
      className="h-7 w-[92px] shrink-0 object-cover sm:h-8 sm:w-[110px]"
      style={{ objectPosition: "center 46%" }}
    />
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 text-[var(--akg-text-dim)] transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-[var(--akg-text)]"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ExpandAllIcon() {
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
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function ResetIcon() {
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
    >
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
