import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// 英语语法知识图谱 — 谓语为轴 · 舞台剧隐喻
//
// 组织主线：「主谓二分为骨，谓语为轴」
//   predicate 作 preferredSeed，八大板块从它放射：
//   ①决定句型 ②承载时态 ③承载语态 ④承载语气
//   ⑤靠助动词/情态/系动词实现 ⑥受主谓一致约束
//   ⑦卸任变为非谓语 ⑧每从句各有一个谓语
//
// 舞台剧隐喻世界观（所有 analogy 取词依据）：
//   句子=一场完整演出  主语=主角  谓语动词=推动剧情的核心动作
//   宾语=动作所及的配角  表语=主角人设标签
//   定语=化妆造型师的作品  状语=舞台灯光布景与旁白字幕  补语=旁白补述
//   词类=剧组工种  时态=这场戏的时间设定
//   语态=聚光灯打给谁  语气=这场戏的真实性标注
//   从句=主线里嵌套的子剧情  非谓语=动词卸任后客串其他工种
// ============================================================

const grammarGraphData: GraphData = {
  nodes: [
    // ═════════════════════════════════════════
    // 中心支柱 — 主谓结构骨架 (sentence_element)
    // ═════════════════════════════════════════
    {
      id: "predicate",
      label: "Predicate",
      type: "sentence_element",
      details: {
        zh_label: "谓语",
        summary: "句子的核心发动机，承载时态、语态、语气三大变化，决定句型走向，是整个英语语法体系的组织中心。",
        analogy: "一场戏里推动剧情的核心动作——没有它整场演出就只是演员在台上站着。聚光灯打哪里（语态）、这幕戏发生在什么时间（时态）、是真实演出还是假想剧（语气），全由这个核心动作决定；其他所有角色和布景都为它服务。",
        notes: "英语句子的谓语必须是限定动词（有人称、数、时态变化的动词形式），一个简单句只能有一个谓语。理解谓语的关键：它是唯一一个随主语人称/数改变形态的成分，也是三大语法变化（时态/语态/语气）的唯一载体。去掉谓语，句子就从命题降级为词组。",
        key_concepts: ["核心动作", "三大变化", "限定动词", "句型决定因素"],
        source: { type: "conversation" },
      },
    },
    {
      id: "subject",
      label: "Subject",
      type: "sentence_element",
      details: {
        zh_label: "主语",
        summary: "句子陈述的对象，是谓语动作的发出者（主动）或承受者（被动），与谓语共同构成句子最底层的骨架。",
        analogy: "舞台上的主角——整场演出围着他转，一登台观众就知道这出戏讲的是谁的故事；核心动作是由他发出的（主动语态），或者他是核心动作被指向的那位（被动语态）。无论如何，他和核心动作之间都有一份「档期合同」需要履行：主谓必须一致。",
        notes: "英语句子（除祈使句外）不可省略主语，这与中文有重大差异。主语可由名词、代词、动名词、不定式、名词性从句充当。主语的人称和数直接制约谓语形态（主谓一致），是「档期合同」中对谓语约束力最强的一方。",
        key_concepts: ["动作发出者", "不可省略", "主谓一致", "可由从句充当"],
        source: { type: "conversation" },
      },
    },

    // ─────────────────────────────────────────
    // 句子成分 (sentence_element)
    // ─────────────────────────────────────────
    {
      id: "object",
      label: "Object",
      type: "sentence_element",
      details: {
        zh_label: "宾语",
        summary: "及物动词动作所及的对象，分直接宾语（承受动作的事物）和间接宾语（动作的受益对象），是 SVO/SVOO/SVOC 句型必须配备的成分。",
        analogy: "动作所及的配角——主角伸出手，配角接住；不是所有剧情都有配角承接（不及物动词独角戏），但凡「谁做了什么给谁/对谁」，必定有配角出场，他的定位就是「被核心动作连接过来的那位」。",
        notes: "宾语通常是名词、代词、动名词或名词性从句。双宾语（SVOO）中，间接宾语是「人」，直接宾语是「物」，可互换但语序变化：He gave me a book / He gave a book to me。",
        key_concepts: ["直接宾语", "间接宾语", "及物动词搭配", "双宾结构"],
        source: { type: "conversation" },
      },
    },
    {
      id: "predicative",
      label: "Predicative",
      type: "sentence_element",
      details: {
        zh_label: "表语",
        summary: "系动词后紧跟的成分，用于描述主语的状态、性质或身份，和主语通过系动词构成等式关系。",
        analogy: "主角在本场戏里的人设标签——导演在开场字幕里写「这个人是…/这个人变成了…/这个人感觉…」，把主角的状态或身份直接摆在观众面前。系动词就是那个等号，把主角和标签焊死在一起。",
        notes: "表语可由名词、形容词、副词（部分）、介词短语、不定式或名词性从句充当。常见系动词：be、become、seem、feel、look、taste、smell、sound。注意：不及物动词后的名词/形容词是补语不是表语。",
        key_concepts: ["等式关系", "系动词后", "主语描述", "SVC 核心"],
        source: { type: "conversation" },
      },
    },
    {
      id: "attributive",
      label: "Attributive",
      type: "sentence_element",
      details: {
        zh_label: "定语",
        summary: "修饰名词（或代词），对其所修饰的名词进行限定、描述或补充说明，让听众在众多对象中精准锁定「哪一个」。",
        analogy: "化妆造型师的作品——给演员贴上「穿红衣的」「来自北京的」「昨天刚来的」这类造型标签，让观众在茫茫演员阵容中一眼锁定「哦，就是那个……的那位」。",
        notes: "前置定语：通常为单个形容词（a beautiful girl）；后置定语：介词短语、分词短语、不定式、定语从句（the girl standing there / the book on the table / the man I met）。",
        key_concepts: ["修饰名词", "前置/后置", "定语从句", "精确限定"],
        source: { type: "conversation" },
      },
    },
    {
      id: "adverbial",
      label: "Adverbial",
      type: "sentence_element",
      details: {
        zh_label: "状语",
        summary: "修饰谓语动词（或句子整体），交代动作发生的时间、地点、方式、原因、条件、结果等背景信息，是句子的「背景布置层」。",
        analogy: "舞台上的灯光、布景与旁白字幕——它们不改变演员是谁（主语），也不改变核心动作本身（谓语），只是告诉观众：这一幕发生在哪里、什么时候、出于什么原因、产生了什么效果。状语拿掉了演出还能继续，但观众会失去背景感。",
        notes: "可由副词、介词短语、不定式、分词短语、状语从句充当。位置灵活（句首/句中/句末），句首状语后常加逗号。英语中状语从句（adverbial clause）是状语最强大的扩充形式。",
        key_concepts: ["时间/地点/方式", "修饰谓语", "位置灵活", "从句形式"],
        source: { type: "conversation" },
      },
    },
    {
      id: "complement",
      label: "Complement",
      type: "sentence_element",
      details: {
        zh_label: "补语",
        summary: "对主语或宾语的状态进行补充说明的成分，分主语补足语（SVC）和宾语补足语（SVOC），说明动作完成后主/宾的变化结果。",
        analogy: "幕后解说员在动作发生后补上的一句旁白——「……的结果是他变成了X」「……直到她成为了Y」。补语和表语的区别：表语是在系动词后直接贴标签，补语是动作发生之后、结果才显现，有「变化」这层含义在。",
        notes: "宾语补足语举例：They elected him president（他当了总统）/ She made me happy（她使我高兴）。主语补足语（即表语）：She is a doctor。判断是否为补语：去掉动词后，剩余部分能构成「主/宾语 + be + 补语」的逻辑关系。",
        key_concepts: ["主补/宾补", "结果变化", "SVOC 核心", "与表语区别"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 五大句型 + 及物性 (structure + concept)
    // ═════════════════════════════════════════
    {
      id: "sv_pattern",
      label: "SV Pattern",
      type: "structure",
      details: {
        zh_label: "SV 句型（主谓）",
        summary: "最简洁的句型：只有主语和不及物谓语动词，没有任何宾语，动作不需要对象承接即可完整表达。",
        analogy: "只有主角登台、核心动作自行发出的独角戏——没有任何配角被连带进来，如「The bird flies.（鸟儿飞翔）」「The sun rises.」，动作本身已经完整，不需要递出去给别人接。",
        notes: "谓语必须是不及物动词（intransitive verb）。常见不及物动词：come、go、arrive、happen、smile。可扩展加状语：The bird flies high in the sky.（加了状语也还是 SV）。",
        key_concepts: ["不及物动词", "无宾语", "自足动作", "最简句型"],
        source: { type: "conversation" },
      },
    },
    {
      id: "svo_pattern",
      label: "SVO Pattern",
      type: "structure",
      details: {
        zh_label: "SVO 句型（主谓宾）",
        summary: "最常见的句型：主语通过及物动词将动作递给宾语，是大多数叙事句的骨架。",
        analogy: "最常见的剧情模板：主角发出动作、配角承接——有来有往、张弛有度。「I love you.」「She reads a book.」都是这个模板，主角使劲、配角接招，能量流动构成故事。",
        notes: "谓语必须是及物动词（transitive verb）。宾语可以是名词、代词、动名词（I enjoy swimming）或宾语从句（I know that she left）。这是英语最高频的基本句型，大量复杂句子都是在 SVO 骨架上扩展定语/状语得来。",
        key_concepts: ["及物动词", "宾语承接", "最常见句型", "能量传递"],
        source: { type: "conversation" },
      },
    },
    {
      id: "svc_pattern",
      label: "SVC Pattern",
      type: "structure",
      details: {
        zh_label: "SVC 句型（主系表）",
        summary: "主语通过系动词与表语建立「等式」关系，表达主语的状态、性质或身份，而非主语对外做了什么。",
        analogy: "主角登台，但核心动作不是往外使劲，而是把「我是什么/我变成了什么/我感觉怎样」亮给观众看——系动词是那个等号，把主角和他的人设标签焊死在一起。「She is a teacher.」「He looks tired.」",
        notes: "系动词（linking verbs）：be 系（am/is/are/was/were）、感官动词（look/sound/smell/taste/feel）、变化动词（become/get/turn/grow/go）、保持动词（keep/stay/remain）。表语不能用副词替代形容词：He feels good（不是 well，good 描述状态）。",
        key_concepts: ["系动词等号", "状态/性质/身份", "表语而非宾语", "无外向动作"],
        source: { type: "conversation" },
      },
    },
    {
      id: "svoo_pattern",
      label: "SVOO Pattern",
      type: "structure",
      details: {
        zh_label: "SVOO 句型（主谓双宾）",
        summary: "主语通过动词将某物（直接宾语）给予某人（间接宾语），动作同时连接两个配角。",
        analogy: "主角同时把东西给了两位配角——一个拿到实物（直接宾语：what），另一个感受到动作的指向（间接宾语：who/to whom）。「He gave me a book.」就像导演让主角在台上把一个道具递到另一位演员手里，两个配角都有戏份。",
        notes: "常见双宾动词：give、teach、show、tell、send、buy、make。两种表达可互换：He gave me a book = He gave a book to me（to 引出间接宾语）。间接宾语通常是人，直接宾语通常是物。",
        key_concepts: ["直接宾语", "间接宾语", "双宾动词", "给予类动词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "svoc_pattern",
      label: "SVOC Pattern",
      type: "structure",
      details: {
        zh_label: "SVOC 句型（主谓宾补）",
        summary: "主语的动作作用于宾语后，宾语的状态发生变化，补语说明这个变化结果。",
        analogy: "主角对配角施加动作，动作结束后配角的状态发生了变化——解说员补上一句「他把它变成了X」「他使她成为了Y」。「They elected him president.」「She made him happy.」宾语和补语之间有隐含的「宾语 + be + 补语」逻辑。",
        notes: "常见 SVOC 动词：make、let、have、get、keep、find、consider、call、name、elect。宾语补足语可以是名词、形容词、不定式（They asked me to leave）、分词（I saw her dancing）。",
        key_concepts: ["宾语变化", "宾语补足语", "使役动词", "隐含等式"],
        source: { type: "conversation" },
      },
    },
    {
      id: "verb_transitivity",
      label: "Verb Transitivity",
      type: "concept",
      details: {
        zh_label: "动词及物性",
        summary: "动词是否需要宾语来完成动作语义的属性，分及物（transitive，需要宾语）和不及物（intransitive，不需要宾语）。",
        analogy: "导演给动词剧本标注「这个动作需要配角承接吗？」——及物动词是「他的动作必须递到配角那里才完整」（没有宾语就说不完），不及物动词是「他自带完整剧情、不需要配角」。同一个动词有时两种身份都能兼任（run a company vs. she runs fast）。",
        notes: "英语中许多动词既可及物也可不及物（He opened the door / The door opened）。及物性是决定句型的底层逻辑：不及物→SV，及物（单宾）→SVO，及物（双宾）→SVOO，及物+结果变化→SVOC，系动词→SVC。",
        key_concepts: ["及物/不及物", "句型决定因素", "宾语必要性", "动词多义"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 时态体系 — 两大概念 Hub + 12 具体时态
    // (concept × 2 + tense × 12)
    // ═════════════════════════════════════════
    {
      id: "tense",
      label: "Tense",
      type: "concept",
      details: {
        zh_label: "时（时间维度）",
        summary: "时态矩阵的横轴，标定动作发生在「现在/过去/将来」哪个时间点，是整张时间地图的坐标基准。",
        analogy: "剧本上的时间坐标轴——告诉观众这场戏横跨的大时间段是现在、过去的回忆，还是将来的预告，是整张时间地图的横轴。确定了坐标轴，再看动作是什么形态（体），才能精准定位任何一个时间状态。",
        notes: "英语有三个「时」：现在（present）、过去（past）、将来（future）。将来时在英语中由情态助动词 will/shall 或 be going to 等表达，严格意义上不是纯形态变化。三个时 × 四个体（简单/进行/完成/完成进行）= 12 种常见时态，再加将来的变体共 16 种。",
        key_concepts: ["三个时间点", "时态矩阵横轴", "现在/过去/将来", "与体结合"],
        source: { type: "conversation" },
      },
    },
    {
      id: "aspect",
      label: "Aspect",
      type: "concept",
      details: {
        zh_label: "体（动作形态）",
        summary: "时态矩阵的纵轴，标定动作在所处时间点的进展形态：简单（陈述事实）、进行（正在发生）、完成（已完成留影响）、完成进行（持续至今）。",
        analogy: "同一时间坐标上动作的「镜头形态」——简单体是交代「发生过」的平铺直叙；进行体是镜头怼着动作直播「正在进行中」；完成体是倒叙字幕「此前已发生，影响延续」；完成进行体是「既有倒叙又在直播」的双重画面，强调持续时间。",
        notes: "四种体与三个时结合，构成 12 种核心时态。进行体由「be + 现在分词」构成，完成体由「have/has/had + 过去分词」构成，完成进行体由「have been + 现在分词」构成。体是理解英语时态的核心：背时态不如理解体的内在逻辑。",
        key_concepts: ["四种动作形态", "时态矩阵纵轴", "简单/进行/完成/完成进行", "与时结合"],
        source: { type: "conversation" },
      },
    },
    {
      id: "present_simple",
      label: "Present Simple",
      type: "tense",
      details: {
        zh_label: "一般现在时",
        summary: "表达客观事实、习惯性动作、普遍规律或计划中的将来，是英语中使用频率最高的时态之一。",
        analogy: "舞台字幕写着「时间：永恒/现在习惯」——主角反复做这件事（习惯），或这件事就是亘古不变的事实（真理），像循环播出的保留节目，不特指哪一场。「The sun rises in the east.」是永恒真理，不是说太阳正在升起。",
        notes: "构成：主语 + 动词原形（第三人称单数加 -s）。用途：①客观真理 ②习惯性动作（频率副词：always/often/usually/sometimes/never）③时间/条件状语从句中代替将来时（When he comes, I'll tell him.）④戏剧性现在（体育解说）。",
        key_concepts: ["客观真理", "习惯动作", "三单加 s", "代替将来时"],
        source: { type: "conversation" },
      },
    },
    {
      id: "present_continuous",
      label: "Present Continuous",
      type: "tense",
      details: {
        zh_label: "现在进行时",
        summary: "表达当下正在进行的动作，也可表达近期安排好的将来计划，是「进行体」在当下时间的体现。",
        analogy: "镜头正对着舞台直播——这个动作当下正在进行，观众实时看着主角在做，画面还没定格。「I am writing.」就是把摄影机的镜头直接怼到动作上，整个画面都在动。",
        notes: "构成：be（am/is/are）+ 现在分词（动词 -ing 形式）。注意：感官动词和状态动词通常不用进行时（know、understand、love、have 表拥有等）。表将来用法：I'm meeting him tomorrow.（已有计划安排）。",
        key_concepts: ["be + ing", "正在进行", "状态动词例外", "近期计划"],
        source: { type: "conversation" },
      },
    },
    {
      id: "present_perfect",
      label: "Present Perfect",
      type: "tense",
      details: {
        zh_label: "现在完成时",
        summary: "表达过去发生但与现在有关联的动作，强调过去行为对当下的影响或「截至现在」的经验，是英语中最易与一般过去时混淆的时态。",
        analogy: "倒叙字幕亮起「此前已发生」——动作完成于过去，但它的结果或影响还留在当下这场戏里，过去与现在之间有一根线牵着。「I have lost my key.（钥匙至今没找到）」不同于「I lost my key yesterday.（讲述一件过去的事）」。",
        notes: "构成：have/has + 过去分词。常见信号词：already、yet、ever、never、just、recently、so far、for + 时间段、since + 时间点。与一般过去时的关键区别：现在完成时不指定过去的具体时间点，焦点在「当下的结果/影响」。",
        key_concepts: ["have/has + PP", "过去影响现在", "不指定具体时间", "经验/结果"],
        source: { type: "conversation" },
      },
    },
    {
      id: "present_perfect_continuous",
      label: "Present Perfect Continuous",
      type: "tense",
      details: {
        zh_label: "现在完成进行时",
        summary: "表达从过去某时开始、一直延续到现在（且可能继续）的动作，同时强调持续时间和当下状态。",
        analogy: "倒叙加直播双重字幕——动作从过去某刻开始、一直播放到现在都没停，既有历史（完成）又有正在进行的镜头（进行），是最「黏」的一种时间感。「I have been waiting for two hours.（已经等了两小时、还在等）」。",
        notes: "构成：have/has been + 现在分词。与现在完成时的区别：现在完成进行时强调「持续过程」，现在完成时强调「结果状态」。I have been writing → 强调我一直在写；I have written → 强调写完了。常与 for/since 连用。",
        key_concepts: ["have been + ing", "持续至今", "强调过程", "与现完对比"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_simple",
      label: "Past Simple",
      type: "tense",
      details: {
        zh_label: "一般过去时",
        summary: "表达过去某个时间点或时间段内发生并已完成的动作或存在的状态，是叙述过去事件的最基本工具。",
        analogy: "字幕切到「回忆画面」——讲述一件过去发生并已结束的事，场景完全切走，只是在复盘那一幕。「She called yesterday.」就是把镜头拉回昨天，拍了一下那个已经结束的动作，然后切回来。",
        notes: "构成：动词过去式（规则变化加 -ed；不规则动词需单独记忆如 go→went、take→took）。必须有明确或隐含的过去时间点（yesterday、last year、in 2000、when I was young）。这是与现在完成时最大的区别。",
        key_concepts: ["动词过去式", "已结束动作", "指定过去时间", "叙事核心"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_continuous",
      label: "Past Continuous",
      type: "tense",
      details: {
        zh_label: "过去进行时",
        summary: "表达过去某一时刻正在进行的动作，常与一般过去时搭配，构成「背景正在进行 + 突然发生」的经典叙事结构。",
        analogy: "回忆画面里的直播镜头——当年那个瞬间，动作正在进行，摄影机在现场直播。「I was reading when he came in.（他进来时我正在看书）」，「正在看书」是回忆里的直播背景，「进来」是打断这直播的突发事件。",
        notes: "构成：was/were + 现在分词。经典用法：当...时正在做（when/while 引导时间状语从句）；过去某时刻正在做（at 8 o'clock yesterday）；过去的礼貌/委婉表达（I was wondering if you could help）。",
        key_concepts: ["was/were + ing", "过去某刻正在", "背景动作", "when 搭配"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_perfect",
      label: "Past Perfect",
      type: "tense",
      details: {
        zh_label: "过去完成时",
        summary: "表达在过去某一时间点之前就已经完成的动作，是「过去的过去」，用于交代两个过去事件的时间先后顺序。",
        analogy: "回忆里的更早回忆——「那场戏开始之前，这件事就已经发生了」。「When she arrived, he had already left.（她到时他已经离开了）」，「离开」发生在「到达」之前，是回忆时间线里的更深层倒叙，专门用来说清楚「哪件事先发生」。",
        notes: "构成：had + 过去分词。关键用法：两个过去动作，更早的用过去完成时，较近的用一般过去时。常见于 before/after/when/by the time 引导的时间从句。主要功能：厘清时间顺序，避免歧义。",
        key_concepts: ["had + PP", "过去的过去", "时间先后顺序", "两个过去事件"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_perfect_continuous",
      label: "Past Perfect Continuous",
      type: "tense",
      details: {
        zh_label: "过去完成进行时",
        summary: "表达在过去某一时间点之前一直持续进行的动作，强调该持续过程对那个过去时间点的影响。",
        analogy: "回忆里的持续直播——「那时候，这件事已经持续进行了很长时间了」。「He had been waiting for three hours when she finally arrived.（她终于来时，他已经等了整整三小时）」，把那段漫长的等待过程带到另一个过去的时间节点上。",
        notes: "构成：had been + 现在分词。较少使用，主要用于强调「过去某点之前的持续行为」对那个时间点的状态产生的影响（疲倦、结果等）。用 for + 时间段来强调持续时长。",
        key_concepts: ["had been + ing", "过去的持续过程", "强调持续时长", "过去时间点前"],
        source: { type: "conversation" },
      },
    },
    {
      id: "future_simple",
      label: "Future Simple",
      type: "tense",
      details: {
        zh_label: "一般将来时",
        summary: "表达将来会发生的动作或存在的状态，包括临时决定、预测、意愿等，是最基本的将来时表达。",
        analogy: "预告片字幕——这件事将要发生，现在还没演到这一幕，只是预告观众「接下来，这里将会发生……」。「I will help you.」是主角在台上当场做的决定（临时决定）或对观众的承诺。",
        notes: "构成：will + 动词原形（所有人称）。be going to 与 will 的区别：be going to 表已有计划或有迹象的预测；will 表临时决定、纯预测或意愿/承诺。时间/条件状语从句中不用 will，用一般现在时代替将来：When he arrives, we will start.（不是 will arrive）。",
        key_concepts: ["will + 原形", "临时决定", "预测/意愿", "主从句时态规则"],
        source: { type: "conversation" },
      },
    },
    {
      id: "future_continuous",
      label: "Future Continuous",
      type: "tense",
      details: {
        zh_label: "将来进行时",
        summary: "表达将来某时刻正在进行的动作，或按计划将在未来进行的事（语气比 will 更客观、更自然）。",
        analogy: "预告片里的直播画面——到那个时间点，动作将正在进行，像是在预告「届时镜头将会怼着……这个画面」。「This time tomorrow, I will be flying to Paris.（明天这时候，我将正在飞往巴黎的途中）」。",
        notes: "构成：will be + 现在分词。微妙用途：表示将来某事会「自然而然」发生，语气比 will 更委婉客观，常用于礼貌询问（Will you be using the car tonight?），减少要求感。",
        key_concepts: ["will be + ing", "将来某刻正在", "委婉表达", "自然发生"],
        source: { type: "conversation" },
      },
    },
    {
      id: "future_perfect",
      label: "Future Perfect",
      type: "tense",
      details: {
        zh_label: "将来完成时",
        summary: "表达在将来某一时间点之前就已经完成的动作，站在未来回望，交代「到那时候，这件事将已经结束」。",
        analogy: "预告片里的回顾字幕——「到第三幕结束时，第一幕那件事将已经过去了」，是从未来往回看的「届时的完成」。「By next year, I will have graduated.（到明年，我将已经毕业）」，现在还没毕业，但预告将来某点上完成。",
        notes: "构成：will have + 过去分词。常与 by the time、by + 将来时间点 搭配（by then、by 2026）。实际使用频率不高，但在正式写作和考试中是重要考点。",
        key_concepts: ["will have + PP", "将来的完成", "by + 时间点", "未来回望"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_future",
      label: "Past Future",
      type: "tense",
      details: {
        zh_label: "过去将来时",
        summary: "在过去视角中对将来的预期或计划，主要出现在宾语从句的时态呼应（主句过去时 → 从句将来用过去将来时）。",
        analogy: "回忆画面里的预告片——「那时候，他以为他将要……」，是在过去的视角里对未来的预期。「He said he would come.（他说他会来）」，「会来」是说话时对未来的预测，因为主句是过去时，预测也要退一步变成过去将来。",
        notes: "构成：would + 动词原形（或 was/were going to + 原形）。主要出现场景：①直接引语变间接引语时的时态变化；②宾语从句、条件句的时态呼应。Would 还有虚拟语气用法（与过去将来时同形但语义不同）。",
        key_concepts: ["would + 原形", "过去视角的将来", "时态呼应", "间接引语"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 语态 (concept + rule)
    // ═════════════════════════════════════════
    {
      id: "voice",
      label: "Voice",
      type: "concept",
      details: {
        zh_label: "语态",
        summary: "描述句子中主语与谓语动作的关系：主语主动发出动作（主动语态）还是承受动作（被动语态），实质上是「聚光灯打给谁」的选择。",
        analogy: "聚光灯的打向选择——同样一件事，导演可以选择把灯光打在主动发力的那位（主动语态），也可以把灯光移向承受动作的那位、让施动者退到阴影里甚至不出现（被动语态），叙述角度因此完全不同。",
        notes: "英语语态只有主动（active）和被动（passive）两种。选择语态的实际原则：①不知道谁做的 ②强调被做的结果 ③正式文体中隐去施动者。中文母语者易犯错：把汉语「被」字句的范围误认为等同于英语被动语态（汉语「被」一般只用于不幸/消极事件，英语被动语态无此限制）。",
        key_concepts: ["主动/被动", "聚光灯视角", "施动者地位", "叙述选择"],
        source: { type: "conversation" },
      },
    },
    {
      id: "active_voice",
      label: "Active Voice",
      type: "rule",
      details: {
        zh_label: "主动语态",
        summary: "主语是动作的发出者，能量由主语流向宾语，是句子最自然、最直接的表达方式。",
        analogy: "主角站在舞台中央、亲自发出动作——能量由内向外，动作的发出者掌镜，剧情从他的视角展开，观众看到的是「他在做什么」。「The chef cooked the meal.」厨师就是主角，烹饪就是他的核心动作。",
        notes: "主动语态是英语表达的默认状态，写作中应优先使用（更简洁有力）。结构：主语 + 谓语（+ 宾语/表语/补语）。转换为被动语态：宾语变主语，谓语变 be + 过去分词，原主语变 by 短语（可省）。",
        key_concepts: ["施动者为主语", "默认表达方式", "简洁有力", "可转被动"],
        source: { type: "conversation" },
      },
    },
    {
      id: "passive_voice",
      label: "Passive Voice",
      type: "rule",
      details: {
        zh_label: "被动语态",
        summary: "主语是动作的承受者，施动者退到 by 短语中（或省略），用于强调动作结果、隐去施动者或不知施动者的场合。",
        analogy: "把原本的配角推到聚光灯下——主角（施事者）退居幕后甚至消失在字幕里，「某件事被做了」，观众的注意力全落在承受动作的那一方。「The meal was cooked by the chef.」虽然说的是同一件事，但镜头完全挪到了饭菜上。",
        notes: "构成：be（任何时态）+ 过去分词。各时态被动：is/are done（一般现在被动）、was/were done（一般过去被动）、has been done（现完被动）、is being done（现进被动）。by + 施动者可省略。含情态动词的被动：modal + be + 过去分词（can be done）。",
        key_concepts: ["be + PP", "承受者为主语", "by 短语可省", "各时态被动"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 语气 (concept + rule)
    // ═════════════════════════════════════════
    {
      id: "mood",
      label: "Mood",
      type: "concept",
      details: {
        zh_label: "语气",
        summary: "说话者对所陈述命题的「真实性态度」标注：陈述语气表达客观事实，祈使语气表达命令/请求，虚拟语气表达假设/愿望/建议。",
        analogy: "这场戏的「真实性级别」标注——是真实发生的正片（陈述），是导演直接对观众喊话下令（祈使），还是一出明确标注「纯属虚构」的假想剧（虚拟）？不同语气，观众对台上发生事情的「信任级别」完全不同。",
        notes: "三种语气中，虚拟语气是中国学生最大的难点：它要用「时态后退」来表达「与现实相反/假设/愿望」，在形式上看起来是过去时，但语义是假设（If I were you... 我并不是你）。",
        key_concepts: ["三种语气", "真实性态度", "形式 vs 语义", "虚拟难点"],
        source: { type: "conversation" },
      },
    },
    {
      id: "indicative_mood",
      label: "Indicative Mood",
      type: "rule",
      details: {
        zh_label: "陈述语气",
        summary: "平铺直叙地陈述事实、描述状态或提出疑问，是英语句子最常见的语气，占日常表达的绝大多数。",
        analogy: "平铺直叙的正片——陈述真实发生的事，这是最普通的演出模式，观众按字面理解即可，台上发生什么就是什么，没有特殊信号告诉你这是假的或是在命令你。",
        notes: "陈述语气无特殊形态标记，就是正常的时态变化。包含：肯定句（He goes.）、否定句（He doesn't go.）、疑问句（Does he go?）。这是语气的默认状态，学习重点是与其他两种语气区分。",
        key_concepts: ["默认语气", "陈述事实", "正常时态", "包含疑问句"],
        source: { type: "conversation" },
      },
    },
    {
      id: "imperative_mood",
      label: "Imperative Mood",
      type: "rule",
      details: {
        zh_label: "祈使语气",
        summary: "表达命令、请求、邀请或建议，句子通常以动词原形开头，省略主语 you（听话人默认是对方）。",
        analogy: "导演直接对观众喊话——「坐下！别动！来这里！」主角从台上消失，句子直接以动词原形开头冲着对方说，命令或请求毫不掩饰，没有主语是因为「对象就是听话的你，不需要再点名」。",
        notes: "构成：动词原形（+ 宾语/补语）。否定形式：Don't + 动词原形。礼貌形式：Please + 动词原形 / 动词原形 + please（语气软化）。Let's + 动词原形 表示「我们一起……」，也属于祈使句的一种（第一人称复数祈使）。",
        key_concepts: ["动词原形开头", "省略主语 you", "命令/请求/邀请", "Don't 否定"],
        source: { type: "conversation" },
      },
    },
    {
      id: "subjunctive_mood",
      label: "Subjunctive Mood",
      type: "rule",
      details: {
        zh_label: "虚拟语气",
        summary: "通过「时态后退」来表达与事实相反的假设、强烈愿望或建议，是英语语法中形式与语义最不对称的难点。",
        analogy: "演一出「如果当初……会怎样」的假想剧——剧情明确不是现实，演员用过去式的外壳演现在的幻想（与现在事实相反），用过去完成时的外壳重演已错过的历史（与过去事实相反），整场戏都在括号里，提醒观众这是假想。",
        notes: "三种核心用法：①与现在/将来事实相反：If I were/was you...（条件句 If + 过去式，主句 would/could + 原形）；②与过去事实相反：If I had known...（If + 过去完成时，主句 would have + PP）；③表建议/要求：suggest/recommend/insist + that sb. (should) do...（should 可省略，动词原形保留）。",
        key_concepts: ["时态后退", "与现实相反", "If 条件句", "should 可省略"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 谓语实现机制 (part_of_speech × 3 + rule × 2)
    // ═════════════════════════════════════════
    {
      id: "auxiliary_verb",
      label: "Auxiliary Verb",
      type: "part_of_speech",
      details: {
        zh_label: "助动词",
        summary: "本身不表达实质语义，专门协助主动词构成时态、语态、疑问和否定的功能性动词，包括 be、have、do 三类。",
        analogy: "幕后工作人员——不能单独上台表演（没有独立语义），但谓语动词要换时态（进行体/完成体）、换成被动、变成疑问句或否定句，全靠他们在后台把戏服和道具换好传递出来。be 负责进行/被动，have 负责完成，do 负责疑问/否定。",
        notes: "三类助动词：① be（am/is/are/was/were）：构成进行时（be + ing）和被动语态（be + PP）；② have（has/had）：构成完成时（have + PP）；③ do（does/did）：构成一般时的疑问句和否定句（Do you...? / I don't...）。助动词在疑问句和否定句中位置前移（倒装/提前）。",
        key_concepts: ["be / have / do", "无实质语义", "时态/语态构成", "疑问否定"],
        source: { type: "conversation" },
      },
    },
    {
      id: "modal_verb",
      label: "Modal Verb",
      type: "part_of_speech",
      details: {
        zh_label: "情态动词",
        summary: "表达说话者对动作的「主观态度」——可能性（can/could/may/might）、必要性（must/have to）、建议（should/ought to）、意愿（will/would）等，是语气的重要实现工具。",
        analogy: "谓语动词的「情绪说明书」——在动词出场前先亮出「这个动作是必须做/可以做/应该做/可能发生/愿意做」的说明，给动作加上主观色彩。没有情态动词时，「He goes」只是陈述事实；加上「He must go」，动作立刻有了必要性的主观判断。",
        notes: "情态动词特点：①后接动词原形（无 to）；②本身不随人称变化（第三人称单数不加 s）；③无非谓语形式（无不定式、动名词、分词形式）。常见搭配：情态动词 + have + PP 表对过去推测（He must have left. 他当时一定走了。）。",
        key_concepts: ["主观态度", "接动词原形", "不变人称", "对过去推测"],
        source: { type: "conversation" },
      },
    },
    {
      id: "linking_verb",
      label: "Linking Verb",
      type: "part_of_speech",
      details: {
        zh_label: "系动词",
        summary: "不表达主语对外做了什么，而是连接主语与描述其状态/性质/身份的表语，构成 SVC 句型的核心。",
        analogy: "连接主角和人设标签的「等号」——不表达主角对外做了什么，只是把「这个人是什么/变成了什么/感觉怎样/看起来如何」这些标签贴到他身上，自己变成透明的连接桥梁。「She seems tired」中 seems 就是那个等号，tired 是她的标签。",
        notes: "五类系动词：① be 系（最基本）；② 感官动词：look/sound/smell/taste/feel（后接形容词，不是副词）；③ 变化系：become/get/turn/grow/go（表变化结果）；④ 保持系：keep/stay/remain（表状态持续）；⑤ 表现/感觉：seem/appear/prove（表看起来/证明是）。",
        key_concepts: ["连接主表", "后接形容词", "无宾语", "SVC 骨干"],
        source: { type: "conversation" },
      },
    },
    {
      id: "subject_verb_agreement",
      label: "Subject-Verb Agreement",
      type: "rule",
      details: {
        zh_label: "主谓一致",
        summary: "谓语动词的形态必须与主语的人称和数保持一致的语法规则，是英语句子形式正确性的基础约束。",
        analogy: "主角和核心动作之间的「档期合同」——主角是单数还是复数、是第几人称，谓语动词必须同步调整形态，双方档期对不上，演出就会出错。合同的核心条款：第三人称单数主语 + 一般现在时 = 谓语加 -s/-es。",
        notes: "难点情况：①集合名词（team/family/government）：英式英语视为复数，美式英语视为单数；②就近原则（Either...or/Neither...nor/not only...but also）：谓语与最近的主语一致；③ there be 句型：be 与后面的名词一致；④不定代词（everyone/nobody/each）：谓语用单数。",
        key_concepts: ["人称/数一致", "第三人称单数", "就近原则", "不定代词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "third_person_singular",
      label: "Third Person Singular -s",
      type: "rule",
      details: {
        zh_label: "第三人称单数",
        summary: "主谓一致规则中最高频的具体体现：一般现在时中，第三人称单数主语（he/she/it/单数名词）要求谓语动词加 -s 或 -es。",
        analogy: "主谓一致档期合同里最常被考核的那条细则——当主角是「第三者（他/她/它）且只有一个」时，谓语动词现在时必须加 -s 或 -es 来「盖章确认档期匹配」。这个规则看似简单，却是英语母语者和学习者最容易混淆的考试陷阱之一。",
        notes: "加 -s：大多数动词（works、reads、plays）。加 -es：以 -s/-ss/-x/-sh/-ch/-o 结尾的动词（goes、does、washes、watches）。变 -y 为 -ies：辅音字母 + y 结尾（fly→flies、study→studies）。特殊：be→is，have→has。",
        key_concepts: ["-s/-es 变化", "he/she/it 搭配", "一般现在时限定", "特殊变形"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 非谓语动词 (concept × 2 + structure × 4)
    // ═════════════════════════════════════════
    {
      id: "finite_verb",
      label: "Finite Verb",
      type: "concept",
      details: {
        zh_label: "限定动词",
        summary: "具有人称、数和时态形态变化的动词，承担句子谓语功能，一个简单句只允许存在一个限定动词作为谓语。",
        analogy: "仍在担任主演的动词——他有完整的「主演身份证」（人称、数、时态都写清楚），站在谓语位置上主导整场戏的时间设定和逻辑关系。只要他还戴着这块「主演牌」，整场演出的时间轴就由他定。",
        notes: "限定动词是非谓语动词（infinitive/gerund/participle）的对立概念：限定动词受主语制约、有时态，非谓语动词不受人称/数制约、无时态。「一句一谓语」原则：简单句中只能有一个限定动词担任谓语；如要表达多个动作，需借助连词或将其中一个变为非谓语。",
        key_concepts: ["有人称/数/时态", "谓语担当", "一句一谓语", "与非谓语对立"],
        source: { type: "conversation" },
      },
    },
    {
      id: "non_finite_verb",
      label: "Non-Finite Verb",
      type: "concept",
      details: {
        zh_label: "非谓语动词",
        summary: "动词卸下谓语（限定动词）身份后的三种变形：不定式、动名词、分词，不承担谓语功能，但保留动词的动作语义和带宾语/状语的能力。",
        analogy: "动词卸下主演身份后的客串形态——同一个演员，摘掉「主演牌」后可以扮演道具（名词化成动名词）、化妆造型（形容词化成分词）、或写旁白（状语化成不定式），但一旦客串，他就不再主导整场戏的时间设定，时间由那个仍担任主演的限定动词说了算。",
        notes: "三种非谓语的核心差异：不定式（to do）用途最灵活，可充当名词/形容词/副词；动名词（doing）完全名词化，专注名词功能；分词（doing/done）形容词化，用于修饰或构成时态/语态。",
        key_concepts: ["不定式/动名词/分词", "无时态变化", "保留动词特征", "客串其他成分"],
        source: { type: "conversation" },
      },
    },
    {
      id: "infinitive",
      label: "Infinitive",
      type: "structure",
      details: {
        zh_label: "不定式",
        summary: "动词最「本色出演」的非谓语形式（to + 动词原形），用途最广泛，可充当名词、形容词和副词三类成分。",
        analogy: "动词最「本色出演」的客串形式——保留原形、通常挂上「to」这块特别出演牌，在台上可以充当任意角色：当主角（主语）、当配角（宾语）、充当旁白（目的状语），甚至给其他演员贴标签（定语）。用途最灵活，正是因为他没有完全变装成其他工种，还有一眼认出来的「动词底子」。",
        notes: "充当各成分：①主语（To learn is fun）；②宾语（I want to go）；③表语（My goal is to succeed）；④目的状语（I study to pass exams）；⑤定语（I have a book to read）。注意：feel/see/hear/let/make 等感官/使役动词后接不带 to 的不定式（裸不定式）。",
        key_concepts: ["to + 原形", "三种词性功能", "目的状语", "裸不定式"],
        source: { type: "conversation" },
      },
    },
    {
      id: "gerund",
      label: "Gerund",
      type: "structure",
      details: {
        zh_label: "动名词",
        summary: "动词加 -ing 后完全名词化的形式，在句中专注充当名词成分（主语、宾语、表语、介词宾语），是「完全卸任的动词」。",
        analogy: "动词穿上名词戏服全程客串名词工种——他不再主导剧情（谓语），而是完全扮演一个名词角色出现在台上。「Swimming is fun.（游泳是有趣的）」，swimming 整个人变成了主角（主语），没有人能看出他本来是个动作指导。",
        notes: "动名词 vs. 不定式作宾语的区别：部分动词只接动名词（enjoy/finish/avoid/mind/consider + doing）；部分只接不定式（want/hope/decide/plan + to do）；部分两者皆可但意义不同（stop doing 停止做/stop to do 停下来去做；remember doing 记得做过/remember to do 记得去做）。",
        key_concepts: ["动词 + ing", "完全名词化", "动名词 vs. 不定式", "介词后必用动名词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "present_participle",
      label: "Present Participle",
      type: "structure",
      details: {
        zh_label: "现在分词",
        summary: "动词加 -ing 形成的形容词/副词性非谓语形式（与动名词同形但功能不同），表达「正在进行」的状态，用于修饰名词或充当状语。",
        analogy: "动词客串形容词工种、为其他演员贴「正在进行」状态标签的造型师——「the running man（正在跑的人）」中，running 就是化妆师在「那位演员」脸上贴的「正在跑」标签。与动名词的区别：造型师是在给别人化妆，不是自己当主角。",
        notes: "与动名词区别（同是 -ing）：现在分词是形容词/副词性，修饰名词或作状语；动名词是名词性，在句中充当名词成分。判断方法：去掉 -ing 词，如果句子主体仍完整→现在分词（修饰用）；去掉后句子缺少成分→动名词（充当成分）。",
        key_concepts: ["动词 + ing", "形容词/副词性", "主动/进行含义", "区别于动名词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "past_participle",
      label: "Past Participle",
      type: "structure",
      details: {
        zh_label: "过去分词",
        summary: "动词的第三形式（规则动词加 -ed，不规则动词各异），具有「被动/已完成」的语义，用于构成完成时、被动语态以及作形容词/状语。",
        analogy: "动词客串「已完成状态」造型师——为演员贴上「被处理过了/已经完成的」状态标签，如「the broken window（被打碎的窗户）」「a cooked meal（已煮好的饭）」。他还有两个主要兼职：配合 have 构成完成时（已发生），配合 be 构成被动语态（被动）。",
        notes: "三大用途：①完成时（have + PP）；②被动语态（be + PP）；③作形容词定语（a written letter / excited students）；④作状语分词短语（Exhausted by work, he slept early.）。注意区分：interested（形容词，表人的感受）vs. interesting（表事物特性），这类情感形容词来源于过去分词和现在分词。",
        key_concepts: ["-ed 形式", "被动/完成含义", "构成被动/完成时", "情感形容词"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 句子种类与从句簇 (structure + part_of_speech)
    // ═════════════════════════════════════════
    {
      id: "simple_sentence",
      label: "Simple Sentence",
      type: "structure",
      details: {
        zh_label: "简单句",
        summary: "只含一组主谓结构（一个限定动词作谓语）的句子，是所有复杂句型的基础构成单元。",
        analogy: "最纯粹的独幕剧——只有一组主角+核心动作，一幕演完，干净利落，没有子剧情穿插其中。无论外加多少定语、状语来扩充场景，骨子里仍是一场一组主演的独幕演出。",
        notes: "简单句是英语句子的基本形式，但「简单」指的是结构（只有一个主谓），不是内容。加很多定语/状语的简单句可以非常长：「The tall man standing by the window with a red coat finally left.」仍是简单句。",
        key_concepts: ["一个主谓", "基础结构", "可扩充不改性质", "五种句型基础"],
        source: { type: "conversation" },
      },
    },
    {
      id: "compound_sentence",
      label: "Compound Sentence",
      type: "structure",
      details: {
        zh_label: "并列句",
        summary: "由两个或多个独立简单句通过并列连词（or/and/but/so 等）连接而成，各分句地位平等、互不从属。",
        analogy: "两场或多场并列的独幕剧拼在一起——每场各有自己的主角和核心动作，串场主持人（并列连词）站在中间衔接，地位平等、谁也不附属于谁。「I came, I saw, I conquered.」三场并列，凯撒大帝每次都是独立主演。",
        notes: "并列连词（FANBOYS）：For/And/Nor/But/Or/Yet/So。标点规则：并列连词前通常加逗号（I like tea, and she likes coffee.）；用分号也可连接不含连词的并列句（I like tea; she likes coffee.）。注意：并列句两个分句都是独立主谓结构，这是与复合句的根本区别。",
        key_concepts: ["并列连词", "平等地位", "各有主谓", "FANBOYS"],
        source: { type: "conversation" },
      },
    },
    {
      id: "complex_sentence",
      label: "Complex Sentence",
      type: "structure",
      details: {
        zh_label: "复合句（复杂句）",
        summary: "由一个主句和至少一个从句构成，从句在语法上从属于主句，充当主句的某个成分（主语/宾语/定语/状语等）。",
        analogy: "主线剧情里嵌套了子剧情——主线最重要、最完整，子剧情（从句）要依附于主线才能存在，有自己的主角和核心动作，但整体作为服务于主线的一个配件，层级从属关系清晰。「I believe that she is right.」主线是「我相信」，子剧情「她是对的」只是那个信念的内容。",
        notes: "关键认知：复合句中，从句有自己完整的主谓结构，但整体上充当主句的一个成分。从句的分类（按功能）：名词性从句、定语从句、状语从句。从句由从属连词或关系词引导。「一句一谓语」的正确理解：每个从句只有一个谓语，复合句整体可有多个谓语但分属不同层级。",
        key_concepts: ["主句 + 从句", "从属关系", "从句充当成分", "多层主谓"],
        source: { type: "conversation" },
      },
    },
    {
      id: "clause",
      label: "Clause",
      type: "concept",
      details: {
        zh_label: "从句",
        summary: "含有自身主谓结构但整体从属于主句、充当主句某一成分的句子单元，是构成复合句的核心组件。",
        analogy: "主线里嵌入的子剧情——有自己独立的主角和核心动作（完整的主谓结构），但整体作为配件服务于主线：或充当名词角色（名词性从句），或修饰某个演员（定语从句），或交代背景（状语从句），但永远不是本场演出的主线。",
        notes: "从句三大类：①名词性从句（充当名词成分：主/宾/表/同位语）；②定语从句（修饰名词）；③状语从句（修饰谓语/句子）。引导词：that/whether（名词性）；who/which/that/when/where/why（定语）；when/if/because/although/so that（状语）。",
        key_concepts: ["有主谓的从属单元", "三大类型", "引导词", "充当句子成分"],
        source: { type: "conversation" },
      },
    },
    {
      id: "noun_clause",
      label: "Noun Clause",
      type: "structure",
      details: {
        zh_label: "名词性从句",
        summary: "整体充当名词成分（主语/宾语/表语/同位语）的从句，把一整段子剧情浓缩填入一个名词槽位。",
        analogy: "以整段子剧情充当名词角色——把一整个故事片段浓缩成一个可以插进主线任意名词位置的「胶囊剧情」。「Whether he comes or not（他来不来）」这整件事可以当主角（主语从句），也可以当宾语，连一个小括号都不用，直接占据了名词的位置。",
        notes: "四种名词性从句：①主语从句（That he lied is clear.）②宾语从句（I know that she left.）③表语从句（The question is whether we can.）④同位语从句（The fact that he lied shocked us.）。引导词：that（陈述内容）、whether/if（是否）、wh- 词（特殊疑问内容）。",
        key_concepts: ["充当名词成分", "四种类型", "that/whether 引导", "疑问词引导"],
        source: { type: "conversation" },
      },
    },
    {
      id: "subject_clause",
      label: "Subject Clause",
      type: "structure",
      details: {
        zh_label: "主语从句",
        summary: "整个从句充当句子主语，通常后接形式主语 it 提前，真正的从句放到句末。",
        analogy: "把整段子剧情推上主角位——「他是否来（整件事）」变成这场戏的主角，谓语动词针对这整段话来陈述。因为这个「子剧情主角」太重，通常先派「it」（形式主语/替身）上台占位，把真正的子剧情压到最后揭晓。",
        notes: "常见结构：It is + 形容词/名词 + that/whether/wh- 从句（It is important that we act now.）。直接作主语（不用 it）：What he said surprised me.（疑问词引导的主语从句通常直接置前）。注意与主语从句后的谓语一致：It is obvious that...（谓语看 it，永远是第三人称单数）。",
        key_concepts: ["从句当主语", "it 形式主语", "句末揭晓", "与表语从句区分"],
        source: { type: "conversation" },
      },
    },
    {
      id: "object_clause",
      label: "Object Clause",
      type: "structure",
      details: {
        zh_label: "宾语从句",
        summary: "整个从句充当及物动词或介词的宾语，是四种名词性从句中出现频率最高的一类。",
        analogy: "把整段子剧情填进宾语槽——「他说了一句话」，那句话的具体内容就是一段子剧情充当配角，是日常口语和写作里出现最频繁的从句类型。「I know that she is right.（我知道她是对的）」，「她是对的」这整段话就是「知道」的宾语。",
        notes: "引导词：that（陈述，可省略）、whether/if（是否）、wh- 词（特殊疑问内容）。时态呼应规则：主句一般过去时 → 从句时态也要后退（I thought that he was / had been...）；但表达客观真理时从句用一般现在时。语序：宾语从句必须用陈述语序（He asked where she was. 不是 where was she）。",
        key_concepts: ["从句当宾语", "时态呼应", "陈述语序", "最高频从句"],
        source: { type: "conversation" },
      },
    },
    {
      id: "predicative_clause",
      label: "Predicative Clause",
      type: "structure",
      details: {
        zh_label: "表语从句",
        summary: "整个从句充当系动词后的表语，让主语的「人设标签」从一个词扩展为一段完整的陈述。",
        analogy: "把整段子剧情当作主角的人设标签——系动词后面跟着的不是一个词，而是一整段话「问题是……」「事实是……」「看起来像是……」，让人设标签变得丰满复杂。「The truth is that nobody knew.（真相是没有人知道）」，「没有人知道」是真相的完整内容。",
        notes: "只能用陈述语序（The question is whether we should go. 不用 should we go）。注意：表语从句 vs. 同位语从句：表语从句的主语通常是代词（it/this/that）或意义空泛的名词，系动词是等号；同位语从句的先行词是有内容的抽象名词（fact/idea/news），从句是对先行词的解释。",
        key_concepts: ["从句当表语", "系动词后", "陈述语序", "扩展人设标签"],
        source: { type: "conversation" },
      },
    },
    {
      id: "appositive_clause",
      label: "Appositive Clause",
      type: "structure",
      details: {
        zh_label: "同位语从句",
        summary: "紧跟在抽象名词（fact/news/idea/truth/hope 等）后，对该名词进行解释说明的从句，整体充当该名词的同位语。",
        analogy: "紧跟在某个演员后的「注释子剧情」——像剧本里括号里的注解，把这个演员（抽象名词）的真正内容展开说明。「The news that he resigned shocked everyone.（他辞职的消息震惊了所有人）」，「他辞职」就是对「消息」内容的注释，两者完全同位。",
        notes: "与定语从句区别：同位语从句由 that 引导时，that 不充当从句成分（只是连接词）；定语从句 that 充当从句中的主语/宾语。判断方法：用「= 」替换检验，能用「=」连接成逻辑等式 → 同位语从句；不能（that 是代词）→ 定语从句。",
        key_concepts: ["抽象名词后", "that 不充当成分", "解释内容", "区别于定语从句"],
        source: { type: "conversation" },
      },
    },
    {
      id: "relative_clause",
      label: "Relative Clause",
      type: "structure",
      details: {
        zh_label: "定语从句",
        summary: "修饰先行词（名词或代词）的从句，由关系代词（who/which/that/whom/whose）或关系副词（when/where/why）引导，充当定语成分。",
        analogy: "以一段子剧情充当化妆造型师、给某个演员贴精确标签——「那个昨天来过的人」中「昨天来过」就是一段子剧情在化妆师岗位工作，精确地描绘出在众多演员里「就是那个有这段经历的人」。修饰越精细，被指向的演员就越独一无二。",
        notes: "限制性 vs. 非限制性定语从句：限制性（无逗号）缩小先行词范围，去掉意义改变；非限制性（加逗号）补充说明，去掉主句意义不变（My brother, who is a doctor, lives in Beijing.）。关系代词在从句中充当主语用 who/which/that；充当宾语时可省略。",
        key_concepts: ["先行词修饰", "限制/非限制", "关系词双重身份", "可省略宾语关系词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "adverbial_clause",
      label: "Adverbial Clause",
      type: "structure",
      details: {
        zh_label: "状语从句",
        summary: "充当状语成分的从句，由从属连词引导，表达时间、地点、原因、条件、让步、目的、结果、方式等语义关系。",
        analogy: "以一段子剧情充当舞台灯光布景——交代主线剧情的时间（when/before/after）、原因（because/since）、条件（if/unless）、结果（so that）等背景设定。背景越丰富，观众对主线发生的前因后果理解越深，但拿掉背景布景，主线演出仍可继续。",
        notes: "九大类状语从句：时间（when/while/as/before/after/until）、地点（where）、原因（because/since/as）、条件（if/unless/in case）、让步（although/though/even if）、结果（so...that/such...that）、目的（so that/in order that）、方式（as/as if）、比较（than/as...as）。",
        key_concepts: ["九大语义类型", "从属连词引导", "修饰谓语/句子", "可放句首或句末"],
        source: { type: "conversation" },
      },
    },
    {
      id: "relative_pronoun",
      label: "Relative Pronoun",
      type: "part_of_speech",
      details: {
        zh_label: "关系代词",
        summary: "既作为连接词引导定语从句，又在定语从句内部充当主语、宾语或定语，实现双重功能，包括 who/whom/whose/which/that。",
        analogy: "既是幕间引导员又是舞台上的演员——他一手牵着主线的某个演员（先行词），一手拉开定语从句这段子剧情的帷幕，同时自己还在子剧情里兼任主角（主语）或配角（宾语）的角色。who 牵着的是人，which 牵着的是物，that 两者皆可。",
        notes: "选用规则：① who/whom（人，主格/宾格）② which（物） ③ that（人/物，限制性从句）④ whose（所有格，人/物皆可）⑤ whom（人，宾格，正式用法）。省略：关系代词在从句中充当宾语时可省略（The book I bought / The book that I bought）。",
        key_concepts: ["who/which/that/whose", "双重功能", "充当从句成分", "可省略（宾格时）"],
        source: { type: "conversation" },
      },
    },
    {
      id: "relative_adverb",
      label: "Relative Adverb",
      type: "part_of_speech",
      details: {
        zh_label: "关系副词",
        summary: "既引导定语从句又在从句内充当状语的词，包括 when（先行词为时间）、where（先行词为地点）、why（先行词为 reason）。",
        analogy: "同样身兼引导员和演员两职——但他在子剧情里兼任的是「灯光布景状语」角色，说明时间/地点/原因，而不是主角或配角。「the day when I first arrived（我第一次到达的那天）」中，when 牵着「那天」，又在子剧情里扮演「在那天」的时间布景。",
        notes: "when = at which / on which（时间先行词）；where = in which / at which（地点先行词）；why = for which（reason 作先行词）。关系副词与关系代词的区别：关系副词可以用「介词 + 关系代词」替换（the city where I live = the city in which I live）。",
        key_concepts: ["when/where/why", "充当从句状语", "时间/地点/原因", "介词 + which 替换"],
        source: { type: "conversation" },
      },
    },
    {
      id: "coordinating_conjunction",
      label: "Coordinating Conjunction",
      type: "part_of_speech",
      details: {
        zh_label: "并列连词",
        summary: "连接语法地位平等的词、短语或分句，构成并列关系，包括 and/but/or/nor/for/yet/so（FANBOYS）。",
        analogy: "舞台上的串场主持——站在两场独幕剧之间，用 and（顺接）/but（转折）/or（选择）/so（因果）把它们衔接起来，双方地位平等，主持人不偏向任何一边，两场戏都是主戏，不存在主从关系。",
        notes: "FANBOYS：For/And/Nor/But/Or/Yet/So。连接分句时，并列连词前通常加逗号。相关连词（correlative conjunctions）：either...or / neither...nor / both...and / not only...but also，这些成对出现，需注意就近原则（Neither he nor they are right.）。",
        key_concepts: ["FANBOYS", "地位平等", "并列句连接", "成对相关连词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "subordinating_conjunction",
      label: "Subordinating Conjunction",
      type: "part_of_speech",
      details: {
        zh_label: "从属连词",
        summary: "引导从属关系的状语从句或名词性从句，说明从句与主句的逻辑关系（时间/原因/条件/让步/目的等）。",
        analogy: "领着子剧情进主线的向导——他手持旗帜（因为/虽然/如果/当……时），带着整段子剧情从侧台进入主舞台，旗帜上写明「这段子剧情和主线是什么从属关系」，让观众明确：这是背景交代、还是假设条件、还是原因说明。",
        notes: "常见从属连词（按类别）：时间：when/while/as/before/after/since/until/once；原因：because/since/as/now that；条件：if/unless/provided that/as long as；让步：although/though/even though/even if；目的：so that/in order that；结果：so...that/such...that。",
        key_concepts: ["引导状语从句", "说明逻辑关系", "从句放句首需逗号", "区别于并列连词"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 词类基础簇 (part_of_speech × 10)
    // ═════════════════════════════════════════
    {
      id: "noun",
      label: "Noun",
      type: "part_of_speech",
      details: {
        zh_label: "名词",
        summary: "表示人、事物、地点、概念等的词，是可以在句中担任主语、宾语、表语、同位语等名词性成分的基础词类。",
        analogy: "剧组里的「演员」工种——凡是可以登台担任角色（主角、配角、同位者）的，都由名词来胜任。它是整个剧组里最基础、供给量最大的工种，有的是专有演员（专有名词，固定演同一个角色），有的是群演（普通名词，什么角色都能演）。",
        notes: "名词分类：① 专有名词（China/London，大写）② 可数名词（有单复数之分）③ 不可数名词（water/music，无复数）④ 集合名词（team/family，可单可复）⑤ 抽象名词（love/freedom，通常不可数）。名词的格：所有格（'s 或 of）表示从属关系。",
        key_concepts: ["人/事/地/概念", "可数/不可数", "专有/普通", "名词格"],
        source: { type: "conversation" },
      },
    },
    {
      id: "pronoun",
      label: "Pronoun",
      type: "part_of_speech",
      details: {
        zh_label: "代词",
        summary: "代替名词（或名词短语）的词，避免重复，保持表达简洁，包括人称代词、物主代词、反身代词、指示代词等。",
        analogy: "主角的「替身演员」——当主角名字被反复提及会显得啰嗦时，替身上台顶包（he/she/they/it/this/it），观众心知肚明指的还是同一个人或事物，演出照样顺畅，台词也不会像复读机一样重复名字。",
        notes: "六类代词：① 人称代词（I/you/he 主格；me/you/him 宾格）② 物主代词（my/your/his 形容词性；mine/yours/his 名词性）③ 反身代词（myself/yourself/himself）④ 指示代词（this/that/these/those）⑤ 不定代词（some/any/each/every/all/both/neither）⑥ 疑问代词（who/which/what）。",
        key_concepts: ["六类代词", "主格/宾格", "物主代词两种", "不定代词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "verb",
      label: "Verb",
      type: "part_of_speech",
      details: {
        zh_label: "动词",
        summary: "表达动作、过程或状态的词，是句子谓语的核心担当，按是否需要宾语分及物/不及物，按是否可独立作谓语分限定动词/非谓语动词。",
        analogy: "剧组里最核心的「动作指导」——动作指导本人担任谓语主演时叫限定动词，卸任去其他岗位客串时就变成非谓语（不定式/动名词/分词）；整个剧组几乎所有戏剧冲突都由他驱动，没有动词就没有剧情推进。",
        notes: "动词五种形态：原形（go）、第三人称单数现在式（goes）、过去式（went）、现在分词（going）、过去分词（gone）。按语义分：实义动词（表动作/状态）/ 系动词（连接主表）/ 助动词（辅助构成时态/语态）/ 情态动词（表主观态度）。",
        key_concepts: ["五种形态", "及物/不及物", "实义/系/助/情态", "谓语核心"],
        source: { type: "conversation" },
      },
    },
    {
      id: "adjective",
      label: "Adjective",
      type: "part_of_speech",
      details: {
        zh_label: "形容词",
        summary: "修饰名词或代词，描述其性质、状态、特征，或作表语描述主语状态，包括位置上的前置定语和后置表语两种主要用法。",
        analogy: "专职化妆造型师——只服务于名词演员：在开场前（前置定语）或在台上（系动词后表语）给演员贴上外貌、状态、性质的造型标签，让观众精准认出这位角色的特征。化妆师只给演员化，不给动作化（不修饰动词，那是灯光师副词的工作）。",
        notes: "位置：① 前置定语（a beautiful day，修饰名词）② 后置定语（something interesting，修饰不定代词）③ 表语（She is beautiful.）④ 宾语补足语（She painted it red.）。形容词级：原级/比较级（+ -er 或 more）/最高级（+ -est 或 most）。注意：形容词和副词的混淆（He drives slow/slowly）。",
        key_concepts: ["修饰名词", "前置/后置", "比较级/最高级", "区别副词"],
        source: { type: "conversation" },
      },
    },
    {
      id: "adverb",
      label: "Adverb",
      type: "part_of_speech",
      details: {
        zh_label: "副词",
        summary: "修饰动词、形容词、其他副词或整个句子，表达动作的方式、程度、频率、时间、地点等，是句子的「调光旋钮」。",
        analogy: "灯光师——负责给核心动作（谓语动词）、场景描述（形容词/其他副词）乃至整场演出调光：这个动作是怎么做的（quickly）？做到什么程度（very）？在什么频率下发生（always）？都由灯光师调控，他永远在为别人服务，不自己上台当主角。",
        notes: "副词分类：① 方式副词（quickly/carefully，通常加 -ly）② 频率副词（always/often/never，位置在 be 动词后、实义动词前）③ 程度副词（very/quite/too/enough）④ 时间/地点副词（now/here）⑤ 连接副词（however/therefore/moreover，用于衔接句子）。注意：enough 作副词放在所修饰形容词/副词之后（good enough，不是 enough good）。",
        key_concepts: ["修饰动词/形容词/副词", "频率副词位置", "程度副词", "-ly 结尾规律"],
        source: { type: "conversation" },
      },
    },
    {
      id: "preposition",
      label: "Preposition",
      type: "part_of_speech",
      details: {
        zh_label: "介词",
        summary: "连接名词（或代词）与句中其他成分，表达时间、地点、方式、原因等关系，介词短语可充当定语或状语。",
        analogy: "舞台上的场记——负责把一个演员（名词）和特定的时间、地点、关系说明挂钩，交代「在哪儿/在何时/关于什么/通过什么方式」，永远跟在名词前面领路，自己不单独上台，只做连接桥梁。",
        notes: "介词后接宾语（名词/代词宾格/动名词），构成介词短语（PP）。介词短语功能：① 作定语（the book on the table）② 作状语（I study in the morning）。常见混淆：in/at/on 的时间用法（in + 年月季/长时段，on + 日期/星期，at + 具体时刻）；in/at/on 的地点用法（in + 大地点，on + 平面，at + 具体地点）。",
        key_concepts: ["后接名词构成短语", "时间/地点/方式", "作定语或状语", "不单独作谓语"],
        source: { type: "conversation" },
      },
    },
    {
      id: "conjunction",
      label: "Conjunction",
      type: "part_of_speech",
      details: {
        zh_label: "连词",
        summary: "连接词、短语或句子的词，分并列连词（连接平等成分）和从属连词（引导从句）两大类。",
        analogy: "舞台结构的连接工——分两种：串场主持（并列连词）把平等的两场戏拼在一起，地位对等；向导（从属连词）把子剧情带进主线，明确从属关系。连接工负责建立逻辑桥梁，没有他，句子只能单独站着不成体系。",
        notes: "两大类：① 并列连词（FANBOYS 以及 both...and/either...or/neither...nor/not only...but also 等相关连词）② 从属连词（引导状语从句和名词性从句）。注意：连词后面必须接完整的句子成分（有主谓），这与介词（后接名词）有本质区别。Because（连词）vs. because of（介词短语）。",
        key_concepts: ["并列/从属两类", "连接等级不同", "区别于介词", "相关连词成对"],
        source: { type: "conversation" },
      },
    },
    {
      id: "article",
      label: "Article",
      type: "part_of_speech",
      details: {
        zh_label: "冠词",
        summary: "限定名词的特殊限定词，分不定冠词 a/an（泛指）和定冠词 the（特指），是中国学生最易犯错的语法点之一。",
        analogy: "演员出场时贴的「是否首次亮相」标签——a/an 表示「这个角色观众初次见到」（泛指，任意一个），the 表示「这位你们认识」（特指，就是那个）。没有冠词时则是不加标签的「抽象概念直接登台」（不可数/专有/抽象名词）。",
        notes: "a/an 区别：看下一个词的发音，以元音音素开头用 an（an apple/an hour），以辅音音素开头用 a（a university/a year）。零冠词（不用冠词）：专有名词、不可数名词泛指、复数名词泛指、抽象名词、by + 交通工具（by bus）、某些固定搭配（go to school/in hospital）。",
        key_concepts: ["a/an 泛指", "the 特指", "零冠词", "发音决定 a/an"],
        source: { type: "conversation" },
      },
    },
    {
      id: "numeral",
      label: "Numeral",
      type: "part_of_speech",
      details: {
        zh_label: "数词",
        summary: "表示数量或顺序的词，分基数词（one/two/three，表数量）和序数词（first/second/third，表顺序）。",
        analogy: "剧本里的「数量标注员」——告诉观众演员有几个（基数词：一个/两个主角）或这是哪一个（序数词：第一位/第二位出场的那位），精确量化舞台上人物和道具的数量与顺序，没有他，观众无法区分「某一个」和「某第几个」。",
        notes: "基数词：one/two/three...hundred/thousand/million/billion（注意：hundred/thousand/million 前有数词时不加 s，但作不定量词时加 s：hundreds of）。序数词：first/second/third/fourth... 通常加 the（the first time）。倍数表达：twice as...as / three times as...as。",
        key_concepts: ["基数词/序数词", "大数字规则", "序数词加 the", "倍数表达"],
        source: { type: "conversation" },
      },
    },
    {
      id: "interjection",
      label: "Interjection",
      type: "part_of_speech",
      details: {
        zh_label: "感叹词",
        summary: "表达说话者情感或语气的感叹性词语，与句子其余部分没有语法关联，通常独立使用并加感叹号或逗号。",
        analogy: "突然插入的情绪爆发——演员在台上一声「Oh!」「Wow!」「Ouch!」与剧情主线没有语法关系，纯粹是演员在情绪高峰时按捺不住冲着观众吐出的一句真实感叹，不计入句子成分分析，但让演出多了一份鲜活的人情味。",
        notes: "常见感叹词：Oh!/Ah!/Wow!/Hey!/Ouch!/Oops!/Alas!（表遗憾）/Bravo!（表喝彩）/Well!（表犹豫/惊讶）。使用规则：通常放句首，与主句用逗号或感叹号隔开（Oh, I forgot! / Wow, that's amazing!）。感叹词没有语法功能，不构成句子成分。",
        key_concepts: ["情感表达", "无语法关联", "句首位置", "逗号/感叹号隔开"],
        source: { type: "conversation" },
      },
    },

    // ═════════════════════════════════════════
    // 名词相关规则簇 (concept + rule)
    // ═════════════════════════════════════════
    {
      id: "countability",
      label: "Countability",
      type: "concept",
      details: {
        zh_label: "可数性",
        summary: "名词是否可以按个体单位计数的属性，决定冠词的选用、复数形式的存在以及量词的使用方式。",
        analogy: "演员「能不能分饰多角」的基础设定——可数名词可以一个一个数（一条狗/两条狗），不可数名词像水、音乐、建议这类是连续体，没有独立个体可数；这个底层设定决定了化妆师（冠词）怎么给他们贴标签，以及能不能帮他们「变身」出多个分身（复数）。",
        notes: "可数名词：有单复数形式（book/books），可与 a/an 连用，可用 many/few 修饰。不可数名词：无复数（water/advice/information/furniture），不与 a/an 连用，用 much/little 修饰，要计数需借助量词（a piece of advice/a glass of water）。注意：部分词在中英文间可数性不同（中文「信息」是可数的，英文 information 不可数）。",
        key_concepts: ["可数/不可数", "决定冠词用法", "决定复数存在", "量词系统"],
        source: { type: "conversation" },
      },
    },
    {
      id: "plural_form",
      label: "Plural Form",
      type: "rule",
      details: {
        zh_label: "名词复数",
        summary: "可数名词由单数变为复数的形态变化规则，分规则变化（加 -s/-es/-ies）和不规则变化两类。",
        analogy: "演员「分饰多角」时的换装规则——单数变复数要改变外形：大多数演员换上加 -s 的戏服，以 -s/-sh/-ch/-x 等结尾的演员换 -es 的戏服，以辅音 + y 结尾的演员要把 y 换成 ies，还有一批天生特殊的演员（不规则复数）完全换成另一套戏服（man→men，child→children，mouse→mice）。",
        notes: "规则变化：① 直接加 -s（books/cats）② -s/-ss/-x/-sh/-ch 结尾加 -es（buses/boxes/churches）③ 辅音 + y 结尾变 -y 为 -ies（babies/cities）④ -f/-fe 结尾变 -ves（leaves/knives，但 roofs/beliefs 直接加 s）⑤ -o 结尾：多数加 -es（tomatoes），但 piano/photo 加 -s。不规则：man/woman/child/tooth/foot/goose/mouse/ox。单复数同形：sheep/deer/fish/species。",
        key_concepts: ["规则 -s/-es/-ies", "不规则复数", "单复数同形", "-f/-fe 变化"],
        source: { type: "conversation" },
      },
    },
    {
      id: "article_usage",
      label: "Article Usage",
      type: "rule",
      details: {
        zh_label: "冠词用法",
        summary: "综合运用不定冠词 a/an、定冠词 the 与零冠词的规则体系，是英语中学习者错误率最高的语法项之一。",
        analogy: "演员出场时的「知名度打标规则」——刚出场的新面孔贴 a/an（观众不认识，泛指任意一个），再次出场或场上唯一的那位贴 the（观众已认得，特指），而抽象概念直接登台、专有名词出场、或者整类演员代表性登场时则完全不贴标签（零冠词）。",
        notes: "the 的用法：① 上文提到过 ② 独一无二（the sun/the earth）③ 形容词最高级后 ④ 序数词后（the first） ⑤ 乐器名称前（play the piano）⑥ 国家/机构全称含 of 时（the United States）。零冠词：专有名词/不可数名词泛指/复数名词泛指/by + 交通工具/go to + 场所（school/hospital/church 等作功能用途时）。",
        key_concepts: ["a/an 首次泛指", "the 已知/独一", "零冠词场景", "最高级/序数词 the"],
        source: { type: "conversation" },
      },
    },
    {
      id: "comparative_superlative",
      label: "Comparative & Superlative",
      type: "rule",
      details: {
        zh_label: "比较级与最高级",
        summary: "形容词和副词通过形态变化或借助 more/most 表达「A 比 B 更…」（比较级）和「A 是所有中最…」（最高级）的语法规则。",
        analogy: "化妆师（形容词）或灯光师（副词）在两位或多位演员之间评定「谁更夺目」的规则——两人相比用比较级（more glamorous/taller），多人中评选冠军用最高级（the most glamorous/the tallest）。短音节演员自己换装加 -er/-est，长音节演员借助道具 more/most 来烘托，让观众看清场上谁更胜一筹。",
        notes: "规则变化：单/双音节加 -er/-est（tall→taller→tallest；happy→happier→happiest）；多音节用 more/most（more beautiful）。不规则：good→better→best；bad→worse→worst；many/much→more→most；little→less→least。比较句型：as...as（同级）；more...than（优级比较）；the most...of/in（最高级范围限定）。",
        key_concepts: ["比较级 -er/more", "最高级 -est/most", "不规则变化", "as...as 同级"],
        source: { type: "conversation" },
      },
    },
  ],

  edges: [
    // ─── 主谓核心骨架 ─────────────────────────────
    {
      id: "subject__搭档__predicate",
      source: "subject",
      target: "predicate",
      label: "搭档",
      directed: false,
    },
    {
      id: "predicate__源于__verb",
      source: "predicate",
      target: "verb",
      label: "源于",
    },

    // ─── 谓语 → 五大句型 ──────────────────────────
    {
      id: "predicate__决定__sv_pattern",
      source: "predicate",
      target: "sv_pattern",
      label: "决定",
    },
    {
      id: "predicate__决定__svo_pattern",
      source: "predicate",
      target: "svo_pattern",
      label: "决定",
    },
    {
      id: "predicate__决定__svc_pattern",
      source: "predicate",
      target: "svc_pattern",
      label: "决定",
    },
    {
      id: "predicate__决定__svoo_pattern",
      source: "predicate",
      target: "svoo_pattern",
      label: "决定",
    },
    {
      id: "predicate__决定__svoc_pattern",
      source: "predicate",
      target: "svoc_pattern",
      label: "决定",
    },
    {
      id: "verb_transitivity__决定__svo_pattern",
      source: "verb_transitivity",
      target: "svo_pattern",
      label: "决定",
    },
    {
      id: "verb_transitivity__决定__svoo_pattern",
      source: "verb_transitivity",
      target: "svoo_pattern",
      label: "决定",
    },
    {
      id: "svc_pattern__依赖__linking_verb",
      source: "svc_pattern",
      target: "linking_verb",
      label: "依赖",
    },
    {
      id: "svo_pattern__包含__object",
      source: "svo_pattern",
      target: "object",
      label: "包含",
    },
    {
      id: "svoc_pattern__包含__complement",
      source: "svoc_pattern",
      target: "complement",
      label: "包含",
    },
    {
      id: "svc_pattern__包含__predicative",
      source: "svc_pattern",
      target: "predicative",
      label: "包含",
    },

    // ─── 谓语 → 时态 ──────────────────────────────
    {
      id: "predicate__承载__tense",
      source: "predicate",
      target: "tense",
      label: "承载",
    },
    {
      id: "tense__结合__aspect",
      source: "tense",
      target: "aspect",
      label: "结合",
      directed: false,
    },
    {
      id: "present_simple__属于__tense",
      source: "present_simple",
      target: "tense",
      label: "属于",
    },
    {
      id: "present_continuous__属于__tense",
      source: "present_continuous",
      target: "tense",
      label: "属于",
    },
    {
      id: "present_perfect__属于__tense",
      source: "present_perfect",
      target: "tense",
      label: "属于",
    },
    {
      id: "present_perfect_continuous__属于__tense",
      source: "present_perfect_continuous",
      target: "tense",
      label: "属于",
    },
    {
      id: "past_simple__属于__tense",
      source: "past_simple",
      target: "tense",
      label: "属于",
    },
    {
      id: "past_continuous__属于__tense",
      source: "past_continuous",
      target: "tense",
      label: "属于",
    },
    {
      id: "past_perfect__属于__tense",
      source: "past_perfect",
      target: "tense",
      label: "属于",
    },
    {
      id: "past_perfect_continuous__属于__tense",
      source: "past_perfect_continuous",
      target: "tense",
      label: "属于",
    },
    {
      id: "future_simple__属于__tense",
      source: "future_simple",
      target: "tense",
      label: "属于",
    },
    {
      id: "future_continuous__属于__tense",
      source: "future_continuous",
      target: "tense",
      label: "属于",
    },
    {
      id: "future_perfect__属于__tense",
      source: "future_perfect",
      target: "tense",
      label: "属于",
    },
    {
      id: "past_future__属于__tense",
      source: "past_future",
      target: "tense",
      label: "属于",
    },
    {
      id: "present_simple__对比__present_continuous",
      source: "present_simple",
      target: "present_continuous",
      label: "对比",
      directed: false,
    },
    {
      id: "present_perfect__对比__past_simple",
      source: "present_perfect",
      target: "past_simple",
      label: "对比",
      directed: false,
    },
    {
      id: "auxiliary_verb__实现__tense",
      source: "auxiliary_verb",
      target: "tense",
      label: "实现",
    },

    // ─── 谓语 → 语态 ──────────────────────────────
    {
      id: "predicate__承载__voice",
      source: "predicate",
      target: "voice",
      label: "承载",
    },
    {
      id: "voice__分为__active_voice",
      source: "voice",
      target: "active_voice",
      label: "分为",
    },
    {
      id: "voice__分为__passive_voice",
      source: "voice",
      target: "passive_voice",
      label: "分为",
    },
    {
      id: "active_voice__对比__passive_voice",
      source: "active_voice",
      target: "passive_voice",
      label: "对比",
      directed: false,
    },
    {
      id: "passive_voice__依赖__auxiliary_verb",
      source: "passive_voice",
      target: "auxiliary_verb",
      label: "依赖",
    },
    {
      id: "passive_voice__使用__past_participle",
      source: "passive_voice",
      target: "past_participle",
      label: "使用",
    },

    // ─── 谓语 → 语气 ──────────────────────────────
    {
      id: "predicate__承载__mood",
      source: "predicate",
      target: "mood",
      label: "承载",
    },
    {
      id: "mood__分为__indicative_mood",
      source: "mood",
      target: "indicative_mood",
      label: "分为",
    },
    {
      id: "mood__分为__imperative_mood",
      source: "mood",
      target: "imperative_mood",
      label: "分为",
    },
    {
      id: "mood__分为__subjunctive_mood",
      source: "mood",
      target: "subjunctive_mood",
      label: "分为",
    },
    {
      id: "subjunctive_mood__使用__past_participle",
      source: "subjunctive_mood",
      target: "past_participle",
      label: "使用",
    },

    // ─── 谓语实现机制 ──────────────────────────────
    {
      id: "predicate__靠...实现__auxiliary_verb",
      source: "predicate",
      target: "auxiliary_verb",
      label: "靠...实现",
    },
    {
      id: "predicate__靠...实现__modal_verb",
      source: "predicate",
      target: "modal_verb",
      label: "靠...实现",
    },
    {
      id: "modal_verb__表达__mood",
      source: "modal_verb",
      target: "mood",
      label: "表达",
    },
    {
      id: "linking_verb__连接__predicative",
      source: "linking_verb",
      target: "predicative",
      label: "连接",
    },
    {
      id: "predicate__受约束于__subject_verb_agreement",
      source: "predicate",
      target: "subject_verb_agreement",
      label: "受约束于",
    },
    {
      id: "subject__影响__subject_verb_agreement",
      source: "subject",
      target: "subject_verb_agreement",
      label: "影响",
    },
    {
      id: "subject_verb_agreement__体现为__third_person_singular",
      source: "subject_verb_agreement",
      target: "third_person_singular",
      label: "体现为",
    },

    // ─── 谓语 → 非谓语 ────────────────────────────
    {
      id: "predicate__卸任变为__non_finite_verb",
      source: "predicate",
      target: "non_finite_verb",
      label: "卸任变为",
    },
    {
      id: "finite_verb__对比__non_finite_verb",
      source: "finite_verb",
      target: "non_finite_verb",
      label: "对比",
      directed: false,
    },
    {
      id: "non_finite_verb__包含__infinitive",
      source: "non_finite_verb",
      target: "infinitive",
      label: "包含",
    },
    {
      id: "non_finite_verb__包含__gerund",
      source: "non_finite_verb",
      target: "gerund",
      label: "包含",
    },
    {
      id: "non_finite_verb__包含__present_participle",
      source: "non_finite_verb",
      target: "present_participle",
      label: "包含",
    },
    {
      id: "non_finite_verb__包含__past_participle",
      source: "non_finite_verb",
      target: "past_participle",
      label: "包含",
    },
    {
      id: "verb__变形为__gerund",
      source: "verb",
      target: "gerund",
      label: "变形为",
    },
    {
      id: "verb__变形为__present_participle",
      source: "verb",
      target: "present_participle",
      label: "变形为",
    },
    {
      id: "verb__变形为__past_participle",
      source: "verb",
      target: "past_participle",
      label: "变形为",
    },
    {
      id: "verb__变形为__infinitive",
      source: "verb",
      target: "infinitive",
      label: "变形为",
    },
    {
      id: "gerund__充当__subject",
      source: "gerund",
      target: "subject",
      label: "充当",
    },
    {
      id: "gerund__充当__object",
      source: "gerund",
      target: "object",
      label: "充当",
    },
    {
      id: "gerund__对比__infinitive",
      source: "gerund",
      target: "infinitive",
      label: "对比",
      directed: false,
    },
    {
      id: "present_participle__修饰__noun",
      source: "present_participle",
      target: "noun",
      label: "修饰",
    },
    {
      id: "past_participle__修饰__noun",
      source: "past_participle",
      target: "noun",
      label: "修饰",
    },
    {
      id: "past_participle__构成__passive_voice",
      source: "past_participle",
      target: "passive_voice",
      label: "构成",
    },

    // ─── 句子种类与从句 ────────────────────────────
    {
      id: "simple_sentence__包含__predicate",
      source: "simple_sentence",
      target: "predicate",
      label: "包含",
    },
    {
      id: "simple_sentence__扩展为__compound_sentence",
      source: "simple_sentence",
      target: "compound_sentence",
      label: "扩展为",
    },
    {
      id: "simple_sentence__扩展为__complex_sentence",
      source: "simple_sentence",
      target: "complex_sentence",
      label: "扩展为",
    },
    {
      id: "complex_sentence__包含__clause",
      source: "complex_sentence",
      target: "clause",
      label: "包含",
    },
    {
      id: "compound_sentence__依赖__coordinating_conjunction",
      source: "compound_sentence",
      target: "coordinating_conjunction",
      label: "依赖",
    },
    {
      id: "clause__分为__noun_clause",
      source: "clause",
      target: "noun_clause",
      label: "分为",
    },
    {
      id: "clause__分为__relative_clause",
      source: "clause",
      target: "relative_clause",
      label: "分为",
    },
    {
      id: "clause__分为__adverbial_clause",
      source: "clause",
      target: "adverbial_clause",
      label: "分为",
    },
    {
      id: "noun_clause__包含__subject_clause",
      source: "noun_clause",
      target: "subject_clause",
      label: "包含",
    },
    {
      id: "noun_clause__包含__object_clause",
      source: "noun_clause",
      target: "object_clause",
      label: "包含",
    },
    {
      id: "noun_clause__包含__predicative_clause",
      source: "noun_clause",
      target: "predicative_clause",
      label: "包含",
    },
    {
      id: "noun_clause__包含__appositive_clause",
      source: "noun_clause",
      target: "appositive_clause",
      label: "包含",
    },
    {
      id: "relative_pronoun__引导__relative_clause",
      source: "relative_pronoun",
      target: "relative_clause",
      label: "引导",
    },
    {
      id: "relative_adverb__引导__relative_clause",
      source: "relative_adverb",
      target: "relative_clause",
      label: "引导",
    },
    {
      id: "relative_clause__修饰__noun",
      source: "relative_clause",
      target: "noun",
      label: "修饰",
    },
    {
      id: "subordinating_conjunction__引导__adverbial_clause",
      source: "subordinating_conjunction",
      target: "adverbial_clause",
      label: "引导",
    },
    {
      id: "subordinating_conjunction__引导__noun_clause",
      source: "subordinating_conjunction",
      target: "noun_clause",
      label: "引导",
    },
    {
      id: "adverbial_clause__充当__adverbial",
      source: "adverbial_clause",
      target: "adverbial",
      label: "充当",
    },
    {
      id: "object_clause__充当__object",
      source: "object_clause",
      target: "object",
      label: "充当",
    },
    {
      id: "conjunction__分为__coordinating_conjunction",
      source: "conjunction",
      target: "coordinating_conjunction",
      label: "分为",
    },
    {
      id: "conjunction__分为__subordinating_conjunction",
      source: "conjunction",
      target: "subordinating_conjunction",
      label: "分为",
    },
    {
      id: "predicate__每从句各有一个__clause",
      source: "predicate",
      target: "clause",
      label: "每从句各有一个",
    },

    // ─── 词类 → 句子成分 ──────────────────────────
    {
      id: "noun__充当__subject",
      source: "noun",
      target: "subject",
      label: "充当",
    },
    {
      id: "noun__充当__object",
      source: "noun",
      target: "object",
      label: "充当",
    },
    {
      id: "pronoun__充当__subject",
      source: "pronoun",
      target: "subject",
      label: "充当",
    },
    {
      id: "adjective__修饰__noun",
      source: "adjective",
      target: "noun",
      label: "修饰",
    },
    {
      id: "adjective__充当__attributive",
      source: "adjective",
      target: "attributive",
      label: "充当",
    },
    {
      id: "adjective__充当__predicative",
      source: "adjective",
      target: "predicative",
      label: "充当",
    },
    {
      id: "relative_clause__充当__attributive",
      source: "relative_clause",
      target: "attributive",
      label: "充当",
    },
    {
      id: "attributive__修饰__noun",
      source: "attributive",
      target: "noun",
      label: "修饰",
    },
    {
      id: "adverb__修饰__verb",
      source: "adverb",
      target: "verb",
      label: "修饰",
    },
    {
      id: "numeral__修饰__noun",
      source: "numeral",
      target: "noun",
      label: "修饰",
    },
    {
      id: "preposition__充当__adverbial",
      source: "preposition",
      target: "adverbial",
      label: "充当",
    },
    {
      id: "interjection__独立成句__simple_sentence",
      source: "interjection",
      target: "simple_sentence",
      label: "独立成句",
    },
    {
      id: "relative_pronoun__属于__pronoun",
      source: "relative_pronoun",
      target: "pronoun",
      label: "属于",
    },

    // ─── 名词相关规则 ──────────────────────────────
    {
      id: "noun__具有__countability",
      source: "noun",
      target: "countability",
      label: "具有",
    },
    {
      id: "countability__决定__article_usage",
      source: "countability",
      target: "article_usage",
      label: "决定",
    },
    {
      id: "countability__决定__plural_form",
      source: "countability",
      target: "plural_form",
      label: "决定",
    },
    {
      id: "adjective__有__comparative_superlative",
      source: "adjective",
      target: "comparative_superlative",
      label: "有",
    },
    {
      id: "adverb__有__comparative_superlative",
      source: "adverb",
      target: "comparative_superlative",
      label: "有",
    },
    {
      id: "article__遵循__article_usage",
      source: "article",
      target: "article_usage",
      label: "遵循",
    },
  ],
};

// ============================================================
// 英语语法图类型 → 色系映射（冷色「水墨」系）
//   区别于 AI 暖色系、PM 紫绿系
//   sentence_element 深蓝（核心支柱）
//   part_of_speech   青绿
//   structure        靛紫
//   tense            钢蓝
//   rule             灰蓝
//   concept          蓝灰
// ============================================================
const grammarTypeStyles: Record<string, NodeTypeStyle> = {
  sentence_element: {
    base: "#3d7ebf",
    glow: "rgba(61, 126, 191, 0.30)",
    label: "句子成分",
  },
  part_of_speech: {
    base: "#3fa889",
    glow: "rgba(63, 168, 137, 0.30)",
    label: "词类",
  },
  structure: {
    base: "#6b5fb5",
    glow: "rgba(107, 95, 181, 0.30)",
    label: "结构",
  },
  tense: {
    base: "#4a87b8",
    glow: "rgba(74, 135, 184, 0.30)",
    label: "时态",
  },
  rule: {
    base: "#5c7d9e",
    glow: "rgba(92, 125, 158, 0.30)",
    label: "规则",
  },
  concept: {
    base: "#7a8fa8",
    glow: "rgba(122, 143, 168, 0.30)",
    label: "概念",
  },
};

const grammarTypeOrder: string[] = [
  "sentence_element",
  "part_of_speech",
  "structure",
  "tense",
  "rule",
  "concept",
];

export const grammarMap: KnowledgeMap = {
  id: "grammar",
  label: "英语语法",
  subtitle: "英语语法知识图谱",
  data: grammarGraphData,
  typeStyles: grammarTypeStyles,
  typeOrder: grammarTypeOrder,
  preferredSeed: "predicate",
  group: "interest",
};
