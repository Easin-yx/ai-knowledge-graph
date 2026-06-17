# PM 知识图谱大纲（草案 · 供审批）

> 这是 PM 图谱 Loop 的「目标锚点」。把「图谱要覆盖完整产品经理知识全貌」这个无边界、主观的目标，
> 坍缩成「对照本大纲，每个主题都有对应节点」的可机器验证目标。
>
> **机器可读的真相源是 [`scripts/taxonomy.ts`](../../scripts/taxonomy.ts) 中的 `PM_TAXONOMY`**；本文件是它的人类可读镜像。

## 目标定位（与 AI 图谱的差别）

- **不抄某本书的目录。** 以《人人都是产品经理》（苏杰）等为参考来源之一，但大纲构建成
  「**面向小白入门 + 迎合时代的超级产品经理**」课程体系——哪怕产品小白看到这张图也能入门。
- **来源边界（方案 B）**：经典书籍打底，允许补充行业通用 / AI 时代产品概念（AARRR、北极星指标、
  增长黑客、AI 产品设计等），`source` 标注实际出处。

## 优先级语义

- `core` — 「从零入门产品经理」不可或缺；缺失为**硬缺口**，阻断 loop 的"完成"判定。
- `recommended` — 显著增强完整性；缺失为**软缺口**，进待办，不阻断。
- `optional` — 锦上添花；缺失仅提示。

## 当前覆盖快照

运行 `npm run check-coverage:pm` 得到（现有 70 节点对照新大纲）：

- 总覆盖：**70 / 105（66.7%）**
- 硬缺口（core）：**11**
- 软缺口（recommended）：**22**
- 锦上添花（optional）：2

## 9 个领域与缺口

| # | 领域 | 覆盖 | 主要缺口 |
|---|------|------|----------|
| 1 | 产品思维与角色认知 | 7/10 | **mvp**(core) · pm_types · product_lifecycle |
| 2 | 用户与需求 | 29/31 | user_journey_map · jobs_to_be_done |
| 3 | 市场与竞品 | 1/5 | **market_research**(core) · positioning · swot · market_segmentation |
| 4 | 产品设计与原型 | 5/10 | **interaction_design · ux_design**(core) · wireframe · information_architecture |
| 5 | 数据与增长 | 3/9 | **north_star_metric · aarrr**(core) · ab_testing · retention · growth_hacking · funnel_analysis |
| 6 | 项目与协作 | 15/17 | **agile**(core) · scrum |
| 7 | 商业与战略 | 3/7 | **product_strategy · monetization**(core) · pricing · business_canvas |
| 8 | AI 时代的产品能力 | 0/7 | **ai_product · ai_product_design**(core) · llm_application · prompt_design · ai_evaluation · human_ai_collaboration |
| 9 | 个人修养与成长 | 7/9 | product_sense · decision_making |

> 领域 8（AI 时代的产品能力）覆盖 0/7，是最显眼的结构性空白，也是「迎合时代」的核心增量；
> 领域 3/5（市场竞品、数据增长）覆盖偏低，是小白进阶为「超级产品经理」最需要补的硬骨头。

## 11 个 core 硬缺口（阻断完成）

`mvp` · `market_research` · `interaction_design` · `ux_design` · `north_star_metric` · `aarrr` · `agile` · `product_strategy` · `monetization` · `ai_product` · `ai_product_design`

## 你需要拍板的事（= 定义目标）

1. **领域与优先级**：上面 9 领域、各主题的 core/recommended/optional 划分是否同意？哪些该升降级？
2. **范围边界**：105 个主题是否过宽/过窄？要不要砍掉某些 optional（如 KANO 的 8 个子需求都列为 optional 了），或追加新主题？
3. **改完后**直接编辑 [`scripts/taxonomy.ts`](../../scripts/taxonomy.ts) 的 `PM_TAXONOMY`，再跑 `npm run check-coverage:pm` 即得新缺口清单——这就是 loop 每一轮的输入。

## 配套验证机制（已就位，Step 1 已通用化）

- `npm run validate` — L0 结构验证 + 内容风格（pm 图已纳入 analogy / key_concepts / source 检查）。
- `npm run check-coverage:pm` — L2 缺口检测：本大纲 diff 实际图谱，core 缺口未清零则退出码 1。
- [`resources/pm/low_confidence.md`](./low_confidence.md) — 失败降级队列。
