import type { GraphData } from "../types";

// ============================================================
// AI 知识图谱 — 第一版数据
// 来源：Attention Is All You Need（Vaswani et al., 2017）
//
// 如何让 AI 更新此文件：
//   "添加节点 BERT，类型为 architecture，关联到 transformer，关系是'改进自'"
//   "更新 self_attention 节点的 notes 字段，补充 Q/K/V 的计算细节"
// ============================================================

const AIAYN_SOURCE = {
  type: "paper" as const,
  title: "Attention Is All You Need",
  year: 2017,
  authors: ["Vaswani", "Shazeer", "Parmar", "Uszkoreit", "Jones", "Gomez", "Kaiser", "Polosukhin"],
  url: "https://arxiv.org/abs/1706.03762",
};

export const graphData: GraphData = {
  nodes: [
    // ─────────────────────────────────────────
    // 架构节点 (architecture)
    // ─────────────────────────────────────────
    {
      id: "transformer",
      label: "Transformer",
      type: "architecture",
      details: {
        zh_label: "Transformer 模型",
        summary: "完全基于注意力机制的序列到序列模型架构，彻底摒弃了 RNN 和卷积结构，开创了现代大语言模型的基础范式。",
        analogy: "像数字员工的大脑神经结构：过去的员工只能逐字逐句地听和回（RNN），现在整套大脑能一次性通览全部信息、内部各处互相参照，再统一给出方案，又快又准。",
        notes: "由 N=6 层 Encoder 和 N=6 层 Decoder 堆叠而成。模型维度 d_model=512，前馈网络内部维度 d_ff=2048，注意力头数 h=8。核心优势：支持并行计算（不像 RNN 必须逐步处理），能直接建模任意距离的依赖关系。",
        key_concepts: ["Encoder-Decoder架构", "并行计算", "长距离依赖", "序列到序列"],
        source: AIAYN_SOURCE,
      },
    },

    // ─────────────────────────────────────────
    // 概念节点 (concept)
    // ─────────────────────────────────────────
    {
      id: "encoder",
      label: "Encoder",
      type: "concept",
      details: {
        zh_label: "编码器",
        summary: "Transformer 的编码器，将输入 token 序列映射为连续的上下文感知表示（Context Representations）。",
        analogy: "像团队里专门听需求、吃透意思的那个人：他把客户提出的整段需求反复琢磨透，弄清每句话在上下文里到底要什么，再把这份「理解」交给负责动笔写方案的同事。",
        notes: "由 N=6 个结构相同的层堆叠，每层包含两个子层：① 多头自注意力（Multi-Head Self-Attention）；② 位置无关的前馈网络（Feed-Forward Network）。每个子层后都接有残差连接和层归一化：输出 = LayerNorm(x + Sublayer(x))。",
        key_concepts: ["多层堆叠", "子层", "残差连接", "层归一化"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "decoder",
      label: "Decoder",
      type: "concept",
      details: {
        zh_label: "解码器",
        summary: "Transformer 的解码器，基于编码器输出和已生成的序列，自回归地逐步生成目标序列。",
        analogy: "像负责把方案一句句写出来的同事：每写一句，他只能看自己已经写好的部分（不能跳着抄后文），同时不断回头核对需求方的原话，确保写出来的东西对得上诉求。",
        notes: "由 N=6 个结构相同的层堆叠，每层包含三个子层：① Masked 多头自注意力（防止看见未来位置）；② 编码器-解码器注意力（Cross-Attention，Q 来自解码器，K/V 来自编码器）；③ 前馈网络。自回归意味着生成第 t 个 token 时只能看到第 1~t-1 个已生成的 token。",
        key_concepts: ["自回归生成", "Masked Attention", "三子层结构"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "self_attention",
      label: "Self-Attention",
      type: "concept",
      details: {
        zh_label: "自注意力",
        summary: "让序列中每个位置与序列内所有其他位置计算注意力权重，从而捕捉长距离依赖关系的机制。",
        analogy: "像开会时每个人发言前都先把全场同事的话过一遍：听到「这个项目它风险很高」里的「它」，他会立刻在全场发言里定位「它」指的是哪个项目，再形成自己的判断。",
        notes: "核心思想：'自己关注自己'——Q（查询）、K（键）、V（值）均来自同一输入序列的不同线性变换。每个位置都能直接获取序列中任意其他位置的信息，解决了 RNN 中远距离信息传递路径过长的问题。",
        key_concepts: ["Q/K/V", "长距离依赖", "并行计算", "注意力权重"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "cross_attention",
      label: "Cross-Attention",
      type: "concept",
      details: {
        zh_label: "交叉注意力",
        summary: "Decoder 中连接编码器和解码器的注意力机制：Q 来自解码器当前层，K 和 V 来自编码器的输出。",
        analogy: "像写方案的同事一边落笔、一边抬头看需求方的原话：每写一段，他都要回到需求清单里找一下「现在这段对应的是哪几条诉求」，这是把需求和成稿连起来的桥梁。",
        notes: "这是编码器信息流向解码器的唯一通道。解码器的每个位置通过 Cross-Attention 决定应该'关注'输入序列的哪些部分，类似于翻译时人眼在源语言和目标语言之间的来回扫视。",
        key_concepts: ["编码器-解码器连接", "信息流", "Q来自解码器", "K/V来自编码器"],
        source: AIAYN_SOURCE,
      },
    },

    // ─────────────────────────────────────────
    // 技术节点 (technique)
    // ─────────────────────────────────────────
    {
      id: "scaled_dot_product_attention",
      label: "Scaled Dot-Product Attention",
      type: "technique",
      details: {
        zh_label: "缩放点积注意力",
        summary: "注意力机制的核心计算单元：Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V",
        analogy: "像员工带着一个问题去翻全公司的资料：他拿问题（Q）和每份资料的标签（K）比对相关度，越相关的资料（V）在最终结论里占的比重越大。除以 √d_k 就像把过于悬殊的相关度评分拉平一点，免得只盯着一份资料。",
        notes: "三个步骤：① 计算 Q 和 K 的点积相似度；② 除以 √d_k 缩放（防止点积值过大导致 softmax 梯度消失，d_k=64）；③ 经 softmax 归一化后与 V 加权求和。'Scaled' 的意义：若不缩放，高维空间中点积方差很大，softmax 会输出接近 one-hot 的分布，梯度极小。",
        key_concepts: ["点积相似度", "√d_k缩放", "softmax归一化", "加权求和"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "multi_head_attention",
      label: "Multi-Head Attention",
      type: "technique",
      details: {
        zh_label: "多头注意力",
        summary: "将注意力机制并行运行 h=8 次，每次使用不同的线性投影，同时捕捉不同子空间的语义关系，最后拼接结果。",
        analogy: "像把同一份材料同时发给财务、技术、法务等 8 个部门的同事：每个部门各从自己的专业角度审一遍——有人盯合规、有人盯成本、有人盯实现，最后把 8 份意见汇总成一份更全面的结论。",
        notes: "公式：MultiHead(Q,K,V) = Concat(head_1,...,head_h) · W_O，其中 head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)。每个头的维度 d_k = d_v = d_model/h = 64。多头的意义：单头注意力只能在一个表示子空间建模关系，多头让模型同时关注不同位置和不同类型的关系（如句法关系、语义关系等）。",
        key_concepts: ["h=8个头", "并行注意力", "不同子空间", "拼接融合"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "masked_multi_head_attention",
      label: "Masked Multi-Head Attention",
      type: "technique",
      details: {
        zh_label: "掩码多头注意力",
        summary: "Decoder 第一子层中带因果掩码的多头自注意力，防止每个位置看到其后续位置的信息，确保自回归生成的正确性。",
        analogy: "像员工写阶段汇报时，后面还没发生的进展自己也看不到：预测下一句该写什么时，他只能依据已经写完的部分，绝不能「偷看」还没轮到的后续内容。",
        notes: "实现方式：在 Scaled Dot-Product Attention 的 softmax 之前，将未来位置的注意力分数设为 -∞，经 softmax 后变为 0。这使得位置 t 只能关注位置 1~t 的信息。训练时这一操作可并行完成（不像推理时需要逐步生成）。",
        key_concepts: ["因果掩码", "自回归约束", "未来信息屏蔽", "-∞掩码"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "positional_encoding",
      label: "Positional Encoding",
      type: "technique",
      details: {
        zh_label: "位置编码",
        summary: "通过正弦/余弦函数向词嵌入中注入位置信息，使纯注意力模型能感知 token 在序列中的顺序。",
        analogy: "像给会议议程上的每位发言人编一个顺序号：注意力机制本身分不清谁先谁后，贴上「发言顺序号」后，员工才分得清「我同意你」和「你同意我」是两回事。",
        notes: "公式：PE(pos, 2i) = sin(pos / 10000^(2i/d_model))，PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))。设计精妙之处：① 每个位置有唯一编码；② 固定偏移量 k 对应的位置编码可由当前位置编码线性变换得到，使模型能推断相对位置；③ 与词嵌入直接相加，不增加参数量。",
        key_concepts: ["位置信息", "sin/cos函数", "相对位置", "无参数"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "feed_forward_network",
      label: "Feed-Forward Network",
      type: "technique",
      details: {
        zh_label: "前馈神经网络",
        summary: "每个 Encoder/Decoder 层中对每个位置独立应用的两层全连接网络，负责对注意力输出进行非线性变换。",
        analogy: "如果说注意力是大家开会互相参考信息，前馈网络就是会后每个人各自回工位「消化思考」：独立加工自己手上的那份信息，暂时不再和别人交流。",
        notes: "公式：FFN(x) = max(0, xW₁ + b₁)W₂ + b₂。关键参数：输入输出维度 d_model=512，中间层维度 d_ff=2048（4 倍扩展）。位置无关（Position-wise）意味着序列中每个位置使用相同的权重，但各位置独立计算，不做跨位置交互（那是注意力机制的职责）。",
        key_concepts: ["两层全连接", "ReLU激活", "d_ff=2048", "位置无关"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "residual_connection",
      label: "Residual Connection",
      type: "technique",
      details: {
        zh_label: "残差连接",
        summary: "跳跃连接：将子层输入直接加到子层输出上（x + Sublayer(x)），缓解深层网络中的梯度消失问题。",
        analogy: "像办公楼除了一层层楼梯还另留了一部直达电梯：信息和经验不必每一层都重新转述（容易越传越走样），可以走「近道」直达，让层级很深的流程也能顺畅推进。",
        notes: "来源于 ResNet（He et al., 2016）。在 Transformer 中每个子层都使用残差连接，完整公式为 LayerNorm(x + Sublayer(x))。直觉理解：梯度可以通过'高速公路'（恒等映射 x）直接反向传播，不必穿越所有层，使得训练深层网络成为可能。",
        key_concepts: ["梯度高速公路", "恒等映射", "深层网络训练", "来自ResNet"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "layer_normalization",
      label: "Layer Normalization",
      type: "technique",
      details: {
        zh_label: "层归一化",
        summary: "对单个样本在特征维度上计算均值和方差进行归一化，稳定训练过程，加速收敛。",
        analogy: "像把每个员工千差万别的打分都先换算成统一的标准分：不管原始评价忽高忽低，都拉到同一量纲，后续的汇总才不会被某些过大的数值带偏。",
        notes: "与 Batch Normalization 的区别：Batch Norm 在 batch 维度上归一化（依赖 batch size），Layer Norm 在特征维度上归一化（每个样本独立计算，不依赖 batch size）。序列任务中不同样本长度不同，Layer Norm 更适合。在 Transformer 中紧跟残差连接使用：LayerNorm(x + Sublayer(x))。",
        key_concepts: ["特征维度归一化", "独立于batch size", "训练稳定性", "vs Batch Norm"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "softmax",
      label: "Softmax",
      type: "technique",
      details: {
        zh_label: "Softmax 函数",
        summary: "将一组任意实数转化为概率分布：Softmax(z_i) = e^z_i / Σ e^z_j，输出值均在 (0,1) 且和为 1。",
        analogy: "像把一组评委给出的原始打分换算成「得票百分比」：分数高的拿走更大份额，但所有人加起来正好是 100%，于是就能当成各自的权重/概率来用。",
        notes: "在 Transformer 中有两处使用：① Scaled Dot-Product Attention 中将注意力分数归一化为权重（决定每个 Value 的贡献比例）；② 最终输出层将 logits 转化为词表上的概率分布。数值稳定性技巧：实践中通常先减去最大值再计算 exp，防止溢出。",
        key_concepts: ["概率归一化", "指数函数", "注意力权重", "输出层"],
      },
    },
    {
      id: "label_smoothing",
      label: "Label Smoothing",
      type: "technique",
      details: {
        zh_label: "标签平滑",
        summary: "训练正则化技巧：将 one-hot 硬标签软化，把小概率 ε=0.1 均匀分配给所有非目标类别，防止模型过度自信。",
        analogy: "像主管教新员工汇报时不要把话说得太满：「这个结论我给你 90% 的把握，剩下 10% 留点余地」，避免员工变成死认一个答案、过度自信的「杠精」。",
        notes: "原理：若使用硬标签（目标类别概率=1，其他=0），模型会被鼓励将目标类别的 logit 无限放大，导致过拟合。软化后目标类别概率变为 1-ε，非目标类别各为 ε/(vocab_size-1)。副作用：困惑度（Perplexity）略微上升，但 BLEU 分数和准确率实际改善（模型学到了更好的不确定性校准）。",
        key_concepts: ["软标签", "ε=0.1", "防过拟合", "不确定性校准"],
        source: AIAYN_SOURCE,
      },
    },
    {
      id: "adam_optimizer",
      label: "Adam Optimizer",
      type: "technique",
      details: {
        zh_label: "Adam 优化器",
        summary: "自适应学习率优化算法，结合动量（Momentum）和自适应梯度缩放（RMSProp），为每个参数维护独立的学习率。",
        analogy: "像一个经验老到的项目经理把控推进节奏：方向明确时靠惯性（动量）大胆加速，遇到不确定的环节就自动放缓（自适应缩放），每条任务线都有自己合适的步子。",
        notes: "超参数设置（论文原始值）：β₁=0.9，β₂=0.98，ε=10⁻⁹。Adam 的两大优势：① 利用梯度的一阶矩（均值）和二阶矩（方差）自适应调整每个参数的学习率；② 对稀疏梯度友好。在 Transformer 中配合 Warmup 学习率调度使用效果更好。",
        key_concepts: ["自适应学习率", "动量", "二阶矩估计", "β₁β₂参数"],
      },
    },
    {
      id: "warmup_lr_schedule",
      label: "Warmup Learning Rate Schedule",
      type: "technique",
      details: {
        zh_label: "预热学习率调度",
        summary: "训练初期线性增大学习率至峰值，之后按训练步数的反平方根衰减，避免训练初期参数更新过猛导致的不稳定。",
        analogy: "像新员工入职先有个适应期：一上来不猛压任务（小步起步避免出错），慢慢加到满负荷，临近收尾再逐步放缓，全程更稳、更不容易翻车。",
        notes: "公式：lr = d_model^(-0.5) × min(step_num^(-0.5), step_num × warmup_steps^(-1.5))。论文中 warmup_steps=4000，即前 4000 步线性增大，之后衰减。直觉：训练初期参数随机初始化，梯度方向不可信，用小学习率探索；待模型初步稳定后，再用较大学习率加速收敛；最终衰减防止震荡。",
        key_concepts: ["线性预热", "衰减调度", "warmup_steps=4000", "训练稳定性"],
        source: AIAYN_SOURCE,
      },
    },

    // ─────────────────────────────────────────
    // 数据集节点 (dataset)
    // ─────────────────────────────────────────
    {
      id: "wmt_dataset",
      label: "WMT Dataset",
      type: "dataset",
      details: {
        zh_label: "WMT 数据集",
        summary: "机器翻译领域的权威基准数据集，Transformer 论文在 WMT 2014 英德（450万句对）和英法（3600万句对）翻译任务上验证了模型效果。",
        analogy: "像公司给员工的统一绩效考核题库：所有人做同一套题、用同一把尺（BLEU 分）打分，谁强谁弱一比便知，Transformer 当年就是靠它刷新了纪录。",
        notes: "结果：WMT 2014 英德翻译达到 28.4 BLEU（超越当时所有单模型和集成模型），英法达到 41.0 BLEU。WMT（Workshop on Machine Translation）是机器翻译年度竞赛，其数据集成为 NLP 领域标准 benchmark。",
        key_concepts: ["机器翻译基准", "BLEU评分", "英德翻译", "英法翻译"],
        source: AIAYN_SOURCE,
      },
    },

    // ═════════════════════════════════════════
    // 批次 1 — LLM 全景簇
    // ═════════════════════════════════════════
    {
      id: "llm",
      label: "LLM",
      type: "architecture",
      details: {
        zh_label: "大语言模型",
        summary: "在海量文本上预训练、以 Transformer 为骨架的超大规模语言模型，能理解和生成自然语言，是数字员工的「通用大脑」。",
        analogy: "像数字员工的大脑和通识素养：读过海量资料后，无论被问到哪一行的常识都能接得上话；但它本身只是「脑子聪明」，还得靠岗位培训和工具才能真正干活。",
        notes: "参数规模通常在十亿到万亿级。能力主要来自「预训练 + 微调 + 对齐」三阶段。代表产品：GPT、Claude、LLaMA、Qwen 等。",
        key_concepts: ["大规模参数", "自回归生成", "预训练语料", "通用语言能力"],
        source: { type: "conversation" },
      },
    },
    {
      id: "gpt",
      label: "GPT",
      type: "product",
      details: {
        zh_label: "GPT",
        summary: "OpenAI 推出的生成式预训练大模型系列，以仅含 Decoder 的 Transformer 自回归生成文本，是最广为人知的 LLM 产品。",
        analogy: "像市面上最有名的那位「明星数字员工」：底子是通用大脑（LLM），经过反复打磨后开箱即用，很多公司直接请它来上岗。",
        notes: "GPT = Generative Pre-trained Transformer。采用 Decoder-only 架构，通过预测下一个 token 自回归生成。GPT-3.5 / GPT-4 等版本经 RLHF 对齐后以 ChatGPT 形式面向用户。",
        key_concepts: ["Decoder-only", "自回归生成", "ChatGPT", "OpenAI"],
        source: { type: "blog", title: "OpenAI: GPT-4", url: "https://openai.com/gpt-4" },
      },
    },
    {
      id: "token",
      label: "Token",
      type: "concept",
      details: {
        zh_label: "词元",
        summary: "大模型处理文本的最小单位，介于字与词之间，文本先被分词器切成 token 序列再送入模型。",
        analogy: "像员工读文件不是逐字看、也不是整段囫囵吞，而是按「词块」来理解；公司还按处理的词块数量结算工作量（计费）。",
        notes: "英文一个 token 约等于 0.75 个单词，中文一个汉字常占 1～2 个 token。模型的上下文长度、调用计费都以 token 计。常见分词方式：BPE、WordPiece。",
        key_concepts: ["分词", "BPE", "计费单位", "最小处理单元"],
        source: { type: "conversation" },
      },
    },
    {
      id: "context_window",
      label: "Context Window",
      type: "concept",
      details: {
        zh_label: "上下文窗口",
        summary: "模型单次推理能同时「看见」的 token 上限，包含输入提示与已生成内容，超出部分会被遗忘。",
        analogy: "像一次会议员工能记住的信息量：议程太长，开头讲的内容到后面就被挤出脑子了，超出窗口的早期信息模型再也想不起来。",
        notes: "早期模型仅 2K～4K token，如今已扩展到 128K 乃至百万级。窗口越大越能处理长文档，但计算成本与显存占用也越高。",
        key_concepts: ["token 上限", "长文本处理", "遗忘", "推理成本"],
        source: { type: "conversation" },
      },
    },
    {
      id: "hallucination",
      label: "Hallucination",
      type: "concept",
      details: {
        zh_label: "幻觉",
        summary: "大模型一本正经地生成看似合理却与事实不符的内容，是 LLM 最典型的可靠性问题。",
        analogy: "像员工不懂装懂、张口胡编：为了把话接圆，把不知道的事说得有鼻子有眼，听起来很专业，其实是编的。",
        notes: "成因：模型本质是按概率续写而非检索事实，训练语料有噪声、知识有截止日期。常用缓解手段：RAG 检索增强、引用核验、降低生成温度。",
        key_concepts: ["事实性错误", "概率续写", "知识截止", "可靠性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "emergent_ability",
      label: "Emergent Ability",
      type: "concept",
      details: {
        zh_label: "涌现能力",
        summary: "模型规模跨过某个临界点后突然出现、小模型完全不具备的能力，如多步推理、少样本学习。",
        analogy: "像员工经验积累到一定程度后突然「开窍」：从前怎么教都不会的复杂任务，某天忽然就能举一反三地做下来了。",
        notes: "典型涌现能力：思维链推理、上下文学习（in-context learning）、指令遵循。学界对「涌现是否只是评测指标的非连续性」仍有争论。",
        key_concepts: ["规模临界点", "思维链", "上下文学习", "非线性提升"],
        source: { type: "conversation" },
      },
    },
    {
      id: "pretraining",
      label: "Pretraining",
      type: "technique",
      details: {
        zh_label: "预训练",
        summary: "在海量无标注文本上以「预测下一个 token」为目标进行自监督训练，让模型习得通用语言与世界知识。",
        analogy: "像员工上岗前接受的学校通识教育：还没分具体岗位，先博览群书打好底子，把语言、常识、各行各业的基础都学个遍。",
        notes: "自监督目标无需人工标注，直接用文本自身做监督信号。这一阶段消耗绝大部分算力，决定模型的知识上限。",
        key_concepts: ["自监督学习", "下一个 token 预测", "通用知识", "海量语料"],
        source: { type: "conversation" },
      },
    },
    {
      id: "fine_tuning",
      label: "Fine-Tuning",
      type: "technique",
      details: {
        zh_label: "微调",
        summary: "在预训练模型基础上，用特定领域或任务的小规模标注数据继续训练，使其适配具体场景。",
        analogy: "像员工入职后的岗位培训：通识底子已经有了，再针对本岗位的具体活儿专门带几天，让他上手公司自己的业务。",
        notes: "形式包括全参数微调、指令微调（Instruction Tuning）以及 LoRA 等参数高效微调。数据量远小于预训练，成本也低得多。",
        key_concepts: ["指令微调", "LoRA", "领域适配", "小样本标注"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rlhf",
      label: "RLHF",
      type: "technique",
      details: {
        zh_label: "人类反馈强化学习",
        summary: "用人类对模型输出的偏好排序训练奖励模型，再以强化学习优化语言模型，使其更符合人类期望与价值观。",
        analogy: "像师傅带教纠偏：徒弟干完活，师傅对几份结果比出好坏，徒弟据此领悟「老板到底想要哪种」，慢慢把分寸调到位。",
        notes: "RLHF = Reinforcement Learning from Human Feedback。流程：① 采集人类偏好数据；② 训练奖励模型；③ 用 PPO 等算法微调。是 ChatGPT「好用、听话」的关键。新兴替代：DPO、RLAIF。",
        key_concepts: ["奖励模型", "人类偏好", "PPO", "对齐"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 2 — Agent 核心簇
    // ═════════════════════════════════════════
    {
      id: "ai_agent",
      label: "AI Agent",
      type: "architecture",
      details: {
        zh_label: "AI 智能体",
        summary: "以 LLM 为大脑，具备记忆、规划与工具调用能力，能自主感知、决策并完成多步任务的系统。",
        analogy: "就是「数字员工」本人：大脑是 LLM，配上工位笔记本（记忆）、做事章法（规划）和办公软件（工具），从此能独立领任务、自己想办法把事办成。",
        notes: "与单轮对话的区别在于自主性：Agent 能拆解目标、调用工具、根据反馈循环修正，直到任务完成。核心组件：规划（Planning）、记忆（Memory）、工具使用（Tool Use）。",
        key_concepts: ["LLM 大脑", "自主决策", "多步任务", "感知-决策-行动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_memory",
      label: "Agent Memory",
      type: "concept",
      details: {
        zh_label: "智能体记忆",
        summary: "Agent 存储和检索历史交互、中间结果与长期知识的机制，分短期（上下文）与长期（外部存储）记忆。",
        analogy: "像员工工位上的笔记本：随手记下刚谈的要点（短期），重要的归档进抽屉日后再翻（长期），不至于转头就忘。",
        notes: "短期记忆依托上下文窗口；长期记忆常借助向量数据库做语义检索。记忆是 Agent 跨多轮、跨会话保持连贯的基础。",
        key_concepts: ["短期记忆", "长期记忆", "向量检索", "状态保持"],
        source: { type: "conversation" },
      },
    },
    {
      id: "planning",
      label: "Planning",
      type: "concept",
      details: {
        zh_label: "任务规划",
        summary: "Agent 把复杂目标拆解为有序子任务、并根据执行反馈动态调整的能力。",
        analogy: "像员工接到大活儿先列计划：把「办一场发布会」拆成定场地、发邀请、备物料等小步骤，干的过程中再随时调整次序。",
        notes: "常见策略：任务分解（Task Decomposition）、自我反思（Reflection）、回溯重规划。ReAct、Plan-and-Execute 等范式都围绕规划展开。",
        key_concepts: ["任务分解", "子目标", "自我反思", "动态调整"],
        source: { type: "conversation" },
      },
    },
    {
      id: "tool_use",
      label: "Tool Use",
      type: "technique",
      details: {
        zh_label: "工具使用",
        summary: "Agent 调用外部工具（搜索、代码执行、API、数据库等）以突破模型自身能力边界、获取实时信息或执行实际动作。",
        analogy: "像员工会用各种办公软件、查系统、填表单：脑子再聪明也得动手操作工具，才能真正把事办成，而不只是空谈。",
        notes: "工具使用让 LLM 从「只会说」变成「能做事」：查实时天气、跑一段计算、下单调接口。技术上多由 function calling 落地。",
        key_concepts: ["外部工具", "实时信息", "执行动作", "能力扩展"],
        source: { type: "conversation" },
      },
    },
    {
      id: "function_calling",
      label: "Function Calling",
      type: "technique",
      details: {
        zh_label: "函数调用",
        summary: "模型按预定义的函数 schema 输出结构化参数，由外部系统执行对应函数并把结果回传，是工具使用的标准实现方式。",
        analogy: "像员工提交标准化表单：不是随口说「帮我查下天气」，而是规规矩矩填好「城市=北京、日期=今天」的申请单，后台照单办事再把结果递回来。",
        notes: "开发者声明函数名、参数及类型（JSON Schema），模型据此判断何时调用、生成合规参数。是 OpenAI、Claude 等实现工具调用的底层协议。",
        key_concepts: ["JSON Schema", "结构化输出", "参数生成", "工具落地"],
        source: { type: "conversation" },
      },
    },
    {
      id: "react",
      label: "ReAct",
      type: "technique",
      details: {
        zh_label: "ReAct 推理模式",
        summary: "让 Agent 交替进行「推理（Reasoning）」与「行动（Acting）」的范式：边想边查、边查边修正，直到得出答案。",
        analogy: "像员工边想边干：先想一步「该查什么」，去查（行动），看到结果再想下一步，而不是闷头空想或盲目乱试。",
        notes: "ReAct = Reasoning + Acting。每轮输出 Thought → Action → Observation 循环。相比纯思维链，它能调用工具获取外部信息，显著减少幻觉。",
        key_concepts: ["推理-行动循环", "Thought-Action-Observation", "工具调用", "减少幻觉"],
        source: { type: "blog", title: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://react-lm.github.io/" },
      },
    },
    {
      id: "multi_agent",
      label: "Multi-Agent",
      type: "concept",
      details: {
        zh_label: "多智能体协作",
        summary: "多个各有分工的 Agent 通过通信与协作共同完成单个 Agent 难以胜任的复杂任务。",
        analogy: "像跨部门同事组队办事：产品、研发、测试各司其职又互相对接，凑成一个项目组，比一个人单打独斗能啃下更大的活儿。",
        notes: "常见模式：角色分工（如 CEO-员工）、辩论（Debate）、流水线协作。代表框架：MetaGPT、AutoGen、CrewAI。挑战在于通信成本与协调一致性。",
        key_concepts: ["角色分工", "智能体通信", "协作编排", "AutoGen"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 3 — Prompt / 指令簇
    // ═════════════════════════════════════════
    {
      id: "prompt_engineering",
      label: "Prompt Engineering",
      type: "technique",
      details: {
        zh_label: "提示工程",
        summary: "通过精心设计输入提示（指令、示例、上下文）来引导大模型产出期望输出的方法论。",
        analogy: "像老板怎么把活儿交代清楚：同一个员工，需求说得含糊就干得跑偏，把背景、要求、范例讲明白，产出立马靠谱。",
        notes: "核心手法：明确角色与任务、给出示例（few-shot）、要求分步推理（CoT）、约束输出格式。是低成本提升模型表现的首选手段。",
        key_concepts: ["指令设计", "上下文", "输出约束", "示例引导"],
        source: { type: "conversation" },
      },
    },
    {
      id: "system_prompt",
      label: "System Prompt",
      type: "technique",
      details: {
        zh_label: "系统提示词",
        summary: "在对话最前置、优先级最高的一段指令，用于设定模型的角色、人格、行为准则与边界。",
        analogy: "像员工的岗位说明书加职业人格设定：上岗前先白纸黑字写清「你是谁、负责什么、什么能做什么不能做」，之后所有工作都按这份底稿来。",
        notes: "系统提示对整段会话持续生效，优先级高于用户消息。常用于设定语气、限定领域、注入安全规则，是 Agent「灵魂文件」的核心载体。",
        key_concepts: ["角色设定", "行为准则", "最高优先级", "持续生效"],
        source: { type: "conversation" },
      },
    },
    {
      id: "chain_of_thought",
      label: "Chain-of-Thought",
      type: "technique",
      details: {
        zh_label: "思维链",
        summary: "引导模型在给出最终答案前先输出中间推理步骤，显著提升复杂推理任务的准确率。",
        analogy: "像要求员工别只报结论、先把演算过程写出来：一步步列清思路，既不容易算错，主管也能看出他到底想没想明白。",
        notes: "一句「Let's think step by step」即可触发零样本思维链。对算术、逻辑、多步推理任务提升明显，是涌现能力的代表。衍生：Self-Consistency、Tree-of-Thoughts。",
        key_concepts: ["中间推理步骤", "逐步思考", "复杂推理", "零样本 CoT"],
        source: { type: "blog", title: "Chain-of-Thought Prompting Elicits Reasoning", url: "https://arxiv.org/abs/2201.11903" },
      },
    },
    {
      id: "few_shot",
      label: "Few-Shot Prompting",
      type: "technique",
      details: {
        zh_label: "少样本提示",
        summary: "在提示中给出少量输入-输出示例，让模型据此模仿格式与思路完成同类任务，无需重新训练。",
        analogy: "像给新员工几份「样板」照着做：不用长篇大论讲规则，丢两三个做好的范例，他一看就懂该按什么格式、什么口径来交活。",
        notes: "与之相对的是零样本（zero-shot，不给示例）。示例数量、质量、顺序都会影响效果，本质是借上下文学习（in-context learning）而非更新权重。",
        key_concepts: ["示例引导", "上下文学习", "零样本对比", "无需训练"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 4 — RAG 簇
    // ═════════════════════════════════════════
    {
      id: "rag",
      label: "RAG",
      type: "technique",
      details: {
        zh_label: "检索增强生成",
        summary: "先从外部知识库检索相关资料，再把资料连同问题一起喂给模型生成答案，让回答有据可依。",
        analogy: "像员工遇到拿不准的问题先去档案室查资料：不凭脑子硬编，而是先翻出相关文件，照着权威资料来作答，自然靠谱得多。",
        notes: "RAG = Retrieval-Augmented Generation。典型流程：问题向量化 → 向量库检索 Top-K → 拼接进上下文 → 生成。能有效缓解幻觉、突破知识截止与上下文窗口限制。",
        key_concepts: ["检索增强", "外部知识库", "Top-K 检索", "缓解幻觉"],
        source: { type: "conversation" },
      },
    },
    {
      id: "embedding",
      label: "Embedding",
      type: "technique",
      details: {
        zh_label: "向量嵌入",
        summary: "把文本、图像等内容映射为高维稠密向量，使语义相近的内容在向量空间中距离也相近。",
        analogy: "像给每份档案贴上一套语义分类标签：内容相近的资料标签也相近，日后凭「意思」而非「字面」就能把相关的一批迅速找齐。",
        notes: "嵌入向量是语义检索的基石。常用模型：text-embedding-3、BGE、M3E。相似度通常用余弦距离衡量。",
        key_concepts: ["稠密向量", "语义空间", "余弦相似度", "文本表示"],
        source: { type: "conversation" },
      },
    },
    {
      id: "vector_database",
      label: "Vector Database",
      type: "framework",
      details: {
        zh_label: "向量数据库",
        summary: "专门存储向量嵌入并支持高效相似度检索的数据库，是 RAG 与长期记忆的存储底座。",
        analogy: "就是公司的那间档案室：海量资料按语义标签归好类、上了架，员工一来就能凭相近度飞快地把最相关的几份抽出来。",
        notes: "核心能力是近似最近邻（ANN）检索，兼顾速度与召回。代表产品：Pinecone、Milvus、Weaviate、Chroma、pgvector。",
        key_concepts: ["相似度检索", "近似最近邻", "Pinecone/Milvus", "RAG 存储"],
        source: { type: "conversation" },
      },
    },
    {
      id: "semantic_search",
      label: "Semantic Search",
      type: "technique",
      details: {
        zh_label: "语义检索",
        summary: "基于向量相似度按「意思」而非关键词匹配来检索内容，能找到表述不同但语义相关的结果。",
        analogy: "像员工查档案靠「理解意思」而不是死抠字眼：哪怕文件里用词和问题完全不同，只要说的是一回事，照样能被翻出来。",
        notes: "相比传统关键词检索（如 BM25），语义检索能跨越同义词、改写的鸿沟。实践中常与关键词检索混合（Hybrid Search）以兼顾精确与召回。",
        key_concepts: ["向量相似度", "语义匹配", "vs 关键词检索", "混合检索"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 5 — AI 视频生成簇
    // ═════════════════════════════════════════
    {
      id: "diffusion_model",
      label: "Diffusion Model",
      type: "architecture",
      details: {
        zh_label: "扩散模型",
        summary: "通过逐步向数据加噪再学习反向去噪来生成内容的生成式模型，是当前图像与视频生成的主流架构。",
        analogy: "像员工修复一张被打满马赛克的图：从一片噪点出发，一步步把它「擦」清晰，最终还原出一幅完整作品。",
        notes: "训练时向真实数据逐步加高斯噪声，模型学习每一步的反向去噪。代表：Stable Diffusion、DALL·E。视频生成中常与 Transformer 结合成 DiT（Diffusion Transformer）。",
        key_concepts: ["加噪-去噪", "反向扩散", "Stable Diffusion", "DiT"],
        source: { type: "conversation" },
      },
    },
    {
      id: "text_to_video",
      label: "Text-to-Video",
      type: "concept",
      details: {
        zh_label: "文生视频",
        summary: "根据自然语言描述直接生成连贯动态视频画面的技术，是 AIGC 在视频领域的代表方向。",
        analogy: "像员工把一句话需求做成一段视频成品：老板说「来个海边日落的延时」，他就直接交付一段能播的片子。",
        notes: "难点在于既要单帧画质，又要跨帧的时间一致性与运动合理性。代表产品：Sora、可灵、Runway、Pika。",
        key_concepts: ["文本驱动生成", "视频生成", "时间维度", "AIGC"],
        source: { type: "conversation" },
      },
    },
    {
      id: "sora",
      label: "Sora",
      type: "product",
      details: {
        zh_label: "Sora",
        summary: "OpenAI 推出的文生视频模型，能根据文本生成长达约一分钟、画质与连贯性出色的高清视频。",
        analogy: "像视频部门里那位顶尖的「数字员工」：给一句话就能产出长镜头大片，对物理运动和场景连贯的把握尤其到位。",
        notes: "采用 Diffusion Transformer 架构，把视频切成时空 patch（spacetime patches）作为 token 处理。2024 年发布时以时长与一致性刷新业界认知。",
        key_concepts: ["Diffusion Transformer", "时空 patch", "长视频", "OpenAI"],
        source: { type: "blog", title: "OpenAI Sora", url: "https://openai.com/sora" },
      },
    },
    {
      id: "kling",
      label: "Kling",
      type: "product",
      details: {
        zh_label: "可灵",
        summary: "快手推出的文生视频大模型，支持较长时长、高分辨率的视频生成，是国内代表性产品。",
        analogy: "像本土团队培养出的明星「视频数字员工」：同样听一句话产出视频，更懂中文语境和本地化需求。",
        notes: "可灵（Kling）采用扩散 + Transformer 技术路线，支持文生视频与图生视频，主打较长时长和较强的运动表现，是国内对标 Sora 的代表。",
        key_concepts: ["文生视频", "图生视频", "快手", "国产模型"],
        source: { type: "blog", title: "快手可灵 Kling", url: "https://kling.kuaishou.com/" },
      },
    },
    {
      id: "temporal_consistency",
      label: "Temporal Consistency",
      type: "concept",
      details: {
        zh_label: "时间一致性",
        summary: "生成视频中同一物体在连续帧间保持形态、身份与运动连贯、不闪烁不变形的特性，是视频生成的核心质量挑战。",
        analogy: "像检查一段视频前后镜头有没有「穿帮」：主角的衣服不能上一秒红下一秒蓝，杯子不能凭空多出一只，前后得对得上。",
        notes: "图像生成只需单帧好看，视频还必须跨帧稳定。常见问题：物体闪烁、形变、身份漂移。解决思路：时空注意力、光流约束、3D/视频 VAE。",
        key_concepts: ["跨帧连贯", "物体一致", "闪烁/形变", "时空注意力"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 6 — 工具平台簇
    // ═════════════════════════════════════════
    {
      id: "coze",
      label: "Coze",
      type: "product",
      details: {
        zh_label: "扣子 / Coze",
        summary: "字节跳动推出的零代码 AI Agent / Bot 搭建平台，可通过拖拽编排插件、工作流与知识库快速发布机器人。",
        analogy: "像一个「招聘 + 培训数字员工」的 HR 平台：不用写代码，在界面上挑能力、配资料，就能把一名数字员工招进来、培训好、直接派去上岗。",
        notes: "Coze（国内名「扣子」）提供插件、工作流、知识库、记忆等模块，支持一键发布到飞书、微信、Discord 等渠道，面向不会编程的搭建者。",
        key_concepts: ["零代码", "Bot 搭建", "插件/工作流", "字节跳动"],
        source: { type: "blog", title: "Coze 扣子平台", url: "https://www.coze.cn/" },
      },
    },
    {
      id: "dify",
      label: "Dify",
      type: "product",
      details: {
        zh_label: "Dify",
        summary: "开源的 LLM 应用开发平台，提供可视化编排、RAG 引擎、Agent 与 API，帮助快速构建并运营生成式应用。",
        analogy: "像另一家「数字员工 HR 平台」：同样能可视化地组建和培训数字员工，但更偏开源、可自部署，适合想把平台搬进自家机房的团队。",
        notes: "Dify 提供 Prompt 编排、RAG 知识库、Agent、可观测与 API 服务，支持私有化部署。常被拿来与 Coze、LangChain 比较。",
        key_concepts: ["开源", "可视化编排", "RAG 引擎", "私有化部署"],
        source: { type: "blog", title: "Dify.AI", url: "https://dify.ai/" },
      },
    },
    {
      id: "langchain",
      label: "LangChain",
      type: "framework",
      details: {
        zh_label: "LangChain",
        summary: "面向 LLM 应用的开发框架，提供链（Chain）、Agent、记忆、检索等抽象，用代码灵活编排复杂流程。",
        analogy: "像给资深工程师用的一套「数字员工装配工具箱」：不像零代码平台点点鼠标，而是用代码自由拼装每个零件，能搭出更复杂、更定制的员工。",
        notes: "LangChain 把 Prompt、模型、工具、记忆、检索封装为可组合模块，支持 Python/JS。灵活但学习曲线较陡，与 Coze、Dify 的零代码路线形成对比。",
        key_concepts: ["Chain 编排", "Agent", "代码级", "Python/JS"],
        source: { type: "blog", title: "LangChain 官网", url: "https://www.langchain.com/" },
      },
    },
  ],

  edges: [
    // ─── Transformer 整体结构 ───────────────────
    {
      id: "transformer__包含__encoder",
      source: "transformer",
      target: "encoder",
      label: "包含",
    },
    {
      id: "transformer__包含__decoder",
      source: "transformer",
      target: "decoder",
      label: "包含",
    },
    {
      id: "transformer__核心机制__multi_head_attention",
      source: "transformer",
      target: "multi_head_attention",
      label: "核心机制",
    },
    {
      id: "transformer__使用__positional_encoding",
      source: "transformer",
      target: "positional_encoding",
      label: "使用",
    },

    // ─── Encoder 子层 ───────────────────────────
    {
      id: "encoder__使用__multi_head_attention",
      source: "encoder",
      target: "multi_head_attention",
      label: "使用",
    },
    {
      id: "encoder__使用__feed_forward_network",
      source: "encoder",
      target: "feed_forward_network",
      label: "使用",
    },
    {
      id: "encoder__使用__residual_connection",
      source: "encoder",
      target: "residual_connection",
      label: "使用",
    },
    {
      id: "encoder__使用__layer_normalization",
      source: "encoder",
      target: "layer_normalization",
      label: "使用",
    },

    // ─── Decoder 子层 ───────────────────────────
    {
      id: "decoder__使用__masked_multi_head_attention",
      source: "decoder",
      target: "masked_multi_head_attention",
      label: "使用",
    },
    {
      id: "decoder__使用__cross_attention",
      source: "decoder",
      target: "cross_attention",
      label: "使用",
    },
    {
      id: "decoder__使用__feed_forward_network",
      source: "decoder",
      target: "feed_forward_network",
      label: "使用",
    },
    {
      id: "decoder__使用__residual_connection",
      source: "decoder",
      target: "residual_connection",
      label: "使用",
    },
    {
      id: "decoder__使用__layer_normalization",
      source: "decoder",
      target: "layer_normalization",
      label: "使用",
    },

    // ─── 注意力机制层级关系 ──────────────────────
    {
      id: "multi_head_attention__基于__scaled_dot_product_attention",
      source: "multi_head_attention",
      target: "scaled_dot_product_attention",
      label: "基于",
    },
    {
      id: "masked_multi_head_attention__变体自__multi_head_attention",
      source: "masked_multi_head_attention",
      target: "multi_head_attention",
      label: "变体自",
    },
    {
      id: "cross_attention__变体自__multi_head_attention",
      source: "cross_attention",
      target: "multi_head_attention",
      label: "变体自",
    },
    {
      id: "encoder__输出至__cross_attention",
      source: "encoder",
      target: "cross_attention",
      label: "输出至",
    },
    {
      id: "multi_head_attention__实现__self_attention",
      source: "multi_head_attention",
      target: "self_attention",
      label: "实现",
    },
    {
      id: "scaled_dot_product_attention__使用__softmax",
      source: "scaled_dot_product_attention",
      target: "softmax",
      label: "使用",
    },

    // ─── 训练相关 ────────────────────────────────
    {
      id: "transformer__训练使用__adam_optimizer",
      source: "transformer",
      target: "adam_optimizer",
      label: "训练使用",
    },
    {
      id: "transformer__训练使用__warmup_lr_schedule",
      source: "transformer",
      target: "warmup_lr_schedule",
      label: "训练使用",
    },
    {
      id: "transformer__训练使用__label_smoothing",
      source: "transformer",
      target: "label_smoothing",
      label: "训练使用",
    },
    {
      id: "transformer__验证于__wmt_dataset",
      source: "transformer",
      target: "wmt_dataset",
      label: "验证于",
    },

    // ═══ 批次 1 — LLM 全景簇 ════════════════════
    {
      id: "llm__基于__transformer",
      source: "llm",
      target: "transformer",
      label: "基于",
    },
    {
      id: "gpt__改进自__transformer",
      source: "gpt",
      target: "transformer",
      label: "改进自",
    },
    {
      id: "llm__包含__gpt",
      source: "llm",
      target: "gpt",
      label: "包含",
    },
    {
      id: "llm__存在问题__hallucination",
      source: "llm",
      target: "hallucination",
      label: "存在问题",
    },
    {
      id: "llm__受限于__context_window",
      source: "llm",
      target: "context_window",
      label: "受限于",
    },
    {
      id: "llm__处理单元__token",
      source: "llm",
      target: "token",
      label: "处理单元",
    },
    {
      id: "llm__训练阶段__pretraining",
      source: "llm",
      target: "pretraining",
      label: "训练阶段",
    },
    {
      id: "llm__训练阶段__fine_tuning",
      source: "llm",
      target: "fine_tuning",
      label: "训练阶段",
    },
    {
      id: "llm__训练阶段__rlhf",
      source: "llm",
      target: "rlhf",
      label: "训练阶段",
    },
    {
      id: "llm__表现出__emergent_ability",
      source: "llm",
      target: "emergent_ability",
      label: "表现出",
    },

    // ═══ 批次 2 — Agent 核心簇 ═══════════════════
    {
      id: "llm__驱动__ai_agent",
      source: "llm",
      target: "ai_agent",
      label: "驱动",
    },
    {
      id: "ai_agent__包含__agent_memory",
      source: "ai_agent",
      target: "agent_memory",
      label: "包含",
    },
    {
      id: "ai_agent__包含__planning",
      source: "ai_agent",
      target: "planning",
      label: "包含",
    },
    {
      id: "ai_agent__包含__tool_use",
      source: "ai_agent",
      target: "tool_use",
      label: "包含",
    },
    {
      id: "tool_use__实现为__function_calling",
      source: "tool_use",
      target: "function_calling",
      label: "实现为",
    },
    {
      id: "ai_agent__推理模式__react",
      source: "ai_agent",
      target: "react",
      label: "推理模式",
    },
    {
      id: "ai_agent__协作形态__multi_agent",
      source: "ai_agent",
      target: "multi_agent",
      label: "协作形态",
    },

    // ═══ 批次 3 — Prompt / 指令簇 ════════════════
    {
      id: "ai_agent__依赖__prompt_engineering",
      source: "ai_agent",
      target: "prompt_engineering",
      label: "依赖",
    },
    {
      id: "prompt_engineering__包含__system_prompt",
      source: "prompt_engineering",
      target: "system_prompt",
      label: "包含",
    },
    {
      id: "prompt_engineering__包含__chain_of_thought",
      source: "prompt_engineering",
      target: "chain_of_thought",
      label: "包含",
    },
    {
      id: "prompt_engineering__包含__few_shot",
      source: "prompt_engineering",
      target: "few_shot",
      label: "包含",
    },
    {
      id: "react__基于__chain_of_thought",
      source: "react",
      target: "chain_of_thought",
      label: "基于",
    },

    // ═══ 批次 4 — RAG 簇 ═════════════════════════
    {
      id: "ai_agent__使用__rag",
      source: "ai_agent",
      target: "rag",
      label: "使用",
    },
    {
      id: "rag__缓解__hallucination",
      source: "rag",
      target: "hallucination",
      label: "缓解",
    },
    {
      id: "rag__依赖__embedding",
      source: "rag",
      target: "embedding",
      label: "依赖",
    },
    {
      id: "rag__依赖__semantic_search",
      source: "rag",
      target: "semantic_search",
      label: "依赖",
    },
    {
      id: "semantic_search__检索于__vector_database",
      source: "semantic_search",
      target: "vector_database",
      label: "检索于",
    },
    {
      id: "embedding__存储于__vector_database",
      source: "embedding",
      target: "vector_database",
      label: "存储于",
    },

    // ═══ 批次 5 — AI 视频生成簇 ══════════════════
    {
      id: "transformer__被借鉴于__diffusion_model",
      source: "transformer",
      target: "diffusion_model",
      label: "被借鉴于",
    },
    {
      id: "diffusion_model__应用于__text_to_video",
      source: "diffusion_model",
      target: "text_to_video",
      label: "应用于",
    },
    {
      id: "text_to_video__代表产品__sora",
      source: "text_to_video",
      target: "sora",
      label: "代表产品",
    },
    {
      id: "text_to_video__代表产品__kling",
      source: "text_to_video",
      target: "kling",
      label: "代表产品",
    },
    {
      id: "text_to_video__质量挑战__temporal_consistency",
      source: "text_to_video",
      target: "temporal_consistency",
      label: "质量挑战",
    },
    {
      id: "text_to_video__存在问题__hallucination",
      source: "text_to_video",
      target: "hallucination",
      label: "存在问题",
    },

    // ═══ 批次 6 — 工具平台簇 ═════════════════════
    {
      id: "ai_agent__搭建于__coze",
      source: "ai_agent",
      target: "coze",
      label: "搭建于",
    },
    {
      id: "ai_agent__搭建于__dify",
      source: "ai_agent",
      target: "dify",
      label: "搭建于",
    },
    {
      id: "ai_agent__搭建于__langchain",
      source: "ai_agent",
      target: "langchain",
      label: "搭建于",
    },
    {
      id: "coze__对比__langchain",
      source: "coze",
      target: "langchain",
      label: "对比",
      directed: false,
    },
    {
      id: "dify__对比__langchain",
      source: "dify",
      target: "langchain",
      label: "对比",
      directed: false,
    },
  ],
};
