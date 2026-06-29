# 养护重构 · 失败降级队列（low_confidence）

> 拿不准的不直接改图（Loop Engineering §8 / Harness「禁止灌水·禁止破坏式重写」）。
> 每条记录：节点/问题、现状、可选方案、存疑原因、待裁决问题。人工清空后该项才算闭环。

---

## 1. pm · `kano` 二级 hub 扇出 12（待裁决是否再分层）

- **现状**：`kano` 度数 12。其中 5 类需求（must_be / performance / attractive / indifferent / reverse）以「构成」直挂 kano，另有 kano_questionnaire / better_worse / satisfaction_curve / maslow / user_value / cost_benefit 等关联。
- **可选方案**：新增「Kano 五类需求」分组 hub，把 5 类需求收到其下（kano 12→8）。
- **存疑原因**：五类需求是 Kano 模型的**核心内容且粒度齐平**，直接放射本身是清晰的扁平分类；加中间层可能属于「为过指标而拆分」（Harness #2 灌水）。
- **待裁决**：是否值得为降 1 个二级 hub 的扇出而新增分组节点？还是接受 12（教学上可读）？

## 2. pm · `self_cultivation` 二级 hub 扇出 11（待裁决是否再分层）

- **现状**：`self_cultivation` 度数 11 = 7 个「包含」能力（沟通/逻辑/学习/时间管理/影响力/产品感/决策）+ pm修炼(in) + pdca支撑(in) + t_shaped支撑(in) + 贯穿pm_growth(out)。
- **可选方案**：① 把 7 项能力按「通用职场能力 / 产品专项能力」拆 2 个子 hub；② 把 pdca / t_shaped 这两条「支撑」边改挂到更具体的 learning_ability 下。
- **存疑原因**：7 项能力本身粒度齐平、是一份合理的胜任力清单（≤7 在理想区间）；方案①新增节点有过度拆分嫌疑，方案②改变了「PDCA/T型 支撑整体自我修养」的原意。
- **待裁决**：保持 11（语义最忠实）还是采纳方案②（轻量、降到 9）？

## 3. ai · 多个二级 hub 总度数 > 9（多为 §1-B 价值交叉链，已收编可收编项）

- **现状（养护后）**：transformer(14) llm(16) ai_agent(12) rag(10) diffusion_model(10) text_to_video(11)。
- **已做**：把两类**粒度齐平的子列表**收了一层并补骨架边（不动交叉链）：
  - `transformer_training`（训练方案）收编 Adam/预热/标签平滑/WMT（transformer 17→14）。
  - `llm_inference_opt`（推理与部署优化）收编 量化/蒸馏/推测解码/本地部署（llm 19→16）。
- **存疑原因（关键）**：这些 hub 的**剩余度数主要是 §1-B「交叉关系」**——如 `transformer 被借鉴于 diffusion/dit`、`rnn 被取代于 transformer`、`llm 驱动 ai_agent`、`bert/t5 代表`、`moe 增强 llm` 等。这些是**对等概念间的横向知识点，正是图谱相对思维导图最值钱的部分**；强行塞进 hub 收一层＝把图退化成树（违反 PLAN §1-B 与 Harness #2/#3）。
- **待裁决**：
  1. 是否接受 ai 这些二级 hub 总度数 10–16 为「中心节点天然高连通」，不再强收？（倾向：接受）
  2. high-fanout 校验是否应区分「骨架扇出」与「总度数」，对富交叉链的图只看骨架扇出？（需人工定调，因 grammar/pm 的「扇出」按总度数计才说得通）
  3. ai 真正可做的是**补骨架边**（当前骨架仅 19/259，主干树极弱）——属较大的内容工程，建议作为独立后续轮次。

---

## 已闭环

（暂无）
