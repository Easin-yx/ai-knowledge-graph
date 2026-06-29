# 知识图谱生成提示词模板

> **使用方式**：
> 1. 填写「Step 1：填写参数」里的所有字段（含 group / domain）
> 2. 把「Step 2：完整 Prompt」的全部内容复制到 Gemini 网页
> 3. 把 Step 1 填好的参数替换到 Prompt 里的 `{{占位符}}` 处
> 4. 发送给 Gemini，得到 `.ts` 文件
> 5. 把文件存为 `src/data/maps/<id>.ts`，用 Step 3 的指令让 Cursor Agent 完成注册

---

## Step 1：填写你的主题参数

每次新建图谱，只需修改这里：

```
主题名称（中文）：人形机器人
主题名称（英文）：Humanoid Robot
文件 id（英文连字符）：humanoid-robot
根节点 id（snake_case）：humanoid_robot
根节点 label（中文）：人形机器人
节点类型集合：concept / technology / company / product / component / application

group（意图）：interest
  可选值：interest（兴趣/学习类）| professional（求职/专业向）

domain（领域）：tech-product
  可选值：tech-product（技术与产品）| game-dev（游戏研发）| language（语言表达）

覆盖范围大板块：
  1. 核心技术
  2. 硬件组件
  3. 代表企业（特斯拉、波士顿动力、宇树科技、Figure AI、优必选、逐际动力等）
  4. 应用场景（工业制造、家庭服务、医疗康复）
  5. 产业链
```

---

## Step 2：完整 Prompt（复制全部内容发给 Gemini）

---

你是一位知识图谱工程师。请为「{{主题名称（中文）}}」生成一份完整的 TypeScript 知识图谱数据文件，直接可放入 React 项目中使用，不需要任何格式调整。

---

### 一、输出文件结构

请严格按以下结构输出，不要增删变量名：

```typescript
import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

const {{文件id驼峰}}GraphData: GraphData = {
  nodes: [ /* 所有节点 */ ],
  edges: [ /* 所有边 */ ],
};

const {{文件id驼峰}}TypeStyles: Record<string, NodeTypeStyle> = {
  /* 六种类型的配色，结构见下方 */
};

const {{文件id驼峰}}TypeOrder: string[] = [
  "concept", "technology", "company", "product", "component", "application"
];

export const {{文件id驼峰}}Map: KnowledgeMap = {
  id: "{{文件id}}",
  label: "{{主题名称（中文）}}",
  subtitle: "行业知识图谱",
  data: {{文件id驼峰}}GraphData,
  typeStyles: {{文件id驼峰}}TypeStyles,
  typeOrder: {{文件id驼峰}}TypeOrder,
  preferredSeed: "{{根节点id}}",
  group: "{{group}}",
  domain: "{{domain}}",
};
```

---

### 二、节点接口（严格遵守）

```typescript
interface KnowledgeNode {
  id: string;        // snake_case 英文小写，全图唯一，如 "motor_control"
  label: string;     // 中文显示名，如 "运动控制"
  type: string;      // 只能从：concept / technology / company / product / component / application 里选
  details: {
    zh_label?: string;                          // 可选：英文名
    summary: string;                            // 必填：一句话说明（中文，30-60字）
    analogy?: string;                           // 可选：通俗类比（"像……"开头）
    notes?: string;                             // 可选：延伸细节
    key_concepts?: string[];                    // 可选：3-6个关键词
    facts?: { label: string; value: string }[]; // 可选：属性表（公司/产品节点用）
    source?: { type: "conversation" };          // 统一写这个
  };
}
```

**TypeStyles 配色结构（为每种 type 选一个主色）：**

```typescript
{
  concept:     { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "概念" },
  technology:  { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "技术" },
  company:     { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "企业" },
  product:     { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "产品" },
  component:   { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "组件" },
  application: { base: "#HEX", glow: "rgba(r,g,b,0.30)", label: "应用场景" },
}
```

---

### 三、不同节点类型的字段规则（重要）

每种 type 使用不同的字段组合，请严格遵守：

| type | 必须有 | 推荐有 | 不要用 |
|---|---|---|---|
| concept | summary | analogy, notes, key_concepts | facts |
| technology | summary | analogy, notes, key_concepts | facts |
| company | summary | facts（成立/总部/产品/融资）, notes | analogy |
| product | summary | facts（发布时间/规格/制造商）, notes | analogy |
| component | summary | notes, key_concepts, analogy | facts |
| application | summary | notes, key_concepts | facts |

**各类型完整示例：**

```typescript
// ── concept（抽象概念）：重在 analogy 打通认知 ──
{
  id: "embodied_intelligence",
  label: "具身智能",
  type: "concept",
  details: {
    zh_label: "Embodied Intelligence",
    summary: "机器人通过身体与物理世界交互来获取和运用知识的智能范式，强调「感知-行动」闭环，而非纯数字推理。",
    analogy: "像人类小孩学会「热」这个概念——不是靠背定义，而是摸到开水烫了一次才真正懂——机器人也要靠身体交互才能建立真实的世界模型。",
    key_concepts: ["感知-行动闭环", "物理交互", "世界模型", "情境学习"],
    source: { type: "conversation" },
  },
},

// ── technology（具体技术）：重在 notes 讲清原理 ──
{
  id: "slam",
  label: "SLAM",
  type: "technology",
  details: {
    zh_label: "Simultaneous Localization and Mapping",
    summary: "机器人在未知环境中同时完成自身定位和地图构建的技术，是自主导航的核心能力。",
    analogy: "像你在完全陌生的黑屋子里边摸索边画地图——一边搞清楚自己在哪，一边把走过的地方记下来。",
    notes: "主流方案：激光 SLAM（精度高，成本高）和视觉 SLAM（成本低，受光照影响）。人形机器人面临挑战：动态障碍物多、双腿运动引入振动干扰定位精度。",
    key_concepts: ["定位", "地图构建", "激光雷达", "视觉SLAM"],
    source: { type: "conversation" },
  },
},

// ── company（企业）：重在 facts 列客观数据 ──
{
  id: "unitree_robotics",
  label: "宇树科技",
  type: "company",
  details: {
    zh_label: "Unitree Robotics",
    summary: "中国头部人形及四足机器人企业，以高性价比产品著称，代表产品 H1/G1 在全球开发者群体中广泛采用。",
    facts: [
      { label: "成立时间", value: "2016年" },
      { label: "总部", value: "杭州" },
      { label: "代表产品", value: "H1、G1、B2（四足）" },
      { label: "融资情况", value: "B轮融资，投资方含深创投" },
      { label: "市场定位", value: "高性价比，面向研究者和开发者" },
    ],
    source: { type: "conversation" },
  },
},

// ── product（具体产品/机型）：重在 facts 列规格参数 ──
{
  id: "optimus_gen2",
  label: "Optimus Gen 2",
  type: "product",
  details: {
    zh_label: "Tesla Optimus Gen 2",
    summary: "特斯拉第二代人形机器人，大幅提升运动能力与手部灵巧度，目标是在特斯拉工厂执行重复性生产任务。",
    facts: [
      { label: "发布时间", value: "2023年12月" },
      { label: "身高", value: "1.73m" },
      { label: "重量", value: "57kg" },
      { label: "全身自由度", value: "28个" },
      { label: "手部", value: "11自由度灵巧手，可拿鸡蛋不破" },
      { label: "行走速度", value: "0.5 m/s（Gen1 两倍）" },
      { label: "制造商", value: "特斯拉" },
    ],
    source: { type: "conversation" },
  },
},

// ── component（硬件组件）：重在 notes 讲技术原理 ──
{
  id: "actuator",
  label: "执行器",
  type: "component",
  details: {
    zh_label: "Actuator",
    summary: "将电能转化为机械运动的核心驱动部件，是决定机器人力量、速度和精度的关键硬件。",
    analogy: "像人体的肌肉——接收大脑（控制器）的指令，把能量转化成实际的关节运动。",
    notes: "当前主流方案：电机+减速器（集成关节）。关键指标：峰值力矩、带宽（响应速度）、功率密度。人形机器人对比工业机器人：需要更高功率密度 + 更低噪声，技术难度显著更高。",
    key_concepts: ["峰值力矩", "功率密度", "带宽", "集成关节"],
    source: { type: "conversation" },
  },
},

// ── application（应用场景）：重在 notes 讲落地逻辑 ──
{
  id: "industrial_manufacturing",
  label: "工业制造",
  type: "application",
  details: {
    zh_label: "Industrial Manufacturing",
    summary: "人形机器人在工厂中执行搬运、装配、检测等重复性体力劳动，替代人工完成危险或高强度工序。",
    notes: "最先商业化落地的场景：结构化环境、任务重复性高、对灵活性要求相对低。特斯拉、富士康等已在试点。挑战：万件级产品换型时的快速重编程能力。",
    key_concepts: ["结构化环境", "重复性任务", "人机协作", "柔性制造"],
    source: { type: "conversation" },
  },
},
```

---

### 四、边接口（严格遵守）

```typescript
interface KnowledgeEdge {
  id: string;       // 格式固定："{source}__{label}__{target}"
  source: string;   // 源节点 id
  target: string;   // 目标节点 id
  label: string;    // 从下方词表选
  directed?: boolean; // 对称关系（对比/区别于）设为 false，其余省略
}
```

**边 label 词表（只能从这里选）：**

骨架词（主干边，实线常显，决定层级）：
`包含` `分为` `细分为` `构成` `组成` `属于`

关联词（次级边，hover 时显示，表达横向关系）：
`依赖` `使用` `支撑` `影响` `演化为` `被取代于` `对比` `区别于` `应用于` `驱动` `基于` `借鉴于` `代表` `服务于` `协作于` `竞争于` `投资于` `合作于`

**边 id 示例：**
```typescript
{ id: "humanoid_robot__包含__motor_control", source: "humanoid_robot", target: "motor_control", label: "包含" }
{ id: "motor_control__依赖__actuator",        source: "motor_control",  target: "actuator",      label: "依赖" }
{ id: "unitree_robotics__对比__boston_dynamics", source: "unitree_robotics", target: "boston_dynamics", label: "对比", directed: false }
```

---

### 五、结构约束（必须遵守）

1. **根节点**：id 为 `{{根节点id}}`，label 为「{{根节点label}}」，type 为 `concept`
2. **扇出控制**：任何节点直接连线数不超过 9，理想 5-7；超过时新增一个中间 Hub 收拢
3. **层级深度**：3-4 层，根→大类→具体概念→细节；不要太扁也不要太深
4. **同级边原则**：共享同一父节点的兄弟节点，只在有方向性的因果/演化/替代关系时才连边（如"A 被 B 取代"）；不要只因为"它们都是同类"就加边
5. **节点规模**：总节点数 60-100 个
6. **边 id 格式**：严格使用 `{source}__{label}__{target}`，两个下划线，label 用中文

---

### 六、知识覆盖范围（{{主题名称（中文）}}专属）

请确保覆盖以下板块：

{{在此填入你的覆盖范围大板块列表}}

---

### 七、输出要求

- 直接输出完整的 TypeScript 文件内容
- 不要输出任何解释文字
- 不要用 markdown 代码块（```）包裹
- 直接输出可以保存为 `.ts` 文件的纯文本
- 所有中文字符使用 UTF-8 编码，不要用 Unicode 转义

---

## Step 3：Cursor 里的收尾操作（复制后替换 `<id>` 为实际文件名）

生成 `.ts` 文件并保存到 `src/data/maps/<id>.ts` 后，在 Cursor 开新对话：

```
帮我把 src/data/maps/<id>.ts 注册到 src/data/maps/index.ts，
然后跑 npm run validate，报错的话帮我修。
完成后在 docs/build-notes/<id>/ 建四件套：
taxonomy.md（空模板）、PLAN.md（空模板）、progress.md（空模板）、low_confidence.md（空模板）。
```

---

## 历史生成记录

| 日期 | 主题 | 文件 id | 节点数 | group / domain | 状态 |
|---|---|---|---|---|---|
| （待填写） | | | | | |
