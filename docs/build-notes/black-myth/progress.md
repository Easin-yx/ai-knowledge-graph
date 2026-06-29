# 黑神话悟空图谱 · 进度记录（progress）

## 目标
用「C 端玩家 / 游戏 PM 视角」+「B 端中后台 PM 视角」双视角拆解《黑神话：悟空》，
落成 app 内的第 4 个知识图谱领域 `black-myth`。核心交互：节点详情卡片 3D 翻转，
正面 C 端、背面 B 端。

## 数据来源
- 草稿：`docs/build-notes/black-myth.md`
- 执行蓝图：`docs/build-notes/black-myth/PLAN.md`

## 已完成（第 1 批 · 建域 + 双视角骨架）
- [x] `src/types/index.ts`：`details` 新增可选 `backstage` 块
- [x] `src/data/maps/black-myth.ts`：31 节点 + 39 边 + 7 类型调色板 + map 导出
- [x] `src/data/maps/index.ts`：注册 `blackMythMap`
- [x] `src/components/NodeDetailContent.tsx`：3D 翻转卡片 + C/B 切换控件
- [x] `src/index.css`：翻转工具类（`.akg-flip` 等）
- [x] `docs/build-notes/black-myth/` 三件套

## 节点结构
- 根 1 + 5 大模块（含子节点）+ 8 个 B 端中后台节点 = 31 节点
- 层级边 `包含` 22 条 + 映射边 `支撑` 17 条 = 39 边
- 所有 C 端节点与 B 端节点均填写 `details.backstage`

## 已完成（第 2 批 · 覆盖率门禁）
- [x] `scripts/taxonomy.ts`：新增 `BLACK_MYTH_TAXONOMY` 并登记到 `TAXONOMY_REGISTRY`
- [x] `package.json`：新增 `check-coverage:black-myth`
- [x] `npm run check-coverage:black-myth` 覆盖 32/32（100%），core 缺口 0

## 已完成（第 3 批 · L2 双视角完整性门禁上线）
- [x] `scripts/validate-graph.ts`：新增 black-myth 专属 4 条规则（仅对 `black-myth` 图触发）
  - `bm-missing-backstage`（error）：每节点必须有非空 `backstage.summary`
  - `bm-platform-no-support-in`（error）：每个 `platform` 节点必须有 ≥1 条「支撑」入边
  - `bm-cend-no-mapping`（warning）：C 端节点（含层级父）应有到 platform 的「支撑」映射
  - `bm-backstage-thin`（warning）：`backstage.summary` < 10 字视为占位灌水
- [x] `npm run validate` 回归：black-myth **0 error**，1 warning（`category_positioning` 暂无映射，warning 级不阻断）
- [x] `npm run lint` + `npm run check-coverage:black-myth`（core 0）全过
- 备注：`bm-cend-no-mapping` 允许「父节点已映射」算覆盖，避免逼出硬凑边（见 LOOP.md 第 2 节）

## 已完成（第 4 批 · L3 第 1 轮：④ 战斗领域评分卡）
- 说明：因子 Agent（Task）受账单限制不可用，本轮经作者同意采用「主 Agent 自评」降级方案（评审偏宽，已知局限）。
- 评级（5 节点 × 5 维度）：`combat_system` / `base_resource_gauges` / `gunshi_meter` 基本通过；
  `resolute_strike`、`modular_gourd` 有 待改 项，已修。
- 本轮改动（一个可 review 的 diff）：
  - [x] `resolute_strike`：summary 去掉误导性「击穿回合制」→「抓住敌人攻击的破绽反击」；
    backstage 把「全服成功率/微调判定帧」软化为推断口吻（单机买断游戏遥测为合理推断）。
  - [x] `modular_gourd`：notes 标明「容器/逻辑/插件」是产品视角抽象、非游戏官方术语；
    新增真实映射边 `modular_gourd__支撑__numeric_config_cms`（葫芦组合确由数值配置后台驱动）。
- [x] 三件套门禁全过：`validate` 0 error（32 节点/41 边）· `lint` 干净 · `check-coverage` 32/32 core 0。
- [x] 遗留项进 `low_confidence.md`：B 端工具「推断」标注统一口径、单机 vs「全服数据」张力。

## 已完成（第 5 批 · L3 第 2 轮：③ 双轨制经济与成长）
- 评级：6 节点准确性普遍扎实（死亡零惩罚正确写成「不掉金币」、避开评分卡点名的坑）。
- 本轮改动（一个可 review 的 diff）：
  - [x] `meditation_cushion`：修正事实错误「强制休息」→「提供可主动歇脚的休整点」（黑神话打坐/蒲团是可选主动行为，非强制）。
- 其余 5 节点（双轨经济 / 灵蕴 / 死亡零惩罚 / 灵光点 / 无代价洗点）5 维度全通过，无需改。
- [x] 三件套门禁全过：`validate` 0 error（32 节点/41 边）· `lint` 干净 · `check-coverage` 32/32 core 0。

## 已完成（第 6 批 · L3 第 3 轮：② 玩法 / ① 定位 / ⑤ UI / ⑥ 中后台 一次过）
- ② 核心玩法循环（5）：探索/养成/挑战/奖励/循环 — 5 维度全通过，未动。
- ① 定位与大盘策略（3）：品类定位/目标用户/营销节点 — 全通过，未动
  （`category_positioning` 无映射的 L2 warning 经作者决定保留，不补硬凑边）。
- ⑤ UI 交互与视觉（4）：UI视觉/战斗HUD/系统菜单/微反馈 — 全通过，未动。
- ⑥ 中后台能力网（8）+ 根节点：本轮改动如下
  - [x] 根节点 backstage：补一句**推断总声明**「图中具体 B 端工具形态属合理推断、非官方披露」，
    据此采用「做法二」：全图不逐节点重复标推断，靠根节点 + low_confidence 统一声明。
  - [x] `combat_heatmap`：「记录**全服**玩家…」→「记录玩家（**基于遥测授权样本**）…」，
    与上一轮 `resolute_strike` 的口径保持一致（单机买断游戏无真正『全服』实时数据）。
- [x] 三件套门禁全过：`validate` 0 error（32 节点/41 边）· `lint` 干净 · `check-coverage` 32/32 core 0。

## L3 阶段二完成情况
- 已逐领域跑完 ④③②①⑤⑥ 全 6 个领域 + 根节点的评分卡评审。
- 仅 `category_positioning` 保留 1 条 L2 warning（作者决定接受）。
- 遗留人工裁决项见 `low_confidence.md`（推断口径已采纳做法二、单机 vs 全服数据张力、子机制是否再拆）。

## 已完成（维护 Loop · 轮 1 · 2026-06-24）
> 按 `docs/build-notes/maintenance-loop.md` 自驱动巡检执行。
- 类别：L（逻辑缜密性 / 双视角完整性）
- 问题：`bm-cend-no-mapping` warning —— `category_positioning`（及父节点 `black_myth_wukong`）是唯一无「支撑」映射边的 C 端业务节点，双视角不完整。
- 确认依据：`npm run validate` black-myth 段唯一 warning；该节点 `backstage` 已点名其中后台支撑（关卡编辑器 / 资源加载 / 性能预算），但图中无对应 platform。
- 修法（非硬凑）：补一个 backstage 已点名的真实中后台 platform 节点 `level_perf_toolchain`（关卡与性能工具链）+ 边 `category_positioning__支撑__level_perf_toolchain`。
  - 区别于第 6 批「保留 warning 不补硬凑边」：彼时无合适 platform、硬连现有节点才算硬凑；本轮是新建该节点 backstage 本就描述的合法中后台，属补全而非硬凑。
- 自验：`validate` 0 error / **0 warning**（33 节点/42 边，platform 9）· `lint` 干净 · `check-coverage:black-myth` 32/32 core 0。
- 残留：无（无新增 low_confidence 项）。

## 已完成（结构整改批次 · 技能体系重构 + 用户体验补全）
- 本轮目标：按《黑神话图谱结构整改计划》落实「结构严谨 + 玩家体验补全 + 高可信来源白名单」。
- 数据面改动（`src/data/maps/black-myth.ts`）：
  - [x] 新增 `combat_skill_system` Hub，统一承载棍法 / 法术 / 变化 / 法宝 / 召唤与精魄五大分支。
  - [x] 棍法完成深拆（8+ 子节点）：三棍法、棍势成长、切手技、识破链路、追击链路、切棍策略、加点路径。
  - [x] 新增技能分支节点：`spell_system`、`transformation_system`、`vessel_system`、`summon_spirit_system` 及其核心示例节点。
  - [x] `ux_ui_design` 升级为「用户体验（交互+内容）」并补齐 4 个玩家向节点：
    `narrative_worldview`、`chapter_journey`、`audiovisual_immersion`、`build_expression`。
  - [x] `build_expression` 与技能体系职责解耦：前者只讲玩家打法表达，机制细节收敛到 `combat_skill_system`。
- 来源口径（白名单）：
  - [x] 新增并使用官网 / BWiki / Game8 / Maxroll 的显式 source 常量。
  - [x] 棍法与全技能分支均写入可追溯 source，避免无依据扩写。
- 关系治理：
  - [x] 增补分层 `包含` 边，避免技能节点平铺。
  - [x] 增补关键 `支撑` 映射边到 `combat_balance_tool` / `numeric_config_cms` / `telemetry_platform` / `asset_pipeline` / `localization_platform`。
  - [x] 扇出优化：清理冗余映射边，消除黑神话图 `high-fanout` warning。
- 文档同步：
  - [x] `taxonomy.md` 同步新结构（技能 Hub + 用户体验子树）。
  - [x] `low_confidence.md` 更新待定项与来源白名单决策。
- 验证结果：
  - [x] `npm run validate`：black-myth **0 error / 1 warning**（仅 `skeleton-fragmented`，与平台节点非骨架挂接策略相关）。
  - [x] `npm run lint`：通过。
  - [x] `npm run check-coverage:black-myth`：32/32（100%）通过。

## 已完成（P1 收敛批次 · 类比边界 + 角色模板）
- 本轮目标：按 `OWNER_VISION` 的 P1 要求收敛内容可读性，降低“硬类比”并减少默认模板触发。
- 数据面改动（`src/data/maps/black-myth.ts`）：
  - [x] 清理不适配节点的 `analogy`：
    - 平台工具节点（`data_dashboard`、`numeric_config_cms`、`combat_heatmap` 等）默认移除类比；
    - 参数型节点（`base_resource_gauges`、`focus_point_progression`）移除类比并转为更事实化描述。
  - [x] 补充角色映射，减少默认模板触发：
    - `strategy -> category`
    - `gameplay -> concept`
    - `ux -> practice`
    - 保留 `combat -> mechanism`、`platform -> entity`、`overview -> category`。
  - [x] 参数型节点补 `card` 覆盖（如 `base_resource_gauges`、`focus_point_progression`），确保详情卡呈现风格符合节点角色。
- 结构展示复核：
  - [x] 复核 `skeleton-fragmented` warning：black-myth 仍为 1 条 warning（平台节点通过映射边挂接导致），本轮接受该设计，不补噪音骨架边。
- 验证结果：
  - [x] `npm run validate`：black-myth **0 error / 1 warning**（接受，见上）。
  - [x] `npm run lint`：通过。
  - [x] `npm run check-coverage:black-myth`：32/32（100%）通过。

## 下一步（可选）
- [ ] 作者终审整版 diff；如认可即视为「这一版严谨」达标（L0/L1/L2 全绿 + L3 全领域走过）。
- [ ] 如需更深：识破/棍势/葫芦子机制再拆、补运营期 B 端系统（见 low_confidence）。
- [ ] 细化 `识破`/`棍势`/`模块化葫芦` 的子机制（如需更深粒度）
- [ ] 补充更多 B 端中后台系统（如客服工单、热更新发布、反作弊等，若版本扩展）

## 每轮循环约定
1. 选定一个模块/批次
2. 在 `black-myth.ts` 增删节点与边（保持双视角完整）
3. `npm run validate` + `npm run lint` 跑干净
4. 作者审阅 diff
5. 更新本文件
