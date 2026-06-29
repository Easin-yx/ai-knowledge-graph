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
const SRC_G8_SPELLS = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · List of All Spells",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/468355",
};
const SRC_G8_RED_TIDES = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Red Tides Transformation",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/470597",
};
const SRC_G8_EBON_FLOW = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Ebon Flow Transformation",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/470601",
};
const SRC_G8_WIND_TAMER = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Wind Tamer Vessel",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/469001",
};
const SRC_G8_WEAVER_NEEDLE = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Weaver's Needle Vessel",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/470870",
};
const SRC_G8_SPIRITS = {
  type: "blog" as const,
  title: "Game8：Black Myth Wukong · Best Spirits to Use",
  url: "https://game8.co/games/Black-Myth-Wukong/archives/469052",
};
const SRC_BWIKI_STAFF = {
  type: "doc" as const,
  title: "BWiki：黑神话悟空 · 棍法",
  url: "https://wiki.biligame.com/wukong/%E6%A3%8D%E6%B3%95",
};
const SRC_BWIKI_SPELL = {
  type: "doc" as const,
  title: "BWiki：黑神话悟空 · 法术",
  url: "https://wiki.biligame.com/wukong/%E6%B3%95%E6%9C%AF",
};
const SRC_BWIKI_TRANSFORMATION = {
  type: "doc" as const,
  title: "BWiki：黑神话悟空 · 变化",
  url: "https://wiki.biligame.com/wukong/%E5%8F%98%E5%8C%96",
};
const SRC_BWIKI_VESSEL = {
  type: "doc" as const,
  title: "BWiki：黑神话悟空 · 法宝",
  url: "https://wiki.biligame.com/wukong/%E6%B3%95%E5%AE%9D",
};
const SRC_MAXROLL_SPELL = {
  type: "blog" as const,
  title: "Maxroll：Black Myth Wukong Spell Guide",
  url: "https://maxroll.gg/black-myth-wukong/guides/black-myth-wukong-spell-guide",
};
const SRC_MAXROLL_SPIRIT = {
  type: "blog" as const,
  title: "Maxroll：Black Myth Wukong Spirit Guide",
  url: "https://maxroll.gg/black-myth-wukong/guides/black-myth-wukong-spirit-guide",
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
      card: "entity",
      details: {
        zh_label: "HP / SP / MP",
        summary:
          "HP 控制容错空间、SP（气力）作动作节流阀控制呼吸感、MP 锁高收益法术的频率。",
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
      id: "combat_skill_system",
      label: "战斗技能体系",
      type: "combat",
      details: {
        zh_label: "Combat Skill System",
        summary:
          "把棍法、法术、变化、法宝、精魄/召唤整合成可编排的技能网络，是黑神话战斗深度的主干。",
        analogy: "像一套乐队编制：棍法是主旋律，法术和法宝是配器，化身与精魄是高潮段。",
        notes:
          "玩家实战不是单技能，而是资源和时机驱动的组合技。该 Hub 用来承接棍法深拆与其他技能分支，避免节点平铺。",
        key_concepts: ["技能编排", "资源协同", "时机窗口", "组合技"],
        source: SRC_MAXROLL_SPELL,
        backstage: {
          summary:
            "技能体系的迭代依赖数值配置后台与平衡工具：技能冷却、消耗、收益、打断值都要可配置且可回归测试。",
          key_concepts: ["技能配置", "回归测试", "版本平衡"],
        },
      },
    },
    {
      id: "staff_stance_system",
      label: "棍法体系总览",
      type: "combat",
      details: {
        zh_label: "Staff Stance System",
        summary:
          "黑神话近战核心：三种棍法 + 切手技 + 棍势循环，决定攻防节奏与上限。",
        analogy: "像一门主修课程：三种招式是三章，切手技是解题技巧，棍势是分数倍率。",
        notes:
          "棍法是全程常驻的核心体系，和法术不同，它决定了多数战斗时间里的基础操作质量。",
        key_concepts: ["三棍法", "切手技", "棍势循环", "常驻主轴"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "棍法树涉及大量天赋参数（伤害倍率、积攒效率、段位上限），需要配置后台和战斗平衡工具联动验证。",
          key_concepts: ["天赋参数", "倍率校验", "主轴平衡"],
        },
      },
    },
    {
      id: "smash_stance",
      label: "劈棍法",
      type: "combat",
      details: {
        zh_label: "Smash Stance",
        summary:
          "偏进攻的棍法分支，围绕轻击衔接重击、识破与斩棍式形成高收益压制。",
        analogy: "像拳击里的前压流：抓准窗口就能把主动权夺回来。",
        notes:
          "劈棍法是识破链路的核心舞台，实战上与『轻棍连段中接重棍』的切手技窗口强绑定。",
        key_concepts: ["前压", "切手技", "识破链路", "高收益"],
        source: SRC_BWIKI_STAFF,
        backstage: {
          summary:
            "该流派的收益高度依赖判定窗口与击退等级配置，需热力图观察成功率并迭代调参。",
          key_concepts: ["窗口调参", "击退等级", "成功率分布"],
        },
      },
    },
    {
      id: "pillar_stance",
      label: "立棍法",
      type: "combat",
      details: {
        zh_label: "Pillar Stance",
        summary:
          "偏稳健与空间控制的棍法分支，强调站位管理和对群体目标的处理。",
        analogy: "像撑杆后再落击：先拉开安全位，再把输出压回去。",
        notes:
          "立棍法常用于处理包围和地形压力，与纯前压打法形成互补。",
        key_concepts: ["站位管理", "空间控制", "对群处理"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "该分支平衡重点是覆盖范围与前后摇：既要有安全价值，又不能变成无脑泛用最优解。",
          key_concepts: ["范围判定", "前后摇", "场景平衡"],
        },
      },
    },
    {
      id: "thrust_stance",
      label: "戳棍法",
      type: "combat",
      details: {
        zh_label: "Thrust Stance",
        summary:
          "偏中远距离与精准命中的棍法分支，强调点杀和距离控制。",
        analogy: "像击剑：先控距，再用一次精准突刺吃掉收益。",
        notes:
          "戳棍法在单体与惩罚窗口中表现突出，可作为高压 Boss 战的稳态解法之一。",
        key_concepts: ["控距", "精准命中", "点杀", "惩罚窗口"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "该分支需重点监控命中判定与位移性能，防止出现『远程安全高伤』的失衡组合。",
          key_concepts: ["命中判定", "位移性能", "风险收益比"],
        },
      },
    },
    {
      id: "focus_point_progression",
      label: "棍势段位成长",
      type: "combat",
      card: "entity",
      details: {
        zh_label: "Focus Point Progression",
        summary:
          "棍势点上限与段位成长决定重击收益曲线，是棍法构筑差异化的底层机制。",
        notes:
          "Focus 点上限通过棍法投入逐步提升，后段点数存在衰减与维持压力，形成进攻节奏管理。",
        key_concepts: ["点数上限", "段位收益", "衰减压力", "成长曲线"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "点数上限和积攒效率是关键平衡杠杆，需要配套 DPS 模型验证不同投入下的收益拐点。",
          key_concepts: ["收益拐点", "积攒效率", "成长平衡"],
        },
      },
    },
    {
      id: "varied_combo",
      label: "轻重衔接(切手技)",
      type: "combat",
      details: {
        zh_label: "Varied Combo",
        summary:
          "轻击连段中接重击形成切手技窗口，是棍法从『连段』切到『爆发/化解』的关键桥梁。",
        analogy: "像开车时瞬间降档超车：节奏一切，收益马上拉高。",
        notes:
          "切手技让玩家能在同一套连段里完成攻防转化，也是识破触发的重要入口。",
        key_concepts: ["轻重衔接", "攻防转化", "节奏切换"],
        source: SRC_BWIKI_STAFF,
        backstage: {
          summary:
            "切手技窗口长度与输入容错直接影响上手门槛，需要结合行为数据评估失败率与学习曲线。",
          key_concepts: ["输入容错", "学习曲线", "失败率"],
        },
      },
    },
    {
      id: "resolute_counterflow",
      label: "识破链路",
      type: "combat",
      details: {
        zh_label: "Resolute Counterflow Flow",
        summary:
          "识破并非单点技巧，而是『破棍式触发 → 化解伤害 → 抖擞返势 → 追击』的完整收益链。",
        analogy: "像格斗游戏里的精准反击连段：防住只是起点，后手连段才是收益。",
        notes:
          "识破成功后常可衔接后续打点，把防守动作转化为压制节奏与棍势回流。",
        key_concepts: ["化解", "返势", "追击窗口", "收益链"],
        source: SRC_BWIKI_STAFF,
        backstage: {
          summary:
            "该链路需要平衡『成功收益』与『失败代价』，避免形成只靠识破就能碾压所有场景的单解。",
          key_concepts: ["成功收益", "失败代价", "单解风险"],
        },
      },
    },
    {
      id: "skyfall_followup",
      label: "识破后追击(斩棍式)",
      type: "combat",
      details: {
        zh_label: "Skyfall Follow-up",
        summary:
          "识破命中后的二段重击追击，是棍法高光时刻的核心爆发动作。",
        analogy: "像篮球抢断后的快攻暴扣：前一步成功后，后一步直接兑现优势。",
        notes:
          "追击链路强调窗口判断与资源管理，决定识破能否从『防反成功』升级为『节奏反转』。",
        key_concepts: ["二段重击", "窗口判断", "节奏反转"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "追击段的伤害和击退等级是强度敏感区，需要和 Boss 韧性及阶段机制一起校验。",
          key_concepts: ["追击伤害", "韧性校验", "阶段平衡"],
        },
      },
    },
    {
      id: "stance_switch_tactics",
      label: "切棍策略",
      type: "combat",
      details: {
        zh_label: "Stance Switch Tactics",
        summary:
          "根据敌人前摇、距离和硬直状态切换棍法，是高难 Boss 战稳定性的关键。",
        analogy: "像临场换战术板：同一场比赛里按局势改打法。",
        notes:
          "切棍不是炫技，而是把不同棍法的风险收益与场景特性做动态匹配。",
        key_concepts: ["动态匹配", "风险收益", "场景化选择"],
        source: SRC_MAXROLL_SPELL,
        backstage: {
          summary:
            "需要追踪不同棍法在 Boss 类型上的胜率与耗时分布，避免某流派在全场景统治。",
          key_concepts: ["胜率分布", "耗时分布", "流派均衡"],
        },
      },
    },
    {
      id: "staff_build_path",
      label: "棍法加点路径",
      type: "combat",
      details: {
        zh_label: "Staff Build Path",
        summary:
          "围绕识破、重击或稳健容错形成不同加点路径，决定玩家战斗风格与容错上限。",
        analogy: "像同一门课选不同方向：有人冲高分，有人保稳过。",
        notes:
          "棍法加点是 build 的骨架，和法术、精魄、法宝搭配后才形成完整战斗构筑。",
        key_concepts: ["加点路径", "风格差异", "容错上限", "构筑骨架"],
        source: SRC_G8_STANCES,
        backstage: {
          summary:
            "加点路径需要依赖配置后台支持低成本重配与版本迁移，降低改版带来的构筑断裂感。",
          key_concepts: ["重配体验", "版本迁移", "构筑连续性"],
        },
      },
    },
    {
      id: "spell_system",
      label: "法术体系",
      type: "combat",
      details: {
        zh_label: "Spell System",
        summary:
          "法术由奇术、身法、毫毛、变化四类构成，是战斗节奏控制与容错补偿的重要层。",
        analogy: "像战斗里的工具箱：不同槽位对应不同问题的解法。",
        notes:
          "法术可在土地庙整备，一次通常按槽位携带一个核心法术，强调场景化切换。",
        key_concepts: ["奇术", "身法", "毫毛", "整备切换"],
        source: SRC_BWIKI_SPELL,
        backstage: {
          summary:
            "法术槽位和冷却/法力参数需要统一配置，保证不同法术分支有清晰定位而非同质竞争。",
          key_concepts: ["槽位设计", "冷却平衡", "定位分层"],
        },
      },
    },
    {
      id: "mysticism_spells",
      label: "奇术(定身/画地为牢)",
      type: "combat",
      details: {
        zh_label: "Mysticism Spells",
        summary:
          "奇术偏控制与增益，常用于制造安全输出窗口或调整战斗节奏。",
        analogy: "像战斗里的暂停键：给你一个重新组织进攻的短窗口。",
        notes:
          "定身术与画地为牢是高频代表：前者控敌抢节奏，后者偏续航和节奏重置。",
        key_concepts: ["控制窗口", "增益", "节奏重置"],
        source: SRC_G8_SPELLS,
        backstage: {
          summary:
            "奇术平衡关键在控制时长与冷却成本，避免『常驻控制』破坏 Boss 机制设计。",
          key_concepts: ["控制时长", "冷却成本", "机制保真"],
        },
      },
    },
    {
      id: "alteration_spells",
      label: "身法(聚形散气/铜头铁臂)",
      type: "combat",
      details: {
        zh_label: "Alteration Spells",
        summary:
          "身法偏生存与反打，通过位移、隐身、化解等手段处理高压连段。",
        analogy: "像战斗里的应急闪现：先活下来，再反咬一口。",
        notes:
          "聚形散气与铜头铁臂为两类典型：一个重脱战与反打，一个重硬解与弹反时机。",
        key_concepts: ["生存位移", "化解反打", "高压处理"],
        source: SRC_G8_SPELLS,
        backstage: {
          summary:
            "身法的无敌帧与收益需要严格校验，避免替代基础闪避体系导致战斗退化为单套路。",
          key_concepts: ["无敌帧", "替代风险", "套路多样性"],
        },
      },
    },
    {
      id: "strand_spells",
      label: "毫毛(身外身法)",
      type: "combat",
      details: {
        zh_label: "Strand Spells",
        summary:
          "毫毛法术以分身/召唤为核心，能短时间改变战场压力分布并创造输出窗口。",
        analogy: "像临时拉来一支小队，帮你分担火力和制造破绽。",
        notes:
          "身外身法属于高影响技能，通常用于 Boss 压力峰值段的转场和爆发配合。",
        key_concepts: ["分身", "召唤", "压力转移", "窗口创造"],
        source: SRC_BWIKI_SPELL,
        backstage: {
          summary:
            "召唤类技能需重点控制持续时间、吸引仇恨与伤害系数，避免压制原有 Boss AI 设计。",
          key_concepts: ["持续时间", "仇恨控制", "AI压力"],
        },
      },
    },
    {
      id: "transformation_system",
      label: "变化/化身体系",
      type: "combat",
      details: {
        zh_label: "Transformation System",
        summary:
          "变化是独立于常规棍法循环的短时化身战斗层：开启后切换专属动作组与战斗节奏，承担阶段性爆发/保命任务。",
        analogy: "像在同一场战斗里临时换一位战斗风格完全不同的替补角色上场。",
        notes:
          "变化具备独立血条与神力限制，定位是『机会窗口技能』而非常驻主循环。部分资料会把变化放在法术大类下介绍；本图谱将其拆为独立节点，是为了突出其资源模型、收益曲线与学习成本都明显不同于常规法术。",
        key_concepts: ["独立血条", "神力限制", "机会窗口", "阶段爆发", "化身切换"],
        source: SRC_BWIKI_TRANSFORMATION,
        backstage: {
          summary:
            "变化体系平衡核心是『收益强度 × 持续时长 × 回转速度』联动：要保证其在高压阶段有明确战术价值，同时不挤压棍法与常规法术的主循环空间。",
          key_concepts: ["收益强度", "持续时长", "回转速度", "战术定位"],
        },
      },
    },
    {
      id: "red_tides",
      label: "赤潮(变化示例)",
      type: "combat",
      details: {
        zh_label: "Red Tides",
        summary:
          "早期可获得的化身形态代表，偏向近身压制与连段输出，常被用作玩家理解『变化窗口价值』的第一站。",
        analogy: "像第一门实战课：你能快速体会到『找窗口开变化』带来的战局反转。",
        notes:
          "赤潮作为变化专篇中最常被提及的早期样本，价值在于把『获取门槛较低』与『体感收益明显』结合起来，帮助玩家建立变化不是摆设而是战术按钮的认知。",
        key_concepts: ["早期入口", "窗口收益", "对单压制", "认知建立"],
        source: SRC_G8_RED_TIDES,
        backstage: {
          summary:
            "赤潮这类早期化身用于校验『获取时点 - 强度反馈 - 章节难度』三者是否匹配，避免出现过早破坏挑战或过晚失去教学意义。",
          key_concepts: ["获取时点", "强度反馈", "章节难度", "新手教学"],
        },
      },
    },
    {
      id: "ebon_flow",
      label: "黯雷(变化示例)",
      type: "combat",
      details: {
        zh_label: "Ebon Flow",
        summary:
          "偏中后期的进阶化身代表，强调防反时机与位移衔接，体现『高操作上限换高阶段收益』的变化设计。",
        analogy: "像高阶驾驶模式：容错更低，但一旦掌握会显著放大上限。",
        notes:
          "黯雷对应的专篇通常聚焦在招式节奏、触发窗口与实战连携，适合作为后期变化样本去验证玩家是否愿意为更高收益投入学习成本。",
        key_concepts: ["进阶变化", "防反机动", "窗口判断", "学习成本"],
        source: SRC_G8_EBON_FLOW,
        backstage: {
          summary:
            "后期变化样本用于检验『复杂度 - 命中收益 - 失败惩罚』曲线是否健康：高门槛应带来可感知回报，但不能把容错压到多数玩家放弃。",
          key_concepts: ["复杂度曲线", "命中收益", "失败惩罚", "后期深度"],
        },
      },
    },
    {
      id: "vessel_system",
      label: "法宝体系",
      type: "combat",
      details: {
        zh_label: "Vessel System",
        summary:
          "法宝提供『携带被动 + 激活主动』双层效果，是针对特定机制的战术解法层。",
        analogy: "像随身道具卡：平时给被动，关键时刻一键逆转局面。",
        notes:
          "法宝一次只能携带一种，强调战前决策与 Boss 机制针对性，而非全场景泛用。",
        key_concepts: ["主动+被动", "战前决策", "机制针对性"],
        source: SRC_BWIKI_VESSEL,
        backstage: {
          summary:
            "法宝体系依赖元气资源和激活收益配置，需避免出现某单一法宝覆盖全部场景。",
          key_concepts: ["元气消耗", "激活收益", "场景分化"],
        },
      },
    },
    {
      id: "wind_tamer",
      label: "定风珠(法宝示例)",
      type: "combat",
      details: {
        zh_label: "Wind Tamer",
        summary:
          "典型机制克制型法宝：提供高额减伤并处理风压场景，是章节 Boss 的针对性解法。",
        analogy: "像带对了克制道具，原本难打的机制瞬间可控。",
        notes:
          "定风珠体现法宝设计思路：特定场景收益显著，常态场景提供稳定但不过度的泛用价值。",
        key_concepts: ["机制克制", "高压减伤", "章节针对性"],
        source: SRC_G8_WIND_TAMER,
        backstage: {
          summary:
            "此类法宝需通过 Boss 机制对照测试，确保『好用但非必带』，维持构筑选择空间。",
          key_concepts: ["机制对照", "必带风险", "选择空间"],
        },
      },
    },
    {
      id: "weavers_needle",
      label: "绣花针(法宝示例)",
      type: "combat",
      details: {
        zh_label: "Weaver's Needle",
        summary:
          "偏进攻型法宝样本，兼具追踪输出与暴击向被动，适合中后期构筑放大。",
        analogy: "像自动追踪副武器：你专注主循环，它持续补伤害。",
        notes:
          "绣花针体现法宝的另一面：并非只防守，也能作为输出构筑的乘区放大器。",
        key_concepts: ["追踪输出", "暴击乘区", "中后期构筑"],
        source: SRC_G8_WEAVER_NEEDLE,
        backstage: {
          summary:
            "进攻法宝需重点评估与暴击流派叠乘后是否过强，防止单构筑天花板失控。",
          key_concepts: ["叠乘风险", "流派天花板", "输出平衡"],
        },
      },
    },
    {
      id: "summon_spirit_system",
      label: "召唤与精魄体系",
      type: "combat",
      details: {
        zh_label: "Summon & Spirit System",
        summary:
          "由毫毛召唤与精魄技能共同构成的『副技能层』，用于补控制、补爆发或补生存。",
        analogy: "像主武器之外的副技能栏：用来补你主循环的短板。",
        notes:
          "精魄通常提供『装备被动 + 施放主动』，与毫毛召唤构成可替换的战术插件层。",
        key_concepts: ["副技能层", "装备被动", "施放主动", "战术插件"],
        source: SRC_MAXROLL_SPIRIT,
        backstage: {
          summary:
            "该体系平衡重点是资源回复与施放收益，避免形成『离手伤害』过高导致主循环边缘化。",
          key_concepts: ["资源回复", "离手伤害", "主循环占比"],
        },
      },
    },
    {
      id: "pluck_of_many",
      label: "身外身法(召唤示例)",
      type: "combat",
      details: {
        zh_label: "A Pluck of Many",
        summary:
          "毫毛法术代表：通过分身协同短时拉高压制力，适合在高压阶段抢回节奏。",
        analogy: "像短时间叫来分队协同作战，把对手节奏打乱。",
        notes:
          "召唤类技能收益高，但窗口管理和资源成本也高，过早或过晚施放都会浪费价值。",
        key_concepts: ["分身协同", "抢节奏", "窗口管理"],
        source: SRC_BWIKI_SPELL,
        backstage: {
          summary:
            "需控制召唤持续时长与协同伤害系数，避免 Boss 阶段机制被无代价跳过。",
          key_concepts: ["持续时长", "协同系数", "机制绕过风险"],
        },
      },
    },
    {
      id: "spirit_skills",
      label: "精魄技能位",
      type: "combat",
      details: {
        zh_label: "Spirit Skills",
        summary:
          "精魄通过『被动属性 + 主动化身技』提供战斗插件化选择，是 build 微调的重要手段。",
        analogy: "像可替换技能芯片：换一个就能明显改变战斗手感。",
        notes:
          "精魄来源广、数量多，核心价值在于让玩家围绕 Boss 特性做低成本针对性调整。",
        key_concepts: ["插件化", "被动+主动", "低成本针对"],
        source: SRC_G8_SPIRITS,
        backstage: {
          summary:
            "精魄池需借助数据看板跟踪使用率和胜率，及时发现长期冷门或过热节点并修正。",
          key_concepts: ["使用率", "胜率", "冷热门修正"],
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
      label: "用户体验(交互+内容)",
      type: "ux",
      details: {
        zh_label: "User Experience (UI + Content)",
        summary:
          "不仅是 UI 皮肤，更是玩家感知层：交互可读性 + 叙事沉浸 + 视听演出 + 风格表达共同塑造体验。",
        analogy: "像高级餐厅：餐具低调到几乎隐形，只为让你专注于菜本身。",
        notes:
          "本节点升级为『体验总入口』：原有 HUD/菜单/微反馈保留，新增叙事世界观、章节旅程、视听沉浸与能力表达。",
        key_concepts: ["体验总入口", "交互可读性", "叙事沉浸", "能力表达"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "体验层是多系统协同结果：资产管线、本地化、埋点、战斗配置共同支撑『看得懂、打得爽、记得住』。",
          notes: "中后台 PM 关心的不只是 UI 资产迭代，还包括叙事一致性与玩家体验漏斗的可观测性。",
          key_concepts: ["跨系统协同", "体验漏斗", "版本一致性"],
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
    {
      id: "narrative_worldview",
      label: "叙事与世界观",
      type: "ux",
      details: {
        zh_label: "Narrative & Worldview",
        summary:
          "以西游母题重构角色与章节情绪曲线，让玩家不仅在打 Boss，也在走一段可记忆的神话旅程。",
        analogy: "像边打边看一部长篇神话剧，每章都有新的情绪主轴。",
        notes:
          "该节点聚焦玩家感知：角色记忆点、章节叙事推进和文化沉浸，而非战斗参数本身。",
        key_concepts: ["西游母题", "章节叙事", "角色记忆点", "文化沉浸"],
        source: SRC_OFFICIAL,
        backstage: {
          summary:
            "叙事体验依赖多语言文本管理与资产管线协同，确保剧情信息和演出素材跨版本一致。",
          key_concepts: ["文本一致性", "叙事资产版本", "多语言协作"],
        },
      },
    },
    {
      id: "chapter_journey",
      label: "章节旅程与关卡体验",
      type: "ux",
      details: {
        zh_label: "Chapter Journey",
        summary:
          "从探索密度、捷径回环到 Boss 关前铺垫，章节旅程决定了『一路玩下来』的情绪起伏。",
        analogy: "像主题乐园动线：先逛、再铺垫、最后给你高潮项目。",
        notes:
          "该节点强调玩家旅程感，而非关卡编辑器本体；重点是节奏感、迷失感和发现感的平衡。",
        key_concepts: ["旅程节奏", "探索密度", "回环动线", "发现感"],
        source: SRC_WIKI,
        backstage: {
          summary:
            "章节体验调优依赖关卡工具链与行为埋点：通过热区和卡点定位优化引导与难度波峰。",
          key_concepts: ["关卡工具链", "行为热区", "节奏调优"],
        },
      },
    },
    {
      id: "audiovisual_immersion",
      label: "视听沉浸",
      type: "ux",
      details: {
        zh_label: "Audiovisual Immersion",
        summary:
          "场景美术、演出镜头与音效配乐共同构成沉浸阈值，决定玩家是否『真进入这个世界』。",
        analogy: "像电影的摄影和配乐：镜头一到位，情绪立刻被拉满。",
        notes:
          "不同于微反馈的局部触感，本节点关注整段战斗/过场的氛围塑造与记忆峰值。",
        key_concepts: ["场景美术", "演出镜头", "配乐氛围", "记忆峰值"],
        source: SRC_OFFICIAL,
        backstage: {
          summary:
            "视听沉浸依赖资产管线与性能预算协同，确保高质素材在不同设备上稳定落地。",
          key_concepts: ["高质素材", "性能预算", "跨设备一致性"],
        },
      },
    },
    {
      id: "build_expression",
      label: "能力表达(玩家打法)",
      type: "ux",
      details: {
        zh_label: "Build Expression",
        summary:
          "玩家通过棍法、法术、法宝、精魄等组合形成『我的打法』，这是长期粘性的核心来源。",
        analogy: "像搭一套自己的乐高战斗流派：组件相同，拼法不同。",
        notes:
          "该节点只讲玩家体验结果（打法表达、试错手感），不重复讲技能机制细节；机制细节收敛到战斗技能体系。",
        key_concepts: ["玩家打法", "组合构筑", "低成本试错", "长期粘性"],
        source: SRC_G8_RESPEC,
        backstage: {
          summary:
            "能力表达的可玩性依赖洗点体验、技能平衡与构筑数据回流，避免流派单一化。",
          key_concepts: ["洗点体验", "构筑多样性", "平衡回流"],
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
    {
      id: "level_perf_toolchain",
      label: "关卡与性能工具链",
      type: "platform",
      details: {
        zh_label: "Level & Performance Toolchain",
        summary:
          "箱庭关卡编辑器 + 资源分区加载策略 + 性能预算管控的工具集，支撑『高密度箱庭』而非『超大开放世界』的研发取舍。",
        notes:
          "中后台 PM 视角：品类定位（箱庭 vs 开放世界）直接决定关卡编辑器形态、资源分区加载与性能预算分配。注：具体工具形态属基于通用游戏中后台经验的合理推断，非官方披露。",
        key_concepts: ["关卡编辑器", "资源加载策略", "性能预算", "箱庭工具取舍"],
        source: BM_SOURCE,
        backstage: {
          summary:
            "支撑的 C 端：品类定位（箱庭关卡密度与性能取舍）。",
          key_concepts: ["支撑：品类定位", "箱庭工具链"],
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
    { id: "combat_system__包含__combat_skill_system", source: "combat_system", target: "combat_skill_system", label: "包含" },
    { id: "combat_system__包含__gunshi_meter", source: "combat_system", target: "gunshi_meter", label: "包含" },
    { id: "combat_system__包含__resolute_strike", source: "combat_system", target: "resolute_strike", label: "包含" },
    { id: "combat_system__包含__modular_gourd", source: "combat_system", target: "modular_gourd", label: "包含" },

    { id: "combat_skill_system__包含__staff_stance_system", source: "combat_skill_system", target: "staff_stance_system", label: "包含" },
    { id: "combat_skill_system__包含__spell_system", source: "combat_skill_system", target: "spell_system", label: "包含" },
    { id: "combat_skill_system__包含__transformation_system", source: "combat_skill_system", target: "transformation_system", label: "包含" },
    { id: "combat_skill_system__包含__vessel_system", source: "combat_skill_system", target: "vessel_system", label: "包含" },
    { id: "combat_skill_system__包含__summon_spirit_system", source: "combat_skill_system", target: "summon_spirit_system", label: "包含" },
    { id: "combat_skill_system__包含__stance_switch_tactics", source: "combat_skill_system", target: "stance_switch_tactics", label: "包含" },

    { id: "staff_stance_system__包含__smash_stance", source: "staff_stance_system", target: "smash_stance", label: "包含" },
    { id: "staff_stance_system__包含__pillar_stance", source: "staff_stance_system", target: "pillar_stance", label: "包含" },
    { id: "staff_stance_system__包含__thrust_stance", source: "staff_stance_system", target: "thrust_stance", label: "包含" },
    { id: "staff_stance_system__包含__focus_point_progression", source: "staff_stance_system", target: "focus_point_progression", label: "包含" },
    { id: "staff_stance_system__包含__varied_combo", source: "staff_stance_system", target: "varied_combo", label: "包含" },
    { id: "staff_stance_system__包含__resolute_counterflow", source: "staff_stance_system", target: "resolute_counterflow", label: "包含" },
    { id: "staff_stance_system__包含__skyfall_followup", source: "staff_stance_system", target: "skyfall_followup", label: "包含" },
    { id: "staff_stance_system__包含__staff_build_path", source: "staff_stance_system", target: "staff_build_path", label: "包含" },

    { id: "spell_system__包含__mysticism_spells", source: "spell_system", target: "mysticism_spells", label: "包含" },
    { id: "spell_system__包含__alteration_spells", source: "spell_system", target: "alteration_spells", label: "包含" },
    { id: "spell_system__包含__strand_spells", source: "spell_system", target: "strand_spells", label: "包含" },

    { id: "transformation_system__包含__red_tides", source: "transformation_system", target: "red_tides", label: "包含" },
    { id: "transformation_system__包含__ebon_flow", source: "transformation_system", target: "ebon_flow", label: "包含" },

    { id: "vessel_system__包含__wind_tamer", source: "vessel_system", target: "wind_tamer", label: "包含" },
    { id: "vessel_system__包含__weavers_needle", source: "vessel_system", target: "weavers_needle", label: "包含" },

    { id: "summon_spirit_system__包含__pluck_of_many", source: "summon_spirit_system", target: "pluck_of_many", label: "包含" },
    { id: "summon_spirit_system__包含__spirit_skills", source: "summon_spirit_system", target: "spirit_skills", label: "包含" },

    { id: "ux_ui_design__包含__combat_hud", source: "ux_ui_design", target: "combat_hud", label: "包含" },
    { id: "ux_ui_design__包含__system_menu", source: "ux_ui_design", target: "system_menu", label: "包含" },
    { id: "ux_ui_design__包含__micro_feedback", source: "ux_ui_design", target: "micro_feedback", label: "包含" },
    { id: "ux_ui_design__包含__narrative_worldview", source: "ux_ui_design", target: "narrative_worldview", label: "包含" },
    { id: "ux_ui_design__包含__chapter_journey", source: "ux_ui_design", target: "chapter_journey", label: "包含" },
    { id: "ux_ui_design__包含__audiovisual_immersion", source: "ux_ui_design", target: "audiovisual_immersion", label: "包含" },
    { id: "ux_ui_design__包含__build_expression", source: "ux_ui_design", target: "build_expression", label: "包含" },

    // ─── 映射边（支撑，C 端 → B 端中后台）───────────────────
    { id: "category_positioning__支撑__level_perf_toolchain", source: "category_positioning", target: "level_perf_toolchain", label: "支撑" },
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
    { id: "combat_skill_system__支撑__combat_balance_tool", source: "combat_skill_system", target: "combat_balance_tool", label: "支撑" },
    { id: "combat_skill_system__支撑__numeric_config_cms", source: "combat_skill_system", target: "numeric_config_cms", label: "支撑" },
    { id: "varied_combo__支撑__combat_heatmap", source: "varied_combo", target: "combat_heatmap", label: "支撑" },
    { id: "resolute_counterflow__支撑__combat_heatmap", source: "resolute_counterflow", target: "combat_heatmap", label: "支撑" },
    { id: "spell_system__支撑__numeric_config_cms", source: "spell_system", target: "numeric_config_cms", label: "支撑" },
    { id: "transformation_system__支撑__combat_balance_tool", source: "transformation_system", target: "combat_balance_tool", label: "支撑" },
    { id: "transformation_system__支撑__numeric_config_cms", source: "transformation_system", target: "numeric_config_cms", label: "支撑" },
    { id: "vessel_system__支撑__numeric_config_cms", source: "vessel_system", target: "numeric_config_cms", label: "支撑" },
    { id: "summon_spirit_system__支撑__numeric_config_cms", source: "summon_spirit_system", target: "numeric_config_cms", label: "支撑" },
    { id: "summon_spirit_system__支撑__telemetry_platform", source: "summon_spirit_system", target: "telemetry_platform", label: "支撑" },
    { id: "gunshi_meter__支撑__combat_balance_tool", source: "gunshi_meter", target: "combat_balance_tool", label: "支撑" },
    { id: "resolute_strike__支撑__combat_balance_tool", source: "resolute_strike", target: "combat_balance_tool", label: "支撑" },
    { id: "loop_combat__支撑__combat_heatmap", source: "loop_combat", target: "combat_heatmap", label: "支撑" },
    { id: "resolute_strike__支撑__combat_heatmap", source: "resolute_strike", target: "combat_heatmap", label: "支撑" },
    { id: "modular_gourd__支撑__numeric_config_cms", source: "modular_gourd", target: "numeric_config_cms", label: "支撑" },
    { id: "ux_ui_design__支撑__asset_pipeline", source: "ux_ui_design", target: "asset_pipeline", label: "支撑" },
    { id: "system_menu__支撑__asset_pipeline", source: "system_menu", target: "asset_pipeline", label: "支撑" },
    { id: "micro_feedback__支撑__asset_pipeline", source: "micro_feedback", target: "asset_pipeline", label: "支撑" },
    { id: "narrative_worldview__支撑__localization_platform", source: "narrative_worldview", target: "localization_platform", label: "支撑" },
    { id: "narrative_worldview__支撑__asset_pipeline", source: "narrative_worldview", target: "asset_pipeline", label: "支撑" },
    { id: "chapter_journey__支撑__telemetry_platform", source: "chapter_journey", target: "telemetry_platform", label: "支撑" },
    { id: "audiovisual_immersion__支撑__asset_pipeline", source: "audiovisual_immersion", target: "asset_pipeline", label: "支撑" },
    { id: "build_expression__支撑__combat_balance_tool", source: "build_expression", target: "combat_balance_tool", label: "支撑" },
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
  typeArchetypes: {
    strategy: "category",
    gameplay: "concept",
    economy: "mechanism",
    combat: "mechanism",
    ux: "practice",
    platform: "entity",
    overview: "category",
  },
  preferredSeed: "black_myth_wukong",
  group: "interest",
  domain: "game-dev",
};
