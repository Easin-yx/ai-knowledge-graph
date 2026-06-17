// 站点级常量。实际值统一来自单点配置 src/site.config.ts。
// 这里仅做转发，保持历史 import 路径不变。
import { siteConfig } from "../site.config";

export const GITHUB_URL = siteConfig.githubUrl;

export const SITE_TITLE = siteConfig.title;
export const SITE_TITLE_EN = siteConfig.titleEn;
