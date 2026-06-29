# 编程语言图谱 — 优化重构计划（OPTIMIZE PLAN）

> 目标：把「编程语言」知识图谱从「一套模板套所有节点 + 代码当纯文本显示 + 顺序伪装成知识边」
> 改造成 **解释按角色分形态、代码用真正的代码块、边只表达真关系** 的高质量学习型图谱。
>
> 决策已定：① 语法高亮用 **Shiki**（VS Code 同款引擎）；② **逐步推进**（P1 → P2 → P3），边对齐边做。

---

## 0. 适用范围

- 主改：`programming-languages` 图谱（`src/data/maps/programming-languages.ts`）。
- 渲染机制（CodeBlock / 内容模型）做成**通用能力**，其它图谱可平滑复用，但本轮只在编程图谱落地与验收。
- 涉及代码：
  - `src/components/NodeDetailContent.tsx`（详情面板渲染）
  - `src/types/index.ts`（节点数据模型）
  - `src/components/GraphCanvas.tsx`（仅 P3 的布局排序需读 `order`）
  - `src/data/maps/programming-languages.ts`（数据）
  - 新增 `src/components/CodeBlock.tsx`、`package.json`（新增 `shiki` 依赖）

---

## 1. 问题诊断（三个独立问题）

### 问题 1：用「一套模板」套所有节点
- **现象**：每个节点都被假设为 `摘要 + 类比 + 笔记 + (Python 正面 / TypeScript 背面翻转)`。
- **认知根因**：节点在知识体系里扮演的**角色不同**，不该共用一套解释结构：

  | 角色 | 例子 | 适合 Py/TS 双面 | 适合「打个比方」 |
  | --- | --- | --- | --- |
  | 目录/分类节点 | 基础概念、控制流、数据结构 | ❌ 无代码 | 弱（它只是抽屉） |
  | 纯概念节点 | 解释型vs编译型、同步vs异步、作用域 | ❌ 强套别扭 | ✅ 最需要类比 |
  | 代码构件节点 | 变量、条件、类、列表 | ✅ 对照价值最大 | 可选 |
  | 工具链节点 | Git、调试、包管理器 | ❌ 与语言无关，硬分两栏是假的 | ✅ |
  | SQL 分支 | SELECT、JOIN | ❌ 本就单语言 | ✅ |

### 问题 2：代码示例的展示方式差
- **现象**：代码写在 `details.notes` 的 ```` ```python ```` 围栏里，但渲染层只用
  `whitespace-pre-line` 当**纯文本**打印——连 ```` ``` ```` 反引号、缩进都原样暴露。
- **根因**：项目**没装任何 markdown / 语法高亮库**，notes 是「散文 + 代码」混在一个字符串里。

### 问题 3：二级节点间的「前置」边是否必要
- **判断**：大部分「前置」边是**「目录顺序」伪装成了「知识关系」**（如 `变量→数据类型`、
  `什么是代码→第一个程序`），语义稀薄，还把图弄乱（之前圆环交叉问题的根源就是它）。
- **矛盾点（必须先解决再删）**：这些前置边目前**身兼二职**——既表达学习顺序，
  又被 `computeRadialLayout` 的 `orderSiblings` 用来给同层节点排角度。直接删会让排序退回字母序、重新变乱。
- **解法**：把「顺序」从边里**剥离成节点属性 `order`**，让顺序既能驱动布局排序、又能在面板展示，
  然后再删纯顺序型前置边，**只保留真正的概念硬依赖**。

---

## 2. 设计原则

1. **形态随角色**：解释结构由节点角色决定，不一刀切；缺省字段不渲染、不强凑。
2. **代码是一等公民**：代码从散文里抽出来成结构化数据，用专门组件渲染、语法高亮。
3. **边只表达真关系**：边 = 包含/对比/衔接/真依赖；纯先后顺序用 `order` 属性表达，不占用边。
4. **向后兼容、可回退**：每个阶段独立可回退；新字段全部可选，老数据不改也能渲染。
5. **机制通用、落地单点**：CodeBlock / 内容模型做成全图可复用，但本轮只在编程图谱验收。

---

## 3. P1 — 代码块组件 + Shiki 语法高亮（先做，立竿见影）

### 3.1 目标
详情面板里的代码以**真正的代码块**呈现：等宽字体、深色底、行内留白、语法高亮、一键复制；
随 app 明暗主题切换配色。**本阶段不动数据结构**，先让现有 notes 里的围栏代码正确渲染。

### 3.2 依赖
- 新增 `shiki`（VS Code 同款 TextMate 高亮引擎，输出 HTML）。
- 通过**动态 `import()` 懒加载** + `createHighlighter` 只注册用到的语言与主题，控制首屏体积：
  - 语言：`python`、`typescript`、`bash`、`sql`。
  - 主题：亮色 `github-light`、暗色 `github-dark`（或 `vitesse-*`），与 `useTheme` 联动。
- 单例缓存 highlighter，避免重复初始化。

### 3.3 组件设计：`src/components/CodeBlock.tsx`
- Props：`{ code: string; lang: "python" | "typescript" | "bash" | "sql"; }`。
- 行为：
  - 挂载时异步取高亮 HTML（loading 态先显示等宽纯文本，避免闪烁/布局跳动）。
  - 主题切换时重渲染（依赖 `theme`）。
  - 右上角语言角标 + 复制按钮（`navigator.clipboard`）。
- 样式：圆角、`--glass-border` 描边、深色底、横向滚动（长行不撑破面板）。

### 3.4 渲染接入：`NodeDetailContent.tsx`
- 现状：`NotesSection` 用 `<p whitespace-pre-line>` 整段输出 notes。
- 改造：写一个轻量解析，把 notes 字符串按 ```` ``` ```` 围栏切成「文本段 / 代码段」交替序列：
  - 文本段 → 原样 `whitespace-pre-line` 段落；
  - 代码段 → `<CodeBlock lang code />`。
- 解析规则：识别 ```` ```lang ... ``` ````，未标语言时默认按节点视角推断（正面 python / 背面 typescript / SQL 分支 sql）。
- 保留现有 `parseLearningTiers`（【入门/进阶/精通】分层）逻辑，代码块解析在每个 tier 内部再做。

### 3.5 文件改动
- 新增 `src/components/CodeBlock.tsx`。
- 新增 `src/lib/highlighter.ts`（Shiki 单例 + 懒加载封装）。
- 改 `src/components/NodeDetailContent.tsx`（notes 围栏解析 → CodeBlock）。
- `package.json`：加 `shiki` 依赖。

### 3.6 验收
- [ ] 任意带代码的节点，代码以高亮代码块显示，无裸露的 ```` ``` ````。
- [ ] 明暗主题切换，代码块配色跟随。
- [ ] 复制按钮可用；长代码行横向滚动不撑破面板。
- [ ] 首屏不因 Shiki 卡顿（懒加载，loading 有占位）。

---

## 4. P2 — 内容模型按角色分形态

### 4.1 目标
解释结构随节点角色变化：分类/工具节点不强配 Py/TS 翻转与类比；代码构件节点突出双语对照。

### 4.2 数据模型演进（`src/types/index.ts`，全部新增字段可选、向后兼容）
- 引入结构化代码字段，取代「代码塞在 notes 里」：
  ```ts
  interface CodeSample { lang: "python" | "typescript" | "bash" | "sql"; content: string; caption?: string; }
  ```
  在 `details` 与 `details.backstage` 上新增可选 `code?: CodeSample[]`。
- 引入可选的「卡片形态」标记（也可由 `type` 推断，二选一，倾向显式更可控）：
  ```ts
  card?: "category" | "concept" | "construct" | "tooling" | "sql";
  ```
- `notes` 收窄为**纯散文**（解释/差异说明），不再承载代码。

### 4.3 渲染分形态（`NodeDetailContent.tsx`）
- `construct`：显示 Python/TypeScript 翻转 + 各自 `code`；类比可选。
- `concept`：单面，突出 `summary + analogy + 关键区别`；可选一段示意代码（不翻转）。
- `category`：`summary + 包含哪些（用关联节点列表already有）+ 学习建议`；无代码、无翻转。
- `tooling`：单面，`summary + 命令/用法（bash 代码块）`；无翻转。
- `sql`：单面，`summary + analogy + sql 代码块`。

### 4.4 数据迁移（`programming-languages.ts`）
- 逐节点把 ```` ``` ```` 代码从 `notes` 迁移到 `code[]`；`notes` 只留散文。
- 给每个节点标注/校准 `card` 形态。
- 移除「为凑结构」硬写的类比/背面（如工具链节点的假 TS 栏）。

### 4.5 验收
- [ ] 分类/工具节点不再出现别扭的 Py/TS 翻转。
- [ ] 代码构件节点双语对照清晰，代码来自结构化 `code` 字段。
- [ ] 老的其它图谱（未迁移）仍正常渲染（向后兼容）。

---

## 5. P3 — 边语义重构 + 引入 `order`

### 5.1 目标
边只表达真实知识关系；学习先后顺序改由节点 `order` 属性承载，并同时驱动布局排序与面板提示。

### 5.2 数据模型（`src/types/index.ts`）
- `KnowledgeNode` 新增可选 `order?: number`（同一父下的学习序号）。

### 5.3 布局排序解耦（`GraphCanvas.tsx`）
- `orderSiblings` 的排序键改为：**优先 `order` 升序** → 回退到现有「关联链 DFS」→ 再回退 id 字典序。
- 这样即使删掉前置边，圆环顺序仍由 `order` 稳定决定。

### 5.4 面板提示（`NodeDetailContent.tsx`）
- 在分类/构件节点展示「学习顺序 3 / 9 · 下一步：函数」之类的指引（基于 `order` + 兄弟集合）。

### 5.5 边清理（`programming-languages.ts`）
- 删除**纯顺序型**前置边（如 `变量→数据类型`、`什么是代码→第一个程序`、模块级 `基础概念→变量与类型` 链等）。
- 保留**真·概念依赖**的前置边（逐条评审，如 `同步vs异步 → async/await`）。
- 保留 `包含`（骨架）、`对比`、`衔接`（跨图桥接）等真关系边。

### 5.6 验收
- [x] 删除顺序型前置边后，圆环顺序仍稳定、清爽（靠 `order` 排序）。
- [x] 面板能显示学习顺序与「下一步」。
- [x] `npm run validate` 零 error；仅骨架边仍保持图连通。

---

## 6. 分阶段实施路线

| 阶段 | 内容 | 影响面 | 风险 |
| --- | --- | --- | --- |
| **P1** | CodeBlock + Shiki，notes 围栏解析 | 新增组件 + 渲染层 + 依赖 | 低（不动数据） |
| **P2** | 结构化 `code` + `card` 形态，分形态渲染，数据迁移 | `types` + 渲染层 + 编程图数据 | 中（数据迁移量大） |
| **P3** | `order` 属性 + 布局排序解耦 + 边清理 | `types` + `GraphCanvas` + 编程图数据 | 中（需逐边评审） |

> P1 是纯增量、随时可上；P2/P3 改数据模型，但新字段均可选、向后兼容，老图谱不受影响。

---

## 7. 风险与回滚
- **Shiki 体积/异步**：懒加载 + 只注册 4 种语言 2 套主题；loading 占位；失败兜底为纯文本 `<pre>`。
- **数据迁移工作量**：P2/P3 按节点/边逐个改，可分批提交，每批独立可回退。
- **向后兼容**：所有新字段可选；渲染层对「无 `code` / 无 `card` / 无 `order`」都有缺省路径，其它 6 张图谱不动也正常。
- **布局排序**：P3 排序键回退链保证即使部分节点没 `order` 也不退化。

---

## 8. 总验收清单
- [ ] 代码全部以高亮代码块呈现，随主题切换，无裸露反引号。
- [ ] 节点解释按角色分形态，无强凑的双语/类比。
- [ ] 边只表达真关系；学习顺序由 `order` 承载并可在面板查看。
- [ ] `npm run validate` 与 `npm run lint`（tsc）零 error。
- [ ] 其它 6 张图谱渲染不受影响（向后兼容验证）。

---

## 9. 全局通用化：节点卡片「按角色分形态」（跨全部 7 张图）

> 起因：P2 的「按角色分形态」最初只针对编程图，但同样的「一套卡片骨架套所有节点」问题
> **存在于全部 7 张图**。本节把该能力从编程图专属升级为 **map-agnostic 的通用机制**，
> 编程图作为试点（pilot），其余图谱后续渐进迁移。

### 9.1 跨图诊断
每张图 `type` 体系丰富（各 6–9 种），但详情卡片只有一套结构
`摘要 + 类比? + 笔记? + 关键概念? + 翻面?`，导致不同认知角色的节点被迫共用：

- `ai` 的 `product`(GPT) / `dataset` / `framework` 是**具体实体**，该看「是什么/谁做的/能力/链接」，却被套「打个比方」。
- `expression` 的 `pitfall` / `practice` 该看「正误对照 / 操作步骤」，却只能塞进散文 `notes`。
- `grammar` 的 `tense` / `structure` 该看「结构公式 + 例句」，与类比关系不大。
- 各图**根/分类节点**本质是抽屉，却也强配类比与笔记。

**根因**：渲染层对「节点扮演什么角色」无感知，只能用同一套字段硬渲染；
`analogy / backstage` 虽可选，但**可选字段集太窄**，撑不起不同角色真正需要的信息块。

### 9.2 通用卡片原型（archetype）
抽象出一组跨图复用的原型，渲染层做成「原型 → 该显示哪些区块」的注册表：

| 卡片原型 | 跨图适用举例 | 突出区块 | 不硬塞 |
| --- | --- | --- | --- |
| `category`（概览/分类） | 各图根节点、模块节点 | 摘要 + 子项导航（关联节点）+ 阅读建议 | 类比、代码 |
| `concept`（概念/理解型） | ai:concept、grammar:concept、expression:mindset | 摘要 + 类比 + 要点/公式 + 来源 | 规格、步骤 |
| `mechanism`（构件/机制） | programming:syntax/pattern、ai:technique、grammar:tense | 摘要 + 结构/例 + 代码 + 关键概念 | 类比可选 |
| `entity`（实体/产物） | ai:product/dataset/framework、black-myth:platform、pm:deliverable | 摘要 + **属性事实表** + 链接/来源 | 类比、比方 |
| `practice`（实践/避坑） | expression:practice/pitfall、pm:skill | 摘要 + 步骤 / **正误对照** | 类比可选 |

### 9.3 数据模型（`src/types/index.ts`，全部可选、向后兼容）
- 节点新增可选原型标记：`card?: "category" | "concept" | "mechanism" | "entity" | "practice"`。
  - 缺省时由「每张图的 `type → 原型` 映射」自动推断（各图 `type` 语义已清晰，推断成本低）；
  - 映射表与图谱配置同源（可放在各 `KnowledgeMap` 上，或集中常量表）。
- 新增可选结构化字段，支撑各原型的特有区块：
  - `code?: CodeSample[]`（见 P2，机制/构件节点）；
  - `facts?: { label: string; value: string }[]`（实体节点的属性/规格表）；
  - `steps?: string[]`（实践节点的操作步骤）；
  - `contrast?: { wrong: string; right: string }`（避坑节点的正误对照）。

### 9.4 渲染（`NodeDetailContent.tsx`）
- 把现有「固定区块顺序」改为**按原型查注册表**决定渲染哪些区块、以什么次序与强调。
- 对「无 `card` / 无新字段」的老节点，回退到当前默认渲染路径（零破坏）。

### 9.5 推进方式（接在 P1–P3 之后，作为 P4）
| 阶段 | 内容 | 影响面 | 风险 |
| --- | --- | --- | --- |
| **P4-a** | 引入 `card` 原型 + 新可选字段 + 渲染注册表（机制层） | `types` + 渲染层 | 低（全可选、可回退） |
| **P4-b** | 编程图作为试点接入原型（与 P2 合流） | 编程图数据 | 低 |
| **P4-c** | 其余 6 图按 `type → 原型` 映射渐进迁移，一图一提交 | 各 `maps/*.ts` | 低（纯数据、独立回退） |

> 说明：P4-a 一次到位、全图受益；P4-c 是数据养护，可分图渐进，不阻塞其它工作。
> 本节与项目级 `docs/build-notes/graph-cultivation/PLAN.md` 的「养图谱六法」一脉相承，
> 可在该项目级 PLAN 中加一条交叉引用，标记「卡片分形态」为全局机制改造项。

### 9.6 验收
- [ ] 每张图的实体类节点（如 GPT、数据集）显示属性事实表，不再出现牵强类比。
- [ ] 避坑/实践类节点有正误对照 / 步骤区块。
- [ ] 未迁移节点（无 `card`）渲染不变，向后兼容。
