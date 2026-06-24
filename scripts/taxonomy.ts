// ============================================================
// 知识图谱大纲（Taxonomy）— Loop 的「目标锚点」
//
// 作用：把「图谱要覆盖完整全貌」这个无边界的主观目标，
//       坍缩成「对照本清单，每个主题都有对应节点」的可验证目标。
//
// 维护：这份清单是人工决策（L2 范围由作者拍板），新增/删减主题即调整目标。
//       check-coverage.ts 读取本文件，按图 id 取对应大纲，diff 实际图谱，产出缺口清单。
//
// 多图谱：每张图一份大纲，统一登记在文件末尾的 TAXONOMY_REGISTRY 里，
//       check-coverage.ts 凭 `npm run check-coverage <mapId>` 取用。
//
// priority 语义（决定 loop 的优先级与完成判定）：
//   core        - 「从零讲清全貌」不可或缺，缺失计为硬缺口（阻断完成）
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

// ============================================================
// PM 知识图谱大纲（Taxonomy）— Loop 的「目标锚点」
//
// 目标：不抄某本书的目录，而是构建「面向小白入门 + 迎合时代的超级产品经理」
//       课程体系。每个领域/主题由作者拍板（Step 2 填充），书仅作参考来源之一。
//
// 已落地（草案）：9 大领域。现有 70 节点归入其中（covered），
//   面向「小白入门 + AI 时代超级产品经理」的新主题作为待补缺口。
//   priority 由作者后续微调即调整 loop 目标。
// ============================================================
export const PM_TAXONOMY: TaxonomyDomain[] = [
  {
    domain: "1. 产品思维与角色认知",
    topics: [
      { id: "pm", label: "产品经理", priority: "core" },
      { id: "everyone_is_pm", label: "人人都是产品经理", priority: "core" },
      { id: "pm_definition", label: "产品经理是什么", priority: "core" },
      { id: "product_concept", label: "产品", priority: "core" },
      { id: "mvp", label: "最小可行产品 MVP", priority: "core" },
      { id: "why_pm", label: "为什么做产品经理", priority: "recommended" },
      { id: "influence", label: "影响力", priority: "recommended" },
      { id: "pm_growth", label: "产品经理成长", priority: "recommended" },
      { id: "pm_types", label: "产品经理分类（B端/C端/AI产品经理）", priority: "recommended" },
      { id: "product_lifecycle", label: "产品生命周期", priority: "recommended" },
    ],
  },
  {
    domain: "2. 用户与需求",
    topics: [
      { id: "user_research", label: "用户研究", priority: "core" },
      { id: "user", label: "用户", priority: "core" },
      { id: "persona", label: "用户画像", priority: "core" },
      { id: "requirement_collection", label: "需求采集", priority: "core" },
      { id: "requirement_analysis", label: "需求分析", priority: "core" },
      { id: "requirement_filter", label: "需求筛选", priority: "core" },
      { id: "kano", label: "KANO 模型", priority: "core" },
      { id: "maslow", label: "马斯洛需求层次", priority: "recommended" },
      { id: "user_interview", label: "用户访谈", priority: "recommended" },
      { id: "questionnaire", label: "调查问卷", priority: "recommended" },
      { id: "usability_test", label: "可用性测试", priority: "recommended" },
      { id: "y_model", label: "Y 模型", priority: "recommended" },
      { id: "listen_not_copy", label: "倾听而非照搬", priority: "recommended" },
      { id: "cost_benefit", label: "成本收益分析", priority: "recommended" },
      { id: "user_value", label: "用户价值", priority: "recommended" },
      { id: "business_value", label: "商业价值", priority: "recommended" },
      { id: "rice", label: "RICE 优先级", priority: "recommended" },
      { id: "requirement_management", label: "需求管理", priority: "recommended" },
      { id: "requirement_pool", label: "需求池", priority: "recommended" },
      { id: "user_journey_map", label: "用户旅程地图", priority: "recommended" },
      { id: "jobs_to_be_done", label: "JTBD 用户目标达成理论", priority: "recommended" },
      { id: "focus_group", label: "焦点小组", priority: "optional" },
      { id: "implementation_cost", label: "实现成本", priority: "optional" },
      { id: "must_be_need", label: "基本型需求", priority: "optional" },
      { id: "performance_need", label: "期望型需求", priority: "optional" },
      { id: "attractive_need", label: "兴奋型需求", priority: "optional" },
      { id: "indifferent_need", label: "无差异型需求", priority: "optional" },
      { id: "reverse_need", label: "反向型需求", priority: "optional" },
      { id: "kano_questionnaire", label: "KANO 问卷", priority: "optional" },
      { id: "better_worse", label: "Better-Worse 系数", priority: "optional" },
      { id: "satisfaction_curve", label: "满意度曲线", priority: "optional" },
    ],
  },
  {
    domain: "3. 市场与竞品",
    topics: [
      { id: "market_research", label: "市场调研", priority: "core" },
      { id: "competitor_analysis", label: "竞品分析", priority: "core" },
      { id: "positioning", label: "产品定位", priority: "recommended" },
      { id: "swot", label: "SWOT 分析", priority: "recommended" },
      { id: "market_segmentation", label: "STP 市场细分", priority: "recommended" },
    ],
  },
  {
    domain: "4. 产品设计与原型",
    topics: [
      { id: "prd", label: "产品需求文档 PRD", priority: "core" },
      { id: "prototype", label: "原型", priority: "core" },
      { id: "interaction_design", label: "交互设计", priority: "core" },
      { id: "ux_design", label: "用户体验设计", priority: "core" },
      { id: "product_principle", label: "产品设计原则", priority: "recommended" },
      { id: "brd", label: "商业需求文档 BRD", priority: "recommended" },
      { id: "mrd", label: "市场需求文档 MRD", priority: "recommended" },
      { id: "wireframe", label: "线框图", priority: "recommended" },
      { id: "information_architecture", label: "信息架构", priority: "recommended" },
      { id: "usability_principles", label: "可用性原则", priority: "optional" },
    ],
  },
  {
    domain: "5. 数据与增长",
    topics: [
      { id: "data_analysis", label: "数据分析", priority: "core" },
      { id: "data_driven", label: "数据驱动", priority: "core" },
      { id: "north_star_metric", label: "北极星指标", priority: "core" },
      { id: "aarrr", label: "AARRR 海盗指标", priority: "core" },
      { id: "kpi", label: "关键绩效指标 KPI", priority: "recommended" },
      { id: "ab_testing", label: "A/B 测试", priority: "recommended" },
      { id: "retention", label: "用户留存", priority: "recommended" },
      { id: "growth_hacking", label: "增长黑客", priority: "recommended" },
      { id: "funnel_analysis", label: "漏斗分析", priority: "recommended" },
    ],
  },
  {
    domain: "6. 项目与协作",
    topics: [
      { id: "project", label: "项目", priority: "core" },
      { id: "project_management", label: "项目管理", priority: "core" },
      { id: "development", label: "开发", priority: "core" },
      { id: "testing", label: "测试", priority: "core" },
      { id: "release", label: "发布", priority: "core" },
      { id: "team", label: "团队", priority: "core" },
      { id: "agile", label: "敏捷开发", priority: "core" },
      { id: "collaboration", label: "协作", priority: "recommended" },
      { id: "kickoff", label: "项目启动", priority: "recommended" },
      { id: "risk_schedule", label: "风险与进度", priority: "recommended" },
      { id: "scrum", label: "Scrum 框架", priority: "recommended" },
      { id: "business_team", label: "业务团队", priority: "optional" },
      { id: "tech_team", label: "技术团队", priority: "optional" },
      { id: "designer", label: "设计师", priority: "optional" },
      { id: "operation", label: "运营", priority: "optional" },
      { id: "boss", label: "老板", priority: "optional" },
      { id: "forgotten_roles", label: "被遗忘的角色", priority: "optional" },
    ],
  },
  {
    domain: "7. 商业与战略",
    topics: [
      { id: "business_model", label: "商业模式", priority: "core" },
      { id: "product_planning", label: "产品规划", priority: "core" },
      { id: "product_strategy", label: "产品战略", priority: "core" },
      { id: "monetization", label: "商业变现/盈利模式", priority: "core" },
      { id: "product_analysis", label: "产品分析", priority: "recommended" },
      { id: "pricing", label: "定价策略", priority: "recommended" },
      { id: "business_canvas", label: "商业模式画布", priority: "recommended" },
    ],
  },
  {
    domain: "8. AI 时代的产品能力",
    topics: [
      { id: "ai_product", label: "人工智能产品", priority: "core" },
      { id: "ai_product_design", label: "AI 产品设计", priority: "core" },
      { id: "llm_application", label: "大模型应用", priority: "recommended" },
      { id: "prompt_design", label: "提示词设计", priority: "recommended" },
      { id: "ai_evaluation", label: "AI 产品评测与迭代", priority: "recommended" },
      { id: "human_ai_collaboration", label: "人机协作", priority: "recommended" },
      { id: "ai_ethics", label: "AI 伦理与边界", priority: "optional" },
    ],
  },
  {
    domain: "9. 个人修养与成长",
    topics: [
      { id: "self_cultivation", label: "自我修养", priority: "core" },
      { id: "communication_skill", label: "沟通能力", priority: "core" },
      { id: "logical_thinking", label: "逻辑思维", priority: "core" },
      { id: "learning_ability", label: "学习能力", priority: "recommended" },
      { id: "time_management", label: "时间管理", priority: "recommended" },
      { id: "t_shaped", label: "T 型人才", priority: "recommended" },
      { id: "product_sense", label: "产品感", priority: "recommended" },
      { id: "decision_making", label: "决策能力", priority: "recommended" },
      { id: "pdca", label: "PDCA 循环", priority: "optional" },
    ],
  },
];

export const BLACK_MYTH_TAXONOMY: TaxonomyDomain[] = [
  {
    domain: "0. 总览",
    topics: [
      { id: "black_myth_wukong", label: "黑神话悟空（总览）", priority: "core" },
    ],
  },
  {
    domain: "1. 定位与大盘策略",
    topics: [
      { id: "category_positioning", label: "品类定位（箱庭 ARPG）", priority: "core" },
      { id: "target_users", label: "目标用户（硬核 + 泛 IP）", priority: "core" },
      { id: "marketing_milestones", label: "营销节点（820/MVP）", priority: "recommended" },
    ],
  },
  {
    domain: "2. 核心玩法循环",
    topics: [
      { id: "core_gameplay_loop", label: "核心玩法循环", priority: "core" },
      { id: "loop_combat", label: "挑战（心流）", priority: "core" },
      { id: "loop_explore", label: "探索", priority: "recommended" },
      { id: "loop_progress", label: "养成", priority: "recommended" },
      { id: "loop_reward", label: "奖励", priority: "recommended" },
    ],
  },
  {
    domain: "3. 双轨制经济与成长",
    topics: [
      { id: "dual_track_economy", label: "双轨制经济", priority: "core" },
      { id: "lingyun_currency", label: "灵蕴（金币）", priority: "core" },
      { id: "lingguang_points", label: "灵光点（技能经验）", priority: "core" },
      { id: "death_no_penalty", label: "死亡零惩罚", priority: "recommended" },
      { id: "free_respec", label: "无代价洗点", priority: "recommended" },
      { id: "meditation_cushion", label: "打坐蒲团", priority: "optional" },
    ],
  },
  {
    domain: "4. 战斗数值与机制",
    topics: [
      { id: "combat_system", label: "战斗系统", priority: "core" },
      { id: "base_resource_gauges", label: "基础资源槽（HP/SP/MP）", priority: "core" },
      { id: "resolute_strike", label: "识破", priority: "core" },
      { id: "gunshi_meter", label: "棍势值", priority: "recommended" },
      { id: "modular_gourd", label: "模块化葫芦", priority: "recommended" },
    ],
  },
  {
    domain: "5. UI 交互与视觉体验",
    topics: [
      { id: "ux_ui_design", label: "UI 交互与视觉", priority: "core" },
      { id: "combat_hud", label: "战斗 HUD", priority: "recommended" },
      { id: "micro_feedback", label: "微反馈交互", priority: "recommended" },
      { id: "system_menu", label: "系统菜单", priority: "optional" },
    ],
  },
  {
    domain: "6. 中后台能力网（B 端）",
    topics: [
      { id: "data_dashboard", label: "用户数据大屏", priority: "core" },
      { id: "telemetry_platform", label: "行为埋点中台", priority: "core" },
      { id: "numeric_config_cms", label: "数值配置后台（CMS）", priority: "core" },
      { id: "asset_pipeline", label: "美术资产管理管线", priority: "core" },
      { id: "combat_balance_tool", label: "战斗平衡测试工具", priority: "recommended" },
      { id: "combat_heatmap", label: "战斗行为热力图", priority: "recommended" },
      { id: "anti_inflation_tool", label: "防通胀测算工具", priority: "optional" },
      { id: "localization_platform", label: "本地化协作平台", priority: "optional" },
    ],
  },
];

// ============================================================
// 大纲登记表 — check-coverage.ts 凭 mapId 取用对应图谱的大纲。
// 新增一张需要覆盖率门禁的图谱时，在这里登记即可。
// ============================================================
export const GAME_STUDIO_TAXONOMY: TaxonomyDomain[] = [
  {
    domain: "0. 总览",
    topics: [{ id: "studio_platform", label: "游戏研发中台（总览）", priority: "core" }],
  },
  {
    domain: "1. 研发协作底座",
    topics: [
      { id: "collab_foundation", label: "研发协作底座", priority: "core" },
      { id: "project_management", label: "项目管理系统", priority: "core" },
      { id: "sprint_workboard", label: "迭代看板", priority: "core" },
      { id: "design_doc_hub", label: "策划文档中枢", priority: "core" },
      { id: "cross_discipline_review", label: "跨职能评审流程", priority: "recommended" },
      { id: "vendor_collaboration", label: "外包协同门户", priority: "recommended" },
    ],
  },
  {
    domain: "2. 资产与内容管线",
    topics: [
      { id: "asset_content_pipeline", label: "资产与内容管线", priority: "core" },
      { id: "asset_pipeline", label: "美术资产管理管线", priority: "core" },
      { id: "dcc_integration", label: "DCC 工具链集成", priority: "core" },
      { id: "animation_pipeline", label: "动捕与动画管线", priority: "core" },
      { id: "level_editor_platform", label: "关卡编辑器中台", priority: "core" },
      { id: "narrative_cms", label: "叙事任务配置 CMS", priority: "recommended" },
      { id: "ui_asset_workflow", label: "UI 切图工作流", priority: "optional" },
    ],
  },
  {
    domain: "3. 数值与配置平台",
    topics: [
      { id: "config_platform", label: "数值与配置平台", priority: "core" },
      { id: "numeric_config_cms", label: "数值配置后台", priority: "core" },
      { id: "spreadsheet_pipeline", label: "策划表流水线", priority: "core" },
      { id: "combat_balance_tool", label: "战斗平衡测试工具", priority: "core" },
      { id: "economy_simulator", label: "经济产消模拟器", priority: "recommended" },
      { id: "ab_experiment_platform", label: "玩法 A/B 实验平台", priority: "optional" },
    ],
  },
  {
    domain: "4. 质量与构建基础设施",
    topics: [
      { id: "quality_infra", label: "质量与构建基础设施", priority: "core" },
      { id: "build_farm", label: "构建农场", priority: "core" },
      { id: "ci_cd_pipeline", label: "持续集成门禁", priority: "core" },
      { id: "automated_qa", label: "自动化测试", priority: "core" },
      { id: "crash_analytics", label: "崩溃与性能监控", priority: "recommended" },
      { id: "certification_toolkit", label: "平台认证检查工具", priority: "optional" },
    ],
  },
  {
    domain: "5. 数据与洞察中台",
    topics: [
      { id: "data_insight", label: "数据与洞察中台", priority: "core" },
      { id: "telemetry_platform", label: "行为埋点中台", priority: "core" },
      { id: "playtest_analytics", label: "内部试玩分析", priority: "core" },
      { id: "combat_heatmap", label: "战斗行为热力图", priority: "recommended" },
      { id: "funnel_dashboard", label: "关卡漏斗看板", priority: "recommended" },
      { id: "launch_dashboard", label: "发售后大盘", priority: "optional" },
    ],
  },
  {
    domain: "6. AI 赋能研发工作流",
    topics: [
      { id: "ai_workflow", label: "AI 赋能研发工作流", priority: "core" },
      { id: "ai_concept_art", label: "AI 概念原画辅助", priority: "recommended" },
      { id: "ai_npc_dialogue", label: "AI NPC 对话生成", priority: "recommended" },
      { id: "ai_qa_assistant", label: "AI 辅助测试", priority: "recommended" },
      { id: "ai_localization", label: "AI 翻译初稿", priority: "optional" },
      { id: "copilot_for_scripts", label: "脚本/蓝图 Copilot", priority: "recommended" },
      { id: "procedural_assist", label: "程序化关卡辅助", priority: "optional" },
    ],
  },
  {
    domain: "7. ARPG 品类特化约束",
    topics: [
      { id: "arpg_constraints", label: "ARPG 品类特化", priority: "core" },
      { id: "combat_data_model", label: "战斗数据模型", priority: "core" },
      { id: "encounter_design_tool", label: "遭遇战编排工具", priority: "core" },
      { id: "progression_curve", label: "成长曲线管理", priority: "core" },
      { id: "hakoniwa_level_ops", label: "箱庭关卡运营", priority: "recommended" },
      { id: "animation_combat_sync", label: "动作-打击帧对齐", priority: "core" },
    ],
  },
  {
    domain: "8. 标杆案例",
    topics: [
      { id: "benchmark_cases", label: "标杆案例", priority: "core" },
      { id: "black_myth_wukong", label: "黑神话悟空", priority: "core" },
    ],
  },
];

export const TAXONOMY_REGISTRY: Record<string, TaxonomyDomain[]> = {
  ai: AI_TAXONOMY,
  pm: PM_TAXONOMY,
  "black-myth": BLACK_MYTH_TAXONOMY,
  "game-studio": GAME_STUDIO_TAXONOMY,
};
