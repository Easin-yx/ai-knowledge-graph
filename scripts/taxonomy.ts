// ============================================================
// AI 知识图谱大纲（Taxonomy）— Loop 的「目标锚点」
//
// 作用：把「图谱要覆盖完整的 AI 全貌」这个无边界的主观目标，
//       坍缩成「对照本清单，每个主题都有对应节点」的可验证目标。
//
// 维护：这份清单是人工决策（L2 范围由作者拍板），新增/删减主题即调整目标。
//       check-coverage.ts 读取本文件，diff 实际图谱，产出缺口清单。
//
// priority 语义（决定 loop 的优先级与完成判定）：
//   core        - 「从零讲清 AI 全貌」不可或缺，缺失计为硬缺口（阻断完成）
//   recommended - 显著增强完整性，缺失计为软缺口（进待办，不阻断）
//   optional    - 锦上添花，缺失仅提示
//
// id 必须与图谱节点 id 一致（snake_case）。
// ============================================================

export interface TaxonomyTopic {
  id: string;
  label: string;
  priority: "core" | "recommended" | "optional";
}

export interface TaxonomyDomain {
  domain: string;
  topics: TaxonomyTopic[];
}

export const AI_TAXONOMY: TaxonomyDomain[] = [
  {
    domain: "1. 机器学习基础",
    topics: [
      { id: "machine_learning", label: "机器学习", priority: "core" },
      { id: "deep_learning", label: "深度学习", priority: "core" },
      { id: "supervised_learning", label: "监督学习", priority: "core" },
      { id: "unsupervised_learning", label: "无监督学习", priority: "core" },
      { id: "reinforcement_learning", label: "强化学习", priority: "core" },
      { id: "self_supervised_learning", label: "自监督学习", priority: "core" },
      { id: "overfitting", label: "过拟合", priority: "core" },
      { id: "regularization", label: "正则化", priority: "core" },
      { id: "dataset_split", label: "训练/验证/测试集", priority: "core" },
      { id: "evaluation_metrics", label: "评估指标（准确率/精确率/召回/F1）", priority: "recommended" },
      { id: "bias_variance_tradeoff", label: "偏差-方差权衡", priority: "recommended" },
      { id: "feature_engineering", label: "特征工程", priority: "recommended" },
      { id: "hyperparameter_tuning", label: "超参数调优", priority: "optional" },
    ],
  },
  {
    domain: "2. 神经网络基础与组件",
    topics: [
      { id: "neural_network", label: "神经网络", priority: "core" },
      { id: "neuron", label: "神经元/感知机", priority: "core" },
      { id: "mlp", label: "多层感知机", priority: "core" },
      { id: "activation_function", label: "激活函数", priority: "core" },
      { id: "backpropagation", label: "反向传播", priority: "core" },
      { id: "gradient_descent", label: "梯度下降", priority: "core" },
      { id: "loss_function", label: "损失函数", priority: "core" },
      { id: "dropout", label: "Dropout", priority: "recommended" },
      { id: "batch_normalization", label: "批归一化", priority: "recommended" },
      { id: "vanishing_gradient", label: "梯度消失/爆炸", priority: "recommended" },
    ],
  },
  {
    domain: "3. 经典分类/聚类算法",
    topics: [
      { id: "linear_regression", label: "线性回归", priority: "recommended" },
      { id: "logistic_regression", label: "逻辑回归", priority: "recommended" },
      { id: "decision_tree", label: "决策树", priority: "recommended" },
      { id: "svm", label: "支持向量机", priority: "recommended" },
      { id: "kmeans", label: "K-Means 聚类", priority: "recommended" },
      { id: "pca", label: "主成分分析（降维）", priority: "recommended" },
      { id: "gradient_boosting", label: "梯度提升（XGBoost）", priority: "optional" },
      { id: "knn", label: "K 近邻", priority: "optional" },
      { id: "random_forest", label: "随机森林", priority: "optional" },
    ],
  },
  {
    domain: "4. 经典深度网络",
    topics: [
      { id: "cnn", label: "卷积神经网络", priority: "core" },
      { id: "rnn", label: "循环神经网络", priority: "core" },
      { id: "lstm", label: "长短期记忆网络", priority: "core" },
      { id: "gru", label: "门控循环单元", priority: "optional" },
      { id: "resnet", label: "残差网络 ResNet", priority: "recommended" },
      { id: "autoencoder", label: "自编码器", priority: "recommended" },
      { id: "seq2seq", label: "序列到序列（Seq2Seq）", priority: "recommended" },
      { id: "word_embedding", label: "词向量（Word2Vec）", priority: "recommended" },
    ],
  },
  {
    domain: "5. Transformer 家族",
    topics: [
      { id: "transformer", label: "Transformer", priority: "core" },
      { id: "encoder", label: "编码器", priority: "core" },
      { id: "decoder", label: "解码器", priority: "core" },
      { id: "self_attention", label: "自注意力", priority: "core" },
      { id: "cross_attention", label: "交叉注意力", priority: "core" },
      { id: "scaled_dot_product_attention", label: "缩放点积注意力", priority: "core" },
      { id: "multi_head_attention", label: "多头注意力", priority: "core" },
      { id: "masked_multi_head_attention", label: "掩码多头注意力", priority: "core" },
      { id: "positional_encoding", label: "位置编码", priority: "core" },
      { id: "feed_forward_network", label: "前馈网络", priority: "core" },
      { id: "residual_connection", label: "残差连接", priority: "core" },
      { id: "layer_normalization", label: "层归一化", priority: "core" },
      { id: "softmax", label: "Softmax", priority: "core" },
      { id: "bert", label: "BERT（Encoder-only）", priority: "recommended" },
      { id: "t5", label: "T5（Encoder-Decoder）", priority: "optional" },
    ],
  },
  {
    domain: "6. 现代 LLM 内核",
    topics: [
      { id: "decoder_only", label: "仅解码器架构", priority: "core" },
      { id: "rope", label: "旋转位置编码", priority: "core" },
      { id: "rmsnorm", label: "RMSNorm", priority: "recommended" },
      { id: "swiglu", label: "SwiGLU", priority: "recommended" },
      { id: "gqa", label: "分组查询注意力", priority: "recommended" },
      { id: "kv_cache", label: "KV 缓存", priority: "core" },
      { id: "flash_attention", label: "FlashAttention", priority: "recommended" },
      { id: "moe", label: "混合专家", priority: "core" },
      { id: "quantization", label: "量化", priority: "recommended" },
      { id: "knowledge_distillation", label: "知识蒸馏", priority: "recommended" },
      { id: "speculative_decoding", label: "投机解码", priority: "optional" },
    ],
  },
  {
    domain: "7. LLM 训练与对齐",
    topics: [
      { id: "pretraining", label: "预训练", priority: "core" },
      { id: "fine_tuning", label: "微调", priority: "core" },
      { id: "rlhf", label: "人类反馈强化学习", priority: "core" },
      { id: "instruction_tuning", label: "指令微调", priority: "recommended" },
      { id: "lora", label: "LoRA 参数高效微调", priority: "recommended" },
      { id: "dpo", label: "DPO 直接偏好优化", priority: "recommended" },
      { id: "reward_model", label: "奖励模型", priority: "recommended" },
      { id: "scaling_law", label: "扩展定律（Scaling Law）", priority: "recommended" },
    ],
  },
  {
    domain: "8. LLM 概念与推理",
    topics: [
      { id: "llm", label: "大语言模型", priority: "core" },
      { id: "gpt", label: "GPT", priority: "core" },
      { id: "token", label: "词元", priority: "core" },
      { id: "tokenizer", label: "分词器", priority: "core" },
      { id: "context_window", label: "上下文窗口", priority: "core" },
      { id: "hallucination", label: "幻觉", priority: "core" },
      { id: "emergent_ability", label: "涌现能力", priority: "core" },
      { id: "in_context_learning", label: "上下文学习", priority: "recommended" },
      { id: "temperature_sampling", label: "温度与采样（Top-k/Top-p）", priority: "recommended" },
      { id: "perplexity", label: "困惑度", priority: "optional" },
      { id: "multimodal_llm", label: "多模态大模型", priority: "recommended" },
    ],
  },
  {
    domain: "9. Prompt 与推理范式",
    topics: [
      { id: "prompt_engineering", label: "提示工程", priority: "core" },
      { id: "system_prompt", label: "系统提示词", priority: "core" },
      { id: "chain_of_thought", label: "思维链", priority: "core" },
      { id: "few_shot", label: "少样本提示", priority: "core" },
      { id: "zero_shot", label: "零样本提示", priority: "recommended" },
      { id: "self_consistency", label: "自一致性", priority: "optional" },
      { id: "tree_of_thoughts", label: "思维树", priority: "optional" },
    ],
  },
  {
    domain: "10. Agent",
    topics: [
      { id: "ai_agent", label: "AI 智能体", priority: "core" },
      { id: "agent_memory", label: "智能体记忆", priority: "core" },
      { id: "planning", label: "任务规划", priority: "core" },
      { id: "tool_use", label: "工具使用", priority: "core" },
      { id: "function_calling", label: "函数调用", priority: "core" },
      { id: "react", label: "ReAct 推理模式", priority: "core" },
      { id: "multi_agent", label: "多智能体协作", priority: "core" },
      { id: "mcp", label: "模型上下文协议 MCP", priority: "core" },
    ],
  },
  {
    domain: "11. RAG 与检索",
    topics: [
      { id: "rag", label: "检索增强生成", priority: "core" },
      { id: "embedding", label: "向量嵌入", priority: "core" },
      { id: "vector_database", label: "向量数据库", priority: "core" },
      { id: "semantic_search", label: "语义检索", priority: "core" },
      { id: "chunking", label: "文本分块", priority: "recommended" },
      { id: "reranking", label: "重排序", priority: "recommended" },
    ],
  },
  {
    domain: "12. 生成式与多模态",
    topics: [
      { id: "diffusion_model", label: "扩散模型", priority: "core" },
      { id: "denoising", label: "去噪过程", priority: "core" },
      { id: "latent_diffusion", label: "潜空间扩散", priority: "core" },
      { id: "dit", label: "扩散 Transformer", priority: "recommended" },
      { id: "classifier_free_guidance", label: "无分类器引导", priority: "recommended" },
      { id: "text_encoder", label: "文本编码器", priority: "recommended" },
      { id: "text_to_video", label: "文生视频", priority: "core" },
      { id: "image_to_video", label: "图生视频", priority: "recommended" },
      { id: "video_vae", label: "视频 VAE", priority: "recommended" },
      { id: "spatiotemporal_attention", label: "时空注意力", priority: "recommended" },
      { id: "spacetime_patch", label: "时空 patch", priority: "recommended" },
      { id: "temporal_consistency", label: "时间一致性", priority: "recommended" },
      { id: "motion_control", label: "运动/镜头控制", priority: "optional" },
      { id: "gan", label: "生成对抗网络", priority: "recommended" },
      { id: "vae", label: "变分自编码器", priority: "recommended" },
      { id: "clip", label: "CLIP 图文对比", priority: "recommended" },
      { id: "text_to_image", label: "文生图", priority: "recommended" },
      { id: "controlnet", label: "ControlNet", priority: "optional" },
    ],
  },
  {
    domain: "13. 代表性产品",
    topics: [
      { id: "gpt", label: "GPT", priority: "core" },
      { id: "sora", label: "Sora", priority: "recommended" },
      { id: "kling", label: "可灵", priority: "recommended" },
      { id: "stable_diffusion", label: "Stable Diffusion", priority: "recommended" },
      { id: "runway", label: "Runway Gen-3", priority: "optional" },
      { id: "pika", label: "Pika", priority: "optional" },
      { id: "hailuo", label: "海螺视频", priority: "optional" },
      { id: "midjourney", label: "Midjourney", priority: "optional" },
      { id: "claude", label: "Claude", priority: "recommended" },
      { id: "dalle", label: "DALL·E", priority: "optional" },
    ],
  },
  {
    domain: "14. 工程范式（Prompt→Context→Harness→Loop）",
    topics: [
      { id: "prompt_engineering", label: "提示工程", priority: "core" },
      { id: "context_engineering", label: "上下文工程", priority: "core" },
      { id: "harness_engineering", label: "约束工程", priority: "core" },
      { id: "loop_engineering", label: "循环工程", priority: "core" },
      { id: "loop_trigger", label: "定时任务/触发器", priority: "recommended" },
      { id: "worktree_isolation", label: "工作树隔离", priority: "recommended" },
      { id: "knowledge_management", label: "项目知识体系", priority: "recommended" },
      { id: "verifier_agent", label: "验证子 Agent", priority: "recommended" },
      { id: "goal_definition", label: "目标定义", priority: "core" },
      { id: "goodhart_law", label: "古德哈特定律", priority: "recommended" },
      { id: "reward_hacking", label: "验证器钻空子", priority: "recommended" },
      { id: "goal_command", label: "/goal 命令", priority: "optional" },
    ],
  },
  {
    domain: "15. 工具与框架",
    topics: [
      { id: "coze", label: "Coze 扣子", priority: "recommended" },
      { id: "dify", label: "Dify", priority: "recommended" },
      { id: "langchain", label: "LangChain", priority: "recommended" },
      { id: "pytorch", label: "PyTorch", priority: "recommended" },
      { id: "huggingface", label: "Hugging Face", priority: "recommended" },
      { id: "llamaindex", label: "LlamaIndex", priority: "optional" },
      { id: "ollama", label: "Ollama 本地部署", priority: "optional" },
    ],
  },
];
