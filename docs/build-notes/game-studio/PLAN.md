# 游戏研发中台知识图谱 — 执行计划与验收标准

> 视角：游戏开发团队的**中后台产品经理**  
> 叙事：C 端玩家体验是交付物，研发团队的协作、配置、管线、洞察才是中后台 PM 的用户场景。

---

## 0. 目标

在现有力导向知识图谱 app 中**新增第 6 个领域 `game-studio`**，以 ARPG 工作室为典型场景，系统梳理研发侧信息化产品与流程——与黑神话悟空图谱形成「行业全景 → 单品深拆」阅读链。

---

## 1. 图谱元信息

| 字段 | 值 |
|------|-----|
| `id` | `game-studio` |
| `label` | 游戏研发中台 |
| `subtitle` | ARPG 工作室 · 中后台产品经理视角 |
| `group` | `interest` |
| `preferredSeed` | `studio_platform` |
| 数据文件 | `src/data/maps/game-studio.ts` |

---

## 2. 节点规模（一次性交付）

| 模块 | 模块节点 | 叶子节点数 | 小计 |
|------|---------|-----------|------|
| 根 | `studio_platform` | — | 1 |
| ① 研发协作底座 | `collab_foundation` | 5 | 6 |
| ② 资产与内容管线 | `asset_content_pipeline` | 6 | 7 |
| ③ 数值与配置平台 | `config_platform` | 5 | 6 |
| ④ 质量与构建基础设施 | `quality_infra` | 5 | 6 |
| ⑤ 数据与洞察中台 | `data_insight` | 5 | 6 |
| ⑥ AI 赋能研发工作流 | `ai_workflow` | 6 | 7 |
| ⑦ ARPG 品类特化约束 | `arpg_constraints` | 5 | 6 |
| ⑧ 标杆案例 | `benchmark_cases` | 1 | 2 |
| **合计** | | | **47** |

---

## 3. 类型体系（typeStyles）

`overview` · `foundation` · `pipeline` · `config` · `quality` · `data` · `ai` · `arpg` · `case`

---

## 4. 边语义

| 关系 | 含义 |
|------|------|
| `包含` | 模块层级（根 → 模块 → 叶子） |
| `依赖` | 上游产出是下游输入 |
| `门禁` | 质量/流程卡点 |
| `洞察` | 数据反哺设计或调优 |
| `约束` | ARPG 品类对中后台的特殊要求 |
| `赋能` | AI 增强某研发环节 |
| `案例` | 标杆产品实例化某通用能力 |

跨模块边 ≥ 18 条，避免「只有树没有网」。

---

## 5. 节点内容模板（中后台 PM 四问）

每个叶子节点必须回答：

1. **是什么**（summary）
2. **解决什么痛点、谁用、上下游怎么接**（notes）
3. **3+ 个 B 端关键词**（key_concepts）
4. **非游戏行业类比**（analogy）

---

## 6. 与黑神话的衔接

- `black_myth_wukong` 作为 `benchmark_cases` 下叶子节点
- summary/notes 中引导读者切换到「黑神话悟空」图谱深入
- 通用节点（如 `asset_pipeline`、`numeric_config_cms`）notes 注明「黑神话图谱有单品实例」
- **不**在黑神话图中增改节点

---

## 7. 执行步骤

1. 新建 `docs/build-notes/game-studio/taxonomy.md` + `progress.md`
2. 新建 `src/data/maps/game-studio.ts`（47 节点 + 全部边 + typeStyles + map 导出）
3. 注册到 `src/data/maps/index.ts`
4. 注册 `GAME_STUDIO_TAXONOMY` 到 `scripts/taxonomy.ts`
5. `npm run validate` + `npm run lint` 零 error
6. `npm run dev` 自查切换与浏览

---

## 8. 验收标准（Acceptance Criteria）

逐条可核验，**全过即视为一次性交付完成**：

### A. 领域可用
- [ ] 顶部下拉「兴趣向」分组出现「游戏研发中台」，可切换
- [ ] 切换后种子节点 `studio_platform` 正确展开

### B. 数据完整性
- [ ] 节点数 = 47，覆盖 taxonomy 全部 id
- [ ] 边数 ≥ 70（含层级边 + 跨模块关系边）
- [ ] `npm run validate` 对 `game-studio` **零 error**
- [ ] 无孤儿节点、无悬挂边、type 全部在 typeStyles 中定义
- [ ] `preferredSeed` 指向存在的节点

### C. 内容质量（中后台 PM 视角）
- [ ] 8 个模块全部有模块枢纽节点 + 叶子节点
- [ ] 每个叶子节点：summary / analogy / notes / key_concepts(≥3) / source 均已填写
- [ ] `black_myth_wukong` 案例节点含切换到黑神话图谱的引导文案
- [ ] 跨模块边覆盖 `依赖` `门禁` `洞察` `约束` `赋能` `案例` 六类语义

### D. 架构一致性
- [ ] 不引入 `backstage` 字段（本图即 B 端视角，无需翻转）
- [ ] ai / pm / grammar / black-myth / expression 五图无回归
- [ ] `npm run lint` 通过

### E. 文档
- [ ] `docs/build-notes/game-studio/taxonomy.md` 镜像全部节点 id
- [ ] `docs/build-notes/game-studio/progress.md` 记录交付状态

---

## 9. 开放项（已拍板）

1. 不做卡片翻转 — 本图纯 B 端视角 ✓
2. 暂不接 check-coverage 门禁 — 先保证结构与内容 ✓
3. label 中文 + zh_label 英文别名 ✓
