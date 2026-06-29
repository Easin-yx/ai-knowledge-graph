import type { Highlighter } from "shiki";

// 详情卡片代码块支持的语言（与 P2 的 CodeSample.lang 对齐）
export type CodeLang = "python" | "typescript" | "bash" | "sql";

// 明暗两套主题（GitHub 系，与 app 暖色/深空主题观感协调）
export const CODE_THEME_LIGHT = "github-light";
export const CODE_THEME_DARK = "github-dark";

const LANGS: CodeLang[] = ["python", "typescript", "bash", "sql"];

// 单例：避免重复初始化 highlighter；动态 import('shiki') 让其进入独立 chunk（懒加载，不拖首屏）
let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: [CODE_THEME_LIGHT, CODE_THEME_DARK],
        langs: LANGS,
      })
    );
  }
  return highlighterPromise;
}

/** 把 notes 围栏里出现的语言别名归一到受支持的 CodeLang；未知一律按 typescript 兜底 */
export function normalizeLang(raw?: string): CodeLang {
  switch ((raw ?? "").trim().toLowerCase()) {
    case "python":
    case "py":
      return "python";
    case "bash":
    case "sh":
    case "shell":
    case "zsh":
      return "bash";
    case "sql":
      return "sql";
    case "typescript":
    case "ts":
    case "tsx":
    case "javascript":
    case "js":
    case "jsx":
    default:
      return "typescript";
  }
}
