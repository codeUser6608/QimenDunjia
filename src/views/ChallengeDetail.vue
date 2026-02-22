<template>
  <div class="challenge-detail">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 挑战内容 -->
    <main class="challenge-main" v-if="challenge">
      <!-- 标题区域 -->
      <div class="challenge-header animate-fade-in-down">
        <div class="header-icon" :style="{ background: challenge.color }">
          <span class="icon-text">{{ challenge.icon }}</span>
        </div>
        <div class="header-info">
          <h1 class="detail-title">{{ challenge.title }}</h1>
          <div class="header-meta">
            <span class="meta-tag">{{ levelText(challenge.level) }}</span>
            <span class="meta-tag">{{ challenge.points }}积分</span>
          </div>
        </div>
      </div>

      <!-- 挑战描述 -->
      <div class="challenge-description animate-fade-in-up" style="animation-delay: 0.1s">
        <h2 class="section-title">挑战描述</h2>
        <p class="description-text">{{ challenge.description }}</p>
      </div>

      <!-- 挑战内容 -->
      <div class="challenge-content animate-fade-in-up" style="animation-delay: 0.2s">
        <h2 class="section-title">挑战内容</h2>
        <div class="content-box">
          <div class="question">
            <span class="question-label">问题：</span>
            <span class="question-text">{{ challenge.question }}</span>
          </div>
          
          <div class="options" v-if="challenge.options">
            <button
              v-for="(option, index) in challenge.options"
              :key="index"
              class="option-btn"
              :class="{ 
                selected: selectedOption === index,
                correct: showResult && index === challenge.correctAnswer,
                wrong: showResult && selectedOption === index && index !== challenge.correctAnswer
              }"
              @click="selectOption(index)"
              :disabled="showResult"
            >
              <span class="option-label">{{ String.fromCharCode(65 + index) }}.</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 提示 -->
      <div class="challenge-hint animate-fade-in-up" style="animation-delay: 0.3s" v-if="showHint">
        <h2 class="section-title">提示</h2>
        <div class="hint-box">
          <span class="hint-icon">💡</span>
          <span class="hint-text">{{ challenge.hint }}</span>
        </div>
      </div>

      <!-- 解析 -->
      <div class="challenge-explanation animate-fade-in-up" style="animation-delay: 0.4s" v-if="showResult">
        <h2 class="section-title">解析</h2>
        <div class="explanation-box">
          <p class="explanation-text">{{ challenge.explanation }}</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons animate-fade-in-up" style="animation-delay: 0.5s">
        <button
          v-if="!showResult"
          class="btn btn-primary"
          @click="submitAnswer"
          :disabled="selectedOption === null"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>提交答案</span>
        </button>
        
        <button
          v-if="!showResult && !showHint"
          class="btn btn-outline"
          @click="showHint = true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>查看提示</span>
        </button>
        
        <button
          v-if="showResult"
          class="btn btn-primary"
          @click="nextChallenge"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
          <span>下一题</span>
        </button>
      </div>
    </main>

    <!-- 底部占位 -->
    <div class="bottom-spacer"></div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const challengeId = computed(() => parseInt(route.params.id))

// 挑战数据
const challenge = ref(null)
const selectedOption = ref(null)
const showHint = ref(false)
const showResult = ref(false)

// 模拟挑战数据
const challengeData = {
  1: {
    title: '时间排盘入门',
    description: '根据给定时间完成正确排盘',
    icon: '时',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    level: 'BEGINNER',
    points: 10,
    question: '奇门遁甲中，地盘天干"戊"位于哪个宫位？',
    options: ['坎一宫', '坤二宫', '震三宫', '巽四宫'],
    correctAnswer: 0,
    hint: '地盘天干按洛书九宫排布，坎一宫为起始宫位。',
    explanation: '地盘天干按洛书九宫排布，坎一宫为戊，坤二宫为己，震三宫为庚，巽四宫为辛。因此正确答案是坎一宫。'
  },
  2: {
    title: '空间排盘基础',
    description: '根据方位信息完成排盘',
    icon: '空',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    level: 'BEGINNER',
    points: 10,
    question: '八门中，哪个门位于西北方位？',
    options: ['开门', '休门', '生门', '景门'],
    correctAnswer: 0,
    hint: '西北方位对应乾卦，乾宫为开门。',
    explanation: '八门中，开门位于西北乾宫，休门位于北坎宫，生门位于东北艮宫，景门位于南离宫。因此正确答案是开门。'
  },
  3: {
    title: '八门含义识别',
    description: '识别八门的吉凶和含义',
    icon: '门',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    level: 'BEGINNER',
    points: 15,
    question: '以下哪个门属于吉门？',
    options: ['伤门', '杜门', '死门', '开门'],
    correctAnswer: 3,
    hint: '吉门包括开门、休门、生门、景门。',
    explanation: '八门中，吉门包括开门、休门、生门、景门；凶门包括伤门、杜门、死门、惊门。因此正确答案是开门。'
  },
  4: {
    title: '九星特点分析',
    description: '分析九星的特点和作用',
    icon: '星',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    level: 'INTERMEDIATE',
    points: 20,
    question: '以下哪颗星属于吉星？',
    options: ['天蓬星', '天芮星', '天任星', '天英星'],
    correctAnswer: 2,
    hint: '吉星包括天任、天辅、天柱、天心、天禽。',
    explanation: '九星中，吉星包括天任、天辅、天柱、天心、天禽；凶星包括天蓬、天芮、天英、天冲。因此正确答案是天任星。'
  },
  5: {
    title: '八神作用解析',
    description: '解析八神的作用和影响',
    icon: '神',
    color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    level: 'INTERMEDIATE',
    points: 20,
    question: '以下哪个神属于吉神？',
    options: ['腾蛇', '白虎', '值符', '玄武'],
    correctAnswer: 2,
    hint: '吉神包括值符、太阴、六合、九地、九天。',
    explanation: '八神中，吉神包括值符、太阴、六合、九地、九天；凶神包括腾蛇、白虎、玄武。因此正确答案是值符。'
  },
  6: {
    title: '历史案例解析',
    description: '分析历史奇门案例',
    icon: '史',
    color: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    level: 'INTERMEDIATE',
    points: 25,
    question: '奇门遁甲起源于哪个朝代？',
    options: ['汉朝', '唐朝', '宋朝', '明朝'],
    correctAnswer: 0,
    hint: '奇门遁甲是中国古代术数，起源于汉代。',
    explanation: '奇门遁甲起源于汉代，经过历代发展，在唐朝、宋朝、明朝都有重要发展。因此正确答案是汉朝。'
  },
  7: {
    title: '复杂时间排盘',
    description: '完成复杂时间条件下的排盘',
    icon: '复',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    level: 'ADVANCED',
    points: 30,
    question: '奇门遁甲中，"值符"随时间如何移动？',
    options: ['每时辰移动一次', '每日移动一次', '每旬移动一次', '每月移动一次'],
    correctAnswer: 2,
    hint: '值符每旬（十天）移动一次，称为"值符飞宫"。',
    explanation: '奇门遁甲中，值符每旬（十天）移动一次，称为"值符飞宫"。因此正确答案是每旬移动一次。'
  },
  8: {
    title: '格局综合分析',
    description: '综合分析奇门格局',
    icon: '格',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    level: 'ADVANCED',
    points: 35,
    question: '以下哪个格局属于大吉格局？',
    options: ['青龙返首', '白虎猖狂', '腾蛇夭矫', '朱雀投江'],
    correctAnswer: 0,
    hint: '青龙返首是大吉格局，其他为凶格。',
    explanation: '奇门格局中，青龙返首是大吉格局，白虎猖狂、腾蛇夭矫、朱雀投江均为凶格。因此正确答案是青龙返首。'
  },
  9: {
    title: '现代案例研究',
    description: '研究现代奇门应用案例',
    icon: '现',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    level: 'ADVANCED',
    points: 40,
    question: '奇门遁甲在现代主要用于哪些领域？',
    options: ['仅用于军事', '仅用于商业', '多领域应用', '仅用于个人命理'],
    correctAnswer: 2,
    hint: '奇门遁甲在现代广泛应用于军事、商业、决策、健康等多个领域。',
    explanation: '奇门遁甲在现代广泛应用于军事、商业、决策、健康、教育等多个领域，不仅限于单一用途。因此正确答案是多领域应用。'
  },
  10: {
    title: '手动排盘精通',
    description: '精通手动排盘技巧',
    icon: '手',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    level: 'MASTER',
    points: 50,
    question: '手动排盘时，首先确定的是什么？',
    options: ['定局数', '排天盘', '排人盘', '排神盘'],
    correctAnswer: 0,
    hint: '手动排盘首先需要根据时间确定局数。',
    explanation: '手动排盘的步骤是：首先定局数，然后排天盘、地盘、人盘、神盘。因此正确答案是定局数。'
  },
  11: {
    title: '高级格局解读',
    description: '解读高级奇门格局',
    icon: '高',
    color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    level: 'MASTER',
    points: 55,
    question: '以下哪个格局代表"飞龙在天"？',
    options: ['飞龙在天', '青龙得位', '龙回首', '以上都不是'],
    correctAnswer: 2,
    hint: '龙回首是高级格局，代表飞龙在天之意。',
    explanation: '奇门遁甲中，龙回首是高级格局，代表飞龙在天之意，是极佳的格局。因此正确答案是龙回首。'
  },
  12: {
    title: '综合案例实战',
    description: '综合运用奇门知识解决实际问题',
    icon: '战',
    color: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    level: 'MASTER',
    points: 60,
    question: '综合运用奇门遁甲时，最重要的原则是什么？',
    options: ['只看单一要素', '综合分析各要素', '只看吉凶', '随意推断'],
    correctAnswer: 1,
    hint: '奇门遁甲需要综合分析天、地、人、神各要素。',
    explanation: '综合运用奇门遁甲时，最重要的原则是综合分析天、地、人、神各要素，不能只看单一要素。因此正确答案是综合分析各要素。'
  }
}

// 获取等级文本
const levelText = (level) => {
  const levelMap = {
    'BEGINNER': '入门',
    'INTERMEDIATE': '进阶',
    'ADVANCED': '高级',
    'MASTER': '精通'
  }
  return levelMap[level] || '入门'
}

// 选择选项
const selectOption = (index) => {
  selectedOption.value = index
}

// 提交答案
const submitAnswer = () => {
  if (selectedOption.value === null) return
  
  showResult.value = true
  
  const isCorrect = selectedOption.value === challenge.value.correctAnswer
  
  // 保存挑战记录
  userStore.addChallengeRecord({
    challengeId: challengeId.value,
    completed: isCorrect,
    score: isCorrect ? challenge.value.points : 0
  })
  
  if (isCorrect) {
    userStore.user.knowledgePoints += challenge.value.points
  }
}

// 下一题
const nextChallenge = () => {
  const nextId = challengeId.value + 1
  if (nextId <= 12) {
    // 重置状态
    selectedOption.value = null
    showHint.value = false
    showResult.value = false
    router.push(`/challenge/${nextId}`)
  } else {
    router.push('/challenge')
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  // 重置状态
  selectedOption.value = null
  showHint.value = false
  showResult.value = false
  
  userStore.loadUserData()
  challenge.value = challengeData[challengeId.value]
  
  // 检查是否已完成
  const record = userStore.challengeRecords.find(r => r.challengeId === challengeId.value)
  if (record && record.completed) {
    showResult.value = true
    selectedOption.value = challenge.value.correctAnswer
  }
})
</script>

<style lang="scss" scoped>
.challenge-detail {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  color: var(--text-primary);
  font-size: 14px;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:active {
    background: var(--bg-tertiary);
  }
}

.challenge-main {
  padding: var(--spacing-md);
}

.challenge-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.header-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-md);
}

.icon-text {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.detail-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.header-meta {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.meta-tag {
  padding: 4px 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  font-size: 12px;
  color: var(--text-secondary);
}

.challenge-description {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-sm);
  border-left: 3px solid var(--primary-color);
}

.description-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.challenge-content {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.content-box {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.question {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.question-label {
  font-weight: 500;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.question-text {
  color: var(--text-primary);
  flex: 1;
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.option-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:not(:disabled):active {
    transform: scale(0.98);
  }
  
  &.selected {
    border-color: var(--primary-color);
    background: var(--bg-secondary);
  }
  
  &.correct {
    border-color: var(--lucky-color);
    background: #e8f5e9;
  }
  
  &.wrong {
    border-color: var(--unlucky-color);
    background: #ffebee;
  }
}

.option-label {
  font-weight: 600;
  color: var(--primary-color);
  flex-shrink: 0;
}

.option-text {
  color: var(--text-primary);
  flex: 1;
}

.challenge-hint {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.hint-box {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: #fff8e1;
  border-radius: var(--radius-md);
}

.hint-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.hint-text {
  color: var(--text-secondary);
  flex: 1;
}

.challenge-explanation {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.explanation-box {
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.explanation-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all var(--transition-base);
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: #fff;
    box-shadow: var(--shadow-md);
    
    &:not(:disabled):active {
      transform: scale(0.98);
      box-shadow: var(--shadow-lg);
    }
  }
  
  &-outline {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    
    &:active {
      background: var(--primary-color);
      color: #fff;
    }
  }
}

.bottom-spacer {
  height: 20px;
}
</style>
