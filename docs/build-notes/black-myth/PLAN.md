# 《黑神话：悟空》双视角知识图谱 — 执行计划

> 本文档是一次性执行蓝图：确认后即可按「执行步骤」从上到下做完，并用「验收标准」逐条核验。
> 数据来源草稿：`docs/build-notes/black-myth.md`

---

## 0. 目标与背景

在现有力导向知识图谱 app 中**新增第 4 个领域 `black-myth`**，从中后台产品经理（B 端）+ 游戏产品经理（C 端）双视角拆解《黑神话：悟空》。

核心交互诉求：**一个节点同时承载 C 端与 B 端**。
- 点开节点默认看到 **C 端（玩家体验 / 游戏 PM 视角）**；
- 卡片 **3D 翻转**后看到 **B 端（中后台 / 数值·配置·数据视角）**；
- 翻转风格与现有玻璃拟态深色风格保持一致。

---

## 1. 总体方案：C 端主干 + B 端中后台能力网（双层结构）

- **C 端节点（玩家体验层）**：卡片正面 = C 端拆解；背面 = 该功能背后的 B 端思考要点 + 指向对应中后台系统的提示。
- **B 端节点（中后台能力层）**：数据大屏 / 埋点中台 / 配置后台等**自身也是独立节点**，彼此/与 C 端节点用 `支撑 / 映射` 边连接，形成一张可漫游的「中后台能力网」。

这样既有「点一个 C 端节点·翻面看 B 端」的快速对照，也有一张独立成图的中后台能力网。

---

## 2. 数据模型变更（向后兼容）

在 `src/types/index.ts` 的 `KnowledgeNode.details` 上新增**可选** `backstage` 块。ai / pm / grammar 不填，零影响。

```ts
details: {
  zh_label?: string;
  summary: string;          // C 端：对玩家是什么
  analogy?: string;         // C 端：通俗类比
  notes?: string;           // C 端：机制 / 数值 / 心流设计意图
  key_concepts?: string[];
  source?: NodeSource;
  // ↓ 新增：B 端中后台视角（仅 black-myth 使用）
  backstage?: {
    summary: string;        // B 端：背后需要什么中后台能力
    notes?: string;         // B 端：配置表 / 埋点 / 数据大屏 / 资产管线的产品思考
    key_concepts?: string[];
  };
}
```

---

## 3. UI 变更：3D 翻转卡片

在 `src/components/NodeDetailContent.tsx`：
- 当且仅当 `node.details.backstage` 存在时，卡片顶部出现切换控件：**「C端·玩家体验 / B端·中后台」**。
- 切换触发卡片绕 Y 轴 3D 翻转（CSS `transform: rotateY(180deg)` + `transform-style: preserve-3d` + `backface-visibility: hidden`）。
- 正面渲染现有 C 端区块；背面渲染 B 端 `backstage` 的 摘要 / 笔记 / 关键概念。
- 「关联节点」「来源」「收起此节点」保留在正面（或翻转容器之外），避免背面信息过载。
- 视觉沿用现有 `--glass-border` / `--akg-text` 等 CSS 变量与圆角、毛玻璃风格。
- 切换其它节点时，翻转态复位为正面（C 端）。

> 兼容性：没有 `backstage` 的节点（ai/pm/grammar）不显示切换控件，渲染逻辑与现在完全一致。

---

## 4. 节点全景（约 35 个节点）

类型（`type`）：`overview` / `strategy` / `gameplay` / `economy` / `combat` / `ux` / `platform`。

| # | id | label（图上显示） | type | 有 backstage |
|---|----|------|------|:---:|
| 0 | `black_myth_wukong` | 黑神话悟空 | overview | ✓ |
| **① 定位与大盘策略** |
| 1 | `category_positioning` | 品类定位 | strategy | ✓ |
| 2 | `target_users` | 目标用户 | strategy | ✓ |
| 3 | `marketing_milestones` | 营销节点(820) | strategy | ✓ |
| **② 核心玩法循环** |
| 4 | `core_gameplay_loop` | 核心玩法循环 | gameplay | ✓ |
| 5 | `loop_explore` | 探索 | gameplay | ✓ |
| 6 | `loop_progress` | 养成 | gameplay | ✓ |
| 7 | `loop_combat` | 挑战(心流) | gameplay | ✓ |
| 8 | `loop_reward` | 奖励 | gameplay | ✓ |
| **③ 双轨制经济与成长** |
| 9 | `dual_track_economy` | 双轨制经济 | economy | ✓ |
| 10 | `lingyun_currency` | 灵蕴(金币) | economy | ✓ |
| 11 | `death_no_penalty` | 死亡零惩罚 | economy | ✓ |
| 12 | `lingguang_points` | 灵光点(技能经验) | economy | ✓ |
| 13 | `meditation_cushion` | 打坐蒲团 | economy | ✓ |
| 14 | `free_respec` | 无代价洗点 | economy | ✓ |
| **④ 战斗数值与机制** |
| 15 | `combat_system` | 战斗系统 | combat | ✓ |
| 16 | `base_resource_gauges` | 基础资源槽(HP/SP/MP) | combat | ✓ |
| 17 | `gunshi_meter` | 棍势值 | combat | ✓ |
| 18 | `resolute_strike` | 识破 | combat | ✓ |
| 19 | `modular_gourd` | 模块化葫芦 | combat | ✓ |
| **⑤ UI 交互与视觉体验** |
| 20 | `ux_ui_design` | UI交互与视觉 | ux | ✓ |
| 21 | `combat_hud` | 战斗HUD | ux | ✓ |
| 22 | `system_menu` | 系统菜单 | ux | ✓ |
| 23 | `micro_feedback` | 微反馈交互 | ux | ✓ |
| **⑥ 中后台能力网（B 端独立节点）** |
| 24 | `data_dashboard` | 用户数据大屏 | platform | ✓ |
| 25 | `localization_platform` | 本地化协作平台 | platform | ✓ |
| 26 | `telemetry_platform` | 行为埋点中台 | platform | ✓ |
| 27 | `numeric_config_cms` | 数值配置后台(CMS) | platform | ✓ |
| 28 | `anti_inflation_tool` | 防通胀测算工具 | platform | ✓ |
| 29 | `combat_balance_tool` | 战斗平衡测试工具 | platform | ✓ |
| 30 | `combat_heatmap` | 战斗行为热力图 | platform | ✓ |
| 31 | `asset_pipeline` | 美术资产管理管线 | platform | ✓ |

> platform 节点的卡片：正面 = 系统/工具概述（站在中后台 PM 角度），背面 `backstage` = 它支撑了哪些 C 端体验 / 关键 PRD 要点。

`preferredSeed` = `black_myth_wukong`。

---

## 5. 边清单

### 5.1 层级边（`包含`，directed）
- `black_myth_wukong` → 5 大模块根：`category_positioning` 同级聚合用「定位与大盘策略」可不单独建模块节点，**采用扁平：根直接包含各模块的代表节点**。为避免孤儿，统一规则如下：
  - 根 → `category_positioning` / `target_users` / `marketing_milestones`
  - 根 → `core_gameplay_loop`；`core_gameplay_loop` → `loop_explore` / `loop_progress` / `loop_combat` / `loop_reward`
  - 根 → `dual_track_economy`；`dual_track_economy` → `lingyun_currency` / `lingguang_points`
    - `lingyun_currency` → `death_no_penalty`
    - `lingguang_points` → `meditation_cushion` / `free_respec`
  - 根 → `combat_system`；`combat_system` → `base_resource_gauges` / `gunshi_meter` / `resolute_strike` / `modular_gourd`
  - 根 → `ux_ui_design`；`ux_ui_design` → `combat_hud` / `system_menu` / `micro_feedback`

### 5.2 映射边（`支撑`，directed，C 端 → B 端）
- `target_users` / `marketing_milestones` → `data_dashboard`
- `marketing_milestones` → `localization_platform`
- `core_gameplay_loop`（及 `loop_combat`）→ `telemetry_platform`
- `dual_track_economy`（及 `lingyun_currency` / `lingguang_points`）→ `numeric_config_cms`
- `lingyun_currency` → `anti_inflation_tool`
- `combat_system`（及 `gunshi_meter` / `resolute_strike`）→ `combat_balance_tool`
- `loop_combat` / `resolute_strike` → `combat_heatmap`
- `ux_ui_design`（及 `system_menu` / `micro_feedback`）→ `asset_pipeline`

### 5.3 边 id 约定
`source__关系__target`，例：`core_gameplay_loop__支撑__telemetry_platform`。

> 所有节点至少 1 条边（无孤儿）；platform 节点通过映射边接入。

---

## 6. 配色（typeStyles / typeOrder）

新建独立深色调色板（与 ai/pm 区分，水墨/国风暖金倾向）：
- `overview` 金、`strategy` 朱红、`gameplay` 青、`economy` 暖橙、`combat` 赤、`ux` 紫、`platform` 钢蓝（中后台冷色，和 C 端暖色形成视觉对照）。
- `typeOrder` = `[overview, strategy, gameplay, economy, combat, ux, platform]`。

---

## 7. 文件改动清单

| 文件 | 改动 |
|------|------|
| `src/types/index.ts` | `details` 增加可选 `backstage` |
| `src/components/NodeDetailContent.tsx` | 3D 翻转 + C/B 切换（仅有 backstage 时） |
| `src/index.css`（如需） | 翻转所需 perspective / preserve-3d 工具类 |
| `src/data/maps/black-myth.ts` | 新建：节点 + 边 + typeStyles + typeOrder + map 导出 |
| `src/data/maps/index.ts` | 注册 `blackMythMap` |
| `docs/build-notes/black-myth/taxonomy.md` | 新建：人类可读大纲（镜像本计划节点） |
| `docs/build-notes/black-myth/progress.md` | 新建：循环进度记录 |
| `docs/build-notes/black-myth/low_confidence.md` | 新建：低置信度待定项队列 |
| `scripts/taxonomy.ts`（可选） | 注册 `BLACK_MYTH_TAXONOMY` |
| `scripts/validate-graph.ts`（可选） | 将 `black-myth` 纳入内容风格校验 |
| `package.json`（可选） | 加 `check-coverage:black-myth` |

---

## 8. 执行步骤（顺序）

1. 扩展 `src/types/index.ts` 的 `backstage` 类型。
2. 新建 `src/data/maps/black-myth.ts`：按第 4/5/6 节写齐 31 个节点（含 C 端 + backstage 内容）与全部边、调色板、map 导出。
3. 在 `src/data/maps/index.ts` 注册到 `KNOWLEDGE_MAPS`。
4. 改 `NodeDetailContent.tsx` 实现 3D 翻转 + C/B 切换；必要时在 `index.css` 加工具类。
5. 建 `docs/build-notes/black-myth/` 三件套（taxonomy / progress / low_confidence）。
6. （可选）接入 scripts 校验与覆盖率门禁。
7. 跑 `npm run validate` + `npm run lint`，修干净告警/报错。
8. 跑 `npm run dev` 自查：切到黑神话图谱、点节点、翻转卡片。

---

## 9. 验收标准（Acceptance Criteria）

逐条可核验，全过即视为完成：

**A. 领域可用**
- [ ] 顶部下拉出现「黑神话」领域，可切换。
- [ ] 切到该图谱后，种子节点 `black_myth_wukong` 正确展开。

**B. 数据完整性**
- [ ] 节点数 ≥ 31，覆盖第 4 节表内全部 id。
- [ ] `npm run validate` 对 `black-myth` 零 error（无重复 id、无悬挂边、无孤儿、type 合法、seed 合法）。
- [ ] 所有 C 端节点 `details.backstage` 均已填写（summary 非空）。
- [ ] platform 节点均有映射边接入，且其 `backstage` 写明所支撑的 C 端体验。

**C. 双视角交互**
- [ ] 点开任一节点默认显示 C 端内容。
- [ ] 顶部切换控件可在「C端 / B端」间切换，触发 3D 翻转动画。
- [ ] 背面正确显示该节点 B 端 `backstage` 内容。
- [ ] 切换到另一个节点时，卡片复位为 C 端正面。
- [ ] ai/pm/grammar 节点不出现切换控件，渲染与改动前一致（回归不破坏）。

**D. 视觉一致性**
- [ ] 翻转卡片沿用现有玻璃拟态深色风格（圆角、边框、文字色），无错位/溢出。
- [ ] 移动端 BottomSheet 与桌面 Panel 均能正常翻转。

**E. 质量门禁**
- [ ] `npm run lint`（tsc 类型检查）通过，无新增类型错误。
- [ ] 现有 ai/pm/grammar 图谱功能无回归。

---

## 10. 待你拍板的开放项（可在执行前确认）
1. platform 节点是否需要背面（B 端工具的「它支撑了什么 C 端」）——当前计划：需要。
2. 是否接入 scripts 覆盖率门禁（第 7 项可选项）——当前计划：先做数据与 UI，门禁作为可选增强。
3. 节点中文/英文 label 约定——当前计划：图上用中文 label，`zh_label` 放英文别名（与 pm 图一致）。
