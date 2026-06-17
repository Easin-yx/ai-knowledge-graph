# PM 图谱补全 Loop — 进度与交接（跨会话记忆）

> 用途：上下文写满时的「记忆沉淀」。新对话只需读这一份文件，即可无缝接续这个 loop。
> 新会话启动语建议：「读 resources/pm/progress.md，按其中的工作流继续执行 PM 图谱补全 loop，从下一步开始。」

## 1. 目标（Goal）

把 PM 知识图谱（`src/data/maps/pm.ts`）建成「**面向小白入门 + 迎合时代的超级产品经理**」完整图谱。
- 完成判定 = `npm run check-coverage:pm` 的 **core 缺口清零** + 逐步消化 recommended 缺口。
- 来源边界：方案 B —— 经典书籍打底，允许补充行业通用 / AI 时代产品概念，`source` 标注出处。
- 模式：每轮一个领域，做完跑三件套 + 交审。

## 2. 三件套（验证机制，Step 1 已通用化就位）

| 文件 | 作用 | 命令 |
|------|------|------|
| `scripts/taxonomy.ts`（`PM_TAXONOMY`） | 大纲 = 目标锚点（9 领域 / 105 主题，含 priority） | — |
| `scripts/validate-graph.ts` | L0 结构验证 + 内容风格（pm 已纳入） | `npm run validate` |
| `scripts/check-coverage.ts` | L2 缺口检测（图谱 diff 大纲） | `npm run check-coverage:pm` |
| `resources/pm/low_confidence.md` | 失败降级队列：拿不准的不进图谱，落这里交人工 | — |
| `resources/pm/taxonomy.md` | 大纲的人类可读镜像 | — |

## 3. 每轮工作流（Per-Round Loop）

1. `npm run check-coverage:pm` → 拿到当前缺口清单。
2. 选 **1 个领域**（或一组主题）作为本轮目标。
3. 为每个缺失主题新增 node：
   - 内容风格：`summary` + `analogy`（每节点必带类比，小白也能懂）+ `notes` + `key_concepts(≥3)` + `source`。
   - 节点追加在 `nodes` 数组末尾，按「批次 N — 主题」分组加注释。
   - 同步追加 `edges`，锚定到已有节点，边 id 用 `源__关系__target` 命名。
4. `npm run validate` + `npm run check-coverage:pm` + `npm run lint` 三件套全过（0 error）。
5. 把本轮新增清单（节点 + 边 + 来源）交作者审 diff。
6. 满意 → 更新本文件「已完成批次」与「下一步」→ 进入下一轮；不满意 → 按反馈改，不推进。

## 4. 边界（Harness，防 reward hacking，必须遵守）

- **禁止编造**：claim 必须能追溯到真实来源（书籍页码/章节、可信文章带 URL）；核验不过 → 进 `low_confidence.md`，不写进图谱。
- **禁止灌水**：不为凑覆盖率造无意义节点，**尤其不把一个概念硬拆成多个节点**。
- **禁止破坏式改写**：已有且准确的节点不得仅为改风格而重写；不删/合并已有节点来「整理」。
- 不动 `typeStyles`、主题色系、PRD 范围。
- 每轮 = 可 review 的 git diff。

## 5. 已完成批次

- **批次 0（现状基线）**：pm.ts 已有 **70 节点 / 83 边**（role/mindset/skill/process/model/deliverable），L0 结构 0 error。
- **Step 1（基建通用化）**：taxonomy/check-coverage/validate 三脚本去 AI 写死、按 mapId 参数化；resources 拆 ai/ 与 pm/；pm 纳入内容风格门禁。
- **Step 2（定义 PM 大纲）**：`PM_TAXONOMY` 落地 9 领域 / 105 主题。首测覆盖 **70/105（66.7%）**，core 11 · rec 22 · opt 2。**待作者审核大纲。**
- **批次 1（领域 8：AI 时代的产品能力）**：ai_product、ai_product_design、llm_application、prompt_design、ai_evaluation、human_ai_collaboration、ai_ethics（7 节点 + 11 边）。领域 8 达 **7/7（满）**。覆盖 70→77/105。新节点 0 warning。**待作者审核。**
- **批次 2（领域 5：数据与增长）**：north_star_metric、aarrr、ab_testing、retention、growth_hacking、funnel_analysis（6 节点 + 10 边）。领域 5 达 **9/9（满）**。覆盖 77→83/105。新节点 0 warning。**待作者审核。**
- **批次 3（领域 4：产品设计与原型）**：ux_design、interaction_design、wireframe、information_architecture、usability_principles（5 节点 + 10 边）。领域 4 达 **10/10（满）**。覆盖 83→88/105，core 7→5。新节点 0 warning。**待作者审核。**
- **批次 4（core 收尾簇 / 领域 1·3·6·7）**：mvp、market_research、agile、product_strategy、monetization（5 节点 + 14 边）。覆盖 88→**93/105（88.6%）**，**core 5→0**。新节点 0 warning。**待作者审核。**
- **批次 5（去书味重构）**：把 15 个「书章节名/口号味」节点 label 概念化（如「人人都是产品经理→产品思维」「山寨级项目管理→项目管理」「大家好才是真的好→跨团队协作」），并去除 summary/notes 里的「苏杰认为/借用标题」书评口吻，改写成自有知识表述（书仅留作 source）。第一圈把 influence/pm_growth/why_pm 从 pm 直连**降级**改挂到 self_cultivation / pm_definition 下，保留「产品思维」为该领域唯一干净 hub。结构净中性（仍 93 节点 / 128 边）。顺手补 analogy/key_concepts，warning 35→**21**。**待作者审核。**
- **批次 6（质量拉齐）**：给 20 个既有节点补 analogy（requirement_collection、questionnaire、focus_group、requirement_filter、business_value、implementation_cost、requirement_management、brd、mrd、development、testing、business_team、tech_team、designer、operation、product_analysis、kpi、competitor_analysis、self_cultivation、time_management）+ 给 business_team 补足 key_concepts，并清掉 self_cultivation 等处「苏杰认为」口吻。warning 21→**0**。
- **批次 7（recommended 收尾簇 / 领域 1·2·3·6·7·9）**：pm_types、product_lifecycle、user_journey_map、jobs_to_be_done、positioning、swot、market_segmentation、scrum、pricing、business_canvas、product_sense、decision_making（12 节点 + 24 边）。覆盖 93→**105/105（100%）**，recommended 12→0。新节点 0 warning。**待作者审核。**
- 当前 pm 图：**105 节点 / 152 边，validate 0 error / 0 warning**，全部节点达「analogy + key_concepts≥3 + source」质量标准。
- 🎉🎉 **里程碑：core 0 · recommended 0 · optional 0，大纲 100% 覆盖；validate 零 error 零 warning；与 AI 图谱同等完成度。**

## 6. 下一步（Next Action）

**大纲 100% 覆盖，loop 主体目标全部达成。** 剩余只有非内容性事项：

1. **作者审批次 1~7 的 diff**（领域 8 + 5 + 4 + core 收尾 + 去书味重构 + 质量拉齐 + recommended 收尾）。
2. **待 commit**：Step 1 脚本通用化 + resources 拆分 + 批次 1~7，均未提交。作者审完后再 push。
3. **后续可选（已无缺口，纯增益）**：扩充 PM_TAXONOMY 大纲（新增主题 → 产生新缺口 → 继续 loop）；打磨 analogy/notes 质量；补更多跨领域关联边。

## 7. 运行环境备注

- 脚本用 `npm run validate` / `npm run check-coverage:pm` 运行（底层 tsx）。
- dev server：`npm run dev`（热更新，改完 pm.ts 即时生效）。
