<template>
  <div class="daily">
    <!-- 顶部标题栏 -->
    <header class="daily-header">
      <h1 class="title">每日运势</h1>
      <p class="subtitle">今日奇门格局与运势分析</p>
    </header>

    <!-- 日期信息 -->
    <div class="date-info animate-fade-in-down">
      <div class="date-main">
        <span class="date">{{ currentDate }}</span>
        <span class="weekday">{{ currentWeekday }}</span>
      </div>
      <div class="date-extra">
        <span class="lunar">{{ lunarDate }}</span>
        <span class="solar-term">{{ solarTerm }}</span>
      </div>
    </div>

    <!-- 综合运势 -->
    <section class="section overall-luck animate-fade-in-up">
      <div class="section-header">
        <h2 class="section-title">综合运势</h2>
      </div>
      <div class="luck-card">
        <div class="luck-rating" :class="overallLuckClass">
          <span class="rating-icon">{{ overallLuckIcon }}</span>
          <span class="rating-text">{{ overallLuck }}</span>
        </div>
        <p class="luck-summary">{{ luckSummary }}</p>
      </div>
    </section>

    <!-- 时辰运势 -->
    <section class="section hourly-luck animate-fade-in-up" style="animation-delay: 0.1s">
      <div class="section-header">
        <h2 class="section-title">时辰运势</h2>
      </div>
      <div class="hours-grid">
        <div
          v-for="(hour, index) in hourlyLuck"
          :key="index"
          class="hour-item"
          :class="hour.luckClass"
        >
          <div class="hour-name">{{ hour.name }}</div>
          <div class="hour-time">{{ hour.time }}</div>
          <div class="hour-luck">{{ hour.luck }}</div>
        </div>
      </div>
    </section>

    <!-- 宜忌事项 -->
    <section class="section should-do animate-fade-in-up" style="animation-delay: 0.2s">
      <div class="section-header">
        <h2 class="section-title">宜忌事项</h2>
      </div>
      <div class="should-grid">
        <div class="should-card lucky">
          <div class="should-header">
            <span class="should-icon">✓</span>
            <span class="should-title">宜</span>
          </div>
          <ul class="should-list">
            <li v-for="(item, index) in shouldDoList" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="should-card unlucky">
          <div class="should-header">
            <span class="should-icon">✗</span>
            <span class="should-title">忌</span>
          </div>
          <ul class="should-list">
            <li v-for="(item, index) in shouldNotDoList" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 今日建议 -->
    <section class="section daily-advice animate-fade-in-up" style="animation-delay: 0.3s">
      <div class="section-header">
        <h2 class="section-title">今日建议</h2>
      </div>
      <div class="advice-content">
        <div class="advice-item">
          <div class="advice-icon">💼</div>
          <div class="advice-text">
            <h4 class="advice-title">事业</h4>
            <p class="advice-desc">{{ careerAdvice }}</p>
          </div>
        </div>
        <div class="advice-item">
          <div class="advice-icon">❤️</div>
          <div class="advice-text">
            <h4 class="advice-title">感情</h4>
            <p class="advice-desc">{{ loveAdvice }}</p>
          </div>
        </div>
        <div class="advice-item">
          <div class="advice-icon">💰</div>
          <div class="advice-text">
            <h4 class="advice-title">财运</h4>
            <p class="advice-desc">{{ wealthAdvice }}</p>
          </div>
        </div>
        <div class="advice-item">
          <div class="advice-icon">🏥</div>
          <div class="advice-text">
            <h4 class="advice-title">健康</h4>
            <p class="advice-desc">{{ healthAdvice }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部占位 -->
    <div class="bottom-spacer"></div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'

const userStore = useUserStore()

// 日期信息
const currentDate = ref('')
const currentWeekday = ref('')
const lunarDate = ref('正月廿三')
const solarTerm = ref('雨水')

// 综合运势
const overallLuck = ref('吉')
const overallLuckClass = computed(() => {
  return overallLuck.value === '吉' ? 'lucky' : 
         overallLuck.value === '凶' ? 'unlucky' : 'neutral'
})
const overallLuckIcon = computed(() => {
  return overallLuck.value === '吉' ? '🌟' : 
         overallLuck.value === '凶' ? '⚠️' : '⚖️'
})
const luckSummary = ref('今日奇门格局为吉，开门在乾宫，贵人相助。适合开展新项目、寻求合作、出行等事务。')

// 时辰运势
const hourlyLuck = ref([
  { name: '子时', time: '23:00-01:00', luck: '吉', luckClass: 'lucky' },
  { name: '丑时', time: '01:00-03:00', luck: '中平', luckClass: 'neutral' },
  { name: '寅时', time: '03:00-05:00', luck: '吉', luckClass: 'lucky' },
  { name: '卯时', time: '05:00-07:00', luck: '中平', luckClass: 'neutral' },
  { name: '辰时', time: '07:00-09:00', luck: '吉', luckClass: 'lucky' },
  { name: '巳时', time: '09:00-11:00', luck: '吉', luckClass: 'lucky' },
  { name: '午时', time: '11:00-13:00', luck: '中平', luckClass: 'neutral' },
  { name: '未时', time: '13:00-15:00', luck: '吉', luckClass: 'lucky' },
  { name: '申时', time: '15:00-17:00', luck: '中平', luckClass: 'neutral' },
  { name: '酉时', time: '17:00-19:00', luck: '吉', luckClass: 'lucky' },
  { name: '戌时', time: '19:00-21:00', luck: '中平', luckClass: 'neutral' },
  { name: '亥时', time: '21:00-23:00', luck: '吉', luckClass: 'lucky' }
])

// 宜忌事项
const shouldDoList = ref([
  '开展新项目',
  '寻求合作',
  '出行旅游',
  '签订合同',
  '求职面试',
  '拜访贵人'
])

const shouldNotDoList = ref([
  '冲动决策',
  '盲目投资',
  '与人争执',
  '冒险行动',
  '深夜出行',
  '大额消费'
])

// 今日建议
const careerAdvice = ref('今日事业运势良好，适合开展新项目、寻求合作。开门在乾宫，贵人相助，利于事业发展。')
const loveAdvice = ref('今日感情运势平稳，适合与伴侣沟通，增进感情。六合在巽宫，利于感情发展。')
const wealthAdvice = ref('今日财运一般，建议谨慎行事，不宜大额投资。生门在艮宫，财运平稳。')
const healthAdvice = ref('今日健康运势良好，注意饮食规律，适当运动。天任星在坤宫，贵人助力，身体安康。')

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
}
</script>

<style lang="scss" scoped>
.daily {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.daily-header {
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

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
  position: relative;
  z-index: 1;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.date-info {
  background: var(--bg-card);
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-md);
}

.date-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
}

.weekday {
  font-size: 14px;
  color: var(--text-tertiary);
}

.date-extra {
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

.section {
  margin: 0 var(--spacing-md) var(--spacing-lg);
}

.section-header {
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.luck-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
}

.luck-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: var(--spacing-md);
  
  &.lucky {
    background: #e8f5e9;
    color: #388e3c;
  }
  
  &.neutral {
    background: #fff3e0;
    color: #f57c00;
  }
  
  &.unlucky {
    background: #ffebee;
    color: #d32f2f;
  }
}

.rating-icon {
  font-size: 24px;
}

.luck-summary {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.hours-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.hour-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  text-align: center;
  
  &.lucky {
    border-color: #c8e6c9;
    background: #f1f8e9;
  }
  
  &.neutral {
    border-color: #ffe0b2;
    background: #fff8e1;
  }
  
  &.unlucky {
    border-color: #ffcdd2;
    background: #ffebee;
  }
}

.hour-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.hour-time {
  font-size: 10px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.hour-luck {
  font-size: 12px;
  font-weight: 500;
}

.should-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.should-card {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  
  &.lucky {
    background: #e8f5e9;
    border: 1px solid #c8e6c9;
  }
  
  &.unlucky {
    background: #ffebee;
    border: 1px solid #ffcdd2;
  }
}

.should-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.should-icon {
  font-size: 18px;
  font-weight: bold;
}

.should-title {
  font-size: 16px;
  font-weight: 600;
}

.should-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.should-list li {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 4px 0;
  padding-left: 20px;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 8px;
    color: var(--text-tertiary);
  }
}

.advice-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.advice-item {
  display: flex;
  gap: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.advice-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.advice-text {
  flex: 1;
}

.advice-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.advice-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.bottom-spacer {
  height: 20px;
}
</style>
