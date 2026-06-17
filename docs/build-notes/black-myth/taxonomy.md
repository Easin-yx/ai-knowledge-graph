# 黑神话悟空 · 双视角图谱大纲（taxonomy）

> 人类可读大纲，镜像 `src/data/maps/black-myth.ts` 的节点结构。
> C 端 = 玩家 / 游戏 PM 视角（卡片正面）；B 端 = 中后台 PM 视角（卡片背面）。

## 根
- `black_myth_wukong` 黑神话悟空（总览）

## ① 定位与大盘策略 (strategy)
- `category_positioning` 品类定位（箱庭式 ARPG）
- `target_users` 目标用户（硬核 + 泛西游 IP）
- `marketing_milestones` 营销节点（820 实机汇报 / MVP）

## ② 核心玩法循环 (gameplay)
- `core_gameplay_loop` 核心玩法循环
  - `loop_explore` 探索
  - `loop_progress` 养成
  - `loop_combat` 挑战（心流）
  - `loop_reward` 奖励

## ③ 双轨制经济与成长 (economy)
- `dual_track_economy` 双轨制经济
  - `lingyun_currency` 灵蕴（金币）
    - `death_no_penalty` 死亡零惩罚
  - `lingguang_points` 灵光点（技能经验）
    - `meditation_cushion` 打坐蒲团
    - `free_respec` 无代价洗点

## ④ 战斗数值与机制 (combat)
- `combat_system` 战斗系统
  - `base_resource_gauges` 基础资源槽（HP/SP/MP）
  - `gunshi_meter` 棍势值
  - `resolute_strike` 识破
  - `modular_gourd` 模块化葫芦

## ⑤ UI 交互与视觉体验 (ux)
- `ux_ui_design` UI 交互与视觉
  - `combat_hud` 战斗 HUD
  - `system_menu` 系统菜单
  - `micro_feedback` 微反馈交互

## ⑥ 中后台能力网（B 端独立节点 · platform）
- `data_dashboard` 用户数据大屏 ← 目标用户 / 营销节点
- `localization_platform` 本地化协作平台 ← 营销节点
- `telemetry_platform` 行为埋点中台 ← 核心循环 / 挑战
- `numeric_config_cms` 数值配置后台（CMS）← 双轨经济 / 灵蕴 / 灵光点
- `anti_inflation_tool` 防通胀测算工具 ← 灵蕴
- `combat_balance_tool` 战斗平衡测试工具 ← 战斗系统 / 棍势 / 识破
- `combat_heatmap` 战斗行为热力图 ← 挑战 / 识破
- `asset_pipeline` 美术资产管理管线 ← UI 视觉 / 系统菜单 / 微反馈

## 关系类型
- `包含`：层级归属（根 → 模块 → 子节点）
- `支撑`：C 端体验 → B 端中后台系统（映射边）
