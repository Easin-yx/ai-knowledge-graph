# PRD：AI 知识图谱网页

> 版本：v0.5  
> 创建日期：2026-06-14  
> 最后更新：2026-06-14  
> 状态：草稿

### 变更记录

| 版本 | 变更内容 |
|------|---------|
| v0.1 | 初始版本 |
| v0.2 | 确定技术栈（react-force-graph-2d）；新增视觉风格设计章节；支持深浅主题切换 |
| v0.5 | 移动端从"不支持"升级为"完整支持"；补充移动端布局图（Bottom Sheet）；交互规格区分桌面/移动端行为；图例改为移动端浮动按钮 |
| v0.4 | 视觉风格改为 iOS 液态玻璃（Liquid Glass）方向；移除具体颜色/数值约束，改为色系方向，给 Agent 留审美空间；浅色主题降级为 Backlog |
| v0.3 | 移除 paper 节点类型（论文降级为详情来源字段）；明确无根节点设计哲学；补充节点命名规范；新增 Agent 执行规格章节 |

---

## 一、背景与目标

### 背景

在学习 AI 领域知识的过程中，知识点之间存在大量关联关系，线性笔记难以表达这种网状结构。知识来源也多样化——论文、博客、AI 对话、文档等。

### 目标

构建一个**开源的 AI 知识图谱网页**，以可视化的方式展示 AI 领域的核心概念、架构、技术之间的关系，供所有人学习参考。图谱内容随时间持续更新和扩充。

### 受众

- 主要维护者：项目作者本人（通过 AI 辅助更新数据）
- 读者：任何希望学习 AI 知识体系的人（GitHub 开源）

---

## 二、核心功能需求

### 2.1 知识图谱可视化

- 以**力导向图（Force-directed Graph）** 展示节点和边
- 节点代表知识单元（概念、架构、技术手段等）
- 边代表节点之间的关系（包含、依赖、改进自、对比等）
- 支持**缩放和拖拽**，自由浏览整个图谱
- 节点根据**类型**用不同颜色区分（客观分类）
- **无根节点设计**：图谱是网状结构，不存在单一根节点。力导向布局会依据连接密度自然形成若干"重力中心"（如 Transformer），各中心之间通过共享概念节点相连

### 2.2 节点交互

- 点击节点，在侧边栏展开该节点的**详情面板**
- 详情面板展示：
  - 节点名称、类型
  - 摘要说明（summary）
  - 补充笔记（notes，可选）
  - 关键子概念列表（key_concepts，可选）
  - 知识来源（source，可选，见数据结构）
- 点击空白处或关闭按钮收起详情面板
- 悬停节点时高亮显示其直接相邻节点和关系边

### 2.3 图例与导航

- 页面提供**图例**，说明各节点类型对应的颜色
- 提供**全局搜索**，可按节点名称快速定位（nice-to-have，后续迭代）
- 提供**筛选**功能，可按节点类型过滤显示（nice-to-have，后续迭代）

---

## 三、数据结构设计

数据存放于 `src/data/graph.ts`，以 TypeScript 定义类型，确保 AI 辅助维护时的类型安全。

### 节点类型

**设计原则：节点 = 知识本身，论文 = 知识来源**

论文不作为图谱节点存在，而是作为节点详情中 `source` 字段的引用信息。这样每个节点代表独立存在的知识单元，论文只是溯源注脚。

```typescript
type NodeType =
  | "concept"       // 抽象概念（如 Attention、Embedding、Token）
  | "architecture"  // 模型架构（如 Transformer、BERT、Diffusion）
  | "technique"     // 具体技术手段（如 Dropout、Layer Norm、Softmax）
  | "dataset"       // 数据集（如 WMT、ImageNet）
  | "framework"     // 工具框架（如 PyTorch、LangChain）
  | "product";      // 面向用户的模型/应用产品（如 GPT、Sora、Coze）
```

**类型分类原则：**
- `concept`：抽象的数学/语言/信息概念，没有具体实现步骤，只能被"理解"
- `architecture`：有完整的网络结构设计，可以被实例化/训练的模型
- `technique`：有具体计算公式或操作步骤的方法，是 architecture 的构成单元
- `dataset`：用于训练或评估的数据集合
- `framework`：实现和运行模型的工程工具
- `product`：面向用户可直接使用的模型/应用产品，是架构与技术落地后的具体实例

**节点命名规范：**
- 统一使用英文，专有名词保留官方写法（`Self-Attention`、`Multi-Head Attention`）
- 节点 `id` 使用 snake_case：`self_attention`、`multi_head_attention`
- 节点 `label` 使用 Title Case：`Self-Attention`、`Transformer`
- 中文说明写入 `details.summary` 字段

### 知识来源类型

```typescript
type NodeSource =
  | { type: "paper"; title: string; year?: number; authors?: string[]; url?: string }
  | { type: "blog"; title: string; url?: string }
  | { type: "book"; title: string; authors?: string[] }
  | { type: "conversation" }   // 来源于 AI 对话
  | { type: "doc"; title: string; url?: string };
```

### 节点结构

```typescript
interface KnowledgeNode {
  id: string;          // 唯一标识，英文小写下划线，如 "self_attention"
  label: string;       // 英文显示名称，图谱节点上显示，如 "Self-Attention"
  type: NodeType;
  details: {
    zh_label?: string;         // 可选：中文名，详情卡片副标题，如 "自注意力"
    summary: string;           // 必填：一句话说明这是什么（中文）
    notes?: string;            // 可选：延伸理解、公式、重要细节
    key_concepts?: string[];   // 可选：关键子概念或关键词
    source?: NodeSource;       // 可选：知识来源
  };
}
```

### 边结构

```typescript
interface KnowledgeEdge {
  id: string;
  source: string;    // 源节点 id
  target: string;    // 目标节点 id
  label: string;     // 关系描述
  directed?: boolean; // 默认 true（有向边）；"对比"等对称关系设为 false
}
```

**预定义关系标签（可扩展）：**

| label | directed | 示例 |
|-------|----------|------|
| `包含` | true | Transformer → 包含 → Multi-Head Attention |
| `使用` | true | Encoder → 使用 → Self-Attention |
| `改进自` | true | BERT → 改进自 → Transformer |
| `依赖` | true | Softmax → 依赖 → 指数运算 |
| `提出于` | true | Self-Attention → 提出于 → Transformer架构 |
| `对比` | false | LSTM ↔ 对比 ↔ Transformer |

**边标签显示策略：** 边标签**仅在鼠标悬停该边或相关节点时显示**，避免节点多时视觉混乱。默认状态下边只显示线条。

### 节点类型颜色映射

色系方向（具体色值由 Agent 在液态玻璃风格下自主决定）：

| 类型 | 色系 | 说明 |
|------|------|------|
| concept | 蓝色系 | 抽象概念 |
| architecture | 橙色系 | 模型架构 |
| technique | 紫色系 | 具体技术 |
| dataset | 绿色系 | 数据集 |
| framework | 灰色系 | 框架工具 |
| product | 青色系 | 模型/应用产品 |

---

## 四、技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | React + TypeScript | 组件化、类型安全，AI 友好 |
| 构建工具 | Vite | 快速热更新，简单配置 |
| 图谱可视化 | **react-force-graph-2d** | Canvas 渲染、标签清晰、3000+ stars、API 极简、AI 易修改 |
| 样式 | Tailwind CSS | 快速布局，AI 易于修改样式 |
| 部署 | GitHub Pages + GitHub Actions | 免费，push 自动部署 |

### 可视化库选型说明

调研了以下主流开源项目后，选定 `react-force-graph-2d`：

| 参考项目 | 特点 | 角色 |
|---|---|---|
| [Connected Papers](https://connectedpapers.com) | 行业最佳 UX，深色背景+节点大小权重 | 设计风格参考 |
| [Obsidian Graph View](https://obsidian.md) / [Quartz](https://quartz.jzhao.xyz) | 最流行的个人知识图谱，D3+PixiJS | 交互体验参考 |
| [reagraph](https://github.com/reaviz/reagraph) | WebGL，视觉效果最好，内置深色主题 | 备选方案 |
| [react-force-graph-2d](https://github.com/vasturiano/react-force-graph) | 最成熟（3000+ stars），Canvas，标签清晰，API 极简 | **选定方案** |
| [OKVE](https://github.com/Biki-dev/OKVE) | 直接把 JSON 渲染成知识图谱，2026 年新项目 | 思路参考 |

选定 `react-force-graph-2d` 的核心原因：Canvas 渲染在标签密集时比 WebGL 更清晰；`nodeCanvasObject` 回调给完全的节点样式控制权；数据格式 `{ nodes, links }` 极简，AI 改起来零歧义。

---

## 五、视觉风格设计

### 整体风格方向

**iOS 液态玻璃（Liquid Glass）风格，深色主题为主。**

核心视觉语言：
- UI 面板（顶栏、详情面板、图例）使用磨砂玻璃质感——半透明背景、背景模糊、细亮边框、柔和阴影
- 玻璃面板透出背后图谱节点，形成深度层次感
- 图谱背景使用有层次感的深色渐变，而非纯黑，让玻璃效果可见
- 整体氛围：精致、现代、有科技感，参考 Connected Papers 的视觉密度

具体的模糊值、透明度、圆角、阴影数值由 Agent 根据液态玻璃审美规律自主决定，不做硬性限制。

### 主题

**深色主题为主**，浅色主题降为低优先级（液态玻璃在深色背景上效果最佳，浅色背景下磨砂质感几乎消失，可在 Backlog 中实现）。

### 节点设计

节点统一为**圆形**，按类型填充对应颜色，节点视觉风格参照液态玻璃质感（半透明填充 + 亮色边框 + 悬停 glow），具体实现由 Agent 发挥。

**节点类型颜色基准（色系方向，具体色值可微调）：**

| 类型 | 色系 | 说明 |
|------|------|------|
| concept | 蓝色系 | 抽象概念 |
| architecture | 橙色系 | 模型架构 |
| technique | 紫色系 | 具体技术 |
| dataset | 绿色系 | 数据集 |
| framework | 灰色系 | 框架工具 |
| product | 青色系 | 模型/应用产品 |

### 图谱布局

- 力导向图（Force-directed），节点自由漂浮，关联越强越靠近
- 节点大小统一（后续可按连接数动态调整，见 Backlog）
- 边标签**仅在悬停时显示**，默认只显示线条，避免视觉噪音

---

## 六、页面布局

### 桌面端（viewport ≥ 768px）

```
┌─────────────────────────────────────────────────────┐
│  顶部栏：项目标题 + GitHub 链接                        │
├─────────────────────────────┬───────────────────────┤
│                             │                       │
│   图谱画布区域               │  节点详情面板          │
│   （力导向，可缩放拖拽）      │  （点击节点后右滑入）  │
│                             │                       │
│                             │  节点名称              │
│                             │  中文名 [类型标签]      │
│                             │  ────────────         │
│                             │  摘要                  │
│                             │  笔记（可选）           │
│                             │  关键概念（可选）       │
│                             │  来源（可选）           │
│                             │                       │
│                             │  相邻节点列表           │
│                             │  （可点击跳转）         │
│                             │                       │
├─────────────────────────────┴───────────────────────┤
│  底部：图例（节点类型 → 颜色说明）                     │
└─────────────────────────────────────────────────────┘
```

详情面板默认隐藏，点击节点后从右侧滑入，点击画布空白处收起。面板宽度约 320px，画布区域自适应剩余宽度。

### 移动端（viewport < 768px）

```
┌───────────────────────────┐
│  顶部栏（精简）+ GitHub   │
├───────────────────────────┤
│                           │
│   图谱画布区域             │
│   （全屏，双指缩放/拖拽）  │
│                           │
│                           │
│   [图例按钮 ⓘ]            │  ← 右下角浮动按钮
└───────────────────────────┘
         ↓ 点击节点后
┌───────────────────────────┐
│   图谱画布（缩小）         │
├═══════════════════════════╡
│  ▔▔▔▔▔（底部抽屉上拉把手） │
│  节点名称                 │
│  中文名 [类型标签]         │
│  ──────────────           │
│  摘要                     │
│  笔记 / 关键概念 / 来源    │
│  相邻节点列表              │
└───────────────────────────┘
```

- 点击节点，从底部弹出**底部抽屉（Bottom Sheet）**展示详情，液态玻璃风格
- 抽屉高度约占屏幕 60%，可上拉至全屏、下滑关闭
- 图例改为右下角浮动按钮，点击弹出图例卡片
- 图谱画布支持**双指捏合缩放**和**单指平移**（react-force-graph-2d 原生支持触摸）
- 节点点击热区适当放大，确保手指可准确点击

---

## 七、初始数据内容

第一版图谱基于 **"Attention Is All You Need"（Vaswani et al., 2017）** 的核心内容，共 **17 个节点、22 条边**（论文本身不作为节点，而是作为相关节点的 `source` 引用）。

### 节点列表

**架构节点（architecture）：**
- `transformer` — Transformer

**概念节点（concept）：**
- `encoder` — Encoder
- `decoder` — Decoder
- `self_attention` — Self-Attention
- `cross_attention` — Cross-Attention

**技术节点（technique）：**
- `scaled_dot_product_attention` — Scaled Dot-Product Attention
- `multi_head_attention` — Multi-Head Attention
- `masked_multi_head_attention` — Masked Multi-Head Attention
- `positional_encoding` — Positional Encoding
- `feed_forward_network` — Feed-Forward Network
- `residual_connection` — Residual Connection
- `layer_normalization` — Layer Normalization
- `softmax` — Softmax
- `label_smoothing` — Label Smoothing
- `adam_optimizer` — Adam Optimizer
- `warmup_lr_schedule` — Warmup Learning Rate Schedule

**数据集节点（dataset）：**
- `wmt_dataset` — WMT Dataset

### 边列表

```
transformer      → 包含  → encoder
transformer      → 包含  → decoder
transformer      → 提出于 → multi_head_attention
encoder          → 使用  → self_attention
encoder          → 使用  → feed_forward_network
encoder          → 使用  → residual_connection
encoder          → 使用  → layer_normalization
decoder          → 使用  → masked_multi_head_attention
decoder          → 使用  → cross_attention
decoder          → 使用  → feed_forward_network
decoder          → 使用  → residual_connection
decoder          → 使用  → layer_normalization
self_attention              → 实现为 → scaled_dot_product_attention
masked_multi_head_attention → 实现为 → scaled_dot_product_attention
cross_attention             → 实现为 → scaled_dot_product_attention
multi_head_attention        → 包含  → self_attention
scaled_dot_product_attention → 使用 → softmax
positional_encoding         → 被使用于 → encoder
positional_encoding         → 被使用于 → decoder
transformer      → 训练使用 → adam_optimizer
transformer      → 训练使用 → warmup_lr_schedule
transformer      → 训练使用 → label_smoothing
transformer      → 评估使用 → wmt_dataset
```

---

## 八、数据更新工作流

本项目的核心工作流是：**改数据 → push → 自动部署**

```
1. 学到新内容
   └→ 在 src/data/graph.ts 中添加 node + edge

2. 对某概念有了新理解
   └→ 更新对应 node 的 details.summary 或 details.notes

3. 发现两个概念有关联
   └→ 添加新的 edge

4. git push → GitHub Actions 自动构建并部署到 GitHub Pages
```

### AI 辅助维护说明

告诉 AI 要做什么时，推荐的指令格式：
- `"添加节点 BERT，类型为 architecture，关联到 Transformer，关系是'改进自'"`
- `"更新 Self-Attention 节点的 notes 字段，补充 Q/K/V 的计算细节"`
- `"添加 GPT 节点，来源是 AI 对话"`

AI 会对照 TypeScript 类型定义操作，不会引入格式错误。

---

## 九、后续迭代方向（Backlog）

- [ ] 节点大小按连接数动态缩放（连接越多的节点越大，参考 Connected Papers）
- [ ] 浅色主题支持（液态玻璃风格在深色背景最佳，浅色主题优先级低）
- [ ] 节点搜索功能
- [ ] 按类型筛选过滤
- [ ] 节点 minimap（大图谱导航缩略图）
- [ ] 支持 Markdown 渲染节点详情中的公式和代码（KaTeX）
- [ ] 图谱分区/分组（如按领域：NLP / CV / RL）
- [ ] 多语言支持（中英文切换）

---

## 十、Agent 执行规格（供 AI 搭建项目使用）

本章节是专门给 AI Agent 执行搭建任务时的完整上下文，补充 PRD 其他章节未覆盖的工程细节。

### 11.1 项目初始化

```bash
npm create vite@latest ai-knowledge-graph -- --template react-ts
cd ai-knowledge-graph
npm install
npm install react-force-graph-2d
npm install -D tailwindcss @tailwindcss/vite
```

### 11.2 完整文件结构

```
ai-knowledge-graph/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── public/
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── index.ts            # 所有 TypeScript 类型定义
│   ├── data/
│   │   └── graph.ts            # 图谱数据（节点 + 边）
│   ├── constants/
│   │   └── theme.ts            # 颜色、字体、尺寸常量
│   ├── components/
│   │   ├── GraphCanvas.tsx     # react-force-graph-2d 封装
│   │   ├── NodeDetailPanel.tsx # 右侧详情面板
│   │   ├── Legend.tsx          # 底部图例
│   │   └── Header.tsx          # 顶部栏
│   ├── hooks/
│   │   └── useTheme.ts         # 深浅主题状态（localStorage 持久化）
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind 引入 + 全局样式
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 11.3 Vite 配置（GitHub Pages 关键）

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ai-knowledge-graph/',  // 必须与 GitHub 仓库名一致
})
```

### 11.4 GitHub Actions 部署工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 11.5 状态管理规格

使用 React `useState` + `useCallback`，无需引入额外状态库，共 3 个全局状态：

| 状态 | 类型 | 初始值 | 说明 |
|------|------|--------|------|
| `selectedNode` | `KnowledgeNode \| null` | `null` | 当前点击选中的节点 |
| `hoveredNode` | `string \| null` | `null` | 当前悬停节点的 id |
| `theme` | `'dark' \| 'light'` | `'dark'` | 主题，持久化到 localStorage |

### 11.6 交互行为完整规格

**节点点击（桌面端）/ 节点 Tap（移动端）：**
- 设置 `selectedNode` 为该节点
- 桌面端：详情面板从右侧滑入（CSS transition）
- 移动端：底部抽屉从底部弹出（Bottom Sheet，液态玻璃风格）
- 图谱中该节点高亮（加粗边框），其余节点降低透明度至 0.3

**节点悬停（仅桌面端，移动端无 hover）：**
- 设置 `hoveredNode`
- 显示该节点直接相邻的边的 label
- 相邻节点保持正常透明度，非相邻节点透明度降至 0.5
- 鼠标变为 `pointer`

**点击/Tap 画布空白处：**
- 清空 `selectedNode`，面板/抽屉收起
- 清空 `hoveredNode`，恢复所有节点透明度

**详情面板/抽屉中点击相邻节点：**
- 切换 `selectedNode` 为该相邻节点（面板内容更新，不收起）
- 图谱视角平滑移动（`centerAt`）到该节点位置

**键盘（桌面端）：**
- `Esc`：清空 `selectedNode`，收起面板

**移动端手势：**
- 双指捏合：缩放图谱
- 单指拖拽：平移图谱
- 下滑底部抽屉：关闭详情

### 11.7 移动端策略

**v1 完整支持移动端**，采用响应式布局，断点为 768px。

| 端 | 详情展示方式 | 图例展示方式 |
|----|------------|------------|
| 桌面端（≥768px） | 右侧滑入面板（宽约 320px） | 底部常驻图例栏 |
| 移动端（<768px） | 底部抽屉（Bottom Sheet） | 右下角浮动按钮 ⓘ，点击展开 |

移动端底部抽屉规格：
- 默认高度约 60vh，可上拉至全屏（100vh），下滑关闭
- 液态玻璃风格，带顶部圆角和拖拽把手指示条
- 内容与桌面端详情面板完全一致

### 11.8 图谱初始状态

- 节点初始位置：随机（react-force-graph-2d 默认），力导向引擎稳定后自动聚类
- 初始视角：调用 `graphRef.current.zoomToFit(400)` 在加载完成后 400ms 执行，确保所有节点可见
- 提供"重置视角"按钮（右下角），再次触发 `zoomToFit`

### 11.9 开源配套

- **License**：MIT
- **README** 需包含：项目简介、在线访问链接、本地运行步骤、如何通过 AI 更新图谱数据
- **页面 SEO**：`index.html` 中设置 `<title>`、`<meta name="description">`、og:title、og:description

### 11.10 依赖版本约束

| 包 | 版本要求 |
|----|---------|
| react | ^19 |
| react-force-graph-2d | ^1.x |
| tailwindcss | ^4.x（使用 Vite 插件方式，非 PostCSS） |
| typescript | ^5.x |
| vite | ^6.x |

---

## 十一、不在范围内（Out of Scope）

- 用户账号系统
- 个人学习进度标注（图谱面向所有读者，不展示个人状态）
- 后端服务（纯静态网页）
- 实时协作编辑
