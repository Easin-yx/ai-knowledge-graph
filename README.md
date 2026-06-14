# AI 知识图谱 · AI Knowledge Graph

一个开源的、可视化的 **AI 知识图谱**。以力导向图（Force-directed Graph）展示 AI 领域核心概念、模型架构与技术手段之间的关系，随时间持续更新与扩充。

第一版图谱基于论文 [《Attention Is All You Need》(Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)，共 17 个节点、23 条边。

> 视觉风格：iOS 液态玻璃（Liquid Glass），深色主题为主，支持深 / 浅主题切换。

## ✨ 特性

- 🕸️ **力导向图谱**：节点自由漂浮，关联越强越靠近，支持缩放与拖拽
- 🎨 **按类型着色**：概念 / 架构 / 技术 / 数据集 / 框架 五种类型对应不同色系
- 🔍 **节点详情**：点击节点查看摘要、延伸笔记、关键概念、来源与关联节点
- 🪄 **悬停高亮**：悬停节点高亮其相邻节点与关系边标签
- 📱 **完整移动端支持**：桌面端右侧滑入面板，移动端底部抽屉（可拖拽）
- 🌗 **深 / 浅主题**：一键切换，偏好持久化到 localStorage

## 🔗 在线访问

部署到 GitHub Pages 后访问：

```
https://<你的用户名>.github.io/ai-knowledge-graph/
```

## 🚀 本地运行

需要 Node.js ≥ 18。

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173/ai-knowledge-graph/）
npm run dev

# 构建生产版本
npm run build

# 本地预览生产构建
npm run preview
```

## 🧩 技术栈

| 层 | 选型 |
|---|---|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 6 |
| 图谱可视化 | [react-force-graph-2d](https://github.com/vasturiano/react-force-graph) |
| 样式 | Tailwind CSS 4（Vite 插件方式） |
| 部署 | GitHub Pages + GitHub Actions |

## 🤖 如何用 AI 更新图谱数据

本项目的核心工作流是 **改数据 → push → 自动部署**。所有图谱数据都在一个类型安全的文件中：

```
src/data/graph.ts
```

数据结构定义在 `src/types/index.ts`，因此让 AI 修改时不会引入格式错误。推荐的指令格式：

- `"添加节点 BERT，类型为 architecture，关联到 transformer，关系是'改进自'"`
- `"更新 self_attention 节点的 notes 字段，补充 Q/K/V 的计算细节"`
- `"添加 GPT 节点，来源是 AI 对话"`

### 节点结构速览

```ts
{
  id: "self_attention",        // snake_case 唯一标识
  label: "Self-Attention",     // Title Case 显示名
  type: "concept",             // concept | architecture | technique | dataset | framework
  details: {
    zh_label: "自注意力",        // 可选：中文名
    summary: "……",             // 必填：一句话说明
    notes: "……",               // 可选：延伸笔记
    key_concepts: ["Q/K/V"],   // 可选：关键概念
    source: { type: "paper", title: "…", url: "…" }, // 可选：来源
  },
}
```

修改后提交，GitHub Actions 会自动构建并部署：

```bash
git add src/data/graph.ts
git commit -m "data: 添加 BERT 节点"
git push
```

## ⚙️ 部署到 GitHub Pages

1. 把代码推送到名为 **`ai-knowledge-graph`** 的 GitHub 仓库（仓库名需与 `vite.config.ts` 中的 `base` 一致；如改名，请同步修改 `base`）。
2. 在仓库 **Settings → Pages → Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. 推送到 `main` 分支即会自动触发 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 完成构建与部署。
4. 把 `src/constants/site.ts` 中的 `GITHUB_URL` 改为你的仓库地址。

## 📁 项目结构

```
src/
├── types/index.ts          # TypeScript 类型定义
├── data/graph.ts           # 图谱数据（节点 + 边）← 主要维护这里
├── constants/              # 主题色系、站点常量
├── hooks/                  # useTheme / useMediaQuery
├── components/             # Header / GraphCanvas / 详情面板 / 抽屉 / 图例
├── App.tsx                 # 组合装配与全局状态
└── main.tsx
```

## 📄 License

[MIT](LICENSE)
