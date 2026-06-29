# 人形机器人 · 进度（progress）

> 跨会话记忆：每轮 loop 结束后更新此文件。

## 当前状态

- **阶段**：L0 / L1 全通过，可进入打磨模式
- **L0**：✅ 通过（0 error）
- **L1**：✅ 100%（117/117，core 0 缺口）
- **节点数**：135
- **边数**：140

## 已完成

- [x] Gemini 生成初版数据（`humanoid-robot.ts`）
- [x] 注册到 `src/data/maps/index.ts`
- [x] `npm run validate` L0 通过
- [x] 建立四件套文档
- [x] `scripts/taxonomy.ts` 登记 `HUMANOID_ROBOT_TAXONOMY`，接入 `TAXONOMY_REGISTRY`
- [x] `package.json` 加 `check-coverage:humanoid-robot`
- [x] `check-coverage` L1 100%

## 下一步

1. L3 内容打磨：按评分卡五维度（准确性/可学性/链路完整/粒度一致/去水分）逐模块评估
2. 评估 135 个节点是否有灌水/冗余，必要时降级到 `low_confidence.md`
3. 补骨架边，改善 `skeleton-fragmented` warning（7个无骨架边的节点）

## 历史批次

| 日期 | 批次 | 操作 | 节点变化 | 备注 |
|---|---|---|---|---|
| 2026-06-28 | 初始化 | Gemini 生成 + 注册 | 0→135 | L0 通过 |
