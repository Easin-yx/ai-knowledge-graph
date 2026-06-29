import { useEffect, useState } from "react";
import {
  getHighlighter,
  CODE_THEME_DARK,
  CODE_THEME_LIGHT,
  type CodeLang,
} from "../lib/highlighter";

const LANG_LABEL: Record<CodeLang, string> = {
  python: "Python",
  typescript: "TypeScript",
  bash: "Shell",
  sql: "SQL",
};

/** 读取 <html data-theme>（由 useTheme 写入），无需逐层透传主题 */
function useDocTheme(): "dark" | "light" {
  const read = (): "dark" | "light" =>
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  const [theme, setTheme] = useState<"dark" | "light">(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(read()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return theme;
}

interface CodeBlockProps {
  code: string;
  lang: CodeLang;
}

/**
 * 语法高亮代码块（Shiki / VS Code 同款引擎）。
 *   - 异步取高亮 HTML，未就绪时先渲染等宽纯文本占位（避免布局跳动/闪烁）；
 *   - 随 app 明暗主题切换配色；
 *   - 右上角语言角标 + 复制按钮；高亮失败兜底为纯文本 <pre>。
 */
export function CodeBlock({ code, lang }: CodeBlockProps) {
  const theme = useDocTheme();
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    getHighlighter()
      .then((hl) => {
        if (!alive) return;
        setHtml(
          hl.codeToHtml(code, {
            lang,
            theme: theme === "dark" ? CODE_THEME_DARK : CODE_THEME_LIGHT,
          })
        );
      })
      .catch(() => {
        if (alive) setHtml(null);
      });
    return () => {
      alive = false;
    };
  }, [code, lang, theme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  return (
    <div className="akg-codeblock group relative overflow-hidden rounded-xl border border-[var(--glass-border)]">
      <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-3 py-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--akg-text-dim)]">
          {LANG_LABEL[lang]}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-[var(--akg-text-dim)] transition hover:bg-[var(--glass-border)] hover:text-[var(--akg-text)]"
        >
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      {html ? (
        <div
          className="akg-shiki akg-scroll overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="akg-shiki-fallback akg-scroll overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
