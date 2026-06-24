# Loop Engineering · 用 AI 持续迭代知识图谱

> 本文档是本项目「如何用 AI 系统化地构建与打磨知识图谱」的**总方法论**。
> 具体领域的执行手册见 `docs/build-notes/<领域>/LOOP.md` 或 `progress.md`。

---

## 0. 为什么需要 Loop，而不是「一次性生成」

知识图谱不是写完就结束的静态文档，而是**可验证、可迭代的知识产品**。

一次性让 AI 生成整张图，常见问题是：

- 结构看起来完整，但内容深浅不一、事实经不起推敲
- 上下文写满后无法接续，下一轮从零开始
- 没有客观标准，「好不好」全靠主观感觉
- AI 为迎合 prompt 而灌水、编造、硬凑关系

**Loop Engineering** 的做法是：把「补全 / 打磨图谱」从单次对话，升级为**有目标、有验证、有边界、可跨会话续跑**的循环。

类比：不是让 AI 一次交卷，而是设计一条「做题 → 独立阅卷 → 改错 → 再考」的流水线。

---

## 1. 核心概念（五句话版）

| 概念 | 含义 | 在本项目中的体现 |
|------|------|------------------|
| **Goal Definition** | 把模糊意图翻译成可验证的完成条件 | `taxonomy.ts` 大纲 + `PLAN.md` 验收标准 |
| **Harness** | 告诉 AI「不能怎么做」，防止钻空子 | 各 `LOOP.md` / `progress.md` 的「边界」章节 |
| **Verifier** | 做事的和检查的分开 | 验证子 Agent + 评分卡（L3） |
| **Knowledge Management** | 跨会话记忆，避免每次失忆 | `progress.md` + `taxonomy.md` + `low_confidence.md` |
| **Loop Trigger** | 心跳：何时启动下一轮 | 手动续跑 → 未来可挂 cron / `/loop` |

---

## 2. 完成判定阶梯（L0 → L3）

一张图谱的「完成」应分层判定，**不能只看节点数量**。

| 层 | 名称 | 判定方式 | 能验证什么 | 验证不了什么 |
|----|------|----------|-----------|-------------|
| **L0** | 结构完整性 | `npm run validate` | 无重复 id、无悬挂边、无孤儿、type 合法、seed 合法 | 内容质量 |
| **L1** | 大纲覆盖 | `npm run check-coverage:<mapId>` | taxonomy 中的主题是否都进图 | 讲得对不对 |
| **L2** | 领域专属规则 | `validate` 中的图谱专属规则 | 如黑神话的双视角 backstage 完整性 | 事实准确性 |
| **L3** | 内容严谨性 | 评分卡 + 验证子 Agent | 准确性、粒度、去水分、类比有效性 | （需人工审最终 diff） |

### 2.1 古德哈特陷阱（必须配套 Harness）

> 当一个衡量指标变成了目标本身，它就不再是一个好的衡量指标。

在 AI 迭代图谱时，典型「钻空子」行为：

- 只为过 L0 → 删节点 / 删边
- 只为过 L1 → 硬拆概念、造无意义节点
- 只为过「每节点有 analogy」→ 复制粘贴废话类比
- 只为过「萌新三段式」→ 【萌新】【进阶】【精通】内容雷同

**根治**：完成标准必须与 **Harness（边界）** 和 **失败降级（low_confidence）** 配套使用。

---

## 3. 三件套工具链（反馈机制）

本项目已内置三个脚本，构成 Loop 的「自动反馈」：

| 工具 | 文件 | 命令 | 职责 |
|------|------|------|------|
| 结构验证器 | `scripts/validate-graph.ts` | `npm run validate` | L0（+ 部分 L2 专属规则） |
| 缺口检测器 | `scripts/check-coverage.ts` | `npm run check-coverage:ai` 等 | L1 覆盖 |
| 大纲登记表 | `scripts/taxonomy.ts` | — | 目标锚点（要覆盖什么） |

**边界**：脚本只读不改。它们发现问题，由人或执行 Agent 去修。

### 3.1 新增一张图谱时，工具链接入 checklist

1. 在 `src/data/maps/` 新建数据文件并注册到 `index.ts`
2. 在 `scripts/taxonomy.ts` 登记 `XXX_TAXONOMY` 并加入 `TAXONOMY_REGISTRY`
3. 在 `package.json` 加 `check-coverage:<mapId>` 脚本（可选但推荐）
4. 建 `docs/build-notes/<领域>/` 四件套（见第 5 节）
5. 若该图有专属质量维度，在 `validate-graph.ts` 加 L2 规则（参考 `black-myth`）

---

## 4. 工作台账四件套（Knowledge Management）

每个领域一套，放在 `docs/build-notes/<领域>/`：

| 文件 | 用途 | 谁写 |
|------|------|------|
| `taxonomy.md` | 人类可读大纲，镜像 `taxonomy.ts` | 人 + AI 协作 |
| `PLAN.md` | 一次性交付或重大版本的执行计划与验收标准 | 人定稿 |
| `progress.md` | **跨会话记忆**：已完成批次、下一步、当前指标 | 每轮 loop 结束更新 |
| `low_confidence.md` | **失败降级队列**：拿不准的不写进图谱 | 验证轮发现时追加 |
| `LOOP.md` | （推荐）该领域专属 loop 手册：L2/L3 规则、评分卡、打磨顺序 | 从本文档 + 领域特点 fork |

### 4.1 新会话如何无缝接续

```
读 docs/build-notes/<领域>/progress.md（及 LOOP.md 如有），
按其中的工作流继续执行图谱 loop，从「下一步」开始。
先跑 validate + check-coverage，再动手改内容。
```

---

## 5. 每轮工作流（Per-Round Loop）

无论补全新图还是打磨旧图，**每轮只做一件事**：

```
┌─────────────┐
│ 1. 读 progress │ ← 确定本轮目标（一个领域 / 一个模块）
└──────┬──────┘
       ▼
┌─────────────┐
│ 2. 跑门禁     │ ← validate + check-coverage + lint
└──────┬──────┘
       ▼
┌─────────────┐
│ 3. 执行       │ ← 补节点 / 改内容 / 加边（doer Agent）
└──────┬──────┘
       ▼
┌─────────────┐
│ 4. 验证       │ ← 验证子 Agent 按评分卡评级（只评不改）
└──────┬──────┘
       ▼
┌─────────────┐
│ 5. 修 + 降级  │ ← 能改的直接改；拿不准 → low_confidence.md
└──────┬──────┘
       ▼
┌─────────────┐
│ 6. 再跑门禁   │ ← 三件套全过
└──────┬──────┘
       ▼
┌─────────────┐
│ 7. 交审       │ ← 一个可 review 的 git diff 给作者
└──────┬──────┘
       ▼
┌─────────────┐
│ 8. 更新 progress │ ← 记录批次、指标、下一步
└─────────────┘
```

### 5.1 补全模式 vs 打磨模式

| 模式 | 适用 | 每轮目标 | 完成判定 |
|------|------|----------|----------|
| **补全** | 新图 / 大纲有缺口 | 补 1 个领域的缺失主题 | L0 + L1 core 清零 |
| **打磨** | 已覆盖大纲 | 打磨 1 个模块的内容质量 | L3 评分卡该模块全通过 |

AI 图谱（`ai`）、PM 图谱（`pm`）走的是**补全模式**，已达 100% 覆盖后转入打磨。
黑神话（`black-myth`）走的是**打磨模式**，重点在 L2 双视角 + L3 事实严谨。
游戏研发中台（`game-studio`）建议：L1 已满足后，按模块进入**打磨模式**。

---

## 6. Harness · 边界（所有图谱通用）

**违反任意一条，本轮 loop 视为失败：**

1. **禁止编造**：技术细节、游戏机制、内部工具形态，必须能追溯来源；核验不过 → `low_confidence.md`
2. **禁止灌水**：不为凑覆盖率造无意义节点，不把一个概念硬拆成多个
3. **禁止删改凑指标**：不删节点 / 删边来过 `validate`；不删内容来过评分卡
4. **禁止硬凑关系**：不为过规则而加不真实的边（如随意的「支撑」「依赖」）
5. **禁止破坏式重写**：已准确的内容不为改风格而全文重写
6. **不动视觉契约**：不擅自改 `typeStyles`、主题色、PRD 范围（除非本轮目标就是视觉）
7. **每轮 = 一个可 review 的 git diff**：不大爆炸式多轮改动混在一次提交

---

## 7. L3 评分卡模板（验证子 Agent 用）

验证子 Agent **只评不改**，建议换模型以减少同源偏见。

### 7.1 通用五维度（内容类图谱：ai / pm / expression / game-studio）

| # | 维度 | 通过标准 | 不合格示例 |
|---|------|----------|------------|
| 1 | **准确性** | 描述属实，无事实错误 | 把 CI 说成「只跑单元测试」而忽略表校验 |
| 2 | **可学性** | 萌新能懂：术语当场解释，类比真能帮理解 | 【萌新】段仍满屏缩写；analogy 是正确废话 |
| 3 | **链路完整** | 说清谁用、上下游怎么接 | 只定义「是什么」，不说和相邻系统的关系 |
| 4 | **粒度一致** | 与同级节点拆分粒度相当 | 一句话节点 vs 塞五个概念的巨型节点 |
| 5 | **去水分** | 无营销腔、无「行业标杆」类空话 | 「极致体验」「赋能闭环」堆砌 |

判定为「待改 / 不合格」的：**先写进 `low_confidence.md` 或待改清单，不直接在不确定时改图**。

### 7.2 领域专属维度（按需叠加）

| 图谱 | 专属维度 |
|------|----------|
| `black-myth` | 双视角映射合理性：B 端 backstage 是否真实支撑 C 端体验 |
| `game-studio` | 中后台 PM 视角：是否回答「痛点 / 用户 / 输入输出 / 门禁」 |
| `ai` / `pm` | 来源可追溯：paper/doc/blog 带 URL 或明确 conversation |

---

## 8. 失败降级（low_confidence.md）

任何拿不准的判断，**绝不带着不确定信息污染图谱**。

每条记录须包含：

- 主题 / 建议节点 id
- 建议 type 与拟连接
- 来源（或「无来源」）
- 存疑原因
- 待人工裁决的问题

人工清空 `low_confidence` 后，才可宣称该领域 L3 完成。

---

## 9. 各图谱现状与 loop 入口

| 图谱 id | L0 | L1 | L2 专属 | L3 loop 入口 |
|---------|----|----|---------|-------------|
| `ai` | ✅ | ✅ 100% | — | `docs/build-notes/ai/progress.md` |
| `pm` | ✅ | ✅ 100% | — | `docs/build-notes/pm/progress.md` |
| `black-myth` | ✅ | ✅ | ✅ 双视角规则 | `docs/build-notes/black-myth/LOOP.md` |
| `game-studio` | ✅ | ✅ 100% | ✅ 可学性三段式 | ✅ 见 `game-studio/LOOP.md` |
| `grammar` / `expression` | ✅ | 未接 coverage | — | 可按需复制本流程 |

---

## 10. 从 0 到 1：新领域 loop 启动清单

1. **定大纲** → `taxonomy.md` + `scripts/taxonomy.ts`（core / recommended / optional）
2. **定验收** → `PLAN.md`（节点规模、边语义、完成条件）
3. **做数据** → `src/data/maps/<id>.ts` + 注册
4. **跑 L0** → `npm run validate` 零 error
5. **跑 L1** → `check-coverage` 补 core 缺口
6. **写 LOOP.md** → 从本文档 fork，加领域评分卡
7. **建 low_confidence.md** → 空模板即可
8. **进入每轮 loop** → 一次一个模块，更新 `progress.md`

---

## 11. 心跳与自动化（进阶）

当前推荐：**手动触发**——新对话读 `progress.md` 续跑。

流程稳定后可考虑：

- Cursor `/loop` 或 cron 定时读 progress 启动 Agent
- CI 中跑 `validate` + `check-coverage` 作为 PR 门禁
- 子 Agent 并行评不同模块（注意 worktree 隔离，避免并发改同一文件）

---

## 12. 一句话总结

> **Loop Engineering = 可验证的目标 + 机器门禁（L0/L1/L2）+ 独立验证（L3）+ 边界（Harness）+ 跨会话记忆（progress）+ 失败降级（low_confidence）+ 每轮一个 diff 给作者审。**

不是让 AI 多生成，而是让 AI **在约束内、可度量地、一轮轮变好**。

---

## 附录 A · 参考文件索引

- 黑神话打磨手册（L2/L3 最完整范例）：`docs/build-notes/black-myth/LOOP.md`
- AI 补全进度：`docs/build-notes/ai/progress.md`
- PM 补全进度：`docs/build-notes/pm/progress.md`
- 游戏研发中台计划：`docs/build-notes/game-studio/PLAN.md`
- 结构验证器：`scripts/validate-graph.ts`
- 缺口检测器：`scripts/check-coverage.ts`
- AI 图谱中的概念节点：`loop_engineering`、`goal_definition`、`goodhart_law`、`reward_hacking`、`verifier_agent`

## 附录 B · 新对话启动语模板

**补全：**
```
读 docs/build-notes/<领域>/progress.md，按 Loop Engineering 工作流继续补全图谱，
从「下一步」开始。先跑 validate + check-coverage，每轮只做一个领域。
```

**打磨：**
```
读 docs/build-notes/<领域>/LOOP.md 与 progress.md，按 L3 评分卡执行打磨 loop，
从「下一步」模块开始。验证子 Agent 只评不改；拿不准进 low_confidence.md。
```
