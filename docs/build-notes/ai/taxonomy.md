# AI 知识图谱大纲（供审批）

> 这是 Loop 的「目标锚点」。把「图谱要覆盖完整 AI 全貌」这个无边界、主观的目标，
> 坍缩成「对照本大纲，每个主题都有对应节点」的可机器验证目标。
>
> **机器可读的真相源是 [`scripts/taxonomy.ts`](../../scripts/taxonomy.ts) 中的 `AI_TAXONOMY`**；本文件是它的人类可读镜像，供你增删主题、调整优先级（这一步就是"定义目标"本身）。
>
> 优先级语义：
> - `core` — 「从零讲清 AI 全貌」不可或缺；缺失为**硬缺口**，阻断 loop 的"完成"判定。
> - `recommended` — 显著增强完整性；缺失为**软缺口**，进待办，不阻断。
> - `optional` — 锦上添花；缺失仅提示。

## 当前覆盖快照

运行 `npm run check-coverage:ai` 得到（首次运行于补完 ML 地基 + Loop 簇之后）：

- 总覆盖：**99 / 151（65.6%）**
- 硬缺口（core）：**0**（所有核心主题已覆盖）
- 软缺口（recommended）：**37**
- 锦上添花（optional）：15

也就是说：**主干叙事已完整，缺的全是"血肉"——经典 ML 算法、对齐技术、生成式细分、工具框架等。**

## 15 个领域与缺口

| # | 领域 | 覆盖 | 主要缺口（rec/opt） |
|---|------|------|---------------------|
| 1 | 机器学习基础 | 9/13 | evaluation_metrics, bias_variance_tradeoff, feature_engineering |
| 2 | 神经网络基础与组件 | 7/10 | dropout, batch_normalization, vanishing_gradient |
| 3 | 经典分类/聚类算法 | 0/9 | linear_regression, logistic_regression, decision_tree, svm, kmeans, pca |
| 4 | 经典深度网络 | 3/8 | resnet, autoencoder, seq2seq, word_embedding |
| 5 | Transformer 家族 | 13/15 | bert, t5 |
| 6 | 现代 LLM 内核 | 8/11 | quantization, knowledge_distillation |
| 7 | LLM 训练与对齐 | 3/8 | instruction_tuning, lora, dpo, reward_model, scaling_law |
| 8 | LLM 概念与推理 | 7/11 | in_context_learning, temperature_sampling, multimodal_llm |
| 9 | Prompt 与推理范式 | 4/7 | zero_shot, self_consistency, tree_of_thoughts |
| 10 | Agent | 8/8 | （全覆盖） |
| 11 | RAG 与检索 | 4/6 | chunking, reranking |
| 12 | 生成式与多模态 | 13/18 | gan, vae, clip, text_to_image |
| 13 | 代表性产品 | 7/10 | claude, midjourney, dalle |
| 14 | 工程范式 | 12/12 | （全覆盖） |
| 15 | 工具与框架 | 3/7 | pytorch, huggingface, llamaindex, ollama |

> 领域 3（经典 ML 算法）覆盖 0/9，是最显眼的结构性空白：图谱目前从神经网络起步，缺了决策树/SVM/聚类/降维这条"非神经网络"的经典支线。是否补、补到什么粒度，请你定夺。

## 你需要拍板的事（= 定义目标）

1. **优先级是否同意**：上面哪些 `recommended` 该升 `core`、哪些该降 `optional`？尤其领域 3 整条经典 ML 支线——要不要纳入"全貌"？
2. **范围边界**：151 个主题是否过宽/过窄？要砍掉哪些领域，或追加哪些（如「AI 安全/伦理」「评测基准」「分布式训练」）？
3. **改完优先级后**，直接编辑 [`scripts/taxonomy.ts`](../../scripts/taxonomy.ts) 中的 `AI_TAXONOMY`，再跑 `npm run check-coverage:ai` 即得新缺口清单——这就是 loop 每一轮的输入。

## 配套验证机制（已就位）

- `npm run validate` — L0 结构验证器：重复 id / 悬空边 / 孤儿节点 / 类型一致性 / 命名规范 /（ai 图）内容风格。当前 **0 error**。
- `npm run check-coverage:ai` — L2 缺口检测：本大纲 diff 实际图谱，core 缺口未清零则退出码 1。
- [`resources/ai/low_confidence.md`](./low_confidence.md) — 失败降级队列：拿不准的事项落这里交人工，不直接进图谱。
