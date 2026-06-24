import type { GraphData, KnowledgeMap } from "../../types";
import type { NodeTypeStyle } from "../../constants/theme";

// ============================================================
// 编程语言知识图谱 — Python × TypeScript · 翻转卡片对照
//
// 正面 details = 通用概念 + Python 写法
// 背面 backstage = TypeScript 写法 + 差异说明
// SQL 分支为单面卡片（第三种语言，不翻转）
// ============================================================

const PL_SOURCE = { type: "conversation" as const };

const plGraphData: GraphData = {
  nodes: [
    // ─── 根 ─────────────────────────────────────────────────
    {
      id: "programming",
      label: "编程语言",
      type: "overview",
      details: {
        zh_label: "Programming Languages",
        summary:
          "用形式化的指令告诉计算机完成任务——本图帮你建立「概念优先、语法其次」的认知，并在 Python 与 TypeScript 之间翻转对照。",
        analogy: "像学开车：交通规则（编程逻辑）各国相同，只是方向盘左右舵（语法）不同。",
        notes:
          "【阅读路线】沿「前置」边顺序学：基础概念 → 变量类型 → 控制流 → 函数 → 数据结构 → OOP与模块 → 异步API → 工具链 → SQL。\n【衔接】带「衔接」边的节点会指向 AI / PM 图谱的相关概念（在笔记中标注）。\n【翻转】绝大多数叶子节点可翻转到 TypeScript 写法。",
        key_concepts: ["概念优先", "Python", "TypeScript", "翻转对照"],
        source: PL_SOURCE,
      },
    },

    // ─── ① 基础概念 ─────────────────────────────────────────
    {
      id: "basics",
      label: "基础概念",
      type: "concept",
      details: {
        zh_label: "Basics",
        summary: "写代码之前先搞懂：代码是什么、程序怎么运行、语法和语义有何区别。",
        analogy: "像学写字前先认识纸笔和书写规则，再谈写什么文章。",
        notes: "本模块 4 个节点，建议顺序阅读。学完可进入「变量与类型」。",
        key_concepts: ["代码本质", "运行方式", "语法语义", "Hello World"],
        source: PL_SOURCE,
      },
    },
    {
      id: "what_is_code",
      label: "代码是什么",
      type: "concept",
      details: {
        zh_label: "What Is Code",
        summary: "代码是用编程语言写下的精确指令序列，告诉计算机逐步完成某项任务。",
        analogy: "像一份不允许歧义的菜谱：每一步必须明确，厨师（计算机）照做即可。",
        notes: "Python 示例：\n```python\n# 让计算机打印一句话\nprint(\"你好，世界\")\n```",
        key_concepts: ["指令序列", "精确无歧义", "print", "源文件"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 同样用源文件写指令，但通常需编译或转译后才能在浏览器/Node 中运行。",
          notes:
            "TypeScript 示例：\n```typescript\n// 浏览器或 Node 中输出\nconsole.log(\"你好，世界\");\n```\n差异：Python 用 `print()`，TS/JS 用 `console.log()`；TS 文件后缀 `.ts`。",
          key_concepts: ["console.log", ".ts 文件", "转译", "运行时"],
        },
      },
    },
    {
      id: "interpreter_vs_compiler",
      label: "解释型 vs 编译型",
      type: "concept",
      details: {
        zh_label: "Interpreter vs Compiler",
        summary: "解释型语言边读边执行（如 Python）；编译型先整体翻译再运行（如 C、TypeScript 转 JS）。",
        analogy: "解释型像同声传译：说一句译一句；编译型像先把整本书翻译完再阅读。",
        notes:
          "Python 是解释型，直接 `python script.py` 运行。\n```python\n# 无需编译步骤\npython hello.py\n```",
        key_concepts: ["解释器", "编译器", "边读边执行", "转译"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 需先编译（tsc）或经 Vite 等工具转译为 JavaScript，再在浏览器/Node 执行。",
          notes:
            "常见流程：\n```bash\nnpx tsc hello.ts   # 编译\nnode hello.js      # 运行\n```\n开发时 Vite 在后台自动转译，你改 `.ts` 保存即刷新——这就是 vibe coding 的常见体验。",
          key_concepts: ["tsc", "转译为 JS", "Vite", "构建步骤"],
        },
      },
    },
    {
      id: "syntax_vs_semantics",
      label: "语法 vs 语义",
      type: "concept",
      details: {
        zh_label: "Syntax vs Semantics",
        summary: "语法是写法的规则（标点、关键字）；语义是代码实际表达的意思（做什么）。",
        analogy: "语法像「主谓宾」的句式规则；语义是这句话到底在说什么事。",
        notes:
          "Python：缩进是语法（必须对齐），循环累加是语义。\n```python\nfor i in range(5):\n    total += i  # 语义：把 0~4 加起来\n```",
        key_concepts: ["写法规则", "实际含义", "缩进", "逻辑"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用大括号 `{}` 表代码块（语法），与 Python 缩进不同，但循环累加的语义一致。",
          notes:
            "```typescript\nlet total = 0;\nfor (let i = 0; i < 5; i++) {\n  total += i;\n}\n```\n同一语义，不同语法——学第二门语言时重点看语法差异即可。",
          key_concepts: ["大括号", "分号可选", "语义相同", "语法迁移"],
        },
      },
    },
    {
      id: "hello_world",
      label: "第一个程序",
      type: "syntax",
      details: {
        zh_label: "Hello World",
        summary: "传统上第一个程序输出「Hello, World」，验证环境能正常运行代码。",
        analogy: "像新手机开机喊一声「我在」——确认设备正常。",
        notes:
          "```python\nprint(\"Hello, World\")\n```\n保存为 `hello.py`，终端执行 `python hello.py`。",
        key_concepts: ["print", "hello.py", "终端运行", "环境验证"],
        source: PL_SOURCE,
        backstage: {
          summary: "TS 在 Node 或浏览器控制台输出同样内容，验证工具链正常。",
          notes:
            "```typescript\nconsole.log(\"Hello, World\");\n```\n本项目用 `npm run dev` 启动 Vite，即是在跑 TypeScript/React 环境。",
          key_concepts: ["console.log", "npm run dev", "Vite", "环境验证"],
        },
      },
    },

    // ─── ② 变量与类型 ───────────────────────────────────────
    {
      id: "variables_types",
      label: "变量与类型",
      type: "concept",
      details: {
        zh_label: "Variables & Types",
        summary: "变量是存数据的「盒子」；类型告诉计算机盒子里该放什么格式的数据。",
        analogy: "变量像贴了标签的收纳盒；类型是标签上写的「只放整数」或「只放文字」。",
        notes: "5 个节点：变量 → 类型 → 转换 → 字符串 → 布尔逻辑。",
        key_concepts: ["变量", "类型系统", "转换", "逻辑运算"],
        source: PL_SOURCE,
      },
    },
    {
      id: "variable",
      label: "变量",
      type: "syntax",
      details: {
        zh_label: "Variable",
        summary: "给数据起一个名字，方便后续反复使用和修改。",
        analogy: "像给快递包裹贴收件人编号，下次说编号就能找到同一个包裹。",
        notes:
          "```python\nname = \"小明\"\nage = 18\nname = \"小红\"  # 可以重新赋值\n```",
        key_concepts: ["赋值", "重新赋值", "命名", "动态类型"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 `let`/`const` 声明变量，`const` 不可重新赋值。",
          notes:
            "```typescript\nlet name = \"小明\";\nconst age = 18;\n// age = 19;  // 报错：const 不能改\nname = \"小红\";  // let 可以\n```\n差异：Python 无 let/const 区分；TS 更强调不可变性。",
          key_concepts: ["let", "const", "声明", "不可变"],
        },
      },
    },
    {
      id: "data_types",
      label: "基本数据类型",
      type: "data",
      details: {
        zh_label: "Data Types",
        summary: "整数、浮点数、字符串、布尔是最常用的基本类型。",
        analogy: "像表格里不同列：数字列、文字列、是/否列，不能混填。",
        notes:
          "```python\nn = 42          # int\npi = 3.14       # float\ns = \"hi\"        # str\nok = True       # bool\n```",
        key_concepts: ["int", "float", "str", "bool"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 可显式标注类型，编译期就能发现类型错误。",
          notes:
            "```typescript\nlet n: number = 42;\nlet s: string = \"hi\";\nlet ok: boolean = true;\n```\nTS 的优势：写错类型 IDE 立刻红线提示。",
          key_concepts: ["number", "string", "boolean", "类型标注"],
        },
      },
    },
    {
      id: "type_conversion",
      label: "类型转换",
      type: "syntax",
      details: {
        zh_label: "Type Conversion",
        summary: "在不同类型之间转换，如把字符串 `\"42\"` 变成数字 `42`。",
        analogy: "像把「四十二」这个中文数字翻译成阿拉伯数字 42。",
        notes:
          "```python\nint(\"42\")    # 42\nstr(3.14)    # \"3.14\"\nfloat(\"1.5\") # 1.5\n```",
        key_concepts: ["int()", "str()", "float()", "显式转换"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript/JavaScript 用 `Number()`、`String()` 或一元 `+` 转换。",
          notes:
            "```typescript\nNumber(\"42\");   // 42\nString(3.14);   // \"3.14\"\n+\"1.5\";         // 1.5\n```\n注意：`Number(\"abc\")` 得 `NaN`（非数字），需判断。",
          key_concepts: ["Number()", "String()", "NaN", "一元加号"],
        },
      },
    },
    {
      id: "string",
      label: "字符串",
      type: "data",
      details: {
        zh_label: "String",
        summary: "表示文本的数据类型，支持拼接、切片、格式化。",
        analogy: "像一串珠子，每颗珠子是一个字符，可以截取一段或串成新项链。",
        notes:
          "```python\ns = \"Hello\" + \" World\"\nprint(s[0:5])       # Hello\nprint(f\"{s}!\")       # f-string 格式化\n```",
        key_concepts: ["拼接", "切片", "f-string", "索引"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 模板字符串用反引号，嵌入变量用 `${}`。",
          notes:
            "```typescript\nconst s = \"Hello\" + \" World\";\nconsole.log(s.slice(0, 5));\nconsole.log(`${s}!`);  // 模板字符串\n```",
          key_concepts: ["模板字符串", "slice", "反引号", "${}"],
        },
      },
    },
    {
      id: "boolean_logic",
      label: "布尔与逻辑运算",
      type: "syntax",
      details: {
        zh_label: "Boolean Logic",
        summary: "布尔值 True/False 配合 and、or、not 做条件判断的基础。",
        analogy: "像门禁规则：「有卡并且在工作时间」才能进。",
        notes:
          "```python\nage = 20\nif age >= 18 and age < 60:\n    print(\"成年劳动力\")\n```",
        key_concepts: ["True/False", "and/or/not", "比较运算", "条件基础"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 `true`/`false`（小写）和 `&&`、`||`、`!`。",
          notes:
            "```typescript\nconst age = 20;\nif (age >= 18 && age < 60) {\n  console.log(\"成年劳动力\");\n}\n```",
          key_concepts: ["&&", "||", "!", "小写布尔"],
        },
      },
    },

    // ─── ③ 控制流 ───────────────────────────────────────────
    {
      id: "control_flow",
      label: "控制流",
      type: "concept",
      details: {
        zh_label: "Control Flow",
        summary: "决定代码「先执行谁、后执行谁、是否重复执行」——编程的核心骨架。",
        analogy: "像地铁线路图：哪站换乘、哪段环线重复走，都由控制流决定。",
        notes: "4 个节点：条件 → for → while → break/continue。",
        key_concepts: ["分支", "循环", "跳转", "执行顺序"],
        source: PL_SOURCE,
      },
    },
    {
      id: "conditional",
      label: "条件判断",
      type: "syntax",
      details: {
        zh_label: "Conditional",
        summary: "根据条件真假选择不同代码路径执行（if / elif / else）。",
        analogy: "像路口红绿灯：绿灯走、红灯停，规则决定行为。",
        notes:
          "```python\nscore = 85\nif score >= 90:\n    grade = \"A\"\nelif score >= 60:\n    grade = \"B\"\nelse:\n    grade = \"C\"\n```",
        key_concepts: ["if/elif/else", "分支", "缩进块", "互斥路径"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 `if / else if / else`，条件写在大括号里。",
          notes:
            "```typescript\nlet grade: string;\nconst score = 85;\nif (score >= 90) grade = \"A\";\nelse if (score >= 60) grade = \"B\";\nelse grade = \"C\";\n```",
          key_concepts: ["else if", "大括号", "三元运算符可选", "分支"],
        },
      },
    },
    {
      id: "loop_for",
      label: "for 循环",
      type: "syntax",
      details: {
        zh_label: "For Loop",
        summary: "遍历序列中每个元素，或对固定次数重复执行。",
        analogy: "像流水线质检：每个产品过一遍同样的检查流程。",
        notes:
          "```python\n# 求 1 到 5 的和\ntotal = 0\nfor i in range(1, 6):\n    total += i\nprint(total)  # 15\n```",
        key_concepts: ["range", "遍历", "累加", "迭代变量"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 经典 for 循环用三段式初始化/条件/步进。",
          notes:
            "```typescript\nlet total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total += i;\n}\nconsole.log(total);  // 15\n```\n也可用 `for (const x of arr)` 遍历数组。",
          key_concepts: ["三段式 for", "for...of", "let i", "累加"],
        },
      },
    },
    {
      id: "loop_while",
      label: "while 循环",
      type: "syntax",
      details: {
        zh_label: "While Loop",
        summary: "只要条件为真就重复执行，适合「不知道要循环几次」的场景。",
        analogy: "像「直到碗洗干净才停手」——次数不确定，看条件。",
        notes:
          "```python\nn = 1\nwhile n < 100:\n    n *= 2\nprint(n)  # 128\n```",
        key_concepts: ["条件循环", "无限循环风险", "更新条件", "倍增"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript while 语法与 Python 逻辑相同，注意条件用 `()` 包裹。",
          notes:
            "```typescript\nlet n = 1;\nwhile (n < 100) {\n  n *= 2;\n}\nconsole.log(n);  // 128\n```",
          key_concepts: ["while ()", "条件更新", "死循环", "倍增"],
        },
      },
    },
    {
      id: "break_continue",
      label: "跳出与跳过",
      type: "syntax",
      details: {
        zh_label: "Break & Continue",
        summary: "break 立刻结束整个循环；continue 跳过本次、进入下一次。",
        analogy: "break 像「不玩了直接离场」；continue 像「这轮跳过，下一轮继续」。",
        notes:
          "```python\nfor i in range(10):\n    if i == 3:\n        continue\n    if i == 7:\n        break\n    print(i)  # 0,1,2,4,5,6\n```",
        key_concepts: ["break", "continue", "提前退出", "跳过迭代"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 中 break/continue 语义与 Python 完全一致。",
          notes:
            "```typescript\nfor (let i = 0; i < 10; i++) {\n  if (i === 3) continue;\n  if (i === 7) break;\n  console.log(i);\n}\n```",
          key_concepts: ["break", "continue", "相同语义", "循环控制"],
        },
      },
    },

    // ─── ④ 函数 ─────────────────────────────────────────────
    {
      id: "functions",
      label: "函数",
      type: "concept",
      details: {
        zh_label: "Functions",
        summary: "把一段逻辑打包命名，需要时调用——避免重复写相同代码。",
        analogy: "像洗衣机「标准洗」按钮：按一次，整套流程自动执行。",
        notes: "4 个节点：定义 → 参数 → 作用域 → 匿名函数。",
        key_concepts: ["复用", "调用", "参数", "返回值"],
        source: PL_SOURCE,
      },
    },
    {
      id: "function_definition",
      label: "函数定义",
      type: "syntax",
      details: {
        zh_label: "Function Definition",
        summary: "用 def 关键字定义函数，用 return 返回结果。",
        analogy: "像定制一个「外卖订单处理」流程：接单 → 做菜 → 送出。",
        notes:
          "```python\ndef add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)  # 5\n```",
        key_concepts: ["def", "return", "调用", "函数名"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 function 关键字或箭头函数定义。",
          notes:
            "```typescript\nfunction add(a: number, b: number): number {\n  return a + b;\n}\nconst result = add(2, 3);\n```",
          key_concepts: ["function", "类型标注", "箭头函数", "return"],
        },
      },
    },
    {
      id: "parameters",
      label: "参数与返回值",
      type: "syntax",
      details: {
        zh_label: "Parameters",
        summary: "函数通过参数接收输入，通过 return 把结果交给调用方。",
        analogy: "像自动售货机：投币（参数）→ 出饮料（返回值）。",
        notes:
          "```python\ndef greet(name, greeting=\"你好\"):\n    return f\"{greeting}, {name}!\"\n\ngreet(\"小明\")           # 默认 greeting\ngreet(\"小明\", \"Hi\")     # 自定义\n```",
        key_concepts: ["形参", "实参", "默认值", "返回值"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 参数可设默认值，且必须标注类型。",
          notes:
            "```typescript\nfunction greet(name: string, greeting = \"你好\"): string {\n  return `${greeting}, ${name}!`;\n}\n```",
          key_concepts: ["默认参数", "类型注解", "可选参数", "返回类型"],
        },
      },
    },
    {
      id: "scope",
      label: "作用域",
      type: "concept",
      details: {
        zh_label: "Scope",
        summary: "变量在哪些地方能被访问——函数内外、块级内外规则不同。",
        analogy: "像公司权限：工牌只能刷自己部门的门，别的部门进不去。",
        notes:
          "```python\nx = 10  # 全局\n\ndef foo():\n    y = 20  # 局部，函数外访问不到\n    print(x)  # 可读全局\n```",
        key_concepts: ["全局", "局部", "LEGB 规则", "可见性"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript/JavaScript 有块级作用域（let/const）和函数作用域。",
          notes:
            "```typescript\nconst x = 10;\nfunction foo() {\n  const y = 20;\n  console.log(x);\n}\n// console.log(y);  // 报错\n```\n`var` 有提升陷阱，萌新优先用 let/const。",
          key_concepts: ["块级作用域", "let/const", "var 陷阱", "闭包入门"],
        },
      },
    },
    {
      id: "lambda",
      label: "匿名函数",
      type: "syntax",
      details: {
        zh_label: "Lambda",
        summary: "没有名字的短函数，常用于一次性简单逻辑（如排序、过滤）。",
        analogy: "像便利贴上的临时备忘：不需要正式档案，用完即弃。",
        notes:
          "```python\nnums = [3, 1, 4, 1, 5]\nnums.sort(key=lambda x: -x)  # 降序\n```",
        key_concepts: ["lambda", "key 参数", "匿名", "一行函数"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 箭头函数 `=>` 是匿名函数的主要写法。",
          notes:
            "```typescript\nconst nums = [3, 1, 4, 1, 5];\nnums.sort((a, b) => b - a);  // 降序\n```",
          key_concepts: ["箭头函数", "=>", "sort", "回调"],
        },
      },
    },

    // ─── ⑤ 数据结构 ─────────────────────────────────────────
    {
      id: "data_structures",
      label: "数据结构",
      type: "concept",
      details: {
        zh_label: "Data Structures",
        summary: "组织多个数据的方式：列表、字典、元组、集合、JSON。",
        analogy: "像不同收纳方式：书架（列表）、字典（键值对）、密封袋（元组）。",
        notes: "5 个节点，JSON 节点衔接 AI 图谱的 Token 概念。",
        key_concepts: ["列表", "字典", "集合", "JSON"],
        source: PL_SOURCE,
      },
    },
    {
      id: "list_array",
      label: "列表 / 数组",
      type: "data",
      details: {
        zh_label: "List / Array",
        summary: "有序、可变的元素集合，用索引访问（从 0 开始）。",
        analogy: "像一排编号储物柜，第 0 号柜、第 1 号柜……",
        notes:
          "```python\nfruits = [\"苹果\", \"香蕉\"]\nfruits.append(\"橙子\")\nprint(fruits[0])  # 苹果\n```",
        key_concepts: ["索引", "append", "有序", "可变"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 数组类型写为 `Type[]` 或 `Array<Type>`。",
          notes:
            "```typescript\nconst fruits: string[] = [\"苹果\", \"香蕉\"];\nfruits.push(\"橙子\");\nconsole.log(fruits[0]);\n```",
          key_concepts: ["push", "string[]", "索引", "可变"],
        },
      },
    },
    {
      id: "dict_object",
      label: "字典 / 对象",
      type: "data",
      details: {
        zh_label: "Dict / Object",
        summary: "键值对集合，通过键（key）快速查找对应的值（value）。",
        analogy: "像通讯录：姓名是键，电话号码是值。",
        notes:
          "```python\nuser = {\"name\": \"小明\", \"age\": 18}\nprint(user[\"name\"])\nuser[\"city\"] = \"北京\"\n```",
        key_concepts: ["键值对", "dict", "取值", "增删改"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 对象用花括号，属性可用点号或方括号访问。",
          notes:
            "```typescript\nconst user: { name: string; age: number } = { name: \"小明\", age: 18 };\nconsole.log(user.name);\n(user as Record<string, string>).city = \"北京\";\n```",
          key_concepts: ["对象字面量", "点号访问", "接口", "Record"],
        },
      },
    },
    {
      id: "tuple",
      label: "元组",
      type: "data",
      details: {
        zh_label: "Tuple",
        summary: "不可变的有序序列，适合表示固定结构的数据（如坐标、RGB）。",
        analogy: "像密封的试剂盒：三格分别是 R、G、B，不能随意增删。",
        notes:
          "```python\npoint = (3, 4)\nx, y = point  # 解包\n# point[0] = 5  # 报错：不可变\n```",
        key_concepts: ["不可变", "解包", "固定长度", "坐标"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 元组用 `[Type, Type]` 标注，长度和类型固定。",
          notes:
            "```typescript\nconst point: [number, number] = [3, 4];\nconst [x, y] = point;\n```",
          key_concepts: ["元组类型", "解构", "固定类型", "坐标"],
        },
      },
    },
    {
      id: "set",
      label: "集合",
      type: "data",
      details: {
        zh_label: "Set",
        summary: "无序、不重复的元素集合，适合去重和集合运算。",
        analogy: "像一袋不重复的花色球：抽过的颜色不会再来第二颗。",
        notes:
          "```python\nnums = {1, 2, 2, 3}\nprint(nums)  # {1, 2, 3}\nnums.add(4)\n```",
        key_concepts: ["去重", "无序", "add", "集合运算"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 `Set<T>` 类型，API 与 Python 类似。",
          notes:
            "```typescript\nconst nums = new Set([1, 2, 2, 3]);\nconsole.log(nums);  // Set {1,2,3}\nnums.add(4);\n```",
          key_concepts: ["Set", "new Set()", "去重", "add"],
        },
      },
    },
    {
      id: "json",
      label: "JSON 数据格式",
      type: "bridge",
      details: {
        zh_label: "JSON",
        summary: "轻量级文本格式，用于程序之间交换数据（API、配置文件）。",
        analogy: "像国际通用的快递面单格式：各国快递公司都认。",
        notes:
          "```python\nimport json\ndata = {\"name\": \"小明\", \"scores\": [90, 85]}\ntext = json.dumps(data)  # 转字符串\n```\n【衔接 AI 图谱】LLM 的输入输出本质也是文本序列；Tokenizer 把 JSON 字符串切成 Token——详见 AI 图谱 `token` / `tokenizer` 节点。",
        key_concepts: ["序列化", "dumps/loads", "API 数据", "文本交换"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript/JavaScript 原生支持 JSON，`JSON.stringify` / `JSON.parse` 最常用。",
          notes:
            "```typescript\nconst data = { name: \"小明\", scores: [90, 85] };\nconst text = JSON.stringify(data);\nconst back = JSON.parse(text);\n```\n本项目 `package.json` 就是 JSON 文件。",
          key_concepts: ["JSON.stringify", "JSON.parse", "package.json", "原生支持"],
        },
      },
    },

    // ─── ⑥ 面向对象与模块 ───────────────────────────────────
    {
      id: "oop_modules",
      label: "面向对象与模块",
      type: "concept",
      details: {
        zh_label: "OOP & Modules",
        summary: "用「类」组织数据和行为；用「模块」拆分大项目为可复用文件。",
        analogy: "类像汽车设计图纸（一类车的共性）；模块像分工车间，各做各的零件。",
        notes: "4 个节点：类 → 继承 → 导入 → 包管理。",
        key_concepts: ["类", "继承", "import", "包管理"],
        source: PL_SOURCE,
      },
    },
    {
      id: "class_object",
      label: "类与对象",
      type: "pattern",
      details: {
        zh_label: "Class & Object",
        summary: "类是模板，对象是按模板创建的具体实例。",
        analogy: "类像「曲奇模具」，对象是每块压出来的曲奇。",
        notes:
          "```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f\"{self.name} 汪!\"\n\nd = Dog(\"旺财\")\nprint(d.bark())\n```",
        key_concepts: ["class", "__init__", "self", "实例方法"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 类语法更接近 Java，用 constructor 初始化。",
          notes:
            "```typescript\nclass Dog {\n  constructor(public name: string) {}\n  bark(): string { return `${this.name} 汪!`; }\n}\nconst d = new Dog(\"旺财\");\n```",
          key_concepts: ["constructor", "public", "new", "this"],
        },
      },
    },
    {
      id: "inheritance",
      label: "继承",
      type: "pattern",
      details: {
        zh_label: "Inheritance",
        summary: "子类继承父类的属性和方法，并可扩展或覆盖。",
        analogy: "像子承父业：餐馆老板的儿子默认会做菜，还能加新菜品。",
        notes:
          "```python\nclass Animal:\n    def speak(self): return \"...\"\n\nclass Cat(Animal):\n    def speak(self): return \"喵\"\n```",
        key_concepts: ["父类", "子类", "覆盖", "复用"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 `extends` 继承，同样支持方法覆盖。",
          notes:
            "```typescript\nclass Animal { speak() { return \"...\"; } }\nclass Cat extends Animal {\n  speak() { return \"喵\"; }\n}\n```",
          key_concepts: ["extends", "super", "覆盖", "继承链"],
        },
      },
    },
    {
      id: "import_module",
      label: "模块导入",
      type: "syntax",
      details: {
        zh_label: "Import Module",
        summary: "把其他文件里的函数/类引入当前文件，避免一个文件写几千行。",
        analogy: "像从工具箱拿扳手，不用自己造一把。",
        notes:
          "```python\n# math_utils.py 里定义了 add\nfrom math_utils import add\nresult = add(1, 2)\n```",
        key_concepts: ["import", "from", "模块文件", "复用"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript/ES Module 用 import/export，本项目到处都是。",
          notes:
            "```typescript\n// 本项目 App.tsx 顶部\nimport { useState } from \"react\";\nimport type { KnowledgeMap } from \"./types\";\n```",
          key_concepts: ["import", "export", "ES Module", "命名导入"],
        },
      },
    },
    {
      id: "package_manager",
      label: "包管理器",
      type: "ecosystem",
      details: {
        zh_label: "Package Manager",
        summary: "从中央仓库下载别人写好的库（包），不用重复造轮子。",
        analogy: "像应用商店：一键安装别人做好的工具。",
        notes:
          "```bash\npip install requests    # Python\npip list\n```\n【衔接】本项目的 `package.json` + `npm install` 就是 Node 生态的包管理——你正在用的 React、Vite 都是这样装进来的。",
        key_concepts: ["pip", "PyPI", "install", "依赖"],
        source: PL_SOURCE,
        backstage: {
          summary: "Node 生态用 npm / pnpm / yarn，配置文件是 `package.json`。",
          notes:
            "```bash\nnpm install react\nnpm run dev    # 读 package.json 里的 scripts\n```\n打开本项目根目录的 `package.json` 可看到 `react`、`vite` 等依赖。",
          key_concepts: ["npm", "package.json", "dependencies", "scripts"],
        },
      },
    },

    // ─── ⑦ 异步与 API ───────────────────────────────────────
    {
      id: "async_api",
      label: "异步与 API",
      type: "concept",
      details: {
        zh_label: "Async & API",
        summary: "网络请求不会立刻返回结果，需要异步等待；API 是程序之间约定的接口。",
        analogy: "像点外卖：下单后不用站在门口干等，可以做别的事，到了再取。",
        notes: "4 个节点，学完可调用 OpenAI 等 LLM API（衔接 AI 图谱）。",
        key_concepts: ["异步", "await", "HTTP", "REST"],
        source: PL_SOURCE,
      },
    },
    {
      id: "sync_vs_async",
      label: "同步 vs 异步",
      type: "concept",
      details: {
        zh_label: "Sync vs Async",
        summary: "同步：一件事做完才做下一件；异步：发起等待时可去做别的。",
        analogy: "同步像排队买咖啡必须站等到手；异步像取号后去逛街，叫号再去拿。",
        notes:
          "```python\nimport time\ntime.sleep(2)  # 同步阻塞 2 秒\nprint(\"继续\")\n```",
        key_concepts: ["阻塞", "非阻塞", "等待", "并发入门"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 中网络请求、定时器默认异步，不阻塞界面渲染。",
          notes:
            "```typescript\n// 同步代码先执行完，异步回调稍后执行\nconsole.log(\"开始\");\nsetTimeout(() => console.log(\"2秒后\"), 2000);\nconsole.log(\"继续\");  // 先于「2秒后」打印\n```\nReact 组件渲染也依赖异步模型。",
          key_concepts: ["setTimeout", "事件循环", "非阻塞", "React 渲染"],
        },
      },
    },
    {
      id: "async_await",
      label: "async/await",
      type: "syntax",
      details: {
        zh_label: "Async/Await",
        summary: "用 async 标记异步函数，用 await 等待结果——写起来像同步代码。",
        analogy: "像预约快递：await 是「到了告诉我」，期间你可以干别的。",
        notes:
          "```python\nimport asyncio\n\nasync def fetch():\n    await asyncio.sleep(1)\n    return \"数据\"\n\nasyncio.run(fetch())\n```",
        key_concepts: ["async def", "await", "asyncio", "协程"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 的 async/await 与 Python 概念相同，前端调 API 必用。",
          notes:
            "```typescript\nasync function fetchData(): Promise<string> {\n  const res = await fetch(\"/api/data\");\n  return res.text();\n}\n```\n【衔接】本项目 React 组件里也会用 async 函数处理副作用。",
          key_concepts: ["Promise", "fetch", "async function", "await"],
        },
      },
    },
    {
      id: "http_request",
      label: "HTTP 请求",
      type: "syntax",
      details: {
        zh_label: "HTTP Request",
        summary: "浏览器/程序通过 HTTP 协议向服务器发请求、拿响应。",
        analogy: "像寄挂号信：写明地址（URL）、内容（Body），等回信（Response）。",
        notes:
          "```python\nimport requests\nresp = requests.get(\"https://api.github.com\")\nprint(resp.status_code)\n```",
        key_concepts: ["GET/POST", "URL", "status_code", "请求响应"],
        source: PL_SOURCE,
        backstage: {
          summary: "浏览器和 Node 内置 fetch API，无需额外安装。",
          notes:
            "```typescript\nconst resp = await fetch(\"https://api.github.com\");\nconsole.log(resp.status);\nconst data = await resp.json();\n```",
          key_concepts: ["fetch", "Response", "json()", "无依赖"],
        },
      },
    },
    {
      id: "rest_api",
      label: "REST API",
      type: "bridge",
      details: {
        zh_label: "REST API",
        summary: "用 URL + HTTP 方法（GET/POST 等）操作资源的通用接口风格。",
        analogy: "像图书馆借书系统：查书目 GET、借书 POST、还书 DELETE。",
        notes:
          "```python\n# 调 OpenAI Chat API（示意）\nimport requests\nresp = requests.post(\n    \"https://api.openai.com/v1/chat/completions\",\n    headers={\"Authorization\": \"Bearer sk-...\"},\n    json={\"model\": \"gpt-4\", \"messages\": [{\"role\": \"user\", \"content\": \"hi\"}]}\n)\n```\n【衔接 AI 图谱】调 LLM 就是 REST API 调用；请求体里的 messages 会被 Tokenizer 处理——见 `gpt` / `token` 节点。",
        key_concepts: ["REST", "端点", "JSON 请求体", "API Key"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 调 API 同样用 fetch + JSON，是 vibe coding 最常见的操作。",
          notes:
            "```typescript\nconst resp = await fetch(\"https://api.openai.com/v1/chat/completions\", {\n  method: \"POST\",\n  headers: { \"Authorization\": \"Bearer sk-...\", \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ model: \"gpt-4\", messages: [{ role: \"user\", content: \"hi\" }] }),\n});\n```",
          key_concepts: ["POST", "headers", "body", "LLM API"],
        },
      },
    },

    // ─── ⑧ 开发环境与工具链 ─────────────────────────────────
    {
      id: "dev_tooling",
      label: "开发环境与工具链",
      type: "concept",
      details: {
        zh_label: "Dev Tooling",
        summary: "编辑器、Git、调试器、AI 辅助——让写代码更高效的基础设施。",
        analogy: "像厨师的灶台、刀具、菜谱 App——工具到位，做菜才顺手。",
        notes: "4 个节点，vibe_coding 节点衔接 AI + PM 图谱。",
        key_concepts: ["编辑器", "Git", "调试", "AI 辅助"],
        source: PL_SOURCE,
      },
    },
    {
      id: "dev_environment",
      label: "开发环境",
      type: "ecosystem",
      details: {
        zh_label: "Dev Environment",
        summary: "写代码需要的编辑器、终端、运行时、包管理器组成的本地环境。",
        analogy: "像画家的画室：画架、颜料、画笔缺一不可。",
        notes:
          "Python 环境：安装 Python → 用 VS Code / Cursor → 终端跑 `python`。\n本项目环境：Node.js → `npm install` → `npm run dev`。",
        key_concepts: ["编辑器", "终端", "运行时", "扩展"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 项目通常用 VS Code/Cursor + Vite 开发服务器。",
          notes:
            "```bash\ncd ai-knowledge-graph\nnpm install\nnpm run dev\n```\n浏览器打开 localhost 即可看到本知识图谱项目。",
          key_concepts: ["Cursor", "Vite", "localhost", "热更新"],
        },
      },
    },
    {
      id: "version_control",
      label: "版本控制 Git",
      type: "ecosystem",
      details: {
        zh_label: "Git",
        summary: "记录代码每次修改的历史，可回退、可协作、可分支实验。",
        analogy: "像文档的「修订记录」：谁何时改了什么，随时可恢复到旧版。",
        notes:
          "```bash\ngit init\ngit add .\ngit commit -m \"第一次提交\"\ngit log\n```",
        key_concepts: ["commit", "分支", "回退", "协作"],
        source: PL_SOURCE,
        backstage: {
          summary: "Git 与语言无关，TypeScript 项目同样用 Git 管理。",
          notes:
            "本项目就是 Git 仓库。`git status` 看改动，`git diff` 看具体变化——vibe coding 后务必检查 AI 改了什么再 commit。",
          key_concepts: ["git status", "git diff", "仓库", "协作"],
        },
      },
    },
    {
      id: "debugging",
      label: "调试",
      type: "ecosystem",
      details: {
        zh_label: "Debugging",
        summary: "程序出错时定位原因：打印变量、断点暂停、读报错信息。",
        analogy: "像汽车故障灯亮了：先看仪表盘（报错），再打开引擎盖（断点）排查。",
        notes:
          "```python\nx = 10\nprint(f\"debug: x={x}\")  # 打印调试\n# 或用 IDE 断点\n```",
        key_concepts: ["print 调试", "断点", "报错栈", "复现"],
        source: PL_SOURCE,
        backstage: {
          summary: "TypeScript 用 console.log、浏览器 DevTools、VS Code 断点。",
          notes:
            "```typescript\nconst x = 10;\nconsole.log(\"debug:\", x);\n// F12 打开浏览器控制台看输出\n```\n类型错误在保存时就会被 TypeScript 标红——比运行时报错更早发现。",
          key_concepts: ["console.log", "DevTools", "类型错误", "断点"],
        },
      },
    },
    {
      id: "vibe_coding",
      label: "Vibe Coding",
      type: "bridge",
      details: {
        zh_label: "Vibe Coding",
        summary: "用自然语言描述意图，让 AI 生成代码，你负责审阅、测试、迭代。",
        analogy: "像请了一位实习生写初稿：快，但你得审稿改错。",
        notes:
          "工作流：① 描述需求 → ② AI 生成代码 → ③ 读懂关键行 → ④ 跑起来验证 → ⑤ 小步迭代。\n【衔接 AI 图谱】你其实在用 LLM（见 `llm` / `gpt` 节点）当编程助手。\n【衔接 PM 图谱】「用户价值 vs 实现成本」的权衡，在 vibe coding 里体现为：什么交给 AI、什么自己把关。",
        key_concepts: ["自然语言驱动", "审阅代码", "迭代", "LLM 助手"],
        source: PL_SOURCE,
        backstage: {
          summary: "在 Cursor 等 IDE 里对 TS/React 项目 vibe coding 是最高频场景。",
          notes:
            "本图谱项目本身就是 vibe coding 产物。建议：每次 AI 改完跑 `npm run lint`，看懂 diff 再接受——培养「能读代码」比「能写代码」更重要。",
          key_concepts: ["Cursor", "npm run lint", "读 diff", "小步提交"],
        },
      },
    },

    // ─── ⑨ SQL 分支（单面，不翻转）─────────────────────────
    {
      id: "sql_branch",
      label: "数据查询 SQL",
      type: "concept",
      details: {
        zh_label: "SQL Branch",
        summary: "SQL 是专门查数据库的语言，不是通用编程语言，但和数据思维紧密相关。",
        analogy: "像图书馆检索系统：不问「怎么造书」，只问「哪本书在哪」。",
        notes: "3 个节点，无翻转卡片。学完可理解 PM 图谱里的数据驱动决策。",
        key_concepts: ["数据库", "查询", "表", "聚合"],
        source: PL_SOURCE,
      },
    },
    {
      id: "what_is_sql",
      label: "SQL 是什么",
      type: "data",
      details: {
        zh_label: "What Is SQL",
        summary: "Structured Query Language，用声明式语句查询和操作关系型数据库中的表。",
        analogy: "像用中文问图书管理员「借过《三体》的人还有谁？」——你描述要什么，管理员去查。",
        notes:
          "```sql\nSELECT name, age FROM users WHERE age >= 18;\n```\n【衔接 PM 图谱】留存率、转化漏斗等指标，底层都是 SQL 从行为日志表里查出来的。",
        key_concepts: ["SELECT", "表", "声明式", "关系型数据库"],
        source: PL_SOURCE,
      },
    },
    {
      id: "select_where",
      label: "查询与筛选",
      type: "syntax",
      details: {
        zh_label: "SELECT & WHERE",
        summary: "SELECT 指定要哪些列，WHERE 筛选满足条件的行。",
        analogy: "像在 Excel 里先选列、再开筛选器。",
        notes:
          "```sql\nSELECT user_id, event_name\nFROM events\nWHERE event_name = 'purchase'\n  AND created_at >= '2025-01-01';\n```",
        key_concepts: ["SELECT", "WHERE", "AND", "列与行"],
        source: PL_SOURCE,
      },
    },
    {
      id: "join_group",
      label: "关联与聚合",
      type: "syntax",
      details: {
        zh_label: "JOIN & GROUP BY",
        summary: "JOIN 把多张表按关联键拼在一起；GROUP BY 按维度汇总统计。",
        analogy: "JOIN 像把「订单表」和「用户表」按用户 ID 对齐；GROUP BY 像按城市统计销量。",
        notes:
          "```sql\nSELECT u.city, COUNT(*) AS orders\nFROM orders o\nJOIN users u ON o.user_id = u.id\nGROUP BY u.city;\n```\n【衔接 AI 图谱】训练数据集常从多张表 JOIN 后导出 CSV。",
        key_concepts: ["JOIN", "GROUP BY", "COUNT", "聚合"],
        source: PL_SOURCE,
      },
    },
  ],

  edges: [
    // ─── 层级：包含 ─────────────────────────────────────────
    { id: "programming__包含__basics", source: "programming", target: "basics", label: "包含" },
    { id: "programming__包含__variables_types", source: "programming", target: "variables_types", label: "包含" },
    { id: "programming__包含__control_flow", source: "programming", target: "control_flow", label: "包含" },
    { id: "programming__包含__functions", source: "programming", target: "functions", label: "包含" },
    { id: "programming__包含__data_structures", source: "programming", target: "data_structures", label: "包含" },
    { id: "programming__包含__oop_modules", source: "programming", target: "oop_modules", label: "包含" },
    { id: "programming__包含__async_api", source: "programming", target: "async_api", label: "包含" },
    { id: "programming__包含__dev_tooling", source: "programming", target: "dev_tooling", label: "包含" },
    { id: "programming__包含__sql_branch", source: "programming", target: "sql_branch", label: "包含" },

    { id: "basics__包含__what_is_code", source: "basics", target: "what_is_code", label: "包含" },
    { id: "basics__包含__interpreter_vs_compiler", source: "basics", target: "interpreter_vs_compiler", label: "包含" },
    { id: "basics__包含__syntax_vs_semantics", source: "basics", target: "syntax_vs_semantics", label: "包含" },
    { id: "basics__包含__hello_world", source: "basics", target: "hello_world", label: "包含" },

    { id: "variables_types__包含__variable", source: "variables_types", target: "variable", label: "包含" },
    { id: "variables_types__包含__data_types", source: "variables_types", target: "data_types", label: "包含" },
    { id: "variables_types__包含__type_conversion", source: "variables_types", target: "type_conversion", label: "包含" },
    { id: "variables_types__包含__string", source: "variables_types", target: "string", label: "包含" },
    { id: "variables_types__包含__boolean_logic", source: "variables_types", target: "boolean_logic", label: "包含" },

    { id: "control_flow__包含__conditional", source: "control_flow", target: "conditional", label: "包含" },
    { id: "control_flow__包含__loop_for", source: "control_flow", target: "loop_for", label: "包含" },
    { id: "control_flow__包含__loop_while", source: "control_flow", target: "loop_while", label: "包含" },
    { id: "control_flow__包含__break_continue", source: "control_flow", target: "break_continue", label: "包含" },

    { id: "functions__包含__function_definition", source: "functions", target: "function_definition", label: "包含" },
    { id: "functions__包含__parameters", source: "functions", target: "parameters", label: "包含" },
    { id: "functions__包含__scope", source: "functions", target: "scope", label: "包含" },
    { id: "functions__包含__lambda", source: "functions", target: "lambda", label: "包含" },

    { id: "data_structures__包含__list_array", source: "data_structures", target: "list_array", label: "包含" },
    { id: "data_structures__包含__dict_object", source: "data_structures", target: "dict_object", label: "包含" },
    { id: "data_structures__包含__tuple", source: "data_structures", target: "tuple", label: "包含" },
    { id: "data_structures__包含__set", source: "data_structures", target: "set", label: "包含" },
    { id: "data_structures__包含__json", source: "data_structures", target: "json", label: "包含" },

    { id: "oop_modules__包含__class_object", source: "oop_modules", target: "class_object", label: "包含" },
    { id: "oop_modules__包含__inheritance", source: "oop_modules", target: "inheritance", label: "包含" },
    { id: "oop_modules__包含__import_module", source: "oop_modules", target: "import_module", label: "包含" },
    { id: "oop_modules__包含__package_manager", source: "oop_modules", target: "package_manager", label: "包含" },

    { id: "async_api__包含__sync_vs_async", source: "async_api", target: "sync_vs_async", label: "包含" },
    { id: "async_api__包含__async_await", source: "async_api", target: "async_await", label: "包含" },
    { id: "async_api__包含__http_request", source: "async_api", target: "http_request", label: "包含" },
    { id: "async_api__包含__rest_api", source: "async_api", target: "rest_api", label: "包含" },

    { id: "dev_tooling__包含__dev_environment", source: "dev_tooling", target: "dev_environment", label: "包含" },
    { id: "dev_tooling__包含__version_control", source: "dev_tooling", target: "version_control", label: "包含" },
    { id: "dev_tooling__包含__debugging", source: "dev_tooling", target: "debugging", label: "包含" },
    { id: "dev_tooling__包含__vibe_coding", source: "dev_tooling", target: "vibe_coding", label: "包含" },

    { id: "sql_branch__包含__what_is_sql", source: "sql_branch", target: "what_is_sql", label: "包含" },
    { id: "sql_branch__包含__select_where", source: "sql_branch", target: "select_where", label: "包含" },
    { id: "sql_branch__包含__join_group", source: "sql_branch", target: "join_group", label: "包含" },

    // ─── 模块间：前置 ─────────────────────────────────────────
    { id: "basics__前置__variables_types", source: "basics", target: "variables_types", label: "前置" },
    { id: "variables_types__前置__control_flow", source: "variables_types", target: "control_flow", label: "前置" },
    { id: "control_flow__前置__functions", source: "control_flow", target: "functions", label: "前置" },
    { id: "functions__前置__data_structures", source: "functions", target: "data_structures", label: "前置" },
    { id: "data_structures__前置__oop_modules", source: "data_structures", target: "oop_modules", label: "前置" },
    { id: "oop_modules__前置__async_api", source: "oop_modules", target: "async_api", label: "前置" },
    { id: "async_api__前置__dev_tooling", source: "async_api", target: "dev_tooling", label: "前置" },
    { id: "data_structures__前置__sql_branch", source: "data_structures", target: "sql_branch", label: "前置" },

    // ─── 模块内：前置 ─────────────────────────────────────────
    { id: "what_is_code__前置__hello_world", source: "what_is_code", target: "hello_world", label: "前置" },
    { id: "variable__前置__data_types", source: "variable", target: "data_types", label: "前置" },
    { id: "data_types__前置__type_conversion", source: "data_types", target: "type_conversion", label: "前置" },
    { id: "conditional__前置__loop_for", source: "conditional", target: "loop_for", label: "前置" },
    { id: "function_definition__前置__parameters", source: "function_definition", target: "parameters", label: "前置" },
    { id: "list_array__前置__dict_object", source: "list_array", target: "dict_object", label: "前置" },
    { id: "sync_vs_async__前置__async_await", source: "sync_vs_async", target: "async_await", label: "前置" },
    { id: "async_await__前置__http_request", source: "async_await", target: "http_request", label: "前置" },
    { id: "dev_environment__前置__version_control", source: "dev_environment", target: "version_control", label: "前置" },
    { id: "what_is_sql__前置__select_where", source: "what_is_sql", target: "select_where", label: "前置" },
    { id: "select_where__前置__join_group", source: "select_where", target: "join_group", label: "前置" },

    // ─── 对比 ─────────────────────────────────────────────────
    { id: "loop_for__对比__loop_while", source: "loop_for", target: "loop_while", label: "对比", directed: false },
    { id: "interpreter_vs_compiler__对比__sync_vs_async", source: "interpreter_vs_compiler", target: "sync_vs_async", label: "对比", directed: false },

    // ─── 衔接 ─────────────────────────────────────────────────
    { id: "json__衔接__rest_api", source: "json", target: "rest_api", label: "衔接" },
    { id: "http_request__衔接__rest_api", source: "http_request", target: "rest_api", label: "衔接" },
    { id: "package_manager__衔接__dev_environment", source: "package_manager", target: "dev_environment", label: "衔接" },
    { id: "vibe_coding__衔接__debugging", source: "vibe_coding", target: "debugging", label: "衔接" },
    { id: "what_is_sql__衔接__json", source: "what_is_sql", target: "json", label: "衔接" },
    { id: "join_group__衔接__rest_api", source: "join_group", target: "rest_api", label: "衔接" },
  ],
};

const plTypeStyles: Record<string, NodeTypeStyle> = {
  overview: { base: "#4a90d9", glow: "rgba(74, 144, 217, 0.32)", label: "总览" },
  concept: { base: "#5b8def", glow: "rgba(91, 141, 239, 0.30)", label: "概念" },
  syntax: { base: "#3fa86a", glow: "rgba(63, 168, 106, 0.30)", label: "语法" },
  data: { base: "#e08a3c", glow: "rgba(224, 138, 60, 0.30)", label: "数据" },
  pattern: { base: "#9b6dc4", glow: "rgba(155, 109, 196, 0.30)", label: "模式" },
  ecosystem: { base: "#8a8a7a", glow: "rgba(138, 138, 122, 0.28)", label: "工具链" },
  bridge: { base: "#c9a227", glow: "rgba(201, 162, 39, 0.32)", label: "衔接" },
};

const plTypeOrder: string[] = ["overview", "concept", "syntax", "data", "pattern", "ecosystem", "bridge"];

export const programmingLanguagesMap: KnowledgeMap = {
  id: "programming-languages",
  label: "编程语言",
  subtitle: "Python × TypeScript · 概念对照 · 萌新友好",
  data: plGraphData,
  typeStyles: plTypeStyles,
  typeOrder: plTypeOrder,
  preferredSeed: "programming",
  group: "professional",
  domain: "tech-product",
  perspectiveLabels: { front: "Python", back: "TypeScript", frontHint: "通用概念", backHint: "对照写法" },
};
