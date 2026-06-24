# 编程语言知识图谱 — 执行计划与验收标准

> 视角：编程萌新 · vibe coding 实践者  
> 叙事：编程逻辑是通用的，语言只是不同的「写法」；通过翻转卡片在 Python 与 TypeScript 之间对照学习。

---

## 0. 目标

在现有力导向知识图谱 app 中**新增第 7 个领域 `programming-languages`**，帮助萌新建立「概念优先、语法其次」的编程认知。

---

## 1. 图谱元信息

| 字段 | 值 |
|------|-----|
| `id` | `programming-languages` |
| `label` | 编程语言 |
| `subtitle` | Python × TypeScript · 概念对照 · 萌新友好 |
| `group` | `professional` |
| `preferredSeed` | `programming` |
| 数据文件 | `src/data/maps/programming-languages.ts` |

---

## 2. 翻转卡片语义

| 面 | 字段 | 内容 |
|----|------|------|
| 正面 | `details` | 通用概念 + Python 写法 |
| 背面 | `details.backstage` | TypeScript 写法 + 差异说明 |

翻转控件标签：`Python` / `TypeScript`（通过 `perspectiveLabels` 配置）。

---

## 3. 节点规模

43 个节点：1 根 + 9 模块 + 33 叶子。详见 `taxonomy.md`。

---

## 4. 验收标准

见 PLAN 草案 §9（A–F 六类），以 `npm run validate` 零 error 为硬门禁。
