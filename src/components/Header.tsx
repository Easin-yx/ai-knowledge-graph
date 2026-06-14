import { GITHUB_URL, SITE_TITLE, SITE_TITLE_EN } from "../constants/site";
import type { Theme } from "../hooks/useTheme";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onReset: () => void;
  canReset: boolean;
}

export function Header({ theme, onToggleTheme, onReset, canReset }: HeaderProps) {
  const iconButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-white/5 text-[var(--akg-text)] transition hover:bg-white/10 active:scale-95";

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 pt-3 sm:px-4 sm:pt-4">
      {/* 左上岛：logo + 标题（小屏只留 logo） */}
      <div className="glass glass-highlight pointer-events-auto flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
        <LogoMark />
        <div className="hidden min-w-0 sm:block">
          <h1 className="truncate text-[15px] font-semibold tracking-tight sm:text-base">
            {SITE_TITLE}
          </h1>
          <p className="truncate text-xs text-[var(--akg-text-dim)]">
            {SITE_TITLE_EN} · 可视化 AI 知识网络
          </p>
        </div>
      </div>

      {/* 右上岛：主题切换 + GitHub + 重置 */}
      <div className="glass glass-highlight pointer-events-auto flex items-center gap-1.5 rounded-2xl px-2 py-2 sm:gap-2 sm:px-2.5">
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

function LogoMark() {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2a3a63] to-[#0e1426] shadow-inner">
      <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <g stroke="#7d8bb0" strokeWidth="3" opacity="0.7">
          <line x1="32" y1="18" x2="17" y2="42" />
          <line x1="32" y1="18" x2="47" y2="42" />
          <line x1="17" y1="42" x2="47" y2="42" />
        </g>
        <circle cx="32" cy="18" r="8" fill="#ff9f4a" />
        <circle cx="17" cy="42" r="7" fill="#4aa3ff" />
        <circle cx="47" cy="42" r="7" fill="#b07bff" />
      </svg>
    </span>
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
