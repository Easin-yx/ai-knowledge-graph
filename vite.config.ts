import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/site.config";

// base 来自单点配置 siteConfig.repoName，必须与 GitHub 仓库名一致，否则 Pages 资源路径会 404
const base = `/${siteConfig.repoName}/`;

// 把 index.html 中的 %SITE_*% 占位符在构建期替换为 siteConfig 的值，
// 让 HTML 的标题 / meta / favicon 也由同一份配置驱动。
const htmlSiteConfigPlugin = {
  name: "html-site-config",
  transformIndexHtml(html: string) {
    return html
      .replace(/%SITE_TITLE%/g, siteConfig.title)
      .replace(/%SITE_DESCRIPTION%/g, siteConfig.description)
      .replace(/%SITE_KEYWORDS%/g, siteConfig.keywords)
      .replace(/%SITE_THEME_COLOR%/g, siteConfig.themeColor)
      .replace(/%SITE_FAVICON%/g, `${base}${siteConfig.favicon}`);
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlSiteConfigPlugin],
  base,
});
