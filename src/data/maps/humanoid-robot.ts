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
      label: "同步定位与建图",
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
        summary: "让机器人在仿真中通过试错学习运动策略，应对复杂未知地形能力极强。",
        analogy: "像教小狗接飞盘，做对奖励做错惩罚，让它自己悟出动作。",
        key_concepts: ["Sim2Real", "端到端网络"],
        source: { type: "conversation" },
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
      label: "视觉-语言-动作模型",
      type: "technology",
      details: {
        summary: "直接将摄像头画面和语言指令输入大模型，输出底层关节运动指令（Actions）的端到端架构。",
        notes: "典型的如 Google RT-2，是具身智能目前的最前沿方向。",
        key_concepts: ["VLA", "Token化控制"],
        source: { type: "conversation" },
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
        key_concepts: ["无人替代", "极限环境"],
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
      id: "research_education",
      label: "科研教育平台",
      type: "application",
      details: {
        summary: "作为高校AI实验室的标准硬件教具，用于测试最新的具身大模型代码。",
        key_concepts: ["二次开发", "开源接口"],
        source: { type: "conversation" },
      },
    },
    {
      id: "home_services",
      label: "家庭服务",
      type: "application",
      details: {
        summary: "人形机器人的终极愿景——进入非结构化极强的千家万户，成为真正的钢铁管家。",
        notes: "目前面临极高的安全性挑战和长尾任务泛化难题，落地最晚。",
        key_concepts: ["非结构化环境", "长尾任务"],
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
      label: "核心产品指标",
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
        summary: "机器人拥有的独立运动轴数量，自由度越高越灵活，但控制难度和成本呈指数上升。",
        notes: "特斯拉Optimus全身28个DOF，灵巧手11个。",
        key_concepts: ["灵活度", "运动空间"],
        source: { type: "conversation" },
      },
    },
    {
      id: "payload",
      label: "有效负载能力",
      type: "concept",
      details: {
        summary: "机器人在保持平衡和正常速度下，双臂能稳稳举起或搬运的最大物体重量。",
        notes: "目前主流人形机器人负载通常在 10kg 到 30kg 之间。",
        key_concepts: ["干活能力", "大负载"],
        source: { type: "conversation" },
      },
    },
    {
      id: "max_walking_speed",
      label: "最大步行速度",
      type: "concept",
      details: {
        summary: "衡量机器人腿部爆发力和运动规划能力的指标，决定了它的工作巡航效率。",
        key_concepts: ["效率", "奔跑能力"],
        source: { type: "conversation" },
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
        summary: "身高通常设计在1.6m-1.75m之间，要求极限轻量化设计，重量越轻，跌倒带来的动能破坏越小。",
        key_concepts: ["减重", "仿人比例"],
        source: { type: "conversation" },
      },
    },
    {
      id: "bom_cost_mass_prod",
      label: "BOM成本与量产分析",
      type: "concept",
      details: {
        summary: "物料清单成本与规模化制造能力，是决定人形机器人能否真正取代人力的财务生死线。",
        key_concepts: ["成本控制", "规模效应"],
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
        summary: "从实验室走向真实商业世界，必须跨越的技术鸿沟和商业模式壁垒。",
        key_concepts: ["落地路线图", "阿喀琉斯之踵"],
        source: { type: "conversation" },
      },
    },
    {
      id: "b2b_validation",
      label: "B端场景商业验证",
      type: "concept",
      details: {
        summary: "让机器人在真实工厂先打工几个月，计算投资回报率(ROI)，证明买机器比雇人更划算。",
        key_concepts: ["ROI算账", "商业闭环"],
        source: { type: "conversation" },
      },
    },
    {
      id: "data_scarcity",
      label: "高质量数据集稀缺",
      type: "concept",
      details: {
        summary: "自动驾驶有海量路测数据，但人形机器人缺乏人类做饭、打扫卫生的精确物理交互三维数据集来训练大模型。",
        key_concepts: ["数据渴求", "遥操作收集"],
        source: { type: "conversation" },
      },
    },
    {
      id: "physical_safety",
      label: "物理交互安全性",
      type: "concept",
      details: {
        summary: "几十公斤的钢铁之躯走进家庭时，如何绝对保证就算系统死机崩溃，也绝不会砸伤人类小孩或宠物。",
        key_concepts: ["机械限位", "绝对安全"],
        source: { type: "conversation" },
      },
    },
    {
      id: "legal_ethical",
      label: "法律与伦理规范",
      type: "concept",
      details: {
        summary: "如果机器人在工厂砸坏了产品，或在家里打翻了热汤伤人，在法律上由谁（本体厂、模型厂、用户）担责的空白地带。",
        key_concepts: ["责任界定", "机器伦理"],
        source: { type: "conversation" },
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
    
    { id: "embodied_ai_models__包含__vla_models", source: "embodied_ai_models", target: "vla_models", label: "包含" },
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
    { id: "commercial_services__包含__retail_replenishment", source: "commercial_services", target: "retail_replenishment", label: "包含" },
    { id: "commercial_services__包含__medical_rehab", source: "commercial_services", target: "medical_rehab", label: "包含" },
    { id: "commercial_services__包含__research_education", source: "commercial_services", target: "research_education", label: "包含" },

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