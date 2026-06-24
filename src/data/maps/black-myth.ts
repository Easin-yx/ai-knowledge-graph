import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// 《黑神话：悟空》双视角产品知识图谱
//
// 节点命名约定：label 用中文，zh_label 放英文术语/别名
// 双视角：details = C 端（玩家 / 游戏 PM 视角）；
//         details.backstage = B 端（中后台 / 数值·配置·数据 PM 视角，卡片翻面展示）
// 来源：产品系统拆解（双视角映射版），见 docs/build-notes/black-myth.md
// ============================================================

const BM_SOURCE = {
  type: "doc" as const,
  title: "《黑神话：悟空》产品系统拆解（双视角映射版）",
};

// ============================================================
// 可考证的外部来源：仅用于「关于游戏本身的事实性节点」（游戏类型、
// 发售节点、具体战斗/经济机制）。所有链接均已联网核实。
// 偏「产品拆解 / 中后台推断」的分析性节点继续沿用 BM_SOURCE，不强配外链。
// ============================================================
const SRC_OFFICIAL = {
  type: "doc" as const,
  title: "《黑神话：悟空》官方网站 · 游戏科学",
  url: "https://www.heishenhua.com",
};
const SRC_WIKI = {
  type: "doc" as const,
  title: "维基百科：Black Myth: Wukong",
  url: "https://en.wikipedia.org/wiki/Black_Myth:_Wukong",
};
const SRC_G8_COMBAT = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Combat Explained",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/467980",
};
const SRC_G8_STANCES = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · All Staff Stances（Focus Points）",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/468359",
};
const SRC_G8_SPARKS = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · How to Get More Sparks",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/468564",
};
const SRC_G8_RESPEC = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · How to Respec Abilities and Spells",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/468609",
};

const blackMythGraphData: GraphData = {
  nodes: [
    // ─── 根节点 ──────────────────────────────────────────────
    {
      id: "black_myth_wukong",
      label: "黑神话悟空",
      type: "overview",
      details: {
        zh_label: "Black Myth: Wukong",
        summary:
          "以《西游记》为母题的国产 3A 动作角色扮演游戏（ARPG），箱庭式关卡 + 硬核战斗，单机买断制。",
        analogy: "像把『魂系硬核战斗』装进一座『西游记主题乐园』里，让你边打边逛。",
        notes:
          "本图谱的根节点：向下展开五大模块——定位与大盘策略、核心玩法循环、双轨制经济与成长、战斗数值与机制、UI 交互与视觉。每个 C 端节点都可翻面查看其背后的 B 端中后台支撑。",
        key_concepts: ["3A ARPG", "西游IP", "箱庭关卡", "单机买断"],
        source: SRC_OFFICIAL,
        backstage: {
          summary:
            "一款单机大作的中后台底座：销量数据、本地化、行为埋点、数值配置、资产管线共同支撑研发与发行。",
          notes:
            "中后台 PM 视角：C 端每一处『爽点』，背后都有数据 / 配置 / 工具链在支撑。整张图右侧的『中后台能力网』就是这些支撑系统。说明：图中具体的 B 端工具形态属基于通用游戏中后台经验的合理推断，非官方披露。",
          key_concepts: ["数据底座", "研发工具链", "全球发行"],
        },
      },
    },

    // ─── ① 定位与大盘策略 ─────────────────────────────────────
    {
      id: "category_positioning",
      label: "品类定位",
      type: "strategy",
      details: {
        zh_label: "Category Positioning",
        summary:
          "3D 动作角色扮演（ARPG）+ 箱庭式关卡设计：在有限但精心编排的空间里塞满探索与战斗密度。",
        analogy: "像一座设计精巧的盆景，不求大而全，但每一处转角都有讲究。",
        notes:
          "箱庭（hakoniwa）关卡相比开放世界更可控：体验节奏、难度曲线、叙事顺序都能被设计者牢牢把握。",
        key_concepts: ["ARPG", "箱庭关卡", "体验密度", "难度曲线"],
        source: SRC_WIKI,
        backstage: {
          summary:
            "品类定位决定了关卡编辑器、资源加载策略与性能预算——中后台需要为『高密度箱庭』而非『超大开放世界』做工具取舍。",
          key_concepts: ["关卡编辑器", "性能预算", "资源加载"],
        },
      },
    },
    {
      id: "target_users",
      label: "目标用户",
      type: "strategy",
      details: {
        zh_label: "Target Users",
        summary:
          "硬核动作玩家（追求挑战与操作上限）+ 泛西游 IP 受众（追求视听体验与文化沉浸）的双层用户结构。",
        analogy: "一桌菜既要让老饕吃出火候，也要让路人觉得色香味俱全。",
        notes:
          "双层用户带来核心张力：难度要满足硬核，又不能劝退泛用户——后续的『死亡零惩罚』『动态难度』等设计都是为调和这对矛盾。",
        key_concepts: ["硬核玩家", "泛IP受众", "用户分层", "体验调和"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "用户分层需要数据支撑：靠用户数据大屏识别不同人群的留存、流失与付费/口碑表现，反哺难度与营销决策。",
          notes:
            "中后台要能区分『硬核』与『泛用户』的行为画像，而不是只看一个总留存数字。",
          key_concepts: ["用户画像", "留存分层", "数据驱动"],
        },
      },
    },
    {
      id: "marketing_milestones",
      label: "营销节点(820)",
      type: "strategy",
      details: {
        zh_label: "Marketing Milestones",
        summary:
          "以『8·20 定期实机汇报』等节点，用最小可行性切片（MVP）做公开市场验证与期待值管理。",
        analogy: "像连载更新：每隔一段放出一段实机，吊住胃口又收集反馈。",
        notes:
          "把营销节奏产品化：每次实机演示都是一次 MVP，既验证市场反应，又持续校准玩家期待，降低发售时的预期落差。",
        key_concepts: ["MVP验证", "期待值管理", "实机演示", "营销节奏"],
        source: SRC_WIKI,
        backstage: {
          summary:
            "营销节点依赖数据大屏看播放/转化/舆情，依赖本地化协作平台保障多语言物料同步发布。",
          notes:
            "每次实机汇报的多语言字幕、宣传页、商店文案都要走本地化管线，节点越密对协作工具要求越高。",
          key_concepts: ["舆情监测", "转化漏斗", "多语言物料"],
        },
      },
    },

    // ─── ② 核心玩法循环 ───────────────────────────────────────
    {
      id: "core_gameplay_loop",
      label: "核心玩法循环",
      type: "gameplay",
      details: {
        zh_label: "Core Gameplay Loop",
        summary:
          "探索 → 养成 → 挑战 → 奖励 的闭环，驱动玩家一圈圈推进，是游戏的『心跳』。",
        analogy: "像健身的正反馈：练（探索养成）→ 挑战极限 → 看到进步 → 更想练。",
        notes:
          "好的核心循环让每一圈都比上一圈更有掌控感；任何一环断裂（如奖励不足）都会导致退坑。",
        key_concepts: ["闭环驱动", "正反馈", "心流", "推进感"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "循环的健康度要靠行为埋点中台度量：各环节的停留、转化、流失节点，是策划调优的依据。",
          notes:
            "中后台 PM 关心的是：循环在哪一环最容易断？哪个 Boss 导致退坑率最高？这些都需要全链路埋点。",
          key_concepts: ["全链路埋点", "漏斗分析", "流失定位"],
        },
      },
    },
    {
      id: "loop_explore",
      label: "探索",
      type: "gameplay",
      details: {
        zh_label: "Explore",
        summary: "跑图、收集资源、寻找隐藏要素，是循环的『输入』环节。",
        analogy: "像逛一座藏满彩蛋的园林，越好奇收获越多。",
        notes: "探索负责补充养成资源与世界观沉浸，密度与引导是关键。",
        key_concepts: ["跑图", "资源收集", "隐藏要素"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "探索区域需要埋点记录玩家路径与停留热区，辅助判断哪些隐藏内容被忽略、哪些区域引导不足。",
          key_concepts: ["路径热区", "内容触达率"],
        },
      },
    },
    {
      id: "loop_progress",
      label: "养成",
      type: "gameplay",
      details: {
        zh_label: "Progress",
        summary: "升级属性、点技能树、打造装备与法宝，把资源转化为变强的实感。",
        analogy: "像把存款换成装备，每一笔投入都看得见回报。",
        notes: "养成是连接探索（获取）与挑战（消耗）的中枢，决定成长曲线手感。",
        key_concepts: ["升级", "技能树", "装备打造", "成长曲线"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "养成深度依赖数值配置后台：经验曲线、属性成长、打造消耗都由配置表驱动，策划需无代码调参。",
          key_concepts: ["成长曲线配置", "属性表", "无代码调参"],
        },
      },
    },
    {
      id: "loop_combat",
      label: "挑战(心流)",
      type: "gameplay",
      details: {
        zh_label: "Combat / Flow",
        summary:
          "遭遇 Boss，背板、闪避、输出，体验核心心流——游戏最高浓度的情绪体验。",
        analogy: "像攀岩到难点：紧张、专注、突破后的狂喜，全在这一段。",
        notes: "挑战是循环的高潮，难度设计必须卡在『焦虑』与『无聊』之间的心流通道。",
        key_concepts: ["Boss战", "背板", "心流通道", "情绪高潮"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "挑战环节是流失重灾区，需要行为埋点 + 战斗热力图定位『哪个 Boss 卡退最多玩家』，供平衡性调整。",
          notes: "中后台据此判断是否削弱某 Boss、或在前置增加资源补给。",
          key_concepts: ["退坑率", "Boss难度热区", "平衡调优"],
        },
      },
    },
    {
      id: "loop_reward",
      label: "奖励",
      type: "gameplay",
      details: {
        zh_label: "Reward",
        summary:
          "获得成就感、新法术 / 变身（化身），推动玩家进入下一循环。",
        analogy: "像通关一道菜解锁新食材，立刻想试试能做出什么新花样。",
        notes: "奖励要兼顾即时反馈（成就感）与长期目标（新能力），维持推进动力。",
        key_concepts: ["成就感", "新能力解锁", "化身", "循环驱动"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "奖励产出（掉落、解锁节奏）由配置后台控制，需与经济系统联动防止通货膨胀或断档。",
          key_concepts: ["掉落配置", "解锁节奏", "产出平衡"],
        },
      },
    },

    // ─── ③ 双轨制经济与成长 ───────────────────────────────────
    {
      id: "dual_track_economy",
      label: "双轨制经济",
      type: "economy",
      details: {
        zh_label: "Dual-Track Economy",
        summary:
          "金币（灵蕴）与技能经验（灵光点）双轨并行、彼此解耦，分别管理消耗与成长。",
        analogy: "像把『钱包』和『经验值』分开记账，互不干扰各管一摊。",
        notes:
          "解耦的目的：降低玩家决策瘫痪——不用在『升级』和『买东西』之间纠结同一种资源。",
        key_concepts: ["双轨经济", "资源解耦", "决策减负"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "双轨经济的平衡靠数值配置后台 + 防通胀测算工具：两条曲线都要可配置、可校验、可版本控制。",
          notes:
            "中后台需要自动测算两种资源的产出/消耗是否健康，避免任一轨道通胀或枯竭。",
          key_concepts: ["经济曲线", "产消平衡", "防通胀"],
        },
      },
    },
    {
      id: "lingyun_currency",
      label: "灵蕴(金币)",
      type: "economy",
      details: {
        zh_label: "Lingyun / Currency",
        summary:
          "通用货币，用于购买消耗品、打造与升级装备，是经济系统的『流动性』。",
        analogy: "就是游戏里的钱，赚来花出去，维持装备运转。",
        notes:
          "通过『打破罐子』等微反馈填补跑图空白，让金币获取本身也成为一种轻奖励。",
        key_concepts: ["通用货币", "消耗品", "装备打造", "微反馈"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "金币的掉落率、商店定价、打造消耗全在配置后台；防通胀工具持续监测金币是否过剩。",
          key_concepts: ["掉落概率", "定价配置", "通胀监测"],
        },
      },
    },
    {
      id: "death_no_penalty",
      label: "死亡零惩罚",
      type: "economy",
      details: {
        zh_label: "No Death Penalty",
        summary:
          "死亡不掉落金币，作为保底机制降低泛玩家的挫败感，鼓励反复尝试。",
        analogy: "像练习模式：摔倒了不扣分，只管再来一次。",
        notes:
          "对比魂系『死亡掉魂』，黑神话弱化惩罚以照顾泛用户——呼应双层用户的体验调和。",
        key_concepts: ["零惩罚", "保底机制", "降挫败", "鼓励试错"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "零惩罚意味着死亡不影响经济曲线，中后台测算更简单，但需埋点确认它是否真的降低了退坑率。",
          key_concepts: ["挫败感度量", "重试率", "经济稳定"],
        },
      },
    },
    {
      id: "lingguang_points",
      label: "灵光点(技能经验)",
      type: "economy",
      details: {
        zh_label: "Lingguang Points",
        summary:
          "技能经验货币，用于点技能树；与金币解耦，支持无代价洗点、鼓励低成本试错。",
        analogy: "像专门的『学习积分』，只能拿来学技能，不能买东西。",
        notes:
          "获取双路径：战斗保底（打怪积累，时间换容错）+ 探索惊喜（打坐蒲团一次性买断）。",
        key_concepts: ["技能经验", "技能树", "解耦设计", "低成本试错"],
        source: SRC_G8_SPARKS,
        backstage: {
          summary:
            "灵光点的产出曲线、技能成本由配置后台管理；洗点机制需后台保证数据一致性与可回滚。",
          notes: "无代价洗点对中后台意味着：技能配置改动后，存量玩家的重置体验要平滑。",
          key_concepts: ["经验曲线", "技能成本表", "洗点一致性"],
        },
      },
    },
    {
      id: "meditation_cushion",
      label: "打坐蒲团",
      type: "economy",
      details: {
        zh_label: "Meditation Cushion",
        summary:
          "探索中发现的一次性灵光点奖励点，提供可主动歇脚的休整点以调节战斗节奏，奖励买断（防刷防通胀）。",
        analogy: "像景区里的观景台：走累了坐下歇口气，顺便领个纪念章。",
        notes:
          "一次性买断设计避免玩家反复刷取，既给探索正反馈，又不破坏经验经济的平衡。",
        key_concepts: ["一次性奖励", "心流调节", "防刷", "探索惊喜"],
        source: SRC_G8_SPARKS,
        backstage: {
          summary:
            "蒲团的位置与发放标记需配置 + 埋点：确认它是否真的被发现、是否有效调节了战斗节奏。",
          key_concepts: ["发放标记", "触达率", "节奏调节"],
        },
      },
    },
    {
      id: "free_respec",
      label: "无代价洗点",
      type: "economy",
      details: {
        zh_label: "Free Respec",
        summary:
          "免费重置技能加点，鼓励玩家自由尝试不同流派，降低构筑（build）门槛。",
        analogy: "像可以无限次重置的拼图，随时拆了重拼不心疼。",
        notes:
          "洗点无代价 = 把技能树从『一次性决策』变成『可探索的玩法空间』，提升构筑乐趣。",
        key_concepts: ["免费重置", "流派试错", "构筑自由", "降门槛"],
        source: SRC_G8_RESPEC,
        backstage: {
          summary:
            "洗点频率是流派偏好的天然埋点：哪些技能常被弃用、哪些组合最热门，反哺平衡性调整。",
          key_concepts: ["流派偏好", "技能弃用率", "平衡反馈"],
        },
      },
    },

    // ─── ④ 战斗数值与机制 ─────────────────────────────────────
    {
      id: "combat_system",
      label: "战斗系统",
      type: "combat",
      details: {
        zh_label: "Combat System",
        summary:
          "由基础资源槽、特色资源与核心博弈机制共同构成的战斗体系，是硬核体验的载体。",
        analogy: "像一套乐器组合：各资源是不同声部，配合好了才成曲。",
        notes:
          "战斗系统的深度来自『资源管理 + 风险博弈』：何时攻、何时守、何时赌一把识破。",
        key_concepts: ["资源管理", "风险博弈", "战斗深度", "操作上限"],
        source: SRC_G8_COMBAT,
        backstage: {
          summary:
            "战斗体系的平衡靠战斗平衡测试工具（DPS 模拟）+ 行为热力图，确保各流派强度与难度合理。",
          notes: "中后台关心：是否存在一招鲜的逃课流派？某机制成功率是否过低导致体验崩塌？",
          key_concepts: ["DPS模拟", "流派强度", "机制成功率"],
        },
      },
    },
    {
      id: "base_resource_gauges",
      label: "基础资源槽(HP/SP/MP)",
      type: "combat",
      details: {
        zh_label: "HP / SP / MP",
        summary:
          "HP 控制容错空间、SP（气力）作动作节流阀控制呼吸感、MP 锁高收益法术的频率。",
        analogy: "HP 是血条，SP 是体力条，MP 是魔法槽——各管一种『花费』。",
        notes:
          "三槽是战斗的『成本中心』：SP 控制连招节奏与回合感，MP 限制逃课法术滥用。",
        key_concepts: ["HP容错", "SP节流", "MP限频", "回合节奏"],
        source: SRC_G8_COMBAT,
        backstage: {
          summary:
            "三槽的回复速率、消耗系数全在配置后台；平衡工具据此模拟不同打法的可持续性。",
          key_concepts: ["回复速率", "消耗系数", "可持续性测算"],
        },
      },
    },
    {
      id: "gunshi_meter",
      label: "棍势值",
      type: "combat",
      details: {
        zh_label: "Gunshi (Focus)",
        summary:
          "积攒-释放（Build-up & Payoff）的特色资源，是棍法重击爽感的核心来源。",
        analogy: "像蓄力的弹弓：拉得越满，放出去越爽。",
        notes:
          "棍势的『攒』与『放』构成情绪节奏：忍住积攒的张力，换取一次重击的释放快感。",
        key_concepts: ["蓄力释放", "棍法重击", "爽感曲线", "情绪节奏"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "棍势积攒速率与重击伤害是平衡敏感参数，需 DPS 工具反复测算，避免破坏战斗节奏。",
          key_concepts: ["积攒速率", "重击伤害", "节奏平衡"],
        },
      },
    },
    {
      id: "resolute_strike",
      label: "识破",
      type: "combat",
      details: {
        zh_label: "Resolute Strike",
        summary:
          "高风险高回报的核心博弈机制：以攻代守，抓住敌人攻击的破绽反击，把被动躲避变成主动压制。",
        analogy: "像拳击的迎击反击：算准了对方出拳的瞬间打回去，赌赢收益巨大。",
        notes:
          "作为隐性动态难度调节器：高手用识破压制 Boss，新手也能靠常规闪避过关，拉开操作上限。",
        key_concepts: ["以攻代守", "风险博弈", "动态难度", "操作上限"],
        source: SRC_G8_COMBAT,
        backstage: {
          summary:
            "识破成功率是关键体验指标，可借助（推断的）遥测/热力图统计成功率分布，判断判定窗口是否过严/过松。",
          notes:
            "中后台据此（在补丁中）调整判定窗口，平衡『硬核成就感』与『泛用户可达性』。注：单机买断游戏的此类数据依赖玩家遥测授权，相关工具为合理推断。",
          key_concepts: ["识破成功率", "判定窗口", "动态难度调参"],
        },
      },
    },
    {
      id: "modular_gourd",
      label: "模块化葫芦",
      type: "combat",
      details: {
        zh_label: "Modular Gourd",
        summary:
          "回血机制的三层模块化设计：容器层（次数）、逻辑层（酒品回复策略）、插件层（泡酒物针对性解法）。",
        analogy: "像可 DIY 的水壶：换壶身、换饮料、加添加剂，组合出不同回复效果。",
        notes:
          "战前极简策略配置：把复杂的回复策略前置到准备阶段，战斗中保持操作简洁。（注：『容器/逻辑/插件』三层是产品视角的抽象拆解，非游戏官方术语。）",
        key_concepts: ["模块化", "容器/逻辑/插件", "战前配置", "策略深度"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "三层模块意味着大量可配置组合，配置后台需管理葫芦/酒/泡酒物的属性矩阵与解锁条件。",
          key_concepts: ["属性矩阵", "组合配置", "解锁条件"],
        },
      },
    },

    // ─── ⑤ UI 交互与视觉体验 ──────────────────────────────────
    {
      id: "ux_ui_design",
      label: "UI交互与视觉",
      type: "ux",
      details: {
        zh_label: "UX / UI Design",
        summary:
          "以『让位给美术与动作』为原则的交互设计：极简 HUD、文化感菜单、重度拟物的微反馈。",
        analogy: "像高级餐厅：餐具低调到几乎隐形，只为让你专注于菜本身。",
        notes:
          "UI 的克制是一种设计主张：降低认知负荷，把注意力完全交给视听与战斗体验。",
        key_concepts: ["极简主义", "降认知负荷", "文化感", "拟物反馈"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "高品质视觉与拟物反馈依赖美术资产管理管线：几百人协同的模型、动捕、UI 切图都要可控流转。",
          notes: "中后台 PM 关心的是：UI 资产能否高效迭代而不拖慢百人团队的协作。",
          key_concepts: ["资产管线", "协同迭代", "版本控制"],
        },
      },
    },
    {
      id: "combat_hud",
      label: "战斗HUD",
      type: "ux",
      details: {
        zh_label: "Combat HUD",
        summary:
          "极简主义、动态隐藏的战斗信息层，降低认知负荷，把视线完全让渡给美术与动作。",
        analogy: "像赛车仪表：平时低调，关键时刻才高亮提示。",
        notes:
          "动态隐藏让非战斗时画面更干净，战斗时只呈现最必要的资源与状态信息。",
        key_concepts: ["极简HUD", "动态隐藏", "信息层级", "降负荷"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "HUD 元素是高频迭代的 UI 资产，需走资产管线统一管理切图、布局与多分辨率适配。",
          key_concepts: ["UI切图", "多分辨率适配", "迭代管线"],
        },
      },
    },
    {
      id: "system_menu",
      label: "系统菜单",
      type: "ux",
      details: {
        zh_label: "System Menu",
        summary:
          "视觉重心反转（美术资产展示 > 数值罗列），把文化感与沉浸放在菜单中心。",
        analogy: "像精品图鉴：先看精美插画，数值只是配角。",
        notes:
          "用『展示驱动』替代『表格驱动』，让查阅菜单本身也成为世界观沉浸的一部分。",
        key_concepts: ["视觉重心反转", "展示驱动", "文化沉浸"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "菜单大量调用高精度美术资产（人物/法宝图鉴），对资产管线的检索与加载性能要求高。",
          key_concepts: ["高精资产调用", "标签检索", "加载性能"],
        },
      },
    },
    {
      id: "micro_feedback",
      label: "微反馈交互",
      type: "ux",
      details: {
        zh_label: "Micro-feedback",
        summary:
          "重度拟物化的微反馈（水墨、星宿点亮、物理音效），建立世界观的重量感与一致性。",
        analogy: "像翻一本质感厚重的古书：每一页的触感与声音都在强化沉浸。",
        notes:
          "微反馈是世界观的『毛细血管』：细节的一致性决定了整体的真实感与高级感。",
        key_concepts: ["拟物化", "水墨/星宿", "物理音效", "一致性"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "海量微反馈素材（特效、音效、动画）需资产管线统一管理与批量导出，保证风格一致。",
          key_concepts: ["特效音效库", "批量导出", "风格一致性"],
        },
      },
    },

    // ─── ⑥ 中后台能力网（B 端独立节点）───────────────────────
    {
      id: "data_dashboard",
      label: "用户数据大屏",
      type: "platform",
      details: {
        zh_label: "Data Dashboard",
        summary:
          "跨平台销量漏斗、用户留存与活跃大盘的可视化平台，是发行与运营决策的眼睛。",
        analogy: "像驾驶舱仪表盘：所有关键指标一屏掌握。",
        notes:
          "中后台 PM 视角的核心节点：把分散的销量、留存、活跃、舆情汇成统一看板，支撑分层决策。",
        key_concepts: ["销量漏斗", "留存大盘", "跨平台", "决策看板"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：目标用户分层（识别硬核/泛用户）与营销节点（看播放转化与舆情）。",
          key_concepts: ["支撑：目标用户", "支撑：营销节点"],
        },
      },
    },
    {
      id: "localization_platform",
      label: "本地化协作平台",
      type: "platform",
      details: {
        zh_label: "Localization Platform",
        summary:
          "支撑全球多语言发售的文案翻译分发与 UI 文本自适应校验工具。",
        analogy: "像跨国出版社的中央编辑台：一处改动，多语言同步。",
        notes:
          "多语言不只是翻译，还包括 UI 文本长度自适应、术语一致性与版本同步，是全球发行的底座。",
        key_concepts: ["多语言", "翻译分发", "UI自适应", "术语一致"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：营销节点的多语言物料与全量游戏文本的同步发布。",
          key_concepts: ["支撑：营销节点", "全球发行"],
        },
      },
    },
    {
      id: "telemetry_platform",
      label: "行为埋点中台",
      type: "platform",
      details: {
        zh_label: "Telemetry Platform",
        summary:
          "记录玩家在各区域的停留时间与流失节点（如某 Boss 退坑率最高），辅助策划版本调优。",
        analogy: "像游戏世界里的『监控探头』，记录玩家走到哪、卡在哪。",
        notes:
          "关卡与行为埋点中台是循环健康度的度量基础：哪里断、哪里卡、哪里被忽略，一目了然。",
        key_concepts: ["关卡埋点", "停留时长", "流失节点", "版本调优"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：核心玩法循环（漏斗健康度）与挑战环节（Boss 退坑定位）。",
          key_concepts: ["支撑：核心循环", "支撑：挑战"],
        },
      },
    },
    {
      id: "numeric_config_cms",
      label: "数值配置后台(CMS)",
      type: "platform",
      details: {
        zh_label: "Numeric Config CMS",
        summary:
          "让策划无代码修改怪物掉落概率、经验产出曲线的配置工具后台，含版本控制与校验。",
        analogy: "像数值的『后台编辑器』：改参数像填表格，不用动代码。",
        notes:
          "配置后台是经济与成长系统的调参中枢：所有曲线可配置、可校验、可版本回滚。",
        key_concepts: ["无代码配置", "掉落/经验曲线", "版本控制", "数据校验"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：双轨制经济、灵蕴金币、灵光点经验，以及养成与战斗的全部数值。",
          key_concepts: ["支撑：双轨经济", "支撑：成长曲线"],
        },
      },
    },
    {
      id: "anti_inflation_tool",
      label: "防通胀测算工具",
      type: "platform",
      details: {
        zh_label: "Anti-inflation Tool",
        summary:
          "自动测算资源产出/消耗是否健康、防止货币通货膨胀的数据工具。",
        analogy: "像经济学家的『央行模型』，盯着货币别超发也别枯竭。",
        notes:
          "把『经济是否平衡』从拍脑袋变成可测算：模拟玩家行为下的资源净流，提前预警通胀或断档。",
        key_concepts: ["产消测算", "通胀预警", "净流模拟", "经济健康"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：灵蕴金币系统的产出/定价/消耗平衡。",
          key_concepts: ["支撑：灵蕴金币", "经济平衡"],
        },
      },
    },
    {
      id: "combat_balance_tool",
      label: "战斗平衡测试工具",
      type: "platform",
      details: {
        zh_label: "Combat Balance Tool",
        summary:
          "模拟各流派秒伤（DPS）的测算脚本，量化战斗强度差异，辅助平衡调整。",
        analogy: "像新车上市前的风洞测试，先在模型里跑一遍。",
        notes:
          "把『某流派是否过强/过弱』从主观感受变成可量化数据，减少上线后的平衡翻车。",
        key_concepts: ["DPS模拟", "流派强度", "平衡量化", "测试脚本"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：战斗系统、棍势值、识破等机制的强度平衡。",
          key_concepts: ["支撑：战斗系统", "支撑：棍势/识破"],
        },
      },
    },
    {
      id: "combat_heatmap",
      label: "战斗行为热力图",
      type: "platform",
      details: {
        zh_label: "Combat Heatmap",
        summary:
          "记录玩家（基于遥测授权样本）的完美闪避成功率、识破成功率、死亡位置分布的可视化分析。",
        analogy: "像球场的跑动热区图，一眼看出大家都死在哪、躲在哪。",
        notes:
          "热力图把战斗体验空间化：哪里死亡密集、哪个机制成功率异常，都成为调优的精确坐标。",
        key_concepts: ["成功率统计", "死亡分布", "空间化分析", "调优坐标"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：挑战（Boss 难度定位）与识破机制（判定窗口校准）。",
          key_concepts: ["支撑：挑战", "支撑：识破"],
        },
      },
    },
    {
      id: "asset_pipeline",
      label: "美术资产管理管线",
      type: "platform",
      details: {
        zh_label: "Asset Pipeline",
        summary:
          "支撑几百人团队协同调用超高精度 3D 模型、动捕数据、UI 切图的资产流转中台。",
        analogy: "像影视工业的素材中央仓库，调取、版本、导出全程可控。",
        notes:
          "资产管线是 3A 品质的工程底座：版本控制、标签化检索、批量导出，决定百人团队的迭代效率。",
        key_concepts: ["资产流转", "版本控制", "标签检索", "批量导出"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：UI 交互与视觉、系统菜单、微反馈等所有依赖高品质美术资产的体验。",
          key_concepts: ["支撑：UI视觉", "支撑：微反馈"],
        },
      },
    },
  ],

  edges: [
    // ─── 层级边（包含）─────────────────────────────────────
    { id: "black_myth_wukong__包含__category_positioning", source: "black_myth_wukong", target: "category_positioning", label: "包含" },
    { id: "black_myth_wukong__包含__target_users", source: "black_myth_wukong", target: "target_users", label: "包含" },
    { id: "black_myth_wukong__包含__marketing_milestones", source: "black_myth_wukong", target: "marketing_milestones", label: "包含" },
    { id: "black_myth_wukong__包含__core_gameplay_loop", source: "black_myth_wukong", target: "core_gameplay_loop", label: "包含" },
    { id: "black_myth_wukong__包含__dual_track_economy", source: "black_myth_wukong", target: "dual_track_economy", label: "包含" },
    { id: "black_myth_wukong__包含__combat_system", source: "black_myth_wukong", target: "combat_system", label: "包含" },
    { id: "black_myth_wukong__包含__ux_ui_design", source: "black_myth_wukong", target: "ux_ui_design", label: "包含" },

    { id: "core_gameplay_loop__包含__loop_explore", source: "core_gameplay_loop", target: "loop_explore", label: "包含" },
    { id: "core_gameplay_loop__包含__loop_progress", source: "core_gameplay_loop", target: "loop_progress", label: "包含" },
    { id: "core_gameplay_loop__包含__loop_combat", source: "core_gameplay_loop", target: "loop_combat", label: "包含" },
    { id: "core_gameplay_loop__包含__loop_reward", source: "core_gameplay_loop", target: "loop_reward", label: "包含" },

    { id: "dual_track_economy__包含__lingyun_currency", source: "dual_track_economy", target: "lingyun_currency", label: "包含" },
    { id: "dual_track_economy__包含__lingguang_points", source: "dual_track_economy", target: "lingguang_points", label: "包含" },
    { id: "lingyun_currency__包含__death_no_penalty", source: "lingyun_currency", target: "death_no_penalty", label: "包含" },
    { id: "lingguang_points__包含__meditation_cushion", source: "lingguang_points", target: "meditation_cushion", label: "包含" },
    { id: "lingguang_points__包含__free_respec", source: "lingguang_points", target: "free_respec", label: "包含" },

    { id: "combat_system__包含__base_resource_gauges", source: "combat_system", target: "base_resource_gauges", label: "包含" },
    { id: "combat_system__包含__gunshi_meter", source: "combat_system", target: "gunshi_meter", label: "包含" },
    { id: "combat_system__包含__resolute_strike", source: "combat_system", target: "resolute_strike", label: "包含" },
    { id: "combat_system__包含__modular_gourd", source: "combat_system", target: "modular_gourd", label: "包含" },

    { id: "ux_ui_design__包含__combat_hud", source: "ux_ui_design", target: "combat_hud", label: "包含" },
    { id: "ux_ui_design__包含__system_menu", source: "ux_ui_design", target: "system_menu", label: "包含" },
    { id: "ux_ui_design__包含__micro_feedback", source: "ux_ui_design", target: "micro_feedback", label: "包含" },

    // ─── 映射边（支撑，C 端 → B 端中后台）───────────────────
    { id: "target_users__支撑__data_dashboard", source: "target_users", target: "data_dashboard", label: "支撑" },
    { id: "marketing_milestones__支撑__data_dashboard", source: "marketing_milestones", target: "data_dashboard", label: "支撑" },
    { id: "marketing_milestones__支撑__localization_platform", source: "marketing_milestones", target: "localization_platform", label: "支撑" },
    { id: "core_gameplay_loop__支撑__telemetry_platform", source: "core_gameplay_loop", target: "telemetry_platform", label: "支撑" },
    { id: "loop_combat__支撑__telemetry_platform", source: "loop_combat", target: "telemetry_platform", label: "支撑" },
    { id: "dual_track_economy__支撑__numeric_config_cms", source: "dual_track_economy", target: "numeric_config_cms", label: "支撑" },
    { id: "lingyun_currency__支撑__numeric_config_cms", source: "lingyun_currency", target: "numeric_config_cms", label: "支撑" },
    { id: "lingguang_points__支撑__numeric_config_cms", source: "lingguang_points", target: "numeric_config_cms", label: "支撑" },
    { id: "lingyun_currency__支撑__anti_inflation_tool", source: "lingyun_currency", target: "anti_inflation_tool", label: "支撑" },
    { id: "combat_system__支撑__combat_balance_tool", source: "combat_system", target: "combat_balance_tool", label: "支撑" },
    { id: "gunshi_meter__支撑__combat_balance_tool", source: "gunshi_meter", target: "combat_balance_tool", label: "支撑" },
    { id: "resolute_strike__支撑__combat_balance_tool", source: "resolute_strike", target: "combat_balance_tool", label: "支撑" },
    { id: "loop_combat__支撑__combat_heatmap", source: "loop_combat", target: "combat_heatmap", label: "支撑" },
    { id: "resolute_strike__支撑__combat_heatmap", source: "resolute_strike", target: "combat_heatmap", label: "支撑" },
    { id: "modular_gourd__支撑__numeric_config_cms", source: "modular_gourd", target: "numeric_config_cms", label: "支撑" },
    { id: "ux_ui_design__支撑__asset_pipeline", source: "ux_ui_design", target: "asset_pipeline", label: "支撑" },
    { id: "system_menu__支撑__asset_pipeline", source: "system_menu", target: "asset_pipeline", label: "支撑" },
    { id: "micro_feedback__支撑__asset_pipeline", source: "micro_feedback", target: "asset_pipeline", label: "支撑" },
  ],
};

// ============================================================
// 黑神话图类型 → 色系映射（国风水墨暖金，C 端暖色 / B 端冷色对照）
//   overview 金 / strategy 朱红 / gameplay 青 / economy 暖橙
//   combat 赤 / ux 紫 / platform 钢蓝（中后台冷色）
// ============================================================
const blackMythTypeStyles: Record<string, NodeTypeStyle> = {
  overview: {
    base: "#d4a838",
    glow: "rgba(212, 168, 56, 0.32)",
    label: "总览",
  },
  strategy: {
    base: "#c0432f",
    glow: "rgba(192, 67, 47, 0.30)",
    label: "定位策略",
  },
  gameplay: {
    base: "#3fa8a0",
    glow: "rgba(63, 168, 160, 0.30)",
    label: "玩法循环",
  },
  economy: {
    base: "#e08a3c",
    glow: "rgba(224, 138, 60, 0.30)",
    label: "经济成长",
  },
  combat: {
    base: "#d05036",
    glow: "rgba(208, 80, 54, 0.30)",
    label: "战斗机制",
  },
  ux: {
    base: "#9b6dc4",
    glow: "rgba(155, 109, 196, 0.30)",
    label: "UI交互",
  },
  platform: {
    base: "#4a86c4",
    glow: "rgba(74, 134, 196, 0.30)",
    label: "中后台",
  },
};

const blackMythTypeOrder: string[] = [
  "overview",
  "strategy",
  "gameplay",
  "economy",
  "combat",
  "ux",
  "platform",
];

export const blackMythMap: KnowledgeMap = {
  id: "black-myth",
  label: "黑神话悟空",
  subtitle: "双视角产品拆解 · C端体验 × B端中后台",
  data: blackMythGraphData,
  typeStyles: blackMythTypeStyles,
  typeOrder: blackMythTypeOrder,
  preferredSeed: "black_myth_wukong",
  group: "interest",
  domain: "game-dev",
};
