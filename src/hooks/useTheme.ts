import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "akg-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  // 默认暖奶油浅色主题（纸面阅读感）
  return "light";
}

/**
 * 管理深 / 浅主题状态，持久化到 localStorage，
 * 并把当前主题写到 <html data-theme> 上供 CSS 使用。
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
