# 黑神话悟空图谱 · 打磨 Loop 设计与执行手册（跨会话交接）

> 用途：把「这张图还不够严谨、不够完美」这个模糊目标，坍缩成**可验证的完成条件 + 不能怎么做的边界**，
> 让下一个对话（或定时 loop）能照此一轮轮自动打磨，直到足够严谨。
>
> **新对话启动语建议**：
> 「读 `docs/build-notes/black-myth/LOOP.md`，按其中的工作流执行黑神话图谱打磨 loop，从『下一步』开始。
> 先实现第①层自动规则，再按评分卡跑第②层验证。每轮做完跑全部门禁 + 交审，再更新 progress.md。」

---

## 0. 为什么需要这个 loop

现有自动门禁只覆盖两层，**只能验证「结构对不对、该讲的有没有」，验证不了「讲得对不对、严不严谨」**：
- **L0 结构**：`npm run validate`（无孤儿 / 无悬挂边 / 类型合法 / seed 合法）
- **L1 覆盖**：`npm run check-coverage:black-myth`（大纲主题是否都进图）

黑神话这张图还多一个独有质量维度：**C 端 ↔ B 端映射是否真实，而不是硬凑**。
所以在 L0/L1 之上再加两层（L2 自动 + L3 半自动），构成完整打磨阶梯。

---

## 1. 目标分层（完成判定阶梯）

一版「严谨」= 下面四级**全部通过**：

| 层 | 名称 | 判定方式 | 完成条件 |
|----|------|----------|----------|
| L0 | 结构 | `npm run validate` | black-myth 0 error |
| L1 | 覆盖 | `npm run check-coverage:black-myth` | core 缺口 0 |
| **L2** | **双视角完整性** | `npm run validate`（新增规则） | black-myth 0 error（新规则） |
| **L3** | **内容严谨性** | 评分卡 + 验证子 Agent | 全节点逐维度「通过」，0 条遗留 low_confidence |

> 古德哈特陷阱提醒：这些是「完成标准」，必须与第 4 节「边界」配套使用，否则 AI 会为过门禁而钻空子。

---

## 2. 第①层增量（L2）：把「双视角完整性」变成机器可验证

**目标**：给 `scripts/validate-graph.ts` 增加 black-myth 专属规则，纳入 `npm run validate` 门禁。

**实现位置**：`scripts/validate-graph.ts`，针对 `map.id === "black-myth"` 增加一段校验。

**规则清单**：

| 规则 id | 级别 | 校验内容 |
|---------|------|----------|
| `bm-missing-backstage` | error | 每个 black-myth 节点必须有 `details.backstage` 且 `backstage.summary` 非空 |
| `bm-platform-no-support-in` | error | 每个 `type === "platform"` 节点必须有 ≥1 条 `label === "支撑"` 的入边 |
| `bm-cend-no-mapping` | warning | 每个非 `platform`、非 `overview` 的 C 端业务节点，建议 ≥1 条到 platform 的「支撑」出边（含其层级父节点的映射可视为满足，避免过严） |
| `bm-backstage-thin` | warning | `backstage.summary` 过短（如 < 10 字）视为占位灌水 |

**实现要点**：
- 复用现有 validate-graph 的 issue 收集 / 分级 / 退出码机制（error → exit 1）。
- 规则只在 black-myth 图触发，不影响 ai/pm/grammar。
- `bm-cend-no-mapping` 判定时，允许「父节点已映射」算覆盖（例如 `loop_explore` 的父 `core_gameplay_loop` 已映射 `telemetry_platform`，则子节点不重复要求），避免逼出硬凑边。

**验收**：实现后 `npm run validate` 对 black-myth 仍 0 error（当前数据应已满足规则，作为回归基线）。

---

## 3. 第②层增量（L3）：内容严谨性「评分卡 + 验证子 Agent」

**核心原则（来自 Loop Engineering）**：做事的和检查的分开。写内容的 Agent 不能自己给自己打分。

### 3.1 评分卡（Rubric）

每个节点逐维度判定 `通过 / 待改 / 不合格`：

| # | 维度 | 通过标准 | 不合格示例 |
|---|------|----------|------------|
| 1 | **准确性** | 对游戏机制的描述属实、无事实错误 | 把「识破」说成纯防御、把灵蕴说成会掉落 |
| 2 | **双视角映射合理性** | B 端 backstage 与该 C 端功能强相关，是真实支撑而非套话 | 给「系统菜单」配「反作弊系统」这种不相关中后台 |
| 3 | **非编造** | 推测性的 B 端工具标注「推断」，不当作官方事实；来源可追溯 | 把臆想的内部工具写成确凿存在 |
| 4 | **粒度一致** | 与同级节点拆分粒度相当，不过粗不过细 | 一句话节点 / 塞了五个机制的巨型节点 |
| 5 | **去水分** | 无营销腔、无正确的废话、analogy 真能帮理解 | 「极致体验、行业标杆」这类空话 |

判定为「不合格 / 待改」的，**先写进 `low_confidence.md`，不直接改图**。

### 3.2 验证子 Agent（做检分离）

- 用 `Task` 启子 Agent 作为**验证器**，最好换一个模型（避免自己批自己卷子太宽容）。
- 输入：单个领域的全部节点 + 本评分卡 + 边界（第 4 节）。
- 输出：每节点 5 维度评级 + 具体问题 + 改进建议，汇总成「待改清单」。
- **子 Agent 只评不改**（只读心智）；改由主 Agent（doer）执行。

### 3.3 每轮工作流（Per-Round Loop）

1. 选 **1 个领域**（如「④ 战斗数值与机制」）作为本轮目标。
2. 启验证子 Agent，按评分卡逐节点评级 → 产出待改清单。
3. doer 逐条修：
   - 能直接改对的 → 改 `src/data/maps/black-myth.ts`。
   - 拿不准/需要外部考据的 → 进 `low_confidence.md`，交人工。
4. 跑全部门禁：`npm run validate` + `npm run check-coverage:black-myth` + `npm run lint` 全过。
5. 验证子 Agent 复查本领域 → 直到 5 维度全「通过」。
6. 把本轮 diff + 评级前后对比交作者审。
7. 满意 → 更新 `progress.md` 与本文件「下一步」→ 下一领域；不满意 → 按反馈改，不推进。

---

## 4. 边界（Harness · 防 reward hacking · 必须遵守）

针对游戏拆解特化，**违反任意一条即视为本轮失败**：

- **禁止编造**：不臆造游戏机制、数值、官方未披露的内部工具当事实；B 端工具属合理推测的必须标「推断」。
- **禁止删改凑指标**：不删节点 / 删映射边来过 L2；不删内容来过 L3。
- **禁止硬拆**：不为提覆盖率把一个概念拆成多个节点。
- **禁止硬凑双视角**：不给 C 端节点塞一个不相关的 B 端 backstage 只为过「必须有 backstage」规则。
- **禁止破坏式重写**：已准确的节点不为改风格而重写；不动 `typeStyles`、主题色、PRD 范围、`backstage` 类型定义。
- 每轮 = 一个可 review 的 git diff。

---

## 5. 失败降级与心跳

- **降级队列**：任何拿不准的判断一律进 `docs/build-notes/black-myth/low_confidence.md`，标注问题与待考据点，交人工裁决，**绝不带着不确定信息污染图谱**。
- **心跳/触发**：先用手动「读 progress.md 续跑下一轮」；流程稳定后可挂 `/loop` 或定时任务自动启动。

---

## 6. 落地清单（下一个对话要做的事）

### 阶段一：L2 自动规则（快，先做）
- [ ] 在 `scripts/validate-graph.ts` 实现第 2 节四条 black-myth 规则
- [ ] `npm run validate` 回归：black-myth 仍 0 error
- [ ] 更新 `progress.md` 记录「L2 门禁上线」

### 阶段二：L3 评分卡 loop（重，分领域多轮）
- [ ] 按第 3 节逐领域跑「验证子 Agent → doer 修 → 复查」
- [ ] 顺序建议：先 ④ 战斗（最易出事实错）→ ③ 经济 → ② 玩法 → ① 定位 → ⑤ UI → ⑥ 中后台
- [ ] 每领域清零后更新 `progress.md`，遗留项进 `low_confidence.md`

### 完成判定（整张图「这一版严谨」）
- [ ] L0 0 error · L1 core 0 · L2 0 error · L3 全节点通过 · low_confidence 已人工清空

---

## 7. 下一步（Next Action）

**从「阶段一：实现 L2 自动规则」开始。** 这是纯自动、最快见效的一层，
完成后再进入阶段二，按领域顺序逐轮跑 L3 评分卡 loop。

每轮结束务必：跑三件套门禁 → 交作者审 diff → 更新本文件与 `progress.md`。
