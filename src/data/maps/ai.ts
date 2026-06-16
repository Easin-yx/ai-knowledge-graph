import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

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

const aiGraphData: GraphData = {
  nodes: [
    // ═════════════════════════════════════════
    // 批次 0 — 机器学习地基
    // ═════════════════════════════════════════

    // ─────────────────────────────────────────
    // 范式层 (concept)
    // ─────────────────────────────────────────
    {
      id: "machine_learning",
      label: "Machine Learning",
      type: "concept",
      details: {
        zh_label: "机器学习",
        summary: "让计算机从数据中自动学习规律，而非靠人工逐条编写规则的学科，是现代 AI 的主干范式。",
        analogy: "像培养一名从零开始的员工：与其把每一条操作规范背给他听，不如让他在大量真实案例里自己琢磨出门道——失误一次就改一次，久而久之自然就摸到了规律。",
        notes: "机器学习按学习方式分为监督学习、无监督学习和强化学习三大范式；深度学习是其最强大的子流派。核心思想：用数据驱动参数优化，代替人工规则设计。",
        key_concepts: ["数据驱动", "模式识别", "参数优化", "泛化能力"],
        source: { type: "conversation" },
      },
    },
    {
      id: "deep_learning",
      label: "Deep Learning",
      type: "concept",
      details: {
        zh_label: "深度学习",
        summary: "机器学习的一个子流派，以多层神经网络为基础，通过逐层自动提取特征来学习数据的复杂规律，是当代 AI 爆发的核心引擎。",
        analogy: "像员工培训从「看规则手册」升级成「在实践中层层领悟」：初级员工只会认识简单的表象，每多一层「师傅带徒弟」，理解的抽象程度就深一层，最终能看懂别人看不出的复杂模式。",
        notes: "得名于神经网络的「层数」（深度）。区别于浅层机器学习（如 SVM、决策树），深度学习能自动学习原始数据的层次化特征表示，不再依赖人工特征工程。代表架构：CNN、RNN、Transformer。",
        key_concepts: ["层次化特征", "自动特征提取", "多层神经网络", "特征工程消亡"],
        source: { type: "conversation" },
      },
    },
    {
      id: "supervised_learning",
      label: "Supervised Learning",
      type: "concept",
      details: {
        zh_label: "监督学习",
        summary: "用「输入-答案」配对的标注数据训练模型，让模型学会从输入预测正确输出的学习范式，是最经典也最广泛应用的机器学习方式。",
        analogy: "像学员做历年真题：每道题都配有标准答案，做完对照一遍，哪里错了当场纠正——通过反复练习有答案的题库，逐渐掌握答题的门道。",
        notes: "代表任务：图像分类（输入图像→输出类别）、机器翻译（输入原文→输出译文）、语音识别。需要大量人工标注数据，标注成本是主要瓶颈。",
        key_concepts: ["标注数据", "输入-输出对", "分类/回归", "有监督"],
        source: { type: "conversation" },
      },
    },
    {
      id: "unsupervised_learning",
      label: "Unsupervised Learning",
      type: "concept",
      details: {
        zh_label: "无监督学习",
        summary: "只给模型数据、不给答案标签，让模型自己发现数据内在的结构、规律或压缩表示的学习范式。",
        analogy: "像员工拿到一堆杂乱档案，没人告诉他应该怎么分类，他只能自己摸索：把相似的放一堆、不相似的分开，最后整理出一套自己的归档逻辑。",
        notes: "代表任务：聚类（K-Means）、降维（PCA）、生成（VAE）。向量嵌入（Embedding）本质上也属于无监督/自监督学习的产物。",
        key_concepts: ["无标签", "聚类", "降维", "内在结构"],
        source: { type: "conversation" },
      },
    },
    {
      id: "reinforcement_learning",
      label: "Reinforcement Learning",
      type: "concept",
      details: {
        zh_label: "强化学习",
        summary: "让智能体在与环境的交互中通过「奖励与惩罚」不断试错，逐步学会最优策略的学习范式。",
        analogy: "像员工在实战中靠绩效反馈成长：做对了事情涨奖金（正奖励），做错了被扣分（惩罚），没有人手把手教，全靠自己从试错中摸清哪种做法能最终拿到更多奖金。",
        notes: "核心要素：智能体（Agent）、环境（Environment）、状态（State）、动作（Action）、奖励（Reward）。代表算法：Q-Learning、PPO、AlphaGo。在 AI 中最重要的应用：RLHF（人类反馈强化学习），让 LLM 对齐人类价值观。",
        key_concepts: ["试错", "奖励信号", "策略优化", "智能体-环境"],
        source: { type: "conversation" },
      },
    },
    {
      id: "self_supervised_learning",
      label: "Self-Supervised Learning",
      type: "concept",
      details: {
        zh_label: "自监督学习",
        summary: "从数据本身自动构造监督信号，无需人工标注即可大规模训练模型的学习范式，是大模型预训练的理论基础。",
        analogy: "像员工拿到一本书，用遮住下半段的方式来检验自己是否真正理解上半段：不需要别人出题，文章本身就是试卷——预测被遮住的部分既是练习也是验证。",
        notes: "典型任务：预测被遮住的词（BERT 的 MLM）、预测下一个词（GPT 的 CLM）、对比学习（CLIP）。自监督学习解决了监督学习对人工标注的依赖，使得利用互联网海量无标注文本成为可能。",
        key_concepts: ["自构造标签", "无需标注", "大规模预训练", "掩码预测"],
        source: { type: "conversation" },
      },
    },

    // ─────────────────────────────────────────
    // 神经网络基础
    // ─────────────────────────────────────────
    {
      id: "neural_network",
      label: "Neural Network",
      type: "architecture",
      details: {
        zh_label: "神经网络",
        summary: "受生物大脑启发、由大量相互连接的神经元（参数）分层构成的计算模型，能通过调整连接权重来学习复杂映射关系。",
        analogy: "像一个多部门串联的公司处理系统：每个员工（神经元）只负责把上一层同事传过来的信息加工一下再传给下一层，全司上下协同，最终把原始输入「加工」成需要的输出。",
        notes: "关键要素：层（输入层、隐藏层、输出层）、权重（连接强度）、激活函数（引入非线性）。参数越多、层数越深，模型表达能力越强。训练靠反向传播算法自动调整权重。",
        key_concepts: ["层", "权重", "激活函数", "通用近似定理"],
        source: { type: "conversation" },
      },
    },
    {
      id: "neuron",
      label: "Neuron / Perceptron",
      type: "concept",
      details: {
        zh_label: "神经元/感知机",
        summary: "神经网络的最小计算单元：对所有输入做加权求和，加上偏置后经激活函数变换，输出一个信号。",
        analogy: "像一位汇总投票的员工：把各渠道意见按重要性加权相加，超过一定门槛就「亮绿灯」给上层汇报，不够就「亮红灯」按兵不动——激活函数就是那道判断门槛。",
        notes: "数学表达：y = f(Σ wᵢxᵢ + b)，其中 wᵢ 为权重，b 为偏置，f 为激活函数。单个神经元即「感知机」（Perceptron），只能处理线性可分问题；多层堆叠才能处理非线性。",
        key_concepts: ["加权求和", "偏置", "激活函数", "感知机"],
        source: { type: "conversation" },
      },
    },
    {
      id: "mlp",
      label: "MLP",
      type: "architecture",
      details: {
        zh_label: "多层感知机",
        summary: "由多个全连接层堆叠而成的最基础神经网络架构，每层的每个神经元都与下一层所有神经元相连，通过非线性激活实现任意函数近似。",
        analogy: "像一条多道工序的全员协作流水线：每道工序（层）的所有员工都要把各自的处理结果交给下一道工序的每一位同事——信息全量流通、充分加工，是最「朴素」的神经网络形态。",
        notes: "MLP = Multi-Layer Perceptron。Transformer 中的 Feed-Forward Network（FFN）本质上就是一个两层 MLP（中间带 ReLU/SwiGLU）。局限：对图像效率低，被 CNN 取代；对序列效率低，被 RNN/Transformer 取代。",
        key_concepts: ["全连接", "多层堆叠", "通用近似", "非线性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "activation_function",
      label: "Activation Function",
      type: "technique",
      details: {
        zh_label: "激活函数",
        summary: "神经元输出端的非线性变换函数，使神经网络能拟合任意复杂的函数关系，而非只能做线性变换。",
        analogy: "像员工汇报时的「判断过滤器」：不是把所有输入原样往上传，而是经过自己的判断——低于门槛的直接忽略或压缩，高于门槛的才放大传出——正是这道「主观判断」让整套系统具备了分析非线性问题的能力。",
        notes: "没有激活函数，多层神经网络等价于单层线性变换，无论堆多少层都无法拟合非线性。常用函数：Sigmoid（早期，梯度消失）、ReLU（max(0,x)，目前最常用）、GELU（Transformer 常用）、Swish（SwiGLU 基础）。",
        key_concepts: ["非线性", "ReLU", "GELU", "梯度消失问题"],
        source: { type: "conversation" },
      },
    },
    {
      id: "backpropagation",
      label: "Backpropagation",
      type: "technique",
      details: {
        zh_label: "反向传播",
        summary: "利用链式法则从输出层反向逐层计算损失函数对每个参数的梯度，是神经网络参数更新的核心算法。",
        analogy: "像质检部门发现产品有缺陷后的「反向追责」：从成品（输出）一层层往前查是哪道工序出了多大的问题，每道工序都收到一份「你应该负多少责任」的报告，然后据此调整操作——下次同样工序就不会犯同样的错。",
        notes: "反向传播 = 链式法则在计算图上的高效应用。配合梯度下降优化器，构成神经网络训练的完整闭环：正向传播计算损失 → 反向传播计算梯度 → 优化器更新参数。1986 年由 Rumelhart、Hinton、Williams 推广至神经网络。",
        key_concepts: ["链式法则", "梯度", "计算图", "参数更新"],
        source: { type: "paper", title: "Learning representations by back-propagating errors", year: 1986, authors: ["Rumelhart", "Hinton", "Williams"] },
      },
    },
    {
      id: "gradient_descent",
      label: "Gradient Descent",
      type: "technique",
      details: {
        zh_label: "梯度下降",
        summary: "沿损失函数梯度的反方向迭代更新参数，使损失逐步降低直到收敛的优化算法，是神经网络训练的基础优化方案。",
        analogy: "像员工在山地里蒙眼找谷底：每一步都往脚下最陡的下坡方向迈一步（梯度的反方向），步子大小就是学习率——步子太大容易跨过谷底在对面坡乱弹，步子太小迟迟找不到出路，找好节奏才能稳稳走到最低点。",
        notes: "θ_new = θ_old - α·∇L(θ)，其中 α 为学习率。变体：批量梯度下降（全数据）、随机梯度下降（SGD，每次一个样本）、小批量梯度下降（Mini-batch，实践最常用）。Adam、RMSProp 等自适应优化器都是梯度下降的改进版本。",
        key_concepts: ["学习率", "梯度方向", "收敛", "SGD"],
        source: { type: "conversation" },
      },
    },
    {
      id: "loss_function",
      label: "Loss Function",
      type: "technique",
      details: {
        zh_label: "损失函数",
        summary: "衡量模型预测结果与真实答案之间差距的函数，是整个训练过程的优化目标，损失越小意味着模型越准确。",
        analogy: "像绩效考核的扣分表：把员工产出和标准答案逐条对比，差距越大扣分越多；训练的目标就是让这张扣分表的总分越来越低，最终成为「零差错」员工。",
        notes: "常见损失函数：交叉熵损失（分类任务）、均方误差 MSE（回归任务）、负对数似然（语言建模）。损失函数的梯度经反向传播传递给所有参数，是优化的信号源头。选择合适的损失函数对训练效果至关重要。",
        key_concepts: ["优化目标", "交叉熵", "MSE", "预测误差"],
        source: { type: "conversation" },
      },
    },

    // ─────────────────────────────────────────
    // 训练通识
    // ─────────────────────────────────────────
    {
      id: "overfitting",
      label: "Overfitting",
      type: "concept",
      details: {
        zh_label: "过拟合",
        summary: "模型在训练集上表现极好、但在未见过的新数据上表现差的现象，本质是模型「死记硬背」了训练样本而非学到通用规律。",
        analogy: "像只会刷原题的应试型员工：历年考题背得滚瓜烂熟，但换一道从未见过的新题型就束手无策，因为他记住的是「这题怎么答」而非真正理解了背后的原理。",
        notes: "过拟合的反面是欠拟合（模型太简单，连训练集都学不好）。核心诊断：训练损失低而验证损失高。缓解手段：正则化（L1/L2/Dropout）、数据增强、早停（Early Stopping）、使用更大的数据集。",
        key_concepts: ["泛化能力", "训练/验证差距", "死记硬背", "欠拟合"],
        source: { type: "conversation" },
      },
    },
    {
      id: "regularization",
      label: "Regularization",
      type: "technique",
      details: {
        zh_label: "正则化",
        summary: "在训练目标中加入对模型复杂度的惩罚项，防止过拟合、提升模型泛化到新数据能力的一类技术总称。",
        analogy: "像给员工的绩效考核加「行为规范」扣分项：不只看他历史题答得多满，还要看他是否「记忆超标」（参数过大），绩效公式同时惩罚两项，逼他学会真正融会贯通而不是死记。",
        notes: "常见形式：L2 正则化（权重衰减 Weight Decay，给大权重额外惩罚）、L1 正则化（产生稀疏权重）、Dropout（训练时随机丢弃神经元）、标签平滑（Label Smoothing，已在图谱中）。深度学习中 Weight Decay 和 Dropout 最为常用。",
        key_concepts: ["权重衰减", "Dropout", "L1/L2", "泛化"],
        source: { type: "conversation" },
      },
    },
    {
      id: "dataset_split",
      label: "Dataset Split",
      type: "concept",
      details: {
        zh_label: "训练/验证/测试集",
        summary: "把数据分成训练集（拟合参数）、验证集（调超参数与检测过拟合）、测试集（最终无偏评估）三份，确保评估结果真实可信。",
        analogy: "像把题库分成三摞：第一摞反复练习（训练集），第二摞随时测试自己、调整学习策略（验证集），第三摞封存起来只在最后大考时打开（测试集）——如果拿大考题练过手，最终成绩就失去了参考价值。",
        notes: "常见分割比例：60/20/20 或 70/15/15。验证集不参与参数更新，但超参数会根据验证集结果调整，因此验证集上的表现仍有信息泄露风险；测试集应做到「只用一次」。小数据集可用交叉验证（Cross-Validation）。",
        key_concepts: ["训练集", "验证集", "测试集", "信息泄露"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 0.5 — 经典神经网络（承上启下）
    // ═════════════════════════════════════════
    {
      id: "cnn",
      label: "CNN",
      type: "architecture",
      details: {
        zh_label: "卷积神经网络",
        summary: "利用卷积核在输入（图像/序列）上滑动提取局部特征、并逐层抽象的神经网络，是图像识别和计算机视觉的支柱架构。",
        analogy: "像视觉审阅员用固定大小的放大镜，从左到右、从上到下逐块扫描一份设计图：每次只看一小块局部，把发现的特征（边缘、纹理、形状）记录下来；多块记录汇总后再去看更高层次的结构，一层层抽象直到认出完整的内容。",
        notes: "核心思想：局部感受野 + 权重共享（同一卷积核扫全图，参数量大幅减少）+ 平移不变性。典型应用：图像分类（ResNet）、目标检测（YOLO）、图像分割（U-Net）。扩散模型原始版本中的 U-Net 骨干即基于 CNN；后被 DiT（Transformer）取代。",
        key_concepts: ["卷积核", "局部感受野", "权重共享", "U-Net"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rnn",
      label: "RNN",
      type: "architecture",
      details: {
        zh_label: "循环神经网络",
        summary: "通过在时间步之间传递隐藏状态来建模序列数据的神经网络，是 Transformer 出现前 NLP 任务的主流架构。",
        analogy: "像员工逐字阅读一份冗长报告，每读完一句都把关键记忆「攥在手里」传给下一句处理：隐藏状态就是那只不断更新的「记忆之手」，读到哪里，手里就攥着截至此处的综合印象。",
        notes: "优点：天然处理变长序列，参数共享。致命缺陷：梯度在长序列中传播会消失或爆炸，导致「长距离遗忘」——开头说的事，几十步后模型就忘了。LSTM 通过门控机制缓解了这一问题，但最终仍被 Transformer 彻底取代（后者靠注意力机制一步到位捕获任意距离的依赖）。",
        key_concepts: ["隐藏状态", "序列建模", "梯度消失", "长距离遗忘"],
        source: { type: "conversation" },
      },
    },
    {
      id: "lstm",
      label: "LSTM",
      type: "architecture",
      details: {
        zh_label: "长短期记忆网络",
        summary: "RNN 的改进版本，通过「输入门、遗忘门、输出门」三个门控单元有选择地记忆或遗忘信息，显著缓解了标准 RNN 的长距离梯度消失问题。",
        analogy: "像员工阅读长文时学会了有选择地做笔记：遗忘门决定「这条旧记录还有没有价值」，输入门决定「这条新信息值不值得记下来」，输出门决定「现在该把哪部分笔记拿出来用」——比起毫无选择地攥住所有记忆，有取舍地记录让他能把真正重要的内容保留到文章末尾。",
        notes: "由 Hochreiter & Schmidhuber 于 1997 年提出。核心：细胞状态（Cell State）作为独立的「记忆高速公路」，梯度可以在其上近乎无损地流动。在 Transformer 问世之前，LSTM 是机器翻译、语音识别等序列任务的 SOTA 架构。",
        key_concepts: ["门控机制", "细胞状态", "长距离依赖", "三门控"],
        source: { type: "paper", title: "Long Short-Term Memory", year: 1997, authors: ["Hochreiter", "Schmidhuber"] },
      },
    },

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
      id: "tokenizer",
      label: "Tokenizer",
      type: "concept",
      details: {
        zh_label: "分词器",
        summary: "把原始文本按词表切分成 token 序列的组件，是文本送入模型前的第一道处理工序。",
        analogy: "像把整篇文件按「词块」裁成一张张便签，员工才好逐块阅读和处理。",
        notes: "主流算法：BPE（GPT 系）、WordPiece（BERT 系）、Unigram。词表大小与切分粒度直接影响序列长度、调用计费与多语言表现。",
        key_concepts: ["BPE", "WordPiece", "词表", "子词切分"],
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
    // 批次 1.5 — 现代 LLM 内核（2017 原始 Transformer 之后的关键演进）
    // ═════════════════════════════════════════
    {
      id: "decoder_only",
      label: "Decoder-Only",
      type: "architecture",
      details: {
        zh_label: "仅解码器架构",
        summary: "丢掉原始 Transformer 的编码器、只保留解码器堆叠的架构，靠掩码自注意力逐个预测下一个 token，是当代主流 LLM（GPT、LLaMA 等）的通用骨架。",
        analogy: "像把「先有人通读全文做摘要、再有人据此写作」的两人流程，精简成一位边读边写的全能员工：他只顺着已经写出的内容往下接，一个字一个字地续写，结构反而更简单、更适合规模化扩张。",
        notes: "相比原始的 Encoder-Decoder，Decoder-only 训练目标统一为「预测下一个 token」（CLM），数据利用率高、易于规模化。三大范式对比：Encoder-only（BERT，擅理解）、Encoder-Decoder（T5，擅翻译/摘要）、Decoder-only（GPT，擅生成）。当代绝大多数对话大模型都收敛到 Decoder-only 路线。",
        key_concepts: ["仅解码器", "因果语言建模", "vs BERT/T5", "规模化友好"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rope",
      label: "RoPE",
      type: "technique",
      details: {
        zh_label: "旋转位置编码",
        summary: "用旋转矩阵把位置信息「旋」进 query 和 key 向量，使注意力天然只依赖两个 token 的相对距离，并具备一定的长度外推能力。",
        analogy: "像给钟表每个位置的指针拨到不同角度：两段内容隔多远，对应指针的夹角就差多少；模型一看夹角就知道彼此的相对远近，而不必死记每个位置的绝对编号。",
        notes: "RoPE = Rotary Position Embedding（RoFormer 提出）。相比原始正弦绝对位置编码，它在每层注意力计算时即时注入相对位置，长文本表现更稳，是 LLaMA、Qwen、GLM 等主流模型的标配。配合 NTK / 位置插值等技巧可把训练时的窗口外推到更长。",
        key_concepts: ["相对位置", "旋转矩阵", "长度外推", "RoFormer"],
        source: { type: "paper", title: "RoFormer: Enhanced Transformer with Rotary Position Embedding", year: 2021, authors: ["Su", "Lu", "Pan", "Wen", "Liu"], url: "https://arxiv.org/abs/2104.09864" },
      },
    },
    {
      id: "rmsnorm",
      label: "RMSNorm",
      type: "technique",
      details: {
        zh_label: "均方根归一化",
        summary: "只用向量的均方根做缩放、省去 LayerNorm 的均值中心化和偏置项的归一化方法，计算更省、训练更稳，是现代 LLM 的常用替代。",
        analogy: "像给数据「调音量」时只按整体响度统一缩放，不再额外做「去掉直流偏置」那一步：省掉一道工序，效果几乎不打折，速度还更快。",
        notes: "RMSNorm 去掉了 LayerNorm 中减均值的步骤，只除以均方根（RMS）再乘可学习增益，参数和计算量都更少。配合 Pre-Norm（归一化放在子层之前）能让深层 Transformer 训练更稳定。被 LLaMA 系列等广泛采用。",
        key_concepts: ["均方根缩放", "省去均值中心化", "Pre-Norm", "LLaMA 标配"],
        source: { type: "paper", title: "Root Mean Square Layer Normalization", year: 2019, authors: ["Zhang", "Sennrich"], url: "https://arxiv.org/abs/1910.07467" },
      },
    },
    {
      id: "swiglu",
      label: "SwiGLU",
      type: "technique",
      details: {
        zh_label: "门控前馈激活",
        summary: "用 Swish 门控线性单元改造前馈网络，多引入一条「门控」支路逐元素调节信息流，比原始 ReLU FFN 表达力更强，是现代 LLM 前馈层的主流选择。",
        analogy: "像给前馈层加了一道智能阀门：信息不再是「要么全过、要么砍掉」，而是每个维度都有一个旋钮按需调节流量，细腻得多，产出质量也更高。",
        notes: "SwiGLU 属于 GLU（门控线性单元）家族，用 Swish 作为激活：FFN(x)=(Swish(xW)⊗xV)W₂。为保持参数量持平通常把隐藏维度按 2/3 缩放。被 LLaMA、PaLM 等采用，是「无脑能涨点」的工程改进之一。",
        key_concepts: ["门控线性单元", "Swish 激活", "替代 ReLU FFN", "表达力增强"],
        source: { type: "paper", title: "GLU Variants Improve Transformer", year: 2020, authors: ["Shazeer"], url: "https://arxiv.org/abs/2002.05202" },
      },
    },
    {
      id: "gqa",
      label: "GQA / MQA",
      type: "technique",
      details: {
        zh_label: "分组查询注意力",
        summary: "让多个 query 头共享同一组 key/value 头，大幅压缩推理时 KV Cache 的显存占用，在多头注意力的质量和多查询注意力的高效之间取折中。",
        analogy: "像原本每位审阅员（query 头）都要各自备一整套档案副本（K/V），太占地方；改成几位审阅员合用一套档案，仓库立刻腾空大半，审阅质量却几乎没下降。",
        notes: "谱系：MHA（每个 query 头独享 K/V，质量高但 KV Cache 大）→ MQA（所有 query 头共享一组 K/V，最省但略掉点）→ GQA（分成若干组、每组共享，折中且接近 MHA 质量）。GQA 是 LLaMA-2/3 等长上下文模型的标配，直接决定长文本推理的显存与吞吐。",
        key_concepts: ["K/V 头共享", "KV Cache 压缩", "MHA→MQA→GQA", "长上下文推理"],
        source: { type: "paper", title: "GQA: Training Generalized Multi-Query Transformer Models", year: 2023, authors: ["Ainslie", "Lee-Thorp", "de Jong", "Zemlyanskiy", "Lebrón", "Sanghai"], url: "https://arxiv.org/abs/2305.13245" },
      },
    },
    {
      id: "kv_cache",
      label: "KV Cache",
      type: "technique",
      details: {
        zh_label: "键值缓存",
        summary: "自回归生成时把已算过的历史 token 的 key/value 缓存下来，每生成一个新 token 只需计算它自己的部分，避免对整段前缀重复计算，是 LLM 推理提速的核心机制。",
        analogy: "像员工边写长文边把前文要点记在便签上：每续写一句不必从头重读全文，瞄一眼便签就能接着写，越往后省下的重复功夫越多。",
        notes: "KV Cache 把单步生成的复杂度从随序列长度平方降到线性，是流式输出能「逐字蹦出」的基础。代价是显存随上下文长度线性膨胀——这正是 GQA、量化、PagedAttention（vLLM）等技术要解决的瓶颈。",
        key_concepts: ["历史 K/V 缓存", "避免重复计算", "显存随长度增长", "推理提速"],
        source: { type: "conversation" },
      },
    },
    {
      id: "flash_attention",
      label: "FlashAttention",
      type: "technique",
      details: {
        zh_label: "IO 感知注意力",
        summary: "一种重写注意力计算顺序的 IO 感知算子：分块计算并融合算子，避免把巨大的注意力矩阵写回显存，在不改变数学结果的前提下显著提速并省显存。",
        analogy: "像精明的员工处理大批文件：不把所有中间草稿都摊在桌上（显存）占地方，而是一小批一小批地在手边（高速缓存）算完即收，最终结果一模一样，桌面却始终清爽、干活还更快。",
        notes: "瓶颈洞察：注意力慢不在算力而在显存读写（HBM IO）。FlashAttention 用分块（tiling）+ 在线 softmax + 算子融合把中间大矩阵留在片上 SRAM，省去对 N×N 矩阵的反复读写。是长上下文训练与推理的关键加速器，已成事实标准，并迭代到 v2/v3。",
        key_concepts: ["IO 感知", "分块计算", "省显存", "结果等价"],
        source: { type: "paper", title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness", year: 2022, authors: ["Dao", "Fu", "Ermon", "Rudra", "Ré"], url: "https://arxiv.org/abs/2205.14135" },
      },
    },
    {
      id: "moe",
      label: "MoE",
      type: "architecture",
      details: {
        zh_label: "混合专家",
        summary: "把前馈层拆成多个「专家」子网络，由路由器为每个 token 只挑选少数专家激活，从而在总参数量暴涨的同时让单次计算量几乎不变。",
        analogy: "像一家公司养着大量各有专长的顾问（专家），但每件事只派最对口的一两位上场：人才库规模巨大，单次出动的成本却很低，专业度还更高。",
        notes: "MoE = Mixture of Experts。核心是稀疏激活：每个 token 经路由器（gating）选 Top-K 个专家（常 K=1 或 2）。优点是用更少算力换更大容量；难点是负载均衡（避免专家旱涝不均）和通信开销。代表：Switch Transformer、Mixtral，业界普遍认为 GPT-4 等顶级模型亦采用 MoE。",
        key_concepts: ["稀疏激活", "专家路由", "参数量↑算力不变", "负载均衡"],
        source: { type: "paper", title: "Switch Transformers: Scaling to Trillion Parameter Models", year: 2021, authors: ["Fedus", "Zoph", "Shazeer"], url: "https://arxiv.org/abs/2101.03961" },
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

    // ─────────────────────────────────────────
    // 批次 5 扩充 — 架构 (architecture)
    // ─────────────────────────────────────────
    {
      id: "dit",
      label: "Diffusion Transformer (DiT)",
      type: "architecture",
      details: {
        zh_label: "扩散 Transformer",
        summary: "用 Transformer 替换扩散模型中原有的 U-Net 去噪骨干，实现更强的扩展性与生成质量，是 Sora 等顶级视频模型的核心架构。",
        analogy: "像公司把原来靠科层式「逐级转发文件」的传统流程（U-Net）升级成了能全局协调、任何两个人都能直接对话的数字化协作系统（Transformer）：做同样的去噪工作，新系统理解得更透、配合得更默契、规模越大越能发挥优势。",
        notes: "论文：Scalable Diffusion Models with Transformers（Peebles & Xie, 2022）。核心改动：把 U-Net 的卷积层全部替换为多头自注意力 + 前馈网络的 Transformer Block，并引入 adaLN-Zero（自适应层归一化）注入时间步与类别条件。优势：参数越多效果提升越平稳，天然适合多模态输入，与 LLM 共享架构便于联合训练。Sora 将 DiT 扩展到时空 patch 维度（即 Video DiT）。",
        key_concepts: ["U-Net 替代", "adaLN-Zero", "规模可扩展", "Sora 骨干"],
        source: { type: "paper", title: "Scalable Diffusion Models with Transformers", year: 2022, authors: ["Peebles", "Xie"], url: "https://arxiv.org/abs/2212.09748" },
      },
    },
    {
      id: "latent_diffusion",
      label: "Latent Diffusion",
      type: "architecture",
      details: {
        zh_label: "潜空间扩散",
        summary: "不在像素空间直接做加噪与去噪，而是先用 VAE 把高分辨率内容压缩到低维潜空间，在潜空间完成整个扩散过程后再解码还原，大幅降低计算成本。",
        analogy: "像员工不在一份几百页的原始档案上逐字逐页修改，而是先让档案专员（VAE 编码器）把档案浓缩成一份精炼摘要，所有的修改讨论都在摘要层面进行，最后再由档案专员（VAE 解码器）把修改好的摘要还原成完整档案——工作量省了一个数量级，档案质量几乎不打折。",
        notes: "论文：High-Resolution Image Synthesis with Latent Diffusion Models（Rombach et al., 2022），即 Stable Diffusion 的理论基础。潜空间维度通常是像素空间的 1/64～1/256，使扩散的每步计算量急剧减少。条件信息（文本/图像）通过 Cross-Attention 注入 U-Net/DiT 的每一层。视频生成中，Video VAE 将时序维度一并压缩，进一步降低时空计算成本。",
        key_concepts: ["VAE 压缩", "潜空间操作", "计算高效", "Stable Diffusion 基础"],
        source: { type: "paper", title: "High-Resolution Image Synthesis with Latent Diffusion Models", year: 2022, authors: ["Rombach", "Blattmann", "Lorenz", "Esser", "Ommer"], url: "https://arxiv.org/abs/2112.10752" },
      },
    },

    // ─────────────────────────────────────────
    // 批次 5 扩充 — 技术 (technique)
    // ─────────────────────────────────────────
    {
      id: "denoising",
      label: "Denoising",
      type: "technique",
      details: {
        zh_label: "去噪过程",
        summary: "扩散模型推理阶段的核心操作：从纯高斯噪声出发，模型每一步预测并去除当前噪声，经过 T 步迭代逐步还原出清晰的图像或视频。",
        analogy: "像员工接手一份被人涂满乱码、几乎面目全非的草稿：他不是直接重写，而是一轮一轮地「洗」——先把最明显的乱码擦掉、再纠正笔迹、再填补内容，几十轮下来，草稿就越来越清晰，最终变成一份完整成品。",
        notes: "训练目标：在每个噪声级别 t 上，模型学习预测「这一步该去掉什么样的噪声」。推理时无需真实数据，只需从标准高斯分布采样后反复调用模型。常用采样算法：DDPM（1000 步）、DDIM（50 步，可确定性采样）、DPM-Solver（20 步以内）。步数越少速度越快，但质量略降；步数越多质量越高，但耗时增加。",
        key_concepts: ["T 步迭代", "噪声预测", "DDPM/DDIM", "采样算法"],
        source: { type: "conversation" },
      },
    },
    {
      id: "video_vae",
      label: "Video VAE",
      type: "technique",
      details: {
        zh_label: "视频变分自编码器",
        summary: "把视频的时间和空间两个维度同步压缩进低维潜空间的变分自编码器，是视频生成系统的「时空压缩引擎」，让扩散模型在高效的潜空间内操作完整视频序列。",
        analogy: "像档案员把一部记录完整的长篇录像（高分辨率多帧视频）同时从两个维度浓缩：既把每帧的画面细节压成摘要（空间压缩），也把「时间线上发生了什么」一并归纳进去（时序压缩）。后续所有改稿、审阅都在这份「双重摘要」上进行，最后档案员再把通过审核的摘要还原回完整录像。",
        notes: "与图像 VAE 相比，Video VAE 在编解码时引入了时间维度卷积或时空注意力，以建模帧间的时序连续性。典型压缩比：空间 8×8、时间 4×，即 4 帧压成 1 帧潜向量。是解决 temporal consistency 的关键手段之一：潜空间本身的时序连续性约束了解码后视频的帧间一致。代表实现：Stable Video Diffusion（SVD）VAE、CogVideoX VAE、Wan VAE。",
        key_concepts: ["时空压缩", "潜空间视频", "帧间连续", "编解码对称"],
        source: { type: "conversation" },
      },
    },
    {
      id: "spatiotemporal_attention",
      label: "Spatiotemporal Attention",
      type: "technique",
      details: {
        zh_label: "时空注意力",
        summary: "在时间和空间两个维度上联合建模注意力，使模型能同时感知单帧内的空间关系与跨帧的运动规律，是保证时间一致性的核心机制。",
        analogy: "像一位专门「查穿帮」的质检员：她不只看每张定格画面里场景布置对不对（空间注意力），还要一边翻页一边盯着同一个演员、同一件道具在不同帧之间有没有对上（时间注意力）。两种眼力同时开着，前后穿帮就逃不掉了。",
        notes: "实现方式主要有两种：① 全时空注意力（Full 3D Attention）：将时间和空间的 token 打平统一计算，建模能力最强但计算成本与序列长度的平方成正比；② 因式分解时空注意力（Factorized Attention）：先在每帧内做空间注意力，再跨帧做时间注意力，显著降低计算量，是大多数实用模型的选择（如 VideoCrafter、CogVideoX）。DiT 架构中时空注意力可直接通过扩展 patch 序列的时间维度来实现。",
        key_concepts: ["3D 注意力", "因式分解", "跨帧建模", "运动感知"],
        source: { type: "conversation" },
      },
    },
    {
      id: "classifier_free_guidance",
      label: "Classifier-Free Guidance",
      type: "technique",
      details: {
        zh_label: "无分类器引导",
        summary: "训练时随机丢弃条件信息让模型同时学习有条件和无条件生成，推理时将两者的差值按引导系数放大，在不依赖额外分类器的前提下精确控制生成内容向文本描述靠拢的程度。",
        analogy: "像员工做方案时同时准备两版：一版是「严格按领导要求来」，一版是「完全自由发挥」。最终交付时，主管不直接选哪一版，而是把两版的差异放大一定倍数叠加进去——调得越猛，成品越贴近需求、越有「领导风格」，但创意空间也越小；调小一点则更有惊喜，但可能跑题。这个「倍数旋钮」就是引导系数（guidance scale）。",
        notes: "公式：ε̃(x, c) = ε(x, ∅) + w · (ε(x, c) − ε(x, ∅))，其中 c 为条件（文本），∅ 为空条件，w 为引导系数。w=1 时退化为有条件生成，w 越大文本贴合度越高但多样性越低，典型取值 7.5。训练时以 10%～20% 概率将条件替换为空，使同一模型能处理两种情况。无需为不同任务训练专属分类器，是 DALL·E 2、Stable Diffusion、Sora 等几乎所有主流生成模型的标配手段。",
        key_concepts: ["引导系数 w", "有/无条件混合", "文本贴合度", "多样性权衡"],
        source: { type: "paper", title: "Classifier-Free Diffusion Guidance", year: 2022, authors: ["Ho", "Salimans"], url: "https://arxiv.org/abs/2207.12598" },
      },
    },
    {
      id: "text_encoder",
      label: "Text Encoder",
      type: "technique",
      details: {
        zh_label: "文本编码器",
        summary: "把用户输入的自然语言描述编码成高维语义向量，通过 Cross-Attention 注入扩散模型每一层，充当视频/图像生成的「文本条件信号」。",
        analogy: "像公司里的需求翻译专员：老板用大白话提需求，她负责把需求翻译成一份标准化的「数字工单」——用机器能精确读懂的格式说清楚要做什么、突出哪些要点、什么不能改。工单质量直接决定后续制作部门能不能做出符合老板意图的成品。",
        notes: "常用模型：CLIP Text Encoder（对比学习预训练，擅长与图像特征空间对齐，但上下文建模较弱）、T5-XXL（纯文本生成式预训练，长文本语义理解强，被 Imagen、Sora 等采用）、CLIP + T5 双编码器融合（同时获得两者优势）。编码后的序列向量通过 Cross-Attention 机制注入 U-Net/DiT 的各层，使去噪方向受文本引导。文本编码质量是制约生成效果上限的关键因素之一。",
        key_concepts: ["CLIP / T5", "语义向量", "Cross-Attention 注入", "条件信号"],
        source: { type: "conversation" },
      },
    },
    {
      id: "spacetime_patch",
      label: "Spacetime Patch",
      type: "technique",
      details: {
        zh_label: "时空 patch",
        summary: "将视频沿空间（高宽）和时间（帧数）两个维度切分成固定大小的三维小块，作为 Transformer 的 token 输入，使同一套架构能统一处理图像和视频。",
        analogy: "像把一段录像的每一帧先切成邮票大小的小格，再把相邻几帧同一位置的小格叠成一个「时间小砖块」，最后把所有小砖块像词典条目一样排成一列，交给大脑逐一读取和理解——视频就这样变成了大脑能处理的「词块序列」。",
        notes: "Sora 的核心设计之一：论文将可变分辨率、可变时长的视频统一表示为时空 patch 序列，使模型无需为不同尺寸单独设计。典型 patch 大小：空间 2×2 像素块、时间 1 帧或多帧。patch 数量直接决定序列长度，进而决定计算量。与 ViT（图像 Transformer）把图像切成空间 patch 的思路一脉相承，只是额外引入了时间维度。",
        key_concepts: ["三维切块", "统一序列化", "可变时长/分辨率", "ViT 扩展"],
        source: { type: "blog", title: "OpenAI Sora Technical Report", url: "https://openai.com/research/video-generation-models-as-world-simulators" },
      },
    },

    // ─────────────────────────────────────────
    // 批次 5 扩充 — 概念 (concept)
    // ─────────────────────────────────────────
    {
      id: "image_to_video",
      label: "Image-to-Video",
      type: "concept",
      details: {
        zh_label: "图生视频",
        summary: "以单张静态图像为起点，生成与图像内容、风格、主体身份连贯一致的动态视频序列，是文生视频的重要衍生形态。",
        analogy: "像员工拿到一张已经定稿的产品效果图，被要求「让这张图动起来」：他必须在完整保留原图中产品外观、品牌色和场景风格的前提下，合理推演出接下来几秒会发生什么动作，交付一段和效果图「血脉相连」的视频成品。",
        notes: "与文生视频的核心区别：图生视频的「锚点」是图像而非文字，模型必须从图像中提取主体的外观、姿态、场景上下文作为第一帧约束，再生成后续帧。常见应用场景：让静态图片中的人物/动物产生自然动作、将概念图动态化、老照片动起来。代表能力：可灵（Kling）、Stable Video Diffusion（SVD）、Runway Gen-3 均支持图生视频模式。难点：维持第一帧与后续帧的主体一致性（即 temporal consistency 的特殊版本）。",
        key_concepts: ["第一帧约束", "主体一致", "静态图动态化", "文生视频衍生"],
        source: { type: "conversation" },
      },
    },
    {
      id: "motion_control",
      label: "Motion Control",
      type: "concept",
      details: {
        zh_label: "运动/镜头控制",
        summary: "通过显式的控制信号（运动轨迹、光流、摄像机参数、关键帧等）精确指定视频中物体运动路径和镜头运动方式，让生成视频从「随机动」变成「按指定方向动」。",
        analogy: "像导演在拍摄前拿着分镜图向数字员工下达精确指令：不只告诉他「拍一个产品展示视频」，还要指定「开头镜头从左下角向右上角缓慢推进，第三秒产品旋转 90 度，最后镜头拉远到全景」。有了这份「运镜说明书」，员工不再自由发挥，而是按既定路径制作，产出和导演脑子里的画面高度一致。",
        notes: "控制方式分两类：① 物体运动控制：通过稀疏轨迹点、关键帧绑定或光流图指定特定物体的运动方向和速度；② 镜头运动控制：通过摄像机外参（平移、旋转、焦距变化等）指定拍摄视角的运动，如推、拉、摇、移、旋转、变焦。代表实现：DragNUWA、CameraCtrl、MotionCtrl，以及可灵的「运镜控制」功能。是视频生成从「生成式」走向「创作工具」的关键能力跃升。",
        key_concepts: ["轨迹控制", "镜头运动", "光流约束", "创作工具化"],
        source: { type: "conversation" },
      },
    },

    // ─────────────────────────────────────────
    // 批次 5 扩充 — 产品 (product)
    // ─────────────────────────────────────────
    {
      id: "stable_diffusion",
      label: "Stable Diffusion",
      type: "product",
      details: {
        zh_label: "Stable Diffusion",
        summary: "Stability AI 基于潜空间扩散模型（Latent Diffusion）推出的开源文生图模型，以高质量、可本地部署、高度可定制著称，是图像生成大规模普及的里程碑产品。",
        analogy: "像图像部门里最早「开放简历」的明星数字员工：不但自己产出质量出众，还把自己的培训方案（模型权重）和工作手册（代码）全部公开，任何团队都能免费招募、基于他的基础再定向培训出专属岗位，是后来各种视频数字员工的「祖师爷」。",
        notes: "发布于 2022 年，基于 Rombach et al. 的 LDM 论文。U-Net 作为去噪骨干，CLIP 作为文本编码器，VAE 实现像素↔潜空间互转。开源生态极为繁荣：社区基于此训练了大量风格 LoRA、ControlNet 插件、InPainting 模型。衍生版本：SDXL（更大分辨率）、SD 3.0（DiT 骨干）。对视频生成的意义：其 VAE 和潜空间扩散框架被 Stable Video Diffusion（SVD）直接沿用，成为视频生成的基础设施。",
        key_concepts: ["开源", "潜空间扩散", "LoRA / ControlNet", "社区生态"],
        source: { type: "blog", title: "Stable Diffusion", url: "https://stability.ai/stable-diffusion" },
      },
    },
    {
      id: "runway",
      label: "Runway Gen-3",
      type: "product",
      details: {
        zh_label: "Runway Gen-3",
        summary: "Runway 推出的商业级文生视频模型（Gen-3 Alpha），面向创意行业，以精准的运镜控制、高度的电影级画质和多模态输入（文本+图像+视频）为核心竞争力。",
        analogy: "像影视制作公司专门引进的高端数字员工：只接高端定制单，给他一句导演台词他就能产出有电影质感的镜头，对构图、光影和运动细节的把握远超普通员工；当然用他的成本也更高，不适合拿来做一般短平快的物料。",
        notes: "Runway 是创意 AI 领域先行者，Gen-1 于 2023 年推出，Gen-3 Alpha 于 2024 年发布。支持 Text-to-Video、Image-to-Video、Video-to-Video 三种模式，最长可生成 10 秒高清视频。特色功能：Motion Brush（手绘运动方向）、Camera Control（精确镜头运动指令）。用户群以专业内容创作者、广告导演、视觉艺术家为主。",
        key_concepts: ["电影级画质", "Camera Control", "专业创作者", "多模态输入"],
        source: { type: "blog", title: "Runway Gen-3 Alpha", url: "https://runwayml.com/research/introducing-gen-3-alpha" },
      },
    },
    {
      id: "pika",
      label: "Pika",
      type: "product",
      details: {
        zh_label: "Pika",
        summary: "Pika Labs 推出的面向消费者的文生视频与图生视频产品，以极低的使用门槛、丰富的动效控制模板和快速出片为亮点，是普通创作者入门视频生成的首选工具之一。",
        analogy: "像一位适合初学者的入门级影视数字员工：上手几乎不需要培训，操作界面像点外卖一样简单，适合普通员工快速出短平快的动效和创意小视频；他虽然达不到高端制作水准，但对于日常宣传物料和社交媒体内容来说已经够用。",
        notes: "Pika 1.0 于 2023 年底发布，主打易用性。核心功能：修改视频中的局部元素（Modify Region）、调整长宽比、控制运动强度（Motion Score）、口型同步（Lip Sync）。Pika 2.0 引入更长时长和更高分辨率支持。主要面向 TikTok、Instagram 等社交媒体内容创作者和设计师，与 Runway 形成高低端互补格局。",
        key_concepts: ["消费者友好", "动效模板", "局部编辑", "社交媒体内容"],
        source: { type: "blog", title: "Pika Labs", url: "https://pika.art/" },
      },
    },
    {
      id: "hailuo",
      label: "Hailuo Video",
      type: "product",
      details: {
        zh_label: "海螺视频",
        summary: "MiniMax 推出的海螺视频（Hailuo Video），国内代表性文生视频产品之一，以人物面部表情、肢体动作的高真实感和中文语义理解见长，在人物演绎类场景下表现突出。",
        analogy: "像国内团队专门培养的「人物演绎专家」数字员工：她特别擅长让视频里的人脸表情自然、肢体动作流畅，比通用型员工在「演好一个角色」这件事上专注得多；加上熟悉中文语境，老板用中文下指令她也能精准理解，不需要再绕道翻译。",
        notes: "由 MiniMax 于 2024 年推出，采用扩散 + Transformer 技术路线，支持文生视频与图生视频。主要优势：人脸渲染与情感表达优于多数竞品，尤其适合数字人、影视角色、广告代言人类场景；在对中文提示词的语义理解上也有本土化优势。海外版本在国际上以「Hailuo AI」品牌运营，与可灵（Kling）同为国内视频生成头部产品。",
        key_concepts: ["人物演绎", "中文语义", "MiniMax", "国产模型"],
        source: { type: "blog", title: "海螺视频 Hailuo Video", url: "https://hailuoai.video/" },
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

    // ═════════════════════════════════════════
    // 批次 7 — Loop Engineering 簇
    // ═════════════════════════════════════════

    // ─── 工程演进链 (technique) ──────────────────
    {
      id: "context_engineering",
      label: "Context Engineering",
      type: "technique",
      details: {
        zh_label: "上下文工程",
        summary: "在提示工程之上的一次跃迁：核心不再是「怎么说」，而是给模型喂入足够、精准、组织良好的上下文信息（资料、记忆、检索结果），让它在充分的背景下作答。",
        analogy: "像交代任务时不只把话说清楚，还顺手把相关的项目文档、历史记录、参考资料一并递到员工手上：他不必凭空猜测背景，手里有料，自然干得更准。",
        notes: "四次工程跃迁的第二阶段（Prompt → Context → Harness → Loop）。核心能力是信息筛选与组织。RAG、长上下文、记忆管理都是上下文工程的具体手段。光把话说漂亮不够，还得给足信息。",
        key_concepts: ["信息筛选", "上下文组织", "喂料", "信息科学"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "harness_engineering",
      label: "Harness Engineering",
      type: "technique",
      details: {
        zh_label: "约束工程",
        summary: "在上下文工程之上再进一步：给 Agent 设定规则、护栏与边界，约束先行，告诉它「你可以自由发挥，但这条线不能越」。",
        analogy: "像给一匹烈马套上马具和缰绳：不是限制它奔跑，而是让它的力量沿着安全可控的方向释放——员工能自主，但公司的红线和规范必须先立好。",
        notes: "四次跃迁的第三阶段，核心能力是系统设计与规则制定。Harness 是约束、是护栏，在 Loop Engineering 中专门负责「不能怎么做」的边界，是防止 Agent 钻验证器空子的关键一环。CLAUDE.md 中的规则约束、各类 Hook 校验都属于此范畴。",
        key_concepts: ["约束先行", "护栏", "规则制定", "控制论"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "loop_engineering",
      label: "Loop Engineering",
      type: "technique",
      details: {
        zh_label: "循环工程",
        summary: "四次工程跃迁的最新阶段：不再为单次任务手写提示词，而是设计能自动驱动 Agent 的循环——定好目标与验证条件，让整个系统自己跑起来，无需人类一轮轮在场操控。",
        analogy: "像把「老板盯着员工一句句改方案」的手工作坊，升级成一条全自动工业流水线：你只需定义目标、验收标准和失败处理，剩下的交给系统——晚上睡觉，醒来代码已改好、测试已通过、PR 已提交。",
        notes: "由 OpenClaw 的 Peter、Claude Code 的 Boris 等人推动，Addy Osmani 正式梳理成概念。核心能力是目标定义与管理（管理学）。与任务制 Agent 的本质区别在于自治：人从「驱动循环的发动机」退位为「设计循环机制的管理者」。/loop、cron、Hook、GitHub Actions 都是其驱动方式。",
        key_concepts: ["自动循环", "目标驱动", "无人值守", "管理学"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },

    // ─── Loop 五大组件 ───────────────────────────
    {
      id: "loop_trigger",
      label: "Loop Trigger",
      type: "technique",
      details: {
        zh_label: "定时任务/触发器",
        summary: "Loop 的「心跳」：能自动启动循环的机制，可以是定时执行、也可以是事件触发，让 Agent 无需人类手动「踢一脚」就持续运转。",
        analogy: "像给流水线装上自动开机的总闸和传感器：到点自动启动，或一有新订单（事件）就自动开工，不用工头每天早上手动去合闸。",
        notes: "常见形式：/loop 命令按间隔自动执行、cron 定时调度、Hook 在 Agent 生命周期特定节点自动触发（如每次改完文件自动跑 lint）、GitHub Actions 关上电脑也在跑。没有触发器的 Agent 每次都得人工启动，那就不是 loop，仍是人在操控。",
        key_concepts: ["心跳", "cron", "Hook", "事件触发"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "worktree_isolation",
      label: "Worktree Isolation",
      type: "technique",
      details: {
        zh_label: "工作树隔离",
        summary: "并行运行多个 Agent 时，给每个 Agent 一个独立的工作空间，各干各的互不干扰，完成后再合并，避免多个 Agent 同时改同一文件的冲突。",
        analogy: "像几位设计师各自复制一份图层分头改，改完再统一合稿：而不是所有人挤在同一个图层上互相覆盖、谁也不打招呼，那样必然一团乱。",
        notes: "源自 Git Worktree。是大规模并行 Agent（Boris 提到睡觉时有几千个 Agent 同时工作）的工程前提：隔离保证并发安全，合并阶段再处理整合。",
        key_concepts: ["独立工作空间", "并发隔离", "Git Worktree", "无冲突合并"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "knowledge_management",
      label: "Knowledge Management",
      type: "concept",
      details: {
        zh_label: "项目知识体系",
        summary: "一整套沉淀、优化、审查项目知识（规范、架构、踩过的坑）的方法体系，让 Agent 每次启动就已经知道你的项目，而非每开新对话都从零开始。",
        analogy: "像给数字员工建一套随时可查的公司知识库 + 入职手册：新来的（或失忆的）员工一上岗就能读到最新的规范和经验，而不是每天早上对着过期文档瞎干。",
        notes: "单个 skill 不够，必须是体系化管理：CLAUDE.md 承载全局规则与约束、跨会话记忆记录悬而未决事项与文档路由、docs 体系沉淀完整知识。因 CLAUDE.md 和记忆有大小限制，需定期梳理审查（如「洁癖.skill」），剔除过期信息。在无人值守的 loop 中尤为关键：脏知识会让 Agent 基于错误前提决策，干得越快错得越多。",
        key_concepts: ["CLAUDE.md", "跨会话记忆", "docs 体系", "知识审查"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "mcp",
      label: "MCP",
      type: "framework",
      details: {
        zh_label: "模型上下文协议",
        summary: "连接器协议：把 Agent 接到 GitHub、Linear、Slack、数据库等真实工作环境的标准化通道，让它从「只能看文件系统」升级为「能在真实工作流里干活」。",
        analogy: "像给数字员工开通各个业务系统的账号和权限：光会读本地文件干不了多少事，接上公司的代码仓库、项目管理、沟通工具后，他才能真正从发现问题到解决问题到通知人类一条龙地闭环干活。",
        notes: "MCP = Model Context Protocol（Anthropic 提出）。是 Loop 五大组件中的「连接器」，本质上是工具调用（Tool Use / Function Calling）的标准化扩展：用统一协议描述外部工具/数据源，使 Agent 能即插即用地接入各类服务，是构成真正闭环的能力底座。",
        key_concepts: ["连接器", "标准化协议", "真实环境接入", "闭环"],
        source: { type: "doc", title: "Model Context Protocol", url: "https://modelcontextprotocol.io/" },
      },
    },
    {
      id: "verifier_agent",
      label: "Verifier Agent",
      type: "concept",
      details: {
        zh_label: "验证子 Agent",
        summary: "专门检查另一个 Agent 输出的独立 Agent：做事的和检查的必须分开，写代码的 Agent 不能自己给自己打分，否则一定会对自己太宽容。",
        analogy: "像学生不能自己批自己的考卷：必须有另一位老师（甚至换一个更挑剔的）来阅卷，一个负责做、一个负责验，结果才可信。",
        notes: "Loop 五大组件之一。实践中常用不同的模型来做验证器，以减少同源偏见。是「反馈及时」这一管理原则在 loop 中的落地：每一轮都有独立检查器告诉做事的 Agent 对不对、哪里要改。",
        key_concepts: ["做检分离", "独立验证", "异源模型", "反馈机制"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },

    // ─── 灵魂与陷阱 (concept) ─────────────────────
    {
      id: "goal_definition",
      label: "Goal Definition",
      type: "concept",
      details: {
        zh_label: "目标定义",
        summary: "Loop Engineering 的灵魂：把一个模糊的意图翻译成一组可衡量、可验证的完成条件——这才是核心竞争力，本质上是管理能力而非工程能力。",
        analogy: "像给员工下任务的两种说法：「把这个功能做好」会让他一脸懵逼（你脑中的「好」和他的不是一回事）；而「接口响应降到 200ms 以下、错误率 0.1% 以内、下周三上线」给了可验证标准，产出偏差就小得多。对 AI 更是如此，因为 Agent 不会主动找你确认，只会自信地按自己的理解执行。",
        notes: "对比示例：目标 A「把应用优化一下」会让 Agent 无法判断何时算完成，要么早停要么改到面目全非；目标 B「test/auth 全部测试通过、tsc --noEmit 零报错、npm run lint 零违规」清清楚楚。与管理学一脉相承：Drucker 的目标管理、Grove 的 OKR，核心都是「把模糊意图翻译成可验证条件」。好目标的三要素 = 目标清晰 + 资源充足（Skill/连接器/权限）+ 反馈及时（验证器）。",
        key_concepts: ["可验证条件", "可衡量", "OKR/目标管理", "管理能力"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "goodhart_law",
      label: "Goodhart's Law",
      type: "concept",
      details: {
        zh_label: "古德哈特定律",
        summary: "当一个衡量指标变成了目标本身，它就不再是一个好的衡量指标——你考核什么，员工（或 Agent）就只做什么，其他东西可能全部退化。",
        analogy: "像公司只考核「代码行数」，员工就拼命灌水写废话代码，真正的质量反而没人管了：指标一旦变成目标，就被人想方设法地满足，却背离了你真正想要的东西。",
        notes: "管理学与经济学中的经典陷阱。在 AI Agent 身上被放大百倍，因为 Agent 比人更擅长钻规则空子、且毫无心理负担。这正是为什么好的目标定义不能只有「做完了」的标准，还必须配上「不能怎么做」的边界（Harness）。",
        key_concepts: ["指标异化", "钻空子", "目标背离", "需边界约束"],
        source: { type: "conversation" },
      },
    },
    {
      id: "reward_hacking",
      label: "Reward Hacking",
      type: "concept",
      details: {
        zh_label: "验证器钻空子",
        summary: "Agent 针对验证条件本身做优化，而非针对你真正的目标做优化：满足了字面验证，却背离了真实意图。",
        analogy: "像 loop 条件是「让所有测试通过」，Agent 干脆把失败的测试直接删了——从验证条件看测试确实全过了，从你真正想要的结果看，它啥也没干。",
        notes: "古德哈特定律在 AI Agent 上的具体表现，是 Loop Engineering 里最阴险的陷阱。根治之道：① 用 Harness 设定「不能怎么做」的边界；② 用独立验证子 Agent 交叉检查；③ 目标定义同时包含完成标准与边界条件，并准备失败降级方案。",
        key_concepts: ["针对验证器优化", "删测试式作弊", "背离真实目标", "需护栏"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },
    {
      id: "goal_command",
      label: "/goal Command",
      type: "technique",
      details: {
        zh_label: "目标命令",
        summary: "Claude Code 的 /goal（Codex 中叫「追求目标」）：给定一个完成条件，Agent 就一轮轮自己干，每轮结束检查条件是否满足，是 Loop Engineering 骨架最直接的微观产品化体现。",
        analogy: "像给员工一句「干到这三个指标全达标为止」，然后他自己反复迭代、每轮自检，达标才收工：你不用全程盯着，只需把验收线划清楚。",
        notes: "用法看似直接（给完成条件，自己干到满足为止），但好不好用完全取决于目标定义的质量——同一工具、同一模型，模糊目标会让它早停或失控，精准目标则清清楚楚。是 goal_definition 在工具层的落地接口。",
        key_concepts: ["完成条件", "自动迭代", "每轮自检", "微观产品化"],
        source: { type: "blog", title: "Prompt 该退环境了，未来属于 Loop Engineering" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 8 — LLM 训练与对齐补充
    // ═════════════════════════════════════════
    {
      id: "instruction_tuning",
      label: "Instruction Tuning",
      type: "technique",
      details: {
        zh_label: "指令微调",
        summary: "用大量「指令-回答」配对数据微调预训练模型，让它学会听懂并遵循人类指令，而非只会按概率续写文本。",
        analogy: "像把一个博览群书、却只会自顾自背书的实习生，专门培训成「你交代什么他就做什么」的助理：训练素材全是「任务 + 标准做法」的范例，练多了他就养成了照指令办事的习惯。",
        notes: "属于监督微调（SFT）中的指令式数据形态。代表工作：FLAN、InstructGPT。处于「预训练 → 指令微调 → RLHF 对齐」流水线的中段：预训练给知识，指令微调让模型「听懂话」，RLHF 再按人类偏好精修。",
        key_concepts: ["指令-回答对", "SFT", "FLAN/InstructGPT", "遵循指令"],
        source: { type: "paper", title: "Finetuned Language Models Are Zero-Shot Learners", year: 2021, authors: ["Wei", "Bosma", "Zhao", "Guu", "Yu", "Lester", "Du", "Dai", "Le"], url: "https://arxiv.org/abs/2109.01652" },
      },
    },
    {
      id: "lora",
      label: "LoRA",
      type: "technique",
      details: {
        zh_label: "低秩适配微调",
        summary: "冻结预训练模型的原始权重，只在每层旁路注入一对低秩矩阵来学习任务增量，用不到 1% 的可训练参数实现接近全量微调的效果。",
        analogy: "像不重新培训整个老员工、只给他配一本随身的「岗位便签本」：原有本事原封不动，新业务的要点都记在薄薄一本便签上，换个岗位换本便签即可，省时省力又不动根基。",
        notes: "LoRA = Low-Rank Adaptation。参数高效微调（PEFT）家族的代表：可训练参数常不到全量的 1%，显存与存储大幅下降，且多套 LoRA 可针对不同任务热插拔。衍生：QLoRA（4-bit 量化 + LoRA），让单卡微调大模型成为可能。",
        key_concepts: ["低秩矩阵", "冻结主干", "PEFT", "可热插拔"],
        source: { type: "paper", title: "LoRA: Low-Rank Adaptation of Large Language Models", year: 2021, authors: ["Hu", "Shen", "Wallis", "Allen-Zhu", "Li", "Wang", "Wang", "Chen"], url: "https://arxiv.org/abs/2106.09685" },
      },
    },
    {
      id: "reward_model",
      label: "Reward Model",
      type: "concept",
      details: {
        zh_label: "奖励模型",
        summary: "用人类对模型输出的偏好排序训练出来的打分模型，能给任意回答打一个「人类有多喜欢」的分数，是 RLHF 中强化学习阶段的奖励信号来源。",
        analogy: "像专门请来的一位「品味评委」：他看过大量「人类觉得哪个回答更好」的案例，于是能替人类给徒弟的每份作业打分，徒弟就照着这个分数去调整自己的做法。",
        notes: "通常在预训练模型上加一个标量输出头，用偏好对（chosen / rejected）以排序损失训练。是 RLHF 三步（采集人类偏好 → 训练奖励模型 → PPO 优化）的第二步。DPO 等新方法的核心卖点，正是省去这个显式的奖励模型。",
        key_concepts: ["偏好排序", "标量打分头", "RLHF 第二步", "奖励信号"],
        source: { type: "paper", title: "Training language models to follow instructions with human feedback", year: 2022, authors: ["Ouyang", "Wu", "Jiang", "Almeida", "Wainwright", "Mishkin", "Zhang", "Agarwal", "Slama", "Ray"], url: "https://arxiv.org/abs/2203.02155" },
      },
    },
    {
      id: "dpo",
      label: "DPO",
      type: "technique",
      details: {
        zh_label: "直接偏好优化",
        summary: "跳过 RLHF 中「训练奖励模型 + 强化学习」两步，直接用人类偏好对（更好/更差）做一个分类式损失来优化语言模型，更简单也更稳定。",
        analogy: "像师傅纠偏不再先立一套打分表、再让徒弟反复试错，而是直接把「这版比那版好」的成对案例摆给徒弟，让他一步到位地领会偏好，省掉中间一大圈流程。",
        notes: "DPO = Direct Preference Optimization。论文证明可在不显式训练奖励模型、不做强化学习采样的前提下，优化与 RLHF 等价的目标，工程上更省、更稳，是当前 RLHF 的主流替代之一。相关变体：IPO、KTO。",
        key_concepts: ["偏好对", "免奖励模型", "免强化学习", "RLHF 替代"],
        source: { type: "paper", title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", year: 2023, authors: ["Rafailov", "Sharma", "Mitchell", "Ermon", "Manning", "Finn"], url: "https://arxiv.org/abs/2305.18290" },
      },
    },
    {
      id: "scaling_law",
      label: "Scaling Law",
      type: "concept",
      details: {
        zh_label: "扩展定律",
        summary: "描述模型性能随参数量、数据量、算力增长而以幂律可预测地提升的经验规律，是「把模型做大」这条路线的理论依据。",
        analogy: "像发现「团队规模、资料量、预算」三者一起按比例加大，产出质量就会沿一条可预测的曲线稳步上升：于是公司敢于提前下重注扩张，因为心里清楚投入大致能换回多少回报。",
        notes: "Kaplan et al. 2020 提出 LLM 性能的幂律扩展规律；Chinchilla（Hoffmann et al. 2022）进一步指出在固定算力预算下，参数量与训练数据量应按比例同增（此前的模型普遍「参数过大、数据喂得不够」）。Scaling Law 是大模型军备竞赛和涌现能力讨论的基石。",
        key_concepts: ["幂律", "参数/数据/算力", "Chinchilla 最优", "可预测提升"],
        source: { type: "paper", title: "Scaling Laws for Neural Language Models", year: 2020, authors: ["Kaplan", "McCandlish", "Henighan", "Brown", "Chess", "Child", "Gray", "Radford", "Wu", "Amodei"], url: "https://arxiv.org/abs/2001.08361" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 9 — 经典 ML 算法（领域 3）
    // ═════════════════════════════════════════
    {
      id: "linear_regression",
      label: "Linear Regression",
      type: "technique",
      details: {
        zh_label: "线性回归",
        summary: "用一条直线（高维时是超平面）拟合输入特征与连续输出之间的线性关系，是最基础的监督学习回归算法。",
        analogy: "像老员工凭经验总结「房子每多 10 平米、价格大约涨多少」：在一堆成交记录里画一条最贴合的直线，新房子套进去就能估出价。",
        notes: "通过最小化预测值与真实值的均方误差（最小二乘法）求解权重，可用正规方程闭式解或梯度下降迭代求解。它是理解更复杂模型的基石——逻辑回归、神经网络中的单个神经元都可看作它的延伸。",
        key_concepts: ["最小二乘", "均方误差", "线性假设", "连续输出"],
        source: { type: "conversation" },
      },
    },
    {
      id: "logistic_regression",
      label: "Logistic Regression",
      type: "technique",
      details: {
        zh_label: "逻辑回归",
        summary: "在线性回归的基础上套一个 Sigmoid 函数，把输出压缩到 0–1 之间当作概率，用于二分类的监督学习算法。",
        analogy: "像审批员先按各项指标算一个综合分，再用一道「分数→通过概率」的 S 形曲线，把分数换算成「这单批准的可能性有多大」。",
        notes: "名为「回归」实为分类算法，用交叉熵损失训练。它是神经网络输出层（Sigmoid/Softmax）的前身：单个带 Sigmoid 的神经元本质就是逻辑回归，其多分类推广即 Softmax 回归。",
        key_concepts: ["Sigmoid", "交叉熵", "二分类", "概率输出"],
        source: { type: "conversation" },
      },
    },
    {
      id: "decision_tree",
      label: "Decision Tree",
      type: "technique",
      details: {
        zh_label: "决策树",
        summary: "通过一连串「是/否」判断把数据层层切分，最终落到叶子节点给出预测的树形模型，可用于分类与回归。",
        analogy: "像医生问诊：先问「发烧吗」，再问「咳嗽吗」，沿着一路分叉的问题问下去，最后给出诊断结论。",
        notes: "用信息增益（ID3）、增益率（C4.5）或基尼不纯度（CART）挑选每一步的最优切分特征。优点是可解释性极强，缺点是容易过拟合，常用剪枝控制复杂度。它是随机森林、梯度提升等集成方法的基学习器。",
        key_concepts: ["信息增益", "基尼不纯度", "剪枝", "可解释性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "svm",
      label: "Support Vector Machine",
      type: "technique",
      details: {
        zh_label: "支持向量机",
        summary: "在特征空间中寻找一个「间隔最大」的超平面来分隔不同类别的监督学习算法，配合核技巧还能处理非线性可分问题。",
        analogy: "像在两群人之间划一条最公平的分界线：不是随手一画，而是让线离两边最靠近的人都尽量远，留出最宽的「缓冲带」。",
        notes: "最大化间隔的超平面只由少数贴边的「支持向量」决定；核技巧（如 RBF 核）把数据隐式映射到高维空间，实现非线性分类。深度学习兴起前，SVM 是文本分类、图像识别的主力算法之一。",
        key_concepts: ["最大间隔", "支持向量", "核技巧", "超平面"],
        source: { type: "conversation" },
      },
    },
    {
      id: "kmeans",
      label: "K-Means",
      type: "technique",
      details: {
        zh_label: "K-Means 聚类",
        summary: "把数据自动划分成 K 个簇的无监督算法，反复执行「把样本分配到最近中心 → 重新计算中心」直到收敛。",
        analogy: "像在没有名册的会场把人分成 K 桌：先随便定 K 个桌位，让每人坐到最近的桌，再把桌子挪到各组人的中心，来回几轮大家就稳定坐定。",
        notes: "需预先指定簇数 K（常用肘部法则、轮廓系数辅助选择），对初始中心敏感，K-Means++ 改进了初始化策略。它是无监督学习中最经典、最常用的聚类算法。",
        key_concepts: ["簇中心", "迭代收敛", "K 值选择", "无监督聚类"],
        source: { type: "conversation" },
      },
    },
    {
      id: "pca",
      label: "PCA",
      type: "technique",
      details: {
        zh_label: "主成分分析",
        summary: "通过线性变换把高维数据投影到方差最大的少数几个方向上，在尽量保留信息的前提下实现降维的无监督方法。",
        analogy: "像给一个立体物件找最能体现轮廓的拍照角度：用最少的几张照片（主成分）就抓住它的主要形状，把冗余视角全丢掉。",
        notes: "PCA = Principal Component Analysis。数学上是对协方差矩阵做特征分解（或对数据做 SVD），取最大特征值对应的方向作为主成分。常用于数据压缩、可视化与去噪；与自编码器的「非线性降维」相对，PCA 是线性降维的代表。",
        key_concepts: ["方差最大化", "特征分解/SVD", "降维", "主成分"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 10 — 生成式补充（领域 12）+ autoencoder（领域 4）
    // ═════════════════════════════════════════
    {
      id: "autoencoder",
      label: "Autoencoder",
      type: "architecture",
      details: {
        zh_label: "自编码器",
        summary: "由编码器压缩、解码器重建组成的神经网络，通过「让输出尽量还原输入」来无监督地学习数据的紧凑表示。",
        analogy: "像让员工先把一份长报告浓缩成几句摘要，再仅凭摘要还原出原文——逼他只抓最关键的信息、丢掉所有冗余。",
        notes: "中间的瓶颈层（latent code）就是学到的低维表示，用重建误差训练、无需标签。变体众多：去噪自编码器、稀疏自编码器；VAE 则把瓶颈层换成概率分布。与 PCA 的线性降维相对，自编码器是非线性降维的代表。",
        key_concepts: ["编码器-解码器", "瓶颈层", "重建误差", "非线性降维"],
        source: { type: "paper", title: "Reducing the Dimensionality of Data with Neural Networks", year: 2006, authors: ["Hinton", "Salakhutdinov"], url: "https://www.science.org/doi/10.1126/science.1127647" },
      },
    },
    {
      id: "gan",
      label: "GAN",
      type: "architecture",
      details: {
        zh_label: "生成对抗网络",
        summary: "让「生成器」和「判别器」两个网络相互对抗训练的生成模型：生成器负责造假、判别器负责辨真假，在博弈中生成器越来越能以假乱真。",
        analogy: "像造假币的和验钞师互相较劲：造假的不断改进让钞票更逼真，验钞师不断提升辨别力，两边水涨船高，最后假币几可乱真。",
        notes: "GAN = Generative Adversarial Network。生成器与判别器交替优化，理论目标是纳什均衡；训练不稳定、易「模式崩溃」是经典难题。在扩散模型崛起之前，GAN 长期是图像生成的主流路线。",
        key_concepts: ["生成器/判别器", "对抗博弈", "纳什均衡", "模式崩溃"],
        source: { type: "paper", title: "Generative Adversarial Networks", year: 2014, authors: ["Goodfellow", "Pouget-Abadie", "Mirza", "Xu", "Warde-Farley", "Ozair", "Courville", "Bengio"], url: "https://arxiv.org/abs/1406.2661" },
      },
    },
    {
      id: "vae",
      label: "VAE",
      type: "architecture",
      details: {
        zh_label: "变分自编码器",
        summary: "把自编码器的瓶颈层换成「概率分布」的生成模型：编码器输出均值与方差，从中采样再解码，从而能生成全新样本。",
        analogy: "像让员工不只记住每份报告的「一个摘要点」，而是记住「摘要的取值范围」；要新文章时就在这个范围里随机取一点再展开，于是能写出没见过却合理的新版本。",
        notes: "VAE = Variational Autoencoder。用「重建损失 + KL 散度」训练，KL 项把潜空间约束成接近标准正态分布，使采样可控；重参数化技巧让采样过程可反向传播。它是潜空间扩散（latent diffusion）中编码器思想的来源。",
        key_concepts: ["潜空间分布", "KL 散度", "重参数化", "可采样生成"],
        source: { type: "paper", title: "Auto-Encoding Variational Bayes", year: 2013, authors: ["Kingma", "Welling"], url: "https://arxiv.org/abs/1312.6114" },
      },
    },
    {
      id: "clip",
      label: "CLIP",
      type: "architecture",
      details: {
        zh_label: "图文对比预训练",
        summary: "用图像编码器和文本编码器把图、文映射到同一向量空间，通过对比学习让「配对的图文」靠近、「不配对的」远离的多模态模型。",
        analogy: "像训练一个双语对照员：左手一摞图、右手一摞配文，反复练「哪张图配哪句话」，最后他能把任意图和任意文都摆到同一张「意义地图」上比远近。",
        notes: "CLIP = Contrastive Language-Image Pre-training。在约 4 亿图文对上用对比损失训练，赋予强大的零样本分类能力；其文本编码器被 Stable Diffusion 等文生图模型用作条件输入。",
        key_concepts: ["双编码器", "对比学习", "图文对齐", "零样本"],
        source: { type: "paper", title: "Learning Transferable Visual Models From Natural Language Supervision", year: 2021, authors: ["Radford", "Kim", "Hallacy", "Ramesh", "Goh", "Agarwal", "Sastry", "Askell", "Mishkin", "Clark"], url: "https://arxiv.org/abs/2103.00020" },
      },
    },
    {
      id: "text_to_image",
      label: "Text-to-Image",
      type: "concept",
      details: {
        zh_label: "文生图",
        summary: "输入一段文字描述、输出与之匹配图像的生成任务，是「文生图」类应用（如 Stable Diffusion、DALL·E）的核心能力。",
        analogy: "像跟一位画师口述「画一只戴礼帽的橘猫坐在月球上」，他就照着你的话，从一张空白画布画出对应的画面。",
        notes: "当前主流实现是「文本编码器（如 CLIP）提供条件 + 扩散模型逐步去噪生成」；早期也有基于 GAN 的方案。它是文生视频（text_to_video）的静态版前身。",
        key_concepts: ["文本条件生成", "扩散模型", "文本编码器", "图像合成"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 11 — LLM 概念与推理（领域 8）
    // ═════════════════════════════════════════
    {
      id: "in_context_learning",
      label: "In-Context Learning",
      type: "concept",
      details: {
        zh_label: "上下文学习",
        summary: "大语言模型无需更新任何参数，仅凭在提示中给出的几个示例，就能即时学会并完成新任务的能力。",
        analogy: "像给一位老员工临时看几个范例：「喏，这类邮件照这样回」，他当场照着范例的套路就把后面的邮件都处理了，根本不用回炉再培训。",
        notes: "In-Context Learning（ICL）由 GPT-3 论文系统提出，是少样本/零样本提示能力的根源。它区别于微调：参数完全冻结，「学习」只发生在单次前向推理的上下文里，提示一变能力就变。",
        key_concepts: ["免参数更新", "示例即学习", "前向推理内", "涌现能力"],
        source: { type: "paper", title: "Language Models are Few-Shot Learners", year: 2020, authors: ["Brown", "Mann", "Ryder", "Subbiah", "Kaplan", "Dhariwal", "Neelakantan", "Shyam", "Sastry", "Askell"], url: "https://arxiv.org/abs/2005.14165" },
      },
    },
    {
      id: "temperature_sampling",
      label: "Temperature & Sampling",
      type: "technique",
      details: {
        zh_label: "温度与采样",
        summary: "控制大模型生成随机性的解码策略：温度调节概率分布的「陡峭/平缓」，Top-k / Top-p 则限定候选词的范围。",
        analogy: "像调节员工的「发挥尺度」：温度调低他只挑最稳的标准答案，调高他就敢天马行空；Top-k/Top-p 则相当于规定「只在最靠谱的前几个选项里挑」，防止彻底跑题。",
        notes: "温度 T 缩放 logits 后再过 softmax：T→0 趋近贪心（最确定），T 越大输出越随机。Top-k 只保留概率最高的 k 个词；Top-p（核采样）保留累积概率达 p 的最小词集。三者常配合使用，平衡生成的连贯性与多样性。",
        key_concepts: ["温度缩放", "Top-k", "Top-p（核采样）", "随机性控制"],
        source: { type: "paper", title: "The Curious Case of Neural Text Degeneration", year: 2019, authors: ["Holtzman", "Buys", "Du", "Forbes", "Choi"], url: "https://arxiv.org/abs/1904.09751" },
      },
    },
    {
      id: "multimodal_llm",
      label: "Multimodal LLM",
      type: "concept",
      details: {
        zh_label: "多模态大模型",
        summary: "能同时理解和处理文本、图像、音频、视频等多种模态信息的大模型，把不同模态编码到统一表示空间里联合推理。",
        analogy: "像一个既能读文件、又能看图、还能听录音的全能助理：你发一张图配一句问话，他能把图看懂、把话听懂，再综合给出回答。",
        notes: "典型做法是用各模态的编码器（如视觉用 ViT/CLIP）把非文本输入转成 token，对齐后送入 LLM 联合处理。代表：GPT-4V、Gemini、Claude 3、LLaVA。它是从纯文本 LLM 走向通用智能体的关键一步。",
        key_concepts: ["多模态对齐", "统一表示空间", "视觉编码器", "联合推理"],
        source: { type: "paper", title: "Flamingo: a Visual Language Model for Few-Shot Learning", year: 2022, authors: ["Alayrac", "Donahue", "Luc", "Miech", "Barr", "Hasson", "Lenc", "Mensch", "Millican", "Reynolds"], url: "https://arxiv.org/abs/2204.14198" },
      },
    },

    // ═════════════════════════════════════════
    // 批次 12 — 经典深度网络剩余（领域 4）
    // ═════════════════════════════════════════
    {
      id: "resnet",
      label: "ResNet",
      type: "architecture",
      details: {
        zh_label: "残差网络",
        summary: "通过「跳跃连接」让信号绕过若干层直接相加，从而能稳定训练上百层深网络的卷积网络架构。",
        analogy: "像在多层审批流程里开一条「直通车道」：原始材料可以跳过中间几道环节直接送到后面，万一中间环节没增益，至少也不会把原始信息搞丢。",
        notes: "ResNet 的残差块学习的是「相对于输入的残差 F(x)」，输出为 F(x)+x；跳跃连接缓解了梯度消失，让 152 层网络成为可能，并夺得 2015 年 ImageNet 冠军。残差连接思想后来被 Transformer 全盘沿用。",
        key_concepts: ["残差块", "跳跃连接", "恒等映射", "缓解梯度消失"],
        source: { type: "paper", title: "Deep Residual Learning for Image Recognition", year: 2015, authors: ["He", "Zhang", "Ren", "Sun"], url: "https://arxiv.org/abs/1512.03385" },
      },
    },
    {
      id: "seq2seq",
      label: "Seq2Seq",
      type: "architecture",
      details: {
        zh_label: "序列到序列",
        summary: "用一个编码器把输入序列压成上下文向量、再用解码器逐步生成输出序列的框架，奠定了机器翻译等序列转换任务的范式。",
        analogy: "像同传译员：先完整听完一句外语、在脑中凝成「意思」，再用母语一个词一个词地复述出来——「听」和「说」是两个分工明确的阶段。",
        notes: "Seq2Seq（Sutskever 2014）通常以 RNN/LSTM 作编码器与解码器；但把整句压成单一上下文向量是瓶颈，催生了注意力机制（Bahdanau 2014），后者最终演化为 Transformer。它是从 RNN 时代通往 Transformer 的关键桥梁。",
        key_concepts: ["编码器-解码器", "上下文向量", "注意力前身", "机器翻译"],
        source: { type: "paper", title: "Sequence to Sequence Learning with Neural Networks", year: 2014, authors: ["Sutskever", "Vinyals", "Le"], url: "https://arxiv.org/abs/1409.3215" },
      },
    },
    {
      id: "word_embedding",
      label: "Word Embedding",
      type: "technique",
      details: {
        zh_label: "词向量",
        summary: "把词语映射成稠密向量、让语义相近的词在向量空间里也相互靠近的表示方法，是 NLP 走向深度学习的起点。",
        analogy: "像给每个词发一张「坐标名片」：意思相近的词（如「国王」「女王」）名片上的坐标也挨得近，连「国王 − 男 + 女 ≈ 女王」这种关系都能用坐标加减算出来。",
        notes: "Word2Vec（Mikolov 2013）用 Skip-gram/CBOW 从上下文中学习词向量，GloVe 则基于全局共现统计。区别于 Transformer 的上下文相关嵌入，Word2Vec 是「静态」词向量（一词一向量）。它是现代 embedding 与向量检索思想的源头。",
        key_concepts: ["稠密向量", "语义相似", "Word2Vec/GloVe", "静态嵌入"],
        source: { type: "paper", title: "Efficient Estimation of Word Representations in Vector Space", year: 2013, authors: ["Mikolov", "Chen", "Corrado", "Dean"], url: "https://arxiv.org/abs/1301.3781" },
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
      id: "tokenizer__切分产出__token",
      source: "tokenizer",
      target: "token",
      label: "切分产出",
    },
    {
      id: "context_window__以token计量__token",
      source: "context_window",
      target: "token",
      label: "以…计量",
    },
    {
      id: "llm__训练始于__pretraining",
      source: "llm",
      target: "pretraining",
      label: "训练始于",
    },
    {
      id: "pretraining__再微调__fine_tuning",
      source: "pretraining",
      target: "fine_tuning",
      label: "再微调",
    },
    {
      id: "fine_tuning__再对齐__rlhf",
      source: "fine_tuning",
      target: "rlhf",
      label: "再对齐",
    },
    {
      id: "llm__表现出__emergent_ability",
      source: "llm",
      target: "emergent_ability",
      label: "表现出",
    },
    {
      id: "emergent_ability__典型表现__chain_of_thought",
      source: "emergent_ability",
      target: "chain_of_thought",
      label: "典型表现",
    },
    {
      id: "emergent_ability__典型表现__few_shot",
      source: "emergent_ability",
      target: "few_shot",
      label: "典型表现",
    },

    // ═══ 批次 1.5 — 现代 LLM 内核 ════════════════
    {
      id: "decoder_only__变体自__transformer",
      source: "decoder_only",
      target: "transformer",
      label: "变体自",
    },
    {
      id: "gpt__采用__decoder_only",
      source: "gpt",
      target: "decoder_only",
      label: "采用",
    },
    {
      id: "decoder_only__自回归靠__masked_multi_head_attention",
      source: "decoder_only",
      target: "masked_multi_head_attention",
      label: "自回归靠",
    },
    {
      id: "rope__改进自__positional_encoding",
      source: "rope",
      target: "positional_encoding",
      label: "改进自",
    },
    {
      id: "rope__支撑__context_window",
      source: "rope",
      target: "context_window",
      label: "外推支撑",
    },
    {
      id: "rmsnorm__替代__layer_normalization",
      source: "rmsnorm",
      target: "layer_normalization",
      label: "替代",
    },
    {
      id: "swiglu__改进自__feed_forward_network",
      source: "swiglu",
      target: "feed_forward_network",
      label: "改进自",
    },
    {
      id: "gqa__变体自__multi_head_attention",
      source: "gqa",
      target: "multi_head_attention",
      label: "变体自",
    },
    {
      id: "gqa__压缩__kv_cache",
      source: "gqa",
      target: "kv_cache",
      label: "压缩",
    },
    {
      id: "kv_cache__加速__decoder_only",
      source: "kv_cache",
      target: "decoder_only",
      label: "加速",
    },
    {
      id: "kv_cache__占用增长__context_window",
      source: "kv_cache",
      target: "context_window",
      label: "占用随之增长",
      directed: false,
    },
    {
      id: "flash_attention__优化__scaled_dot_product_attention",
      source: "flash_attention",
      target: "scaled_dot_product_attention",
      label: "优化",
    },
    {
      id: "moe__替代__feed_forward_network",
      source: "moe",
      target: "feed_forward_network",
      label: "替代",
    },
    {
      id: "moe__增强__llm",
      source: "moe",
      target: "llm",
      label: "扩展规模",
    },
    {
      id: "moe__代表实现__gpt",
      source: "moe",
      target: "gpt",
      label: "传闻采用",
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
    {
      id: "agent_memory__短期记忆依托__context_window",
      source: "agent_memory",
      target: "context_window",
      label: "短期记忆依托",
    },
    {
      id: "agent_memory__长期记忆存储于__vector_database",
      source: "agent_memory",
      target: "vector_database",
      label: "长期记忆存储于",
    },
    {
      id: "planning__运用__chain_of_thought",
      source: "planning",
      target: "chain_of_thought",
      label: "运用",
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
    {
      id: "rag__突破限制__context_window",
      source: "rag",
      target: "context_window",
      label: "突破限制",
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
    // ─── 批次 5 扩充 — DiT / 潜空间扩散 ───────────
    {
      id: "transformer__被借鉴于__dit",
      source: "transformer",
      target: "dit",
      label: "被借鉴于",
    },
    {
      id: "diffusion_model__改进为__dit",
      source: "diffusion_model",
      target: "dit",
      label: "改进为",
    },
    {
      id: "sora__采用__dit",
      source: "sora",
      target: "dit",
      label: "采用",
    },
    {
      id: "diffusion_model__优化为__latent_diffusion",
      source: "diffusion_model",
      target: "latent_diffusion",
      label: "优化为",
    },
    {
      id: "latent_diffusion__依赖__video_vae",
      source: "latent_diffusion",
      target: "video_vae",
      label: "依赖",
    },
    {
      id: "diffusion_model__核心步骤__denoising",
      source: "diffusion_model",
      target: "denoising",
      label: "核心步骤",
    },

    // ─── 批次 5 扩充 — 文本条件链 ──────────────────
    {
      id: "text_to_video__依赖__text_encoder",
      source: "text_to_video",
      target: "text_encoder",
      label: "依赖",
    },
    {
      id: "text_encoder__同属文本向量化__embedding",
      source: "text_encoder",
      target: "embedding",
      label: "同属文本向量化",
      directed: false,
    },
    {
      id: "text_to_video__使用__classifier_free_guidance",
      source: "text_to_video",
      target: "classifier_free_guidance",
      label: "使用",
    },

    // ─── 批次 5 扩充 — Sora 时空 patch ────────────
    {
      id: "sora__使用__spacetime_patch",
      source: "sora",
      target: "spacetime_patch",
      label: "使用",
    },
    {
      id: "spacetime_patch__类比__token",
      source: "spacetime_patch",
      target: "token",
      label: "类比",
    },

    // ─── 批次 5 扩充 — 时间一致性解决方案 ──────────
    {
      id: "temporal_consistency__解决方案__spatiotemporal_attention",
      source: "temporal_consistency",
      target: "spatiotemporal_attention",
      label: "解决方案",
    },
    {
      id: "temporal_consistency__解决方案__video_vae",
      source: "temporal_consistency",
      target: "video_vae",
      label: "解决方案",
    },

    // ─── 批次 5 扩充 — 衍生形态与代表产品 ──────────
    {
      id: "text_to_video__衍生形态__image_to_video",
      source: "text_to_video",
      target: "image_to_video",
      label: "衍生形态",
    },
    {
      id: "text_to_video__依赖__motion_control",
      source: "text_to_video",
      target: "motion_control",
      label: "依赖",
    },
    {
      id: "diffusion_model__代表产品__stable_diffusion",
      source: "diffusion_model",
      target: "stable_diffusion",
      label: "代表产品",
    },
    {
      id: "latent_diffusion__代表产品__stable_diffusion",
      source: "latent_diffusion",
      target: "stable_diffusion",
      label: "代表产品",
    },
    {
      id: "text_to_video__代表产品__runway",
      source: "text_to_video",
      target: "runway",
      label: "代表产品",
    },
    {
      id: "text_to_video__代表产品__pika",
      source: "text_to_video",
      target: "pika",
      label: "代表产品",
    },
    {
      id: "text_to_video__代表产品__hailuo",
      source: "text_to_video",
      target: "hailuo",
      label: "代表产品",
    },
    {
      id: "image_to_video__代表产品__runway",
      source: "image_to_video",
      target: "runway",
      label: "代表产品",
    },
    {
      id: "image_to_video__代表产品__kling",
      source: "image_to_video",
      target: "kling",
      label: "代表产品",
    },
    {
      id: "motion_control__应用于__runway",
      source: "motion_control",
      target: "runway",
      label: "应用于",
    },
    {
      id: "motion_control__应用于__kling",
      source: "motion_control",
      target: "kling",
      label: "应用于",
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

    // ═══ 批次 0 — 机器学习地基内部骨架 ══════════
    {
      id: "machine_learning__深化为__deep_learning",
      source: "machine_learning",
      target: "deep_learning",
      label: "深化为",
    },
    {
      id: "machine_learning__包含__supervised_learning",
      source: "machine_learning",
      target: "supervised_learning",
      label: "包含",
    },
    {
      id: "machine_learning__包含__unsupervised_learning",
      source: "machine_learning",
      target: "unsupervised_learning",
      label: "包含",
    },
    {
      id: "machine_learning__包含__reinforcement_learning",
      source: "machine_learning",
      target: "reinforcement_learning",
      label: "包含",
    },
    {
      id: "machine_learning__包含__self_supervised_learning",
      source: "machine_learning",
      target: "self_supervised_learning",
      label: "包含",
    },
    {
      id: "machine_learning__评估依赖__dataset_split",
      source: "machine_learning",
      target: "dataset_split",
      label: "评估依赖",
    },
    {
      id: "deep_learning__核心是__neural_network",
      source: "deep_learning",
      target: "neural_network",
      label: "核心是",
    },
    {
      id: "neural_network__基本单元__neuron",
      source: "neural_network",
      target: "neuron",
      label: "基本单元",
    },
    {
      id: "neural_network__基础形态__mlp",
      source: "neural_network",
      target: "mlp",
      label: "基础形态",
    },
    {
      id: "neural_network__训练靠__backpropagation",
      source: "neural_network",
      target: "backpropagation",
      label: "训练靠",
    },
    {
      id: "backpropagation__依赖__gradient_descent",
      source: "backpropagation",
      target: "gradient_descent",
      label: "依赖",
    },
    {
      id: "gradient_descent__最小化__loss_function",
      source: "gradient_descent",
      target: "loss_function",
      label: "最小化",
    },
    {
      id: "neuron__使用__activation_function",
      source: "neuron",
      target: "activation_function",
      label: "使用",
    },
    {
      id: "mlp__使用__activation_function",
      source: "mlp",
      target: "activation_function",
      label: "使用",
    },
    {
      id: "dataset_split__用于检测__overfitting",
      source: "dataset_split",
      target: "overfitting",
      label: "用于检测",
    },
    {
      id: "overfitting__缓解靠__regularization",
      source: "overfitting",
      target: "regularization",
      label: "缓解靠",
    },

    // ═══ 批次 0.5 — 经典神经网络内部边 ══════════
    {
      id: "deep_learning__演进出__cnn",
      source: "deep_learning",
      target: "cnn",
      label: "演进出",
    },
    {
      id: "deep_learning__演进出__rnn",
      source: "deep_learning",
      target: "rnn",
      label: "演进出",
    },
    {
      id: "rnn__改进为__lstm",
      source: "rnn",
      target: "lstm",
      label: "改进为",
    },

    // ═══ 锚定现有节点的跨批次边 ══════════════════
    {
      id: "rnn__被取代于__transformer",
      source: "rnn",
      target: "transformer",
      label: "被取代于",
    },
    {
      id: "adam_optimizer__改进自__gradient_descent",
      source: "adam_optimizer",
      target: "gradient_descent",
      label: "改进自",
    },
    {
      id: "mlp__对应__feed_forward_network",
      source: "mlp",
      target: "feed_forward_network",
      label: "对应",
      directed: false,
    },
    {
      id: "regularization__具体手段__label_smoothing",
      source: "regularization",
      target: "label_smoothing",
      label: "具体手段",
    },
    {
      id: "self_supervised_learning__形式为__pretraining",
      source: "self_supervised_learning",
      target: "pretraining",
      label: "形式为",
    },
    {
      id: "reinforcement_learning__应用于__rlhf",
      source: "reinforcement_learning",
      target: "rlhf",
      label: "应用于",
    },
    {
      id: "cnn__骨干被借鉴于__diffusion_model",
      source: "cnn",
      target: "diffusion_model",
      label: "U-Net骨干被借鉴于",
    },
    {
      id: "supervised_learning__驱动__fine_tuning",
      source: "supervised_learning",
      target: "fine_tuning",
      label: "驱动",
    },

    // ═══ 批次 7 — Loop Engineering 簇 ════════════
    // ─── 工程演进链 ──────────────────────────────
    {
      id: "prompt_engineering__演进为__context_engineering",
      source: "prompt_engineering",
      target: "context_engineering",
      label: "演进为",
    },
    {
      id: "context_engineering__演进为__harness_engineering",
      source: "context_engineering",
      target: "harness_engineering",
      label: "演进为",
    },
    {
      id: "harness_engineering__演进为__loop_engineering",
      source: "harness_engineering",
      target: "loop_engineering",
      label: "演进为",
    },
    {
      id: "context_engineering__手段包括__rag",
      source: "context_engineering",
      target: "rag",
      label: "手段包括",
    },
    {
      id: "harness_engineering__载体__system_prompt",
      source: "harness_engineering",
      target: "system_prompt",
      label: "载体",
    },

    // ─── Loop 驱动 Agent 与五大组件 ───────────────
    {
      id: "loop_engineering__驱动自治__ai_agent",
      source: "loop_engineering",
      target: "ai_agent",
      label: "驱动自治",
    },
    {
      id: "loop_engineering__组件__loop_trigger",
      source: "loop_engineering",
      target: "loop_trigger",
      label: "组件",
    },
    {
      id: "loop_engineering__组件__worktree_isolation",
      source: "loop_engineering",
      target: "worktree_isolation",
      label: "组件",
    },
    {
      id: "loop_engineering__组件__knowledge_management",
      source: "loop_engineering",
      target: "knowledge_management",
      label: "组件",
    },
    {
      id: "loop_engineering__组件__mcp",
      source: "loop_engineering",
      target: "mcp",
      label: "组件",
    },
    {
      id: "loop_engineering__组件__verifier_agent",
      source: "loop_engineering",
      target: "verifier_agent",
      label: "组件",
    },

    // ─── 五组件锚定现有节点 ──────────────────────
    {
      id: "mcp__扩展__tool_use",
      source: "mcp",
      target: "tool_use",
      label: "扩展",
    },
    {
      id: "mcp__标准化__function_calling",
      source: "mcp",
      target: "function_calling",
      label: "标准化",
    },
    {
      id: "verifier_agent__应用形态__multi_agent",
      source: "verifier_agent",
      target: "multi_agent",
      label: "应用形态",
    },
    {
      id: "worktree_isolation__支撑__multi_agent",
      source: "worktree_isolation",
      target: "multi_agent",
      label: "支撑",
    },
    {
      id: "knowledge_management__沉淀于__agent_memory",
      source: "knowledge_management",
      target: "agent_memory",
      label: "沉淀于",
    },
    {
      id: "knowledge_management__借助__rag",
      source: "knowledge_management",
      target: "rag",
      label: "借助",
    },

    // ─── 灵魂与陷阱 ──────────────────────────────
    {
      id: "loop_engineering__灵魂是__goal_definition",
      source: "loop_engineering",
      target: "goal_definition",
      label: "灵魂是",
    },
    {
      id: "goal_definition__面临陷阱__goodhart_law",
      source: "goal_definition",
      target: "goodhart_law",
      label: "面临陷阱",
    },
    {
      id: "goodhart_law__在Agent上表现为__reward_hacking",
      source: "goodhart_law",
      target: "reward_hacking",
      label: "在 Agent 上表现为",
    },
    {
      id: "harness_engineering__约束__reward_hacking",
      source: "harness_engineering",
      target: "reward_hacking",
      label: "护栏约束",
    },
    {
      id: "verifier_agent__交叉检查__reward_hacking",
      source: "verifier_agent",
      target: "reward_hacking",
      label: "交叉检查防范",
    },
    {
      id: "goal_command__实现__loop_engineering",
      source: "goal_command",
      target: "loop_engineering",
      label: "微观实现",
    },
    {
      id: "goal_command__依赖__goal_definition",
      source: "goal_command",
      target: "goal_definition",
      label: "依赖",
    },

    // ═══ 批次 8 — LLM 训练与对齐补充 ═════════════
    {
      id: "fine_tuning__典型形式__instruction_tuning",
      source: "fine_tuning",
      target: "instruction_tuning",
      label: "典型形式",
    },
    {
      id: "instruction_tuning__对齐前序__rlhf",
      source: "instruction_tuning",
      target: "rlhf",
      label: "对齐前序",
    },
    {
      id: "fine_tuning__参数高效形式__lora",
      source: "fine_tuning",
      target: "lora",
      label: "参数高效形式",
    },
    {
      id: "rlhf__依赖__reward_model",
      source: "rlhf",
      target: "reward_model",
      label: "依赖",
    },
    {
      id: "reward_model__提供奖励给__reinforcement_learning",
      source: "reward_model",
      target: "reinforcement_learning",
      label: "提供奖励给",
    },
    {
      id: "dpo__简化替代__rlhf",
      source: "dpo",
      target: "rlhf",
      label: "简化替代",
    },
    {
      id: "dpo__省去__reward_model",
      source: "dpo",
      target: "reward_model",
      label: "省去",
    },
    {
      id: "scaling_law__指导__pretraining",
      source: "scaling_law",
      target: "pretraining",
      label: "指导规模",
    },
    {
      id: "llm__遵循__scaling_law",
      source: "llm",
      target: "scaling_law",
      label: "遵循",
    },
    {
      id: "scaling_law__催生__emergent_ability",
      source: "scaling_law",
      target: "emergent_ability",
      label: "规模催生",
    },

    // ═══ 批次 9 — 经典 ML 算法（领域 3） ═════════
    {
      id: "supervised_learning__代表算法__linear_regression",
      source: "supervised_learning",
      target: "linear_regression",
      label: "代表算法",
    },
    {
      id: "supervised_learning__代表算法__logistic_regression",
      source: "supervised_learning",
      target: "logistic_regression",
      label: "代表算法",
    },
    {
      id: "supervised_learning__代表算法__decision_tree",
      source: "supervised_learning",
      target: "decision_tree",
      label: "代表算法",
    },
    {
      id: "supervised_learning__代表算法__svm",
      source: "supervised_learning",
      target: "svm",
      label: "代表算法",
    },
    {
      id: "unsupervised_learning__代表算法__kmeans",
      source: "unsupervised_learning",
      target: "kmeans",
      label: "代表算法",
    },
    {
      id: "unsupervised_learning__代表算法__pca",
      source: "unsupervised_learning",
      target: "pca",
      label: "代表算法",
    },
    {
      id: "linear_regression__延伸为__logistic_regression",
      source: "linear_regression",
      target: "logistic_regression",
      label: "加 Sigmoid 延伸为",
    },
    {
      id: "logistic_regression__多分类推广__softmax",
      source: "logistic_regression",
      target: "softmax",
      label: "多分类推广",
    },
    {
      id: "logistic_regression__等价于单个__neuron",
      source: "logistic_regression",
      target: "neuron",
      label: "等价于单个",
    },

    // ═══ 批次 10 — 生成式补充 + autoencoder ══════
    {
      id: "neural_network__经典架构__autoencoder",
      source: "neural_network",
      target: "autoencoder",
      label: "经典架构",
    },
    {
      id: "autoencoder__非线性对应__pca",
      source: "autoencoder",
      target: "pca",
      label: "非线性降维对应",
      directed: false,
    },
    {
      id: "deep_learning__生成式架构__gan",
      source: "deep_learning",
      target: "gan",
      label: "生成式架构",
    },
    {
      id: "gan__生成路线对比__diffusion_model",
      source: "gan",
      target: "diffusion_model",
      label: "生成路线对比",
      directed: false,
    },
    {
      id: "vae__概率化扩展__autoencoder",
      source: "vae",
      target: "autoencoder",
      label: "概率化扩展自",
    },
    {
      id: "vae__编码思想用于__latent_diffusion",
      source: "vae",
      target: "latent_diffusion",
      label: "编码思想用于",
    },
    {
      id: "clip__产出__embedding",
      source: "clip",
      target: "embedding",
      label: "产出图文共享嵌入",
    },
    {
      id: "clip__提供文本条件__text_to_image",
      source: "clip",
      target: "text_to_image",
      label: "提供文本条件",
    },
    {
      id: "text_to_image__主流实现__diffusion_model",
      source: "text_to_image",
      target: "diffusion_model",
      label: "主流实现",
    },
    {
      id: "text_to_image__代表实现__stable_diffusion",
      source: "text_to_image",
      target: "stable_diffusion",
      label: "代表实现",
    },

    // ═══ 批次 11 — LLM 概念与推理 ════════════════
    {
      id: "llm__涌现__in_context_learning",
      source: "llm",
      target: "in_context_learning",
      label: "涌现出",
    },
    {
      id: "in_context_learning__机制支撑__few_shot",
      source: "in_context_learning",
      target: "few_shot",
      label: "机制支撑",
    },
    {
      id: "in_context_learning__属于__emergent_ability",
      source: "in_context_learning",
      target: "emergent_ability",
      label: "典型涌现能力",
    },
    {
      id: "llm__解码策略__temperature_sampling",
      source: "llm",
      target: "temperature_sampling",
      label: "解码策略",
    },
    {
      id: "temperature_sampling__调节__softmax",
      source: "temperature_sampling",
      target: "softmax",
      label: "调节输出分布",
    },
    {
      id: "llm__扩展为__multimodal_llm",
      source: "llm",
      target: "multimodal_llm",
      label: "扩展为",
    },
    {
      id: "multimodal_llm__视觉编码常用__clip",
      source: "multimodal_llm",
      target: "clip",
      label: "视觉编码常用",
    },

    // ═══ 批次 12 — 经典深度网络剩余 ══════════════
    {
      id: "cnn__经典深层架构__resnet",
      source: "cnn",
      target: "resnet",
      label: "经典深层架构",
    },
    {
      id: "residual_connection__思想源自__resnet",
      source: "residual_connection",
      target: "resnet",
      label: "思想源自",
    },
    {
      id: "rnn__典型应用__seq2seq",
      source: "rnn",
      target: "seq2seq",
      label: "典型应用",
    },
    {
      id: "seq2seq__演化为__transformer",
      source: "seq2seq",
      target: "transformer",
      label: "演化为",
    },
    {
      id: "word_embedding__发展为__embedding",
      source: "word_embedding",
      target: "embedding",
      label: "发展为上下文嵌入",
    },
    {
      id: "self_supervised_learning__早期代表__word_embedding",
      source: "self_supervised_learning",
      target: "word_embedding",
      label: "早期代表",
    },
  ],
};

// ============================================================
// AI 图类型 → 色系映射（液态玻璃风格）
//   concept 蓝 / architecture 橙 / technique 紫
//   dataset 绿 / framework 灰 / product 青
// ============================================================
const aiTypeStyles: Record<string, NodeTypeStyle> = {
  concept: {
    base: "#7eaadf",
    glow: "rgba(126, 170, 223, 0.30)",
    label: "概念",
  },
  architecture: {
    base: "#d4824a",
    glow: "rgba(212, 130, 74, 0.30)",
    label: "架构",
  },
  technique: {
    base: "#9b7ec8",
    glow: "rgba(155, 126, 200, 0.30)",
    label: "技术",
  },
  dataset: {
    base: "#5baa8a",
    glow: "rgba(91, 170, 138, 0.30)",
    label: "数据集",
  },
  framework: {
    base: "#9a9488",
    glow: "rgba(154, 148, 136, 0.30)",
    label: "框架",
  },
  product: {
    base: "#4fb0c6",
    glow: "rgba(79, 176, 198, 0.30)",
    label: "产品",
  },
};

const aiTypeOrder: string[] = [
  "architecture",
  "product",
  "concept",
  "technique",
  "dataset",
  "framework",
];

export const aiMap: KnowledgeMap = {
  id: "ai",
  label: "AI 知识图谱",
  subtitle: "可视化 AI 知识网络",
  data: aiGraphData,
  typeStyles: aiTypeStyles,
  typeOrder: aiTypeOrder,
  preferredSeed: "machine_learning",
};
