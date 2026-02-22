<template>
  <div class="home">
    <!-- 顶部标题区域 -->
    <header class="home-header">
      <div class="header-content">
        <h1 class="title animate-fade-in-down">奇门遁甲</h1>
        <p class="subtitle animate-fade-in-down" style="animation-delay: 0.1s">
          探索中国古代术数智慧
        </p>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="home-main">
      <!-- 每日运势卡片 -->
      <section class="section daily-horoscope animate-fade-in-up">
        <div class="section-header">
          <h2 class="section-title">今日运势</h2>
          <router-link to="/daily" class="more-link">查看更多 →</router-link>
        </div>
        <div class="daily-card">
          <div class="daily-info">
            <div class="date-info">
              <span class="date">{{ currentDate }}</span>
              <span class="weekday">{{ currentWeekday }}</span>
            </div>
            <div class="lunar-info">
              <span class="lunar">{{ lunarDate }}</span>
              <span class="solar-term">{{ solarTerm }}</span>
            </div>
          </div>
          <div class="daily-luck">
            <div class="luck-item">
              <span class="luck-label">综合</span>
              <span class="luck-value lucky">{{ overallLuck }}</span>
            </div>
            <div class="luck-item">
              <span class="luck-label">事业</span>
              <span class="luck-value" :class="careerLuckClass">{{ careerLuck }}</span>
            </div>
            <div class="luck-item">
              <span class="luck-label">财运</span>
              <span class="luck-value" :class="wealthLuckClass">{{ wealthLuck }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 快捷功能入口 -->
      <section class="section quick-actions animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="section-header">
          <h2 class="section-title">快捷功能</h2>
        </div>
        <div class="action-grid">
          <router-link to="/chart" class="action-card">
            <div class="action-icon chart-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <span class="action-label">排盘推演</span>
          </router-link>
          <router-link to="/prediction" class="action-card">
            <div class="action-icon prediction-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <span class="action-label">事件推演</span>
          </router-link>
          <router-link to="/knowledge" class="action-card">
            <div class="action-icon knowledge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <span class="action-label">知识学习</span>
          </router-link>
          <router-link to="/challenge" class="action-card">
            <div class="action-icon challenge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <span class="action-label">挑战模式</span>
          </router-link>
        </div>
      </section>

      <!-- 学习进度 -->
      <section class="section learning-progress animate-fade-in-up" style="animation-delay: 0.2s">
        <div class="section-header">
          <h2 class="section-title">学习进度</h2>
          <router-link to="/profile" class="more-link">个人中心 →</router-link>
        </div>
        <div class="progress-card">
          <div class="progress-header">
            <div class="level-badge" :class="levelClass">
              {{ levelText }}
            </div>
            <div class="points-info">
              <span class="points">{{ userStore.user.knowledgePoints }}</span>
              <span class="points-label">积分</span>
            </div>
          </div>
          <div class="progress-stats">
            <div class="stat-item">
              <span class="stat-value">{{ userStore.statistics.chartsCreated }}</span>
              <span class="stat-label">排盘次数</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userStore.statistics.challengesCompleted }}</span>
              <span class="stat-label">挑战完成</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userStore.statistics.daysActive }}</span>
              <span class="stat-label">活跃天数</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 知识推荐 -->
      <section class="section knowledge-recommend animate-fade-in-up" style="animation-delay: 0.3s">
        <div class="section-header">
          <h2 class="section-title">知识推荐</h2>
          <router-link to="/knowledge" class="more-link">查看全部 →</router-link>
        </div>
        <div class="knowledge-list">
          <router-link
            v-for="item in recommendedKnowledge"
            :key="item.id"
            :to="`/knowledge/${item.category}/${item.id}`"
            class="knowledge-item"
          >
            <div class="knowledge-icon" :class="item.iconClass">
              {{ item.icon }}
            </div>
            <div class="knowledge-content">
              <h3 class="knowledge-title">{{ item.title }}</h3>
              <p class="knowledge-desc">{{ item.description }}</p>
            </div>
            <div class="knowledge-arrow">→</div>
          </router-link>
        </div>
      </section>
    </main>

    <!-- 底部占位，防止内容被导航栏遮挡 -->
    <div class="bottom-spacer"></div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { Lunar } from 'lunar-javascript'
import BottomNav from '@/components/BottomNav.vue'

const userStore = useUserStore()

// 当前日期信息
const currentDate = ref('')
const currentWeekday = ref('')
const lunarDate = ref('')
const solarTerm = ref('')

// 运势信息
const overallLuck = ref('吉')
const careerLuck = ref('吉')
const wealthLuck = ref('中平')

// 推荐知识
const recommendedKnowledge = ref([
  {
    id: 'kai',
    category: 'gates',
    title: '八门详解',
    description: '了解开、休、生、伤、杜、景、死、惊八门的含义',
    icon: '门',
    iconClass: 'gate-icon'
  },
  {
    id: 'tianpeng',
    category: 'stars',
    title: '九星详解',
    description: '学习天蓬、天任、天冲等九星的特点',
    icon: '星',
    iconClass: 'star-icon'
  },
  {
    id: 'zhifu',
    category: 'spirits',
    title: '八神详解',
    description: '掌握值符、腾蛇、太阴等八神的作用',
    icon: '神',
    iconClass: 'spirit-icon'
  }
])

// 计算属性
const levelClass = computed(() => {
  const level = userStore.user.level
  return `level-${level.toLowerCase()}`
})

const levelText = computed(() => {
  const levelMap = {
    'BEGINNER': '入门',
    'INTERMEDIATE': '进阶',
    'ADVANCED': '高级',
    'MASTER': '精通'
  }
  return levelMap[userStore.user.level] || '入门'
})

const careerLuckClass = computed(() => {
  return careerLuck.value === '吉' ? 'lucky' : 
         careerLuck.value === '凶' ? 'unlucky' : ''
})

const wealthLuckClass = computed(() => {
  return wealthLuck.value === '吉' ? 'lucky' : 
         wealthLuck.value === '凶' ? 'unlucky' : ''
})

// 初始化
onMounted(() => {
  updateDate()
  userStore.loadUserData()
})

// 更新日期
const updateDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekday = now.getDay()

  currentDate.value = `${year}年${month}月${day}日`

  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  currentWeekday.value = `星期${weekdays[weekday]}`

  // 使用lunar-javascript库获取农历日期和节气
  const lunar = Lunar.fromDate(now)
  lunarDate.value = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
  
  // 获取当前节气
  const jieQi = lunar.getJieQi()
  solarTerm.value = jieQi || ''
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-bottom: 60px;
}

.home-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
  color: #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
}

.header-content {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
  letter-spacing: 2px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.home-main {
  padding: var(--spacing-md);
}

.section {
  margin-bottom: var(--spacing-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.more-link {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  
  &:active {
    opacity: 0.7;
  }
}

// 每日运势卡片
.daily-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.daily-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
}

.weekday {
  font-size: 14px;
  color: var(--text-tertiary);
}

.lunar-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.lunar {
  font-size: 16px;
  color: var(--primary-color);
  font-weight: 500;
}

.solar-term {
  font-size: 14px;
  color: var(--text-tertiary);
}

.daily-luck {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.luck-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.luck-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.luck-value {
  font-size: 18px;
  font-weight: bold;
  
  &.lucky {
    color: var(--lucky-color);
  }
  
  &.unlucky {
    color: var(--unlucky-color);
  }
}

// 快捷功能
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-decoration: none;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-lg);
  }
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  &.chart-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }
  
  &.prediction-icon {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: #fff;
  }
  
  &.knowledge-icon {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    color: #fff;
  }
  
  &.challenge-icon {
    background: linear-gradient(135deg, #fa709a, #fee140);
    color: #fff;
  }
}

.action-label {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

// 学习进度
.progress-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.level-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  
  &.level-beginner {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.level-intermediate {
    background: #fff3e0;
    color: #f57c00;
  }
  
  &.level-advanced {
    background: #e8f5e9;
    color: #388e3c;
  }
  
  &.level-master {
    background: linear-gradient(135deg, var(--gold-color), var(--gold-dark));
    color: #fff;
  }
}

.points-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.points {
  font-size: 24px;
  font-weight: bold;
  color: var(--gold-color);
}

.points-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

// 知识推荐
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.knowledge-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-decoration: none;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-lg);
  }
}

.knowledge-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
  
  &.gate-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }
  
  &.star-icon {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: #fff;
  }
  
  &.spirit-icon {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    color: #fff;
  }
}

.knowledge-content {
  flex: 1;
  min-width: 0;
}

.knowledge-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.knowledge-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.knowledge-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.bottom-spacer {
  height: 20px;
}
</style>
