import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// PM 知识图谱 — 基于《人人都是产品经理》（苏杰）
//
// 节点命名约定：label 用中文，zh_label 放英文术语/缩写
// 来源统一：{ type: "book", title: "人人都是产品经理", authors: ["苏杰"] }
// ============================================================

const PM_SOURCE = {
  type: "book" as const,
  title: "人人都是产品经理",
  authors: ["苏杰"],
};

const pmGraphData: GraphData = {
  nodes: [
    // ─── 中心节点 ────────────────────────────────────────────
    {
      id: "pm",
      label: "产品经理",
      type: "role",
      details: {
        zh_label: "Product Manager",
        summary: "连接用户、业务与技术的跨职能角色，以产品为载体实现用户价值与商业价值的统一。",
        analogy: "像乐队的指挥：自己不一定能演奏每种乐器，却要让所有人在正确的节奏上合奏出动人的作品。",
        notes: "苏杰认为产品经理的核心能力是：理解用户需求、协调团队资源、推动产品落地。",
        key_concepts: ["用户价值", "商业价值", "跨职能协作", "产品思维"],
        source: PM_SOURCE,
      },
    },

    // ─── 第1章：角色与入行 ────────────────────────────────────
    {
      id: "everyone_is_pm",
      label: "人人都是产品经理",
      type: "mindset",
      details: {
        summary: "每个人在日常生活中都在不自觉地做产品经理的事——提出需求、解决问题、影响他人。",
        analogy: "就像每个人都会在家里规划空间摆设，这就是产品思维的雏形。",
        notes: "苏杰借用这个标题传达：产品思维是人人可学、处处可用的通用能力，不只是职业标签。",
        source: PM_SOURCE,
      },
    },
    {
      id: "pm_definition",
      label: "产品经理是什么",
      type: "mindset",
      details: {
        summary: "产品经理是「为用户创造价值、为公司实现商业目标」的角色，而非纯粹的项目管理者或需求传递员。",
        notes: "常见误区：把 PM 等同于「需求翻译官」或「会议记录员」。真正的 PM 要主动定义问题，而不只是传递别人的答案。",
        key_concepts: ["价值创造", "商业目标", "角色定位"],
        source: PM_SOURCE,
      },
    },
    {
      id: "product_concept",
      label: "产品",
      type: "mindset",
      details: {
        zh_label: "Product",
        summary: "能够满足用户某类需求的载体，可以是软件、硬件、服务或体验的组合。",
        notes: "苏杰强调：产品的本质是「解决方案」，不局限于软件。一份合同、一次服务流程都可以是产品。",
        key_concepts: ["解决方案", "用户需求", "价值载体"],
        source: PM_SOURCE,
      },
    },
    {
      id: "why_pm",
      label: "为什么做产品经理",
      type: "mindset",
      details: {
        summary: "了解自身动机——对用户痛点的共情、对产品创造的热情、对跨领域整合的兴趣——是持续成长的内驱力。",
        notes: "苏杰建议在入行前问自己：是真的喜欢解决用户问题，还是只是觉得这个职位听起来很酷？",
        source: PM_SOURCE,
      },
    },
    {
      id: "influence",
      label: "靠影响力而非权力",
      type: "skill",
      details: {
        zh_label: "Influence without authority",
        summary: "产品经理没有直接的下属，只能通过说服、共识和信任来协调研发、设计、运营等团队。",
        analogy: "像外交官而非将军：没有命令权，只有谈判桌和信任资本。",
        notes: "这要求 PM 具备强沟通力、共情能力和跨部门信任积累。做错一次很难重建。",
        key_concepts: ["说服力", "共识建立", "跨部门信任"],
        source: PM_SOURCE,
      },
    },
    {
      id: "pm_growth",
      label: "−1到3岁成长",
      type: "skill",
      details: {
        summary: "苏杰提出产品经理成长路径：−1岁（实习/见习）→ 0岁（入行）→ 1岁（独立负责） → 3岁（领域专家）。",
        notes: "每个阶段的核心任务不同：−1岁学方法论、0岁建立信任、1岁独立交付、3岁形成产品观。",
        key_concepts: ["成长路径", "独立负责", "产品观"],
        source: PM_SOURCE,
      },
    },

    // ─── 第2章：需求（最大簇）────────────────────────────────
    {
      id: "user_research",
      label: "用户研究",
      type: "process",
      details: {
        zh_label: "User Research",
        summary: "系统地了解目标用户的行为、动机和痛点，为需求分析提供真实依据。",
        analogy: "像侦探查案：不能靠臆想，要去现场收集证据——访谈、观察、数据。",
        notes: "苏杰强调：用户研究的目的不是验证假设，而是发现真实问题。避免把自己的偏见投射到用户身上。",
        key_concepts: ["定性研究", "定量研究", "用户洞察", "观察法"],
        source: PM_SOURCE,
      },
    },
    {
      id: "user",
      label: "用户·需求之源",
      type: "role",
      details: {
        summary: "用户是需求的根本来源，但用户提出的往往是「解决方案建议」而非「真实需求」。",
        analogy: "用户说「我要一匹更快的马」，背后的需求其实是「更快到达目的地」。",
        notes: "福特的名言点出关键：要理解用户的目标，而不是照抄用户的方案。",
        key_concepts: ["用户目标", "真实需求", "用户场景"],
        source: PM_SOURCE,
      },
    },
    {
      id: "maslow",
      label: "马斯洛需求层次",
      type: "model",
      details: {
        zh_label: "Maslow's Hierarchy of Needs",
        summary: "从生理→安全→社交→尊重→自我实现，人类需求有层次结构；理解用户处于哪一层有助于定位产品价值。",
        analogy: "饿着肚子的人不在乎产品是否优雅，只在乎能不能解决温饱——产品要先满足用户的底层需求。",
        notes: "苏杰用马斯洛模型帮助 PM 判断：用户现在最迫切的是什么层次的需求？产品在该层次的满足度如何？",
        key_concepts: ["需求层次", "生理需求", "自我实现", "需求定位"],
        source: PM_SOURCE,
      },
    },
    {
      id: "persona",
      label: "用户画像",
      type: "deliverable",
      details: {
        zh_label: "User Persona",
        summary: "基于用户研究提炼的虚构典型用户档案，包含目标、行为习惯、痛点和使用场景。",
        analogy: "像侦探画的「嫌疑人画像」：把零散线索归纳成一个有血有肉的具体形象，帮助团队共情目标用户。",
        notes: "好的 Persona 要基于真实研究，而不是凭空想象。常见陷阱：Persona 变成团队内部自嗨的虚构人物。",
        key_concepts: ["典型用户", "使用场景", "行为特征", "用户同理心"],
        source: PM_SOURCE,
      },
    },
    {
      id: "requirement_collection",
      label: "需求采集",
      type: "process",
      details: {
        zh_label: "Requirement Collection",
        summary: "通过多种渠道（访谈、问卷、数据、竞品等）广泛收集用户需求与业务需求的过程。",
        notes: "需求来源：用户反馈、客服记录、数据埋点、竞品分析、运营/销售反馈、老板指令。关键是保持开放心态，不预设答案。",
        key_concepts: ["多渠道收集", "用户反馈", "数据埋点", "竞品参考"],
        source: PM_SOURCE,
      },
    },
    {
      id: "user_interview",
      label: "用户访谈",
      type: "process",
      details: {
        zh_label: "User Interview",
        summary: "与目标用户一对一深入交谈，挖掘其真实行为、动机和痛点的定性研究方法。",
        analogy: "像好的记者采访：提开放式问题、追问「为什么」、听而不是说。",
        notes: "技巧：追问行为而非意见（「你上次是怎么做的？」而非「你觉得好不好？」）；不要引导答案；沉默是黄金。",
        key_concepts: ["开放式问题", "行为追问", "定性洞察"],
        source: PM_SOURCE,
      },
    },
    {
      id: "questionnaire",
      label: "调查问卷",
      type: "process",
      details: {
        zh_label: "Questionnaire Survey",
        summary: "通过标准化问题大规模收集用户数据的定量研究方法，适合验证假设和了解分布情况。",
        notes: "优势：覆盖面广、成本低。劣势：无法深入追问。设计时避免引导性问题，注意样本偏差。",
        key_concepts: ["定量研究", "样本规模", "统计分析", "假设验证"],
        source: PM_SOURCE,
      },
    },
    {
      id: "usability_test",
      label: "可用性测试",
      type: "process",
      details: {
        zh_label: "Usability Test",
        summary: "观察真实用户完成特定任务时的行为与困难，发现界面与流程中的可用性问题。",
        analogy: "像让新员工按说明书组装桌子然后看着他操作：哪里卡住了，哪里看不懂，一目了然。",
        notes: "5个用户能发现80%的可用性问题。关键是「看着用户用」，而不是「问用户满不满意」。",
        key_concepts: ["任务测试", "思出声法", "观察", "易用性"],
        source: PM_SOURCE,
      },
    },
    {
      id: "focus_group",
      label: "焦点小组",
      type: "process",
      details: {
        zh_label: "Focus Group",
        summary: "组织6-10名典型用户围绕特定话题进行小组讨论，激发集体洞察的定性研究方法。",
        notes: "优势：能激发群体讨论、发现共识。劣势：容易产生从众效应，少数强势用户影响全组结论。应谨慎使用。",
        key_concepts: ["群体讨论", "从众效应", "定性研究"],
        source: PM_SOURCE,
      },
    },
    {
      id: "data_analysis",
      label: "数据分析",
      type: "process",
      details: {
        zh_label: "Data Analysis",
        summary: "通过分析用户行为数据（埋点、日志、漏斗等）客观了解用户实际使用行为的方法。",
        analogy: "数据是用户「用脚投票」的记录：他们真正做了什么，比他们说什么更可信。",
        notes: "常用工具：漏斗分析、留存曲线、A/B测试、热力图。与定性研究互补：数据说明了什么，访谈解释了为什么。",
        key_concepts: ["埋点", "漏斗分析", "留存率", "A/B测试"],
        source: PM_SOURCE,
      },
    },
    {
      id: "requirement_analysis",
      label: "需求分析",
      type: "process",
      details: {
        zh_label: "Requirement Analysis",
        summary: "把收集来的原始需求（用户反馈、老板想法）转化为可执行的产品需求，挖掘背后的真实问题。",
        analogy: "像医生诊断：患者描述症状（表层需求），医生要找到病因（真实需求）再开方（解决方案）。",
        notes: "苏杰强调：需求分析最重要的是追问「为什么」，避免直接接受用户给出的解决方案。用 Y 模型拆解。",
        key_concepts: ["问题拆解", "追问为什么", "真实需求", "Y模型"],
        source: PM_SOURCE,
      },
    },
    {
      id: "y_model",
      label: "Y 模型",
      type: "model",
      details: {
        zh_label: "Y-Model",
        summary: "苏杰提出的需求分析框架：将用户需求分解为「用户目标（why）→ 用户行为（what）→ 产品功能（how）」三层。",
        analogy: "Y 字形像一个分叉路口：先摸清用户的深层目标（Y 的竖线），再从这个根因出发设计功能（Y 的两叉），而不是直接抄用户说的方案。",
        notes: "使用步骤：① 用户说了什么（表面需求）→ ② 背后的目标是什么（用户目标）→ ③ 我们能做什么（产品方案）。",
        key_concepts: ["用户目标", "用户行为", "产品功能", "需求拆解"],
        source: PM_SOURCE,
      },
    },
    {
      id: "listen_not_copy",
      label: "听用户的但不要照着做",
      type: "mindset",
      details: {
        summary: "用户的建议是宝贵的信号，但用户往往只看到自己的局部痛点，产品方案需要PM综合全局设计。",
        analogy: "用户说「加个按钮」，背后的问题可能用完全不同的交互方式更优雅地解决。",
        notes: "亨利·福特的「更快的马」是最好的注脚。PM 要做的是理解需求背后的目标，再创新性地给出最优解。",
        source: PM_SOURCE,
      },
    },
    {
      id: "requirement_filter",
      label: "需求筛选",
      type: "process",
      details: {
        zh_label: "Requirement Prioritization",
        summary: "从大量原始需求中，依据用户价值、商业价值、实现成本等维度筛选出值得做的需求。",
        notes: "筛选维度：① 满足多少用户（覆盖面）；② 用户有多痛（痛点强度）；③ 不做用户会走吗（可替代性）；④ 做了有多难（成本）。",
        key_concepts: ["优先级排序", "价值评估", "成本收益", "取舍"],
        source: PM_SOURCE,
      },
    },
    {
      id: "kano",
      label: "KANO 模型",
      type: "model",
      details: {
        zh_label: "KANO Model",
        summary:
          "由日本学者狩野纪昭提出，将需求（功能属性）按「满足后对用户满意度的影响」分类，以此判断需求该不该做、先做哪个。",
        analogy:
          "像餐厅：干净卫生是必备（没有就不来）、口味好是期望（越好越满意）、送小礼物是兴奋（意外之喜）、桌布什么颜色多数人无差异、强行劝酒则是反向（越做越烦）。",
        notes:
          "为什么需要它：用户提的需求一大堆，但「满足它」对满意度的影响完全不同——有的不做就流失，有的做了也没人夸。KANO 帮你区分这五种情况。\n" +
          "完整五类（点开下方关联节点逐个看）：必备型、期望型、兴奋型、无差异型、反向型。\n" +
          "怎么定类：用「KANO 问卷」对每个功能问正反两题，再用 Better-Worse 系数把它归入五类之一。\n" +
          "怎么用：① 必备型必须补全（守底线，否则流失）；② 期望型持续投入（拉满意度、压竞品）；③ 兴奋型资源富余时做（造口碑）；④ 无差异型坚决砍；⑤ 反向型不仅不做还要避免。\n" +
          "动态演化：兴奋型会随时间退化为期望型、再退化为必备型（如手机指纹解锁，从惊喜变成标配），所以 KANO 要定期重做。",
        key_concepts: [
          "必备型",
          "期望型",
          "兴奋型",
          "无差异型",
          "反向型",
          "满意度曲线",
          "KANO问卷",
          "Better-Worse系数",
          "需求动态演化",
        ],
        source: PM_SOURCE,
      },
    },
    {
      id: "must_be_need",
      label: "必备型需求",
      type: "model",
      details: {
        zh_label: "Must-be",
        summary: "用户默认就该有的基本需求：做好了用户不会夸，没做好用户立刻不满甚至流失。",
        analogy: "像酒店有热水：有了你不会专门表扬，没有你直接差评退房。",
        notes: "满意度曲线上是「上凸饱和」：从无到有提升巨大，做到及格线后再投入收益递减。是产品的底线，必须优先补全。",
        key_concepts: ["基本需求", "底线", "不做就流失", "边际递减"],
        source: PM_SOURCE,
      },
    },
    {
      id: "performance_need",
      label: "期望型需求",
      type: "model",
      details: {
        zh_label: "Performance",
        summary: "做得越多、越好，用户越满意；做得差用户就越不满。是和竞品拉开差距的主战场。",
        analogy: "像外卖配送速度：越快用户越爽、越慢越火大，满意度跟它几乎成正比。",
        notes: "满意度曲线上近似一条「斜线」：投入与满意度正相关。资源应持续投在这里以超越竞品。",
        key_concepts: ["线性相关", "竞争力", "持续投入", "差异化"],
        source: PM_SOURCE,
      },
    },
    {
      id: "attractive_need",
      label: "兴奋型需求",
      type: "model",
      details: {
        zh_label: "Attractive",
        summary: "用户没预期、做了就有惊喜的需求；不做用户也不会不满，做了能制造口碑。",
        analogy: "像点外卖送了张手写感谢卡：没有你不会失望，有了你会想发朋友圈。",
        notes: "满意度曲线上是「下凸爆发」：少量投入就能换来满意度大幅跳升。资源富余时用来打差异化、造话题。",
        key_concepts: ["超出预期", "惊喜感", "口碑", "差异化亮点"],
        source: PM_SOURCE,
      },
    },
    {
      id: "indifferent_need",
      label: "无差异型需求",
      type: "model",
      details: {
        zh_label: "Indifferent",
        summary: "做不做用户都无感的需求，对满意度几乎没有影响，是最该被砍掉的部分。",
        analogy: "像 App 设置页里一个没人会改的冷门开关：加了没人用，去了没人发现。",
        notes: "满意度曲线上几乎是「水平线」。识别并砍掉它们能省下资源投到必备型和期望型上。",
        key_concepts: ["无感", "可砍", "资源浪费", "优先级最低"],
        source: PM_SOURCE,
      },
    },
    {
      id: "reverse_need",
      label: "反向型需求",
      type: "model",
      details: {
        zh_label: "Reverse",
        summary: "做了反而引起用户反感的需求：你以为是优化，用户却觉得是打扰。",
        analogy: "像每次打开 App 都强制弹推荐弹窗：你以为在导流，用户只想关掉卸载。",
        notes: "满意度曲线方向「相反」：功能越多满意度越低。不仅不做，还要主动识别并移除已有的反向设计。",
        key_concepts: ["越做越烦", "负向体验", "需移除", "认知偏差"],
        source: PM_SOURCE,
      },
    },
    {
      id: "kano_questionnaire",
      label: "KANO 问卷",
      type: "process",
      details: {
        summary: "KANO 的落地方法：对每个功能问一正一反两题，根据用户回答把功能归入五类之一。",
        analogy: "像体检：同一个指标正反各测一次，交叉对比才能判断你属于哪种「体质」。",
        notes:
          "正向问题：「如果有这个功能，你感觉如何？」反向问题：「如果没有这个功能，你感觉如何？」\n" +
          "每题五选项（喜欢/理应如此/无所谓/勉强接受/不喜欢），把正反答案查 KANO 二维评价表即可定类。\n" +
          "汇总多人结果时用 Better-Worse 系数定位功能。",
        key_concepts: ["正向问题", "反向问题", "二维评价表", "样本统计"],
        source: PM_SOURCE,
      },
    },
    {
      id: "better_worse",
      label: "Better-Worse 系数",
      type: "model",
      details: {
        zh_label: "Better-Worse Coefficient",
        summary: "把 KANO 问卷结果量化成两个系数，定位某功能能提升满意（Better）或避免不满（Worse）的程度。",
        analogy: "像给每个功能贴两个分数标签：一个说「做了能加多少分」，一个说「不做会扣多少分」。",
        notes:
          "Better（增加满意系数）越接近 1，做了越能提升满意，偏兴奋/期望型；\n" +
          "Worse（消除不满系数）绝对值越接近 1，不做越招致不满，偏必备/期望型。\n" +
          "把功能按两系数画在四象限里，就能直观排出优先级。",
        key_concepts: ["增加满意系数", "消除不满系数", "四象限定位", "量化排序"],
        source: PM_SOURCE,
      },
    },
    {
      id: "satisfaction_curve",
      label: "满意度曲线",
      type: "model",
      details: {
        summary: "KANO 的核心图示：横轴是功能「充足程度」，纵轴是用户「满意度」，不同需求类型呈现不同形状的曲线。",
        analogy: "同样多加一勺料，必备型只是从难吃到及格，兴奋型却能从惊喜到封神——曲线形状决定了投入回报。",
        notes:
          "必备型：上凸饱和（先陡后平）；期望型：近似过原点的斜线；兴奋型：下凸爆发（先平后陡）；\n" +
          "无差异型：贴近水平线；反向型：向下倾斜。看懂这张图就看懂了 KANO 为什么这样分类。",
        key_concepts: ["功能充足度", "满意度", "非线性", "边际效用"],
        source: PM_SOURCE,
      },
    },
    {
      id: "cost_benefit",
      label: "商业价值/性价比",
      type: "model",
      details: {
        summary: "评估需求实现的商业价值与开发成本之比，是资源有限时做出取舍的核心判断框架。",
        notes: "简单公式：性价比 = 用户价值 × 商业价值 / 实现成本。高价值低成本的需求优先；低价值高成本的坚决砍掉。\n注意：公式是定性判断框架，并非真的做乘除；落地时用 RICE 打分或价值/成本四象限把它变成可排序的方法。",
        key_concepts: ["价值评估", "资源分配", "ROI", "取舍决策"],
        source: PM_SOURCE,
      },
    },
    {
      id: "user_value",
      label: "用户价值",
      type: "model",
      details: {
        summary: "衡量需求对用户的重要程度，由痛点强度、使用频率、覆盖面、可替代性综合判断。",
        analogy: "像看一道菜值不值得点：有多想吃（痛点）、多久吃一次（频率）、多少人爱吃（覆盖面）、别处有没有（可替代性）。",
        notes: "用户价值 ≈ 痛点强度 × 使用频率 × 覆盖人数。高频刚需 > 低频弱需；不做就流失的需求价值更高。",
        key_concepts: ["痛点强度", "使用频率", "覆盖面", "可替代性"],
        source: PM_SOURCE,
      },
    },
    {
      id: "business_value",
      label: "商业价值",
      type: "model",
      details: {
        summary: "衡量需求对业务的贡献，包括直接变现、拉新留存等间接价值，以及卡住护城河的战略价值。",
        notes: "用户价值高不等于商业价值高：免费功能可能用户很爱却不赚钱。PM 的工作是找到两者的交集。",
        key_concepts: ["变现能力", "增长贡献", "战略价值", "成本节省"],
        source: PM_SOURCE,
      },
    },
    {
      id: "implementation_cost",
      label: "实现成本",
      type: "model",
      details: {
        summary: "完成需求所需的研发、协作、维护与机会成本的总和，不只是开发工时。",
        notes: "机会成本才是取舍的本质：做了 A 就做不了 B。上线后的长期维护负担同样要计入。",
        key_concepts: ["研发工时", "技术难度", "机会成本", "维护成本"],
        source: PM_SOURCE,
      },
    },
    {
      id: "rice",
      label: "RICE 模型",
      type: "model",
      details: {
        zh_label: "RICE Scoring",
        summary: "用 Reach × Impact × Confidence / Effort 给需求打分排序，是性价比公式的可量化实现。",
        analogy: "把「感觉值得做」翻译成一个能比大小的分数，让需求排队不再靠拍脑袋。",
        notes: "Reach 覆盖人数；Impact 单用户影响；Confidence 对前两者的信心（打折系数）；Effort 投入工时。分数越高越优先。",
        key_concepts: ["Reach", "Impact", "Confidence", "Effort"],
        source: PM_SOURCE,
      },
    },
    {
      id: "requirement_management",
      label: "需求管理",
      type: "process",
      details: {
        zh_label: "Requirement Management",
        summary: "对需求池中的需求进行持续的记录、分类、优先级维护、状态跟踪的管理活动。",
        notes: "需求管理不是「一次排好序就完事」，而是随产品迭代持续动态维护的过程。需求会新增、变化、被废弃。",
        key_concepts: ["需求池", "版本规划", "状态跟踪", "动态管理"],
        source: PM_SOURCE,
      },
    },
    {
      id: "requirement_pool",
      label: "需求池",
      type: "deliverable",
      details: {
        zh_label: "Backlog",
        summary: "收录所有待评估、待排期、待实现需求的结构化清单，是产品迭代规划的输入来源。",
        analogy: "像公司的「待办事项总表」：不是所有事都要现在做，但要记录下来，按优先级排队等候资源。",
        notes: "好的需求池有清晰的分类（功能/体验/bug）、状态（待评估/待排期/进行中/完成）、优先级标注。",
        key_concepts: ["待办清单", "版本规划", "优先级", "迭代输入"],
        source: PM_SOURCE,
      },
    },
    {
      id: "brd",
      label: "BRD",
      type: "deliverable",
      details: {
        zh_label: "Business Requirements Document",
        summary: "商业需求文档：从商业目标和业务视角描述产品方向，面向高层决策，聚焦「做什么」和「为什么做」。",
        notes: "受众是老板和投资人。内容：市场机会、目标用户、商业模式、预期收益、资源需求。不包含技术方案细节。",
        key_concepts: ["商业目标", "市场机会", "决策依据", "面向高层"],
        source: PM_SOURCE,
      },
    },
    {
      id: "mrd",
      label: "MRD",
      type: "deliverable",
      details: {
        zh_label: "Market Requirements Document",
        summary: "市场需求文档：从市场和用户视角描述产品需求，连接商业目标与产品功能，面向产品团队。",
        notes: "受众是产品与运营。内容：目标市场、用户画像、竞品分析、功能需求列表、优先级。连接BRD与PRD的桥梁。",
        key_concepts: ["市场定位", "用户需求", "竞品分析", "功能列表"],
        source: PM_SOURCE,
      },
    },
    {
      id: "prd",
      label: "PRD",
      type: "deliverable",
      details: {
        zh_label: "Product Requirements Document",
        summary: "产品需求文档：细化到功能级别的技术设计输入，面向研发与设计，描述「怎么做」。",
        analogy: "像建筑的施工图：细到每个功能点、每个边界条件，研发拿到就能开工。",
        notes: "好的PRD：需求背景清晰、功能描述完整、异常流程覆盖、验收标准明确。常见问题：遗漏异常分支、需求描述歧义。",
        key_concepts: ["功能规格", "验收标准", "异常流程", "面向研发"],
        source: PM_SOURCE,
      },
    },
    {
      id: "prototype",
      label: "原型",
      type: "deliverable",
      details: {
        zh_label: "Prototype",
        summary: "产品交互设计的视觉化表达，用于在开发前验证方案可行性，对齐团队理解，减少返工。",
        analogy: "像建筑前的沙盘模型：真正动工前先用低成本的方式看看效果，发现问题及时改。",
        notes: "低保真原型（纸稿/草图）用于早期验证流程，高保真原型用于开发前的细节确认。工具：Figma、Axure、即时设计。",
        key_concepts: ["低保真原型", "高保真原型", "交互验证", "Figma"],
        source: PM_SOURCE,
      },
    },
    {
      id: "product_principle",
      label: "产品原则与初心",
      type: "mindset",
      details: {
        summary: "在产品迭代的噪音中保持清醒：始终以用户价值和长期目标为决策基准，不被短期利益或内部政治扭曲。",
        notes: "苏杰建议每位 PM 为自己的产品写下「产品原则」：当面对两难抉择时，这些原则是判断的依据。",
        key_concepts: ["产品北极星", "价值观", "长期主义", "决策基准"],
        source: PM_SOURCE,
      },
    },

    // ─── 第3章：项目 ────────────────────────────────────────
    {
      id: "project",
      label: "从产品到项目",
      type: "process",
      details: {
        summary: "产品规划确定「做什么」之后，项目管理负责「怎么按时按质交付」，两者互补而非对立。",
        notes: "苏杰区分：产品经理聚焦「正确的事」（什么值得做），项目管理聚焦「正确地做事」（如何高效交付）。",
        key_concepts: ["产品规划", "项目交付", "里程碑", "资源协调"],
        source: PM_SOURCE,
      },
    },
    {
      id: "kickoff",
      label: "立项 Kick Off",
      type: "process",
      details: {
        zh_label: "Kick Off",
        summary: "项目正式启动的仪式与确认会议：对齐目标、明确范围、确认资源、分配责任。",
        analogy: "像运动会的发令枪：在这个时刻，所有人对「我们要做什么、谁负责什么、什么时候交付」达成共识。",
        notes: "好的 Kick Off 要输出：项目目标、范围边界、关键里程碑、团队分工、风险清单。不要把 Kick Off 开成「PPT 秀」。",
        key_concepts: ["项目启动", "目标对齐", "范围确认", "责任分工"],
        source: PM_SOURCE,
      },
    },
    {
      id: "development",
      label: "研发",
      type: "process",
      details: {
        summary: "工程师按照产品需求与技术方案进行代码实现的过程，是产品从设计变为现实的关键环节。",
        notes: "PM 在研发阶段的职责：答疑解惑（需求澄清）、保护团队不受干扰、跟踪进度、提前暴露风险。不要插手技术实现细节。",
        key_concepts: ["代码实现", "需求澄清", "进度管理", "技术评审"],
        source: PM_SOURCE,
      },
    },
    {
      id: "testing",
      label: "测试",
      type: "process",
      details: {
        summary: "验证产品功能是否符合需求、质量是否达标，包括功能测试、性能测试、用户验收测试等。",
        notes: "常见问题：测试时间被压缩、测试用例覆盖不足。PM 应在项目计划时保留足够测试时间，不能为了赶进度牺牲测试质量。",
        key_concepts: ["功能测试", "回归测试", "用户验收", "质量保障"],
        source: PM_SOURCE,
      },
    },
    {
      id: "release",
      label: "发布上线",
      type: "process",
      details: {
        zh_label: "Release",
        summary: "将经过测试的产品版本部署到生产环境，面向真实用户开放使用的关键节点。",
        analogy: "像演唱会的开场：所有排练结束，帷幕拉开，真实观众登场，一切变得不可逆。",
        notes: "发布前核查：功能验收完成、回滚方案就绪、监控告警到位、客服团队知悉。灰度发布可以降低风险。",
        key_concepts: ["灰度发布", "回滚方案", "监控告警", "发布公告"],
        source: PM_SOURCE,
      },
    },
    {
      id: "project_management",
      label: "山寨级项目管理",
      type: "process",
      details: {
        zh_label: "Lean Project Management",
        summary: "苏杰提出的适合互联网产品团队的轻量化项目管理方法：以里程碑为锚点，以每日站会同步进度，快速迭代。",
        notes: "「山寨级」不是贬义，而是强调：不要照搬重型 PMP 方法论，要用适合团队规模和文化的轻量方式管理项目。",
        key_concepts: ["里程碑", "每日站会", "迭代", "敏捷思维"],
        source: PM_SOURCE,
      },
    },
    {
      id: "risk_schedule",
      label: "进度与风险",
      type: "skill",
      details: {
        summary: "提前识别项目风险（技术难点、人员变动、需求变更）并制定应对方案，而不是等到发生才手忙脚乱。",
        analogy: "像舵手提前看天气预报：好天气时多赶路，风雨来前早避港。",
        notes: "风险管理三步：识别（哪些事可能出错）→ 评估（概率×影响）→ 应对（规避/减轻/转移/接受）。",
        key_concepts: ["风险识别", "进度跟踪", "缓冲时间", "应急方案"],
        source: PM_SOURCE,
      },
    },

    // ─── 第4章：团队 ────────────────────────────────────────
    {
      id: "team",
      label: "大产品大团队",
      type: "role",
      details: {
        summary: "优秀的产品离不开各职能协同：用户研究、设计、研发、测试、运营、市场缺一不可。",
        notes: "苏杰用「大产品」的概念说明：PM 要把整个团队看作产品生产系统，每个角色都有其不可替代的价值。",
        key_concepts: ["跨职能团队", "协作生态", "分工配合"],
        source: PM_SOURCE,
      },
    },
    {
      id: "business_team",
      label: "商业团队",
      type: "role",
      details: {
        summary: "包括销售、市场、商务等围绕商业变现展开工作的团队，是连接产品与市场的重要桥梁。",
        notes: "PM 与商业团队的关系：商业团队带回真实的市场需求和竞争信息，PM 要学会区分「真需求」和「一次性定制要求」。",
        source: PM_SOURCE,
      },
    },
    {
      id: "tech_team",
      label: "技术团队",
      type: "role",
      details: {
        summary: "负责产品工程实现的研发、架构、测试团队，是产品方案落地的执行方。",
        notes: "与技术团队相处之道：尊重技术复杂度、不随意承诺功能（先确认可行性）、理解技术债的危害。",
        key_concepts: ["研发协作", "技术可行性", "技术债"],
        source: PM_SOURCE,
      },
    },
    {
      id: "designer",
      label: "设计师",
      type: "role",
      details: {
        summary: "负责产品视觉与交互设计的专业角色，将功能需求转化为用户体验层面的界面与交互方案。",
        notes: "好的 PM-设计师协作：PM 说清楚「用户目标与约束」，设计师决定「怎么设计最好」。避免 PM 直接指定设计方案。",
        key_concepts: ["交互设计", "视觉设计", "用户体验", "设计决策权"],
        source: PM_SOURCE,
      },
    },
    {
      id: "operation",
      label: "运营",
      type: "role",
      details: {
        summary: "负责产品上线后的用户增长、留存、内容生态等运营工作，是产品价值实现的重要力量。",
        notes: "运营带来大量一线用户反馈，是 PM 需求采集的重要渠道。PM 要主动与运营团队保持信息同步。",
        key_concepts: ["用户增长", "内容运营", "活动运营", "用户反馈"],
        source: PM_SOURCE,
      },
    },
    {
      id: "boss",
      label: "老板/上级",
      type: "role",
      details: {
        summary: "资源的分配者与战略的制定者，也是PM需要管理预期、争取支持的关键stakeholder。",
        analogy: "老板是PM的「最终用户」之一：也需要被理解、被说服、被持续对齐。",
        notes: "与老板相处：主动汇报、透明沟通进度与风险、学会说「不」的同时给出替代方案。",
        key_concepts: ["向上管理", "期望管理", "资源争取", "透明汇报"],
        source: PM_SOURCE,
      },
    },
    {
      id: "forgotten_roles",
      label: "容易被遗忘的角落",
      type: "role",
      details: {
        summary: "客服、法务、财务、安全等支持性角色，往往在产品问题爆发时才被想起，但提前合作能规避很多风险。",
        notes: "苏杰特别提醒：客服是最贴近用户问题的角色，他们的反馈是免费的用户研究；法务和安全在关键节点必须提前介入。",
        source: PM_SOURCE,
      },
    },
    {
      id: "collaboration",
      label: "大家好才是真的好",
      type: "skill",
      details: {
        zh_label: "Collaboration",
        summary: "产品成功需要所有团队共赢：只顾自己KPI、损害他人利益的合作方式注定难以持久。",
        analogy: "像合唱：每个声部都要调整自己，才能让整体的声音和谐。没有哪个声部比其他声部更重要。",
        notes: "苏杰的合作哲学：多换位思考、多分享信息、多给予认可。信任一旦建立，协作成本会大幅下降。",
        key_concepts: ["换位思考", "信息共享", "互利共赢", "信任建立"],
        source: PM_SOURCE,
      },
    },

    // ─── 第5章：产品分析与战略 ────────────────────────────────
    {
      id: "product_analysis",
      label: "产品分析",
      type: "process",
      details: {
        summary: "通过数据与研究系统地评估产品的健康度、用户满意度、市场地位，发现改进机会。",
        notes: "产品分析框架：用户分析（谁在用）、行为分析（怎么用）、结果分析（达到目标了吗）。",
        key_concepts: ["产品健康度", "用户满意度", "增长机会", "数据仪表盘"],
        source: PM_SOURCE,
      },
    },
    {
      id: "kpi",
      label: "KPI 指标",
      type: "model",
      details: {
        zh_label: "Key Performance Indicator",
        summary: "衡量产品与团队目标达成情况的关键指标，是分解业务目标、追踪进展的量化工具。",
        notes: "好的KPI要：可量化、可影响、与业务目标直接相关。常见错误：KPI太多、KPI与实际目标脱节（如追求DAU却牺牲用户质量）。",
        key_concepts: ["量化目标", "业务对齐", "追踪机制", "北极星指标"],
        source: PM_SOURCE,
      },
    },
    {
      id: "data_driven",
      label: "数据驱动",
      type: "mindset",
      details: {
        zh_label: "Data-Driven",
        summary: "以客观数据而非主观感觉为决策依据，让产品迭代有据可依、效果可验证。",
        analogy: "不是「我感觉用户会喜欢」，而是「数据显示这个功能的使用率是多少」——用数字说话。",
        notes: "数据驱动不是数据崇拜：要理解数据背后的用户行为逻辑，避免被虚假指标（如刷量的DAU）迷惑。",
        key_concepts: ["量化决策", "数据可信度", "指标体系", "A/B测试"],
        source: PM_SOURCE,
      },
    },
    {
      id: "product_planning",
      label: "产品规划",
      type: "process",
      details: {
        zh_label: "Product Planning / Roadmap",
        summary: "根据战略目标制定产品演进路线图（Roadmap），明确各阶段的功能优先级与里程碑。",
        analogy: "像旅行路线规划：确定目的地（战略目标），再决定走哪条路、每段路停哪里（版本迭代计划）。",
        notes: "好的产品规划要：聚焦而非大而全、动态调整而非一成不变、对团队透明而非封闭在PM脑子里。",
        key_concepts: ["产品路线图", "版本规划", "优先级", "战略对齐"],
        source: PM_SOURCE,
      },
    },
    {
      id: "competitor_analysis",
      label: "竞品分析",
      type: "process",
      details: {
        zh_label: "Competitor Analysis",
        summary: "系统研究竞争对手的产品策略、功能设计、用户口碑，找到差异化机会与潜在威胁。",
        notes: "竞品分析不是「抄作业」：了解竞品是为了发现其未满足的用户需求，而非简单复制功能。方法：注册体验、用户评论、ASO数据。",
        key_concepts: ["竞争对手", "差异化", "市场定位", "SWOT分析"],
        source: PM_SOURCE,
      },
    },
    {
      id: "business_model",
      label: "商业模式",
      type: "model",
      details: {
        zh_label: "Business Model",
        summary: "产品如何创造、传递并获取价值的整体框架，决定产品的变现方式和长期可持续性。",
        analogy: "像店铺的经营方式：卖什么给谁、怎么定价、成本结构如何——想清楚才能持续盈利。",
        notes: "常见商业模式：订阅制、广告制、交易佣金、增值服务、硬件+服务。PM需要理解自己产品的商业逻辑，才能做出正确的功能决策。",
        key_concepts: ["变现路径", "价值主张", "成本结构", "收入来源"],
        source: PM_SOURCE,
      },
    },

    // ─── 第6章：自我修养 ────────────────────────────────────
    {
      id: "self_cultivation",
      label: "自我修养",
      type: "skill",
      details: {
        summary: "产品经理的综合素质提升：技能、思维、视野、心态的持续精进，是长期竞争力的根基。",
        notes: "苏杰认为好的PM需要「T型知识结构」——广博的横向视野 + 某个领域的深度专长。",
        key_concepts: ["持续学习", "综合素质", "T型人才", "长期主义"],
        source: PM_SOURCE,
      },
    },
    {
      id: "communication_skill",
      label: "沟通能力",
      type: "skill",
      details: {
        zh_label: "Communication",
        summary: "清晰表达想法、理解他人诉求、化解分歧的能力，是产品经理最核心的基础技能之一。",
        analogy: "沟通是PM的「操作系统」：所有其他能力都要通过沟通才能发挥作用。",
        notes: "关键技能：主动倾听（先理解再回应）、金字塔表达（结论先行）、书面表达（逻辑清晰的文档）。",
        key_concepts: ["主动倾听", "结构化表达", "跨层沟通", "书面表达"],
        source: PM_SOURCE,
      },
    },
    {
      id: "logical_thinking",
      label: "逻辑思维",
      type: "skill",
      details: {
        zh_label: "Logical Thinking",
        summary: "结构化分析问题的能力：把复杂问题拆解为可处理的子问题，识别假设与推断的有效性。",
        analogy: "像程序员调试代码：不是感觉哪里错了就乱改，而是逐步缩小范围、找到根因。",
        notes: "工具：MECE原则（相互独立、完全穷尽）、5 Why分析法、逻辑树。",
        key_concepts: ["MECE", "5 Why", "结构化分析", "逻辑树"],
        source: PM_SOURCE,
      },
    },
    {
      id: "learning_ability",
      label: "学习能力",
      type: "skill",
      details: {
        zh_label: "Learning Agility",
        summary: "快速吸收新领域知识、从失败中总结经验、保持好奇心持续进化的能力。",
        analogy: "互联网行业变化太快，学习能力是PM的「保质期」保证——停止学习就是开始过期。",
        notes: "苏杰建议：养成写作习惯（把学到的写下来才算真正学会）、定期复盘产品决策得失。",
        key_concepts: ["成长型思维", "复盘", "跨领域学习", "知识管理"],
        source: PM_SOURCE,
      },
    },
    {
      id: "time_management",
      label: "时间管理",
      type: "skill",
      details: {
        zh_label: "Time Management",
        summary: "在多线并行的产品工作中，合理分配时间与精力，专注于高优先级事项的能力。",
        notes: "PM常见时间黑洞：会议过多、被临时需求打断、救火而非防火。解决方案：时间块、异步沟通、学会拒绝低价值任务。",
        key_concepts: ["优先级", "深度工作", "会议效率", "边界管理"],
        source: PM_SOURCE,
      },
    },
    {
      id: "t_shaped",
      label: "T 型人才",
      type: "skill",
      details: {
        zh_label: "T-shaped Skills",
        summary: "横向：广博的跨领域知识（商业、技术、设计、心理学等）；纵向：某一专业领域的深度积累。",
        analogy: "像瑞士军刀：既有多种工具满足日常场景，又有一把最锋利的主刀应对核心挑战。",
        notes: "苏杰认为互联网产品经理的T型结构：横是用户研究+商业理解+技术常识+设计感，纵是自己产品所在垂直领域（电商/社交/工具等）的深度。",
        key_concepts: ["通才与专才", "跨领域", "深度积累", "复合型"],
        source: PM_SOURCE,
      },
    },
    {
      id: "pdca",
      label: "PDCA 循环",
      type: "model",
      details: {
        zh_label: "PDCA Cycle",
        summary: "计划（Plan）→ 执行（Do）→ 检查（Check）→ 改进（Act）的持续改进循环，适用于产品迭代与个人成长。",
        analogy: "像厨师改进菜谱：想好改哪里（P）→ 试做一批（D）→ 试吃反馈（C）→ 正式调整配方（A），循环精进。",
        notes: "PDCA 不只是方法论，更是心态：接受「第一版不完美」，建立持续学习与迭代的闭环。",
        key_concepts: ["持续改进", "迭代思维", "复盘机制", "闭环管理"],
        source: PM_SOURCE,
      },
    },
  ],

  edges: [
    // ─── 骨架：pm → 六大主题 hub ───────────────────────────
    {
      id: "pm__关注__user_research",
      source: "pm",
      target: "user_research",
      label: "关注",
    },
    {
      id: "pm__关注__project",
      source: "pm",
      target: "project",
      label: "关注",
    },
    {
      id: "pm__关注__team",
      source: "pm",
      target: "team",
      label: "关注",
    },
    {
      id: "pm__关注__product_analysis",
      source: "pm",
      target: "product_analysis",
      label: "关注",
    },
    {
      id: "pm__修炼__self_cultivation",
      source: "pm",
      target: "self_cultivation",
      label: "修炼",
    },
    {
      id: "pm__核心理念__everyone_is_pm",
      source: "pm",
      target: "everyone_is_pm",
      label: "核心理念",
    },
    {
      id: "pm__靠__influence",
      source: "pm",
      target: "influence",
      label: "靠",
    },
    {
      id: "pm__成长路径__pm_growth",
      source: "pm",
      target: "pm_growth",
      label: "成长路径",
    },

    // ─── 第1章边 ───────────────────────────────────────────
    {
      id: "everyone_is_pm__定义__pm_definition",
      source: "everyone_is_pm",
      target: "pm_definition",
      label: "定义",
    },
    {
      id: "pm_definition__关于__product_concept",
      source: "pm_definition",
      target: "product_concept",
      label: "关于",
    },
    {
      id: "pm__为何入行__why_pm",
      source: "pm",
      target: "why_pm",
      label: "为何入行",
    },

    // ─── 需求生命周期主线（有向）─────────────────────────────
    {
      id: "user__产生__user_research",
      source: "user",
      target: "user_research",
      label: "产生",
    },
    {
      id: "user_research__产出__requirement_collection",
      source: "user_research",
      target: "requirement_collection",
      label: "产出",
    },
    {
      id: "requirement_collection__进入__requirement_analysis",
      source: "requirement_collection",
      target: "requirement_analysis",
      label: "进入",
    },
    {
      id: "requirement_analysis__筛选__requirement_filter",
      source: "requirement_analysis",
      target: "requirement_filter",
      label: "输出",
    },
    {
      id: "requirement_filter__沉淀__requirement_management",
      source: "requirement_filter",
      target: "requirement_management",
      label: "沉淀",
    },
    {
      id: "requirement_management__输出__prd",
      source: "requirement_management",
      target: "prd",
      label: "输出",
    },
    {
      id: "prd__指导__prototype",
      source: "prd",
      target: "prototype",
      label: "指导",
    },
    {
      id: "prototype__进入__development",
      source: "prototype",
      target: "development",
      label: "进入",
    },

    // ─── 模型挂载 ──────────────────────────────────────────
    {
      id: "y_model__支撑__requirement_analysis",
      source: "y_model",
      target: "requirement_analysis",
      label: "支撑",
    },
    {
      id: "kano__支撑__requirement_filter",
      source: "kano",
      target: "requirement_filter",
      label: "支撑",
    },
    {
      id: "must_be_need__构成__kano",
      source: "must_be_need",
      target: "kano",
      label: "构成",
    },
    {
      id: "performance_need__构成__kano",
      source: "performance_need",
      target: "kano",
      label: "构成",
    },
    {
      id: "attractive_need__构成__kano",
      source: "attractive_need",
      target: "kano",
      label: "构成",
    },
    {
      id: "indifferent_need__构成__kano",
      source: "indifferent_need",
      target: "kano",
      label: "构成",
    },
    {
      id: "reverse_need__构成__kano",
      source: "reverse_need",
      target: "kano",
      label: "构成",
    },
    {
      id: "kano_questionnaire__支撑__kano",
      source: "kano_questionnaire",
      target: "kano",
      label: "支撑",
    },
    {
      id: "kano_questionnaire__产出__better_worse",
      source: "kano_questionnaire",
      target: "better_worse",
      label: "产出",
    },
    {
      id: "better_worse__定类__kano",
      source: "better_worse",
      target: "kano",
      label: "定类",
    },
    {
      id: "satisfaction_curve__刻画__kano",
      source: "satisfaction_curve",
      target: "kano",
      label: "刻画",
    },
    {
      id: "attractive_need__退化__performance_need",
      source: "attractive_need",
      target: "performance_need",
      label: "退化",
    },
    {
      id: "performance_need__退化__must_be_need",
      source: "performance_need",
      target: "must_be_need",
      label: "退化",
    },
    {
      id: "kano__对比__cost_benefit",
      source: "kano",
      target: "cost_benefit",
      label: "对比",
      directed: false,
    },
    {
      id: "maslow__关联__kano",
      source: "maslow",
      target: "kano",
      label: "关联",
    },
    {
      id: "cost_benefit__支撑__requirement_filter",
      source: "cost_benefit",
      target: "requirement_filter",
      label: "支撑",
    },
    {
      id: "user_value__构成__cost_benefit",
      source: "user_value",
      target: "cost_benefit",
      label: "构成",
    },
    {
      id: "business_value__构成__cost_benefit",
      source: "business_value",
      target: "cost_benefit",
      label: "构成",
    },
    {
      id: "implementation_cost__构成__cost_benefit",
      source: "implementation_cost",
      target: "cost_benefit",
      label: "构成",
    },
    {
      id: "rice__量化__cost_benefit",
      source: "rice",
      target: "cost_benefit",
      label: "量化",
    },
    {
      id: "user_value__关联__kano",
      source: "user_value",
      target: "kano",
      label: "关联",
    },
    {
      id: "business_value__支撑__brd",
      source: "business_value",
      target: "brd",
      label: "支撑",
    },
    {
      id: "maslow__支撑__user_research",
      source: "maslow",
      target: "user_research",
      label: "支撑",
    },
    {
      id: "kpi__支撑__product_analysis",
      source: "kpi",
      target: "product_analysis",
      label: "支撑",
    },
    {
      id: "business_model__支撑__product_planning",
      source: "business_model",
      target: "product_planning",
      label: "支撑",
    },
    {
      id: "pdca__支撑__self_cultivation",
      source: "pdca",
      target: "self_cultivation",
      label: "支撑",
    },
    {
      id: "t_shaped__支撑__self_cultivation",
      source: "t_shaped",
      target: "self_cultivation",
      label: "支撑",
    },

    // ─── 需求采集方法并列挂 requirement_collection ───────────
    {
      id: "user_interview__支撑__requirement_collection",
      source: "user_interview",
      target: "requirement_collection",
      label: "支撑",
    },
    {
      id: "questionnaire__支撑__requirement_collection",
      source: "questionnaire",
      target: "requirement_collection",
      label: "支撑",
    },
    {
      id: "usability_test__支撑__requirement_collection",
      source: "usability_test",
      target: "requirement_collection",
      label: "支撑",
    },
    {
      id: "focus_group__支撑__requirement_collection",
      source: "focus_group",
      target: "requirement_collection",
      label: "支撑",
    },
    {
      id: "data_analysis__支撑__requirement_collection",
      source: "data_analysis",
      target: "requirement_collection",
      label: "支撑",
    },

    // ─── 用户研究 → 用户画像 ──────────────────────────────
    {
      id: "user_research__产出__persona",
      source: "user_research",
      target: "persona",
      label: "产出",
    },
    {
      id: "persona__支撑__requirement_analysis",
      source: "persona",
      target: "requirement_analysis",
      label: "支撑",
    },

    // ─── 文档链 ────────────────────────────────────────────
    {
      id: "brd__细化__mrd",
      source: "brd",
      target: "mrd",
      label: "细化",
    },
    {
      id: "mrd__细化__prd",
      source: "mrd",
      target: "prd",
      label: "细化",
    },
    {
      id: "requirement_pool__支撑__requirement_management",
      source: "requirement_pool",
      target: "requirement_management",
      label: "支撑",
    },
    {
      id: "requirement_management__维护__requirement_pool",
      source: "requirement_management",
      target: "requirement_pool",
      label: "维护",
      directed: false,
    },

    // ─── 项目流水线（有向）────────────────────────────────
    {
      id: "project__始于__kickoff",
      source: "project",
      target: "kickoff",
      label: "始于",
    },
    {
      id: "kickoff__启动__development",
      source: "kickoff",
      target: "development",
      label: "启动",
    },
    {
      id: "development__完成后__testing",
      source: "development",
      target: "testing",
      label: "完成后",
    },
    {
      id: "testing__通过后__release",
      source: "testing",
      target: "release",
      label: "通过后",
    },
    {
      id: "project_management__串联__project",
      source: "project_management",
      target: "project",
      label: "串联",
    },
    {
      id: "risk_schedule__支撑__project_management",
      source: "risk_schedule",
      target: "project_management",
      label: "支撑",
    },

    // ─── 理念-实践呼应（对称）────────────────────────────
    {
      id: "listen_not_copy__呼应__requirement_analysis",
      source: "listen_not_copy",
      target: "requirement_analysis",
      label: "指导",
      directed: false,
    },
    {
      id: "product_principle__指导__requirement_filter",
      source: "product_principle",
      target: "requirement_filter",
      label: "指导",
    },
    {
      id: "data_driven__支撑__product_analysis",
      source: "data_driven",
      target: "product_analysis",
      label: "支撑",
    },
    {
      id: "data_driven__支撑__data_analysis",
      source: "data_driven",
      target: "data_analysis",
      label: "支撑",
    },

    // ─── 团队角色围绕 pm/team 放射 ────────────────────────
    {
      id: "team__包含__business_team",
      source: "team",
      target: "business_team",
      label: "包含",
    },
    {
      id: "team__包含__tech_team",
      source: "team",
      target: "tech_team",
      label: "包含",
    },
    {
      id: "team__包含__designer",
      source: "team",
      target: "designer",
      label: "包含",
    },
    {
      id: "team__包含__operation",
      source: "team",
      target: "operation",
      label: "包含",
    },
    {
      id: "team__包含__boss",
      source: "team",
      target: "boss",
      label: "包含",
    },
    {
      id: "team__包含__forgotten_roles",
      source: "team",
      target: "forgotten_roles",
      label: "包含",
    },
    {
      id: "collaboration__连接__team",
      source: "collaboration",
      target: "team",
      label: "连接",
    },
    {
      id: "communication_skill__支撑__collaboration",
      source: "communication_skill",
      target: "collaboration",
      label: "支撑",
    },

    // ─── 自我修养 → 各技能 ─────────────────────────────
    {
      id: "self_cultivation__包含__communication_skill",
      source: "self_cultivation",
      target: "communication_skill",
      label: "包含",
    },
    {
      id: "self_cultivation__包含__logical_thinking",
      source: "self_cultivation",
      target: "logical_thinking",
      label: "包含",
    },
    {
      id: "self_cultivation__包含__learning_ability",
      source: "self_cultivation",
      target: "learning_ability",
      label: "包含",
    },
    {
      id: "self_cultivation__包含__time_management",
      source: "self_cultivation",
      target: "time_management",
      label: "包含",
    },

    // ─── 产品分析与战略 ────────────────────────────────
    {
      id: "product_analysis__输出__product_planning",
      source: "product_analysis",
      target: "product_planning",
      label: "输出",
    },
    {
      id: "product_planning__依赖__competitor_analysis",
      source: "product_planning",
      target: "competitor_analysis",
      label: "依赖",
    },

    // ─── 发布后回路 ─────────────────────────────────────
    {
      id: "release__数据回流__data_analysis",
      source: "release",
      target: "data_analysis",
      label: "数据回流",
    },
    {
      id: "data_analysis__支撑__product_analysis",
      source: "data_analysis",
      target: "product_analysis",
      label: "支撑",
    },
  ],
};

// ============================================================
// PM 图类型 → 色系映射（有别于 AI 图的液态玻璃暖色系）
//   mindset  暖紫 / role 金棕 / process 翠绿
//   model    靛青 / deliverable 玫红 / skill 橙黄
// ============================================================
const pmTypeStyles: Record<string, NodeTypeStyle> = {
  mindset: {
    base: "#b07de8",
    glow: "rgba(176, 125, 232, 0.30)",
    label: "理念",
  },
  role: {
    base: "#c9913a",
    glow: "rgba(201, 145, 58, 0.30)",
    label: "角色",
  },
  process: {
    base: "#52b080",
    glow: "rgba(82, 176, 128, 0.30)",
    label: "流程",
  },
  model: {
    base: "#4a9dc4",
    glow: "rgba(74, 157, 196, 0.30)",
    label: "模型",
  },
  deliverable: {
    base: "#d96b8a",
    glow: "rgba(217, 107, 138, 0.30)",
    label: "产出物",
  },
  skill: {
    base: "#d4a23c",
    glow: "rgba(212, 162, 60, 0.30)",
    label: "能力",
  },
};

const pmTypeOrder: string[] = [
  "process",
  "model",
  "deliverable",
  "role",
  "mindset",
  "skill",
];

export const pmMap: KnowledgeMap = {
  id: "pm",
  label: "产品经理",
  subtitle: "产品经理知识图谱",
  data: pmGraphData,
  typeStyles: pmTypeStyles,
  typeOrder: pmTypeOrder,
  preferredSeed: "pm",
};
