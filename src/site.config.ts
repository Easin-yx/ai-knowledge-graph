// ============================================================
// ⭐ 单点站点配置
//
// fork 本模板后，你基本只需要改这一个文件，整个站点就变成你的。
// 这里的字段会被 vite.config.ts、index.html、Header、site.ts 共同读取。
// ============================================================

export interface SiteConfig {
  /** 仓库名 = GitHub Pages 路径，必须与你的 GitHub 仓库名一致，否则线上资源会 404 */
  repoName: string;
  /** 仓库地址（页面右上角 GitHub 图标指向这里） */
  githubUrl: string;

  /** 站点标题（浏览器标签、SEO、社交分享标题） */
  title: string;
  /** 英文标题 / 字标 alt */
  titleEn: string;
  /** 站点描述（meta description、og、twitter） */
  description: string;
  /** SEO 关键词（逗号分隔） */
  keywords: string;

  /** 浅色主题字标，放在 public/ 下 */
  logo: string;
  /** 深色主题字标，放在 public/ 下 */
  logoDark: string;
  /** favicon，放在 public/ 下 */
  favicon: string;

  /** 浏览器主题色（移动端地址栏等） */
  themeColor: string;
}

export const siteConfig: SiteConfig = {
  repoName: "ai-knowledge-graph",
  githubUrl: "https://github.com/Easin-yx/ai-knowledge-graph",

  title: "iXin 知识图谱",
  titleEn: "iXin Knowledge Graph",
  description:
    "iXin 知识图谱：用力导向图可视化 AI、产品经理、语法等领域的核心概念与关系，支持渐进式展开与节点检索，持续更新。",
  keywords: "iXin, 知识图谱, Knowledge Graph, AI, 产品经理, KANO, 需求分析, 语法",

  logo: "i.xin.svg",
  logoDark: "i.xin-light.svg",
  favicon: "favicon.svg",

  themeColor: "#faf7f2",
};
