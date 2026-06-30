import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

const humanoidRobotGraphData: GraphData = {
  nodes: [
    // ── 根节点 ──
    {
      id: "humanoid_robot",
      label: "人形机器人",
      type: "concept",
      details: {
        zh_label: "Humanoid Robot",
        summary: "高度集成的人工智能与机器人学的结晶，形态和行为类人的通用型机器人，旨在适应人类社会物理环境。",
        analogy: "就像智能手机整合了所有通讯和娱乐工具一样，人形机器人是未来物理世界中代替人力的「通用硬件终端」。",
        key_concepts: ["通用人工智能", "具身智能", "仿生学", "全能助手"],
        source: { type: "conversation" },
      },
    },

    // ── 第一层：六大板块 ──
    {
      id: "core_technology",
      label: "核心技术",
      type: "concept",
      details: {
        summary: "赋予人形机器人感知世界、运动控制以及智能思考的底层软件与算法架构体系。",
        key_concepts: ["感知", "控制", "具身大模型", "人机交互"],
        source: { type: "conversation" },
      },
    },
    {
      id: "hardware_component",
      label: "硬件组件",
      type: "concept",
      details: {
        summary: "构成机器人物理躯干的全部硬件实体，直接决定其力量、精度与续航能力。",
        key_concepts: ["执行器", "核心零部件", "传感系统", "计算与能源"],
        source: { type: "conversation" },
      },
    },
    {
      id: "companies_and_products",
      label: "代表企业与产品",
      type: "concept",
      details: {
        summary: "国内外在人形机器人本体制造领域的头部玩家及主打机型，按梯队与地域划分。",
        key_concepts: ["国际第一梯队", "国内新锐", "产业链供应商"],
        source: { type: "conversation" },
      },
    },
    {
      id: "application_scenarios",
      label: "应用场景",
      type: "concept",
      details: {
        summary: "人形机器人在不同行业中实际落地、创造商业价值的具体业务环境。",
        key_concepts: ["工业制造", "特种作业", "商业服务", "家庭服务"],
        source: { type: "conversation" },
      },
    },
    {
      id: "industry_chain",
      label: "产业链",
      type: "concept",
      details: {
        summary: "从上游零部件供应、算法研发，到中游本体制造，再到下游集成的宏观产业生态网络。",
        key_concepts: ["上游", "中游", "下游"],
        source: { type: "conversation" },
      },
    },
    {
      id: "evaluation_commercialization",
      label: "产品评估与商业化",
      type: "concept",
      details: {
        summary: "衡量一款机器人是否具备量产能力及市场竞争力的核心指标与降本增效路径。",
        key_concepts: ["核心指标", "BOM成本", "量产", "商业验证"],
        source: { type: "conversation" },
      },
    },

    // ── 1. 核心技术板块 (Core Technology) ──
    {
      id: "environmental_perception",
      label: "环境感知与视觉",
      type: "technology",
      details: {
        summary: "机器人获取外界物理空间信息的视觉与触觉技术，是实现互动的先决条件。",
        key_concepts: ["空间认知", "多源异构数据"],
        source: { type: "conversation" },
      },
    },
    {
      id: "vision_3d",
      label: "3D视觉",
      type: "technology",
      details: {
        summary: "通过深度相机获取物体三维几何信息的技术，用于障碍物识别与精准抓取定位。",
        key_concepts: ["点云", "深度信息"],
        source: { type: "conversation" },
      },
    },
    {
      id: "multimodal_perception",
      label: "多模态感知",
      type: "technology",
      details: {
        summary: "融合视觉、听觉、力觉等多种传感器数据，形成对环境统一综合理解的算法机制。",
        key_concepts: ["数据融合", "全息感知"],
        source: { type: "conversation" },
      },
    },
    {
      id: "slam",
      label: "同步定位与建图SLAM",
      type: "technology",
      details: {
        zh_label: "Simultaneous Localization and Mapping",
        summary: "机器人在未知环境中同时完成自身定位和地图构建的技术。",
        analogy: "像在陌生的黑屋子里边摸索边画地图。",
        notes: "双腿运动引入的振动给视觉SLAM带来极大挑战。",
        key_concepts: ["V-SLAM", "激光雷达定位"],
        source: { type: "conversation" },
      },
    },
    {
      id: "tactile_feedback_processing",
      label: "触觉反馈处理",
      type: "technology",
      details: {
        summary: "解析灵巧手末端传感器传回的压力和滑动信号，以实现柔性抓取。",
        key_concepts: ["滑移检测", "力控"],
        source: { type: "conversation" },
      },
    },
    {
      id: "motion_control_planning",
      label: "运动控制与规划",
      type: "technology",
      details: {
        summary: "解决机器人动态平衡、步态生成及全身关节协同运作的控制技术体系。",
        key_concepts: ["平衡控制", "动力学"],
        source: { type: "conversation" },
      },
    },
    {
      id: "gait_planning",
      label: "步态规划",
      type: "technology",
      details: {
        summary: "规划机器人落脚点、质心轨迹，确保行走连续性和稳定性的算法。",
        key_concepts: ["ZMP", "倒立摆模型"],
        source: { type: "conversation" },
      },
    },
    {
      id: "wbc",
      label: "全身协同控制",
      type: "technology",
      details: {
        summary: "将机器人多个自由度统一建模，在满足平衡的前提下同时执行多项子任务（如边走边拿水杯）。",
        key_concepts: ["多任务优化", "零空间"],
        source: { type: "conversation" },
      },
    },
    {
      id: "mpc",
      label: "模型预测控制",
      type: "technology",
      details: {
        summary: "基于机器人物理动力学模型，预测未来一小段时间的状态，滚动优化当前控制指令。",
        key_concepts: ["滚动优化", "动力学模型"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rl_control",
      label: "强化学习控制",
      type: "technology",
      details: {
        summary: "机器人在仿真环境中通过「试错+奖励」自主学习运动策略，无需人类示范数据，在高动态运动（跑跳、抗推、复杂地形）上远超传统控制方法。核心范式是 Sim2Real：先在仿真器中训练千万次，再迁移到真机。",
        analogy: "像训练一个从未见过自行车的人学骑车——不给他看示范视频，只告诉他「摔倒扣分、骑稳加分」，让他自己在虚拟世界里摔几百万次，摔出一套完美策略后再上真车。",
        facts: [
          { label: "两大流派", value: "① Model-Free RL（无模型，直接试错，代表：PPO/SAC）② Model-Based RL（先建世界模型再规划，代表：DreamerV3/TD-MPC2）" },
          { label: "主流算法", value: "PPO（近端策略优化）用于离散/连续控制；SAC（软演员-评论家）用于高维连续动作；这两类都属于 Model-Free" },
          { label: "Sim2Real 核心手段", value: "域随机化（Domain Randomization）：随机化仿真中的摩擦系数、质量、延迟等，迫使策略学会鲁棒泛化" },
          { label: "典型训练规模", value: "逐际动力 CL-1：强化学习训练超 2 亿步仿真步数，才获得稳定真机步态" }
        ],
        notes: "Model-Free RL 和 Model-Based RL 的本质区别：Model-Free 直接学「给定状态该干什么」的映射（Policy），不关心世界是怎么运转的；Model-Based 先学一个「世界怎么运转」的内部模型（World Model），再用这个模型在脑子里模拟推演、选最优行动。两者各有胜负：Model-Free 简单稳定但样本效率低；Model-Based 样本高效但建模误差会积累。",
        key_concepts: ["Model-Free RL", "Model-Based RL", "PPO/SAC", "Sim2Real", "域随机化", "策略梯度"],
        source: { type: "paper", title: "Mastering Diverse Domains through World Models (DreamerV3)", url: "https://www.nature.com/articles/s41586-025-08744-2" },
      },
    },
    {
      id: "embodied_ai_models",
      label: "具身智能与大模型",
      type: "technology",
      details: {
        summary: "将大语言模型和视觉模型的推理能力接入机器人物理实体，实现高级语义理解和任务规划。",
        key_concepts: ["大脑与小脑", "端到端"],
        source: { type: "conversation" },
      },
    },
    {
      id: "vla_models",
      label: "视觉-语言-动作模型（VLA）",
      type: "technology",
      details: {
        summary: "Vision-Language-Action Model，在 VLM（视觉-语言）基础上引入 Action（动作）作为第三模态——推理时将视觉图像、语言指令与本体感知状态输入统一 Transformer，直接输出机器人关节的连续动作序列，实现感知-理解-执行的端到端闭环。",
        analogy: "传统机器人是「流水线工厂」：视觉模块拍图 → 感知模块识别 → 规划模块计算 → 控制模块执行，任何一环出错全线崩溃。VLA 是「神经外科医生」：眼睛看到什么、耳朵听到什么、手要怎么动，统统在同一个大脑里同步处理——本质上是把多个模块「合并同类项」。",
        facts: [
          { label: "三模态（模型命名）", value: "Vision（视觉）+ Language（语言）+ Action（动作）；Action 为相对 VLM 新增的第三模态，推理时作为输出，训练时作为监督信号" },
          { label: "典型推理输入", value: "① 视觉（RGB 摄像头帧）② 语言指令（自然语言文本）③ 本体感知（关节角/速度）" },
          { label: "输出形式", value: "连续动作向量（关节角度增量）或离散动作 token，控制频率通常 10–50 Hz" },
          { label: "核心训练范式", value: "① 互联网规模 VLM 预训练 → ② 跨机器人平台混合微调 → ③ 针对特定任务的少样本 Fine-tune" },
          { label: "主流架构方案", value: "① 自回归 token 预测（RT-2, OpenVLA）② Flow Matching 连续动作生成（Pi0, Pi0.7）③ Diffusion Transformer（GR00T N1）" },
          { label: "最大挑战", value: "长程任务规划（multi-step）、OOD 泛化（新场景/新物体）、推理实时性（边缘 GPU 上达到 30Hz+）" }
        ],
        notes: "VLA 的技术谱系：Google RT-1（2022）首次大规模真机训练 → RT-2（2023）引入 VLM 预训练 → 斯坦福 OpenVLA（2024）开源 7B 参数模型，以 7× 更少参数超越 RT-2-X(55B) 16.5% → Physical Intelligence Pi0（2024.10）引入 Flow Matching 实现 50Hz 灵巧手控制 → NVIDIA GR00T N1（2025.03）双系统架构开源基础模型 → Pi0.7（2026.04）5B 参数多模态上下文条件化，涌现出组合泛化能力。",
        key_concepts: ["三模态融合", "端到端动作生成", "跨平台泛化", "Flow Matching", "Diffusion Transformer", "VLM 预训练"],
        source: { type: "paper", title: "OpenVLA: An Open-Source Vision-Language-Action Model", url: "https://arxiv.org/abs/2406.09246" },
      },
    },
    {
      id: "vla_rt2",
      label: "RT-2（Google DeepMind）",
      type: "product",
      details: {
        summary: "Google DeepMind 2023 年发布的里程碑式 VLA，首次将网页规模预训练 VLM（PaLI-X / PaLM-E）直接迁移到机器人控制，证明了「把动作当成文本 token 来预测」的路径可行性。",
        facts: [
          { label: "发布时间", value: "2023 年 7 月（CoRL 2023）" },
          { label: "参数规模", value: "55B（RT-2-X 版本），当时最大的机器人控制模型" },
          { label: "核心创新", value: "动作 token 化：将连续关节角离散化为文本词表中的 token，直接用 VLM 的自回归推理预测动作" },
          { label: "涌现能力", value: "未见过的物体识别、基于常识的推理推断（如识别「危险物品」并回避）" }
        ],
        notes: "RT-2 证明了「缩放定律（Scaling Law）适用于机器人策略」，奠定了整个 VLA 路线的信心基础。局限：推理太慢（不适合 50Hz 灵巧操作）、封闭源码、泛化到新机器人平台成本高。",
        key_concepts: ["动作 token 化", "VLM 预训练迁移", "涌现推理能力"],
        source: { type: "paper", title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control", url: "https://arxiv.org/abs/2307.15818" },
      },
    },
    {
      id: "vla_openvla",
      label: "OpenVLA（开源 7B VLA）",
      type: "product",
      details: {
        summary: "斯坦福大学等联合发布的开源 VLA 标杆，7B 参数在 970k 真实机器人演示数据（Open X-Embodiment）上训练，以 7× 更小体积超越封闭的 RT-2-X（55B）16.5%，支持 LoRA 在消费级 GPU 微调。",
        facts: [
          { label: "发布时间", value: "2024 年 6 月（arXiv），2025 年发表于 CoRL 2025" },
          { label: "参数规模", value: "7B（基于 Llama 2 + DINOv2 + SigLIP 融合视觉编码器）" },
          { label: "训练数据", value: "970k 真实机器人演示，来自 Open X-Embodiment 跨机器人数据集" },
          { label: "微调效率", value: "支持 LoRA 在单张消费级 GPU 微调，量化后不影响成功率" },
          { label: "开源协议", value: "MIT License，模型权重和代码完全开放" }
        ],
        notes: "OpenVLA 是学术界和初创公司首选的 VLA 基础模型，FluxVLA Engine 等工程平台均对其提供一级支持。后续衍生出 OpenVLA-OFT（2024.12）改进了 fine-tuning 效率，使用 parallel decoding 将推理速度提升 6.7×。",
        key_concepts: ["开源", "7B 参数", "LoRA 微调", "跨平台泛化", "Open X-Embodiment"],
        source: { type: "paper", title: "OpenVLA: An Open-Source Vision-Language-Action Model", url: "https://arxiv.org/abs/2406.09246" },
      },
    },
    {
      id: "vla_pi0",
      label: "Pi0 系列（Physical Intelligence）",
      type: "product",
      details: {
        summary: "Physical Intelligence（π.ai）推出的通用机器人基础策略系列，核心创新是引入 Flow Matching 代替自回归 token 预测，生成高频连续动作（50Hz），首次让 VLA 能稳定完成洗衣折叠等高灵巧任务。",
        facts: [
          { label: "Pi0（2024.10）", value: "3B VLM + Flow Matching 动作专家；支持单臂/双臂/移动机械臂；50Hz 灵巧操作" },
          { label: "Pi0.5（2025.09）", value: "引入 Knowledge Insulation 技术，显著提升开放世界泛化；在 DROID 数据集上训练" },
          { label: "Pi0.7（2026.04）", value: "5B 参数（Gemma3 4B VLM + 860M 动作专家）；多模态上下文条件化（子目标图像+元数据）；涌现出组合泛化能力" },
          { label: "开源情况", value: "OpenPi 开源仓库（Apache 2.0），包含 Pi0 / Pi0-FAST / Pi0.5 训练推理代码" }
        ],
        notes: "Flow Matching（流匹配）是 Pi0 的核心突破：不同于 Diffusion Policy 需要多步去噪（慢），Flow Matching 通过学习从噪声到动作的「最优传输流」，一步生成高质量连续动作分布，兼顾速度和精度。Pi0.7 在架构中还集成了一个轻量世界模型用于生成子目标图像。",
        key_concepts: ["Flow Matching", "高频灵巧控制", "组合泛化", "通用基础策略"],
        source: { type: "paper", title: "π₀: A Vision-Language-Action Flow Model for General Robot Control", url: "https://arxiv.org/abs/2410.24164" },
      },
    },
    {
      id: "vla_groot",
      label: "GR00T N1（NVIDIA）",
      type: "product",
      details: {
        summary: "NVIDIA 2025 年 3 月发布的全球首个开源通用人形机器人基础模型，双系统架构（System 2 视觉语言理解 + System 1 Diffusion Transformer 动作生成），支持跨机器人平台的双臂灵巧操作，已部署于傅利叶 GR-1 人形机器人。",
        facts: [
          { label: "发布时间", value: "2025 年 3 月 18 日（GTC 2025）" },
          { label: "架构", value: "双系统：System 2（VLM，慢思考/语义理解）+ System 1（Diffusion Transformer，快速动作生成），端到端联合训练" },
          { label: "训练数据", value: "真实机器人轨迹 + 人类自我中心视频 + 合成数据三源混合" },
          { label: "最新版本", value: "GR00T N1.7（2026）：新 VLM 骨干（Cosmos-Reason2-2B / Qwen3-VL）+ 2 万小时 EgoScale 人类视频预训练" },
          { label: "开源协议", value: "Apache 2.0，权重和代码完全开放" }
        ],
        notes: "GR00T N1 的「双系统」设计灵感来自卡尼曼「系统1/系统2」认知理论（《思考，快与慢》）：System 2 负责理解语言+规划（慢但精准），System 1 负责实时输出精细动作（快而流畅）。NVIDIA 的战略意图：把 GR00T 打造成机器人领域的 CUDA——底层基础设施标准，所有厂商在此之上构建应用。",
        key_concepts: ["双系统架构", "Diffusion Transformer", "跨平台开源", "人形专用"],
        source: { type: "paper", title: "GR00T N1: An Open Foundation Model for Generalist Humanoid Robots", url: "https://arxiv.org/abs/2503.14734" },
      },
    },
    {
      id: "generalized_grasping",
      label: "泛化抓取模型",
      type: "technology",
      details: {
        summary: "无需预先建立物体3D模型，利用深度学习直接生成任意未知物体的抓取姿态。",
        key_concepts: ["AnyGrasp", "零样本抓取"],
        source: { type: "conversation" },
      },
    },
    {
      id: "physics_simulators",
      label: "物理模拟器",
      type: "technology",
      details: {
        summary: "在数字世界中逼真模拟重力、摩擦和碰撞，用于机器人低成本、安全的千万次训练。",
        notes: "如 Isaac Gym，是强化学习和具身大模型的必需基础设施。",
        key_concepts: ["Isaac Gym", "MuJoCo"],
        source: { type: "conversation" },
      },
    },
    {
      id: "synthetic_data_gen",
      label: "合成数据生成",
      type: "technology",
      details: {
        summary: "利用图形学引擎在仿真中自动批量生成带有完美标注的训练数据，解决机器人数据稀缺难题。",
        key_concepts: ["域随机化", "数据飞轮"],
        source: { type: "conversation" },
      },
    },
    {
      id: "hri",
      label: "人机交互",
      type: "technology",
      details: {
        summary: "让人形机器人以符合人类直觉的方式（语音、动作、表情）与人进行双向沟通的技术。",
        key_concepts: ["自然交流", "情感链接"],
        source: { type: "conversation" },
      },
    },
    {
      id: "nlu",
      label: "自然语言理解",
      type: "technology",
      details: {
        summary: "解析人类复杂的口语指令，甚至理解包含指代词（“把那个拿来”）的模糊语义。",
        key_concepts: ["LLM", "语义解析"],
        source: { type: "conversation" },
      },
    },
    {
      id: "intent_recognition",
      label: "意图识别",
      type: "technology",
      details: {
        summary: "通过分析人的肢体动作、眼神或半句话，提前预测人类想做什么并主动提供协作。",
        key_concepts: ["行为预测", "主动式服务"],
        source: { type: "conversation" },
      },
    },
    {
      id: "affective_computing",
      label: "情感计算",
      type: "technology",
      details: {
        summary: "识别用户的面部表情和语音语调中的情绪，并让机器人做出适宜的拟人化反馈。",
        key_concepts: ["情绪识别", "共情响应"],
        source: { type: "conversation" },
      },
    },
    {
      id: "speech_synthesis",
      label: "语音合成",
      type: "technology",
      details: {
        summary: "将文本转化为带有情感、停顿、符合当前语境的自然语音音频（TTS）。",
        key_concepts: ["TTS", "拟真音色"],
        source: { type: "conversation" },
      },
    },

    // ── 2. 硬件组件板块 (Hardware Component) ──
    {
      id: "actuator_system",
      label: "执行器系统",
      type: "component",
      details: {
        summary: "将电能转化为机械运动的核心驱动部件，是决定机器人力量、速度和精度的关键硬件。",
        analogy: "像人体的肌肉——接收大脑（控制器）指令，产生实际动作。",
        notes: "人形机器人通常需要数十个高功率密度、轻量化的执行器。",
        key_concepts: ["关节模组", "动力输出"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rotary_actuators",
      label: "旋转执行器",
      type: "component",
      details: {
        summary: "负责产生角度旋转运动的关节模组，通常用于肩部、肘部、髋侧摆等需要大范围转动的部位。",
        key_concepts: ["力矩电机", "谐波减速"],
        source: { type: "conversation" },
      },
    },
    {
      id: "linear_actuators",
      label: "线性执行器",
      type: "component",
      details: {
        summary: "输出直线推拉力的模组，能够承受极大的纵向负载，广泛用于下肢膝关节和踝关节。",
        notes: "特斯拉Optimus带火了基于行星滚柱丝杠的线性执行器方案。",
        key_concepts: ["推力", "丝杠传动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "dexterous_hands",
      label: "灵巧手",
      type: "component",
      details: {
        summary: "高度仿人的多指机械手，集成微型电机与触觉传感器，用于执行极其精细的抓取和操作任务。",
        key_concepts: ["微型电机", "多自由度"],
        source: { type: "conversation" },
      },
    },
    {
      id: "bionic_joints",
      label: "仿生关节",
      type: "component",
      details: {
        summary: "模仿人类肌腱驱动或特定骨骼结构的非传统关节设计，旨在提升柔顺性和能量效率。",
        key_concepts: ["线驱", "柔顺机制"],
        source: { type: "conversation" },
      },
    },
    {
      id: "core_parts",
      label: "核心零部件",
      type: "component",
      details: {
        summary: "构成执行器及躯干的最底层精密工业零件，是产业链上游的利润高地。",
        key_concepts: ["电机", "减速器", "传动件"],
        source: { type: "conversation" },
      },
    },
    {
      id: "harmonic_reducers",
      label: "谐波减速器",
      type: "component",
      details: {
        summary: "利用柔性齿轮弹性变形传递运动的减速装置，体积小、重量轻、无背隙，广泛用于旋转关节。",
        key_concepts: ["柔轮", "高精度"],
        source: { type: "conversation" },
      },
    },
    {
      id: "planetary_reducers",
      label: "行星减速器",
      type: "component",
      details: {
        summary: "利用行星齿轮系结构的减速器，刚性好，耐冲击，常用于受力较大的髋关节或腰部。",
        key_concepts: ["高刚性", "耐冲击"],
        source: { type: "conversation" },
      },
    },
    {
      id: "frameless_torque_motors",
      label: "无框力矩电机",
      type: "component",
      details: {
        summary: "没有外壳和轴承的电机，可直接嵌入关节内部，以最小的体积提供最大的峰值扭矩。",
        key_concepts: ["高扭矩密度", "中空走线"],
        source: { type: "conversation" },
      },
    },
    {
      id: "coreless_motors",
      label: "空心杯电机",
      type: "component",
      details: {
        summary: "取消了传统铁芯转子的微型电机，响应速度极快、无齿槽效应，是驱动灵巧手的绝佳选择。",
        key_concepts: ["微型化", "高响应"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ball_screws",
      label: "滚珠丝杠",
      type: "component",
      details: {
        summary: "通过滚珠在螺母和丝杠间滚动来传递直线的传动元件，摩擦力小，效率高，但承载力有限。",
        key_concepts: ["低摩擦", "线性传动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "planetary_roller_screws",
      label: "行星滚柱丝杠",
      type: "component",
      details: {
        summary: "利用螺纹滚柱代替滚珠的顶级线性传动件，接触面极大，能承受巨量负载并在极限空间内输出极大推力。",
        key_concepts: ["重载", "高寿命", "高壁垒"],
        source: { type: "conversation" },
      },
    },
    {
      id: "sensory_system",
      label: "传感系统",
      type: "component",
      details: {
        summary: "用于感知机器人自身状态及外部环境的硬件设备集群，相当于机器人的眼、耳、皮肤和前庭。",
        key_concepts: ["本体感受", "环境感知"],
        source: { type: "conversation" },
      },
    },
    {
      id: "six_axis_force_sensors",
      label: "六维力矩传感器",
      type: "component",
      details: {
        summary: "能同时测量三个方向的受力和三个方向扭矩的高级传感器，常装在脚踝或手腕实现极致的力控平衡。",
        key_concepts: ["精确力控", "柔顺交互"],
        source: { type: "conversation" },
      },
    },
    {
      id: "tactile_sensors_eskin",
      label: "触觉传感器/电子皮肤",
      type: "component",
      details: {
        summary: "覆盖在机械手指或身体表面的柔性材料，能感知细微的压力分布、滑动甚至温度。",
        key_concepts: ["阵列传感", "防滑移"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rgbd_cameras",
      label: "RGB-D相机",
      type: "component",
      details: {
        summary: "不仅能拍出彩色照片，还能输出每个像素距离（深度）的视觉传感器，是人形机器人的主要眼睛。",
        key_concepts: ["深度图", "视觉导航"],
        source: { type: "conversation" },
      },
    },
    {
      id: "lidar",
      label: "激光雷达",
      type: "component",
      details: {
        summary: "通过发射激光束构建高精度3D环境点云的传感器，抗光照干扰能力强，但成本和体积偏高。",
        key_concepts: ["高精建图", "全天候"],
        source: { type: "conversation" },
      },
    },
    {
      id: "imu",
      label: "惯性测量单元",
      type: "component",
      details: {
        summary: "测量物体三轴加速度和角速度的传感器，是维持双足机器人动态平衡的“前庭神经”。",
        key_concepts: ["姿态估计", "高频反馈"],
        source: { type: "conversation" },
      },
    },
    {
      id: "compute_power",
      label: "计算与能源模块",
      type: "component",
      details: {
        summary: "维持机器人生命体征与算力运转的神经和血管系统。",
        key_concepts: ["算力", "续航", "通讯"],
        source: { type: "conversation" },
      },
    },
    {
      id: "edge_computing_chips",
      label: "边缘计算芯片",
      type: "component",
      details: {
        summary: "内置在机器人躯干内的高算力芯片，用于本地实时跑大模型和复杂控制算法，无需依赖云端延迟。",
        key_concepts: ["高算力", "低功耗"],
        source: { type: "conversation" },
      },
    },
    {
      id: "internal_bus",
      label: "内部通讯总线",
      type: "component",
      details: {
        summary: "连接主控大脑和全身上下数十个关节的神经束，要求极低的延迟和极强的数据同步能力（如EtherCAT）。",
        key_concepts: ["EtherCAT", "微秒级同步"],
        source: { type: "conversation" },
      },
    },
    {
      id: "high_density_battery",
      label: "高能量密度电池组",
      type: "component",
      details: {
        summary: "决定机器人连续工作时间的核心部件，需要在有限胸腔/背部空间内最大化电量储备。",
        key_concepts: ["长续航", "轻量化"],
        source: { type: "conversation" },
      },
    },
    {
      id: "bms",
      label: "电源管理系统",
      type: "component",
      details: {
        summary: "实时监控电池状态，在机器人瞬间发力（如起跳、搬重物）时调配几百安培瞬时大电流的控制板。",
        key_concepts: ["瞬态放电", "安全监控"],
        source: { type: "conversation" },
      },
    },

    // ── 3. 代表企业与产品板块 (Companies & Products) ──
    {
      id: "global_leaders",
      label: "国际第一梯队",
      type: "concept",
      details: {
        summary: "在算力、资金或运动控制技术上处于全球领先地位，定义行业标杆的国际巨头企业。",
        key_concepts: ["科技巨头", "标杆产品"],
        source: { type: "conversation" },
      },
    },
    {
      id: "domestic_innovators",
      label: "国内新锐与巨头",
      type: "concept",
      details: {
        summary: "依托中国强大的供应链优势和AI人才红利，快速迭代并极具性价比的国产力量。",
        key_concepts: ["供应链优势", "高性价比"],
        source: { type: "conversation" },
      },
    },
    {
      id: "key_suppliers",
      label: "产业链核心供应商",
      type: "concept",
      details: {
        summary: "在电机、减速器、传感器等关键卡脖子环节占据主导地位的零部件“隐形冠军”。",
        key_concepts: ["核心部件", "隐形冠军"],
        source: { type: "conversation" },
      },
    },
    {
      id: "tesla_company",
      label: "特斯拉",
      type: "company",
      details: {
        summary: "全球自动驾驶巨头，将FSD视觉算法复用至人形机器人，致力于打造低成本的通用智能机器。",
        facts: [
          { label: "代表产品", value: "Optimus Gen 2" },
          { label: "核心壁垒", value: "端到端AI模型与垂直整合制造能力" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "tesla_optimus",
      label: "特斯拉-Optimus",
      type: "product",
      details: {
        summary: "特斯拉第二代人形机器人，大幅优化了重量，搭载11自由度自研灵巧手，主攻汽车工厂装配场景。",
        facts: [
          { label: "制造商", value: "特斯拉" },
          { label: "执行器类型", value: "自研一体化关节，含滚柱丝杠" }
        ],
        notes: "代表了用造车的逻辑去造机器人，极具量产降本潜力。",
        source: { type: "conversation" },
      },
    },
    {
      id: "boston_dynamics",
      label: "波士顿动力",
      type: "company",
      details: {
        summary: "全球足式机器人先驱，以极其硬核的传统控制理论和液压/电驱技术惊艳世界。",
        facts: [
          { label: "代表产品", value: "新一代全电动 Atlas" },
          { label: "技术标签", value: "极致动态平衡、跑酷后空翻" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "bd_atlas",
      label: "波士顿动力-Atlas",
      type: "product",
      details: {
        summary: "2024年全面退役液压版，推出全电动版Atlas，关节具备360度无限位旋转能力。",
        facts: [
          { label: "驱动方式", value: "全电动（摒弃液压）" },
          { label: "独特设计", value: "反关节站立，超越人类生理极限运动范围" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "figure_ai",
      label: "Figure AI",
      type: "company",
      details: {
        summary: "汇聚了苹果、波士顿动力前核心成员的初创明星，拿到了OpenAI和微软的巨额投资。",
        facts: [
          { label: "融资背书", value: "OpenAI, 微软, 亚马逊等" },
          { label: "核心看点", value: "首个原生接入OpenAI大模型的机器人本体" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "figure_02",
      label: "Figure AI-Figure 02",
      type: "product",
      details: {
        summary: "第二代产品，集成全面语音对话能力和强大的视觉语言模型，已进入宝马工厂测试。",
        facts: [
          { label: "算力底座", value: "定制的视觉语言模型 (VLM)" },
          { label: "电池", value: "整合在躯干内的定制电池包，续航大增" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "agility_robotics",
      label: "Agility Robotics",
      type: "company",
      details: {
        summary: "专注于仓储物流领域的实用派机器人公司，其设计放弃了完全仿人，追求工作效率最大化。",
        facts: [
          { label: "战略合作伙伴", value: "亚马逊仓储" },
          { label: "估值", value: "独角兽级别" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "agility_digit",
      label: "Agility Robotics-Digit",
      type: "product",
      details: {
        summary: "采用独特的反关节双足设计，没有传统意义上的人手，而是专门为搬运纸箱设计的抓手。",
        facts: [
          { label: "腿部形态", value: "仿鸟类的反关节" },
          { label: "核心场景", value: "电商仓储周转箱搬运" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "unitree_robotics",
      label: "宇树科技",
      type: "company",
      details: {
        summary: "国内最早实现四足机器人商业化并成功切入人形领域的公司，拥有极强的降本造血能力。",
        facts: [
          { label: "代表产品", value: "H1, G1 (标价仅9.9万起)" },
          { label: "行业地位", value: "全球众多顶尖AI实验室的通用硬件底座" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "unitree_h1_g1",
      label: "宇树科技-H1/G1",
      type: "product",
      details: {
        summary: "H1打破全尺寸人形全马速度纪录；G1将全尺寸双足机器人的售价打入10万元以内，震惊业界。",
        facts: [
          { label: "G1特点", value: "极致性价比，适合广大开发者购买" },
          { label: "驱动", value: "自研高爆发关节电机" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "agibot",
      label: "智元机器人",
      type: "company",
      details: {
        summary: "由前华为天才少年稚晖君创办，生态打法清晰，致力于打造软硬开源的通用机器人平台。",
        facts: [
          { label: "创始人", value: "彭志辉 (稚晖君)" },
          { label: "战略路线", value: "软硬件开源生态 + 商业化闭环并行" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "agibot_expedition",
      label: "智元机器人-远征A1/A2",
      type: "product",
      details: {
        summary: "远征系列主打“反关节”设计（膝盖可向后折叠），极大提高了下蹲操作时的稳定性和工作范围。",
        facts: [
          { label: "关节特性", value: "自研PowerFlow反关节模组" },
          { label: "大模型底座", value: "自研WorkGPT" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "ubtech",
      label: "优必选",
      type: "company",
      details: {
        summary: "“港股人形机器人第一股”，国内最早深耕该领域的先驱，在大型伺服舵机上积累深厚。",
        facts: [
          { label: "资本市场", value: "香港主板上市" },
          { label: "合作车企", value: "蔚来、东风等" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "ubtech_walker",
      label: "优必选-Walker S",
      type: "product",
      details: {
        summary: "专为工业制造打造的升级版机型，首创与人类员工在车间同台打配合进行汽车质检。",
        facts: [
          { label: "落地进展", value: "已在新能源汽车总装车间实训" },
          { label: "重点任务", value: "安全带检测、车标贴敷" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "fourier_intelligence",
      label: "傅利叶智能",
      type: "company",
      details: {
        summary: "从外骨骼康复机器人转型而来的黑马，在康复医疗力控积累上有着独特的基因优势。",
        facts: [
          { label: "背景", value: "医疗康复外骨骼起家" },
          { label: "核心产品", value: "GR-1" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "fourier_gr1",
      label: "傅利叶智能-GR-1",
      type: "product",
      details: {
        summary: "通用人形机器人，设计感强，具备优秀的全身协同控制能力，首批瞄准科研教育和医疗辅助市场。",
        facts: [
          { label: "峰值扭矩", value: "全身拥有强大的力矩输出" },
          { label: "设计风格", value: "极简工业风" }
        ],
        source: { type: "conversation" },
      },
    },
    // ▼ 逐际动力 (LimX Dynamics) 深度下钻区 ▼
    {
      id: "limx_dynamics",
      label: "逐际动力",
      type: "company",
      details: {
        summary: "国内聚焦运动智能（Locomotion Intelligence）的硬核新锐，在强化学习与多模态足式机器人领域居领先地位。",
        facts: [
          { label: "创始人", value: "南方科技大学张巍教授" },
          { label: "核心壁垒", value: "基于感知的强化学习、盲视控制" },
          { label: "研发理念", value: "专注运动智能，软硬高度协同" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_cl_1",
      label: "全尺寸人形 CL-1",
      type: "product",
      details: {
        summary: "逐际动力首款全尺寸人形，主打基于强化学习的抗干扰步态，能实现盲视上下楼梯、抗猛烈推踹。",
        facts: [
          { label: "核心算法", value: "强化学习 (RL)" },
          { label: "场景", value: "高动态移动环境" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_tron_1",
      label: "多形态双足 TRON 1",
      type: "product",
      details: {
        summary: "2024年底发售的科研开发平台，首创三合一形态，一套算法即可无缝切换双点足、双足、双轮足。",
        facts: [
          { label: "硬件特色", value: "模块化设计，末端快速插拔更换" },
          { label: "定位", value: "强化学习与Sim2Real高效验证平台" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_w1",
      label: "四轮足 W1",
      type: "product",
      details: {
        summary: "结合了轮式高效与足式越障优势的混合形态，腿部带有驱动轮，是逐际动力攻入B端工业巡检的主力军。",
        facts: [
          { label: "产品形态", value: "四轮足 (Wheeled-legged)" },
          { label: "商业逻辑", value: "比纯足式更省电，比纯轮式更具越障能力" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_p1",
      label: "双足机器人 P1",
      type: "product",
      details: {
        summary: "逐际早期推出的纯双足平台，曾在自然林地等极限野外地形中展现了令人震撼的强化学习盲视越野能力。",
        facts: [
          { label: "技术验证", value: "野外零样本泛化能力" },
          { label: "身形", value: "紧凑无上肢双足" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "perception_driven_rl",
      label: "基于感知的强化学习",
      type: "technology",
      details: {
        summary: "逐际底层护城河，将视觉感知数据直接耦合进强化学习网络，实现端到端的复杂地形运动控制。",
        notes: "无需预先建立地图模型，直接从图像到运动输出，极大提升了对动态环境的响应鲁棒性。",
        key_concepts: ["感知耦合", "端到端", "强鲁棒性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "rl_mpc_integration",
      label: "强化学习与MPC融合算法",
      type: "technology",
      details: {
        summary: "结合了强化学习的强泛化鲁棒性，和模型预测控制（MPC）的高精度解释性，双剑合璧。",
        key_concepts: ["混合控制架构", "优势互补"],
        source: { type: "conversation" },
      },
    },

    // ── 世界模型与 Model-Based RL 子树 ──
    {
      id: "world_model",
      label: "世界模型",
      type: "technology",
      details: {
        summary: "机器人在大脑内部建立的「物理世界压缩模拟器」——给定当前状态和一个动作，能预测出下一刻的状态（甚至生成未来画面）。有了世界模型，机器人可以在不真实执行的情况下，在脑子里预演多套方案，选出最优解。",
        analogy: "人类下棋时不需要真的移动棋子来评估每步好坏——大脑里有一个棋盘模型，可以「想象」十步以后的局面。世界模型就是让机器人也有这种「边走边想」的能力，而不是在真实世界里盲目试错。",
        facts: [
          { label: "两大技术路线", value: "① 生成式世界模型（Dreamer 系列）：预测未来像素/隐状态，用想象训练策略 ② JEPA 式世界模型（V-JEPA 2）：仅预测未来潜空间嵌入，不重建像素，计算更高效" },
          { label: "DreamerV3", value: "2023 年发布，循环状态空间模型（RSSM），固定超参数跨 7 大领域通用，首个在 Minecraft 从零收集钻石的 RL 算法；2025 年发表于 Nature" },
          { label: "TD-MPC2", value: "隐式世界模型（无解码器），用在线 MPPI 轨迹优化代替显式策略网络，训练速度 2-5× 快于 Dreamer，适合连续控制任务" },
          { label: "V-JEPA 2（Meta AI）", value: "2025 年发布，在 100 万小时互联网视频上自监督预训练；V-JEPA 2-AC 仅用 62 小时无标签机器人视频，即可零样本部署到 Franka 机械臂完成抓放任务" },
          { label: "机器人专用世界模型", value: "WEAVER（2026.06）：结合 Flow Matching + 预训练视频编码器，兼顾高保真生成、时序一致性与边缘推理效率" }
        ],
        notes: "世界模型与 VLA 的关系：不是竞争而是互补。VLA 负责「给定指令→输出动作」的直接映射；世界模型负责「预演未来→辅助规划」的隐式模拟。Pi0.7 已将轻量世界模型内嵌架构中用于生成子目标图像，是两者融合的早期信号。2026 年业界主流观点：下一代具身基础模型将同时具备 VLA（执行力）+ 世界模型（规划力）双核架构。",
        key_concepts: ["潜状态预测", "想象式策略优化", "RSSM", "JEPA", "Sim-in-Mind", "Model-Based RL"],
        source: { type: "paper", title: "V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning", url: "https://arxiv.org/abs/2506.09985" },
      },
    },
    {
      id: "model_based_rl",
      label: "Model-Based 强化学习",
      type: "technology",
      details: {
        summary: "先学一个环境的动态模型（世界模型），再在模型内部用「想象」生成大量虚拟经验来训练策略，样本效率远高于 Model-Free RL，是解决真实机器人数据稀缺问题的关键路径。",
        analogy: "Model-Free RL 是「在真实世界反复试错学游泳」，Model-Based RL 是「先理解物理定律（浮力/阻力），再在脑海里游几千次，最后下水就基本会了」。",
        facts: [
          { label: "代表算法 DreamerV3", value: "RSSM 循环隐状态模型 + 想象内 Actor-Critic；固定超参数跨域通用；2025 年发表 Nature，正式确立 Model-Based RL 的里程碑地位" },
          { label: "代表算法 TD-MPC2", value: "隐式无解码器世界模型 + MPPI 在线规划；无显式策略网络，用规划代替策略；适合高精度连续动作控制；训练速度 2-5× 快于 DreamerV3" },
          { label: "样本效率优势", value: "相同真实环境步数下，Model-Based RL 通常比 PPO/SAC 等 Model-Free 方法高 10-100× 的样本效率" },
          { label: "主要局限", value: "「模型幻觉」问题：建模误差在多步想象中累积放大，导致策略在真实环境中失效（Compounding Error）" }
        ],
        notes: "Model-Based RL 在机器人领域的应用趋势：① 用 Sim2Real 仿真器（Isaac Gym 等）作为「完美世界模型」进行预训练 → ② 上真机后用少量真实数据 Fine-tune 世界模型 → ③ 持续在脑中想象规划。这个「先仿真后微调」的范式，本质上是把物理仿真器当成一种特殊的 Model-Based RL 框架。",
        key_concepts: ["DreamerV3", "TD-MPC2", "想象训练", "样本高效", "Compounding Error"],
        source: { type: "paper", title: "Mastering diverse control tasks through world models (DreamerV3, Nature 2025)", url: "https://www.nature.com/articles/s41586-025-08744-2" },
      },
    },
    {
      id: "model_free_rl",
      label: "Model-Free 强化学习",
      type: "technology",
      details: {
        summary: "不建立环境模型，直接通过大量真实（或仿真）试错学习「状态→动作」的策略映射。实现简单、理论成熟，是当前人形机器人运动控制（步态/平衡）的主流方案。",
        facts: [
          { label: "PPO（近端策略优化）", value: "OpenAI 2017 年提出，目前最广泛使用的 on-policy 算法；逐际动力、宇树等大量使用 PPO 训练双足步态；稳定但样本效率一般" },
          { label: "SAC（软演员-评论家）", value: "最大熵框架的 off-policy 算法，样本效率高于 PPO，适合连续高维动作空间；灵巧手控制中应用广泛" },
          { label: "特点", value: "① 不需要环境动态模型，可直接在黑盒环境中训练 ② 配合 Domain Randomization 实现稳定 Sim2Real ③ 算法稳定性高，超参数不敏感" },
          { label: "局限", value: "样本效率低（需数亿步仿真），不适合直接在真机上从零训练（成本太高、机器人会损坏）" }
        ],
        notes: "机器人领域的主流实践是「Model-Free RL 在仿真预训练 + 模仿学习（IL）在真机 Fine-tune」的混合范式：RL 负责学习基础物理运动能力，IL（如 ACT、Diffusion Policy）负责学习人类演示的精细操作技能。两者互补，共同构建机器人的完整能力体系。",
        key_concepts: ["PPO", "SAC", "on-policy/off-policy", "策略直接优化", "与模仿学习互补"],
        source: { type: "paper", title: "Proximal Policy Optimization Algorithms (PPO, OpenAI)", url: "https://arxiv.org/abs/1707.06347" },
      },
    },
    {
      id: "terrain_blind_control",
      label: "盲视地形运动控制",
      type: "technology",
      details: {
        summary: "仅依靠本体感受器（如IMU和关节扭矩反馈），在视觉完全失效的情况下，踩过随机障碍物不倒。",
        key_concepts: ["本体感受", "抗扰动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "high_torque_joints",
      label: "高扭矩密度自研关节",
      type: "technology",
      details: {
        summary: "逐际动力为了配合其激进的控制算法，自主研发了能承受极大瞬时冲击力的高性能关节硬件。",
        key_concepts: ["硬件协同", "高爆发力"],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_b2b_inspection",
      label: "B端工业制造巡检",
      type: "application",
      details: {
        summary: "利用W1或CL-1在大型厂区、化工厂中进行仪表读取、异常热源排查。",
        notes: "通过四轮足的高效续航解决全尺寸人形走不远的痛点。",
        key_concepts: ["无人值守", "园区巡逻"],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_special_ops",
      label: "特种高危作业",
      type: "application",
      details: {
        summary: "替代人类进入地质灾害现场或毒气泄露区域进行探测和物料转移。",
        key_concepts: ["极限环境", "救灾"],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_logistics",
      label: "物流搬运与分拣",
      type: "application",
      details: {
        summary: "在非标准化仓库中，适应不平整地面，完成周转箱的跨区域搬运。",
        key_concepts: ["柔性物流", "越障搬运"],
        source: { type: "conversation" },
      },
    },
    // ▲ 逐际动力深度下钻区结束 ▲
    
    // 产业链核心供应商
    {
      id: "leaderdrive",
      label: "绿的谐波",
      type: "company",
      details: {
        summary: "国产谐波减速器绝对龙头，打破日本技术垄断，在人形机器人关节降本中扮演核心角色。",
        facts: [
          { label: "主营业务", value: "精密谐波减速器" },
          { label: "行业地位", value: "国内市占率第一" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "inovance",
      label: "汇川技术",
      type: "company",
      details: {
        summary: "工业自动化控制巨头，凭借在伺服电机、驱动器领域的深厚积淀，横向切入人形机器人核心零部件。",
        facts: [
          { label: "主营优势", value: "工控系统、伺服电机" },
          { label: "市值", value: "千亿级工控茅台" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "orbbec",
      label: "奥比中光",
      type: "company",
      details: {
        summary: "3D视觉传感领域的领军企业，为大量机器人本体厂商提供结构光、双目等深度的“眼睛”。",
        facts: [
          { label: "核心产品", value: "3D视觉传感器 (RGB-D相机)" },
          { label: "应用", value: "机器人视觉导航与避障" }
        ],
        source: { type: "conversation" },
      },
    },
    {
      id: "inspire_robots",
      label: "因时机器人",
      type: "company",
      details: {
        summary: "国内最早专注于仿人灵巧手和微型直线伺服驱动器研发的企业之一，赋能机器人的末端操作。",
        facts: [
          { label: "拳头产品", value: "五指灵巧手、微型推杆" },
          { label: "技术壁垒", value: "微型传动与力控" }
        ],
        source: { type: "conversation" },
      },
    },

    // ── 4. 应用场景板块 (Application Scenarios) ──
    {
      id: "industrial_logistics",
      label: "工业制造与仓储",
      type: "application",
      details: {
        summary: "人形机器人在厂房等结构化环境中执行劳动密集型任务。",
        notes: "是最具确定性的近期商业化爆发点。",
        key_concepts: ["确定性场景", "黑灯工厂"],
        source: { type: "conversation" },
      },
    },
    {
      id: "material_handling",
      label: "物料搬运",
      type: "application",
      details: {
        summary: "在仓库或产线间将沉重的配件箱从A点搬到B点，替代叉车和地牛覆盖不到的最后十米。",
        key_concepts: ["负重", "周转"],
        source: { type: "conversation" },
      },
    },
    {
      id: "assembly_line",
      label: "产线装配",
      type: "application",
      details: {
        summary: "使用灵巧手在流水线上进行拧螺丝、插线束等精细化操作，实现柔性制造。",
        key_concepts: ["精细操作", "力觉反馈"],
        source: { type: "conversation" },
      },
    },
    {
      id: "quality_inspection",
      label: "质量检测",
      type: "application",
      details: {
        summary: "手持检测设备，以人类的视角和姿态对大型工件（如汽车白车身）的每个死角进行探查。",
        key_concepts: ["视觉质检", "死角覆盖"],
        source: { type: "conversation" },
      },
    },
    {
      id: "warehouse_sorting",
      label: "仓储分拣",
      type: "application",
      details: {
        summary: "在电商包裹堆中，准确抓取不同形状的物品并投入对应的快递滑槽。",
        key_concepts: ["泛化抓取", "高通量"],
        source: { type: "conversation" },
      },
    },
    {
      id: "special_ops",
      label: "特种与高危作业",
      type: "application",
      details: {
        summary: "在对人类存在致命威胁的环境中执行任务，以生命安全为首要考量，对成本不敏感。",
        notes: "⚠️ 整体尚未规模化落地（截至 2026 年中）。当前相对成熟的子场景仅限于电力系统带电作业（国家电网已批量采购 8500 台）等高度结构化高危环境；灾难救援、核电探查、军事部署等场景仍处于技术验证与小规模试验阶段。国际上最激进案例是 Foundation Future Industries 的 Phantom MK-1 在乌克兰执行物资运输后勤（2026），但仍属极小规模先导项目。专家普遍预测，特种作业的大规模实用化需到 2027–2030 年。",
        key_concepts: ["无人替代", "极限环境", "尚不成熟"],
        source: { type: "conversation" },
      },
    },
    {
      id: "disaster_rescue",
      label: "灾险救援",
      type: "application",
      details: {
        summary: "在地震废墟中攀爬、搬开石块，或在火场中开门搜寻被困者。",
        key_concepts: ["地形适应", "破拆"],
        source: { type: "conversation" },
      },
    },
    {
      id: "nuclear_inspection",
      label: "核电巡检",
      type: "application",
      details: {
        summary: "进入高辐射区读取老旧仪表盘，或在事故发生时进去旋紧泄漏阀门。",
        key_concepts: ["抗辐射", "远程遥操作"],
        source: { type: "conversation" },
      },
    },
    {
      id: "hazardous_handling",
      label: "危险品处理",
      type: "application",
      details: {
        summary: "防爆环境下拆除易爆物，或在生化实验室倾倒有毒试剂。",
        key_concepts: ["高精度", "防爆"],
        source: { type: "conversation" },
      },
    },
    {
      id: "space_exploration",
      label: "太空探索",
      type: "application",
      details: {
        summary: "代替宇航员进行高风险的舱外行走，或者在火星基地进行前期搭建。",
        key_concepts: ["微重力环境", "舱外作业"],
        source: { type: "conversation" },
      },
    },
    {
      id: "commercial_services",
      label: "商业服务",
      type: "application",
      details: {
        summary: "在商场、医院、展厅等半结构化的公共场所，直接服务于普通消费者。",
        notes: "对外观亲和力和语音交互能力要求极高。",
        key_concepts: ["三产服务", "人机交互"],
        source: { type: "conversation" },
      },
    },
    {
      id: "reception_guiding",
      label: "迎宾导览",
      type: "application",
      details: {
        summary: "在博物馆或大堂担任讲解员，用生动的肢体语言和对话引导访客。",
        key_concepts: ["亲和力", "多轮对话"],
        source: { type: "conversation" },
      },
    },
    {
      id: "commercial_performance",
      label: "商业表演",
      type: "application",
      details: {
        summary: "在演唱会、春晚、品牌发布、文旅驻演、沉浸式展览等高流量商业活动中，以机器人作为表演主体或互动载体，创造话题与视觉冲击力。",
        notes: "✅ 当前国内最成熟的人形机器人落地场景之一。代表案例：① 2026 春节，魔法原子 6 台人形机器人与易烊千玺同台表演 2026 央视春晚《智造未来》；② 2026.04，天九领航在张杰鸟巢演唱会完成 30+ 台机器人连续 16 场稳定商业交付（单场超 6 万观众）；③ 2026.05，智元「远征 A3」进驻上海大剧院参与音乐剧主演分享会即兴互动。机器人租赁平台（擎天租/机时租）2026 年春节期间娱乐表演订单占比 34%，部分平台全年演艺场次已近千场，日租金已从万元级降至千元级。商业表演对精细操作要求低、对视觉效果和稳定性要求高，是人形机器人当前性能的最佳匹配场景。",
        key_concepts: ["春晚同款", "演唱会表演", "RaaS 租赁", "国内成熟"],
        source: { type: "conversation" },
      },
    },
    {
      id: "retail_replenishment",
      label: "零售补货",
      type: "application",
      details: {
        summary: "在便利店夜间，自主将后仓的饮料和零食精准摆放至前台货架上。",
        key_concepts: ["物品识别", "摆放规划"],
        source: { type: "conversation" },
      },
    },
    {
      id: "medical_rehab",
      label: "医疗康复辅助",
      type: "application",
      details: {
        summary: "在医院里协助搬运无法起身的重症病人，或陪同中风患者进行步态康复训练。",
        key_concepts: ["安全力控", "医护减负"],
        source: { type: "conversation" },
      },
    },
    {
      id: "research_platform",
      label: "科研平台",
      type: "application",
      details: {
        summary: "高校 AI 实验室和科研机构将人形机器人作为标准硬件载体，用于测试最新具身大模型、采集真实机器人交互数据，是驱动技术快速迭代的重要场景。",
        notes: "✅ 较成熟的应用场景。宇树、傅利叶、逐际动力等厂商均向科研机构大量交付，提供 ROS 2 兼容 SDK 和开源接口。2025 年宇树 5500 台出货中，大量流向科研机构（宇树官方数据）。科研场景对功能稳定性要求高但对任务泛化要求相对低，是 Sim-to-Real 数据采集飞轮的重要一环。",
        key_concepts: ["具身大模型测试", "数据采集", "开源 SDK", "较成熟"],
        source: { type: "conversation" },
      },
    },
    {
      id: "education_platform",
      label: "教育平台",
      type: "application",
      details: {
        summary: "将人形机器人引入职业技术教育、STEM 课程及青少年编程教育，以具象化的物理智能体激发学习兴趣，培养下一代机器人工程师。",
        notes: "⚠️ 仍处于早期探索阶段，以展示演示为主，尚未形成规模化的课程体系与标准化教学方案。部分企业已在高职院校尝试「机器人+教育」合作，但多为品牌宣传与概念推广，实质教学落地有限。",
        key_concepts: ["STEM 教育", "职业培训", "青少年编程", "早期阶段"],
        source: { type: "conversation" },
      },
    },
    {
      id: "home_services",
      label: "家庭服务",
      type: "application",
      details: {
        summary: "人形机器人的终极愿景——进入非结构化极强的千家万户，成为真正的钢铁管家。",
        notes: "❌ 当前极不成熟，距大众普及预计 5–10 年。IDC 数据：2025 年全球人形机器人出货 1.8 万台，流入私人家庭不足 0.8%（钛媒体 2026 年报告）。家庭场景的核心挑战远超工厂：户型/家具/光照/宠物/儿童的随机干扰导致泛化能力严重不足，且安全容忍度极低（工厂夹坏货物是事故，家里夹伤儿童是社会事件）。优必选 CEO 周剑、北京人形机器人创新中心 CEO 熊友军均明确：路径是「先工业 → 再商业服务 → 最后才是家庭」，全面进入家庭场景「还有不短的路要走」。",
        key_concepts: ["非结构化环境", "长尾任务", "5-10年后"],
        source: { type: "conversation" },
      },
    },
    {
      id: "item_organization",
      label: "物品整理",
      type: "application",
      details: {
        summary: "将散落在沙发上的衣服叠好，把桌上的儿童玩具收进收纳箱。",
        key_concepts: ["柔性物体操作", "语义理解"],
        source: { type: "conversation" },
      },
    },
    {
      id: "cooking_assist",
      label: "烹饪辅助",
      type: "application",
      details: {
        summary: "在厨房帮忙切菜、端锅、打鸡蛋，要求对易碎品和危险刀具有极强感知。",
        key_concepts: ["双臂协作", "精细力控"],
        source: { type: "conversation" },
      },
    },
    {
      id: "home_cleaning",
      label: "居家清洁",
      type: "application",
      details: {
        summary: "使用吸尘器打扫死角，擦拭桌面，完成扫地机器人无法做到的立体空间清洁。",
        key_concepts: ["工具使用", "全地形"],
        source: { type: "conversation" },
      },
    },
    {
      id: "elderly_care",
      label: "养老陪护",
      type: "application",
      details: {
        summary: "为独居老人提供倒水送药的物理辅助，以及带有情感慰藉的日常聊天陪伴。",
        key_concepts: ["绝对安全", "情感计算"],
        source: { type: "conversation" },
      },
    },

    // ── 5. 产业链板块 (Industry Chain) ──
    {
      id: "upstream",
      label: "上游：核心硬件与软件",
      type: "concept",
      details: {
        summary: "为机器人本体提供“器官和神经系统”的基础制造及研发环节，技术壁垒最高，利润丰厚。",
        key_concepts: ["核心零部件", "算力算法"],
        source: { type: "conversation" },
      },
    },
    {
      id: "core_parts_mfg",
      label: "核心零部件制造",
      type: "concept",
      details: {
        summary: "生产高精度减速器、无框电机、丝杠等机械传动件的企业生态。",
        key_concepts: ["精密加工", "高毛利"],
        source: { type: "conversation" },
      },
    },
    {
      id: "sensor_mfg",
      label: "传感器制造",
      type: "concept",
      details: {
        summary: "研发六维力矩传感器、电子皮肤及3D视觉相机的产业聚落。",
        key_concepts: ["多模态", "感知硬件"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ai_chip_design",
      label: "AI算力芯片设计",
      type: "concept",
      details: {
        summary: "如英伟达等提供大算力GPU芯片及边缘计算主板，支撑具身大模型运行。",
        key_concepts: ["算力霸权", "算力底座"],
        source: { type: "conversation" },
      },
    },
    {
      id: "sim_platform_dev",
      label: "仿真平台开发",
      type: "concept",
      details: {
        summary: "开发数字孪生环境与物理引擎，供企业在虚拟世界训练机器人。",
        key_concepts: ["Isaac Sim", "物理引擎"],
        source: { type: "conversation" },
      },
    },
    {
      id: "data_annotation",
      label: "数据标注服务",
      type: "concept",
      details: {
        summary: "通过遥操作（Teleoperation）采集人类演示数据，并清洗标注供模型学习的服务商。",
        key_concepts: ["遥操作数据", "数据外包"],
        source: { type: "conversation" },
      },
    },
    {
      id: "midstream",
      label: "中游：本体制造",
      type: "concept",
      details: {
        summary: "将上游数千个零件组装并灌入灵魂（算法），打造出完整机器人硬件终端的核心环节。",
        key_concepts: ["整机集成", "系统工程"],
        source: { type: "conversation" },
      },
    },
    {
      id: "robot_design",
      label: "整机研发设计",
      type: "concept",
      details: {
        summary: "完成机电液一体化设计、整体外形工业设计及系统架构定义。",
        key_concepts: ["机电协同", "架构定义"],
        source: { type: "conversation" },
      },
    },
    {
      id: "mechanical_processing",
      label: "机械加工",
      type: "concept",
      details: {
        summary: "对外壳、骨架等非标准结构件进行CNC加工或3D打印铸造。",
        key_concepts: ["轻量化材料", "压铸"],
        source: { type: "conversation" },
      },
    },
    {
      id: "assembly_testing",
      label: "整机组装测试",
      type: "concept",
      details: {
        summary: "总装产线将零件合成为整机，并进行老化、疲劳、跌落等严格质量验证。",
        key_concepts: ["总装线", "可靠性验证"],
        source: { type: "conversation" },
      },
    },
    {
      id: "downstream",
      label: "下游：系统集成与落地",
      type: "concept",
      details: {
        summary: "将通用人形机器人改造为适应特定工厂或特定场景的“专用员工”，打通商业变现最后一公里。",
        key_concepts: ["集成商", "场景定制"],
        source: { type: "conversation" },
      },
    },
    {
      id: "automation_integration",
      label: "工业自动化集成",
      type: "concept",
      details: {
        summary: "为汽车厂或3C厂设计工位，让人形机器人顺畅接入原有的MES/WMS系统。",
        key_concepts: ["系统互联", "交钥匙工程"],
        source: { type: "conversation" },
      },
    },
    {
      id: "software_customization",
      label: "软件应用二次开发",
      type: "concept",
      details: {
        summary: "针对零售或服务业，基于本体提供的API接口，开发专属的收银、迎宾导购软件。",
        key_concepts: ["上层应用开发", "API调用"],
        source: { type: "conversation" },
      },
    },
    {
      id: "maintenance_service",
      label: "售后维保服务",
      type: "concept",
      details: {
        summary: "提供机器人的定期保养、损坏关节更换、电池回收等全生命周期服务。",
        key_concepts: ["全生命周期", "备件网络"],
        source: { type: "conversation" },
      },
    },

    // ── 6. 产品评估与商业化板块 (Evaluation) ──
    {
      id: "core_metrics",
      label: "硬件产品指标",
      type: "concept",
      details: {
        summary: "产品经理在定义一款人形机器人时，写在PRD里最核心的物理与性能参数表。",
        key_concepts: ["产品定义", "性能边界"],
        source: { type: "conversation" },
      },
    },
    {
      id: "dof",
      label: "自由度/DOF",
      type: "concept",
      details: {
        summary: "DOF = Degrees of Freedom（自由度），即机器人能独立运动的轴数量。每一个旋转关节（如膝盖弯折）或移动关节（如直线推杆伸缩）各贡献 1 个 DOF。DOF 数量直接决定机器人能完成什么动作——DOF 不够，某些任务在物理上根本无法实现。",
        analogy: "人体肩关节可以前后/左右/旋转三向运动 = 3 DOF；肘关节只能弯折 = 1 DOF；人体全身约 230+ DOF。人形机器人用 30–50 个 DOF 近似模拟这种灵活性，是工程上的「以少胜多」。",
        facts: [
          { label: "特斯拉 Optimus Gen 2", value: "全身 28 个 DOF（躯干+腿部），灵巧手 11 DOF，合计 39 DOF" },
          { label: "宇树 H1", value: "全身 43 DOF，含腕部旋转和灵巧手接口" },
          { label: "波士顿动力 Atlas（电动版）", value: "全身约 28 DOF，关节支持 360° 无限位旋转" },
          { label: "傅利叶 GR-1", value: "全身 40 DOF，其中双臂各 7 DOF、双手各 6 DOF" },
          { label: "人形机器人主流区间", value: "全身 28–50 DOF，灵巧手单手通常 6–12 DOF" },
          { label: "DOF 与成本关系", value: "每增加 1 DOF 约新增一套执行器+编码器+驱动板，直接拉高 BOM；灵巧手从 6 DOF 升至 12 DOF，成本可上涨 40%–80%" }
        ],
        notes: "DOF 是产品指标中最基础的「能力上限」参数：① 任务可行性边界：装配螺丝需要腕部旋转 DOF，折叠衣物需要灵巧手 10+ DOF，DOF 不足任务直接不可完成；② 控制复杂度：全身控制（WBC）的计算量随 DOF 数量近似呈 O(n²) 增长，从 30 DOF 升至 50 DOF 控制算力需求可翻倍；③ 竞品 spec 对比维度：买家在评估机器人时，DOF 是最直观的技术参数，类似发动机排量之于汽车。核心权衡：DOF ↑ → 灵活性 ↑ + 成本 ↑ + 控制难度 ↑，各厂商在「够用」和「极致」之间做不同选择。",
        key_concepts: ["Degrees of Freedom", "关节运动轴", "旋转关节", "灵活性与成本权衡", "WBC 控制复杂度"],
        source: { type: "blog", title: "Tesla Optimus Gen 2 技术规格（Tesla AI Day 2023）", url: "https://www.tesla.com/AI" },
      },
    },
    {
      id: "payload",
      label: "有效负载能力",
      type: "concept",
      details: {
        summary: "Payload，指机器人在保持动态平衡、以正常速度行走的状态下，双臂（或单臂）能持续稳定举起/搬运的最大物体重量（kg）。分为「单臂负载」和「双臂合计负载」两个维度，是决定机器人能干哪些体力活的硬性门槛。",
        analogy: "就像招聘搬运工时第一个问的「你能扛多重」——负载不够，汽车零部件、货箱、发动机壳等工业场景中大量任务直接排除在外，机器人只能做轻量分拣，无法替代真正的体力劳动岗位。",
        facts: [
          { label: "宇树 H1", value: "单臂负载 ≥ 10 kg，整机设计最大承重约 30 kg" },
          { label: "特斯拉 Optimus Gen 2", value: "单手负载约 9 kg，双臂合计约 20 kg（Tesla AI Day 官方数据）" },
          { label: "傅利叶 GR-1", value: "单臂峰值扭矩 230 N·m，可搬运 50 kg 物体（短时）" },
          { label: "Figure 02", value: "双臂合计负载约 20 kg，宝马工厂实测可稳定搬运汽车底盘零件" },
          { label: "工业场景门槛", value: "汽车零件搬运通常需双臂 ≥ 20 kg；仓储纸箱约 15–25 kg；电子装配通常 < 5 kg" },
          { label: "负载与步速关系", value: "满载时步速通常下降 20%–40%，厂商 spec 需注明是「空载最高速」还是「满载巡航速」" }
        ],
        notes: "负载能力背后由三个硬件参数决定：① 执行器峰值扭矩（关节电机能输出多大力矩）；② 关节刚度与传动效率（谐波减速器、滚柱丝杠的承载极限）；③ 整机重心控制（重物改变重心，WBC 需实时补偿平衡，负载越大补偿难度越高）。产品定义时需区分「额定负载（长时稳定工作）」和「峰值负载（短时举起）」，前者才是真正决定商业场景覆盖范围的数字。主流工业场景要求双臂额定负载 ≥ 15 kg 才有较大的任务覆盖面。",
        key_concepts: ["单臂/双臂负载", "额定负载 vs 峰值负载", "执行器扭矩", "任务覆盖面", "重心补偿"],
        source: { type: "blog", title: "Figure 02 技术规格与宝马工厂部署（Figure AI Official）", url: "https://www.figure.ai/news/figure-02" },
      },
    },
    {
      id: "max_walking_speed",
      label: "最大步行速度",
      type: "concept",
      details: {
        summary: "机器人在保持动态平衡的前提下能持续行走的最高速度（m/s），是衡量腿部执行器功率密度、步态规划算法和整机动态平衡能力的综合性指标，直接决定机器人在大型场地中的工作效率天花板。",
        analogy: "就像快递员的步速决定了他一天能送多少单——如果机器人步速是人类的 1/3，同样的仓库路程要花 3 倍时间，意味着你要买 3 台才能抵 1 个工人，ROI 直接崩掉。步行速度是「经济账能不能算过来」的隐性决定因素。",
        facts: [
          { label: "宇树 H1", value: "3.3 m/s（约 11.9 km/h），2023 年打破全尺寸人形机器人速度世界纪录" },
          { label: "逐际动力 CL-1", value: "约 2.5 m/s，强化学习步态，抗侧推不失稳" },
          { label: "特斯拉 Optimus Gen 2", value: "约 0.7 m/s（2024 年进厂实测），仍在持续提升" },
          { label: "Figure 02", value: "约 1.2 m/s，主攻灵巧操作，速度非首要指标" },
          { label: "人类参照", value: "正常步行 1.4 m/s，小跑 2.5 m/s，冲刺 ~10 m/s" },
          { label: "工业场景最低门槛", value: "业界普遍认为需达到 ≥1.2 m/s 才能满足大型工厂巡线、取料等基本场景效率要求" }
        ],
        notes: "步行速度是「腿部硬件 + 控制算法」联合能力的单一可测量输出，背后综合反映四项能力：① 执行器峰值功率密度（电机力矩不够蹬不快）；② 步态规划算法（步频提升需控制循环 >1kHz，RL/CPG 步态策略质量）；③ 动态平衡控制（速度越快，ZMP/WBC 控制越苛刻）；④ 整机重量与重心高度（越重加速制动越耗能，速度天花板越低）。正是因为它天然整合了多项底层指标，同时对 B 端客户有直观的业务意义（效率 → ROI），所以成为厂商对外宣传和竞品横向比较的核心 KPI。",
        key_concepts: ["工作效率代理指标", "执行器功率密度", "步态算法质量", "动态平衡能力", "ROI关联"],
        source: { type: "blog", title: "宇树 H1 步行速度世界纪录（Unitree Official）", url: "https://www.unitree.com/h1/" },
      },
    },
    {
      id: "battery_life",
      label: "电池续航时间",
      type: "concept",
      details: {
        summary: "单次充满电后，机器人能连续执行重度工作的时间，直接决定了其能否实现两班倒工作制。",
        key_concepts: ["待机时间", "快充"],
        source: { type: "conversation" },
      },
    },
    {
      id: "weight_dimensions",
      label: "整机重量与尺寸",
      type: "concept",
      details: {
        summary: "人形机器人的身高、体重和外形尺寸参数，不是单纯的「造型设计」，而是直接影响安全性、场景适配性、运动性能和制造成本的核心工程约束。主流设计锚定「成年男性」尺寸（身高 1.6–1.8 m，体重 50–75 kg），核心目标是在满足负载要求的前提下极限轻量化。",
        analogy: "就像赛车设计——车越轻，同样的发动机功率能跑越快、刹车越灵、能耗越低，但减重不能牺牲结构强度。人形机器人的减重逻辑一样：轻了跌倒冲击小（安全）、步速快（效率）、电池撑得久（续航），但不能轻到承受不了工作负载。",
        facts: [
          { label: "特斯拉 Optimus Gen 2", value: "身高 1.73 m，整机重量 57 kg（比 Gen 1 减重 10 kg），是减重工程的标杆案例" },
          { label: "宇树 H1", value: "身高 1.8 m，整机重量 47 kg（含电池），功率密度极高" },
          { label: "波士顿动力 Atlas（电动版）", value: "身高 1.5 m，整机约 89 kg，重但极度紧凑，专注高动态运动" },
          { label: "傅利叶 GR-1", value: "身高 1.65 m，整机 55 kg，设计风格极简工业风" },
          { label: "身高设计原则", value: "需能操作人类工作台（高 0.8–1.0 m）、进出标准门（宽 0.9 m）、上下楼梯（步距约 27 cm），这三个约束基本锁定了 1.6–1.8 m 的身高区间" },
          { label: "减重主要手段", value: "碳纤维/铝合金一体化结构件、中空杆件设计、执行器集成化（把电机+减速器+编码器塞进同一个关节模组）" }
        ],
        notes: "重量的影响远不止「搬运时费不费力」，它是一个牵一发动全身的系统参数：① 安全性：跌倒时 E = ½mv²，57 kg 从 1 m 高跌落的冲击能约等于 280 J，若砸到人体要害可致命，这是 ISO 10218 工业机器人安全标准要求的核心考量；② 运动性能：轻 = 相同电机力矩能产生更大加速度 = 步速更快、步态更灵活；③ 续航：自重越轻，支撑自身行走的能耗越低，电池利用率越高；④ 运输部署：超过 50 kg 的设备在很多国家需要专业叉车搬运，上架和维修也更复杂。仿人尺寸不是审美选择，是对人类既有世界（门、楼梯、工作台、车辆座舱）的工程适配。",
        key_concepts: ["轻量化设计", "碳纤维结构件", "仿人尺寸工程逻辑", "跌倒安全冲击能", "场景适配性"],
        source: { type: "blog", title: "Tesla Optimus Gen 2 发布（Tesla AI Day 2023）", url: "https://www.tesla.com/AI" },
      },
    },
    {
      id: "bom_cost_mass_prod",
      label: "BOM成本与量产分析",
      type: "concept",
      details: {
        summary: "物料清单（Bill of Materials）成本是制造一台机器人所有零部件的直接材料总价，是判断人形机器人能否在经济上取代人工的核心财务指标。量产则是通过规模效应将 BOM 成本系统性压低的唯一路径。",
        analogy: "就像智能手机：初代 iPhone 2007 年 BOM 约 200 美元，单台定价 599 美元；2010 年代中期随着芯片规模量产，BOM 降至 200 美元以内，手机才实现真正的大众普及。人形机器人正处于「第一代 iPhone」阶段——BOM 还太高，但量产飞轮已开始转动。",
        facts: [
          { label: "当前行业 BOM 区间", value: "研发版 10–30 万元人民币；量产目标主流厂商锁定 2–5 万元" },
          { label: "宇树 G1 标价", value: "9.9 万元人民币起，是全尺寸人形首个破 10 万以内的产品，成本标杆意义巨大" },
          { label: "特斯拉 Optimus 目标", value: "长期将整机 BOM 压至 2 万美元（约 14 万元）以下，对标熟练工人年薪" },
          { label: "经济可行性临界点", value: "整机全生命周期总拥有成本（TCO） / 服役年限 < 所替代人工年薪；中国制造场景大致对应 BOM < 5 万元、寿命 > 5 年" },
          { label: "三大成本黑洞", value: "行星滚柱丝杠 + 谐波减速器 + 六维力传感器，合计占整机 BOM 的 50%–65%" }
        ],
        notes: "BOM 成本分析的本质是「回收期计算」：（BOM成本 + 部署成本 + 5年维护费）/ 年均节省人工费用 = 投资回报周期（IRR）。对大多数工业客户而言，回收期需在 2–3 年以内才会批量采购。以2026年中国沿海制造业为参考：熟练工人年综合成本约 12–18 万元，机器人需全年三班倒（效率系数约 1.5×），则 BOM + TCO 需低于 25 万元才具备替代经济性。国内产业共识是：2027 年前后实现 3–5 万元 BOM 区间，是人形机器人从「工厂样品」走向「产线标配」的历史性拐点。降本路径有三条：① 关键零部件国产替代（如绿的谐波取代哈默纳科）；② 借力新能源车供应链（电机、电池、铸件已有成熟体系）；③ 通过万台/十万台级订单摊薄模具和研发摊销。",
        key_concepts: ["BOM物料清单", "全生命周期TCO", "回收期测算", "规模效应", "国产替代", "车机复用供应链", "量产临界点"],
        source: { type: "conversation" },
      },
    },
    {
      id: "component_cost_breakdown",
      label: "零部件成本占比",
      type: "concept",
      details: {
        summary: "目前行星滚柱丝杠、谐波减速器和六维力传感器占据了整机超60%的成本，是降本核心攻坚区。",
        key_concepts: ["降本痛点", "价值分布"],
        source: { type: "conversation" },
      },
    },
    {
      id: "scaling_reduction",
      label: "规模化降本路径",
      type: "concept",
      details: {
        summary: "通过万台、十万台级别的订单，摊薄前期高昂的模具费和研发费，复用新能源车供应链。",
        key_concepts: ["规模经济", "车机复用"],
        source: { type: "conversation" },
      },
    },
    {
      id: "yield_rate",
      label: "良品率控制",
      type: "concept",
      details: {
        summary: "在从小批量手工装配向全自动产线过渡时，保证复杂关节模组装配良率的质量管理体系。",
        key_concepts: ["制程能力", "品控"],
        source: { type: "conversation" },
      },
    },
    {
      id: "supply_chain_maturity",
      label: "供应链成熟度",
      type: "concept",
      details: {
        summary: "上游供应商能否稳定交出符合人形机器人特殊要求（如超小体积高功率）非标定制件的能力。",
        key_concepts: ["配套生态", "国产替代"],
        source: { type: "conversation" },
      },
    },
    {
      id: "commercialization_path",
      label: "商业化路径与挑战",
      type: "concept",
      details: {
        summary: "人形机器人从实验室 Demo 走向大规模商业落地，需要同时攻克技术、成本、数据、安全、法规五道关卡。当前行业共识是「先工业 → 再商业服务 → 最后家庭」的三步走路径，2026 年整体仍处于第一步的早期验证阶段。",
        analogy: "就像智能手机在 2007 年初代 iPhone 发布时：技术可行、但电池不够用、App 生态没建立、普通人买不起。人形机器人现在处于「2007 年的智能手机时刻」——可以 Demo，但要真正改变世界还需要 3–5 年的系统性基础设施建设。",
        facts: [
          { label: "三步走路线图", value: "① 结构化工业场景（汽车工厂/仓储，2024–2027）→ ② 半结构化商业服务（零售/医疗/展览，2027–2030）→ ③ 非结构化家庭环境（2030+）" },
          { label: "当前最成熟落地", value: "汽车工厂（Figure 02 在宝马 Spartanburg 工厂连续运行 11 个月，参与生产 30,000+ 辆 BMW X3）、国内演艺表演、科研教育" },
          { label: "商业模式主流形态", value: "① RaaS（Robot as a Service）租赁订阅制，按月收费，降低客户一次性采购门槛；② 直接销售 + 软件订阅；③ 数据服务（卖部署数据给模型公司）" },
          { label: "五大核心挑战", value: "① B 端场景 ROI 验证（本节点子树）② 高质量训练数据稀缺 ③ 物理交互安全标准 ④ 法律责任归属空白 ⑤ BOM 成本降至 5 万元以内" },
          { label: "行业预测节点", value: "IDC 预测：2026 年全球人形机器人出货约 2–5 万台，2028 年突破 10 万台，2030 年达到 100 万台量级（前提是 BOM 成本降至 2 万美元以内）" }
        ],
        notes: "商业化路径的本质是一个「飞轮启动」问题：需要真机部署数据才能改善模型 → 需要改善模型才能让客户愿意买单 → 需要客户买单才能筹到资金继续部署 → 形成正向飞轮。当前最大障碍是「第一圈飞轮」启动前的死亡谷：技术不够好 → 客户不愿付真实价格 → 没有足够收入做研发 → 技术不够好。少数厂商通过「亏本 pilot」或「科研教育市场现金流」硬撑过了这一阶段。",
        key_concepts: ["三步走路线图", "RaaS 订阅制", "商业化飞轮", "工业优先策略", "死亡谷"],
        source: { type: "blog", title: "Figure 02 在宝马工厂 11 个月部署总结（Figure AI 官方）", url: "https://www.figure.ai/news/production-at-bmw" },
      },
    },
    {
      id: "b2b_validation",
      label: "B端场景商业验证",
      type: "concept",
      details: {
        summary: "B 端商业验证是指在真实客户的生产环境中运行足够长时间（通常 3–12 个月），用实测数据证明机器人在「任务成功率、稳定运行时长、故障率、ROI 回收周期」四项核心指标上达到客户可接受门槛，从而完成从「实验室 Demo」到「签采购合同」的关键跨越。",
        analogy: "就像新药上市前的临床三期试验——实验室数据再好看，不经过真实场景的长时间验证，没有任何客户会签大额合同。B 端验证是机器人行业的「三期临床」，不可跳过。",
        facts: [
          { label: "最具说服力的案例", value: "Figure 02 在宝马 Spartanburg 工厂：2024 年 10 月上线，连续运行 10 个月，每天 10 小时不间断，累计装载 90,000+ 个钣金件，参与生产 30,000+ 辆 BMW X3（Figure AI 官方数据，2025）" },
          { label: "BMW 验证升级路径", value: "Figure 02（钣金装载，2025）→ Figure 03（物流排序，2026），BMW 已称 Spartanburg 工厂为「人形机器人制造的发源地」" },
          { label: "国内验证案例", value: "优必选 Walker X 进入东风新能源、蔚来车间；傅利叶 GR-1 进入汽车总装线实训；国家电网已批量采购 8500 台人形机器人用于带电作业" },
          { label: "B 端验证四项核心指标", value: "① 任务成功率 ≥ 95% ② MTBF（平均无故障时间）≥ 200 小时 ③ 投资回收期 ≤ 3 年 ④ 人工干预率 ≤ 5%（每 100 次操作需人工介入次数）" },
          { label: "验证周期现状", value: "行业共识：从首台机器人进厂到签订批量采购合同，通常需要 6–18 个月验证期；宝马与 Figure 从签协议到全量部署花了约 11 个月" }
        ],
        notes: "B 端验证最难的不是技术，而是「持续运行稳定性」。机器人在实验室里偶尔成功率 99% 不算本事，在工厂每天连续 10 小时、面对轻微地面振动、光线变化、气温波动、不同班次工人操作习惯，维持稳定才是真本事。Figure 02 从上线到稳定交付经历了约 4 个月调试期，这 4 个月的踩坑数据直接重塑了 Figure 03 的硬件架构（重新设计腕部电子系统、消除动态电缆）。对初创公司来说，B 端验证也是最烧钱的阶段——在客户工厂常驻工程师团队的成本，往往高于机器人本身的 BOM 成本。",
        key_concepts: ["MTBF 稳定性", "ROI 回收周期", "试点验证", "从 Demo 到合同", "持续运行可靠性"],
        source: { type: "blog", title: "Figure 02 在宝马 Spartanburg 11 个月部署报告（Figure AI Official）", url: "https://www.figure.ai/news/production-at-bmw" },
      },
    },
    {
      id: "data_scarcity",
      label: "高质量数据集稀缺",
      type: "concept",
      details: {
        summary: "训练 VLA 机器人策略模型，需要海量「在真实机器人上完成真实任务」的多模态演示数据（视觉+本体感知+动作序列），但这类数据的采集成本极高、规模极小，是当前具身智能最大的基础性瓶颈。",
        analogy: "自动驾驶公司可以让测试车 24 小时上路采数据，一辆车一天能跑几百公里；但人形机器人要采集「洗碗」任务的数据，需要人工遥操作一步一步演示，一个任务 10 分钟、一条数据几十美元——这就是为什么自动驾驶数据以亿计、机器人数据以千计。",
        facts: [
          { label: "Open X-Embodiment（OXE）数据集", value: "Google DeepMind 牵头，汇聚来自全球 34 个机器人实验室、22 种机器人平台的 100 万+ 条真实操作轨迹，是目前最大的开源机器人数据集（2023 年发布）" },
          { label: "OXE 的结构性问题", value: "数据极度不平衡：85% 以上的轨迹来自 4 种机器人（Franka/xArm/Kuka/Google Robot），其余 18 种机器人数据极少，导致新机器人需要大量 Fine-tune" },
          { label: "DROID 数据集", value: "斯坦福等 18 所机构联合发布，76,000 条接触密集型灵巧操作轨迹，质量显著高于 OXE（2024 年）" },
          { label: "遥操作数据成本", value: "采集一条高质量演示数据约需 5–30 美元（操作员薪资+设备损耗），百万条数据成本高达千万美元级别" },
          { label: "合成数据补充方案", value: "NVIDIA Isaac Lab、Google AutoRT（每天可在办公室自动生成约 77,000 条轨迹）、Physical Intelligence 内部遥操作数据语料——多方估计 2026 年中有效训练数据规模已逼近 500 万条" },
          { label: "数据飞轮逻辑", value: "「真机部署 → 收集真实失败数据 → 改进模型 → 再部署」的飞轮是解决数据稀缺的长期出路，也是为何 B 端早期部署战略意义远超短期收入的原因" }
        ],
        notes: "数据稀缺问题的深层原因是「物理世界的长尾」：语言有 Wikipedia（数十亿文档）、视觉有 ImageNet（千万图片），但物理操作任务天然长尾——「用右手拧松锈蚀螺丝」这个动作在现实中罕见，永远无法靠爬取互联网解决。目前三条解题路径各有取舍：① 合成数据（便宜快，但 sim-to-real gap 导致泛化差）② 大规模遥操作（高质量，但成本极高）③ 人类视频蒸馏（GROOT 用的路子，无需机器人动作标注，但需要跨模态对齐技术）。这三条路并行推进，没有银弹。",
        key_concepts: ["Open X-Embodiment", "遥操作数据采集", "合成数据", "数据飞轮", "物理世界长尾", "跨平台泛化"],
        source: { type: "paper", title: "Open X-Embodiment: Robotic Learning Datasets and RT-X Models（Google DeepMind, 2023）", url: "https://arxiv.org/abs/2310.08864" },
      },
    },
    {
      id: "physical_safety",
      label: "物理交互安全性",
      type: "concept",
      details: {
        summary: "人形机器人与人类在同一空间协作或靠近时，如何从硬件、软件、标准（外部制定的准入规则）三个层面保证即便 AI 系统出错、网络延迟、甚至软件崩溃，机器人也不会对人体造成不可逆伤害。这是人形机器人进入工厂和家庭的法律与伦理准入门槛。",
        analogy: "就像汽车的安全气囊和防抱死刹车——不是为了让汽车「更智能」，而是为了保证最坏情况下不死人。机器人安全设计的核心逻辑是「即便 AI 全线崩溃，机械层面也要保证安全」，软件不能是最后一道防线。",
        facts: [
          { label: "核心国际标准", value: "ISO 10218-1/2:2025（工业机器人安全要求，2025 年 2 月更新发布），原 ISO/TS 15066（协作机器人）内容已并入该标准，删除「协作机器人」术语，改为以「协作应用场景」为单位进行安全评估" },
          { label: "四大安全技术机制", value: "① 速度与力矩监控（SSM）：超限自动停机 ② 手部引导控制（HGC）：识别人类接触意图 ③ 功率与力限制（PFL）：物理接触力不超过人体组织损伤阈值 ④ 安全 PLC：独立于主控系统的硬件安全回路" },
          { label: "人体伤害阈值参数", value: "ISO 10218-2:2025 规定：与人体接触时，关节部位最大接触力 ≤ 280N，碰撞压强 ≤ 210N/cm²；头部接触能量 ≤ 10J（低于颅骨骨折临界值）" },
          { label: "Figure 03 安全升级", value: "相比 Figure 02，Figure 03 专门增加了柔性软质外壳包裹（减少碰撞刚性）、触觉传感器（感知接触意图）、无线充电（减少线缆绊倒风险），是 B 端工厂安全验证后的直接工程响应" },
          { label: "中国标准进展", value: "GB/T 12643-2013（工业机器人安全标准）正在修订中，参照 ISO 10218:2025；工信部 2025 年发布《人形机器人创新发展指导意见》要求建立专用安全评测体系" }
        ],
        notes: "物理安全的设计哲学是「纵深防御（Defense in Depth）」：① 最外层：机械硬限位（物理上关节不可能到达危险角度）② 第二层：安全 PLC 实时力矩监控（独立于主控 CPU，毫秒级响应）③ 第三层：AI 感知碰撞预测（识别危险轨迹提前减速）④ 最内层：软件急停指令。越靠近核心的层越不能依赖软件，越外层可以由 AI 增强但不能替代底层保障。家庭场景比工厂场景安全要求高一个数量级——工厂夹坏零件是质量事故，家里夹伤小孩是刑事案件，这也是为什么产品路线是「先工业后家庭」的根本原因之一。",
        key_concepts: ["ISO 10218:2025", "纵深防御", "安全 PLC", "功率与力限制 PFL", "协作应用场景", "人体伤害阈值"],
        source: { type: "blog", title: "ISO 10218:2025 修订解读（IDEC USA）", url: "https://www.idec.com/en-us/blog/iso-10218-updates-revisions-background-part-2" },
      },
    },
    {
      id: "legal_ethical",
      label: "法律与伦理规范",
      type: "concept",
      details: {
        summary: "人形机器人不是一个单独的法律类别——它同时落在 AI 监管、产品安全、产品责任、数据保护、网络安全五套法律框架的交叉地带。核心法律问题是：当机器人造成伤害时，责任由谁承担（本体厂/模型公司/集成商/使用方），以及如何用法律工具激励各方在设计阶段就做好安全。",
        analogy: "就像第一批无人驾驶汽车上路时的法律困境——现有交通法假设驾驶员是人，自动驾驶出事谁担责？人形机器人面临同样的「法律真空」：现有产品责任法假设产品行为可预测，但 AI 模型的决策不可完全预测，传统法律框架需要重写。",
        facts: [
          { label: "EU AI Act（欧盟 AI 法案，2024/1689）", value: "2024 年 6 月正式生效；工作场所、安全关键领域使用的人形机器人被列为「高风险 AI 系统」，要求风险评估、技术文档、人类监督、事后监控；高风险义务条款 2027 年 8 月起强制执行" },
          { label: "EU 新产品责任指令（PLD 2024/2853）", value: "将责任明确扩展到软件和 AI 系统；机器人制造商对产品缺陷承担严格无过错责任（不需证明过失），须于 2026 年 12 月 9 日前在欧盟各国立法转化" },
          { label: "责任链分配逻辑", value: "本体厂商负责硬件安全 → 模型/软件厂商负责 AI 决策安全 → 系统集成商负责部署配置合规 → 使用方（企业客户）负责操作规程。任何一方的「重大修改」都可能重新触发合规义务（EU AI Act Art. 25）" },
          { label: "中国监管进展", value: "工信部 2023 年发布《人形机器人创新发展指导意见》；2025 年国标委启动人形机器人专项安全标准制定；目前整体仍处于「鼓励发展优先、监管标准待建」阶段，比欧盟宽松约 2–3 年" },
          { label: "伦理核心争议", value: "① 自主决策边界：机器人可以「自主」做到什么程度才需人类确认？② 数据隐私：机器人采集的家庭环境视频数据归谁所有？③ 就业替代：大规模替代劳动力的社会补偿机制如何设计？" }
        ],
        notes: "法律滞后于技术是人形机器人行业的系统性风险：一旦发生重大伤亡事故，监管机构可能出台过于严苛的限制性法规，重创整个行业（参考 2016 年三星 Note 7 爆炸事件对整个手机行业电池监管的冲击）。因此头部厂商（Figure、波士顿动力）普遍采取「主动合规+参与标准制定」策略，宁愿自己定标准也不让政府定标准。在责任归属上，「设计缺陷 vs 使用缺陷 vs 指令缺陷」的三分法是当前学界讨论 AI 责任的主流框架，但在具体人形机器人案例中如何界定仍无定论。",
        key_concepts: ["EU AI Act 高风险分类", "产品责任指令 PLD", "严格无过错责任", "责任链分配", "监管滞后风险", "主动合规策略"],
        source: { type: "blog", title: "Physical AI 监管框架解读（Osborne Clarke 律所，2025）", url: "https://www.osborneclarke.com/insights/beyond-software-regulatory-framework-physical-ai-and-ai-robotics" },
      },
    },

    // ── ROS 子树 ──
    {
      id: "ros",
      label: "ROS",
      type: "technology",
      details: {
        zh_label: "Robot Operating System",
        summary: "机器人领域事实标准的软件中间件框架，提供节点通信、传感器抽象、工具链和丰富的开源算法包，是串联感知、控制与执行的「操作系统」。",
        analogy: "像 iOS 之于 iPhone——硬件厂商不需要从零写驱动和通信协议，各模块基于同一套标准接口互相对话，应用生态因此爆发。",
        notes: "ROS 2 已取代 ROS 1（后者已 EOL），基于 DDS 实现实时通信，支持多机器人协同。Unitree、Agility 等主流机器人厂商均提供 ROS 2 SDK。",
        key_concepts: ["话题/服务/动作", "节点通信", "硬件抽象", "开源生态"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ros2",
      label: "ROS 2",
      type: "technology",
      details: {
        zh_label: "Robot Operating System 2",
        summary: "ROS 的现代化版本，基于 DDS 通信中间件，原生支持实时性、多机器人协同和嵌入式平台，是当前工业与人形机器人的部署标准。",
        key_concepts: ["DDS", "实时通信", "多机器人", "嵌入式支持"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ros_navigation",
      label: "Nav2 导航栈",
      type: "technology",
      details: {
        zh_label: "Navigation2",
        summary: "ROS 2 的标准自主导航框架，整合地图、SLAM、路径规划与障碍物回避，是机器人从 A 点走到 B 点的完整解决方案。",
        key_concepts: ["路径规划", "障碍物回避", "行为树"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ros_moveit",
      label: "MoveIt",
      type: "technology",
      details: {
        zh_label: "MoveIt Motion Planning Framework",
        summary: "ROS 生态中机械臂与多关节运动规划的事实标准框架，提供逆运动学求解、碰撞检测和轨迹优化，人形机器人手臂控制的核心工具。",
        key_concepts: ["逆运动学", "碰撞检测", "轨迹规划"],
        source: { type: "conversation" },
      },
    },
    {
      id: "urdf_xacro",
      label: "URDF / XACRO",
      type: "technology",
      details: {
        zh_label: "Unified Robot Description Format",
        summary: "描述机器人物理结构（关节、连杆、质量、碰撞体）的 XML 格式，是仿真器和 ROS 加载机器人模型的通用语言，相当于机器人的\"设计图纸\"。",
        analogy: "像 CAD 图纸——工厂要造这台机器人之前，必须先有一份完整描述每个关节位置和质量的数字模型。",
        key_concepts: ["关节定义", "物理参数", "仿真导入"],
        source: { type: "conversation" },
      },
    },

    // ── 具身 Agentic OS 子树 ──
    {
      id: "agentic_os",
      label: "具身 Agentic OS",
      type: "concept",
      details: {
        zh_label: "Embodied Agentic Operating System",
        summary: "2026 年具身智能最前沿的软件范式——专为人形机器人设计的「物理世界原生智能体操作系统」。核心逻辑是把计算负载从「写死流程的传统软件」转向「感知-反思-规划-执行闭环的智能体负载」：大脑（认知大模型）与小脑（运动控制）深度交融，使机器人具备像人一样「边想边干、自主规划」的能力，而非逐步点击按钮触发预设动作序列。",
        analogy: "传统机器人软件像「遥控器+脚本播放器」——PM 要设计「点按钮→前进 2 米→机械臂下降 10 公分→抓取」的固定流程。Agentic OS 像 iOS/Android 之于手机：Figure Helix、OpenVLA 等是强大的「App 级模型」，而 Agentic OS 是承载无数 Agent 的系统平台——用户只需一句「帮我把桌上的水杯拿给客人」，系统自行拆解长周期任务并调度技能执行。代表产品：逐际动力 LimX COSA（2026.01）、荣耀 Agentic OS（手机端同范式延伸）。",
        facts: [
          { label: "范式转变", value: "操作系统从「应用容器（App Container）」→「智能体舞台（Agent Stage）」；不再为机器人写死程序，而是构建具备自主闭环的神经系统" },
          { label: "四大核心能力", value: "① 意图驱动交互（Intent-Driven）② 空间语义记忆（Semantic Memory）③ 大小脑实时协同（Loco-Manipulation）④ 原生技能库（Skill-ized Sandbox）" },
          { label: "与传统 ROS 栈对比", value: "传统：感知→规划→控制串行流水线，中间遇障易死机；Agentic OS：高层认知与低延迟运控实时耦合，执行中可反思、重规划、再执行" },
          { label: "代表实现", value: "逐际动力 LimX COSA（人形机器人，2026.01）· Figure Helix（模型 App 级，非完整 OS）· 荣耀 Agentic OS（消费电子端 Agent 原生 OS，2026）" },
          { label: "PM 核心定义域", value: "系统边界与优先级管理 · 安全防火墙（AgentSecCore）· 人机多模态交互直觉体验 · 技能库标准化接口 · 失败容错与自主重试策略" },
          { label: "与 VLA 的关系", value: "VLA 是「给定指令→输出动作」的策略模型；Agentic OS 是调度 VLA、技能、记忆、运控的系统层——两者互补而非替代" }
        ],
        notes: "2026 年行业趋势正从「卷单个模型能力」转向「卷 OS 系统能力」——模型再强，没有 OS 层的任务拆解、记忆检索、大小脑耦合和技能编排，仍只能做 Demo 级短任务。Agentic OS 是具身智能从实验室走向产品交付的关键基础设施：碳基人类给出模糊意图，硅基机器人通过 OS 层完成安全、无缝的物理世界落地。COSA 的战略定位类比：Helix 是一个强大的 App，COSA 是 Android/iOS 级别的系统平台。",
        key_concepts: ["Agentic Native", "感知-反思-规划-执行闭环", "意图驱动", "大小脑融合", "物理世界原生", "技能库编排", "AgentSecCore"],
        source: { type: "blog", title: "LimX COSA 发布（逐际动力，2026.01）", url: "https://www.limxdynamics.com/zh/news/BK000054" },
      },
    },
    {
      id: "brain_cerebellum_integration",
      label: "大小脑融合架构",
      type: "concept",
      details: {
        zh_label: "Brain-Cerebellum Integration",
        summary: "具身 Agentic OS 的核心设计理念——将 LLM 级别的高层认知（大脑）与全身实时运控基础模型（小脑）紧密耦合为三层软件架构，实现 Loco-Manipulation（移动+操作）场景下的「边想边干」：爬楼梯、复杂地形行走时，软件一边实时调整步态平衡（WBC/MPC），一边根据视觉反馈调整抓取力度，而非「大脑想完再发给小脑」。",
        analogy: "传统机器人是「先大脑写好全套计划，再发指令给小脑执行」——中间突然出现障碍物就容易死机或摔倒。大小脑融合是「大脑想到哪、小脑动到哪」：小脑层的实时感知同步反馈给大脑修正计划，大脑的新决策毫秒级影响小脑动作，形成双向耦合。",
        facts: [
          { label: "三层架构", value: "底层：小脑运控层（实时平衡/步态）→ 中层：技能对齐层（语义→动作编排）→ 顶层：认知决策层（意图解析/长程规划/记忆）" },
          { label: "关键突破", value: "上层决策能实时影响底层动作；底层感知能同步反馈给上层修正计划——打破传统串行「规划→执行」延迟" },
          { label: "容错与自主重试", value: "抓取滑落时 Agent 自主反思→重新规划抓取姿态→再次尝试，而非报错罢工；PM 需定义重试次数、安全边界与降级策略" },
          { label: "典型技术栈", value: "小脑层依赖 WBC/MPC/RL 运控基础模型；技能层调用 VLA；认知层集成 NLU 与语义记忆" }
        ],
        notes: "Loco-Manipulation 是大小脑融合最难也最有价值的场景：人形机器人必须在移动中操作（边走边拿、边爬边抓），这要求认知规划与低延迟运控在同一时钟周期内协同。逐际动力 COSA 在 Oli 机器人上实现了 30 度斜坡稳定行走 + 实时任务调整，是该架构的 early reference implementation。",
        key_concepts: ["三层架构", "Loco-Manipulation", "实时反馈耦合", "自主重试", "运控与认知对齐"],
        source: { type: "blog", title: "LimX COSA 发布", url: "https://www.limxdynamics.com/zh/news/BK000054" },
      },
    },
    {
      id: "cerebellum_motion_layer",
      label: "小脑层：运控基础模型",
      type: "technology",
      details: {
        zh_label: "Cerebellum Foundation Model",
        summary: "大小脑融合架构的底层，基于强化学习训练的全身实时运动控制基础模型，负责平衡、步态适应和动态姿势调整，相当于机器人的「脊髓反射」层——在 Agentic OS 中承担 Loco-Manipulation 的「边干」部分，与顶层认知的「边想」实时耦合。",
        facts: [
          { label: "核心职责", value: "实时平衡 · 步态适应 · 动态姿势调整 · 复杂地形（斜坡/楼梯）通过 · 抓取过程中的力控微调" },
          { label: "控制频率", value: "通常 500Hz–1kHz 级运控循环，远高于 VLA 推理的 10–50Hz——这是「小脑必须快」的根本原因" },
          { label: "技术依赖", value: "WBC（全身控制）· MPC（模型预测控制）· RL 运控基础模型 · Sim2Real 迁移" },
          { label: "COSA 实测", value: "逐际动力 Oli 在 COSA 小脑层支持下，可在 30 度斜坡上稳定行走并同步响应上层任务调整" }
        ],
        notes: "小脑层是 Agentic OS 的「硬实时底座」——认知层可以慢思考（秒级任务规划），但小脑必须在毫秒级响应失衡和接触力变化。当高层认知发出「去抓那个杯子」指令时，小脑层同时负责走过去（步态）和伸手抓（力控），并根据视觉反馈实时调整抓取力度，无需等大脑重新规划完整路径。",
        key_concepts: ["实时运动控制", "强化学习", "WBC/MPC", "力控微调", "硬实时底座"],
        source: { type: "conversation" },
      },
    },
    {
      id: "skill_alignment_layer",
      label: "技能层：大小脑对齐",
      type: "technology",
      details: {
        zh_label: "High-Level Skill Alignment Layer",
        summary: "大小脑融合架构的中层枢纽，也是 Agentic OS「原生技能库（Skill-ized Sandbox）」的载体——将导航、抓取、开门、避障等基础能力封装为开箱即用的 Skill 模块，Agent 像调用 API 一样根据场景自主组合；同时负责把大模型的抽象语义指令转化为小脑能执行的具体动作序列。",
        analogy: "像大脑皮层的运动区 + App Store 的技能货架——「帮我把水杯拿给客人」被拆解为「Navigate(前台) → Detect(水杯) → Grasp(轻握) → Navigate(客人) → Handover(递出)」五个 Skill 动态串联，每个 Skill 有标准化输入/输出接口，失败时可单独重试而不崩溃整条链路。",
        facts: [
          { label: "Skill 模块示例", value: "Navigate（导航）· Grasp（抓取）· OpenDoor（开门）· AvoidObstacle（避障）· ClimbStairs（爬楼梯）· Handover（递送）" },
          { label: "与传统开发对比", value: "传统：每个新动作重新写代码、重新调教；Agentic OS：Skill 一次封装、Agent 多次组合，降低长尾任务的开发成本" },
          { label: "标准化接口", value: "每个 Skill 定义统一的状态机接口（输入：目标/约束；输出：成功/失败/部分完成），PM 负责技能库的产品化管理和版本迭代" },
          { label: "与 VLA 关系", value: "部分 Skill 内部由 VLA 模型驱动（如 Grasp），技能层负责调度时机、参数传递和失败降级" }
        ],
        notes: "技能层是 Agentic OS 可扩展性的关键——厂商可以持续向技能库添加新能力（如「拧瓶盖」「叠衣服」），Agent 无需重新训练即可组合调用。这类似智能手机 OS 上的 SDK/API 生态：系统提供标准接口，第三方开发者和本体厂商共建技能市场。",
        key_concepts: ["Skill-ized Sandbox", "技能模块化", "标准化 API", "动态任务编排", "VLA 调用", "失败降级"],
        source: { type: "conversation" },
      },
    },
    {
      id: "cognitive_planning_layer",
      label: "认知层：规划与记忆",
      type: "technology",
      details: {
        zh_label: "Cognitive & Decision Layer",
        summary: "大小脑融合架构的顶层，承载 Agentic OS 的「意图驱动交互」与「空间语义记忆」两大能力——基于 Transformer 架构，负责将用户一句模糊自然语言拆解为 Long-horizon 多步任务（行为树/任务图），构建持久三维世界观，并在执行中动态调整优先级与边界。",
        facts: [
          { label: "意图驱动交互", value: "用户：「帮我把桌上的水杯拿给客人」→ 系统自主拆解：① 定位水杯 ② 规划路线 ③ 抓取 ④ 导航至客人 ⑤ 递送；PM 定义拆解粒度、优先级与不可逾越的安全边界" },
          { label: "空间语义记忆", value: "机器人走过办公室后，后台持久化三维语义地图——「1 号桌坐的是王总」「2 号桌放着打印机」「上次在 3 号桌看到笔记本电脑」；支持「把我的电脑拿过来」时主动检索历史坐标" },
          { label: "记忆检索机制", value: "空间-物体-事件三元组存储 · 时间衰减与置信度更新 · 与实时视觉交叉验证（记忆坐标 vs 当前观测）" },
          { label: "动态优先级", value: "执行长任务中可响应新指令（「等一下，先帮我开门」）或安全事件（人靠近→暂停当前任务）——PM 定义打断规则与恢复策略" }
        ],
        notes: "认知层集成 NLU（自然语言理解），是 Agentic OS 面向用户的「大脑前台」。与传统「摄像头拍到什么就是什么」的被动感知不同，语义记忆让机器人具备主动检索能力——不必每次都重新扫描全屋找电脑，而是先查记忆库、再定向导航验证。这是 Long-horizon 任务（跨房间、跨时段）可行性的前提。",
        key_concepts: ["意图驱动", "Long-horizon Planning", "语义记忆", "行为树拆解", "动态优先级", "NLU 集成"],
        source: { type: "conversation" },
      },
    },
    {
      id: "limx_cosa",
      label: "LimX COSA",
      type: "product",
      details: {
        zh_label: "LimX COSA（Cognitive OS of Agents）",
        summary: "逐际动力于 2026.01.12 发布的具身 Agentic OS，全称 Cognitive OS of Agents，是全球首个为人形机器人量身打造的物理世界原生 Agentic OS——实现大小脑实时深度融合，搭载 Oli 全尺寸人形机器人，支持「边思考边干活」。",
        analogy: "COSA 之于 Oli，如同 iOS 之于 iPhone；Figure Helix 是强大的「模型 App」，COSA 是「系统平台」——后者调度前者及其他技能/运控模块，而非替代它们。",
        facts: [
          { label: "发布方", value: "逐际动力（LimX Dynamics）" },
          { label: "发布时间", value: "2026 年 1 月 12 日" },
          { label: "架构", value: "三层：小脑运控 / 技能对齐 / 认知决策，实时大小脑耦合" },
          { label: "搭载机器人", value: "Oli 全尺寸人形机器人" },
          { label: "四大能力落地", value: "意图驱动任务拆解 · 空间语义记忆 · Loco-Manipulation 实时协同 · 模块化 Skill 库" },
          { label: "生态关联", value: "同厂开源 FluxVLA Engine（2026.04）提供 VLA 训练部署底座，COSA 负责上层 Agent 调度" }
        ],
        notes: "COSA 是 2026 年国内 Agentic OS 路线的标杆产品，标志着具身智能竞争从「单模型能力」进入「系统 OS 能力」阶段。与 Figure Helix 的差异：Helix 侧重端到端 VLA 推理（模型 App），COSA 侧重 OS 层的任务规划、记忆、技能编排与大小脑耦合（系统平台）——两者定位互补，行业长期趋势是「强模型 + 强 OS」双核。",
        key_concepts: ["逐际动力", "Agentic OS", "Oli 搭载", "大小脑融合", "2026.01", "系统平台"],
        source: { type: "blog", title: "LimX COSA 发布", url: "https://www.limxdynamics.com/zh/news/BK000054" },
      },
    },

    // ── VLA 工程底座与数据工程子树 ──
    {
      id: "vla_engineering_platform",
      label: "VLA 工程底座",
      type: "technology",
      details: {
        zh_label: "VLA Engineering Platform",
        summary: "打通数据处理 → 模型训练 → 仿真评测 → 真机部署全流程的标准化工程平台，以「统一配置、标准接口、模块解耦」为核心设计原则，大幅降低具身智能研发门槛。代表产品：逐际动力开源的 FluxVLA Engine（2026.04）。",
        analogy: "类比 HuggingFace 之于 NLP——把原本高耦合、难复现的一堆训练脚本，统一成一套标准化工程底座，让研究成果能快速从论文变成真机可用的系统。",
        notes: "FluxVLA Engine 兼容 OpenVLA、GR00T、Pi0/Pi0.5 等主流 VLA 模型；支持 Isaac Sim、LIBERO 等仿真器；在 RTX 5090 上 GR00T-N1.5 推理速度达 42.8Hz。",
        key_concepts: ["标准化工程底座", "全链路打通", "模块解耦", "FluxVLA Engine"],
        source: { type: "conversation" },
      },
    },
    {
      id: "flux_vla_engine",
      label: "FluxVLA Engine",
      type: "product",
      details: {
        zh_label: "FluxVLA Engine（开源 VLA 工程底座）",
        summary: "逐际动力于 2026.04.16 开源的具身智能 VLA 工程底座，提供统一配置、标准接口和模块化解耦，覆盖数据处理、模型训练、仿真评测到真机部署的完整闭环。",
        notes: "已上线 GitHub / HuggingFace / ModelScope，并与阿里云 PAI 深度合作。支持 SARM 奖励建模、RTC 实时分块技术、ZMQ 远程推理服务等前沿能力。",
        key_concepts: ["逐际动力", "Apache 2.0 开源", "VLA 全链路", "2026.04"],
        facts: [
          { label: "发布方", value: "逐际动力（LimX Dynamics）" },
          { label: "开源协议", value: "Apache 2.0" },
          { label: "开源时间", value: "2026 年 4 月 16 日" },
          { label: "支持模型", value: "OpenVLA / GR00T / Pi0 / Pi0.5 / LlavaVLA" },
          { label: "支持仿真器", value: "Isaac Sim / LIBERO" },
          { label: "推理加速", value: "Triton 算子融合 / CUDA Graph / CUDA 自定义算子" },
        ],
        source: { type: "blog", title: "FluxVLA Engine 开源", url: "https://github.com/FluxVLA/FluxVLA" },
      },
    },
    {
      id: "teleoperation_system",
      label: "遥操作数据采集",
      type: "technology",
      details: {
        zh_label: "Teleoperation Data Collection",
        summary: "通过人类操作员远程控制机器人手臂完成任务，同步录制关节角度、力矩、视觉流等多模态数据，是训练 VLA 模型的核心原材料收集方式。",
        analogy: "像为自动驾驶标注路测数据一样，遥操作让「人类演示」成为机器人学习的范本——每一次遥操作演示都是一条高质量的训练样本。",
        notes: "代表系统：斯坦福 ALOHA（ACT 架构原型机）、Mobile ALOHA、UMI。数据成本极高（单条高质量数据几十美元），遥操作效率提升是行业关键痛点。",
        key_concepts: ["人类演示数据", "ALOHA", "多模态录制", "数据成本"],
        source: { type: "conversation" },
      },
    },
    {
      id: "sim_to_real_pipeline",
      label: "Sim-to-Real 迁移",
      type: "technology",
      details: {
        zh_label: "Simulation-to-Real Transfer Pipeline",
        summary: "在仿真器中大量训练模型（便宜、安全、可并行），再通过域随机化（Domain Randomization）和适配技术迁移到真实机器人上，是解决真实数据稀缺的核心工程路径。",
        notes: "主要挑战：仿真器的物理特性（摩擦、弹性、视觉纹理）与现实差异（Reality Gap）。解决手段：域随机化（随机化纹理/摩擦参数）、在真机上少量微调（Few-Shot Real World Fine-tuning）。",
        key_concepts: ["域随机化", "Reality Gap", "Isaac Lab", "迁移微调"],
        source: { type: "conversation" },
      },
    },
    {
      id: "edge_inference_opt",
      label: "边缘推理优化",
      type: "technology",
      details: {
        zh_label: "Edge Inference Optimization",
        summary: "「边缘」= 机器人本体上那块算力有限的车载 GPU（如 NVIDIA Jetson Orin），「推理」= 把训练好的 VLA 大模型跑起来预测动作，「优化」= 用各种工程手段让大模型在小芯片上跑得足够快。核心矛盾：VLA 模型动辄 3B–7B 参数，原始推理需要数据中心级 GPU；但机器人要续航 8 小时，只能带一块功耗 60W 以内的边缘芯片。",
        analogy: "就像把《黑神话》这款需要 RTX 4090 才能流畅运行的游戏，硬塞进 Steam Deck 掌机里——需要降画质（量化）、精简渲染管线（算子融合）、预编译场景（CUDA Graph），才能在小设备上勉强流畅。边缘推理优化干的就是这件事，只不过对象换成了 AI 模型，而且对「流畅」的要求更严格（必须 30Hz 以上，不然机器人会抖）。",
        facts: [
          { label: "目标芯片", value: "NVIDIA Jetson AGX Orin（60W，275 TOPS）是当前主流车载方案；部分厂商用双 Orin 提升算力" },
          { label: "原始推理耗时（未优化）", value: "7B 参数 VLA 模型在单 Orin 上约 80–150ms/帧，远超 33ms（30Hz）要求" },
          { label: "TensorRT INT8 量化", value: "把模型权重从 FP32（32位浮点）压缩到 INT8（8位整数），精度损失 <1%，推理速度提升 3–5×，是最常用的第一步优化" },
          { label: "CUDA Graph 捕获", value: "把 GPU 上的计算步骤「录制」成固定执行图，消除每帧的调度开销，可额外提速 10%–30%" },
          { label: "RTC 实时分块（逐际动力自研）", value: "VLA 一次输出一批动作（action chunk），RTC 把这批动作切成更小的块流式输出，让第一个动作更早执行，减少「等 AI 想完了才动」的卡顿感" },
          { label: "ZMQ 远程推理", value: "机器人本地只跑轻量运控，把 VLA 推理任务通过 ZeroMQ 网络协议卸载到附近算力更强的服务器，适合工厂有局域网的场景" }
        ],
        notes: "边缘推理优化是「端到端延迟」指标的直接决定者——所有优化手段都是为了把推理延迟从 100ms+ 压到 ≤33ms。优化的本质是在「模型能力（参数量大→能力强）」和「部署约束（算力小→速度快）」之间找平衡点。当前业界还在探索的方向：模型蒸馏（用大模型教小模型）、稀疏激活（每次推理只激活部分参数）、专用 AI 芯片（如华为昇腾、寒武纪，专为 Transformer 推理优化）。FluxVLA Engine 在 RTX 5090 上实测 GR00T-N1.5 推理速度达 42.8Hz，超过 30Hz 控制频率要求。",
        key_concepts: ["车载边缘 GPU", "TensorRT INT8 量化", "CUDA Graph", "RTC 实时分块", "模型蒸馏", "推理速度 vs 模型能力权衡"],
        source: { type: "paper", title: "FluxVLA Engine 技术文档（逐际动力开源，含边缘推理优化实测数据）", url: "https://github.com/FluxVLA/FluxVLA" },
      },
    },
    {
      id: "data_flywheel",
      label: "数据飞轮",
      type: "concept",
      details: {
        zh_label: "Data Flywheel",
        summary: "真机部署 → 采集真实交互数据 → 训练更强模型 → 部署更多真机的正向增强循环，是人形机器人公司建立长期竞争壁垒的核心机制。",
        analogy: "类比自动驾驶的里程数据飞轮：真机越多，数据越多，模型越强，机器人越好卖，部署量越大……形成持续扩大的护城河。",
        notes: "B端场景（工厂）比B2C更容易启动飞轮，因为工厂环境结构化、任务重复性高，数据采集效率远优于家庭非结构化场景。",
        key_concepts: ["正向增强循环", "数据护城河", "真机部署驱动", "模型迭代"],
        source: { type: "conversation" },
      },
    },

    // ── 机器人软件运营子树 ──
    {
      id: "robot_software_ops",
      label: "机器人软件运营",
      type: "concept",
      details: {
        zh_label: "Robot Software Operations",
        summary: "管理已部署机器人群的软件全生命周期的职能体系，涵盖远程升级、实时监控、健康诊断和开发者生态运营，是软件 PM 区别于硬件 PM 最独特的工作领域。",
        key_concepts: ["OTA 升级", "群管平台", "SDK 生态", "软件全生命周期"],
        source: { type: "conversation" },
      },
    },
    {
      id: "ota_update",
      label: "OTA 在线升级",
      type: "technology",
      details: {
        zh_label: "Over-The-Air Update",
        summary: "无需物理接触，通过网络向已部署的机器人推送系统固件、运控模型、VLA 权重等软件更新的机制，是让机器人持续进化的核心基础设施。",
        analogy: "像智能手机的系统更新推送——工厂里同时运行的 100 台机器人，今晚凌晨 2 点统一升级新版抓取模型，明早开工就用上了更强的能力。",
        notes: "人形机器人的 OTA 比手机更复杂：必须分阶段灰度推送（先 10 台验证，再全量），需要原子回滚能力（更新失败立即回滚到上一版），还需兼容运行中任务不中断的热更新机制。",
        key_concepts: ["灰度推送", "原子回滚", "增量更新", "版本管理"],
        source: { type: "conversation" },
      },
    },
    {
      id: "fleet_management",
      label: "机器人群管平台",
      type: "technology",
      details: {
        zh_label: "Robot Fleet Management",
        summary: "集中监控和管理多台部署机器人的软件平台，提供实时在线状态、任务成功率、异常告警、远程日志、性能趋势等可观测性能力，是 B 端商业化的必备 SaaS 基础设施。",
        analogy: "类比汽车 4S 店的「云端诊断系统」，但实时性要求更高——工厂主管打开 Dashboard 就能看到 50 台机器人各自在执行什么任务、哪台出现了卡顿或报错。",
        key_concepts: ["可观测性", "实时监控", "远程诊断", "告警系统"],
        source: { type: "conversation" },
      },
    },
    {
      id: "robot_sdk",
      label: "开发者 SDK 与开放平台",
      type: "technology",
      details: {
        zh_label: "Robot SDK & Open Platform",
        summary: "本体厂商向第三方集成商和应用开发者开放的软件工具包，提供标准化 API、硬件抽象层（HAL）和技能调用接口，使下游生态能够在机器人上构建专属应用，而不必关心底层运控细节。",
        analogy: "类比 iOS SDK——苹果（本体厂商）提供标准 API，开发者不需要知道 iPhone 芯片的工作原理，只需调用接口就能写出 App。",
        notes: "人形机器人的开发者生态仍处于极早期。谁先建立类似 iOS App Store 的应用生态，谁就能在平台层形成网络效应壁垒。技能市场（Skill Marketplace）是一个高潜力的产品方向。",
        key_concepts: ["硬件抽象层 HAL", "标准化 API", "技能市场", "开发者生态"],
        source: { type: "conversation" },
      },
    },

    // ── 软件层产品指标子树 ──
    {
      id: "software_product_metrics",
      label: "软件层产品指标",
      type: "concept",
      details: {
        zh_label: "Software-Layer Product Metrics",
        summary: "衡量机器人软件栈（感知-决策-执行链路）质量与商业价值的核心 KPI 体系，是软件 PM 定义 PRD 时的第一性原理，与硬件物理指标互补。",
        key_concepts: ["任务成功率 TSR", "端到端延迟", "技能泛化率", "MTBF"],
        source: { type: "conversation" },
      },
    },
    {
      id: "task_success_rate",
      label: "任务成功率 TSR",
      type: "concept",
      details: {
        zh_label: "Task Success Rate",
        summary: "机器人完成一个完整端到端任务（如「拿杯水到桌上」）的概率，是衡量 VLA 模型实用程度的最直接指标，也是 B 端客户签合同前最关心的数字。",
        notes: "通常分层定义：原子动作成功率（单步抓取）→ 技能成功率（「导航到目标点+取物」组合）→ 任务成功率（完整工单）。工业场景的最低商业门槛通常是任务成功率 ≥ 95%。",
        key_concepts: ["端到端成功率", "商业门槛", "多步骤拆分", "VLA 评估"],
        source: { type: "conversation" },
      },
    },
    {
      id: "e2e_latency",
      label: "端到端延迟",
      type: "concept",
      details: {
        zh_label: "End-to-End Latency",
        summary: "端到端延迟 = 从摄像头采集到一帧画面，到关节执行器真正开始运动，中间所有环节加总花掉的时间。它是衡量机器人**「反应速度」**的综合指标，直接决定机器人能否应对动态变化的现实环境。",
        analogy: "就像人打乒乓球——眼睛看到来球（输入）到手臂挥拍（输出）之间大约 150–200ms，这就是人类的「端到端延迟」。如果机器人的延迟是 500ms，它永远追不上运动中的零件；哪怕是工厂流水线上的慢速传送带，200ms 的迟钝也会导致抓取位置偏移报废。",
        facts: [
          { label: "底层运动控制层（电机伺服）", value: "要求 ≤ 1ms（即 1000Hz 闭环），由实时操作系统（RTOS）保证；低于此频率关节会产生抖动甚至失稳" },
          { label: "VLA 模型推理层（AI 决策）", value: "目标 20–33ms（对应 30–50Hz），是当前边缘 GPU 的核心瓶颈——7B 参数模型在 Jetson Orin 上原始推理约 80–150ms，需要 TensorRT 量化才能压到目标范围" },
          { label: "完整感知-决策-执行链路", value: "≤ 100ms 是 B 端客户可接受的「不觉得卡顿」门槛；超过 200ms 操作员肉眼可见明显滞后" },
          { label: "人类参照", value: "视觉反应时间约 150–200ms；专业运动员经训练可达 80–120ms" },
          { label: "延迟拆解示例（典型系统）", value: "图像采集+传输 5ms + 图像预处理 3ms + VLA推理 25ms + 动作解码 2ms + 驱动器通信 1ms ≈ 合计 36ms" }
        ],
        notes: "端到端延迟在机器人软件栈里是一个「木桶短板」问题：底层电机控制可以做到 <1ms，但 VLA 推理一旦超过 33ms，整条链路的有效控制频率就被拖到 30Hz 以下。目前业界的主流解法是：① TensorRT INT8 量化（把模型精度从 FP32 降到 INT8，推理速度提升 3–5×）；② CUDA Graph（固化计算图，消除 GPU 调度开销）；③ RTC 实时分块技术（逐际动力自研，把 VLA 的 action chunk 切小，让第一个动作更快出来）；④ ZMQ 远程推理服务（把大模型推理卸载到算力更强的服务器，机器人本地只跑运控）。端到端延迟是「任务成功率」的前置条件——哪怕模型再聪明，反应慢了物理世界不等你。",
        key_concepts: ["感知-决策-执行链路", "控制频率 Hz", "RTOS 实时操作系统", "TensorRT 量化", "推理延迟瓶颈", "木桶短板效应"],
        source: { type: "paper", title: "FluxVLA Engine 技术文档（逐际动力，边缘推理优化）", url: "https://github.com/FluxVLA/FluxVLA" },
      },
    },
    {
      id: "skill_generalization",
      label: "技能泛化率",
      type: "concept",
      details: {
        zh_label: "Skill Generalization Rate",
        summary: "模型在未曾见过的物体外形、颜色、摆放位置或场景光照条件下，仍能成功执行训练任务的概率，是区分「能在受控实验室里演示」和「能在真实工厂稳定工作」的关键指标。",
        analogy: "就像一位只在 A 工厂受过训练的员工，突然被调到 B 工厂——他能多快适应新设备的位置和操作方式，就是泛化能力。",
        notes: "提升泛化率的主要手段：大量合成数据（物体外观域随机化）、语言条件化 VLA（理解自然语言修改任务参数）、In-Context Learning（少样本场景适应）。",
        key_concepts: ["域随机化", "分布外泛化", "OOD 鲁棒性", "语言条件化"],
        source: { type: "conversation" },
      },
    },
  ],

  edges: [
    // ── 根节点向下扇出 ──
    { id: "humanoid_robot__细分为__core_technology", source: "humanoid_robot", target: "core_technology", label: "细分为" },
    { id: "humanoid_robot__细分为__hardware_component", source: "humanoid_robot", target: "hardware_component", label: "细分为" },
    { id: "humanoid_robot__细分为__companies_and_products", source: "humanoid_robot", target: "companies_and_products", label: "细分为" },
    { id: "humanoid_robot__细分为__application_scenarios", source: "humanoid_robot", target: "application_scenarios", label: "细分为" },
    { id: "humanoid_robot__细分为__industry_chain", source: "humanoid_robot", target: "industry_chain", label: "细分为" },
    { id: "humanoid_robot__细分为__evaluation_commercialization", source: "humanoid_robot", target: "evaluation_commercialization", label: "细分为" },

    // ── 1. 核心技术分支 ──
    { id: "core_technology__包含__environmental_perception", source: "core_technology", target: "environmental_perception", label: "包含" },
    { id: "core_technology__包含__motion_control_planning", source: "core_technology", target: "motion_control_planning", label: "包含" },
    { id: "core_technology__包含__embodied_ai_models", source: "core_technology", target: "embodied_ai_models", label: "包含" },
    { id: "core_technology__包含__hri", source: "core_technology", target: "hri", label: "包含" },
    
    { id: "environmental_perception__包含__vision_3d", source: "environmental_perception", target: "vision_3d", label: "包含" },
    { id: "environmental_perception__包含__multimodal_perception", source: "environmental_perception", target: "multimodal_perception", label: "包含" },
    { id: "environmental_perception__包含__slam", source: "environmental_perception", target: "slam", label: "包含" },
    { id: "environmental_perception__包含__tactile_feedback_processing", source: "environmental_perception", target: "tactile_feedback_processing", label: "包含" },
    
    { id: "motion_control_planning__包含__gait_planning", source: "motion_control_planning", target: "gait_planning", label: "包含" },
    { id: "motion_control_planning__包含__wbc", source: "motion_control_planning", target: "wbc", label: "包含" },
    { id: "motion_control_planning__包含__mpc", source: "motion_control_planning", target: "mpc", label: "包含" },
    { id: "motion_control_planning__包含__rl_control", source: "motion_control_planning", target: "rl_control", label: "包含" },

    // RL 细分子树边
    { id: "rl_control__包含__model_free_rl", source: "rl_control", target: "model_free_rl", label: "包含" },
    { id: "rl_control__包含__model_based_rl", source: "rl_control", target: "model_based_rl", label: "包含" },
    { id: "model_based_rl__依赖__world_model", source: "model_based_rl", target: "world_model", label: "依赖" },
    { id: "world_model__增强__mpc", source: "world_model", target: "mpc", label: "增强" },
    { id: "rl_mpc_integration__融合__model_based_rl", source: "rl_mpc_integration", target: "model_based_rl", label: "融合" },
    
    { id: "embodied_ai_models__包含__vla_models", source: "embodied_ai_models", target: "vla_models", label: "包含" },
    { id: "embodied_ai_models__包含__world_model", source: "embodied_ai_models", target: "world_model", label: "包含" },

    // VLA 代表模型子树边
    { id: "vla_models__包含__vla_rt2", source: "vla_models", target: "vla_rt2", label: "包含" },
    { id: "vla_models__包含__vla_openvla", source: "vla_models", target: "vla_openvla", label: "包含" },
    { id: "vla_models__包含__vla_pi0", source: "vla_models", target: "vla_pi0", label: "包含" },
    { id: "vla_models__包含__vla_groot", source: "vla_models", target: "vla_groot", label: "包含" },
    { id: "vla_pi0__融合__world_model", source: "vla_pi0", target: "world_model", label: "融合" },

    { id: "embodied_ai_models__包含__generalized_grasping", source: "embodied_ai_models", target: "generalized_grasping", label: "包含" },
    { id: "embodied_ai_models__包含__physics_simulators", source: "embodied_ai_models", target: "physics_simulators", label: "包含" },
    { id: "embodied_ai_models__包含__synthetic_data_gen", source: "embodied_ai_models", target: "synthetic_data_gen", label: "包含" },
    
    { id: "hri__包含__nlu", source: "hri", target: "nlu", label: "包含" },
    { id: "hri__包含__intent_recognition", source: "hri", target: "intent_recognition", label: "包含" },
    { id: "hri__包含__affective_computing", source: "hri", target: "affective_computing", label: "包含" },
    { id: "hri__包含__speech_synthesis", source: "hri", target: "speech_synthesis", label: "包含" },

    // ── 2. 硬件组件分支 ──
    { id: "hardware_component__组成__actuator_system", source: "hardware_component", target: "actuator_system", label: "组成" },
    { id: "hardware_component__组成__core_parts", source: "hardware_component", target: "core_parts", label: "组成" },
    { id: "hardware_component__组成__sensory_system", source: "hardware_component", target: "sensory_system", label: "组成" },
    { id: "hardware_component__组成__compute_power", source: "hardware_component", target: "compute_power", label: "组成" },

    { id: "actuator_system__包含__rotary_actuators", source: "actuator_system", target: "rotary_actuators", label: "包含" },
    { id: "actuator_system__包含__linear_actuators", source: "actuator_system", target: "linear_actuators", label: "包含" },
    { id: "actuator_system__包含__dexterous_hands", source: "actuator_system", target: "dexterous_hands", label: "包含" },
    { id: "actuator_system__包含__bionic_joints", source: "actuator_system", target: "bionic_joints", label: "包含" },
    
    { id: "core_parts__包含__harmonic_reducers", source: "core_parts", target: "harmonic_reducers", label: "包含" },
    { id: "core_parts__包含__planetary_reducers", source: "core_parts", target: "planetary_reducers", label: "包含" },
    { id: "core_parts__包含__frameless_torque_motors", source: "core_parts", target: "frameless_torque_motors", label: "包含" },
    { id: "core_parts__包含__coreless_motors", source: "core_parts", target: "coreless_motors", label: "包含" },
    { id: "core_parts__包含__ball_screws", source: "core_parts", target: "ball_screws", label: "包含" },
    { id: "core_parts__包含__planetary_roller_screws", source: "core_parts", target: "planetary_roller_screws", label: "包含" },
    
    { id: "sensory_system__包含__six_axis_force_sensors", source: "sensory_system", target: "six_axis_force_sensors", label: "包含" },
    { id: "sensory_system__包含__tactile_sensors_eskin", source: "sensory_system", target: "tactile_sensors_eskin", label: "包含" },
    { id: "sensory_system__包含__rgbd_cameras", source: "sensory_system", target: "rgbd_cameras", label: "包含" },
    { id: "sensory_system__包含__lidar", source: "sensory_system", target: "lidar", label: "包含" },
    { id: "sensory_system__包含__imu", source: "sensory_system", target: "imu", label: "包含" },
    
    { id: "compute_power__包含__edge_computing_chips", source: "compute_power", target: "edge_computing_chips", label: "包含" },
    { id: "compute_power__包含__internal_bus", source: "compute_power", target: "internal_bus", label: "包含" },
    { id: "compute_power__包含__high_density_battery", source: "compute_power", target: "high_density_battery", label: "包含" },
    { id: "compute_power__包含__bms", source: "compute_power", target: "bms", label: "包含" },

    // 硬件组件内部关联
    { id: "rotary_actuators__依赖__harmonic_reducers", source: "rotary_actuators", target: "harmonic_reducers", label: "依赖" },
    { id: "linear_actuators__依赖__planetary_roller_screws", source: "linear_actuators", target: "planetary_roller_screws", label: "依赖" },
    { id: "dexterous_hands__依赖__coreless_motors", source: "dexterous_hands", target: "coreless_motors", label: "依赖" },

    // ── 3. 代表企业与产品分支 ──
    { id: "companies_and_products__分为__global_leaders", source: "companies_and_products", target: "global_leaders", label: "分为" },
    { id: "companies_and_products__分为__domestic_innovators", source: "companies_and_products", target: "domestic_innovators", label: "分为" },
    { id: "companies_and_products__分为__key_suppliers", source: "companies_and_products", target: "key_suppliers", label: "分为" },

    { id: "global_leaders__包含__tesla_company", source: "global_leaders", target: "tesla_company", label: "包含" },
    { id: "global_leaders__包含__boston_dynamics", source: "global_leaders", target: "boston_dynamics", label: "包含" },
    { id: "global_leaders__包含__figure_ai", source: "global_leaders", target: "figure_ai", label: "包含" },
    { id: "global_leaders__包含__agility_robotics", source: "global_leaders", target: "agility_robotics", label: "包含" },
    
    { id: "tesla_company__包含__tesla_optimus", source: "tesla_company", target: "tesla_optimus", label: "包含" },
    { id: "boston_dynamics__包含__bd_atlas", source: "boston_dynamics", target: "bd_atlas", label: "包含" },
    { id: "figure_ai__包含__figure_02", source: "figure_ai", target: "figure_02", label: "包含" },
    { id: "agility_robotics__包含__agility_digit", source: "agility_robotics", target: "agility_digit", label: "包含" },

    { id: "domestic_innovators__包含__unitree_robotics", source: "domestic_innovators", target: "unitree_robotics", label: "包含" },
    { id: "domestic_innovators__包含__agibot", source: "domestic_innovators", target: "agibot", label: "包含" },
    { id: "domestic_innovators__包含__ubtech", source: "domestic_innovators", target: "ubtech", label: "包含" },
    { id: "domestic_innovators__包含__fourier_intelligence", source: "domestic_innovators", target: "fourier_intelligence", label: "包含" },
    { id: "domestic_innovators__包含__limx_dynamics", source: "domestic_innovators", target: "limx_dynamics", label: "包含" },
    
    { id: "unitree_robotics__包含__unitree_h1_g1", source: "unitree_robotics", target: "unitree_h1_g1", label: "包含" },
    { id: "agibot__包含__agibot_expedition", source: "agibot", target: "agibot_expedition", label: "包含" },
    { id: "ubtech__包含__ubtech_walker", source: "ubtech", target: "ubtech_walker", label: "包含" },
    { id: "fourier_intelligence__包含__fourier_gr1", source: "fourier_intelligence", target: "fourier_gr1", label: "包含" },

    // 逐际动力 (LimX) 深层挂载结构
    { id: "limx_dynamics__包含__limx_cl_1", source: "limx_dynamics", target: "limx_cl_1", label: "包含" },
    { id: "limx_dynamics__包含__limx_tron_1", source: "limx_dynamics", target: "limx_tron_1", label: "包含" },
    { id: "limx_dynamics__包含__limx_w1", source: "limx_dynamics", target: "limx_w1", label: "包含" },
    { id: "limx_dynamics__包含__limx_p1", source: "limx_dynamics", target: "limx_p1", label: "包含" },
    { id: "perception_driven_rl__支撑__limx_dynamics", source: "perception_driven_rl", target: "limx_dynamics", label: "支撑" },
    { id: "rl_mpc_integration__支撑__limx_dynamics", source: "rl_mpc_integration", target: "limx_dynamics", label: "支撑" },
    { id: "terrain_blind_control__支撑__limx_dynamics", source: "terrain_blind_control", target: "limx_dynamics", label: "支撑" },
    { id: "high_torque_joints__支撑__limx_dynamics", source: "high_torque_joints", target: "limx_dynamics", label: "支撑" },
    { id: "limx_w1__服务于__limx_b2b_inspection", source: "limx_w1", target: "limx_b2b_inspection", label: "服务于" },
    { id: "limx_w1__服务于__limx_logistics", source: "limx_w1", target: "limx_logistics", label: "服务于" },
    { id: "limx_cl_1__服务于__limx_special_ops", source: "limx_cl_1", target: "limx_special_ops", label: "服务于" },

    { id: "key_suppliers__包含__leaderdrive", source: "key_suppliers", target: "leaderdrive", label: "包含" },
    { id: "key_suppliers__包含__inovance", source: "key_suppliers", target: "inovance", label: "包含" },
    { id: "key_suppliers__包含__orbbec", source: "key_suppliers", target: "orbbec", label: "包含" },
    { id: "key_suppliers__包含__inspire_robots", source: "key_suppliers", target: "inspire_robots", label: "包含" },

    // 企业与组件的跨区联结
    { id: "leaderdrive__驱动__harmonic_reducers", source: "leaderdrive", target: "harmonic_reducers", label: "驱动" },
    { id: "orbbec__驱动__rgbd_cameras", source: "orbbec", target: "rgbd_cameras", label: "驱动" },
    { id: "inspire_robots__驱动__dexterous_hands", source: "inspire_robots", target: "dexterous_hands", label: "驱动" },

    // ── 4. 应用场景分支 ──
    { id: "application_scenarios__细分为__industrial_logistics", source: "application_scenarios", target: "industrial_logistics", label: "细分为" },
    { id: "application_scenarios__细分为__special_ops", source: "application_scenarios", target: "special_ops", label: "细分为" },
    { id: "application_scenarios__细分为__commercial_services", source: "application_scenarios", target: "commercial_services", label: "细分为" },
    { id: "application_scenarios__细分为__home_services", source: "application_scenarios", target: "home_services", label: "细分为" },
    
    { id: "industrial_logistics__包含__material_handling", source: "industrial_logistics", target: "material_handling", label: "包含" },
    { id: "industrial_logistics__包含__assembly_line", source: "industrial_logistics", target: "assembly_line", label: "包含" },
    { id: "industrial_logistics__包含__quality_inspection", source: "industrial_logistics", target: "quality_inspection", label: "包含" },
    { id: "industrial_logistics__包含__warehouse_sorting", source: "industrial_logistics", target: "warehouse_sorting", label: "包含" },
    
    { id: "special_ops__包含__disaster_rescue", source: "special_ops", target: "disaster_rescue", label: "包含" },
    { id: "special_ops__包含__nuclear_inspection", source: "special_ops", target: "nuclear_inspection", label: "包含" },
    { id: "special_ops__包含__hazardous_handling", source: "special_ops", target: "hazardous_handling", label: "包含" },
    { id: "special_ops__包含__space_exploration", source: "special_ops", target: "space_exploration", label: "包含" },

    { id: "commercial_services__包含__reception_guiding", source: "commercial_services", target: "reception_guiding", label: "包含" },
    { id: "commercial_services__包含__commercial_performance", source: "commercial_services", target: "commercial_performance", label: "包含" },
    { id: "commercial_services__包含__retail_replenishment", source: "commercial_services", target: "retail_replenishment", label: "包含" },
    { id: "commercial_services__包含__medical_rehab", source: "commercial_services", target: "medical_rehab", label: "包含" },
    { id: "commercial_services__包含__research_platform", source: "commercial_services", target: "research_platform", label: "包含" },
    { id: "commercial_services__包含__education_platform", source: "commercial_services", target: "education_platform", label: "包含" },

    { id: "home_services__包含__item_organization", source: "home_services", target: "item_organization", label: "包含" },
    { id: "home_services__包含__cooking_assist", source: "home_services", target: "cooking_assist", label: "包含" },
    { id: "home_services__包含__home_cleaning", source: "home_services", target: "home_cleaning", label: "包含" },
    { id: "home_services__包含__elderly_care", source: "home_services", target: "elderly_care", label: "包含" },

    // ── 5. 产业链分支 ──
    { id: "industry_chain__构成__upstream", source: "industry_chain", target: "upstream", label: "构成" },
    { id: "industry_chain__构成__midstream", source: "industry_chain", target: "midstream", label: "构成" },
    { id: "industry_chain__构成__downstream", source: "industry_chain", target: "downstream", label: "构成" },

    { id: "upstream__包含__core_parts_mfg", source: "upstream", target: "core_parts_mfg", label: "包含" },
    { id: "upstream__包含__sensor_mfg", source: "upstream", target: "sensor_mfg", label: "包含" },
    { id: "upstream__包含__ai_chip_design", source: "upstream", target: "ai_chip_design", label: "包含" },
    { id: "upstream__包含__sim_platform_dev", source: "upstream", target: "sim_platform_dev", label: "包含" },
    { id: "upstream__包含__data_annotation", source: "upstream", target: "data_annotation", label: "包含" },

    { id: "midstream__包含__robot_design", source: "midstream", target: "robot_design", label: "包含" },
    { id: "midstream__包含__mechanical_processing", source: "midstream", target: "mechanical_processing", label: "包含" },
    { id: "midstream__包含__assembly_testing", source: "midstream", target: "assembly_testing", label: "包含" },

    { id: "downstream__包含__automation_integration", source: "downstream", target: "automation_integration", label: "包含" },
    { id: "downstream__包含__software_customization", source: "downstream", target: "software_customization", label: "包含" },
    { id: "downstream__包含__maintenance_service", source: "downstream", target: "maintenance_service", label: "包含" },

    // ── 6. 产品评估与商业化分支 ──
    { id: "evaluation_commercialization__包含__core_metrics", source: "evaluation_commercialization", target: "core_metrics", label: "包含" },
    { id: "evaluation_commercialization__包含__bom_cost_mass_prod", source: "evaluation_commercialization", target: "bom_cost_mass_prod", label: "包含" },
    { id: "evaluation_commercialization__包含__commercialization_path", source: "evaluation_commercialization", target: "commercialization_path", label: "包含" },

    { id: "core_metrics__包含__dof", source: "core_metrics", target: "dof", label: "包含" },
    { id: "core_metrics__包含__payload", source: "core_metrics", target: "payload", label: "包含" },
    { id: "core_metrics__包含__max_walking_speed", source: "core_metrics", target: "max_walking_speed", label: "包含" },
    { id: "core_metrics__包含__battery_life", source: "core_metrics", target: "battery_life", label: "包含" },
    { id: "core_metrics__包含__weight_dimensions", source: "core_metrics", target: "weight_dimensions", label: "包含" },

    { id: "bom_cost_mass_prod__包含__component_cost_breakdown", source: "bom_cost_mass_prod", target: "component_cost_breakdown", label: "包含" },
    { id: "bom_cost_mass_prod__包含__scaling_reduction", source: "bom_cost_mass_prod", target: "scaling_reduction", label: "包含" },
    { id: "bom_cost_mass_prod__包含__yield_rate", source: "bom_cost_mass_prod", target: "yield_rate", label: "包含" },
    { id: "bom_cost_mass_prod__包含__supply_chain_maturity", source: "bom_cost_mass_prod", target: "supply_chain_maturity", label: "包含" },

    { id: "commercialization_path__包含__b2b_validation", source: "commercialization_path", target: "b2b_validation", label: "包含" },
    { id: "commercialization_path__包含__data_scarcity", source: "commercialization_path", target: "data_scarcity", label: "包含" },
    { id: "commercialization_path__包含__physical_safety", source: "commercialization_path", target: "physical_safety", label: "包含" },
    { id: "commercialization_path__包含__legal_ethical", source: "commercialization_path", target: "legal_ethical", label: "包含" },

    // ── ROS 子树（骨架边）──
    { id: "core_technology__包含__ros", source: "core_technology", target: "ros", label: "包含" },
    { id: "ros__分为__ros2", source: "ros", target: "ros2", label: "分为" },
    { id: "ros__包含__ros_navigation", source: "ros", target: "ros_navigation", label: "包含" },
    { id: "ros__包含__ros_moveit", source: "ros", target: "ros_moveit", label: "包含" },
    { id: "ros__包含__urdf_xacro", source: "ros", target: "urdf_xacro", label: "包含" },

    // ── ROS 关联边（横向连接已有节点）──
    { id: "ros__支撑__slam", source: "ros", target: "slam", label: "支撑" },
    { id: "ros__使用__physics_simulators", source: "ros", target: "physics_simulators", label: "使用" },
    { id: "ros_moveit__依赖__motion_control_planning", source: "ros_moveit", target: "motion_control_planning", label: "依赖" },
    { id: "ros_navigation__依赖__slam", source: "ros_navigation", target: "slam", label: "依赖" },
    { id: "urdf_xacro__应用于__physics_simulators", source: "urdf_xacro", target: "physics_simulators", label: "应用于" },

    // ── 具身 Agentic OS 骨架边 ──
    { id: "core_technology__包含__agentic_os", source: "core_technology", target: "agentic_os", label: "包含" },
    { id: "agentic_os__实现__brain_cerebellum_integration", source: "agentic_os", target: "brain_cerebellum_integration", label: "实现" },
    { id: "brain_cerebellum_integration__分为__cerebellum_motion_layer", source: "brain_cerebellum_integration", target: "cerebellum_motion_layer", label: "分为" },
    { id: "brain_cerebellum_integration__分为__skill_alignment_layer", source: "brain_cerebellum_integration", target: "skill_alignment_layer", label: "分为" },
    { id: "brain_cerebellum_integration__分为__cognitive_planning_layer", source: "brain_cerebellum_integration", target: "cognitive_planning_layer", label: "分为" },
    { id: "limx_dynamics__自研__limx_cosa", source: "limx_dynamics", target: "limx_cosa", label: "自研" },
    { id: "limx_cosa__实现__agentic_os", source: "limx_cosa", target: "agentic_os", label: "实现" },

    // 具身 Agentic OS 关联边
    { id: "cerebellum_motion_layer__基于__rl_control", source: "cerebellum_motion_layer", target: "rl_control", label: "基于" },
    { id: "cerebellum_motion_layer__依赖__wbc", source: "cerebellum_motion_layer", target: "wbc", label: "依赖" },
    { id: "skill_alignment_layer__调用__vla_models", source: "skill_alignment_layer", target: "vla_models", label: "调用" },
    { id: "cognitive_planning_layer__集成__nlu", source: "cognitive_planning_layer", target: "nlu", label: "集成" },
    { id: "agentic_os__集成__hri", source: "agentic_os", target: "hri", label: "集成" },

    // ── VLA 工程底座与数据工程骨架边 ──
    { id: "embodied_ai_models__包含__vla_engineering_platform", source: "embodied_ai_models", target: "vla_engineering_platform", label: "包含" },
    { id: "embodied_ai_models__包含__teleoperation_system", source: "embodied_ai_models", target: "teleoperation_system", label: "包含" },
    { id: "embodied_ai_models__包含__sim_to_real_pipeline", source: "embodied_ai_models", target: "sim_to_real_pipeline", label: "包含" },
    { id: "embodied_ai_models__包含__data_flywheel", source: "embodied_ai_models", target: "data_flywheel", label: "包含" },
    { id: "vla_engineering_platform__包含__edge_inference_opt", source: "vla_engineering_platform", target: "edge_inference_opt", label: "包含" },
    { id: "limx_dynamics__开源__flux_vla_engine", source: "limx_dynamics", target: "flux_vla_engine", label: "开源" },
    { id: "flux_vla_engine__实现__vla_engineering_platform", source: "flux_vla_engine", target: "vla_engineering_platform", label: "实现" },

    // VLA 关联边
    { id: "sim_to_real_pipeline__依赖__physics_simulators", source: "sim_to_real_pipeline", target: "physics_simulators", label: "依赖" },
    { id: "sim_to_real_pipeline__补充__synthetic_data_gen", source: "sim_to_real_pipeline", target: "synthetic_data_gen", label: "补充" },
    { id: "teleoperation_system__输入__data_flywheel", source: "teleoperation_system", target: "data_flywheel", label: "输入" },
    { id: "data_flywheel__驱动__vla_engineering_platform", source: "data_flywheel", target: "vla_engineering_platform", label: "驱动" },
    { id: "edge_inference_opt__部署于__edge_computing_chips", source: "edge_inference_opt", target: "edge_computing_chips", label: "部署于" },

    // ── 机器人软件运营骨架边 ──
    { id: "core_technology__包含__robot_software_ops", source: "core_technology", target: "robot_software_ops", label: "包含" },
    { id: "robot_software_ops__包含__ota_update", source: "robot_software_ops", target: "ota_update", label: "包含" },
    { id: "robot_software_ops__包含__fleet_management", source: "robot_software_ops", target: "fleet_management", label: "包含" },
    { id: "robot_software_ops__包含__robot_sdk", source: "robot_software_ops", target: "robot_sdk", label: "包含" },

    // 软件运营关联边
    { id: "fleet_management__管理__ota_update", source: "fleet_management", target: "ota_update", label: "管理" },
    { id: "robot_sdk__依赖__ros2", source: "robot_sdk", target: "ros2", label: "依赖" },
    { id: "software_customization__调用__robot_sdk", source: "software_customization", target: "robot_sdk", label: "调用" },

    // ── 软件层产品指标骨架边 ──
    { id: "evaluation_commercialization__包含__software_product_metrics", source: "evaluation_commercialization", target: "software_product_metrics", label: "包含" },
    { id: "software_product_metrics__包含__task_success_rate", source: "software_product_metrics", target: "task_success_rate", label: "包含" },
    { id: "software_product_metrics__包含__e2e_latency", source: "software_product_metrics", target: "e2e_latency", label: "包含" },
    { id: "software_product_metrics__包含__skill_generalization", source: "software_product_metrics", target: "skill_generalization", label: "包含" },

    // 软件指标关联边
    { id: "task_success_rate__评估__vla_models", source: "task_success_rate", target: "vla_models", label: "评估" },
    { id: "e2e_latency__约束__edge_inference_opt", source: "e2e_latency", target: "edge_inference_opt", label: "约束" },
    { id: "skill_generalization__依赖__sim_to_real_pipeline", source: "skill_generalization", target: "sim_to_real_pipeline", label: "依赖" },
    { id: "b2b_validation__依赖__task_success_rate", source: "b2b_validation", target: "task_success_rate", label: "依赖" },
  ],
};

const humanoidRobotTypeStyles: Record<string, NodeTypeStyle> = {
  concept:     { base: "#9333EA", glow: "rgba(147,51,234,0.30)", label: "概念" },
  technology:  { base: "#3B82F6", glow: "rgba(59,130,246,0.30)", label: "技术" },
  company:     { base: "#F59E0B", glow: "rgba(245,158,11,0.30)", label: "企业" },
  product:     { base: "#10B981", glow: "rgba(16,185,129,0.30)", label: "产品" },
  component:   { base: "#EF4444", glow: "rgba(239,68,68,0.30)", label: "组件" },
  application: { base: "#14B8A6", glow: "rgba(20,184,166,0.30)", label: "应用场景" },
};

const humanoidRobotTypeOrder: string[] = [
  "concept", "technology", "company", "product", "component", "application"
];

export const humanoidRobotMap: KnowledgeMap = {
  id: "humanoid-robot",
  label: "人形机器人",
  subtitle: "行业知识图谱",
  data: humanoidRobotGraphData,
  typeStyles: humanoidRobotTypeStyles,
  typeOrder: humanoidRobotTypeOrder,
  preferredSeed: "humanoid_robot",
  group: "professional",
  domain: "tech-product",
};