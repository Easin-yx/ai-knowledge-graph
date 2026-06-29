# 知识图谱项目 · 全局仪表盘

> **新对话第一步：读这个文件。** 然后读 `docs/OWNER_VISION.md` 了解主人的视觉与结构期望，再按下方状态表找到对应图谱的 `progress.md` 续跑。

---

## 七张图谱当前状态

> 以 `docs/build-notes/graph-cultivation/progress.md` 的实测数据为准，每轮养护后同步更新本表。

| 图谱 | 当前阶段 | 最紧迫问题 | 详细记录 |
| --- | --- | --- | --- |
| `ai` | P3 进行中 | 骨架边极弱（仅 19/259），待独立一轮补充骨架边 | [progress.md](build-notes/ai/progress.md) |
| `pm` | P3 ✅ | 二级 hub kano(12)/self_cultivation(11) 待人工裁决是否再分层 | [progress.md](build-notes/pm/progress.md) |
| `grammar` | P3 ✅ | 骨架连通块仍 29 块，可进一步补骨架边 | [progress.md](build-notes/graph-cultivation/progress.md) |
| `expression` | P3 待开始 | structured_thinking 超载(13)，骨架仅 1/94（极弱） | [progress.md](build-notes/graph-cultivation/progress.md) |
| `black-myth` | 打磨模式 | L3 内容严谨性（C 端↔B 端映射）+ low_confidence 待清零 | [LOOP.md](build-notes/black-myth/LOOP.md) |
| `game-studio` | 达标 ✅ | 维护模式，按需巡检 | [LOOP.md](build-notes/game-studio/LOOP.md) |
| `programming-languages` | 优化中 | OPTIMIZE_PLAN P3 已完成，维护 loop 持续进行 | [progress.md](build-notes/programming-languages/progress.md) |

**标杆**：`game-studio` / `programming-languages` 骨架主干单块连通、无超载，是其余图谱的参照目标。

---

## 主人期望说明书

> AI 在改任何图谱之前，必须先读 **[docs/OWNER_VISION.md](OWNER_VISION.md)**。
> 该文档记录了主人对图谱视觉与结构的具体期望，是凌驾于通用规则之上的「个性化标准」。

---

## 续跑启动语（直接复制给新对话）

### 补全模式（大纲有缺口 / 新建图谱）
```
读 docs/DASHBOARD.md 了解全局状态，读 docs/OWNER_VISION.md 了解主人期望，
再读 docs/build-notes/<领域>/progress.md，按 Loop Engineering 工作流继续补全图谱。
从「下一步」开始。先跑 validate + check-coverage，每轮只做一个领域。
```

### 打磨模式（覆盖率已达标，提升内容质量）
```
读 docs/DASHBOARD.md 了解全局状态，读 docs/OWNER_VISION.md 了解主人期望，
再读 docs/build-notes/<领域>/LOOP.md 与 progress.md，按 L3 评分卡执行打磨 loop。
从「下一步」模块开始。验证子 Agent 只评不改；拿不准进 low_confidence.md。
```

### 维护巡检模式（图谱成型后的日常维护）
```
读 docs/DASHBOARD.md 了解全局状态，读 docs/OWNER_VISION.md 了解主人期望，
再读 docs/build-notes/maintenance-loop.md，对 <领域/all> 执行维护 loop：
每轮先跑 validate + lint (+ check-coverage:<id>)，巡检 C/L/N 三类问题，
锁定一个 → 确认 → 最小修法 → 改 → 自验全绿 → 记 progress，再回到巡检。
拿不准进 low_confidence.md；上下文将满时按收尾流程退出。
```

### 养护重构模式（专项改视觉/结构）
```
读 docs/DASHBOARD.md 了解全局状态，读 docs/OWNER_VISION.md 了解主人期望，
再读 docs/build-notes/graph-cultivation/PLAN.md，从当前阶段（P3/P4）继续：
按「养图谱六法」和「合并判据」逐图审计，每次只动一张图的数据，产出一个可 review 的 diff。
```

---

## 文档体系速览

```
docs/
├── DASHBOARD.md          ← 你在这里，新对话入口
├── OWNER_VISION.md       ← 主人期望（视觉 + 逐图结构期望）
├── PRD.md                ← 产品需求文档
└── build-notes/
    ├── loop-engineering.md      ← 总方法论（Loop Engineering）
    ├── maintenance-loop.md      ← 维护巡检手册
    ├── graph-cultivation/
    │   ├── PLAN.md              ← 视觉与结构改造大计划（P0-P4）
    │   ├── progress.md          ← 养护进度（grammar/pm/ai/expression）
    │   └── low_confidence.md    ← 待裁决项队列
    ├── ai/           ← ai 图谱专属档案
    ├── pm/           ← pm 图谱专属档案
    ├── black-myth/   ← 黑神话专属档案（含 LOOP.md）
    ├── game-studio/  ← 游戏研发中台（含 LOOP.md）
    └── programming-languages/  ← 编程语言（含 OPTIMIZE_PLAN.md）
```
