# AI 图谱补全 Loop — 进度与交接（跨会话记忆）

> 用途：上下文写满时的「记忆沉淀」。新对话只需读这一份文件，即可无缝接续这个 loop。
> 新会话启动语建议：「读 resources/loop-progress.md，按其中的工作流继续执行补全 loop，从下一步开始。」

## 1. 目标（Goal）

把 AI 知识图谱（`src/data/maps/ai.ts`）补成「从零讲清 AI 全貌」的完整图谱。
- 完成判定 = `npm run check-coverage` 的 **core 缺口清零**（已达成）+ 逐步消化 recommended 缺口。
- 模式：**aggressive**（自动补节点 + 内容改写），但严守下方边界。

## 2. 三件套（验证机制，已就位）

| 文件 | 作用 | 命令 |
|------|------|------|
| `scripts/taxonomy.ts` | 大纲 = 目标锚点（15 领域 / 151 主题，含 priority） | — |
| `scripts/validate-graph.ts` | L0 结构验证（重复 id/悬空边/孤儿/类型/命名/风格） | `npm run validate` |
| `scripts/check-coverage.ts` | L2 缺口检测（图谱 diff 大纲） | `npm run check-coverage` |
| `resources/low_confidence.md` | 失败降级队列：拿不准的不进图谱，落这里交人工 | — |
| `resources/ai-taxonomy.md` | 大纲的人类可读镜像 | — |

## 3. 每轮工作流（Per-Round Loop）

1. `npm run check-coverage` → 拿到当前缺口清单。
2. 选 **1 个领域**（或一组主题）作为本轮目标。
3. 为每个缺失主题新增 node：
   - 沿用「数字员工」类比风格：`summary` + `analogy` + `notes` + `key_concepts(≥3)` + `source`。
   - 节点追加在 `nodes` 数组末尾，按「批次 N — 主题」分组加注释。
   - 同步追加 `edges`，锚定到已有节点，边 id 用 `源__关系__target` 命名。
4. `npm run validate` + `npm run check-coverage` + `npm run lint` 三件套全过（0 error）。
5. 把本轮新增清单（节点 + 边 + 来源链接）交作者审 diff。
6. 满意 → 更新本文件「已完成批次」与「下一步」→ 进入下一轮；不满意 → 按反馈改，不推进。

## 4. 边界（Harness，防 reward hacking，必须遵守）

- **禁止编造**：技术细节/公式/数字必须能追溯到真实来源（paper/doc/blog 带 URL）；核验不过 → 进 `low_confidence.md`，不写进图谱。
- **禁止灌水**：不为凑覆盖率造无意义节点或硬拆已有节点。
- **禁止破坏式改写**：已有且准确的内容不得仅为改风格而重写；不删/合并已有节点来「整理」。
- 不动 `typeStyles`、主题、PRD 范围。
- 每轮 = 可 review 的 git diff。

## 5. 已完成批次

- **批次 0 / 0.5（机器学习地基）**：machine_learning…lstm 等 19 节点，preferredSeed 改为 machine_learning。
- **批次 7（Loop Engineering 簇）**：context/harness/loop_engineering、五组件、goal_definition/goodhart_law/reward_hacking 等 12 节点。
- **批次 8（LLM 训练与对齐）**：instruction_tuning、lora、reward_model、dpo、scaling_law（5 节点 + 10 边）。**作者已审核满意。**
- **批次 9（经典 ML 算法 / 领域 3）**：linear_regression、logistic_regression、decision_tree、svm、kmeans、pca（6 节点 + 9 边）。领域 3 recommended 全部清零（6/9，仅余 opt: gradient_boosting/knn/random_forest）。**作者已审核满意。**
- **批次 10（生成式补充 / 领域 12 + 领域 4）**：gan、vae、clip、text_to_image、autoencoder（5 节点 + 10 边）。领域 12 达 17/18（仅余 opt: controlnet）；领域 4 补 autoencoder。**作者已审核满意。**
- **批次 11（LLM 概念与推理 / 领域 8）**：in_context_learning、temperature_sampling、multimodal_llm（3 节点 + 7 边）。领域 8 达 10/11（仅余 opt: perplexity）。**作者已审核满意。**
- **批次 12（经典深度网络剩余 / 领域 4）**：resnet、seq2seq、word_embedding（3 节点 + 6 边）。领域 4 达 7/8（仅余 opt: gru）。**待作者审核。**
- 当前图谱：**125 节点 / 200 边，validate 0 error，覆盖 121/151（80.1%）**。

## 6. 下一步（Next Action）

按作者决定「先补一个领域、审完再继续」的节奏，剩余 recommended 缺口（15 个）建议按此顺序逐领域补：

1. ✅ ~~领域 3 经典 ML 算法~~（批次 9，作者已审满意）。
2. ✅ ~~领域 12 生成式补充~~（批次 10，含 autoencoder，作者已审满意）。
3. ✅ ~~领域 8 LLM 概念~~（批次 11，作者已审满意）。
4. ✅ ~~领域 4 经典深度网络剩余~~（批次 12，待审）。
5. **领域 1/2 ML 基础补充**：evaluation_metrics, bias_variance_tradeoff, feature_engineering, dropout, batch_normalization, vanishing_gradient（rec，6 个）。
6. **领域 6 LLM 内核**：quantization, knowledge_distillation（rec）。
7. **领域 5/11/13/15 零散**：bert, chunking, reranking, claude, pytorch, huggingface（rec）。

> 每轮只做一个领域，做完跑三件套 + 交审。完整实时缺口以 `npm run check-coverage` 输出为准。

## 7. 运行环境备注

- 已安装 `tsx`（devDependency），脚本用 `npx tsx scripts/xxx.ts` 或 `npm run validate` / `npm run check-coverage` 运行。
- dev server：`npm run dev`（热更新，改完 ai.ts 即时生效）。
