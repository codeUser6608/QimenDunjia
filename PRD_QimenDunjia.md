# 奇门遁甲H5小程序 - 产品需求文档（PRD）

## 文档信息

| 项目     | 内容                     |
| -------- | ------------------------ |
| 项目名称 | 奇门遁甲（Qimen Dunjia） |
| 项目类型 | 奇门遁甲术数模拟H5小程序 |
| 版本号   | 1.0.0                    |
| 文档状态 | 初版                     |
| 创建日期 | 2026-02-22               |
| 设计参考 | 中国古代奇门遁甲术数体系 |
| 平台适配 | 移动端H5优先，PC端自适应 |

---

## 1. 项目概述

### 1.1 产品背景

奇门遁甲是中国古代最重要的术数之一，被誉为"帝王之学"。它综合了天文、地理、历法、阴阳五行等知识，通过排布天、地、人、神四盘，推演事物的发展规律。

本产品将奇门遁甲的核心概念转化为H5小程序，让用户能够：

- 学习奇门遁甲的基础知识
- 进行奇门遁甲排盘推演
- 了解八门、九星、八神的含义
- 通过游戏化方式掌握奇门遁甲应用

**设计理念**：以"寓教于乐"为核心，将深奥的奇门遁甲术数体系通过游戏化、可视化的方式呈现，降低学习门槛，让传统文化得以传承。

### 1.2 核心玩法

| 类别     | 玩法     | 说明                               |
| -------- | -------- | ---------------------------------- |
| 知识学习 | 基础教程 | 天干地支、五行、八卦等基础知识     |
| 知识学习 | 八门详解 | 开、休、生、伤、杜、景、死、惊八门 |
| 知识学习 | 九星详解 | 天蓬、天任、天冲等九星             |
| 知识学习 | 八神详解 | 值符、腾蛇、太阴等八神             |
| 排盘推演 | 时间排盘 | 根据年月日时自动排盘               |
| 排盘推演 | 空间排盘 | 根据方位进行排盘                   |
| 排盘推演 | 手动排盘 | 用户手动调整四盘布局               |
| 事件推演 | 事业推演 | 分析事业发展吉凶                   |
| 事件推演 | 婚姻推演 | 分析婚姻运势                       |
| 事件推演 | 出行推演 | 分析出行吉凶                       |
| 事件推演 | 投资推演 | 分析投资时机                       |
| 每日运势 | 奇门日历 | 每日奇门格局                       |
| 每日运势 | 时辰吉凶 | 每个时辰的吉凶分析                 |
| 每日运势 | 宜忌事项 | 每日宜做什么、忌做什么             |
| 挑战模式 | 排盘挑战 | 根据条件完成正确排盘               |
| 挑战模式 | 解盘挑战 | 分析给定格局的含义                 |
| 挑战模式 | 案例分析 | 分析历史奇门案例                   |

### 1.3 特色系统

#### 1.3.1 四盘系统

| 四盘 | 组成 | 说明                                                 |
| ---- | ---- | ---------------------------------------------------- |
| 天盘 | 九星 | 天蓬、天任、天冲、天辅、天英、天芮、天柱、天心、天禽 |
| 地盘 | 九宫 | 坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九 |
| 人盘 | 八门 | 开门、休门、生门、伤门、杜门、景门、死门、惊门       |
| 神盘 | 八神 | 值符、腾蛇、太阴、六合、白虎、玄武、九地、九天       |

#### 1.3.2 天干地支系统

| 类别 | 内容                               | 说明             |
| ---- | ---------------------------------- | ---------------- |
| 天干 | 甲乙丙丁戊己庚辛壬癸               | 十天干，甲为首   |
| 地支 | 子丑寅卯辰巳午未申酉戌亥           | 十二地支         |
| 六仪 | 戊己庚辛壬癸                       | 六仪，甲子遁于戊 |
| 三奇 | 乙丙丁                             | 三奇，日、月、星 |
| 旬首 | 甲子、甲戌、甲申、甲午、甲辰、甲寅 | 六旬首           |

#### 1.3.3 节气系统

| 节气 | 月份   | 对应地支 |
| ---- | ------ | -------- |
| 立春 | 正月   | 寅       |
| 惊蛰 | 二月   | 卯       |
| 清明 | 三月   | 辰       |
| 立夏 | 四月   | 巳       |
| 芒种 | 五月   | 午       |
| 小暑 | 六月   | 未       |
| 立秋 | 七月   | 申       |
| 白露 | 八月   | 酉       |
| 寒露 | 九月   | 戌       |
| 立冬 | 十月   | 亥       |
| 大雪 | 十一月 | 子       |
| 小寒 | 十二月 | 丑       |

#### 1.3.4 八门详解

| 门名 | 吉凶 | 五行 | 方位 | 含义             |
| ---- | ---- | ---- | ---- | ---------------- |
| 开门 | 吉   | 金   | 西北 | 开启、开始、顺利 |
| 休门 | 吉   | 水   | 北   | 休息、休养、平和 |
| 生门 | 吉   | 土   | 东北 | 生长、生机、财源 |
| 伤门 | 凶   | 木   | 东   | 伤害、受伤、矛盾 |
| 杜门 | 凶   | 木   | 东南 | 阻碍、困难、不通 |
| 景门 | 吉   | 火   | 南   | 景象、光明、声名 |
| 死门 | 凶   | 土   | 西南 | 死亡、终结、失败 |
| 惊门 | 凶   | 金   | 西   | 惊恐、惊慌、意外 |

#### 1.3.5 九星详解

| 星名 | 吉凶 | 五行 | 含义             |
| ---- | ---- | ---- | ---------------- |
| 天蓬 | 凶   | 水   | 盗贼、阴谋、暗算 |
| 天任 | 吉   | 土   | 贵人、助力、安稳 |
| 天冲 | 吉   | 木   | 冲动、急躁、行动 |
| 天辅 | 吉   | 木   | 辅助、帮助、贵人 |
| 天英 | 凶   | 火   | 灾祸、火灾、血光 |
| 天芮 | 凶   | 土   | 疾病、病痛、灾患 |
| 天柱 | 吉   | 金   | 柱石、支撑、依靠 |
| 天心 | 吉   | 金   | 心智、智慧、谋略 |
| 天禽 | 吉   | 土   | 禽鸟、捕捉、收获 |

#### 1.3.6 八神详解

| 神名 | 吉凶 | 含义             |
| ---- | ---- | ---------------- |
| 值符 | 吉   | 吉祥、贵人、助力 |
| 腾蛇 | 凶   | 纠缠、麻烦、虚惊 |
| 太阴 | 吉   | 隐秘、暗中、谋划 |
| 六合 | 吉   | 和合、合作、婚姻 |
| 白虎 | 凶   | 凶猛、争斗、血光 |
| 玄武 | 凶   | 暗算、欺骗、盗贼 |
| 九地 | 吉   | 稳固、根基、防守 |
| 九天 | 吉   | 高远、远大、升迁 |

### 1.4 学习体系

#### 1.4.1 学习路径

| 阶段 | 内容                 | 预计时长 |
| ---- | -------------------- | -------- |
| 入门 | 天干地支、五行、八卦 | 1-2周    |
| 进阶 | 八门、九星、八神     | 2-3周    |
| 高级 | 排盘方法、格局分析   | 3-4周    |
| 精通 | 实战应用、案例解析   | 4-6周    |

#### 1.4.2 学习模式

| 模式     | 说明                   |
| -------- | ---------------------- |
| 自由学习 | 按自己的节奏学习各模块 |
| 系统课程 | 按预设路径系统学习     |
| 每日一练 | 每天推送一个小练习     |
| 闯关模式 | 通过关卡解锁新内容     |

### 1.5 H5移动端适配

#### 1.5.1 响应式设计

| 屏幕尺寸 | 设计适配 | 说明               |
| -------- | -------- | ------------------ |
| 手机竖屏 | 主适配   | 底部导航、单手操作 |
| 手机横屏 | 适配     | 横屏排盘、双手操作 |
| 平板     | 适配     | 分屏显示、精细操作 |
| PC浏览器 | 适配     | 鼠标操作、键盘快捷 |

#### 1.5.2 触控优化

| 元素     | 最小尺寸    | 间距 | 说明     |
| -------- | ----------- | ---- | -------- |
| 按钮     | 44x44px     | 8px  | 便于点击 |
| 卡片     | 宽度>60%    | 12px | 易于识别 |
| 列表项   | 高度>48px   | 8px  | 便于滑动 |
| 排盘格子 | 最小40x40px | 4px  | 便于操作 |

#### 1.5.3 性能优化

| 优化项   | 移动端 | PC端   |
| -------- | ------ | ------ |
| 首屏加载 | <3秒   | <2秒   |
| 资源大小 | <1MB   | <2MB   |
| 帧率     | >30fps | >60fps |
| 内存占用 | <100MB | <200MB |

#### 1.5.4 PWA支持

| 功能         | 说明               |
| ------------ | ------------------ |
| 添加到主屏幕 | iOS/Android均可    |
| 离线访问     | Service Worker缓存 |
| 推送通知     | 每日运势提醒       |
| 后台运行     | 学习进度同步       |

---

## 2. 数据库设计

### 2.1 用户模型（User）

```javascript
{
  // 基础信息
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  
  // 学习进度
  learningProgress: {
    currentLevel: ['BEGINNER'|'INTERMEDIATE'|'ADVANCED'|'MASTER'],
    completedModules: [String],
    currentModule: String,
    totalStudyTime: Number, // 总学习时长（分钟）
    lastStudyDate: Date
  },
  
  // 排盘记录
  chartHistory: [{
    timestamp: Date,
    chartType: ['TIME'|'SPACE'|'MANUAL'],
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    direction: String,
    chartData: Object
  }],
  
  // 挑战记录
  challengeRecords: [{
    challengeId: String,
    completed: Boolean,
    score: Number,
    completedAt: Date
  }],
  
  // 收藏
  favorites: [{
    type: ['CHART'|'KNOWLEDGE'|'CASE'],
    itemId: String,
    note: String,
    addedAt: Date
  }],
  
  // 设置
  settings: {
    theme: ['LIGHT'|'DARK'|'AUTO'],
    notifications: {
      dailyHoroscope: Boolean,
      studyReminder: Boolean,
      reminderTime: String
    },
    language: 'zh-CN'
  },
  
  // 统计
  statistics: {
    chartsCreated: Number,
    challengesCompleted: Number,
    knowledgePoints: Number,
    daysActive: Number
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 知识模块模型（KnowledgeModule）

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: ['BASIC'|'GATE'|'STAR'|'SPIRIT'|'CHART'|'CASE'],
  level: ['BEGINNER'|'INTERMEDIATE'|'ADVANCED'|'MASTER'],
  order: Number,
  
  // 内容
  content: {
    sections: [{
      title: String,
      content: String,
      images: [String],
      tables: [Object]
    }],
    keyPoints: [String],
    examples: [Object],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }]
  },
  
  // 关联
  prerequisites: [ObjectId],
  relatedModules: [ObjectId],
  
  // 学习统计
  statistics: {
    totalLearners: Number,
    completionRate: Number,
    averageScore: Number
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### 2.3 排盘模型（Chart）

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  chartType: ['TIME'|'SPACE'|'MANUAL'],
  
  // 时间信息
  timeInfo: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    solarTerm: String,
    lunarDate: String
  },
  
  // 方位信息（空间排盘）
  directionInfo: {
    direction: String,
    location: String
  },
  
  // 四盘数据
  plates: {
    // 天盘
    heavenPlate: {
      positions: [{
        palace: Number, // 1-9宫
        star: String, // 九星
        stem: String, // 天干
        branch: String // 地支
      }]
    },
    
    // 地盘
    earthPlate: {
      positions: [{
        palace: Number,
        stem: String,
        branch: String,
        trigram: String // 八卦
      }]
    },
    
    // 人盘
    humanPlate: {
      positions: [{
        palace: Number,
        gate: String // 八门
      }]
    },
    
    // 神盘
    spiritPlate: {
      positions: [{
        palace: Number,
        spirit: String // 八神
      }]
    }
  },
  
  // 格局分析
  analysis: {
    overall: {
      rating: ['EXCELLENT'|'GOOD'|'AVERAGE'|'POOR'|'BAD'],
      summary: String
    },
    gates: [{
      gate: String,
      palace: Number,
      meaning: String,
      advice: String
    }],
    stars: [{
      star: String,
      palace: Number,
      meaning: String,
      advice: String
    }],
    spirits: [{
      spirit: String,
      palace: Number,
      meaning: String,
      advice: String
    }],
    combinations: [{
      elements: [String],
      meaning: String,
      effect: String
    }]
  },
  
  // 应用建议
  applications: {
    career: {
      rating: String,
      advice: String,
      timing: [String]
    },
    marriage: {
      rating: String,
      advice: String,
      timing: [String]
    },
    travel: {
      rating: String,
      advice: String,
      timing: [String]
    },
    investment: {
      rating: String,
      advice: String,
      timing: [String]
    }
  },
  
  // 备注
  note: String,
  
  createdAt: Date
}
```

### 2.4 挑战模型（Challenge）

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: ['CHART'|'ANALYSIS'|'CASE'],
  level: ['BEGINNER'|'INTERMEDIATE'|'ADVANCED'|'MASTER'],
  order: Number,
  
  // 挑战内容
  content: {
    type: String,
    question: String,
    data: Object,
    options: [String],
    correctAnswer: Object,
    explanation: String,
    hints: [String]
  },
  
  // 奖励
  rewards: {
    knowledgePoints: Number,
    unlockModule: ObjectId
  },
  
  // 统计
  statistics: {
    totalAttempts: Number,
    successRate: Number,
    averageTime: Number
  },
  
  // 前置条件
  prerequisites: {
    requiredLevel: String,
    completedModules: [ObjectId]
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### 2.5 案例模型（CaseStudy）

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: ['HISTORICAL'|'MODERN'|'TEACHING'],
  level: ['BEGINNER'|'INTERMEDIATE'|'ADVANCED'|'MASTER'],
  
  // 案例信息
  caseInfo: {
    date: Date,
    location: String,
    event: String,
    background: String
  },
  
  // 排盘数据
  chartData: Object,
  
  // 分析过程
  analysis: {
    steps: [{
      title: String,
      content: String,
      keyPoints: [String]
    }],
    conclusion: String,
    result: String
  },
  
  // 学习要点
  keyPoints: [String],
  
  // 统计
  statistics: {
    totalViews: Number,
    helpfulRate: Number
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

### 2.6 每日运势模型（DailyHoroscope）

```javascript
{
  _id: ObjectId,
  date: Date,
  
  // 奇门格局
  chartData: Object,
  
  // 时辰分析
  hourlyAnalysis: [{
    hour: Number,
    startTime: String,
    endTime: String,
    rating: ['EXCELLENT'|'GOOD'|'AVERAGE'|'POOR'|'BAD'],
    summary: String,
    dos: [String],
    donts: [String]
  }],
  
  // 整体运势
  overall: {
    rating: String,
    summary: String,
    luckyElements: [String],
    unluckyElements: [String]
  },
  
  // 宜忌
  dos: [String],
  donts: [String],
  
  // 方位建议
  directions: {
    favorable: [String],
    unfavorable: [String]
  },
  
  createdAt: Date
}
```

---

## 3. API接口设计

### 3.1 用户相关API

| 模块 | 接口              | 方法 | 说明         |
| ---- | ----------------- | ---- | ------------ |
| 认证 | /auth/register    | POST | 用户注册     |
| 认证 | /auth/login       | POST | 用户登录     |
| 认证 | /auth/logout      | POST | 用户登出     |
| 用户 | /users/profile    | GET  | 获取用户信息 |
| 用户 | /users/profile    | PUT  | 更新用户信息 |
| 用户 | /users/progress   | GET  | 获取学习进度 |
| 用户 | /users/settings   | GET  | 获取用户设置 |
| 用户 | /users/settings   | PUT  | 更新用户设置 |
| 用户 | /users/statistics | GET  | 获取用户统计 |

### 3.2 学习相关API

| 模块     | 接口                            | 方法 | 说明             |
| -------- | ------------------------------- | ---- | ---------------- |
| 知识模块 | /knowledge/modules              | GET  | 获取知识模块列表 |
| 知识模块 | /knowledge/modules/:id          | GET  | 获取知识模块详情 |
| 知识模块 | /knowledge/modules/:id/complete | POST | 完成知识模块     |
| 知识模块 | /knowledge/modules/:id/quiz     | POST | 提交模块测验     |
| 学习路径 | /learning/path                  | GET  | 获取学习路径     |
| 学习路径 | /learning/path/continue         | POST | 继续学习         |

### 3.3 排盘相关API

| 模块 | 接口                | 方法   | 说明                  |
| ---- | ------------------- | ------ | --------------------- |
| 排盘 | /charts             | POST   | 创建排盘              |
| 排盘 | /charts/:id         | GET    | 获取排盘详情          |
| 排盘 | /charts             | GET    | 获取排盘历史          |
| 排盘 | /charts/:id         | DELETE | 删除排盘              |
| 排盘 | /charts/auto        | POST   | 自动排盘（时间/空间） |
| 排盘 | /charts/manual      | POST   | 手动排盘              |
| 排盘 | /charts/:id/analyze | POST   | 分析排盘              |

### 3.4 挑战相关API

| 模块 | 接口                   | 方法 | 说明         |
| ---- | ---------------------- | ---- | ------------ |
| 挑战 | /challenges            | GET  | 获取挑战列表 |
| 挑战 | /challenges/:id        | GET  | 获取挑战详情 |
| 挑战 | /challenges/:id/submit | POST | 提交挑战答案 |
| 挑战 | /challenges/records    | GET  | 获取挑战记录 |

### 3.5 案例相关API

| 模块 | 接口               | 方法 | 说明           |
| ---- | ------------------ | ---- | -------------- |
| 案例 | /cases             | GET  | 获取案例列表   |
| 案例 | /cases/:id         | GET  | 获取案例详情   |
| 案例 | /cases/:id/helpful | POST | 标记案例有帮助 |

### 3.6 每日运势API

| 模块 | 接口              | 方法 | 说明             |
| ---- | ----------------- | ---- | ---------------- |
| 运势 | /horoscope/today  | GET  | 获取今日运势     |
| 运势 | /horoscope/date   | GET  | 获取指定日期运势 |
| 运势 | /horoscope/hourly | GET  | 获取时辰运势     |

### 3.7 收藏相关API

| 模块 | 接口           | 方法   | 说明         |
| ---- | -------------- | ------ | ------------ |
| 收藏 | /favorites     | GET    | 获取收藏列表 |
| 收藏 | /favorites     | POST   | 添加收藏     |
| 收藏 | /favorites/:id | DELETE | 删除收藏     |

---

## 4. 游戏配置

### 4.1 八门配置

| 门ID    | 门名 | 吉凶 | 五行 | 方位 | 颜色    |
| ------- | ---- | ---- | ---- | ---- | ------- |
| OPEN    | 开门 | 吉   | 金   | 西北 | #FFD700 |
| REST    | 休门 | 吉   | 水   | 北   | #87CEEB |
| LIFE    | 生门 | 吉   | 土   | 东北 | #90EE90 |
| HURT    | 伤门 | 凶   | 木   | 东   | #FF6347 |
| BLOCK   | 杜门 | 凶   | 木   | 东南 | #808080 |
| SCENE   | 景门 | 吉   | 火   | 南   | #FF4500 |
| DEATH   | 死门 | 凶   | 土   | 西南 | #2F4F4F |
| STARTLE | 惊门 | 凶   | 金   | 西   | #DC143C |

### 4.2 九星配置

| 星ID       | 星名 | 吉凶 | 五行 | 颜色    |
| ---------- | ---- | ---- | ---- | ------- |
| TIAN_PENG  | 天蓬 | 凶   | 水   | #1E90FF |
| TIAN_REN   | 天任 | 吉   | 土   | #DAA520 |
| TIAN_CHONG | 天冲 | 吉   | 木   | #32CD32 |
| TIAN_FU    | 天辅 | 吉   | 木   | #228B22 |
| TIAN_YING  | 天英 | 凶   | 火   | #FF4500 |
| TIAN_RUI   | 天芮 | 凶   | 土   | #8B4513 |
| TIAN_ZHU   | 天柱 | 吉   | 金   | #C0C0C0 |
| TIAN_XIN   | 天心 | 吉   | 金   | #FFD700 |
| TIAN_QIN   | 天禽 | 吉   | 土   | #DEB887 |

### 4.3 八神配置

| 神ID     | 神名 | 吉凶 | 颜色    |
| -------- | ---- | ---- | ------- |
| ZHI_FU   | 值符 | 吉   | #FFD700 |
| TENG_SHE | 腾蛇 | 凶   | #FF6347 |
| TAI_YIN  | 太阴 | 吉   | #708090 |
| LIU_HE   | 六合 | 吉   | #FF69B4 |
| BAI_HU   | 白虎 | 凶   | #8B0000 |
| XUAN_WU  | 玄武 | 凶   | #4B0082 |
| JIU_DI   | 九地 | 吉   | #8B4513 |
| JIU_TIAN | 九天 | 吉   | #00CED1 |

### 4.4 九宫配置

| 宫ID | 宫名   | 方位 | 颜色    |
| ---- | ------ | ---- | ------- |
| 1    | 坎一宫 | 北   | #1E90FF |
| 2    | 坤二宫 | 西南 | #DAA520 |
| 3    | 震三宫 | 东   | #32CD32 |
| 4    | 巽四宫 | 东南 | #228B22 |
| 5    | 中五宫 | 中   | #FFD700 |
| 6    | 乾六宫 | 西北 | #C0C0C0 |
| 7    | 兑七宫 | 西   | #FF69B4 |
| 8    | 艮八宫 | 东北 | #DEB887 |
| 9    | 离九宫 | 南   | #FF4500 |

### 4.5 学习等级配置

| 等级         | 名称 | 所需积分 | 解锁内容           |
| ------------ | ---- | -------- | ------------------ |
| BEGINNER     | 入门 | 0        | 基础知识模块       |
| INTERMEDIATE | 进阶 | 500      | 八门、九星详解     |
| ADVANCED     | 高级 | 1500     | 排盘方法、格局分析 |
| MASTER       | 精通 | 3000     | 实战应用、案例解析 |

### 4.6 奖励配置

| 行为         | 奖励积分 | 说明             |
| ------------ | -------- | ---------------- |
| 完成知识模块 | 50-100   | 根据模块难度     |
| 通过挑战     | 20-50    | 根据挑战难度     |
| 每日签到     | 10       | 连续签到额外奖励 |
| 邀请好友     | 100      | 每邀请一个好友   |
| 分享内容     | 5        | 每分享一次       |

---

## 5. 部署架构

```
用户(移动端/PC) → CDN → Nginx → API服务 → MongoDB/Redis
                              ↓
                        WebSocket服务
```

### 5.1 H5部署特点

| 项目     | 说明                 |
| -------- | -------------------- |
| 静态资源 | CDN加速，首屏<3秒    |
| API服务  | RESTful + WebSocket  |
| 跨平台   | iOS/Android/PC浏览器 |
| PWA      | 可添加到主屏幕       |

### 5.2 Docker服务

| 服务         | 端口   | 说明            |
| ------------ | ------ | --------------- |
| mongodb      | 27017  | 数据库          |
| redis        | 6379   | 缓存            |
| qimen-api    | 3000   | API服务         |
| qimen-socket | 3001   | WebSocket       |
| nginx        | 80/443 | H5入口/负载均衡 |

### 5.3 技术栈

| 层级   | 技术                 |
| ------ | -------------------- |
| 前端   | Vue 3 + Vite + Pinia |
| 后端   | Node.js + Express    |
| 数据库 | MongoDB              |
| 缓存   | Redis                |
| 部署   | Docker + Nginx       |

---

## 6. 安全设计

### 6.1 防刷机制

| 行为     | 阈值         | 处理      |
| -------- | ------------ | --------- |
| 登录频率 | 1分钟内10次  | 锁定5分钟 |
| 排盘频率 | 1小时内100次 | 限制1小时 |
| 挑战提交 | 1分钟内10次  | 限制1分钟 |

### 6.2 数据安全

- JWT Token认证
- HTTPS/TLS加密
- 敏感操作审计日志
- 密码加密存储

### 6.3 内容安全

- 知识内容审核
- 用户评论过滤
- 敏感词屏蔽

---

## 7. 用户界面设计

### 7.1 主要页面

| 页面 | 功能               | 说明                   |
| ---- | ------------------ | ---------------------- |
| 首页 | 每日运势、快捷入口 | 展示今日奇门格局和宜忌 |
| 学习 | 知识模块、学习路径 | 系统学习奇门遁甲知识   |
| 排盘 | 时间排盘、空间排盘 | 进行奇门遁甲排盘推演   |
| 挑战 | 闯关模式、排行榜   | 通过挑战巩固学习       |
| 案例 | 历史案例、教学案例 | 学习实际应用案例       |
| 我的 | 个人中心、学习统计 | 查看个人学习进度和统计 |

### 7.2 排盘界面

| 元素     | 说明                               |
| -------- | ---------------------------------- |
| 四盘展示 | 天盘、地盘、人盘、神盘的九宫格展示 |
| 时间选择 | 年月日时选择器                     |
| 方位选择 | 八方位选择器                       |
| 格局分析 | 整体评价和详细分析                 |
| 应用建议 | 事业、婚姻、出行、投资等建议       |
| 保存分享 | 保存排盘和分享功能                 |

### 7.3 学习界面

| 元素     | 说明                     |
| -------- | ------------------------ |
| 模块列表 | 按类别和等级展示知识模块 |
| 内容展示 | 章节内容、关键点、示例   |
| 测验     | 模块测验题目和答案       |
| 进度条   | 显示学习进度和完成度     |

---

## 8. 运营计划

### 8.1 上线计划

| 阶段     | 时间    | 内容                     |
| -------- | ------- | ------------------------ |
| 内测     | 第1-2周 | 邀请少量用户测试核心功能 |
| 公测     | 第3-4周 | 开放公测，收集用户反馈   |
| 正式上线 | 第5周   | 正式发布，全面推广       |

### 8.2 推广策略

| 渠道     | 方式                       |
| -------- | -------------------------- |
| 社交媒体 | 微信、微博、抖音等平台推广 |
| 内容营销 | 奇门遁甲知识科普、案例分享 |
| KOL合作  | 与传统文化领域KOL合作      |
| 口碑传播 | 鼓励用户分享、邀请好友     |

### 8.3 内容更新

| 频率 | 内容               |
| ---- | ------------------ |
| 每日 | 每日运势更新       |
| 每周 | 新增知识模块或挑战 |
| 每月 | 新增案例或功能优化 |

---

## 9. 附录

### 9.1 数据库集合

| 集合名           | 说明     |
| ---------------- | -------- |
| users            | 用户信息 |
| knowledgeModules | 知识模块 |
| charts           | 排盘记录 |
| challenges       | 挑战题目 |
| caseStudies      | 案例研究 |
| dailyHoroscopes  | 每日运势 |
| favorites        | 用户收藏 |

### 9.2 配置表

| 配置表          | 说明     |
| --------------- | -------- |
| gates.json      | 八门配置 |
| stars.json      | 九星配置 |
| spirits.json    | 八神配置 |
| palaces.json    | 九宫配置 |
| stems.json      | 天干配置 |
| branches.json   | 地支配置 |
| solarTerms.json | 节气配置 |

### 9.3 术语表

| 术语     | 解释                                                 |
| -------- | ---------------------------------------------------- |
| 奇门遁甲 | 中国古代术数，包含天、地、人、神四盘                 |
| 四盘     | 天盘、地盘、人盘、神盘                               |
| 八门     | 开、休、生、伤、杜、景、死、惊                       |
| 九星     | 天蓬、天任、天冲、天辅、天英、天芮、天柱、天心、天禽 |
| 八神     | 值符、腾蛇、太阴、六合、白虎、玄武、九地、九天       |
| 九宫     | 坎一、坤二、震三、巽四、中五、乾六、兑七、艮八、离九 |
| 六仪     | 戊、己、庚、辛、壬、癸                               |
| 三奇     | 乙、丙、丁                                           |
| 旬首     | 甲子、甲戌、甲申、甲午、甲辰、甲寅                   |

---

## 10. 更新日志

| 版本  | 日期       | 更新内容 |
| ----- | ---------- | -------- |
| 1.0.0 | 2026-02-22 | 初版发布 |