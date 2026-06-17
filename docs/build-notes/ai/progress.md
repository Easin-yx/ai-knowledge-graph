# AI 图谱补全 Loop — 进度与交接（跨会话记忆）

> 用途：上下文写满时的「记忆沉淀」。新对话只需读这一份文件，即可无缝接续这个 loop。
> 新会话启动语建议：「读 resources/ai/progress.md，按其中的工作流继续执行补全 loop，从下一步开始。」

## 1. 目标（Goal）

把 AI 知识图谱（`src/data/maps/ai.ts`）补成「从零讲清 AI 全貌」的完整图谱。
- 完成判定 = `npm run check-coverage:ai` 的 **core 缺口清零**（已达成）+ 逐步消化 recommended 缺口。
- 模式：**aggressive**（自动补节点 + 内容改写），但严守下方边界。

## 2. 三件套（验证机制，已就位）

| 文件 | 作用 | 命令 |
|------|------|------|
| `scripts/taxonomy.ts`（`AI_TAXONOMY`） | 大纲 = 目标锚点（15 领域 / 151 主题，含 priority） | — |
| `scripts/validate-graph.ts` | L0 结构验证（重复 id/悬空边/孤儿/类型/命名/风格） | `npm run validate` |
| `scripts/check-coverage.ts` | L2 缺口检测（图谱 diff 大纲） | `npm run check-coverage:ai` |
| `resources/ai/low_confidence.md` | 失败降级队列：拿不准的不进图谱，落这里交人工 | — |
| `resources/ai/taxonomy.md` | 大纲的人类可读镜像 | — |

## 3. 每轮工作流（Per-Round Loop）

1. `npm run check-coverage:ai` → 拿到当前缺口清单。
2. 选 **1 个领域**（或一组主题）作为本轮目标。
3. 为每个缺失主题新增 node：
   - 沿用「数字员工」类比风格：`summary` + `analogy` + `notes` + `key_concepts(≥3)` + `source`。
   - 节点追加在 `nodes` 数组末尾，按「批次 N — 主题」分组加注释。
   - 同步追加 `edges`，锚定到已有节点，边 id 用 `源__关系__target` 命名。
4. `npm run validate` + `npm run check-coverage:ai` + `npm run lint` 三件套全过（0 error）。
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
- **批次 12（经典深度网络剩余 / 领域 4）**：resnet、seq2seq、word_embedding（3 节点 + 6 边）。领域 4 达 7/8（仅余 opt: gru）。**作者已审核满意（已部署上线）。**
- **批次 13（ML 基础补充 / 领域 1/2）**：evaluation_metrics、bias_variance_tradeoff、feature_engineering、dropout、batch_normalization、vanishing_gradient（6 节点 + 13 边）。领域 1 达 12/13、领域 2 达 10/10（满）。**待作者审核。**
- **批次 14（收尾簇 / 领域 6·5·11·13·15·9）**：quantization、knowledge_distillation、bert、chunking、reranking、claude、pytorch、huggingface、zero_shot（9 节点 + 20 边）。**待作者审核。**
- **批次 15（optional 全收尾）**：hyperparameter_tuning、gradient_boosting、knn、random_forest、gru、t5、speculative_decoding、perplexity、self_consistency、tree_of_thoughts、controlnet、midjourney、dalle、llamaindex、ollama（15 节点 + 24 边）。同时给既有 softmax、adam_optimizer 补 source，清空全部 warning。**待作者审核。**
- 当前图谱：**155 节点 / 257 边，validate 0 error / 0 warning，覆盖 151/151（100%）**。
- 🎉🎉 **里程碑：core 0 · recommended 0 · optional 0，大纲全部覆盖；validate 零 error 零 warning；production build 通过。**

## 6. 下一步（Next Action）

**大纲 100% 覆盖，loop 主体目标达成。** 剩余只有非内容性的收尾事项：

1. **待 push 部署**：批次 13/14/15 + 两处 source 补全 + 进度文件更新，均**未提交**（线上停在批次 12）。作者审完后再 push 触发 GitHub Pages 上线。
2. **后续可选方向（已无缺口，纯增益）**：
   - 扩充 taxonomy 大纲（新增主题 → 产生新缺口 → 继续 loop）。
   - 打磨既有节点的 analogy/notes 质量、补充更多跨簇关联边。
   - 性能：build 提示主包 >500KB，可做代码分割（与图谱内容无关）。

> 每轮只做一个领域，做完跑三件套 + 交审。完整实时缺口以 `npm run check-coverage:ai` 输出为准。

## 7. 运行环境备注

- 已安装 `tsx`（devDependency），脚本用 `npx tsx scripts/xxx.ts` 或 `npm run validate` / `npm run check-coverage:ai` 运行。
- dev server：`npm run dev`（热更新，改完 ai.ts 即时生效）。
