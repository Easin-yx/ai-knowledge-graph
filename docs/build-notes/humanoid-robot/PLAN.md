# 人形机器人 · 执行计划（PLAN）

## 目标

- 节点规模：60-100 个（当前 135，可按需精简或维持）
- 覆盖 taxonomy core 板块 100%
- L0 验证零 error

## 验收标准

- [ ] `npm run validate` 零 error
- [ ] taxonomy core 板块全部有节点覆盖
- [ ] 每个节点 summary 准确，company/product 节点有 facts

## 当前状态

- 节点数：135
- 边数：140
- L0：通过（0 error，1 warning：skeleton-fragmented）

## 待办

- [ ] 接入 `scripts/taxonomy.ts` 登记 `HUMANOID_ROBOT_TAXONOMY`
- [ ] 在 `package.json` 加 `check-coverage:humanoid-robot` 脚本
- [ ] 补骨架边（`包含`/`分为`），改善 skeleton-fragmented warning
