import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// AI Agent 知识图谱
// 覆盖7个顶层维度 + 产品经理视角
// 从概念到应用、从认知架构到商业落地的完整知识体系
// ============================================================

const agentGraphData: GraphData = {
  nodes: [
    // ═════════════════════════════════════════
    // 维度一：核心定义与本质特性
    // ═════════════════════════════════════════
    {
      id: "ai_agent",
      label: "AI Agent",
      type: "concept",
      details: {
        zh_label: "AI 智能体",
        summary: "以大语言模型（LLM）为核心驱动的自主实体，遵循「感知→思考→行动」循环，能理解目标、拆解任务、调用工具并自主执行，是 AI 从「对话工具」走向「数字员工」的关键范式跃迁。",
        analogy: "像一个有判断力的私人助理：你告诉他「帮我安排下周的出差」，他不会只回你「好的」，而是自己查日历、比机票、订酒店、发确认邮件——每一步他都自己判断、自己动手。",
        notes: "Agent 与传统 Chatbot 的核心区别：Chatbot 是「你问一句我答一句」的被动模式；Agent 是「给一个目标，我自主完成」的主动模式。2025-2026 年被称为 Agent 元年，Anthropic Claude Code、OpenAI Operator、Google Project Mariner 等产品将 Agent 从实验室推向生产环境。",
        key_concepts: ["自主性", "感知-思考-行动循环", "工具调用", "目标驱动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_autonomy",
      label: "自主性",
      type: "concept",
      details: {
        zh_label: "Autonomy",
        summary: "Agent 在给定目标后，无需人类逐步指令即可自行拆解子任务、编排执行顺序并做出决策的能力，是 Agent 区别于传统软件的核心特征。",
        analogy: "像一位能独立完成项目的实习生：你交代「做一份竞品分析报告」，他自己去搜集资料、整理对比、做图表、写结论，只在关键节点找你确认——而不是每做一步都来问你下一步该干嘛。",
        notes: "自主性有层级：L1 辅助（Copilot，人主导）→ L2 半自主（人审批关键决策）→ L3 全自主（人仅设定目标与边界）。当前大部分 Agent 处于 L2 阶段。自主性越高，对安全护栏和可观测性的要求越严格。",
        key_concepts: ["目标拆解", "子任务委派", "自主决策", "L1-L3 层级"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_reactivity",
      label: "反应性",
      type: "concept",
      details: {
        zh_label: "Reactivity",
        summary: "Agent 对环境变化（新信息、任务中断、错误反馈）做出实时调整的能力，决定了 Agent 在动态场景中的鲁棒性。",
        analogy: "像开车时遇到突然横穿的行人——不是按原计划继续开，而是立即刹车、评估新情况、重新决策。Agent 也需要在执行任务过程中随时感知变化并调整策略。",
        notes: "反应性 vs 惰性执行：惰性 Agent 按预定计划执行到底，遇到错误就卡住；反应性 Agent 在每步执行后重新评估环境状态，必要时调整计划。ReAct（Reasoning + Acting）模式是反应性的经典实现。",
        key_concepts: ["实时响应", "动态调整", "ReAct模式", "错误恢复"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_proactivity",
      label: "主动性",
      type: "concept",
      details: {
        zh_label: "Proactivity",
        summary: "Agent 不等用户指令，基于对用户习惯、环境状态和目标的理解，主动发起行动或提出建议的能力。",
        analogy: "像一位贴心的管家：不是等你喊「该交电费了」才去交，而是看到电费余额不足主动提醒你，甚至在你授权后自动帮你续费。",
        notes: "主动性依赖三个基础：① 环境感知（知道什么变了）；② 用户模型（知道你在乎什么）；③ 假设验证（猜你可能需要什么，错了就收回）。过度主动会变成骚扰，需要控制频率和置信度阈值。",
        key_concepts: ["环境感知", "用户模型", "假设验证", "主动建议"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_social",
      label: "社交协作能力",
      type: "concept",
      details: {
        zh_label: "Social Ability",
        summary: "Agent 与其他 Agent 或人类进行信息交换、任务协调和意图理解的能力，是多 Agent 系统和人机协同的基础。",
        analogy: "像团队协作里的默契：你和同事不需要每件事都写书面协议，一个眼神、一句「我这边搞定了」就能让下游自然接上。Agent 之间也需要这种轻量级的「社交协议」。",
        notes: "Agent 间通信协议：自然语言、结构化 JSON、MCP（Model Context Protocol）、A2A（Agent-to-Agent）。人类协作方面需要：意图识别（用户说「这个方案还行」是真满意还是勉强接受）、确认机制（关键决策前向人类确认）。",
        key_concepts: ["Agent间通信", "A2A协议", "意图识别", "人机协同"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度二：认知架构
    // ═════════════════════════════════════════
    {
      id: "cognitive_architecture",
      label: "认知架构",
      type: "architecture",
      details: {
        zh_label: "Cognitive Architecture",
        summary: "Agent 的「大脑内部结构」，包含记忆系统、规划引擎和推理核心三个子系统，共同决定 Agent 如何思考、记住和决策。",
        analogy: "像人的心智结构：记忆系统是你的海马体（记住过去）、规划引擎是你的前额叶（计划未来）、推理核心是你的逻辑思维（判断对错）。三者缺一不可。",
        notes: "认知架构是 Agent 知识图谱的核心枢纽。左侧连接「记忆与感知」（输入），右侧连接「工具与行动」（输出），上方连接「多 Agent 协作」（宏观），下方连接「评估与安全」（约束）。",
        key_concepts: ["记忆系统", "规划引擎", "推理核心", "输入-处理-输出"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_memory",
      label: "记忆系统",
      type: "architecture",
      details: {
        zh_label: "Memory System",
        summary: "Agent 存储、检索和更新信息的机制，分为短期记忆（上下文窗口）、长期记忆（向量数据库/知识图谱）和工作记忆（当前任务状态），是 Agent 保持连续性和学习能力的基础。",
        analogy: "像人的三种记忆：短期记忆是「刚才说了什么」（上下文窗口 128K tokens），长期记忆是「我的人生经历」（向量数据库中存储的过往对话和知识），工作记忆是「我正在做的这道题的草稿纸」（当前任务的中间状态）。",
        notes: "当前瓶颈：① 上下文窗口有限（虽然已达 128K-1M tokens，但长对话仍会溢出）；② 长期记忆检索精度不足（向量相似度匹配容易召回无关信息）；③ 记忆更新策略（何时写入、何时遗忘）缺乏成熟方案。MemGPT、Mem0、Letta 等项目在探索让 LLM 自主管理记忆的方案。",
        key_concepts: ["短期记忆/上下文窗口", "长期记忆/向量存储", "工作记忆/任务栈", "记忆检索与遗忘"],
        source: { type: "conversation" },
      },
    },
    {
      id: "planning_engine",
      label: "规划引擎",
      type: "architecture",
      details: {
        zh_label: "Planning Engine",
        summary: "Agent 将复杂目标分解为可执行步骤序列的核心模块，决定了 Agent「想得多清楚」和「做得对不对」，是认知架构中最关键的组件。",
        analogy: "像下棋时的策略思考：看到「将军」这个最终目标，你不会随便走一步算一步，而是先在脑子里推演几步——先逼对方走位，再调动棋子，最后绝杀。规划引擎就是让 Agent 具备这种「多步推演」的能力。",
        notes: "主流规划方法：① 思维链（CoT，一步步推理）；② 思维树（ToT，多条路径并行探索）；③ Plan-Execute-Reflect（先计划、再执行、最后反思调整）；④ ReAct（推理与行动交替）；⑤ 分层任务网络（HTN，将目标层层分解为子任务树）。实际应用中常混合使用多种方法。",
        key_concepts: ["CoT思维链", "ToT思维树", "Plan-Execute-Reflect", "HTN分层规划"],
        source: { type: "conversation" },
      },
    },
    {
      id: "reasoning_core",
      label: "推理核心",
      type: "architecture",
      details: {
        zh_label: "Reasoning Core",
        summary: "Agent 在规划和执行中进行逻辑判断的机制，包括演绎推理（规则推导）、归纳推理（模式发现）和反事实推理（「如果那样会怎样」的假设模拟）。",
        analogy: "像法官判案：演绎推理是「根据法律条文，这种情况应该判三年」（规则→结论）；归纳推理是「我判过的 100 个类似案子，90 个都是这种情况，这次大概率也是」（样本→规律）；反事实推理是「如果被告当时没有离开现场，结果会不会不同」（假设→推演）。",
        notes: "当前 LLM 的推理局限：① 演绎推理较可靠（给定规则能正确应用）；② 归纳推理有偏差（训练数据中的统计规律不等于真实因果）；③ 反事实推理不稳定（容易产生幻觉）。提升方向：代码辅助推理（让 LLM 写 Python 来验证逻辑）、多步验证（自我反驳后重新推理）。",
        key_concepts: ["演绎推理", "归纳推理", "反事实推理", "代码辅助推理"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度三：感知与交互系统
    // ═════════════════════════════════════════
    {
      id: "perception_layer",
      label: "感知层",
      type: "architecture",
      details: {
        zh_label: "Perception Layer",
        summary: "Agent 获取外部世界信息的入口，将文本、图像、音频、视频、3D 点云等多模态输入转化为模型可理解的统一表示，是「感知→思考」的起点。",
        analogy: "像人的五官：眼睛看（视觉编码器）、耳朵听（音频转文字）、手摸（传感器数据）。Agent 的「感官」越多，能处理的任务类型越丰富。",
        notes: "多模态趋势：GPT-4o / Gemini 已原生支持文本+图像+音频输入输出。工程挑战：① 不同模态的对齐（如何让「看到一只猫」和「听到猫叫」指向同一个概念）；② 延迟（多模态编码比纯文本慢 3-10 倍）；③ 成本（图像 token 比文本 token 贵 10-100 倍）。",
        key_concepts: ["多模态编码", "文本/图像/音频", "状态空间向量化", "模态对齐"],
        source: { type: "conversation" },
      },
    },
    {
      id: "action_layer",
      label: "行动层",
      type: "architecture",
      details: {
        zh_label: "Action Layer",
        summary: "Agent 执行决策的「手」，将推理结果转化为具体动作：原子动作（单次 API 调用）、复合动作（多步骤工作流）和具身动作（物理世界操作），是「思考→行动」的终点。",
        analogy: "像人的行动能力：拿起杯子（原子动作）、做一顿饭（复合动作，需按菜谱一步步来）、打篮球（具身动作，需要实时感知+运动控制）。Agent 的行动层决定了它到底能「做什么」。",
        notes: "原子动作（API 调用、代码执行、文本回复）已较成熟。复合动作（工作流编排、UI 自动化操作）是当前产品化重点——Claude Computer Use、OpenAI Operator 都在探索让 Agent 像人一样操作软件界面。具身动作（机器人控制）仍处于实验室阶段，核心瓶颈是物理世界的高延迟和不可逆性。",
        key_concepts: ["原子动作/API调用", "复合动作/工作流", "具身动作/机器人", "UI操作"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度四：工具与生态集成
    // ═════════════════════════════════════════
    {
      id: "tool_ecosystem",
      label: "工具生态",
      type: "architecture",
      details: {
        zh_label: "Tool Ecosystem",
        summary: "Agent 扩展能力的「工具箱」，通过标准化的工具调用协议接入外部 API、数据库、软件和服务，让 Agent 从「对话机器」升级为「操作系统的智能层」。",
        analogy: "像智能手机的应用商店：手机本身只是一块屏幕和芯片，但装了微信、支付宝、高德之后，它就变成了社交工具+钱包+导航仪。Agent 的工具生态就是它的 App Store。",
        notes: "三大工具调用协议：① Function Calling（OpenAI 标准，LLM 输出结构化 JSON 调用预定义函数）；② MCP/Model Context Protocol（Anthropic 推出的开放协议，标准化 Agent 与外部工具的连接方式）；③ OpenAPI/Swagger（传统 REST API 规范，Agent 通过阅读 API 文档自主学会调用）。",
        key_concepts: ["Function Calling", "MCP协议", "OpenAPI", "工具检索与路由"],
        source: { type: "conversation" },
      },
    },
    {
      id: "tool_types",
      label: "工具类型",
      type: "technique",
      details: {
        zh_label: "Tool Categories",
        summary: "Agent 可调用的工具按来源分为三类：本地工具（计算器/代码解释器，运行在 Agent 本地环境）、网络工具（搜索引擎/爬虫，需要外部网络访问）、垂直 SaaS 工具（飞书/邮件/数据库/CRM，需要 API 授权）。",
        analogy: "像办公室里的三样东西：计算器和草稿纸放在桌上随时用（本地工具），图书馆和互联网需要出门查（网络工具），财务系统和客户管理系统需要账号密码登录（SaaS 工具）。",
        notes: "工具选择的工程挑战：① 工具描述的质量直接影响 Agent 选择正确工具的概率——描述太简单 Agent 不会用，太复杂占上下文；② 工具过多导致选择困难，需要工具检索和路由机制（用向量相似度匹配任务和工具）；③ 工具的权限管理和安全边界（Agent 能删文件吗？能发邮件吗？能花钱吗？）。",
        key_concepts: ["本地工具", "网络工具", "SaaS工具", "权限管理"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度五：系统拓扑结构
    // ═════════════════════════════════════════
    {
      id: "agent_topology",
      label: "系统拓扑",
      type: "architecture",
      details: {
        zh_label: "System Topology",
        summary: "Agent 系统的组织形态：从单 Agent 模式到多 Agent 协作网络，再到人机协同回路。选择哪种拓扑结构取决于任务复杂度、可靠性要求和成本约束。",
        analogy: "像公司的组织结构：一个人能搞定的事就单干（单 Agent），复杂项目需要组团队分工（多 Agent），关键决策需要领导审批（Human-in-the-loop）。",
        notes: "三种组织形态不是互斥的，实际系统中常混合使用：一个主 Agent 负责与用户交互和规划，多个子 Agent 各负责一个领域，关键节点由人类审批。这种「主管-下属 + 人工审批」的混合架构是当前企业级 Agent 的主流方案。",
        key_concepts: ["单Agent", "多Agent系统", "人机协同", "混合架构"],
        source: { type: "conversation" },
      },
    },
    {
      id: "single_agent",
      label: "单 Agent 模式",
      type: "architecture",
      details: {
        zh_label: "Single Agent",
        summary: "由一个 Agent 独立完成从感知到行动的全流程。实现简单、延迟低、成本可控，适合边界清晰的单一任务。",
        analogy: "像独立摄影师：一个人扛相机、选角度、按快门、修图，全流程自己搞定。拍一场婚礼够了，拍奥运会开幕式就得组团队。",
        notes: "经典实现：① ReAct（Reasoning + Acting，推理与行动交替进行）；② Reflexion（自我反思，执行后评估结果、从错误中学习并重试）。单 Agent 的瓶颈：上下文窗口容量有限（记不住太多中间状态）、缺少多视角交叉验证（容易一条路走到黑）。",
        key_concepts: ["ReAct", "Reflexion", "简单可靠", "上下文瓶颈"],
        source: { type: "conversation" },
      },
    },
    {
      id: "multi_agent",
      label: "多 Agent 系统",
      type: "architecture",
      details: {
        zh_label: "Multi-Agent System (MAS)",
        summary: "由多个 Agent 协作完成复杂任务的系统架构，通过分工、辩论或竞价来提升任务质量和鲁棒性。",
        analogy: "像一个项目团队：产品经理定方向（主管 Agent）、设计师出方案、开发写代码、测试找 Bug——各司其职但共享同一个目标。出了分歧就开会讨论（辩论），谁有资源谁先上（竞价）。",
        notes: "三种协作模式：① 主管-下属（Hierarchical，一个主 Agent 分配任务给子 Agent）；② 对等辩论（Debate，多个 Agent 独立完成同一任务后互相评审，选最优结果）；③ 市场竞价（Market，Agent 之间通过竞价分配子任务）。ChatDev、AutoGen、CrewAI 等框架让开发者可以用几行代码搭一个多 Agent 系统。",
        key_concepts: ["主管-下属", "对等辩论", "市场竞价", "ChatDev/AutoGen"],
        source: { type: "conversation" },
      },
    },
    {
      id: "human_in_loop",
      label: "人机协同",
      type: "architecture",
      details: {
        zh_label: "Human-in-the-Loop",
        summary: "在 Agent 工作流的关键节点插入人工审批或干预机制，确保安全、合规和最终决策质量，是企业级 Agent 落地的必备设计。",
        analogy: "像自动驾驶的 L2/L3 分级：L2 时人手不离开方向盘，随时准备接管；L3 时车可以自己开，但遇到复杂路况会提前请求驾驶员介入。Agent 的 Human-in-the-loop 同理——常规操作自主完成，高风险动作（付款、发邮件给客户、删除数据）必须人工确认。",
        notes: "两个层次：① Human-in-the-loop（关键节点人工审批，人在流程内）；② Human-on-the-loop（宏观策略指导，人在流程外监督）。后者是更理想的目标——人不参与每一次决策，但设置规则和边界，定期审查 Agent 的行为日志。",
        key_concepts: ["人工审批", "关键节点", "L2/L3分级", "安全兜底"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度六：学习与进化机制
    // ═════════════════════════════════════════
    {
      id: "agent_learning",
      label: "学习与进化",
      type: "concept",
      details: {
        zh_label: "Learning & Evolution",
        summary: "Agent 从交互中持续改进自身能力的机制：在线学习（实时注入上下文）、离线优化（基于历史数据微调模型）和元学习（跨任务的快速适应），决定了 Agent 用越久越「聪明」还是越用越「笨」。",
        analogy: "像员工成长的三条路径：在线学习是「边干边学，师傅在旁边随时指点」；离线优化是「季度总结，把过去三个月踩的坑整理成培训材料」；元学习是「换了新岗位也能快速上手，因为掌握了学习的方法本身」。",
        notes: "当前实践：① 在线学习最常用——将用户反馈、任务结果实时注入上下文窗口，成本低、见效快；② 离线优化（RLHF/DPO 微调）效果好但成本高，适合重大版本升级；③ 元学习仍处于研究阶段，Agent 的「学会如何学习」尚未成熟。关键挑战：如何区分「应该记住的规律」和「应该忘掉的噪音」。",
        key_concepts: ["在线学习/上下文注入", "离线优化/RLHF/DPO", "元学习", "经验回放"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 维度七：评估与安全护栏
    // ═════════════════════════════════════════
    {
      id: "agent_evaluation",
      label: "评估体系",
      type: "concept",
      details: {
        zh_label: "Evaluation",
        summary: "衡量 Agent 表现的多维度指标体系，包括任务完成率、步骤效率、工具调用准确率、幻觉率和用户满意度，是 Agent 产品迭代和质量管理的基础。",
        analogy: "像给员工做绩效评估：不只是看「活儿干完了没」（完成率），还要看「花了多长时间」（效率）、「用了正确的方法还是瞎折腾」（准确率）、「有没有编造数据」（幻觉率）、「老板和客户满不满意」（满意度）。",
        notes: "关键指标：① 任务完成率（Success Rate）——最核心，但需注意任务难度加权；② 步骤效率（Step Efficiency）——完成同样任务所需的推理+执行步数，步数越少越成熟；③ 工具调用准确率——选对工具、用对参数的比例；④ 幻觉率（Hallucination Rate）——输出中事实性错误的占比。评估难点：主观任务的自动化评分仍不可靠，需要人工标注。",
        key_concepts: ["任务完成率", "步骤效率", "工具调用准确率", "幻觉率"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_safety",
      label: "安全护栏",
      type: "concept",
      details: {
        zh_label: "Safety Guardrails",
        summary: "防止 Agent 做出危险或不可逆操作的多层防护机制，包括越狱防护、权限最小化、操作可回滚和成本熔断，是 Agent 从「能用」到「敢用」的关键门槛。",
        analogy: "像给实习生的操作权限设置：不能自己决定超过 1000 块的采购（成本熔断），不能删数据库（权限最小化），做的每个操作都记录在案（可审计），说错话了师父在旁边纠正（越狱防护）。",
        notes: "四层防护：① 越狱防护——防止 Prompt Injection 让 Agent 执行恶意指令；② 权限最小化——Agent 只能访问完成任务所需的最小权限集，不能删文件、不能随意发邮件；③ 操作可回滚——所有破坏性操作（删除、发送、扣款）必须有回滚方案或软删除；④ 成本熔断——设置 Token 预算上限，防止 Agent 陷入死循环烧钱。",
        key_concepts: ["越狱防护", "权限最小化", "操作可回滚", "成本熔断"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_observability",
      label: "可解释性与可观测",
      type: "concept",
      details: {
        zh_label: "Observability & Explainability",
        summary: "让 Agent 的决策过程透明化的能力：思维链可视化、决策树追踪和置信度评分，帮助开发者和用户理解「Agent 为什么这么做」，是建立信任和高效排障的基础。",
        analogy: "像飞机上的黑匣子：平时没人看，但一旦出了问题，飞行数据记录仪（Agent 的每一步操作日志）和舱内录音（Agent 的推理过程）能帮你精确还原「当时发生了什么」。",
        notes: "三大支柱：① 思维链可视化——将 Agent 的推理步骤展示为可读的流程图；② 决策树追踪——记录每一步的输入、可选路径、选择理由和执行结果；③ 置信度评分——让 Agent 对其输出标注「我有多确定」，低置信度时主动请求人类确认。可观测性是 PM 评估 Agent 产品质量的关键维度——用户不敢用黑箱。",
        key_concepts: ["思维链可视化", "决策追踪", "置信度评分", "信任建立"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 产品经理视角：Agent 产品化
    // ═════════════════════════════════════════
    {
      id: "agent_productization",
      label: "Agent 产品化",
      type: "mindset",
      details: {
        zh_label: "Agent Productization",
        summary: "将 Agent 技术转化为可交付用户价值的产品方案，涉及场景选择、体验设计、商业模式和落地策略，是 PM 在 Agent 时代最核心的能力课题。",
        analogy: "像把发明家的原型机变成消费者愿意买的商品：技术上说「我们的 Agent 能自主完成 50 步的任务链」，用户只关心「它能帮我省多少时间、少操多少心」。产品化的本质是把技术能力翻译成用户价值。",
        notes: "PM 需要回答的五个核心问题：① 这个 Agent 替用户解决了什么「完整」的任务（而不是某个环节）？② 用户如何信任它——哪些步骤需要确认、哪些可以自动？③ 出错了怎么办——用户怎么纠正、怎么回滚？④ 怎么衡量它做得好不好？⑤ 用户愿意为它付多少钱、付给谁？",
        key_concepts: ["场景选择", "价值翻译", "信任设计", "商业闭环"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_ux",
      label: "Agent 体验设计",
      type: "mindset",
      details: {
        zh_label: "Agent UX Design",
        summary: "为 Agent 产品设计用户交互界面的独特方法论：与传统 App 的「点击-响应」模式不同，Agent 的交互是「目标-执行-确认」的异步协作模式，需要全新的设计范式。",
        analogy: "像从「自己开车」变成「坐出租车」：自己开车时你需要方向盘、油门、刹车（传统 UI 控件）；坐出租车时你只需要说「去机场」然后看窗外，只在路线不对时开口纠正——Agent 的交互就该是这样。",
        notes: "与传统 UX 的核心差异：① 输入从「精确操作」变为「自然语言意图表达」；② 反馈从「即时响应」变为「异步进度更新」；③ 容错从「撤销按钮」变为「对话纠正」；④ 信任建立需要「思维过程可见」而非「加载动画」。Agent UX 的设计原则：展示思考过程、允许中途干预、出错可对话修正。",
        key_concepts: ["意图表达", "异步协作", "对话纠正", "思考过程可见"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_business_model",
      label: "Agent 商业模式",
      type: "mindset",
      details: {
        zh_label: "Agent Business Models",
        summary: "Agent 产品的盈利方式：从按 Token/API 调用计费的基础模式，到按任务完成付费的结果导向模式，再到按节省的人力成本分成的价值捕获模式，商业模式决定了 Agent 产品的可持续性。",
        analogy: "像律师收费的三种方式：按小时收费（Token 计费）、按案子收费（任务定价）、按胜诉金额抽成（价值分成）。Agent 产品越能证明「帮你赚了/省了多少钱」，越能用价值分成模式。",
        notes: "当前主流是 Token/API 计费（OpenAI/Anthropic 的 API 模式），但产品化 Agent 正走向按任务定价：写一篇市场分析报告 $5、处理 100 封客服邮件 $10。终极模式是价值分成——Agent 帮你省了 $1000 的人力成本，抽 $200。PM 需要理解不同模式的适用场景和定价弹性。",
        key_concepts: ["Token计费", "任务定价", "价值分成", "定价弹性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_competitive",
      label: "Agent 竞品格局",
      type: "mindset",
      details: {
        zh_label: "Agent Competitive Landscape",
        summary: "当前 Agent 市场的竞争态势：海外以 Anthropic Claude Code、OpenAI Operator、Google Project Mariner 为代表；国内以 Coze（字节）、Dify（开源）、百川 Agent 为代表，各自在不同垂直领域建立壁垒。",
        analogy: "像 2008 年的移动互联网：App Store 刚上线，大家都在摸索「什么样的 App 值得做」。现在的 Agent 市场就是那个阶段——巨头铺平台、创业公司找场景、先发者在垂直领域圈地。",
        notes: "三个竞争维度：① 平台之争（谁成为 Agent 的「操作系统」——Anthropic MCP vs OpenAI GPTs vs Google）；② 场景之争（谁在客服、销售、编程、数据分析等垂直领域做到最好）；③ 数据之争（Agent 越用越好用，先发者的用户数据积累形成护城河）。PM 需要判断自己的产品在哪个维度上建立优势。",
        key_concepts: ["平台生态", "垂直场景", "数据飞轮", "先发优势"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_requirement",
      label: "Agent 需求定义",
      type: "mindset",
      details: {
        zh_label: "Defining Agent Requirements",
        summary: "为 Agent 产品定义需求的特殊方法论：传统软件定义的是「功能」（能做什么），Agent 产品定义的是「能力边界」（能自主决定什么、不能自主决定什么），以及「失败模式」（做错了怎么办）。",
        analogy: "像给员工写岗位说明书和给 AI 写 Prompt 的区别：岗位说明书列职责（「负责客户投诉处理」），Prompt 还要写判断标准（「金额小于 100 元自动退款，大于 100 元转人工」）和禁止事项（「不得承诺赔偿金额」）。Agent 的需求文档就是一份高度结构化的「工作守则」。",
        notes: "Agent 需求文档的三要素：① 成功标准——什么算完成了任务（不是「回复了用户」而是「用户的问题被解决了」）；② 权限边界——什么可以自主决定、什么必须确认（类似 KANO 模型对功能的分类）；③ 失败模式——做错了怎么发现、怎么纠正、怎么补偿。PM 要学会从「功能列表思维」切换到「能力边界思维」。",
        key_concepts: ["能力边界", "成功标准", "失败模式", "权限设计"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_prompt_engineering",
      label: "提示词工程",
      type: "technique",
      details: {
        zh_label: "Prompt Engineering",
        summary: "设计和优化 Agent 系统提示词（System Prompt）的方法论——Agent 的「行为准则」和「能力说明书」，直接决定了 Agent 的性格、能力和边界。是 PM 需要掌握的核心实操技能。",
        analogy: "像写一份详细的岗位培训手册：不是简单说「你是客服」，而是写清楚「你的服务风格是专业但亲切」「遇到退款请求时按这个流程判断」「以下五种情况直接转人工」——Prompt 就是 Agent 的入职培训。",
        notes: "关键技巧：① 角色设定（「你是一位有 10 年经验的金融分析师」）——设定专业水平和语气风格；② 能力声明（「你可以调用以下工具：搜索、计算、发送邮件」）——明确边界；③ 行为约束（「永远不要编造数据」「不确定时主动说明」）——安全底线；④ 输出格式（「用 JSON 格式返回」）——与系统对接。PM 不需要会写代码，但要会写好的 Prompt。",
        key_concepts: ["角色设定", "能力声明", "行为约束", "输出格式"],
        source: { type: "conversation" },
      },
    },
    {
      id: "agent_benchmark",
      label: "Agent 评测基准",
      type: "technique",
      details: {
        zh_label: "Agent Benchmarks",
        summary: "衡量 Agent 能力水平的标准化测试集：SWE-bench（软件工程任务）、WebArena（网页操作）、OSWorld（操作系统操作）、GAIA（通用 AI 助手评测），是 PM 评估和对比 Agent 产品的客观标尺。",
        analogy: "像汽车的碰撞测试评级：消费者不需要懂工程原理，看 NCAP 几颗星就知道这车安不安全。Agent 的 Benchmark 就是让 PM 在不看代码的情况下，也能判断一个 Agent 产品「靠不靠谱」。",
        notes: "常用 Benchmark：① SWE-bench——让 Agent 修 GitHub Issue，考察编程和调试能力；② WebArena——让 Agent 在模拟网站上完成购物、订票等任务；③ GAIA——综合考察推理、多模态、工具使用和防幻觉能力，最接近真实 Assistant 场景。PM 在选型 Agent 技术方案时，应优先参考与你产品场景最接近的 Benchmark 分数。",
        key_concepts: ["SWE-bench", "WebArena", "GAIA", "场景匹配"],
        source: { type: "conversation" },
      },
    },
  ],

  edges: [
    // ═════════════════════════════════════════
    // 核心定义 → 特性
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "agent_autonomy", relation: "核心特征" },
    { source: "ai_agent", target: "agent_reactivity", relation: "核心特征" },
    { source: "ai_agent", target: "agent_proactivity", relation: "核心特征" },
    { source: "ai_agent", target: "agent_social", relation: "核心特征" },

    // ═════════════════════════════════════════
    // Agent → 认知架构
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "cognitive_architecture", relation: "依赖" },
    { source: "cognitive_architecture", target: "agent_memory", relation: "包含" },
    { source: "cognitive_architecture", target: "planning_engine", relation: "包含" },
    { source: "cognitive_architecture", target: "reasoning_core", relation: "包含" },

    // ═════════════════════════════════════════
    // Agent → 感知与交互
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "perception_layer", relation: "输入" },
    { source: "ai_agent", target: "action_layer", relation: "输出" },
    { source: "perception_layer", target: "cognitive_architecture", relation: "输入至" },
    { source: "cognitive_architecture", target: "action_layer", relation: "输出至" },

    // ═════════════════════════════════════════
    // Agent → 工具生态
    // ═════════════════════════════════════════
    { source: "action_layer", target: "tool_ecosystem", relation: "通过…执行" },
    { source: "tool_ecosystem", target: "tool_types", relation: "分类为" },

    // ═════════════════════════════════════════
    // Agent → 系统拓扑
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "agent_topology", relation: "组织为" },
    { source: "agent_topology", target: "single_agent", relation: "基础模式" },
    { source: "agent_topology", target: "multi_agent", relation: "协作模式" },
    { source: "agent_topology", target: "human_in_loop", relation: "安全模式" },
    { source: "single_agent", target: "planning_engine", relation: "使用" },
    { source: "multi_agent", target: "agent_social", relation: "依赖" },

    // ═════════════════════════════════════════
    // Agent → 学习与进化
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "agent_learning", relation: "持续改进" },
    { source: "agent_learning", target: "agent_memory", relation: "更新" },
    { source: "agent_learning", target: "planning_engine", relation: "优化" },

    // ═════════════════════════════════════════
    // Agent → 评估与安全
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "agent_evaluation", relation: "被评估" },
    { source: "ai_agent", target: "agent_safety", relation: "被约束" },
    { source: "ai_agent", target: "agent_observability", relation: "被监控" },
    { source: "agent_safety", target: "human_in_loop", relation: "通过…实现" },
    { source: "agent_evaluation", target: "agent_benchmark", relation: "使用" },

    // ═════════════════════════════════════════
    // 产品经理视角关联
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "agent_productization", relation: "产品化" },
    { source: "agent_productization", target: "agent_ux", relation: "涉及" },
    { source: "agent_productization", target: "agent_business_model", relation: "涉及" },
    { source: "agent_productization", target: "agent_competitive", relation: "分析" },
    { source: "agent_productization", target: "agent_requirement", relation: "定义" },
    { source: "agent_requirement", target: "agent_prompt_engineering", relation: "落地工具" },
    { source: "agent_ux", target: "agent_observability", relation: "依赖" },
    { source: "agent_ux", target: "human_in_loop", relation: "设计" },
    { source: "agent_business_model", target: "agent_evaluation", relation: "定价依据" },

    // ═════════════════════════════════════════
    // 跨域关联：Agent ↔ 已有 AI 图谱
    // ═════════════════════════════════════════
    { source: "ai_agent", target: "deep_learning", relation: "基于" },
    { source: "ai_agent", target: "transformer", relation: "基于" },
    { source: "planning_engine", target: "self_attention", relation: "底层机制" },
    { source: "agent_memory", target: "unsupervised_learning", relation: "利用嵌入技术" },
    { source: "agent_learning", target: "reinforcement_learning", relation: "利用RLHF" },
  ],
};

export const agentMap: KnowledgeMap = {
  id: "agent",
  name: "AI Agent",
  nameZh: "AI 智能体",
  description: "从概念到应用、从认知架构到商业落地的完整 AI Agent 知识图谱，涵盖 7 个技术维度与产品经理视角。",
  icon: "🤖",
  graphData: agentGraphData,
  nodeStyle: {
    concept: {
      color: "#8B5CF6",
      borderColor: "#7C3AED",
      shape: "ellipse",
    } as NodeTypeStyle,
    architecture: {
      color: "#3B82F6",
      borderColor: "#2563EB",
      shape: "box",
    } as NodeTypeStyle,
    technique: {
      color: "#10B981",
      borderColor: "#059669",
      shape: "diamond",
    } as NodeTypeStyle,
    mindset: {
      color: "#F59E0B",
      borderColor: "#D97706",
      shape: "ellipse",
    } as NodeTypeStyle,
  },
};
