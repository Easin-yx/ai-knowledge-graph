# 游戏研发中台图谱 · 进度记录

## Loop 状态：**主体完成**（L0 + L1 + L2 + L3 八模块）

> 执行计划见 [`LOOP.md`](LOOP.md)。总方法论见 [`../loop-engineering.md`](../loop-engineering.md)。

---

## 最终指标

| 层 | 结果 |
|----|------|
| L0 结构 | `npm run validate` — **0 error** |
| L1 覆盖 | `npm run check-coverage:game-studio` — **47/47（100%）** |
| L2 可学性 | 全节点含【萌新】【进阶】【精通】；8 模块枢纽含【学习顺序】 |
| L3 打磨 | C1–C8 八模块评分卡通过（2025-06-24 执行） |
| low_confidence | 暂无硬阻塞（行业推断类已标注，见 `low_confidence.md`） |

- 节点：**47** · 边：**96** · preferredSeed：`studio_platform`

---

## 阶段 A · 基础设施 ✅

- [x] A1. `GAME_STUDIO_TAXONOMY` @ `scripts/taxonomy.ts`
- [x] A2. `npm run check-coverage:game-studio` @ `package.json`
- [x] A3. L2 规则 `gs-*` @ `scripts/validate-graph.ts`
- [x] A4. `game-studio` @ `CONTENT_STYLE_MAPS`
- [x] A5. `low_confidence.md` + `LOOP.md`

---

## 阶段 B · L0 + L1 ✅

- [x] B1–B3. validate / coverage / lint 全过

---

## 阶段 C · L3 逐模块打磨 ✅

| 轮次 | 模块 | 状态 | 备注 |
|------|------|------|------|
| C1 | ① 研发协作底座 | ✅ | 三段式 + 学习顺序 |
| C2 | ② 资产与内容管线 | ✅ | summary 去未解释缩写 |
| C3 | ③ 数值与配置平台 | ✅ | |
| C4 | ④ 质量与构建 | ✅ | |
| C5 | ⑤ 数据与洞察 | ✅ | |
| C6 | ⑥ AI 赋能 | ✅ | Copilot 节点已通俗化 |
| C7 | ⑦ ARPG 特化 | ✅ | |
| C8 | ⑧ 标杆案例 | ✅ | 补【学习顺序】 |

---

## 阶段 D · 收尾 ✅

- [x] D1. 根节点含三阶段阅读路线
- [x] D2. 模块「先修」链 ①→…→⑧（根下首模块为协作底座）
- [x] D3. 黑神话案例 5 条「案例」边 + 切换引导
- [x] D4. validate 0 error
- [x] D5. 本文件更新

---

## 历史：2025-06-24 初次交付

- 新建 `game-studio.ts`（47 节点）
- PLAN / taxonomy
- 萌新三段式 notes + 「先修」边 + label 通俗化
- 移除独立「萌新入门指南」节点（路线合并至根节点）

---

## 下一步（可选增益）

1. ~~详情 UI：将【萌新/进阶/精通】渲染为折叠标题~~ ✅（`NodeDetailContent.tsx` · `LearningTierNotes`）
2. taxonomy 扩充新主题 → 跑 coverage → 继续 loop
3. 第二个标杆案例（如其他 ARPG 工作室实践）
4. 作者审 diff 后 push 部署

### 2025-06-24 · 可选增益 G1

- [x] notes 含【萌新】【进阶】【精通】时，详情面板渲染为「阅读分层」折叠区块
- [x] 默认展开：学习顺序 + 萌新；进阶 / 精通 折叠可点开
- [x] 非分层 notes（其他图谱）仍走原「延伸笔记」展示，无回归

**新会话启动语：**

```
读 docs/build-notes/game-studio/progress.md，
Loop 主体已完成；若做可选增益，从「下一步」选一项执行。
```
