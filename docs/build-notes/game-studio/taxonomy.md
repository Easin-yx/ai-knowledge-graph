# 游戏研发中台 · 图谱大纲（taxonomy）

> 人类可读大纲，镜像 `src/data/maps/game-studio.ts` 的节点结构。  
> 视角：游戏开发团队的中后台产品经理。

## 根
- `studio_platform` 游戏研发中台（总览 · 含三阶段学习路线）

## ① 研发协作底座 (foundation)
- `collab_foundation` 研发协作底座
  - `project_management` 项目管理系统
  - `sprint_workboard` 迭代看板
  - `design_doc_hub` 策划文档中枢
  - `cross_discipline_review` 跨职能评审流程
  - `vendor_collaboration` 外包协同门户

## ② 资产与内容管线 (pipeline)
- `asset_content_pipeline` 资产与内容管线
  - `asset_pipeline` 美术资产管理管线（DAM）
  - `dcc_integration` 三维软件接入（DCC）
  - `animation_pipeline` 动捕与动画管线
  - `level_editor_platform` 关卡编辑器中台
  - `narrative_cms` 叙事任务配置台
  - `ui_asset_workflow` UI 切图工作流

## ③ 数值与配置平台 (config)
- `config_platform` 数值与配置平台
  - `numeric_config_cms` 数值配置后台
  - `spreadsheet_pipeline` 策划表流水线
  - `combat_balance_tool` 战斗平衡测试工具
  - `economy_simulator` 经济产消模拟器
  - `ab_experiment_platform` 玩法 A/B 实验平台

## ④ 质量与构建基础设施 (quality)
- `quality_infra` 质量与构建基础设施
  - `build_farm` 构建农场
  - `ci_cd_pipeline` 自动构建合并检查（CI/CD）
  - `automated_qa` 自动化测试
  - `crash_analytics` 崩溃与性能监控
  - `certification_toolkit` 平台认证检查工具

## ⑤ 数据与洞察中台 (data)
- `data_insight` 数据与洞察中台
  - `telemetry_platform` 玩家行为采集（埋点）
  - `playtest_analytics` 内部试玩分析
  - `combat_heatmap` 战斗行为热力图
  - `funnel_dashboard` 关卡漏斗看板
  - `launch_dashboard` 发售后大盘

## ⑥ AI 赋能研发工作流 (ai)
- `ai_workflow` AI 赋能研发工作流
  - `ai_concept_art` AI 概念原画辅助
  - `ai_npc_dialogue` AI NPC 对话生成
  - `ai_qa_assistant` AI 辅助测试
  - `ai_localization` AI 翻译初稿
  - `copilot_for_scripts` 引擎内 AI 编程辅助
  - `procedural_assist` 程序化关卡辅助

## ⑦ ARPG 品类特化约束 (arpg)
- `arpg_constraints` ARPG 品类特化
  - `combat_data_model` 战斗数据模型
  - `encounter_design_tool` 遭遇战编排工具
  - `progression_curve` 成长曲线管理
  - `hakoniwa_level_ops` 箱庭关卡运营
  - `animation_combat_sync` 动作-打击帧对齐

## ⑧ 标杆案例 (case)
- `benchmark_cases` 标杆案例
  - `black_myth_wukong` 黑神话悟空（→ 切换黑神话图谱）

## 关系类型
- `包含` · `依赖` · `门禁` · `洞察` · `约束` · `赋能` · `案例` · `先修`
