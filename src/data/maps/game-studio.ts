import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// 游戏研发中台知识图谱 — ARPG 工作室 · 中后台产品经理视角
//
// 节点命名：label 中文（初学者可读），zh_label 英文术语
// 节点 notes 分层：【入门】一句话懂 · 【进阶】职责与上下游 · 【精通】PM 盯盘要点
// 学习路径：写在根节点 notes；模块间用「先修」边串联
// ============================================================

const GS_SOURCE = {
  type: "doc" as const,
  title: "游戏研发中台 · ARPG 工作室信息化产品图谱",
};

const gameStudioGraphData: GraphData = {
  nodes: [
    // ─── 根 ─────────────────────────────────────────────────
    {
      id: "studio_platform",
      label: "游戏研发中台",
      type: "overview",
      details: {
        zh_label: "Game Studio Platform",
        summary:
          "支撑 ARPG 工作室从立项到发售的全链路信息化产品与流程——帮初学者搞懂「做游戏背后需要哪些系统和工具」。",
        analogy: "像一座游戏工厂的「中央调度塔」：人、资产、数据、构建四条传送带在此交汇。",
        notes:
          "【入门】玩家玩的是游戏，研发团队用的是另一套「工具和工作方式」——本图讲的就是后者。\n【进阶】中后台 PM 服务的用户是策划、美术、程序、QA、制作人，不是玩家。\n【精通·阅读路线】沿「先修」边顺序读：①协作底座 → ②资产管线 → ③配置平台 → ④质量构建 → ⑤数据洞察 → ⑥ARPG特化 → ⑦AI赋能 → ⑧黑神话案例。\n【阶段一·约3天】①②，目标：能解释工种与资产怎么进游戏。【阶段二·约2周】③④⑤，目标：能画出「策划改技能伤害」从表到上线的链路。【阶段三·1月+】⑥⑦⑧，目标：能写「战斗平衡工具」PRD。每个节点内看【入门】→【进阶】→【精通】三段。",
        key_concepts: ["入门到精通", "先修边", "研发信息化", "中后台 PM"],
        source: GS_SOURCE,
      },
    },

    // ─── ① 研发协作底座 ─────────────────────────────────────
    {
      id: "collab_foundation",
      label: "研发协作底座",
      type: "foundation",
      details: {
        zh_label: "Collaboration Foundation",
        summary: "项目、迭代、文档、评审、外包五条协作主线的产品与流程集合。",
        analogy: "像工地的「项目部办公室」：排期、开会、存档、验收都在这里发生。",
        notes:
          "【学习顺序】项目管理 → 迭代看板 → 策划文档 → 跨职能评审 → 外包协同。\n【入门】游戏公司也要排期、开会、写文档——这个模块就是「团队怎么一起干活」。\n【进阶】一切管线和配置平台都依赖清晰的协作契约。\n【精通】中后台 PM 在此定义：评审门禁 checklist、文档版本与 build 的绑定规则。",
        key_concepts: ["协作契约", "里程碑", "文档版本", "跨职能对齐"],
        source: GS_SOURCE,
      },
    },
    {
      id: "project_management",
      label: "项目管理系统",
      type: "foundation",
      details: {
        zh_label: "Project Management",
        summary: "管理里程碑、资源编制、风险台账与跨部门依赖的可视化平台。",
        analogy: "像大型基建的甘特图指挥中心，谁卡谁一目了然。",
        notes:
          "【入门】谁负责什么、什么时候交、卡在哪——用软件记下来，别只靠微信群。\n【进阶】用户：制作人、PMO、各线 lead。ARPG 需单独追踪战斗、关卡、资产三条关键路径。\n【精通】盯「关键路径」是否被动画/外包阻塞；里程碑延期要自动冒泡到风险台账。",
        key_concepts: ["里程碑", "资源编制", "风险台账", "关键路径"],
        source: GS_SOURCE,
      },
    },
    {
      id: "sprint_workboard",
      label: "迭代看板",
      type: "foundation",
      details: {
        zh_label: "Sprint Workboard",
        summary: "按迭代周期分发任务、跟踪完成度与阻塞项的敏捷看板。",
        analogy: "像快递分拣流水线：每件任务有状态标签，卡住就变红。",
        notes:
          "【入门】把大目标拆成两周一批的小任务，贴在看板上：待办→进行中→完成。\n【进阶】里程碑拆成 sprint；ARPG 常见阻塞：动画没好战斗联调不了、白盒没过美术进不了场。\n【精通】定义「阻塞」字段必填原因；与项目管理系统的里程碑自动对齐。",
        key_concepts: ["敏捷迭代", "任务分发", "阻塞可视化", "完成度"],
        source: GS_SOURCE,
      },
    },
    {
      id: "design_doc_hub",
      label: "策划文档中枢",
      type: "foundation",
      details: {
        zh_label: "Design Doc Hub",
        summary: "策划案、技术案、数值案的版本化仓库——改一版全员收到通知，避免「各做各的」。",
        analogy: "像建筑院的「蓝图档案馆」：改一版墙，所有施工方自动收到通知。",
        notes:
          "【入门】GDD = 游戏设计文档，写清楚玩法；TDD = 技术文档。都要有版本号。\n【进阶】下游接策划表流水线与评审；文档版本必须与 build 版本可追溯。\n【精通】定义「文档变更 → 自动通知相关职能」规则；禁止无版本号的口头需求。",
        key_concepts: ["GDD", "版本留痕", "变更通知", "可追溯"],
        source: GS_SOURCE,
      },
    },
    {
      id: "cross_discipline_review",
      label: "跨职能评审流程",
      type: "foundation",
      details: {
        zh_label: "Cross-discipline Review",
        summary: "战斗、关卡、美术、程序在关键节点对齐的评审门禁与 checklist。",
        analogy: "像电影工业的「样片审看会」：不过会就不进下一工序。",
        notes:
          "【入门】战斗、关卡、美术、程序在关键节点一起过会，不过会不能往下做。\n【进阶】典型门禁：战斗原型评审、关卡白盒评审、性能预算评审。\n【精通】中后台 PM 维护 checklist 模板；评审结论必须写入任务系统触发开工或返工。",
        key_concepts: ["评审门禁", "checklist", "样片审看", "返工触发"],
        source: GS_SOURCE,
      },
    },
    {
      id: "vendor_collaboration",
      label: "外包协同门户",
      type: "foundation",
      details: {
        zh_label: "Vendor Collaboration Portal",
        summary: "动捕、配音、本地化、部分美术外包的交付、验收与权限隔离门户。",
        analogy: "像供应链的「供应商协同平台」：下单、交货、质检、结算一条链。",
        notes:
          "【入门】动捕、配音、部分美术外包给外部公司，需要门户收文件、验收、付款。\n【进阶】交付物自动入库资产管线；未验收资产不能进主干。\n【精通】权限隔离 + 验收 SLA；与 AI 翻译初稿流程可联动。",
        key_concepts: ["外包交付", "验收质检", "权限隔离", "自动入库"],
        source: GS_SOURCE,
      },
    },

    // ─── ② 资产与内容管线 ───────────────────────────────────
    {
      id: "asset_content_pipeline",
      label: "资产与内容管线",
      type: "pipeline",
      details: {
        zh_label: "Asset & Content Pipeline",
        summary: "从三维软件到引擎实装的资产流转、关卡编辑与叙事配置全链路。",
        analogy: "像影视后期流水线：拍摄素材进厂，成片从另一条口出来。",
        notes:
          "【学习顺序】资产管线 → 三维软件接入 → 动画管线 → 关卡编辑 → 叙事配置 → UI工作流。\n【入门】角色模型、动画、关卡、对话——怎么从美术电脑进游戏？看这个模块。\n【进阶】ARPG 品质高度依赖资产密度与动画品质；黑神话图谱有 3A 级实例。\n【精通】定义入库规范、DCC 插件维护人、LOD/材质实例策略。",
        key_concepts: ["资产流转", "DCC 集成", "关卡编辑", "内容配置"],
        source: GS_SOURCE,
      },
    },
    {
      id: "asset_pipeline",
      label: "美术资产管理管线",
      type: "pipeline",
      details: {
        zh_label: "Asset Pipeline (DAM)",
        summary: "3D 模型、贴图、动捕、音频等资产的版本控制、标签检索与批量导出中台。",
        analogy: "像图书馆的中央检索系统：每份资产有编号、版本、借阅记录。",
        notes:
          "【入门】所有美术资源的「中央仓库」：有编号、有版本、能搜索。\n【进阶】用户：美术、技术美术、程序。上游 DCC 导出，下游引擎导入与构建。\n【精通】百人团队瓶颈常在检索与批量导出；支持 LOD、材质实例、动画片段原子化。",
        key_concepts: ["DAM", "版本控制", "标签检索", "批量导出"],
        source: GS_SOURCE,
      },
    },
    {
      id: "dcc_integration",
      label: "三维软件接入",
      type: "pipeline",
      details: {
        zh_label: "DCC Integration",
        summary: "Maya/Blender/Houdini 与引擎之间的导出插件、命名规范与校验规则。",
        analogy: "像不同品牌机床的统一接口：不管谁生产的零件，进同一流水线。",
        notes:
          "【入门】DCC = 三维/动画软件（Maya、Blender），要有统一导出插件进引擎。\n【进阶】技术美术维护插件，美术日常使用。\n【精通】命名规范、面数预算、UV 规则自动校验，不合格拒收。",
        key_concepts: ["导出插件", "命名规范", "自动校验", "面数预算"],
        source: GS_SOURCE,
      },
    },
    {
      id: "animation_pipeline",
      label: "动捕与动画管线",
      type: "pipeline",
      details: {
        zh_label: "Animation Pipeline",
        summary: "动捕数据采集、重定向、状态机拼装与战斗动画批处理的专用管线。",
        analogy: "像舞蹈团的「排练-录像-编舞」三联流程：每个动作都能追溯到源。",
        notes:
          "【入门】动捕演员的动作怎么变成游戏里的攻击动画？走这条管线。\n【进阶】需记录每段动画的帧事件元数据供战斗系统读取。\n【精通】攻击帧、受击帧、取消窗口对齐是 ARPG 手感基础。",
        key_concepts: ["动捕重定向", "状态机", "帧事件", "批处理"],
        source: GS_SOURCE,
      },
    },
    {
      id: "level_editor_platform",
      label: "关卡编辑器中台",
      type: "pipeline",
      details: {
        zh_label: "Level Editor Platform",
        summary: "白盒搭建、遭遇点布置、触发器配置到实装美术替换的分阶段关卡生产平台。",
        analogy: "像城市规划局的「沙盘+施工图」双模式：先跑通动线，再精装修。",
        notes:
          "【入门】关卡先搭简易白盒试玩，再换精美美术——分两个阶段。\n【进阶】用户：关卡设计、战斗设计。箱庭需可视化编排捷径与回溯点。\n【精通】白盒过审是美术进场的前置门禁。",
        key_concepts: ["白盒搭建", "遭遇点", "分阶段生产", "触发器"],
        source: GS_SOURCE,
      },
    },
    {
      id: "narrative_cms",
      label: "叙事任务配置台",
      type: "pipeline",
      details: {
        zh_label: "Narrative CMS",
        summary: "任务链、对话树、分支条件与奖励挂钩的无代码叙事配置后台。",
        analogy: "像编剧的「分镜脚本编辑器」：每句台词、每个分支都能点到。",
        notes:
          "【入门】任务、对话、分支不用写代码，在后台点选配置。\n【进阶】任务奖励、解锁条件引用统一 ID；支持多语言 key。\n【精通】与数值表引用完整性校验；AI 对话初稿经审核后写入。",
        key_concepts: ["对话树", "任务链", "分支条件", "奖励挂钩"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ui_asset_workflow",
      label: "UI切图工作流",
      type: "pipeline",
      details: {
        zh_label: "UI Asset Workflow",
        summary: "多分辨率切图、九宫格标注、字体子集化与引擎 UI 预制体自动生成流程。",
        analogy: "像印刷厂的「制版车间」：同一套设计稿自动出各尺寸版本。",
        notes:
          "【入门】按钮、图标要多套分辨率，不能切一张糊一张。\n【进阶】定义安全区、锚点、PC/手柄布局差异。\n【精通】与资产管线共享版本管理。",
        key_concepts: ["多分辨率", "九宫格", "预制体生成", "安全区"],
        source: GS_SOURCE,
      },
    },

    // ─── ③ 数值与配置平台 ───────────────────────────────────
    {
      id: "config_platform",
      label: "数值与配置平台",
      type: "config",
      details: {
        zh_label: "Config Platform",
        summary: "策划表到运行时数据的流水线，以及战斗、经济、实验的配置与模拟工具。",
        analogy: "像汽车的「ECU 调校台」：不改发动机，只调参数就能改变驾驶感受。",
        notes:
          "【学习顺序】策划表流水线 → 数值后台 → 平衡工具 → 经济模拟 → A/B实验。\n【入门】游戏里的伤害、掉落、经验——策划改表就能调，不用等程序改代码。\n【进阶】黑神话的数值后台、平衡工具、防通胀均属此模块实例。\n【精通】表结构变更过 CI；平衡报告进评审门禁。",
        key_concepts: ["无代码配置", "策划表", "平衡模拟", "A/B 实验"],
        source: GS_SOURCE,
      },
    },
    {
      id: "numeric_config_cms",
      label: "数值配置后台",
      type: "config",
      details: {
        zh_label: "Numeric Config CMS",
        summary: "策划无代码修改怪物属性、技能模组、掉落池与成长曲线的配置后台。",
        analogy: "像飞行模拟器的「参数面板」：拉杆就能改爬升率，不用拆引擎。",
        notes:
          "【入门】策划在网页后台改怪物血量、技能伤害，保存后游戏读取新数据。\n【进阶】上游策划表，下游运行时数据；内置校验与版本回滚。\n【精通】技能模组、状态效果、掉落池原子化配置。",
        key_concepts: ["无代码改表", "技能模组", "掉落池", "版本回滚"],
        source: GS_SOURCE,
      },
    },
    {
      id: "spreadsheet_pipeline",
      label: "策划表流水线",
      type: "config",
      details: {
        zh_label: "Spreadsheet Pipeline",
        summary: "Excel/在线表格 → 校验 → 转 JSON/二进制 → 热更新或随包发布的自动化流水线。",
        analogy: "像食品厂的「配方单自动灌装线」：表格是配方，出口是成品。",
        notes:
          "【入门】策划用 Excel 填表，系统自动转成游戏能读的数据文件。\n【进阶】支持 diff、冲突检测；表结构变更触发自动化测试。\n【精通】是数值 CMS 的上游原料入口。",
        key_concepts: ["表转数据", "结构校验", "diff 对比", "CI 触发"],
        source: GS_SOURCE,
      },
    },
    {
      id: "combat_balance_tool",
      label: "战斗平衡测试工具",
      type: "config",
      details: {
        zh_label: "Combat Balance Tool",
        summary: "模拟各流派 DPS、TTK、资源循环的离线测算与批量回归脚本平台。",
        analogy: "像 F1 的风洞：真车上路前，先在模型里跑完所有组合。",
        notes:
          "【入门】上线前用脚本模拟「这招打 Boss 要几秒」，别靠手感猜。\n【进阶】依赖战斗数据模型；输出平衡报告供评审会。\n【精通】与试玩热力数据交叉验证。",
        key_concepts: ["DPS 模拟", "TTK", "批量回归", "平衡报告"],
        source: GS_SOURCE,
      },
    },
    {
      id: "economy_simulator",
      label: "经济产消模拟器",
      type: "config",
      details: {
        zh_label: "Economy Simulator",
        summary: "模拟玩家长时间游玩下的资源产出/消耗净流，预警通胀或断档。",
        analogy: "像央行的宏观经济模型：货币发多了会通胀，发少了会萧条。",
        notes:
          "【入门】模拟玩 100 小时金币会不会通胀、前期会不会缺钱。\n【进阶】读取数值 CMS 产消表，支持典型路径或蒙特卡洛模拟。\n【精通】预警阈值可写入发布门禁。",
        key_concepts: ["产消净流", "通胀预警", "路径模拟", "经济健康"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ab_experiment_platform",
      label: "玩法AB实验平台",
      type: "config",
      details: {
        zh_label: "A/B Experiment Platform",
        summary: "内部试玩或灰度版本中，对不同数值/关卡方案做分组对比实验的配置平台。",
        analogy: "像新药的双盲试验：两组玩家各走一套方案，数据说话。",
        notes:
          "【入门】试玩时 A/B 两组用不同数值，看哪组更好玩。\n【进阶】依赖试玩分析回收指标。\n【精通】单机封闭试玩同样能降低平衡翻车风险。",
        key_concepts: ["分组实验", "灰度配置", "指标对比", "封闭试玩"],
        source: GS_SOURCE,
      },
    },

    // ─── ④ 质量与构建基础设施 ───────────────────────────────
    {
      id: "quality_infra",
      label: "质量与构建基础设施",
      type: "quality",
      details: {
        zh_label: "Quality & Build Infrastructure",
        summary: "构建农场、CI 门禁、自动化测试、崩溃监控与平台认证的工具链。",
        analogy: "像工厂的「质检部+出货口」：不合格品出不了厂。",
        notes:
          "【学习顺序】自动构建检查 → 构建农场 → 自动化测试 → 崩溃监控 → 平台认证。\n【入门】每次改代码自动编译打包，测不过不能合并。\n【进阶】3A 每日构建量大，无主分支会频繁「红」。\n【精通】定义阻断合并 vs 仅告警的门禁清单。",
        key_concepts: ["构建农场", "CI 门禁", "自动化 QA", "平台认证"],
        source: GS_SOURCE,
      },
    },
    {
      id: "build_farm",
      label: "构建农场",
      type: "quality",
      details: {
        zh_label: "Build Farm",
        summary: "多平台（PC/PS/Xbox）并行打包的分布式构建集群与产物归档。",
        analogy: "像印刷厂的多条印刷线：同一本书同时出精装和平装。",
        notes:
          "【入门】多台电脑并行打 PC/主机安装包，不用人工一台台等。\n【进阶】接收 CI 触发，输出安装包与符号表。\n【精通】构建耗时/失败率作为产能 KPI。",
        key_concepts: ["多平台打包", "分布式构建", "产物归档", "符号表"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ci_cd_pipeline",
      label: "自动构建合并检查",
      type: "quality",
      details: {
        zh_label: "CI/CD Pipeline",
        summary: "代码提交后自动编译、跑测、检查资源规范并决定是否允许合并的门禁流水线。",
        analogy: "像机场安检：每件行李（每次提交）都必须过同一套检查。",
        notes:
          "【入门】CI/CD = 提交代码后自动编译、跑测试，失败就不能合并进主分支。\n【进阶】门禁含：编译、单测、表校验、资源命名、性能冒烟。\n【精通】是中后台 PM 定义质量契约的核心产品。",
        key_concepts: ["自动编译", "合并阻断", "冒烟测试", "规范检查"],
        source: GS_SOURCE,
      },
    },
    {
      id: "automated_qa",
      label: "自动化测试",
      type: "quality",
      details: {
        zh_label: "Automated QA",
        summary: "战斗回放回归、关卡连通性扫描、UI 冒烟与性能基准的自动化测试套件。",
        analogy: "像汽车碰撞测试的机器人驾驶员：重复跑同一套动作，看有没有散架。",
        notes:
          "【入门】录一段玩家操作，每次新版本自动重放，看伤害有没有被改坏。\n【进阶】战斗回放 + 关卡连通性扫描。\n【精通】纳入每日构建必跑项。",
        key_concepts: ["战斗回放", "回归测试", "连通性扫描", "性能基准"],
        source: GS_SOURCE,
      },
    },
    {
      id: "crash_analytics",
      label: "崩溃性能监控",
      type: "quality",
      details: {
        zh_label: "Crash & Performance Analytics",
        summary: "收集崩溃堆栈、帧率分布、内存峰值的运行时监控与告警平台。",
        analogy: "像飞机的黑匣子：出事时能精确定位哪段代码、哪个场景出了问题。",
        notes:
          "【入门】游戏闪退时自动上报错在哪一行、哪个场景。\n【进阶】按 build、关卡、机型、画质下钻。\n【精通】补丁前后崩溃率对比驱动发布决策。",
        key_concepts: ["崩溃堆栈", "帧率分布", "版本关联", "下钻分析"],
        source: GS_SOURCE,
      },
    },
    {
      id: "certification_toolkit",
      label: "平台认证检查工具",
      type: "quality",
      details: {
        zh_label: "Certification Toolkit",
        summary: "对照 Steam/PS/Xbox 等平台的 TRC/XR 要求做自动化或半自动合规检查。",
        analogy: "像出口商品的「CE 认证清单」：一项漏检就可能无法上架。",
        notes:
          "【入门】上 Steam/主机前有合规清单：存档、手柄、成就等。\n【进阶】发行、QA、程序共用。\n【精通】里程碑早期嵌入，禁止临发售突击。",
        key_concepts: ["TRC/XR", "合规检查", "上架门禁", "存档兼容"],
        source: GS_SOURCE,
      },
    },

    // ─── ⑤ 数据与洞察中台 ───────────────────────────────────
    {
      id: "data_insight",
      label: "数据与洞察中台",
      type: "data",
      details: {
        zh_label: "Data & Insight Platform",
        summary: "埋点采集、试玩分析、战斗热力、关卡漏斗到发售后大盘的洞察体系。",
        analogy: "像商场的「客流分析系统」：不只数人头，还要知道人在哪层停留、在哪层流失。",
        notes:
          "【学习顺序】玩家行为采集 → 试玩分析 → 漏斗/热力 → 发售大盘。\n【入门】玩家在哪死、哪关流失——要有数据，不能只听感觉。\n【进阶】黑神话的埋点、热力图、数据大屏属此模块。\n【精通】事件 schema 统一治理；权限分级。",
        key_concepts: ["行为埋点", "试玩分析", "热力图", "漏斗看板"],
        source: GS_SOURCE,
      },
    },
    {
      id: "telemetry_platform",
      label: "玩家行为采集",
      type: "data",
      details: {
        zh_label: "Telemetry Platform",
        summary: "统一采集玩家行为事件（关卡进入、死亡、技能使用、停留时长）的埋点 SDK 与管道。",
        analogy: "像城市的路网摄像头：事件标准化后才能做交通分析。",
        notes:
          "【入门】埋点 = 在游戏里记录「玩家做了什么」并上报（进关卡、死亡、放技能）。\n【进阶】定义事件 schema、采样、试玩隐私授权。\n【精通】所有下游看板的数据源。",
        key_concepts: ["事件 schema", "采集 SDK", "采样策略", "隐私合规"],
        source: GS_SOURCE,
      },
    },
    {
      id: "playtest_analytics",
      label: "内部试玩分析",
      type: "data",
      details: {
        zh_label: "Playtest Analytics",
        summary: "封闭试玩/员工狗食阶段的行为聚合、问卷关联与版本对比分析平台。",
        analogy: "像新菜的「试吃评分表」：不只好吃与否，还要知道哪一口出了问题。",
        notes:
          "【入门】员工或招募玩家试玩后的数据汇总，看哪不好玩。\n【进阶】与 A/B 分组指标联动。\n【精通】小样本需标注置信度。",
        key_concepts: ["封闭试玩", "版本对比", "问卷关联", "小样本分析"],
        source: GS_SOURCE,
      },
    },
    {
      id: "combat_heatmap",
      label: "战斗行为热力图",
      type: "data",
      details: {
        zh_label: "Combat Heatmap",
        summary: "将玩家死亡位置、闪避成功率、技能使用分布空间化展示的战斗分析看板。",
        analogy: "像足球场的热区图：一眼看出大家死在哪个角落、爱用哪只脚。",
        notes:
          "【入门】地图上标出玩家常死在哪、爱躲在哪，像足球场热区图。\n【进阶】用于 Boss 难度与识破窗口校准。\n【精通】空间化分析驱动精确调优坐标。",
        key_concepts: ["死亡分布", "成功率统计", "空间化", "难度校准"],
        source: GS_SOURCE,
      },
    },
    {
      id: "funnel_dashboard",
      label: "关卡漏斗看板",
      type: "data",
      details: {
        zh_label: "Level Funnel Dashboard",
        summary: "按关卡/章节展示进入率、完成率、流失节点的漏斗可视化看板。",
        analogy: "像漏斗营销的转化图：每一层筛掉多少人，断点在哪一屏。",
        notes:
          "【入门】每一关多少人进、多少人过、多少人流失——漏斗图一眼看清。\n【进阶】识别卡关 Boss、迷路区、剧情过长。\n【精通】流失节点驱动迭代优先级。",
        key_concepts: ["关卡漏斗", "流失节点", "完成率", "迭代优先级"],
        source: GS_SOURCE,
      },
    },
    {
      id: "launch_dashboard",
      label: "发售后大盘",
      type: "data",
      details: {
        zh_label: "Launch Dashboard",
        summary: "发售后跨平台销量、留存、活跃、舆情与补丁效果的可视化决策看板。",
        analogy: "像上市公司财报驾驶舱：关键 KPI 一屏掌握，异常自动标红。",
        notes:
          "【入门】发售后销量、留存、崩溃率一屏看完。\n【进阶】与崩溃监控联动看补丁效果。\n【精通】黑神话「用户数据大屏」是此能力实例。",
        key_concepts: ["销量漏斗", "留存大盘", "舆情监控", "补丁效果"],
        source: GS_SOURCE,
      },
    },

    // ─── ⑥ AI 赋能研发工作流 ───────────────────────────────
    {
      id: "ai_workflow",
      label: "AI赋能研发工作流",
      type: "ai",
      details: {
        zh_label: "AI-powered Dev Workflow",
        summary: "将生成式 AI 嵌入概念、叙事、测试、本地化、脚本与程序化等环节的产品化工作流。",
        analogy: "像给每个工位配了一个「实习生」：快但不靠谱，需要主管（人）审核。",
        notes:
          "【学习顺序】概念原画 → NPC对话 → 编程辅助 → 测试/本地化 → 程序化关卡。\n【入门】AI 出草稿，人审核，再过 CI——是助手不是替代。\n【进阶】定义每类 AI 的输入输出契约。\n【精通】维护人工审核节点与风格门禁。",
        key_concepts: ["生成式 AI", "人机协作", "风格门禁", "审核节点"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ai_concept_art",
      label: "AI概念原画辅助",
      type: "ai",
      details: {
        zh_label: "AI Concept Art Assist",
        summary: "用扩散模型快速出概念草图，经风格一致性校验后进入正式美术管线的辅助工具。",
        analogy: "像建筑师的「灵感速写本」：30 秒出 30 个方向，再挑 3 个精修。",
        notes:
          "【入门】用 AI 快速出几十张风格草图，美术挑方向再精修。\n【进阶】输出过风格一致性校验才能入库。\n【精通】AI 稿不能直接进正式资产库。",
        key_concepts: ["概念探索", "风格一致性", "扩散模型", "入库门禁"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ai_npc_dialogue",
      label: "AI NPC对话生成",
      type: "ai",
      details: {
        zh_label: "AI NPC Dialogue",
        summary: "基于人设与情境模板生成 NPC 对话初稿，供叙事策划审核后写入叙事 CMS。",
        analogy: "像编剧的「对白初稿机」：先填满台词格子，再人工润色灵魂。",
        notes:
          "【入门】按人设让 AI 写 NPC 台词初稿，策划改完再入库。\n【进阶】约束世界观术语与敏感词。\n【精通】生成内容必须人工审核才能进叙事配置台。",
        key_concepts: ["人设模板", "对白初稿", "术语约束", "人工审核"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ai_qa_assistant",
      label: "AI辅助测试",
      type: "ai",
      details: {
        zh_label: "AI QA Assistant",
        summary: "用 AI 探索异常路径、生成测试用例摘要、辅助定位崩溃根因的 QA 辅助工具。",
        analogy: "像新手的「陪练对手」：专挑你不注意的角落出招。",
        notes:
          "【入门】让 AI 帮忙想「玩家可能会怎么乱玩」来扩测试用例。\n【进阶】可与自动化回放结合。\n【精通】不替代正式回归测试。",
        key_concepts: ["异常路径", "用例生成", "根因辅助", "探索测试"],
        source: GS_SOURCE,
      },
    },
    {
      id: "ai_localization",
      label: "AI翻译初稿",
      type: "ai",
      details: {
        zh_label: "AI Localization Draft",
        summary: "多语言翻译机器初稿 + 术语库校验 + 人工审校的本地化加速流程。",
        analogy: "像同声传译的「第一句机器版」：快但必须有译者复核。",
        notes:
          "【入门】AI 先翻译一版，译者校对，比从零翻快。\n【进阶】术语库 + UI 文本长度校验。\n【精通】与外包协同门户审校留痕联动。",
        key_concepts: ["机器初稿", "术语库", "UI 长度校验", "审校留痕"],
        source: GS_SOURCE,
      },
    },
    {
      id: "copilot_for_scripts",
      label: "引擎内AI编程辅助",
      type: "ai",
      details: {
        zh_label: "In-engine AI Coding Assist (Copilot)",
        summary: "嵌在游戏引擎里的 AI 编程助手——像 Copilot/Cursor，但专门帮写玩法脚本和蓝图。",
        analogy: "像程序的「结对编程搭档」：你写意图，它补细节。",
        notes:
          "【入门】在 Unity/虚幻里写玩法逻辑时，AI 帮你补代码——类似 Copilot/Cursor，但是在引擎里用，也帮技术策划写蓝图。\n【进阶】须符合项目命名与模块边界；可辅助任务触发器脚本。\n【精通】所有 AI 生成代码仍须 code review + CI。",
        key_concepts: ["代码补全", "模式检索", "规范约束", "code review"],
        source: GS_SOURCE,
      },
    },
    {
      id: "procedural_assist",
      label: "程序化关卡辅助",
      type: "ai",
      details: {
        zh_label: "Procedural Level Assist",
        summary: "用程序化/AI 辅助植被摆放、道具填充、地形变体的关卡生产加速器。",
        analogy: "像园林设计的「自动填缝」：大框架人手定，细节让机器铺。",
        notes:
          "【入门】让电脑帮忙铺草丛、摆道具，人只定大框架。\n【进阶】适合箱庭外围填充，不替代核心遭遇。\n【精通】过审美评审与性能预算检查。",
        key_concepts: ["植被填充", "道具摆放", "性能预算", "审美评审"],
        source: GS_SOURCE,
      },
    },

    // ─── ⑦ ARPG 品类特化约束 ───────────────────────────────
    {
      id: "arpg_constraints",
      label: "ARPG品类特化",
      type: "arpg",
      details: {
        zh_label: "ARPG Domain Constraints",
        summary: "动作 RPG 品类对中后台产品的特殊数据结构、工具与流程约束集合。",
        analogy: "像「高铁规格」：同样是火车，但轨道和车厢标准与普通列车不同。",
        notes:
          "【学习顺序】战斗数据模型 → 动作对齐 → 遭遇编排 → 成长曲线 → 箱庭运营。\n【入门】ARPG = 动作角色扮演，重战斗手感与成长；本模块讲「这类游戏对工具有啥特殊要求」。\n【进阶】通用中台落地 ARPG 的五条硬约束。\n【精通】与配置平台、资产管线交叉阅读效果最佳。",
        key_concepts: ["战斗数据", "遭遇编排", "成长曲线", "箱庭运营"],
        source: GS_SOURCE,
      },
    },
    {
      id: "combat_data_model",
      label: "战斗数据模型",
      type: "arpg",
      details: {
        zh_label: "Combat Data Model",
        summary: "技能模组、状态效果、伤害公式、i-Frame 窗口的统一表结构与引用规范。",
        analogy: "像乐谱的「记谱法」：所有人按同一套符号写，乐队才能合奏。",
        notes:
          "【入门】技能、buff、伤害公式在表里怎么存——大家得用同一套格式。\n【进阶】是数值 CMS 与平衡工具的前置 schema。\n【精通】支持连招取消、无敌帧、部位破坏等扩展字段。",
        key_concepts: ["技能模组", "状态效果", "i-Frame", "伤害公式"],
        source: GS_SOURCE,
      },
    },
    {
      id: "encounter_design_tool",
      label: "遭遇战编排工具",
      type: "arpg",
      details: {
        zh_label: "Encounter Design Tool",
        summary: "在关卡编辑器中编排敌人组合、刷新节奏、场地机关与难度曲线的专用工具。",
        analogy: "像交响乐的「配器台」：每种乐器（敌人）何时进场、多大音量都有谱。",
        notes:
          "【入门】这一关放几个怪、什么时候刷——可视化编排遭遇战。\n【进阶】依赖关卡编辑器与战斗数据模型。\n【精通】输出配置可被平衡工具批量模拟。",
        key_concepts: ["敌人组合", "刷新节奏", "场地机关", "难度曲线"],
        source: GS_SOURCE,
      },
    },
    {
      id: "progression_curve",
      label: "成长曲线管理",
      type: "arpg",
      details: {
        zh_label: "Progression Curve",
        summary: "等级、技能点、装备、属性成长的全周期曲线设计与里程碑校验工具。",
        analogy: "像健身的「周期化训练计划」：每个阶段练什么、加多少重量都预设好。",
        notes:
          "【入门】升级、加点、装备——强度随时间怎么涨要画曲线。\n【进阶】约束数值 CMS 中的经验/属性表。\n【精通】验证「第 N 小时强度」，防前期碾压或后期刮痧。",
        key_concepts: ["等级曲线", "技能点", "装备成长", "里程碑校验"],
        source: GS_SOURCE,
      },
    },
    {
      id: "hakoniwa_level_ops",
      label: "箱庭关卡运营",
      type: "arpg",
      details: {
        zh_label: "Hakoniwa Level Ops",
        summary: "箱庭关卡的体验密度、捷径解锁、回溯点与区域连通性的运营分析框架。",
        analogy: "像主题乐园的「客流动线设计」：不让游客走回头路，也不让热门项目空转。",
        notes:
          "【入门】箱庭 = 精心设计的有限地图（非开放世界），讲究密度和动线。\n【进阶】依赖关卡漏斗与热力数据。\n【精通】优化捷径、回溯点与体验密度。",
        key_concepts: ["体验密度", "捷径解锁", "回溯点", "区域连通"],
        source: GS_SOURCE,
      },
    },
    {
      id: "animation_combat_sync",
      label: "动作打击帧对齐",
      type: "arpg",
      details: {
        zh_label: "Animation-Combat Sync",
        summary: "攻击帧、受击帧、取消窗口在动画元数据与战斗逻辑间的对齐工作流。",
        analogy: "像武术的「拆招对表」：拳头到脸的帧数必须和伤害判定的帧数一致。",
        notes:
          "【入门】刀砍到怪的那一帧，必须和伤害判定同一帧，否则手感假。\n【进阶】依赖动画管线输出的帧事件元数据。\n【精通】错位是 ARPG 手感 bug 头号来源。",
        key_concepts: ["攻击帧", "受击帧", "取消窗口", "帧事件元数据"],
        source: GS_SOURCE,
      },
    },

    // ─── ⑧ 标杆案例 ─────────────────────────────────────────
    {
      id: "benchmark_cases",
      label: "标杆案例",
      type: "case",
      details: {
        zh_label: "Benchmark Cases",
        summary: "将通用中后台能力落到具体 3A ARPG 产品的实例化参考。",
        analogy: "像商学院的「哈佛案例」：理论在此有了姓名和面孔。",
        notes:
          "【学习顺序】黑神话悟空（切换图谱深拆）。\n【入门】学完通用能力后，看真实 3A 游戏怎么落地。\n【进阶】当前收录黑神话悟空；顶部切换器可跳到「黑神话悟空」图谱。\n【精通】从案例反推 PRD：对照本图通用节点找单品实例。",
        key_concepts: ["案例教学", "单品深拆", "能力实例化", "阅读路径"],
        source: GS_SOURCE,
      },
    },
    {
      id: "black_myth_wukong",
      label: "黑神话悟空",
      type: "case",
      details: {
        zh_label: "Black Myth: Wukong",
        summary: "国产 3A 箱庭 ARPG 的完整产品系统拆解案例，涵盖战斗、经济、UI 与中后台能力映射。",
        analogy: "像建筑系的「朗香教堂」案例：不只看外观，还拆结构力学。",
        notes:
          "【入门】国产 3A《黑神话：悟空》——本仓库另一张图专门拆它，请先读完本图再跳转。\n【进阶】顶部切换器选「黑神话悟空」看 C 端×B 端双视角拆解。\n【精通】对照本图通用节点（资产管线、数值后台、埋点等）找单品实例。",
        key_concepts: ["3A ARPG", "双视角拆解", "箱庭关卡", "中后台映射"],
        source: {
          type: "doc" as const,
          title: "《黑神话：悟空》产品系统拆解（双视角映射版）",
          url: "https://easin-yx.github.io/ai-knowledge-graph/",
        },
      },
    },
  ],

  edges: [
    // ─── 层级边（包含）─────────────────────────────────────
    { id: "studio_platform__包含__collab_foundation", source: "studio_platform", target: "collab_foundation", label: "包含" },
    { id: "studio_platform__包含__asset_content_pipeline", source: "studio_platform", target: "asset_content_pipeline", label: "包含" },
    { id: "studio_platform__包含__config_platform", source: "studio_platform", target: "config_platform", label: "包含" },
    { id: "studio_platform__包含__quality_infra", source: "studio_platform", target: "quality_infra", label: "包含" },
    { id: "studio_platform__包含__data_insight", source: "studio_platform", target: "data_insight", label: "包含" },
    { id: "studio_platform__包含__ai_workflow", source: "studio_platform", target: "ai_workflow", label: "包含" },
    { id: "studio_platform__包含__arpg_constraints", source: "studio_platform", target: "arpg_constraints", label: "包含" },
    { id: "studio_platform__包含__benchmark_cases", source: "studio_platform", target: "benchmark_cases", label: "包含" },

    { id: "collab_foundation__包含__project_management", source: "collab_foundation", target: "project_management", label: "包含" },
    { id: "collab_foundation__包含__sprint_workboard", source: "collab_foundation", target: "sprint_workboard", label: "包含" },
    { id: "collab_foundation__包含__design_doc_hub", source: "collab_foundation", target: "design_doc_hub", label: "包含" },
    { id: "collab_foundation__包含__cross_discipline_review", source: "collab_foundation", target: "cross_discipline_review", label: "包含" },
    { id: "collab_foundation__包含__vendor_collaboration", source: "collab_foundation", target: "vendor_collaboration", label: "包含" },

    { id: "asset_content_pipeline__包含__asset_pipeline", source: "asset_content_pipeline", target: "asset_pipeline", label: "包含" },
    { id: "asset_content_pipeline__包含__dcc_integration", source: "asset_content_pipeline", target: "dcc_integration", label: "包含" },
    { id: "asset_content_pipeline__包含__animation_pipeline", source: "asset_content_pipeline", target: "animation_pipeline", label: "包含" },
    { id: "asset_content_pipeline__包含__level_editor_platform", source: "asset_content_pipeline", target: "level_editor_platform", label: "包含" },
    { id: "asset_content_pipeline__包含__narrative_cms", source: "asset_content_pipeline", target: "narrative_cms", label: "包含" },
    { id: "asset_content_pipeline__包含__ui_asset_workflow", source: "asset_content_pipeline", target: "ui_asset_workflow", label: "包含" },

    { id: "config_platform__包含__numeric_config_cms", source: "config_platform", target: "numeric_config_cms", label: "包含" },
    { id: "config_platform__包含__spreadsheet_pipeline", source: "config_platform", target: "spreadsheet_pipeline", label: "包含" },
    { id: "config_platform__包含__combat_balance_tool", source: "config_platform", target: "combat_balance_tool", label: "包含" },
    { id: "config_platform__包含__economy_simulator", source: "config_platform", target: "economy_simulator", label: "包含" },
    { id: "config_platform__包含__ab_experiment_platform", source: "config_platform", target: "ab_experiment_platform", label: "包含" },

    { id: "quality_infra__包含__build_farm", source: "quality_infra", target: "build_farm", label: "包含" },
    { id: "quality_infra__包含__ci_cd_pipeline", source: "quality_infra", target: "ci_cd_pipeline", label: "包含" },
    { id: "quality_infra__包含__automated_qa", source: "quality_infra", target: "automated_qa", label: "包含" },
    { id: "quality_infra__包含__crash_analytics", source: "quality_infra", target: "crash_analytics", label: "包含" },
    { id: "quality_infra__包含__certification_toolkit", source: "quality_infra", target: "certification_toolkit", label: "包含" },

    { id: "data_insight__包含__telemetry_platform", source: "data_insight", target: "telemetry_platform", label: "包含" },
    { id: "data_insight__包含__playtest_analytics", source: "data_insight", target: "playtest_analytics", label: "包含" },
    { id: "data_insight__包含__combat_heatmap", source: "data_insight", target: "combat_heatmap", label: "包含" },
    { id: "data_insight__包含__funnel_dashboard", source: "data_insight", target: "funnel_dashboard", label: "包含" },
    { id: "data_insight__包含__launch_dashboard", source: "data_insight", target: "launch_dashboard", label: "包含" },

    { id: "ai_workflow__包含__ai_concept_art", source: "ai_workflow", target: "ai_concept_art", label: "包含" },
    { id: "ai_workflow__包含__ai_npc_dialogue", source: "ai_workflow", target: "ai_npc_dialogue", label: "包含" },
    { id: "ai_workflow__包含__ai_qa_assistant", source: "ai_workflow", target: "ai_qa_assistant", label: "包含" },
    { id: "ai_workflow__包含__ai_localization", source: "ai_workflow", target: "ai_localization", label: "包含" },
    { id: "ai_workflow__包含__copilot_for_scripts", source: "ai_workflow", target: "copilot_for_scripts", label: "包含" },
    { id: "ai_workflow__包含__procedural_assist", source: "ai_workflow", target: "procedural_assist", label: "包含" },

    { id: "arpg_constraints__包含__combat_data_model", source: "arpg_constraints", target: "combat_data_model", label: "包含" },
    { id: "arpg_constraints__包含__encounter_design_tool", source: "arpg_constraints", target: "encounter_design_tool", label: "包含" },
    { id: "arpg_constraints__包含__progression_curve", source: "arpg_constraints", target: "progression_curve", label: "包含" },
    { id: "arpg_constraints__包含__hakoniwa_level_ops", source: "arpg_constraints", target: "hakoniwa_level_ops", label: "包含" },
    { id: "arpg_constraints__包含__animation_combat_sync", source: "arpg_constraints", target: "animation_combat_sync", label: "包含" },

    { id: "benchmark_cases__包含__black_myth_wukong", source: "benchmark_cases", target: "black_myth_wukong", label: "包含" },

    // ─── 跨模块关系边 ────────────────────────────────────────
    { id: "project_management__包含__sprint_workboard", source: "project_management", target: "sprint_workboard", label: "包含" },
    { id: "design_doc_hub__依赖__spreadsheet_pipeline", source: "design_doc_hub", target: "spreadsheet_pipeline", label: "依赖" },
    { id: "spreadsheet_pipeline__依赖__numeric_config_cms", source: "spreadsheet_pipeline", target: "numeric_config_cms", label: "依赖" },
    { id: "numeric_config_cms__依赖__combat_balance_tool", source: "numeric_config_cms", target: "combat_balance_tool", label: "依赖" },
    { id: "numeric_config_cms__依赖__economy_simulator", source: "numeric_config_cms", target: "economy_simulator", label: "依赖" },
    { id: "combat_data_model__约束__combat_balance_tool", source: "combat_data_model", target: "combat_balance_tool", label: "约束" },
    { id: "combat_data_model__约束__numeric_config_cms", source: "combat_data_model", target: "numeric_config_cms", label: "约束" },
    { id: "encounter_design_tool__依赖__level_editor_platform", source: "encounter_design_tool", target: "level_editor_platform", label: "依赖" },
    { id: "animation_combat_sync__依赖__animation_pipeline", source: "animation_combat_sync", target: "animation_pipeline", label: "依赖" },
    { id: "hakoniwa_level_ops__约束__level_editor_platform", source: "hakoniwa_level_ops", target: "level_editor_platform", label: "约束" },
    { id: "progression_curve__约束__numeric_config_cms", source: "progression_curve", target: "numeric_config_cms", label: "约束" },
    { id: "dcc_integration__依赖__asset_pipeline", source: "dcc_integration", target: "asset_pipeline", label: "依赖" },
    { id: "vendor_collaboration__依赖__asset_pipeline", source: "vendor_collaboration", target: "asset_pipeline", label: "依赖" },
    { id: "cross_discipline_review__门禁__combat_balance_tool", source: "cross_discipline_review", target: "combat_balance_tool", label: "门禁" },
    { id: "cross_discipline_review__门禁__level_editor_platform", source: "cross_discipline_review", target: "level_editor_platform", label: "门禁" },
    { id: "ci_cd_pipeline__门禁__build_farm", source: "ci_cd_pipeline", target: "build_farm", label: "门禁" },
    { id: "automated_qa__依赖__ci_cd_pipeline", source: "automated_qa", target: "ci_cd_pipeline", label: "依赖" },
    { id: "spreadsheet_pipeline__门禁__ci_cd_pipeline", source: "spreadsheet_pipeline", target: "ci_cd_pipeline", label: "门禁" },
    { id: "telemetry_platform__洞察__funnel_dashboard", source: "telemetry_platform", target: "funnel_dashboard", label: "洞察" },
    { id: "telemetry_platform__洞察__combat_heatmap", source: "telemetry_platform", target: "combat_heatmap", label: "洞察" },
    { id: "playtest_analytics__洞察__combat_balance_tool", source: "playtest_analytics", target: "combat_balance_tool", label: "洞察" },
    { id: "playtest_analytics__依赖__ab_experiment_platform", source: "playtest_analytics", target: "ab_experiment_platform", label: "依赖" },
    { id: "crash_analytics__洞察__launch_dashboard", source: "crash_analytics", target: "launch_dashboard", label: "洞察" },
    { id: "funnel_dashboard__洞察__hakoniwa_level_ops", source: "funnel_dashboard", target: "hakoniwa_level_ops", label: "洞察" },
    { id: "ai_concept_art__赋能__asset_pipeline", source: "ai_concept_art", target: "asset_pipeline", label: "赋能" },
    { id: "procedural_assist__赋能__level_editor_platform", source: "procedural_assist", target: "level_editor_platform", label: "赋能" },
    { id: "copilot_for_scripts__赋能__narrative_cms", source: "copilot_for_scripts", target: "narrative_cms", label: "赋能" },
    { id: "ai_npc_dialogue__赋能__narrative_cms", source: "ai_npc_dialogue", target: "narrative_cms", label: "赋能" },
    { id: "ai_localization__赋能__vendor_collaboration", source: "ai_localization", target: "vendor_collaboration", label: "赋能" },
    { id: "ai_qa_assistant__赋能__automated_qa", source: "ai_qa_assistant", target: "automated_qa", label: "赋能" },
    { id: "black_myth_wukong__案例__asset_pipeline", source: "black_myth_wukong", target: "asset_pipeline", label: "案例" },
    { id: "black_myth_wukong__案例__numeric_config_cms", source: "black_myth_wukong", target: "numeric_config_cms", label: "案例" },
    { id: "black_myth_wukong__案例__telemetry_platform", source: "black_myth_wukong", target: "telemetry_platform", label: "案例" },
    { id: "black_myth_wukong__案例__combat_balance_tool", source: "black_myth_wukong", target: "combat_balance_tool", label: "案例" },
    { id: "black_myth_wukong__案例__combat_heatmap", source: "black_myth_wukong", target: "combat_heatmap", label: "案例" },
    { id: "ui_asset_workflow__依赖__asset_pipeline", source: "ui_asset_workflow", target: "asset_pipeline", label: "依赖" },
    { id: "certification_toolkit__门禁__build_farm", source: "certification_toolkit", target: "build_farm", label: "门禁" },

    // ─── 学习路径边（先修）────────────────────────────────────
    { id: "collab_foundation__先修__asset_content_pipeline", source: "collab_foundation", target: "asset_content_pipeline", label: "先修" },
    { id: "asset_content_pipeline__先修__config_platform", source: "asset_content_pipeline", target: "config_platform", label: "先修" },
    { id: "config_platform__先修__quality_infra", source: "config_platform", target: "quality_infra", label: "先修" },
    { id: "quality_infra__先修__data_insight", source: "quality_infra", target: "data_insight", label: "先修" },
    { id: "data_insight__先修__arpg_constraints", source: "data_insight", target: "arpg_constraints", label: "先修" },
    { id: "arpg_constraints__先修__ai_workflow", source: "arpg_constraints", target: "ai_workflow", label: "先修" },
    { id: "ai_workflow__先修__benchmark_cases", source: "ai_workflow", target: "benchmark_cases", label: "先修" },
    { id: "sprint_workboard__先修__design_doc_hub", source: "sprint_workboard", target: "design_doc_hub", label: "先修" },
    { id: "design_doc_hub__先修__cross_discipline_review", source: "design_doc_hub", target: "cross_discipline_review", label: "先修" },
    { id: "asset_pipeline__先修__dcc_integration", source: "asset_pipeline", target: "dcc_integration", label: "先修" },
    { id: "dcc_integration__先修__animation_pipeline", source: "dcc_integration", target: "animation_pipeline", label: "先修" },
    { id: "telemetry_platform__先修__playtest_analytics", source: "telemetry_platform", target: "playtest_analytics", label: "先修" },
    { id: "combat_data_model__先修__animation_combat_sync", source: "combat_data_model", target: "animation_combat_sync", label: "先修" },
  ],
};

const gameStudioTypeStyles: Record<string, NodeTypeStyle> = {
  overview: {
    base: "#c9a227",
    glow: "rgba(201, 162, 39, 0.32)",
    label: "总览",
  },
  foundation: {
    base: "#4a86c4",
    glow: "rgba(74, 134, 196, 0.30)",
    label: "协作底座",
  },
  pipeline: {
    base: "#3fa889",
    glow: "rgba(63, 168, 137, 0.30)",
    label: "资产管线",
  },
  config: {
    base: "#e08a3c",
    glow: "rgba(224, 138, 60, 0.30)",
    label: "配置平台",
  },
  quality: {
    base: "#9b6dc4",
    glow: "rgba(155, 109, 196, 0.30)",
    label: "质量构建",
  },
  data: {
    base: "#d4a838",
    glow: "rgba(212, 168, 56, 0.32)",
    label: "数据洞察",
  },
  ai: {
    base: "#3d9ebf",
    glow: "rgba(61, 158, 191, 0.30)",
    label: "AI赋能",
  },
  arpg: {
    base: "#d05036",
    glow: "rgba(208, 80, 54, 0.30)",
    label: "ARPG特化",
  },
  case: {
    base: "#8a8a7a",
    glow: "rgba(138, 138, 122, 0.28)",
    label: "标杆案例",
  },
};

const gameStudioTypeOrder: string[] = [
  "overview",
  "foundation",
  "pipeline",
  "config",
  "quality",
  "data",
  "ai",
  "arpg",
  "case",
];

export const gameStudioMap: KnowledgeMap = {
  id: "game-studio",
  label: "游戏研发中台",
  subtitle: "入门到精通 · ARPG 工作室中后台 PM",
  data: gameStudioGraphData,
  typeStyles: gameStudioTypeStyles,
  typeOrder: gameStudioTypeOrder,
  typeArchetypes: {
    overview: "category",
    foundation: "concept",
    technique: "mechanism",
    pipeline: "mechanism",
    ai: "mechanism",
    quality: "concept",
    config: "entity",
    scenario: "practice",
    data: "mechanism",
    core: "category",
  },
  preferredSeed: "studio_platform",
  group: "interest",
  domain: "game-dev",
};
