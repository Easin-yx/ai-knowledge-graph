# 编程语言知识图谱 — 进度

| 批次 | 内容 | 状态 |
|------|------|------|
| 0 | 文档 + UI + 注册 + validate 规则 | ✅ 完成 |
| 1 | 根 + 模块 ①② + 翻转内容 | ✅ 完成 |
| 2 | 模块 ③④ | ✅ 完成 |
| 3 | 模块 ⑤⑥ | ✅ 完成 |
| 4 | 模块 ⑦⑧⑨ + 衔接边 | ✅ 完成 |
| 5 | validate + lint 全绿 | ✅ 完成 |

| P1 | CodeBlock + Shiki 语法高亮 | ✅ 完成 |
| P2 | 内容模型按角色分形态 | ✅ 完成 |
| P3 | order 属性 + 布局排序解耦 + 边清理 | ✅ 完成 |

**交付摘要：** 47 节点 · 59 边（P3 清理后） · `npm run validate` 零 error · `tsc --noEmit` 通过

---

## 维护 Loop 记录（按 `docs/build-notes/maintenance-loop.md`）

### [维护] 轮 2 · 2026-06-24
- 类别：L（准确性 / 代码 bug）
- 问题：`syntax_vs_semantics` 节点 Python 示例 `total += i` 未初始化 `total`，实际会 `NameError`（TS 面已正确 `let total = 0`）。
- 确认依据：人读 + 与同节点 backstage TS 代码对照。
- 修法：Python 代码块补 `total = 0`。
- 自验：`validate` 0 error · `lint` 干净。

### [维护] 轮 3 · 2026-06-24
- 类别：N（一致性 / 准确性）
- 问题：`interpreter_vs_compiler` 节点 Python 面把 shell 命令 `python hello.py` 标成 ```python 代码块（图内其它 shell 命令用 ```bash）。
- 确认依据：与 `package_manager` / `version_control` 等节点的 ```bash 约定对照。
- 修法：fence 改为 ```bash 并补注释。
- 自验：`validate` 0 error · `lint` 干净。

### [维护] 轮 4 · 2026-06-24（降级，未改图）
- 类别：L（边语义存疑）
- 问题：`interpreter_vs_compiler__对比__sync_vs_async` 跨维度硬凑「对比」边，存疑。
- 处置：按「拿不准就降级」，不擅自删边，记入 `low_confidence.md`（L-1）交人工裁决。
- 自验：图未变更，门禁维持全绿。
