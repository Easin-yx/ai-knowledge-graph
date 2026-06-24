import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// 逻辑表达知识图谱 — 「搬运」隐喻 · 把脑中的画面搬进对方脑子里
//
// 写给「脑子里清楚、嘴上说不明白」的人，目标是搭出一套可落地、
// 可刻意练习的「面试 + 说话」方法论，而不只是一堆概念。
//
// 一句话方法论（贯穿全图的主线）：
//   认知（接受想≠说）→ 开口前固定动作（定结论·搭骨架·选框架）
//   → 输出（结论先行·序号化·配例子·过渡·收尾）→ 场景（面试题型套框架）
//   → 复盘（录音找毛病）→ 刻意练习（把流程练成本能）。这是一个闭环。
//
// 组织主线（expression 作 preferredSeed，向外放射）：
//   ① 底层认知 mindset   —— 想明白为什么会卡、怎么稳住心态
//   ② 逻辑内核 logic     —— 把想法理顺（含「开口前固定动作」这条主轴）
//   ③ 结构框架 structure —— 给想法一条可复用的轨道
//   ④ 临场技巧 technique —— 把轨道铺到嘴上、铺到表情上
//   ⑤ 应用场景 scenario  —— 面试为主战场，含高频题型的作答模板
//   ⑥ 常见误区 pitfall   —— 把坑标出来反向校准
//   ⑦ 刻意练习 practice  —— 让能力真正长出来的训练闭环
//
// 「搬运」隐喻世界观（所有 analogy 取词依据）：
//   想法=要寄的货物   表达=一次快递   听众=收件人   听众视角=收件地址
//   逻辑=打包方式     结构=配送路线图  技巧=运输工具  误区=寄丢/寄乱的事故
//   刻意练习=反复跑这条线，直到闭眼也不会送错
// ============================================================

const expressionGraphData: GraphData = {
  nodes: [
    // ═════════════════════════════════════════
    // 核心 (core)
    // ═════════════════════════════════════════
    {
      id: "expression",
      label: "逻辑表达",
      type: "core",
      details: {
        zh_label: "表达力",
        summary:
          "把脑子里的想法，准确、有条理地搬进对方脑子里的能力；它不考验你想得有多深，而考验你能否让别人轻松地跟上你。",
        analogy:
          "像寄一件快递：货物（想法）在你这儿好好的，但收件人能不能完好收到，取决于你怎么打包（逻辑）、走哪条配送路线（结构）、用什么车送（技巧）。东西再好，包装乱、路线绕，对方也只会收到一堆碎片。",
        notes:
          "「想得清楚」和「说得清楚」是两种独立能力，可以分别训练。本图谱给的不是零散技巧，而是一条闭环：认知 → 开口前固定动作 → 结构化输出 → 场景套用 → 复盘 → 刻意练习。建议学习顺序：先看『底层认知』松绑自我怀疑 → 抓住『开口前固定动作』这条主轴 → 背熟 2~3 个『结构框架』→ 用『应用场景』里的模板套面试题 → 靠『刻意练习』把它练成本能。",
        key_concepts: ["想法搬运", "听众可跟随", "可刻意练习", "认知-输出-复盘闭环"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 底层认知 (mindset)
    // ═════════════════════════════════════════
    {
      id: "thinking_vs_speaking",
      label: "思考≠表达",
      type: "mindset",
      details: {
        zh_label: "想清楚不等于说清楚",
        summary:
          "脑子里的想法是同时浮现、互相关联的一张网；而说话只能一个字接一个字。卡壳的根源，正是这张网没被拆成一条线。",
        analogy:
          "脑子像一间堆满货物的仓库，你一眼就能看到全貌；但快递员一次只能搬一件出门。仓库里东西齐全（你想得清楚），不代表你知道该先搬哪件、按什么顺序搬（说得清楚）。",
        notes:
          "意识到这一点本身就是解药：你不是笨，你只是跳过了「把网拆成线」这一步。接受表达需要一个额外的转译动作，就不会再因为「明明懂却说不出」而自我怀疑，而是去补那条线性化的流程——也就是本图的『开口前固定动作』。",
        key_concepts: ["网状思维", "线性语言", "转译缺口", "非智力问题"],
        source: { type: "conversation" },
      },
    },
    {
      id: "linear_constraint",
      label: "线性化约束",
      type: "mindset",
      details: {
        zh_label: "语言是一条线",
        summary:
          "语言的物理限制：只能串行输出。所以表达的核心动作，就是给一团并行的想法强行排出一个先后顺序。",
        analogy:
          "再多货物也只有一条传送带能出库，一次过一件。你的工作不是把仓库塞得更满，而是决定传送带上货物的排队顺序。",
        notes:
          "排序的依据通常是：重要的先出（结论先行）、相关的连着出（归类分组）、有因果的按因到果出。一旦接受「必须排队」，你就会主动去想顺序，而不是把所有想法一股脑倒出来。",
        key_concepts: ["串行输出", "排队顺序", "先后取舍", "线性化"],
        source: { type: "conversation" },
      },
    },
    {
      id: "audience_first",
      label: "听众视角",
      type: "mindset",
      details: {
        zh_label: "从对方已知出发",
        summary:
          "表达是为对方服务的，不是自我表演。要从听众已经知道什么、关心什么出发，而不是从你想说什么出发。",
        analogy:
          "寄快递得写对方的收件地址，不是写你自己家地址。说话也一样：信息要送到对方的认知坐标上——他不懂的术语要翻译，他不关心的细节要砍掉。",
        notes:
          "面试里最常见的失误就是只顾倾倒自己准备好的内容，不看面试官想要什么。一个实用动作：开口前先问自己「对方现在最想听到的是什么？」据此决定先说什么、用什么词。把焦点放在「对方」而非「我表现得好不好」，还能顺带缓解紧张。",
        key_concepts: ["收件地址", "对方已知", "对方关心", "翻译术语"],
        source: { type: "conversation" },
      },
    },
    {
      id: "working_memory",
      label: "听者工作记忆",
      type: "mindset",
      details: {
        zh_label: "对方一次记不了几件事",
        summary:
          "人脑短时记忆容量很小（约 3~4 组块）。一次塞太多并列信息，对方根本接不住，听完就忘。",
        analogy:
          "收件人手里只有那么大的篮子，你一次塞十件，掉一地；分成三趟、每趟三件并打好包，他才接得稳。",
        notes:
          "这是「结论先行」「序号化」「控制信息量」等技巧的共同科学依据。实操原则：一段话的并列要点尽量不超过三个；超过就再归一层类。给信息分组、贴标签，就是在帮对方的记忆减负。",
        key_concepts: ["短时记忆", "组块容量", "三的法则", "记忆减负"],
        source: { type: "conversation" },
      },
    },
    {
      id: "cognitive_load",
      label: "认知负荷",
      type: "mindset",
      details: {
        zh_label: "听懂是要费力气的",
        summary:
          "听众理解你的话需要消耗脑力；一旦费力超过阈值，他们就会放弃跟随。好表达的目标是让对方「省力地听懂」。",
        analogy:
          "路线绕、红绿灯多，送货就慢还容易丢件。每一句绕弯、每一个不必要的术语，都是给对方加一道红绿灯。",
        notes:
          "降低认知负荷的手段：先给结论让对方有预期、用熟悉的类比替代抽象概念、控制每句信息密度、用过渡词提示逻辑走向。把「让对方省力」当成表达的第一性目标，很多技巧就自然推导出来了。",
        key_concepts: ["理解成本", "省力原则", "信息密度", "放弃阈值"],
        source: { type: "conversation" },
      },
    },
    {
      id: "nervousness",
      label: "紧张管理",
      type: "mindset",
      details: {
        zh_label: "把紧张关进笼子",
        summary:
          "表达弱的人往往不是不会说，而是一紧张就大脑空白、语速失控、口头禅暴增。管理好紧张，前面学的所有方法才用得出来。",
        analogy:
          "司机不是不会开车，而是一上路就手抖。先让手稳下来，技术才发挥得出来——紧张就是那只抖的手。",
        notes:
          "四个实操开关：①把注意力从「我表现得怎样」转到「对方需要什么」（听众视角是最强的解药）；②开口前深呼吸 3 秒，给身体一个「安全」信号；③靠『结构』兜底——有框架在手，哪怕脑子空白也能顺着框架往下说；④靠『刻意练习/模拟面试』脱敏，紧张本质是「不熟悉」，见多了就不慌。记住：适度紧张是正常的，连演员都会怯场，目标是带着紧张照样说清楚，而不是消灭紧张。",
        key_concepts: ["大脑空白", "注意力外移", "深呼吸", "靠结构兜底"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 逻辑内核 (logic)
    // ═════════════════════════════════════════
    {
      id: "structured_thinking",
      label: "结构化思维",
      type: "logic",
      details: {
        zh_label: "把想法理成树",
        summary:
          "在开口前，先把零散想法整理成「有主次、有归类、有顺序」的层级结构。逻辑表达的总开关。",
        analogy:
          "发货前先把仓库的货分门别类上架、贴好标签、排好出库顺序。理货做好了，搬运（说话）只是顺着架子往外拿，自然不会乱。",
        notes:
          "结构化思维 = 结论先行（自上而下定主干）+ 归类分组（横向切块）+ MECE（切得不重不漏）。它是一种可练习的习惯：拿到任何话题，先在脑中（或纸上）搭出「1 个结论 + 2~3 个支撑」的小树，再开口。它的临场落地版就是本图的『开口前固定动作』。",
        key_concepts: ["层级结构", "主次分明", "先搭树再说话", "可练习"],
        source: { type: "conversation" },
      },
    },
    {
      id: "speak_routine",
      label: "开口前固定动作",
      type: "logic",
      details: {
        zh_label: "说之前的 3 步（方法论主轴）",
        summary:
          "整套方法论的可执行核心：任何问题,开口前都先跑这三步——①定一个结论 ②搭 2~3 个支点 ③选一个框架往里套。三步走完再说话。",
        analogy:
          "快递员出车前的固定流程：先确认送到哪（结论）、要送哪几件（支点）、走哪条路线（框架）。流程化之后，再急的单子也不会乱发车。",
        notes:
          "这是把「结构化思维」压缩成临场能用的肌肉记忆。具体话术节奏：被问到后，先用一句「这个问题我从两方面看」或一次停顿,争取 2~3 秒 → 心里默定结论 → 数出 2~3 个点 → 套 PREP / 总分总 → 开口。哪怕只跑出「一个结论 + 两点」，也远胜想到哪说到哪。练熟它，是从「会道理」到「张口就有逻辑」的关键一跃；本图所有框架、技巧都是为这三步服务的。",
        key_concepts: ["定结论", "搭支点", "选框架", "临场肌肉记忆"],
        source: { type: "conversation" },
      },
    },
    {
      id: "conclusion_first",
      label: "结论先行",
      type: "logic",
      details: {
        zh_label: "先给答案再讲理由",
        summary:
          "先说最重要的结论/观点，再展开理由和细节。让对方一开口就知道你要去哪儿。",
        analogy:
          "快递先把「这是你要的那件重要包裹」递到对方手上，他才有耐心听你解释里面是什么。反过来先讲一堆铺垫再亮结论，对方早就走神了。",
        notes:
          "这是金字塔原理最核心的一条，也是中式表达最缺的一条（习惯铺垫到最后才点题）。万能句式：「我的结论是 X，主要有三点原因：第一……第二……第三……」。面试答题尤其要先正面回答问题本身，再补充论证——别让面试官听半天还不知道你到底答没答。",
        key_concepts: ["答案前置", "建立预期", "对抗铺垫", "总分结构"],
        source: { type: "conversation" },
      },
    },
    {
      id: "mece",
      label: "MECE 原则",
      type: "logic",
      details: {
        zh_label: "不重不漏",
        summary:
          "Mutually Exclusive, Collectively Exhaustive：把一件事拆分成几块时，做到「相互独立、完全穷尽」——不重叠、不遗漏。",
        analogy:
          "把货物分箱：每件只进一个箱（不重），所有件都进了箱（不漏）。分箱清楚，对方一看箱子标签就知道全貌。",
        notes:
          "常用切分维度：时间（过去/现在/未来）、流程（前/中/后）、要素（人/事/物）、对立（优点/缺点）。MECE 让你的「三点」显得专业而有体系，而不是想到哪点凑哪点。检验方法：问自己「还有别的吗？」「这两点是不是说的一回事？」",
        key_concepts: ["相互独立", "完全穷尽", "切分维度", "结构感"],
        source: { type: "conversation" },
      },
    },
    {
      id: "grouping",
      label: "归类分组",
      type: "logic",
      details: {
        zh_label: "把同类的捆一起",
        summary:
          "把零散的信息点按共性归成几组，再给每组起一个概括性的名字。这是从混乱到有序的关键一步。",
        analogy:
          "一堆杂货先按品类归箱（食品、衣物、电器），再给每箱贴标签。对方记三个标签，远比记二十件散货轻松。",
        notes:
          "归类后一定要「向上提炼」出组名——只是分堆不够，要给每堆一个能概括内容的标题，这就是金字塔里的「论点」。提炼组名的过程往往会反过来逼你发现逻辑漏洞。",
        key_concepts: ["按共性归并", "向上提炼", "组名即论点", "化散为整"],
        source: { type: "conversation" },
      },
    },
    {
      id: "induction",
      label: "归纳推理",
      type: "logic",
      details: {
        zh_label: "从具体到结论",
        summary:
          "从一组具体事实/现象中提炼出共同的结论。讲案例、摆数据后总结观点，走的就是归纳。",
        analogy:
          "收到好几个客户的同款投诉，归纳出「这个功能有硬伤」。一件件具体的货，拼出一个总判断。",
        notes:
          "归纳是从下往上得结论，论据之间是并列关系（共同支撑一个论点）。表达时常配合结论先行：先抛归纳出的结论，再列支撑它的几个事实。注意归纳的可靠性取决于样本是否充分、是否有反例。",
        key_concepts: ["从具体到一般", "并列论据", "样本充分", "提炼共性"],
        source: { type: "conversation" },
      },
    },
    {
      id: "deduction",
      label: "演绎推理",
      type: "logic",
      details: {
        zh_label: "从前提到结论",
        summary:
          "由大前提 + 小前提推出结论（如「这类岗位需要 X，我具备 X，所以我适合」）。论据之间是递进关系。",
        analogy:
          "按规则一步步配送：大前提是「凡寄往本市次日达」，你这件寄往本市，所以次日达。一环扣一环，结论无可辩驳。",
        notes:
          "演绎的链条是串行的，前一步推出后一步，适合做严密论证和说服。表达时要让对方看清每一环，常用「因为……所以……因此……」。风险在于：只要一个前提站不住，结论就垮，所以前提要先立稳。",
        key_concepts: ["大前提小前提", "递进链条", "环环相扣", "严密说服"],
        source: { type: "conversation" },
      },
    },
    {
      id: "causal_chain",
      label: "因果链",
      type: "logic",
      details: {
        zh_label: "讲清来龙去脉",
        summary:
          "用「因为→所以」把事件串成一条因果链，让对方明白事情为什么发生、你为什么这么做。",
        analogy:
          "讲清这件货为什么晚到：因为暴雨→封路→改道→延迟。一条清晰的因果链，对方就不会觉得你在找借口。",
        notes:
          "面试讲经历时，因果链能体现你的思考深度：不只说「我做了什么」，而是「我判断出问题是 A（因），所以采取 B（果），最终带来 C」。注意区分相关与因果，别把「同时发生」当成「导致」。",
        key_concepts: ["因为所以", "来龙去脉", "思考深度", "相关≠因果"],
        source: { type: "conversation" },
      },
    },
    {
      id: "claim_evidence",
      label: "论点论据",
      type: "logic",
      details: {
        zh_label: "观点要有支撑",
        summary:
          "任何观点都要配得上证据：先亮观点（论点），再用事实、数据、案例（论据）撑起来。空有观点等于没说。",
        analogy:
          "你说货是好货，得拿出质检报告和买家好评。光说「真的很好」，对方凭什么信？",
        notes:
          "面试里「我抗压能力强」是论点，必须跟一个具体事例当论据，否则就是空话。好习惯：每说一个评价性的词，立刻自问「凭什么/举个例子？」用事实代替形容词，是从「自夸」变「可信」的关键。",
        key_concepts: ["先观点后证据", "用事实代替形容词", "可信度", "拒绝空话"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 结构框架 (structure)
    // ═════════════════════════════════════════
    {
      id: "pyramid_principle",
      label: "金字塔原理",
      type: "structure",
      details: {
        zh_label: "结论先行 · 以上统下",
        summary:
          "最经典的表达骨架：一个中心结论在顶，下面是几组论点，每组论点再由论据支撑。纵向「结论先行」，横向「归类分组、MECE」。",
        analogy:
          "一张总配送路线图：总仓（中心结论）→ 几个分拨中心（论点）→ 各自的末端网点（论据）。任何一件货都能在图上找到自己的位置，对方顺着图就能跟到底。",
        notes:
          "四条规则：①结论先行 ②以上统下（上层是下层的概括）③归类分组 ④逻辑递进/排序。它是其他框架（SCQA、PREP）的母体。掌握它，等于有了一个能套任何话题的万能脚手架：先定中心思想，再切 2~3 块，每块配证据。",
        key_concepts: ["中心结论", "以上统下", "横向归类", "万能脚手架"],
        source: { type: "book", title: "金字塔原理", authors: ["芭芭拉·明托"] },
      },
    },
    {
      id: "scqa",
      label: "SCQA 框架",
      type: "structure",
      details: {
        zh_label: "背景-冲突-疑问-回答",
        summary:
          "开场引入的经典结构：情景(Situation)→冲突(Complication)→疑问(Question)→回答(Answer)。用来快速制造悬念、引出你的主张。",
        analogy:
          "像送货前先讲一段开场白：「本来一切正常（情景），结果路断了（冲突），怎么办（疑问）？我改走了另一条路（回答）。」对方立刻被代入，想听下去。",
        notes:
          "SCQA 特别适合做汇报/自我介绍的开头：先用一两句铺设背景与转折，制造「然后呢」的好奇，再抛出你的核心观点。A（回答）通常就是金字塔的塔尖，后面顺势展开。",
        key_concepts: ["制造悬念", "情景冲突", "代入感", "引出主张"],
        source: { type: "book", title: "金字塔原理", authors: ["芭芭拉·明托"] },
      },
    },
    {
      id: "prep",
      label: "PREP 框架",
      type: "structure",
      details: {
        zh_label: "观点-理由-例子-重申",
        summary:
          "最适合临场快速组织一段话的微框架：Point 观点 → Reason 理由 → Example 例子 → Point 重申观点。",
        analogy:
          "一趟短途配送的标准流程：先说送什么（观点）、为什么（理由）、上次也这么送很好（例子）、所以就这么定（重申）。简单到能背下来，临场直接套。",
        notes:
          "PREP 是「结论先行」的最小可执行版，30 秒就能搭好一段有逻辑的话，是『开口前固定动作』里最常用的那个框架。即兴提问、面试快问快答时，脑中默念 P-R-E-P 四个字母：「我认为 X（P）→ 因为 Y（R）→ 比如有一次 Z（E）→ 所以我觉得 X（P）」。结尾重申能让对方记住你的核心。",
        key_concepts: ["微框架", "临场可套", "首尾呼应", "结论先行落地"],
        source: { type: "conversation" },
      },
    },
    {
      id: "star",
      label: "STAR 法则",
      type: "structure",
      details: {
        zh_label: "情境-任务-行动-结果",
        summary:
          "讲经历/案例的黄金结构：Situation 情境 → Task 任务 → Action 行动 → Result 结果。面试行为问题的标准答法。",
        analogy:
          "完整复盘一次配送任务：当时什么情况、要完成什么、我具体做了哪几步、最后结果如何。对方听完就能完整还原你的能力。",
        notes:
          "重点在 A（行动）和 R（结果）：A 要突出「你」具体做了什么、怎么判断的（而非团队泛泛），R 最好量化（提升 30%、节省 2 天）。S 和 T 要简短，别在背景上耗时。模板：「当时（S，一句）……我负责（T，一句）……我做了三件事：第一……第二……第三……（A，重点）……最终（R，量化结果）」。这是把空泛的「我能力强」变成可信故事的最佳容器。",
        key_concepts: ["情境任务行动结果", "突出个人行动", "结果量化", "行为面试"],
        source: { type: "conversation" },
      },
    },
    {
      id: "what_why_how",
      label: "黄金圈",
      type: "structure",
      details: {
        zh_label: "What-Why-How / 是什么-为什么-怎么做",
        summary:
          "万能的三段拆解：是什么、为什么、怎么做。用来把任何概念或主张讲得既完整又有层次。",
        analogy:
          "介绍一项配送新服务：它是什么（次日达）、为什么要做（客户等不及）、怎么实现（增设分拨点）。三层下来，对方既懂概念又信价值。",
        notes:
          "Why 居中是 Simon Sinek 的洞见：先讲动机/价值，比先讲功能更打动人。日常用「是什么-为什么-怎么做」三连，就能把一个观点撑成有头有尾的一段话，是即兴拆解话题的好用切分维度。",
        key_concepts: ["三段拆解", "先讲动机", "概念完整", "切分维度"],
        source: { type: "conversation" },
      },
    },
    {
      id: "total_sub_total",
      label: "总分总",
      type: "structure",
      details: {
        zh_label: "总起-分述-总结",
        summary:
          "最朴素也最稳的结构：开头给总观点，中间分点展开，结尾收束重申。一段话、一次发言都能用。",
        analogy:
          "送货前报「一共三件」，中途逐件交付，最后确认「三件齐了」。对方全程心里有数，不会漏接。",
        notes:
          "「总」起到给预期、收尾的作用，「分」承载内容。它和金字塔一脉相承，只是更口语化。面试任何开放题都能先用一句总起兜住方向，再分点，最后一句收回主题，避免说着说着没了落点。",
        key_concepts: ["先总后分", "给预期", "收束重申", "稳定结构"],
        source: { type: "conversation" },
      },
    },
    {
      id: "parallel_progressive",
      label: "并列与递进",
      type: "structure",
      details: {
        zh_label: "三点之间的关系",
        summary:
          "展开要点时，几点之间要么是并列（同层并存），要么是递进（层层深入）。先想清是哪种，再开口。",
        analogy:
          "三件货可以是「三个不同收件人」各自独立（并列），也可以是「一件套一件」的组合包，必须按顺序拆（递进）。搞错关系，对方就会被绕晕。",
        notes:
          "并列用「第一、第二、第三」或「一方面、另一方面」；递进用「不仅……而且……甚至……」「首先……在此基础上……最终……」。明确点与点的关系，是让「三点」听起来有逻辑而非堆砌的关键。",
        key_concepts: ["并列关系", "递进关系", "关系词信号", "层次清晰"],
        source: { type: "conversation" },
      },
    },
    {
      id: "transition",
      label: "过渡衔接",
      type: "structure",
      details: {
        zh_label: "给逻辑装路标",
        summary:
          "用连接词和过渡句标明各部分之间的逻辑关系，让对方时刻知道你说到哪了、接下来要去哪。",
        analogy:
          "配送路线上的路标和指示牌：到了岔路口提醒对方「我们要从原因转到对策了」。没有路标，对方很容易在你的话里迷路。",
        notes:
          "常用路标：转折（但是/然而）、因果（因此/所以）、递进（更重要的是）、总结（综上/简单说）、并列（首先/其次）。一句「说完背景，我重点讲三个做法」就是强力路标。过渡是降低听众认知负荷最廉价的手段。",
        key_concepts: ["连接词", "逻辑路标", "防止迷路", "降低负荷"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 临场技巧 (technique)
    // ═════════════════════════════════════════
    {
      id: "opening",
      label: "开场",
      type: "technique",
      details: {
        zh_label: "前 15 秒定调",
        summary:
          "开头几句决定对方愿不愿意认真听。一个好开场要么直接给结论，要么用 SCQA 制造悬念，迅速抓住注意力。",
        analogy:
          "快递员敲门第一句话：是「您好这是您期待已久的包裹」还是支支吾吾，直接决定对方开门的态度。",
        notes:
          "避免「那个/我先想一下/我可能说得不太好」这类自我削弱的开场。面试自我介绍可用一句话定位自己（结论先行），再展开；回答问题可先复述要点表明听懂了，再作答。",
        key_concepts: ["黄金15秒", "抓注意力", "避免自我削弱", "定调"],
        source: { type: "conversation" },
      },
    },
    {
      id: "analogy_skill",
      label: "打比方",
      type: "technique",
      details: {
        zh_label: "用熟悉解释陌生",
        summary:
          "把抽象、陌生的概念，类比成对方熟悉的事物，瞬间降低理解成本。最强的「让人秒懂」工具。",
        analogy:
          "解释「带宽」就说「像水管的粗细」——对方没学过网络，但天天用水管，一下就懂了。",
        notes:
          "好类比的要点：本体和喻体在关键结构上相似，且喻体是对方熟悉的。面试中能把复杂工作讲成一个生动比喻，会显得既懂行又会沟通。注意类比只为帮助理解，别在不恰当处过度延伸。",
        key_concepts: ["熟悉解释陌生", "降低理解成本", "结构相似", "秒懂"],
        source: { type: "conversation" },
      },
    },
    {
      id: "storytelling",
      label: "讲故事",
      type: "technique",
      details: {
        zh_label: "用情节承载观点",
        summary:
          "把观点包进一个有起伏的小故事里。人天生记不住道理，但记得住故事和场景。",
        analogy:
          "与其说「我们配送很可靠」，不如讲「那次暴雨夜我亲自把最后一件货送到」。一个画面，胜过十句保证。",
        notes:
          "故事三要素：具体的人/场景、一个冲突或转折、一个结果或感悟。面试讲经历时用 STAR 当故事骨架，加一点细节和情绪，就从「汇报」变成「能让人记住的故事」。但别为戏剧化而失真。",
        key_concepts: ["情节承载观点", "画面感", "冲突与转折", "易记忆"],
        source: { type: "conversation" },
      },
    },
    {
      id: "example",
      label: "举例子",
      type: "technique",
      details: {
        zh_label: "用具体落地抽象",
        summary:
          "每说一个抽象观点，立刻跟一个具体例子。例子是观点的着陆点，没有它对方抓不住。",
        analogy:
          "说「我们什么都能寄」太空，不如举「上周还帮人寄了一台钢琴」。一个实例，胜过一堆形容。",
        notes:
          "口诀「观点 + 比如」：每当冒出一个评价或概括，马上接「比如有一次……」。这是论点论据原则最轻量的落地方式，也是消除空话套话最有效的动作。面试中具体例子永远比抽象自评更有说服力。",
        key_concepts: ["观点加比如", "具体落地", "论据", "对抗空话"],
        source: { type: "conversation" },
      },
    },
    {
      id: "numbering",
      label: "序号化",
      type: "technique",
      details: {
        zh_label: "先报数量再展开",
        summary:
          "先说「有三点」，再逐条「第一…第二…第三…」。给对方一个清晰的清单框架，听感立刻变得有条理。",
        analogy:
          "送货前先报「一共三件」，对方心里有了格子，每来一件就放进一个格子，听到第三件就知道齐了。",
        notes:
          "先报总数是关键——它给对方的工作记忆预设了几个空位，大幅降低记忆负担，也逼你自己在开口前就想清到底几点。数量控制在 3 个左右最佳，多了对方记不住。即兴时不确定几点，可先说「我主要讲两方面」给自己定边界。这是表达弱的人最容易立竿见影的一招。",
        key_concepts: ["先报数量", "预设记忆槽", "三的法则", "清单感"],
        source: { type: "conversation" },
      },
    },
    {
      id: "pause",
      label: "停顿",
      type: "technique",
      details: {
        zh_label: "留白让对方跟上",
        summary:
          "在关键观点后、转换话题前刻意停顿一两秒，给对方消化的时间，也给自己组织语言的空间。",
        analogy:
          "送完一件重要的货，停一下让对方签收确认，再去搬下一件。一股脑全塞过去，对方一件都接不稳。",
        notes:
          "停顿能制造重点感（停顿后的话更被注意），还能替代「嗯、那个」这类填充词——与其用语气词填空白，不如就让它空着。很多人怕沉默而抢话，其实从容的停顿反而显得自信、有掌控感，也是临场为大脑争取思考时间的合法手段。",
        key_concepts: ["留消化时间", "制造重点", "替代填充词", "显从容"],
        source: { type: "conversation" },
      },
    },
    {
      id: "filler_removal",
      label: "消除口头禅",
      type: "technique",
      details: {
        zh_label: "去掉嗯/那个/然后",
        summary:
          "「嗯、啊、那个、然后、就是」这类填充词会稀释逻辑、显得没准备。识别并刻意减少它们，表达立刻干净利落。",
        analogy:
          "包裹里塞满废报纸，对方得拨开一堆填充物才找到真东西。填充词就是话语里的废报纸。",
        notes:
          "成因多是「嘴比脑快」——还没想好就开口，用语气词拖时间。解药正是停顿：宁可静一秒，也别用「然后然后」填空。可以录音回放定位自己的高频口头禅，刻意觉察，几周就能明显改善。",
        key_concepts: ["填充词", "嘴比脑快", "用停顿替代", "录音自查"],
        source: { type: "conversation" },
      },
    },
    {
      id: "pace",
      label: "语速节奏",
      type: "technique",
      details: {
        zh_label: "该快则快该慢则慢",
        summary:
          "整体放慢、重点更慢、过渡略快。稳定从容的节奏本身就传递自信，也给对方留出理解的时间。",
        analogy:
          "送货不是越快越好，关键路段要稳。重要的货慢慢交接确认，普通的可以快些带过。",
        notes:
          "紧张时人会不自觉加速，导致逻辑跟不上嘴、口头禅变多。有意识地放慢、在标点处呼吸，能反向稳住心态。重点句放慢加重音，对方自然会把它当重点。节奏是技巧里最依赖刻意练习的一项。",
        key_concepts: ["整体放慢", "重点更慢", "节奏即自信", "对抗紧张"],
        source: { type: "conversation" },
      },
    },
    {
      id: "body_language",
      label: "肢体与眼神",
      type: "technique",
      details: {
        zh_label: "话之外的表达",
        summary:
          "面试里对方对你的判断，很大一部分来自语言之外：眼神、坐姿、手势、表情。它们和内容一起决定你「显不显得靠谱」。",
        analogy:
          "快递员的精神面貌也是服务的一部分——同样一件货，笑着、稳稳递过来，和耷拉着脸丢过来，收件人的感受天差地别。",
        notes:
          "面试可用的最小动作集：①与面试官有眼神交流（多人时轮流看，别盯一个或飘忽）②坐直、身体微微前倾表示投入 ③手放桌上、用自然手势辅助，别乱摸 ④面带微表情、适度点头回应。紧张时这些会先垮，所以要刻意练习到下意识。注意：肢体是「放大器」，先有内容，肢体才加分。",
        key_concepts: ["眼神交流", "坐姿前倾", "自然手势", "第一印象"],
        source: { type: "conversation" },
      },
    },
    {
      id: "closing",
      label: "收尾",
      type: "technique",
      details: {
        zh_label: "给一个清晰的落点",
        summary:
          "结尾用一句话重申核心或给出明确落点，别让话「散」在半空。好收尾让对方记住你的主旨。",
        analogy:
          "送达后说一句「这三件都齐了，您清点一下」，对方才确认收货闭环。没有这句，他不知道你说完了没。",
        notes:
          "最忌讳的结尾是「嗯……大概就这样吧」「我说完了」这种泄气式收场。可用「所以总结一下，核心就是……」呼应开头，或抛一个行动/态度收束。即兴表达没词时，回到最初的观点重申一遍，就是最稳的落点。",
        key_concepts: ["重申核心", "明确落点", "首尾呼应", "避免泄气收场"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 应用场景 (scenario) — 面试为主战场
    // ═════════════════════════════════════════
    {
      id: "self_intro",
      label: "自我介绍",
      type: "scenario",
      details: {
        zh_label: "1 分钟讲清你是谁",
        summary:
          "面试第一题，也是练表达的最佳靶子：要在 1 分钟内结论先行地讲清「我是谁、我适配在哪、凭什么」。",
        analogy:
          "像给自己写一张快递面单：寄件人是谁、最重要的标签是什么、为什么该签收。信息精准、重点突出，对方一眼到位。",
        notes:
          "万能模板（背熟、套自己信息）：①一句话定位「我是一个擅长 X 的 Y（如：3 年经验、擅长数据分析的运营）」②2~3 个匹配岗位的亮点，每个配一个量化成果「在上一份工作里，我做了 A，带来了 B」③一句为什么来这家「我看重贵司的 C，正好和我想发展的方向一致」。提前写逐字稿、练到脱口而出，临场就不会东拉西扯。这是金字塔 + 结论先行最好的落地练习。",
        key_concepts: ["一句话定位", "匹配岗位", "亮点量化", "逐字稿演练"],
        source: { type: "conversation" },
      },
    },
    {
      id: "behavioral_interview",
      label: "行为面试",
      type: "scenario",
      details: {
        zh_label: "讲一次你做过的事",
        summary:
          "「请举一个你……的例子」类问题，考察过往行为预测未来表现。标准答法就是 STAR，且要突出个人行动与量化结果。",
        analogy:
          "面试官要的是一份完整的配送复盘单：什么情况、你接了什么任务、你具体怎么操作、最后送达效果如何。",
        notes:
          "高频考点：抗压、冲突、失败、领导力、解决难题。准备方法：按这些主题各备 1~2 个 STAR 故事，提前写好「Action」里你的判断和具体步骤。回答时别陷在背景里，60% 篇幅给行动和结果。靠『素材库』提前攒故事、靠『模拟面试』练口述，是这题不翻车的保障。",
        key_concepts: ["STAR作答", "过往预测未来", "主题化备料", "重行动重结果"],
        source: { type: "conversation" },
      },
    },
    {
      id: "why_leave",
      label: "为什么离职",
      type: "scenario",
      details: {
        zh_label: "离职/换工作原因",
        summary:
          "高频「坑题」：考察你是否成熟、会不会抱怨、动机是否稳定。核心原则是「向前看、不抱怨、对齐新岗位」。",
        analogy:
          "像解释为什么换配送路线：不是骂旧路差，而是说新路更适合送这批货——重点在「去哪」，不在「逃离」。",
        notes:
          "万能句式：「上一份工作让我成长了 X（先肯定，不抱怨），但我希望在 Y 方向走得更深，而这正是贵司这个岗位能提供的（对齐新岗位）。」三条红线：①绝不说前公司/前领导坏话 ②不把钱当唯一理由 ③把「逃避」翻译成「追求」。哪怕真实原因是负面的，也要转成对成长/发展的正向诉求。",
        key_concepts: ["向前看", "不抱怨", "对齐新岗位", "负面转正向"],
        source: { type: "conversation" },
      },
    },
    {
      id: "your_weakness",
      label: "你的缺点",
      type: "scenario",
      details: {
        zh_label: "你最大的缺点是什么",
        summary:
          "经典两难题：说真缺点怕减分，说假缺点（「我太追求完美」）面试官一眼识破。正解是「真实的小缺点 + 正在改进的行动」。",
        analogy:
          "像如实说这条配送线有个小弱点，但你已经加了应对措施——既诚实又显得你有自省和行动力。",
        notes:
          "结构：①选一个真实但不致命、且与核心岗位能力无关的缺点 ②具体而非空泛 ③重点放在「我已经在怎么改、有什么效果」。句式：「我以前 X（具体缺点，比如不擅长当众表达），后来我刻意做了 Y（行动，比如系统学方法、主动找机会练），现在已经 Z（进步）。」考的不是你有没有缺点，而是你有没有自我觉察和成长能力——这题本身就是你这次学习的最好素材。",
        key_concepts: ["真实小缺点", "不碰核心能力", "重在改进行动", "体现自省"],
        source: { type: "conversation" },
      },
    },
    {
      id: "career_plan",
      label: "职业规划",
      type: "scenario",
      details: {
        zh_label: "未来 3~5 年规划",
        summary:
          "考察你的目标感和稳定性——公司想知道你会不会很快走、你的方向和岗位合不合。用「是什么-为什么-怎么做」回答最稳。",
        analogy:
          "像说明这批货的长期配送计划：目的地清晰、为什么走这条线、分几步走。让对方相信你不是临时起意。",
        notes:
          "句式（黄金圈）：「我的方向是成长为 X（是什么）→ 因为我擅长且热爱 Y（为什么）→ 短期我想先在这个岗位夯实 A 能力，中期承担 B，长期做到 C（怎么做）」。关键：方向要和应聘岗位的成长路径一致，别让面试官觉得你这岗位只是跳板。避免假大空（「成为行业领袖」），要具体、可信、和公司绑定。",
        key_concepts: ["目标感", "与岗位对齐", "分阶段", "可信不空泛"],
        source: { type: "conversation" },
      },
    },
    {
      id: "hard_question",
      label: "应对难题",
      type: "scenario",
      details: {
        zh_label: "不会答 / 压力题",
        summary:
          "遇到没准备、不会、或故意刁难的问题时如何不崩。核心是「不慌、不装、用结构争取时间」，过程比答案更被考察。",
        analogy:
          "突发的疑难配送：路全堵死了。慌乱乱撞最糟；冷静说「我先评估几条备选路线」反而显专业——对方看的是你怎么应对，不是你有没有标准答案。",
        notes:
          "急救三招：①买时间——「这是个好问题，我想一下」或复述问题，配一次停顿 ②真不会就坦诚 + 给思路——「这块我没有直接经验，但如果让我做，我会先 A 再 B」，展示思考方式 ③压力题（被追问、被否定）——别急着辩护，先认同合理部分再补充，保持情绪稳定。面试官常用难题考的就是抗压和临场逻辑，稳住结构就赢了一半。",
        key_concepts: ["先买时间", "坦诚不硬装", "给思路过程", "情绪稳定"],
        source: { type: "conversation" },
      },
    },
    {
      id: "reverse_question",
      label: "反问环节",
      type: "scenario",
      details: {
        zh_label: "你有什么想问我们的",
        summary:
          "面试最后的「你有什么问题」——绝不能说「没有」。这是体现你思考深度、表达诚意、反向加分的最后机会。",
        analogy:
          "签收前主动问一句「这批货后续还有什么需要我配合的」，收件人立刻觉得你专业、上心。",
        notes:
          "好问题方向：①岗位本身「这个岗位最大的挑战是什么/什么样的人能做得出色」②团队与成长「团队目前的重点」③真诚的追问（结合面试中聊到的点）。避免：薪资福利当第一问、问官网就能查到的、问「我表现怎么样」。准备 2~3 个问题，既获取信息，又展示你认真研究过、是带着思考来的——这本身就是一次表达力展示。",
        key_concepts: ["绝不说没有", "问岗位与成长", "结合现场追问", "展示诚意"],
        source: { type: "conversation" },
      },
    },
    {
      id: "impromptu",
      label: "即兴表达",
      type: "scenario",
      details: {
        zh_label: "没准备也能说清",
        summary:
          "面对没准备过的问题，靠现场快速搭框架顶住。核心是用一个简单结构（PREP / 黄金圈）争取思考时间、保住条理。",
        analogy:
          "突然来了个临时配送任务：没有现成路线，但你有一套通用流程（先定目的地、再选路线、再发车），照流程走就不会乱。",
        notes:
          "三步急救：①用一句复述/停顿争取 2 秒思考 ②脑中选一个框架（一般用 PREP 或「是什么-为什么-怎么做」）③先抛结论，边说边填。哪怕想得不全，结构在，听起来就有逻辑。这就是『开口前固定动作』的实战检验场。",
        key_concepts: ["现场搭框架", "争取思考时间", "PREP急救", "结论先行兜底"],
        source: { type: "conversation" },
      },
    },
    {
      id: "report",
      label: "工作汇报",
      type: "scenario",
      details: {
        zh_label: "向上汇报与同步",
        summary:
          "向领导/团队汇报进展或方案，最讲究结论先行和信息密度——对方时间有限，要先给结果再给过程。",
        analogy:
          "给收件人发配送状态：先说「已送达/有延误」这个结论，再补「因为暴雨改道」的细节。对方先要结果，不是过程流水账。",
        notes:
          "推荐：先一句结论（做完了/遇到问题需决策）→ SCQA 或总分述展开 → 明确下一步或需要的支持。汇报里最忌讳按时间顺序流水账，要按重要性排序。这是金字塔原理在职场最高频的应用。",
        key_concepts: ["先结果后过程", "按重要性排序", "明确诉求", "高信息密度"],
        source: { type: "conversation" },
      },
    },
    {
      id: "persuasion",
      label: "说服表态",
      type: "scenario",
      details: {
        zh_label: "让对方接受你的主张",
        summary:
          "表达观点、争取认同的场景（面试中的开放观点题、争取资源、推方案）。靠演绎链条 + 扎实论据 + 照顾对方立场取胜。",
        analogy:
          "说服对方选你的快递服务：不是喊「选我」，而是顺着对方在意的点（快、稳、便宜）一条条给证据，让他自己得出该选你的结论。",
        notes:
          "说服结构：先共情对方立场 → 亮出主张 → 用演绎/论据论证 → 回应可能的反对。比起堆论据，先认同对方关切再给出方案更有效。面试观点题没有标准答案，考的就是你论证是否自洽、有无层次。",
        key_concepts: ["先共情立场", "演绎论证", "论据扎实", "回应反对"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 常见误区 (pitfall)
    // ═════════════════════════════════════════
    {
      id: "stream_of_consciousness",
      label: "想到哪说到哪",
      type: "pitfall",
      details: {
        zh_label: "意识流",
        summary:
          "脑子里冒出什么就说什么，没有主干和顺序。这是「脑子清楚却说不清」最典型的表现，被结构化思维直接破解。",
        analogy:
          "仓库不分拣，来一件搬一件，传送带上货物乱成一团，收件人完全拼不出全貌。",
        notes:
          "根因是跳过了「开口前先搭树」这一步。解药：哪怕只花 3 秒，先在脑中定一个结论 + 2 个要点再说（即『开口前固定动作』）。宁可慢一点开口，也别边想边倒。停顿不可耻，乱说才致命。",
        key_concepts: ["无主干", "边想边说", "缺顺序", "先搭树再开口"],
        source: { type: "conversation" },
      },
    },
    {
      id: "no_conclusion",
      label: "不给结论",
      type: "pitfall",
      details: {
        zh_label: "铺垫太久不点题",
        summary:
          "讲了一大堆背景和细节，对方却始终不知道你的观点是什么。和「结论先行」正好相反的坏习惯。",
        analogy:
          "快递一直在路上转，就是不送到对方手里。对方等得失去耐心，最后包裹里是什么都不想知道了。",
        notes:
          "中式表达的通病：习惯先讲来由、最后才点题，但听众的耐心撑不到那时。解药是强制把结论提到最前面：「我的答案是……，原因有三」。面试里答非所问、绕半天不回答问题本身，是这条误区的高发区。",
        key_concepts: ["铺垫过长", "迟迟不点题", "对抗手段是结论先行", "答非所问"],
        source: { type: "conversation" },
      },
    },
    {
      id: "info_overload",
      label: "信息过载",
      type: "pitfall",
      details: {
        zh_label: "事无巨细全倒出来",
        summary:
          "怕漏掉细节，把所有信息一股脑塞给对方，超出工作记忆，结果对方一个都没记住。",
        analogy:
          "一次往对方那只小篮子里塞二十件货，全掉地上。给得越多，对方收到的反而越少。",
        notes:
          "解药是做减法和分组：先问「对方真正需要知道的是什么」，砍掉枝节，把剩下的归成 3 组。记住表达是为了让对方收到，不是为了证明你知道得多。说全 ≠ 说清。",
        key_concepts: ["贪多求全", "超出记忆容量", "解药是减法分组", "说全不等于说清"],
        source: { type: "conversation" },
      },
    },
    {
      id: "vague_words",
      label: "空话套话",
      type: "pitfall",
      details: {
        zh_label: "全是形容词没有事实",
        summary:
          "满嘴「很强、很好、有责任心、抗压能力强」却没有一个具体事实支撑。听起来在说，其实什么信息都没传递。",
        analogy:
          "面单上只写「好东西、贵重物品」，却没说到底是什么。对方根本无从判断、也无从相信。",
        notes:
          "解药是「论点论据 + 举例子」：每个形容词后面强制跟一个事实或数字。把「我学习能力强」换成「我两周自学上手了 X，独立完成了 Y」。面试官对形容词免疫，只信具体证据。",
        key_concepts: ["只有形容词", "缺乏事实", "解药是举例子", "用数字代替自夸"],
        source: { type: "conversation" },
      },
    },
    {
      id: "losing_thread",
      label: "说着说着跑题",
      type: "pitfall",
      details: {
        zh_label: "丢了主线",
        summary:
          "说着说着被支线带走，越扯越远，最后忘了最初要回答什么，也给不出落点。",
        analogy:
          "送货途中看到别的岔路就拐进去，绕了一圈把原本的目的地忘了，包裹还在车上。",
        notes:
          "根因是开口前没定好主干、中途没有路标。解药：①开口前用一句话锁定主线 ②用过渡词时刻自检「我还在主线上吗」③结尾强制回到最初观点收束。一旦发现跑偏，直接说「回到刚才的问题」拉回来，比硬圆更专业。",
        key_concepts: ["被支线带走", "丢失主干", "解药是过渡与收尾", "及时拉回"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 刻意练习 (practice) — 让能力真正长出来的训练闭环
    // ═════════════════════════════════════════
    {
      id: "deliberate_practice",
      label: "刻意练习",
      type: "practice",
      details: {
        zh_label: "针对性反复 + 即时反馈",
        summary:
          "表达力不是看会的，是练出来的。刻意练习 = 锁定一个薄弱点 → 高频重复 → 拿到反馈 → 修正，而不是泛泛地「多说」。",
        analogy:
          "新手快递员不是靠多送就变熟，而是专挑自己老送错的那条线反复跑、每次复盘哪步出错，才真正变快变稳。",
        notes:
          "用法：从本图找你最痛的 1~2 个点（比如「想到哪说到哪」「一紧张就空白」），针对它选一种训练方式，每天 10~15 分钟，坚持 4~6 周。关键是「针对单点 + 有反馈」——录音、找人听、对照框架自评都行。别贪多，一次只攻一个毛病，攻下一个再换下一个。",
        key_concepts: ["锁定单点", "高频重复", "即时反馈", "持续迭代"],
        source: { type: "conversation" },
      },
    },
    {
      id: "recording_review",
      label: "录音复盘",
      type: "practice",
      details: {
        zh_label: "录下来，回放找毛病",
        summary:
          "最便宜也最狠的反馈工具：把自己说的话录下来回放。你会清楚听到那些自己说时根本没察觉的口头禅、跑题、没结论。",
        analogy:
          "配送车装行车记录仪，回放一看就知道哪段开太快、哪个路口拐错了——比任何人提醒都直观。",
        notes:
          "做法：手机录一段 1~2 分钟的回答（自我介绍、随机面试题都行）→ 回放，拿三把尺子量：①有没有先给结论 ②有几个「嗯/那个/然后」 ③有没有跑题、有没有收尾。记下问题，下次专门改这一点。多数人头几次会很「难受」，但这正是进步最快的来源。",
        key_concepts: ["自我反馈", "暴露盲点", "对照三把尺", "难受即有效"],
        source: { type: "conversation" },
      },
    },
    {
      id: "daily_retell",
      label: "每日复述",
      type: "practice",
      details: {
        zh_label: "听一段，用结构讲回来",
        summary:
          "读/听一段内容（文章、视频、播客），合上后用「结论先行 + 三点」把它复述出来。专练「把网状信息线性化」这块肌肉。",
        analogy:
          "把别人打包好的货拆开，再用自己的方式重新打包寄出——练的就是「重新组织」的核心能力。",
        notes:
          "每天 5~10 分钟：看完一段，强迫自己用「这段核心讲了一件事：X；具体三点：第一……第二……第三……」复述。从书面内容练起（压力小），熟练后改成听完即时口述（更接近临场）。这是把「结构化思维」从知道变成本能的最有效日常训练，对治「脑子懂但说不出」尤其对症。",
        key_concepts: ["输入转输出", "结论加三点", "线性化训练", "每天微量"],
        source: { type: "conversation" },
      },
    },
    {
      id: "card_drill",
      label: "卡片即兴",
      type: "practice",
      details: {
        zh_label: "抽题，30 秒搭框架开口",
        summary:
          "准备一堆话题/面试题卡片，随机抽一张，给自己 30 秒搭框架，然后开口讲 1 分钟。专练即兴和『开口前固定动作』。",
        analogy:
          "模拟突发派单：随机来一单，逼自己在 30 秒内定好路线再发车，跑多了就形成条件反射。",
        notes:
          "题库可以是常见面试题、热点话题、甚至随手指一个物品。流程严格走：抽题 → 默念「定结论·搭两点·选框架」→ 开口（最好录音）。一开始会卡，这恰恰说明在练真正薄弱的环节。每天 3~5 张，几周后你会发现「张口就有结构」开始变成习惯。",
        key_concepts: ["随机抽题", "限时搭框架", "练肌肉记忆", "克服即兴恐惧"],
        source: { type: "conversation" },
      },
    },
    {
      id: "material_bank",
      label: "素材库",
      type: "practice",
      details: {
        zh_label: "提前攒好故事和金句",
        summary:
          "建一个自己的素材库：把过往经历整理成 5~8 个 STAR 故事，再攒一些金句/数据。临场不是现编，而是「调用 + 微调」。",
        analogy:
          "提前在仓库备好常用包装和路线模板，来单子直接调用，不用每次从零设计——又快又稳。",
        notes:
          "怎么建：①按高频考点（抗压、冲突、失败、成就、协作）各写 1~2 个 STAR 故事，打磨到能脱口而出 ②记下每段经历的量化结果（数字最有说服力）③收集打动你的金句/类比备用。面试前过一遍素材库，大多数行为题都能用已有故事改装应对，极大降低临场负担。这是「准备」战胜「天赋」的地方。",
        key_concepts: ["STAR故事库", "量化结果", "调用而非现编", "降低临场负担"],
        source: { type: "conversation" },
      },
    },
    {
      id: "mock_interview",
      label: "模拟面试",
      type: "practice",
      details: {
        zh_label: "找人/对镜/对 AI 演练",
        summary:
          "最接近实战的训练：找朋友、对着镜子、或让 AI 扮演面试官，完整走一遍问答。把紧张「脱敏」在真正面试之前。",
        analogy:
          "正式长途配送前先空跑一遍全程，把会遇到的坑提前踩一遍，真上路就心里有底。",
        notes:
          "做法：列出目标岗位的高频题 → 请对方（或 AI）随机提问、适当追问施压 → 你用学到的框架作答 → 结束后要反馈：哪里没结论、哪里跑题、哪里紧张。重点是「被追问」和「被打断」的真实压力，这是单人练不出来的。多模拟几次，正式面试时的紧张会显著下降——因为大脑觉得「这场景我经历过」。",
        key_concepts: ["实战模拟", "被追问施压", "紧张脱敏", "拿反馈"],
        source: { type: "conversation" },
      },
    },
  ],

  edges: [
    // 中心放射 — expression 连向各大板块的入口
    { id: "expression__根源是__thinking_vs_speaking", source: "expression", target: "thinking_vs_speaking", label: "根源是" },
    { id: "expression__面向__audience_first", source: "expression", target: "audience_first", label: "面向" },
    { id: "expression__内核是__structured_thinking", source: "expression", target: "structured_thinking", label: "内核是" },
    { id: "expression__主轴__speak_routine", source: "expression", target: "speak_routine", label: "主轴" },
    { id: "expression__主框架__pyramid_principle", source: "expression", target: "pyramid_principle", label: "主框架" },
    { id: "expression__主战场__self_intro", source: "expression", target: "self_intro", label: "主战场" },
    { id: "expression__靠练成__deliberate_practice", source: "expression", target: "deliberate_practice", label: "靠练成" },
    { id: "expression__要避开__stream_of_consciousness", source: "expression", target: "stream_of_consciousness", label: "要避开" },

    // 底层认知内部
    { id: "thinking_vs_speaking__导致__linear_constraint", source: "thinking_vs_speaking", target: "linear_constraint", label: "导致" },
    { id: "linear_constraint__需要__structured_thinking", source: "linear_constraint", target: "structured_thinking", label: "需要" },
    { id: "audience_first__考虑__working_memory", source: "audience_first", target: "working_memory", label: "考虑" },
    { id: "working_memory__产生__cognitive_load", source: "working_memory", target: "cognitive_load", label: "产生" },
    { id: "audience_first__要求__conclusion_first", source: "audience_first", target: "conclusion_first", label: "要求" },
    { id: "cognitive_load__不当则__info_overload", source: "cognitive_load", target: "info_overload", label: "不当则" },
    { id: "audience_first__缓解__nervousness", source: "audience_first", target: "nervousness", label: "缓解" },
    { id: "nervousness__打乱__pace", source: "nervousness", target: "pace", label: "打乱" },
    { id: "nervousness__靠结构兜底__speak_routine", source: "nervousness", target: "speak_routine", label: "靠兜底" },

    // 逻辑内核内部 + 方法论主轴
    { id: "structured_thinking__落地为__speak_routine", source: "structured_thinking", target: "speak_routine", label: "落地为" },
    { id: "speak_routine__先定__conclusion_first", source: "speak_routine", target: "conclusion_first", label: "先定" },
    { id: "speak_routine__再切__grouping", source: "speak_routine", target: "grouping", label: "再切" },
    { id: "speak_routine__后套__prep", source: "speak_routine", target: "prep", label: "后套" },
    { id: "structured_thinking__核心是__conclusion_first", source: "structured_thinking", target: "conclusion_first", label: "核心是" },
    { id: "structured_thinking__要求__mece", source: "structured_thinking", target: "mece", label: "要求" },
    { id: "structured_thinking__依靠__grouping", source: "structured_thinking", target: "grouping", label: "依靠" },
    { id: "structured_thinking__要求__claim_evidence", source: "structured_thinking", target: "claim_evidence", label: "要求" },
    { id: "structured_thinking__运用__induction", source: "structured_thinking", target: "induction", label: "运用" },
    { id: "structured_thinking__运用__deduction", source: "structured_thinking", target: "deduction", label: "运用" },
    { id: "mece__指导__grouping", source: "mece", target: "grouping", label: "指导" },
    { id: "induction__支撑__grouping", source: "induction", target: "grouping", label: "支撑" },
    { id: "deduction__构成__causal_chain", source: "deduction", target: "causal_chain", label: "构成" },
    { id: "causal_chain__强化__claim_evidence", source: "causal_chain", target: "claim_evidence", label: "强化" },

    // 结构框架内部 + 与逻辑挂钩
    { id: "pyramid_principle__遵循__conclusion_first", source: "pyramid_principle", target: "conclusion_first", label: "遵循" },
    { id: "pyramid_principle__要求__mece", source: "pyramid_principle", target: "mece", label: "要求" },
    { id: "pyramid_principle__开篇用__scqa", source: "pyramid_principle", target: "scqa", label: "开篇用" },
    { id: "pyramid_principle__微观版__prep", source: "pyramid_principle", target: "prep", label: "微观版" },
    { id: "pyramid_principle__口语化__total_sub_total", source: "pyramid_principle", target: "total_sub_total", label: "口语化" },
    { id: "pyramid_principle__需要__transition", source: "pyramid_principle", target: "transition", label: "需要" },
    { id: "structured_thinking__可用__what_why_how", source: "structured_thinking", target: "what_why_how", label: "可用" },
    { id: "structured_thinking__叙事用__star", source: "structured_thinking", target: "star", label: "叙事用" },
    { id: "prep__结构化__claim_evidence", source: "prep", target: "claim_evidence", label: "结构化" },
    { id: "total_sub_total__展开为__parallel_progressive", source: "total_sub_total", target: "parallel_progressive", label: "展开为" },
    { id: "transition__标明__parallel_progressive", source: "transition", target: "parallel_progressive", label: "标明" },

    // 临场技巧 — 服务于结构/认知
    { id: "scqa__用于__opening", source: "scqa", target: "opening", label: "用于" },
    { id: "audience_first__落实为__analogy_skill", source: "audience_first", target: "analogy_skill", label: "落实为" },
    { id: "star__包装成__storytelling", source: "star", target: "storytelling", label: "包装成" },
    { id: "claim_evidence__落地为__example", source: "claim_evidence", target: "example", label: "落地为" },
    { id: "parallel_progressive__配合__numbering", source: "parallel_progressive", target: "numbering", label: "配合" },
    { id: "numbering__减轻__working_memory", source: "numbering", target: "working_memory", label: "减轻" },
    { id: "pause__缓解__cognitive_load", source: "pause", target: "cognitive_load", label: "缓解" },
    { id: "filler_removal__靠__pause", source: "filler_removal", target: "pause", label: "靠" },
    { id: "pause__调节__pace", source: "pause", target: "pace", label: "调节" },
    { id: "filler_removal__改善__pace", source: "filler_removal", target: "pace", label: "改善" },
    { id: "audience_first__延伸到__body_language", source: "audience_first", target: "body_language", label: "延伸到" },
    { id: "body_language__配合__pace", source: "body_language", target: "pace", label: "配合" },
    { id: "closing__呼应__conclusion_first", source: "closing", target: "conclusion_first", label: "呼应" },

    // 应用场景 — 调用框架与技巧
    { id: "self_intro__套用__pyramid_principle", source: "self_intro", target: "pyramid_principle", label: "套用" },
    { id: "self_intro__需要__opening", source: "self_intro", target: "opening", label: "需要" },
    { id: "self_intro__展示__body_language", source: "self_intro", target: "body_language", label: "展示" },
    { id: "behavioral_interview__用__star", source: "behavioral_interview", target: "star", label: "用" },
    { id: "behavioral_interview__借助__storytelling", source: "behavioral_interview", target: "storytelling", label: "借助" },
    { id: "why_leave__套用__prep", source: "why_leave", target: "prep", label: "套用" },
    { id: "why_leave__依赖__conclusion_first", source: "why_leave", target: "conclusion_first", label: "依赖" },
    { id: "your_weakness__需要__claim_evidence", source: "your_weakness", target: "claim_evidence", label: "需要" },
    { id: "your_weakness__借助__example", source: "your_weakness", target: "example", label: "借助" },
    { id: "career_plan__套用__what_why_how", source: "career_plan", target: "what_why_how", label: "套用" },
    { id: "reverse_question__体现__audience_first", source: "reverse_question", target: "audience_first", label: "体现" },
    { id: "hard_question__急救用__impromptu", source: "hard_question", target: "impromptu", label: "急救用" },
    { id: "hard_question__依赖__pause", source: "hard_question", target: "pause", label: "依赖" },
    { id: "hard_question__考验__nervousness", source: "hard_question", target: "nervousness", label: "考验" },
    { id: "impromptu__急救用__prep", source: "impromptu", target: "prep", label: "急救用" },
    { id: "impromptu__实战检验__speak_routine", source: "impromptu", target: "speak_routine", label: "实战检验" },
    { id: "report__套用__pyramid_principle", source: "report", target: "pyramid_principle", label: "套用" },
    { id: "report__开篇__scqa", source: "report", target: "scqa", label: "开篇" },
    { id: "persuasion__依靠__deduction", source: "persuasion", target: "deduction", label: "依靠" },
    { id: "persuasion__需要__claim_evidence", source: "persuasion", target: "claim_evidence", label: "需要" },

    // 常见误区 — 被对应的能力破解
    { id: "structured_thinking__破解__stream_of_consciousness", source: "structured_thinking", target: "stream_of_consciousness", label: "破解" },
    { id: "conclusion_first__纠正__no_conclusion", source: "conclusion_first", target: "no_conclusion", label: "纠正" },
    { id: "grouping__纠正__info_overload", source: "grouping", target: "info_overload", label: "纠正" },
    { id: "example__纠正__vague_words", source: "example", target: "vague_words", label: "纠正" },
    { id: "transition__纠正__losing_thread", source: "transition", target: "losing_thread", label: "纠正" },
    { id: "closing__收束__losing_thread", source: "closing", target: "losing_thread", label: "收束" },

    // 刻意练习 — 训练闭环，连回能力与误区
    { id: "deliberate_practice__方式__recording_review", source: "deliberate_practice", target: "recording_review", label: "方式" },
    { id: "deliberate_practice__方式__daily_retell", source: "deliberate_practice", target: "daily_retell", label: "方式" },
    { id: "deliberate_practice__方式__card_drill", source: "deliberate_practice", target: "card_drill", label: "方式" },
    { id: "deliberate_practice__方式__material_bank", source: "deliberate_practice", target: "material_bank", label: "方式" },
    { id: "deliberate_practice__综合演练__mock_interview", source: "deliberate_practice", target: "mock_interview", label: "综合演练" },
    { id: "recording_review__定位__filler_removal", source: "recording_review", target: "filler_removal", label: "定位" },
    { id: "recording_review__发现__losing_thread", source: "recording_review", target: "losing_thread", label: "发现" },
    { id: "daily_retell__训练__structured_thinking", source: "daily_retell", target: "structured_thinking", label: "训练" },
    { id: "card_drill__训练__speak_routine", source: "card_drill", target: "speak_routine", label: "训练" },
    { id: "card_drill__打磨__impromptu", source: "card_drill", target: "impromptu", label: "打磨" },
    { id: "material_bank__积累__star", source: "material_bank", target: "star", label: "积累" },
    { id: "material_bank__供给__behavioral_interview", source: "material_bank", target: "behavioral_interview", label: "供给" },
    { id: "mock_interview__演练__behavioral_interview", source: "mock_interview", target: "behavioral_interview", label: "演练" },
    { id: "mock_interview__降低__nervousness", source: "mock_interview", target: "nervousness", label: "降低" },
  ],
};

// ============================================================
// 类型 → 配色（暖色液态玻璃风）：
//   core       赤陶橙   —— 中心理念
//   mindset    紫       —— 底层认知
//   logic      蓝       —— 逻辑内核（含方法论主轴）
//   structure  青绿     —— 结构框架
//   technique  金黄     —— 临场技巧
//   scenario   玫红     —— 应用场景 / 面试题型
//   pitfall    砖红     —— 常见误区（警示）
//   practice   橄榄绿   —— 刻意练习（训练闭环）
// ============================================================
const expressionTypeStyles: Record<string, NodeTypeStyle> = {
  core: {
    base: "#c75d3a",
    glow: "rgba(199, 93, 58, 0.30)",
    label: "核心",
  },
  mindset: {
    base: "#6b5fb5",
    glow: "rgba(107, 95, 181, 0.30)",
    label: "底层认知",
  },
  logic: {
    base: "#3d7ebf",
    glow: "rgba(61, 126, 191, 0.30)",
    label: "逻辑内核",
  },
  structure: {
    base: "#3fa889",
    glow: "rgba(63, 168, 137, 0.30)",
    label: "结构框架",
  },
  technique: {
    base: "#d99a2b",
    glow: "rgba(217, 154, 43, 0.30)",
    label: "临场技巧",
  },
  scenario: {
    base: "#b5577f",
    glow: "rgba(181, 87, 127, 0.30)",
    label: "应用场景",
  },
  pitfall: {
    base: "#9e5c5c",
    glow: "rgba(158, 92, 92, 0.30)",
    label: "常见误区",
  },
  practice: {
    base: "#7b9a3e",
    glow: "rgba(123, 154, 62, 0.30)",
    label: "刻意练习",
  },
};

const expressionTypeOrder: string[] = [
  "core",
  "mindset",
  "logic",
  "structure",
  "technique",
  "scenario",
  "pitfall",
  "practice",
];

export const expressionMap: KnowledgeMap = {
  id: "expression",
  label: "逻辑表达",
  subtitle: "逻辑表达与面试沟通方法论",
  data: expressionGraphData,
  typeStyles: expressionTypeStyles,
  typeOrder: expressionTypeOrder,
  preferredSeed: "expression",
  group: "interest",
  domain: "language",
};
