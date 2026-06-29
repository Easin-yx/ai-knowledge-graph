# 知识图谱养护重构 · 进度（progress）

> 跨会话记忆。每轮 loop 结束更新「已完成」「下一步」「当前指标」。
> 配套计划见 [`PLAN.md`](PLAN.md)。每阶段 = 一个可 review 的 diff。

---

## 当前阶段

- **P0 确定性径向布局** —— ✅ 已完成（待人工在浏览器复核刷新稳定性）
- **P1 骨架/关联边视觉分层** —— ✅ 已完成
- **P2 校验脚本扩展** —— ✅ 已完成
- **P3 数据养护** —— 🔄 进行中（grammar ✅、pm ✅、ai ✅；下一张：expression）

---

## 已完成批次

### P0 · 确定性径向布局（治「刷新乱跳」）

改动文件：
- `src/constants/edgeKind.ts`（新增）：骨架/关联边词表 `HIERARCHY_LABELS` + `inferEdgeKind()`，
  布局与后续 P1 视觉分层、P2 校验共用。
- `src/components/GraphCanvas.tsx`：
  - 新增纯函数 `computeRadialLayout()`：以 seedIds 为根做 BFS 生成树，「骨架边优先、其余边兜底连通」，
    按子树规模分配角度，逐层放射到同心环；无随机，确定性。
  - 新增 props `fullData`（基于全图预计算稳定槽位）、`layoutMode: 'radial' | 'force'`（默认 radial，force 为回退档）。
  - radial 模式把槽位写入 `fx/fy` 钉死；力导向关掉径向力、弱化斥力，仅作兜底。
- `src/App.tsx`：向 `GraphCanvas` 传 `fullData={activeMap.data}`（未改可见性/展开逻辑）。

设计要点：
- 布局基于**全图**预计算，只渲染可见节点 → 展开/收回/刷新槽位不变（§3.3 渐进展开兼容）。
- 各图骨架边分布差异大（`ai` 仅 13 条「包含」却上百节点），故生成树用「骨架优先 + 全边兜底」，
  保证连通；纯骨架边连通性留到 P2 校验脚本量化。
- 保留 `layoutMode` 开关作回退（§3.4 / §9 风险回滚）。

门禁：`npm run lint` ✅ · `npm run validate` ✅（0 error / 0 warning）· HMR 干净。

**待人工复核**：浏览器连续刷新 5 次，节点坐标应完全一致（§3.6 验收）。

### P1 · 骨架/关联边视觉分层

改动文件：
- `src/types/index.ts`：`KnowledgeEdge` 增可选 `kind?: EdgeKind`（缺省按 label 推断）。
- `src/components/GraphCanvas.tsx`：
  - `LinkExtra` 带上 `kind`，建链时 `inferEdgeKind(e.label, e.kind)` 计算。
  - `linkColor`：静息态骨架边常显（`colors.link`），关联边退为背景（`colors.linkDim`）；
    激活态高亮、有焦点时其余统一压暗（保持既有交互）。
  - `linkWidth`：激活 1.8 / 静息骨架 0.9 / 静息关联 0.5，强化主次。
  - 实现用 react-force-graph 原生 `linkColor`/`linkWidth`（width+opacity 分层），未引入自定义虚线绘制，风险低。

门禁：`npm run lint` ✅ · `npm run validate` ✅（0/0）。

### P2 · 校验脚本扩展（PLAN §7）

改动文件：`scripts/validate-graph.ts`
- `checkFanout`：度数 > 9 的节点报 `high-fanout`（warning，§5 中心收敛预警）。
- `checkSkeletonConnectivity`：仅用骨架边时统计连通块数 + 无骨架边节点数，报 `skeleton-fragmented`（warning）。
- 报告新增「边分类：骨架=x, 关联=y」统计行。
- 均为 warning，不阻断门禁；`npm run validate` 仍 0 error。

门禁：`npm run lint` ✅ · `npm run validate` ✅（0 error / 17 warning，warning 即 P3/P4 靶子）。

---

## 📌 实测审计（validate 输出的 ground truth，供 P3/P4 用）

> 注意：以 validate 实测为准，PLAN §5 表格部分数字偏旧（如 game-studio 实测扇出 ≤ 9，已达标）。

| 图 | high-fanout 节点（度数） | 骨架/关联 | 骨架连通块 | 主干树状态 |
| --- | --- | --- | --- | --- |
| ai | transformer(17) llm(19) ai_agent(12) rag(10) diffusion_model(10) text_to_video(11) | 13/244 | 142 块（137 无骨架） | ❌ 极弱 |
| pm | pm(11) kano(12) self_cultivation(11) | 29/123 | 76 块（66 无骨架） | ❌ 弱 |
| grammar | predicate(16) tense(15) | 37/68 | 37 块（27 无骨架） | ⚠ 偏弱 |
| expression | structured_thinking(13) | 1/94 | 54 块（53 无骨架） | ❌ 极弱 |
| black-myth | （无超载） | 23/19 | 10 块（9 无骨架） | ⚠ 跨「支撑」边天然分块 |
| game-studio | （无超载）✅ | 47/49 | 1 块 ✅ | ✅ 标杆 |
| programming-languages | （无超载）✅ | 46/27 | 1 块 ✅ | ✅ 标杆 |

**标杆**：game-studio / programming-languages 主干树单块连通、无超载，可作为其余图 P3/P4 的参照模板。

---

### P3 · 逐图数据养护

#### grammar ✅（一个 diff）
新增 6 个语法大类 hub（不删节点）：
- `sentence_pattern`（五大句型）：收编 predicate 直挂的 5 个句型 → `predicate 决定 sentence_pattern` + `sentence_pattern 包含 {sv/svo/svc/svoo/svoc}`。
- `predicate_variation`（谓语三大变化）：收编 时态/语态/语气 → `predicate 承载 predicate_variation` + `predicate_variation 分为 {tense/voice/mood}`（删去 predicate 对 voice/mood 的直连）。
- `function_verb`（功能动词）：收编 助动词/情态/系动词 → `predicate 靠…实现 function_verb` + `function_verb 包含 {auxiliary/modal/linking}`。
- `present/past/future_tense_group`（三个「时」分组）：tense → 3 组 → 12 时态（`tense 包含 group` + `group 包含 各时态`），删去 12 条 `属于 tense` 直连。

结果：predicate 16→9、tense 15→6（**high-fanout 警告全清**）；节点 74→80，骨架边 37→51，骨架块 37→29。
门禁：`npm run lint` ✅ · `npm run validate` ✅（grammar 0 error，仅剩 skeleton-fragmented 一条 warning，属渐进项）。

#### pm ✅（一个 diff）
按 §5.2 把中心 `pm` 从 11 收编到 7（**不新增节点，改连线归属**）：
- `ai_product`：删去 `pm 延伸出 ai_product`，经已有 `pm_types 包含 ai_product` 归属（§5.2 弱化中心直连）。
- `aarrr`：`pm 关注 aarrr` → `product_analysis 包含 aarrr`（数据/分析枝）。
- `ux_design`：删去 `pm 重视 ux_design`，并入「需求→设计链」（已有 `user_journey_map 支撑 ux_design`）。
- `mvp`：`pm 善用 mvp` → `product_strategy 善用 mvp`（战略枝）。

结果：`pm` 中心扇出 11→7（high-fanout 清除）；节点 105 不变，边 152→150。
门禁：`lint` ✅ · `validate` ✅（pm 0 error）。
**遗留**：二级 hub `kano`(12)/`self_cultivation`(11) 非 §5.2 目标、属粒度齐平的扁平分类，强行再分层有灌水嫌疑 → 已记入 `low_confidence.md` 待人工裁决。

#### ai 🟡（一个 diff · 部分收敛 + 关键结论）
新增 2 个二级 hub（收编粒度齐平子列表，补骨架边）：
- `transformer_training`（训练方案）：收编 Adam/预热/标签平滑/WMT → transformer 17→14。
- `llm_inference_opt`（推理与部署优化）：收编 量化/蒸馏/推测解码/本地部署 → llm 19→16。

**关键结论（已记 low_confidence #3）**：ai 二级 hub 的剩余度数主要是 §1-B「交叉关系」（被借鉴/代表/演化/驱动/增强），是图谱最有价值的横向知识点，**强行收一层＝退化成树，违反 §1-B/Harness**。故 transformer(14)/llm(16)/ai_agent(12)/rag(10)/diffusion(10)/text_to_video(11) 的 high-fanout **保留**，待人工定调。
骨架 13→19、块 142→138。门禁：`lint` ✅ · `validate` ✅（ai 0 error）。

## 下一步

- **expression**：structured_thinking(13) 一个超载 + 骨架仅 1/94（极弱），可补骨架边。
- **P4**：粒度对齐 + §6 合并判据复核（全图收尾）。
- **待人工裁决**：见 `low_confidence.md`（pm kano/self_cultivation、ai 二级 hub、high-fanout 是否区分骨架扇出）。
- game-studio / programming-languages 已达标，作参照。
- **P4**：粒度对齐 + §6 合并判据复核（全图收尾）。

> 养护原则：每图一个可 review diff，只改边归属/补大类 hub，不删节点、不硬凑关系。

> P0–P2「机制」已全图受益一次到位；P3–P4「数据养护」分图渐进，每图独立可回退。
