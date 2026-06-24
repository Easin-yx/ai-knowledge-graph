# 游戏研发中台图谱 · 完整 Loop 执行计划

> 本文档 = **从 0 到「这一版严谨」的完整工作循环**。  
> 总方法论见 [`../loop-engineering.md`](../loop-engineering.md)。  
> 一次性交付验收见 [`PLAN.md`](PLAN.md)。

---

## 0. 本 Loop 的目标

把 `game-studio` 图谱打磨成：

> **萌新能沿「先修」边顺序读懂；进阶能画出系统链路；精通能按节点写中后台 PRD。**

完成判定 = **L0 + L1 + L2 + L3 四级全部通过**（见第 1 节）。

---

## 1. 完成判定阶梯

| 层 | 名称 | 命令 / 方式 | 完成条件 |
|----|------|-------------|----------|
| **L0** | 结构 | `npm run validate` | game-studio **0 error** |
| **L1** | 覆盖 | `npm run check-coverage:game-studio` | core / recommended / optional **全 0 缺口** |
| **L2** | 可学性结构 | `npm run validate`（game-studio 专属规则） | 0 error |
| **L3** | 内容严谨性 | 本文件第 4 节评分卡 + 逐模块人工/Agent 审 | 8 模块全「通过」；`low_confidence.md` 已清空或人工裁决完毕 |

### L2 自动规则（`validate-graph.ts`）

| 规则 id | 级别 | 校验内容 |
|---------|------|----------|
| `gs-missing-learning-tier` | error | 每个节点 `notes` 含 `【萌新】` `【进阶】` `【精通】` |
| `gs-module-missing-learning-order` | warning | 8 个模块枢纽节点 `notes` 含 `【学习顺序】` |
| `gs-novice-too-short` | warning | `【萌新】` 段去除标记后 < 12 字 |
| + 内容风格 | warning | 每节点有 `analogy`、`key_concepts≥3`、`source`（`CONTENT_STYLE_MAPS`） |

### 古德哈特提醒

L2 只保证**结构可学**，不保证内容不灌水。L3 评分卡负责辨别「有三段但三段废话」的情况。

---

## 2. 工作台账

| 文件 | 路径 |
|------|------|
| 大纲 | `taxonomy.md` + `scripts/taxonomy.ts` |
| 进度 | `progress.md` |
| 低置信队列 | `low_confidence.md` |
| 数据 | `src/data/maps/game-studio.ts` |
| 本计划 | `LOOP.md` |

**新会话启动语：**

```
读 docs/build-notes/game-studio/LOOP.md 与 progress.md，
从「下一步」继续执行 game-studio 打磨 loop。
先跑 validate + check-coverage:game-studio，再改内容。
```

---

## 3. 全流程（一次性执行版）

以下按顺序跑完 = **一整圈 Loop 完成**。

### 阶段 A · 基础设施（只做一次）

- [ ] A1. `GAME_STUDIO_TAXONOMY` 登记于 `scripts/taxonomy.ts`
- [ ] A2. `npm run check-coverage:game-studio` 脚本接入 `package.json`
- [ ] A3. L2 规则写入 `scripts/validate-graph.ts`
- [ ] A4. `game-studio` 加入 `CONTENT_STYLE_MAPS`
- [ ] A5. 创建 `low_confidence.md`

### 阶段 B · L0 + L1（结构 + 覆盖）

- [ ] B1. `npm run validate` → game-studio 0 error
- [ ] B2. `npm run check-coverage:game-studio` → 47/47，core 0 缺口
- [ ] B3. `npm run lint` 通过

### 阶段 C · L3 逐模块打磨（8 轮，每轮一个模块）

每轮固定步骤：

1. 取本轮模块下所有节点（含枢纽 + 叶子）
2. 按第 4 节评分卡逐节点打 `通过 / 待改 / 不合格`
3. doer 修改 `game-studio.ts`；拿不准 → `low_confidence.md`
4. 跑三件套门禁
5. 更新 `progress.md` 本轮记录
6. 进入下一模块

| 轮次 | 模块 | 节点 id 前缀 / 枢纽 |
|------|------|---------------------|
| C1 | ① 研发协作底座 | `collab_foundation` + 5 叶子 |
| C2 | ② 资产与内容管线 | `asset_content_pipeline` + 6 叶子 |
| C3 | ③ 数值与配置平台 | `config_platform` + 5 叶子 |
| C4 | ④ 质量与构建 | `quality_infra` + 5 叶子 |
| C5 | ⑤ 数据与洞察 | `data_insight` + 5 叶子 |
| C6 | ⑥ AI 赋能 | `ai_workflow` + 6 叶子 |
| C7 | ⑦ ARPG 特化 | `arpg_constraints` + 5 叶子 |
| C8 | ⑧ 标杆案例 | `benchmark_cases` + `black_myth_wukong` |

### 阶段 D · 全图复检与收尾

- [ ] D1. 根节点 `studio_platform` 阅读路线与三阶段描述完整
- [ ] D2. 「先修」链 8 模块贯通（根 → ① → … → ⑧）
- [ ] D3. `black_myth_wukong` 案例边 ≥ 5，含切换引导文案
- [ ] D4. 三件套最终 0 error（warning 尽量清零）
- [ ] D5. `progress.md` 标记 **Loop 主体完成**
- [ ] D6. 作者审 diff（可选 push）

---

## 4. L3 评分卡（游戏研发中台 · 中后台 PM）

验证 Agent **只评不改**。每个节点五维度：

| # | 维度 | 通过标准 | 不合格示例 |
|---|------|----------|------------|
| 1 | **准确性** | 对研发流程/工具的描述行业合理，无明显事实错误 | 把 CI 说成「只编译不测试」 |
| 2 | **萌新可懂** | 【萌新】段零门槛或当场解释术语；analogy 非废话 | 【萌新】仍满屏 DCC/CMS/CI 无解释 |
| 3 | **链路完整** | 【进阶】说清谁用、上下游；与图上「依赖/门禁」边一致 | 只定义名词不说明接哪里 |
| 4 | **PM 可执行** | 【精通】能导向 PRD 要素：门禁、指标、坑 | 【精通】只有空话「要盯盘」 |
| 5 | **去水分** | 无「极致赋能闭环」类营销腔 | 正确的废话 |

**模块枢纽额外检查**：含 `【学习顺序】` 且顺序与「先修」边大体一致。

---

## 5. Harness · 边界

- **禁止编造**：不将推测的大厂内部工具写成确凿产品名；推断须可在 notes 标明
- **禁止为过 L2 灌水**：三段互复制、或【萌新】【进阶】同义反复
- **禁止删节点/边** 过 validate
- **禁止破坏式重写** 已准确节点
- **不新增「入门指南」类冗余枢纽节点**（学习路线写在根节点）
- **每轮** = 可 review 的 git diff

---

## 6. 失败降级

见 [`low_confidence.md`](low_confidence.md)。  
典型应入队场景：

- 某「中后台产品」是否有业界标准产品名可对齐
- ARPG 专属工具链细节因工作室引擎不同而差异过大
- AI 赋能工具演进极快，具体产品名可能短期过时

---

## 7. 完成判定（整张图「这一版严谨」）

```
✅ L0  validate 0 error
✅ L1  check-coverage core/rec/opt 全 0
✅ L2  game-studio 专属规则 0 error
✅ L3  C1–C8 八模块评分卡全通过
✅ low_confidence 已人工清空或全部裁决
✅ progress.md 已记录最终指标
```

---

## 8. 下一步（Next Action）

> 由 `progress.md` 维护。Loop 主体完成后，下一步为**可选增益**：
> - 扩充 taxonomy（新主题 → 新缺口 → 继续 loop）
> - 增加第二个标杆案例节点
> - 详情 UI 将【萌新/进阶/精通】渲染为折叠区块
