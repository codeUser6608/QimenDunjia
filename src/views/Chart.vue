<template>
  <div class="chart">
    <!-- 顶部标题栏 -->
    <header class="chart-header">
      <h1 class="title">排盘推演</h1>
      <p class="subtitle">奇门遁甲四盘排布</p>
    </header>

    <!-- 排盘类型选择 -->
    <div class="chart-types">
      <router-link
        to="/chart/time"
        class="type-card animate-fade-in-up"
      >
        <div class="type-icon time-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">时间排盘</h3>
          <p class="type-desc">根据年月日时自动排盘</p>
        </div>
      </router-link>
      
      <router-link
        to="/chart/space"
        class="type-card animate-fade-in-up"
        style="animation-delay: 0.1s"
      >
        <div class="type-icon space-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">空间排盘</h3>
          <p class="type-desc">根据方位进行排盘</p>
        </div>
      </router-link>
      
      <router-link
        to="/chart/manual"
        class="type-card animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <div class="type-icon manual-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">手动排盘</h3>
          <p class="type-desc">用户手动调整四盘布局</p>
        </div>
      </router-link>
    </div>

    <!-- 最近排盘记录 -->
    <section class="recent-charts" v-if="recentCharts.length > 0">
      <div class="section-header">
        <h2 class="section-title">最近排盘</h2>
        <router-link to="/profile" class="more-link">查看全部 →</router-link>
      </div>
      <div class="chart-list">
        <div
          v-for="(chart, index) in recentCharts.slice(0, 3)"
          :key="index"
          class="chart-item animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="viewChartDetail(chart)"
        >
          <div class="chart-info">
            <span class="chart-date">{{ formatDate(chart.timestamp) }}</span>
            <span class="chart-type">{{ getChartTypeName(chart.chartType) }}</span>
          </div>
          <div class="chart-xunshou">旬首：{{ chart.xunShou }}</div>
          <div class="chart-arrow">→</div>
        </div>
      </div>
    </section>

    <!-- 排盘说明 -->
    <section class="chart-guide">
      <div class="section-header">
        <h2 class="section-title">排盘说明</h2>
      </div>
      <div class="guide-content">
        <div class="guide-item">
          <div class="guide-icon">📊</div>
          <div class="guide-text">
            <h4 class="guide-title">四盘系统</h4>
            <p class="guide-desc">天盘、地盘、人盘、神盘四盘合一，全面分析格局</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">⏰</div>
          <div class="guide-text">
            <h4 class="guide-title">时间排盘</h4>
            <p class="guide-desc">输入年月日时，自动生成奇门格局</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🧭</div>
          <div class="guide-text">
            <h4 class="guide-title">空间排盘</h4>
            <p class="guide-desc">根据方位信息，进行空间布局分析</p>
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
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'

const router = useRouter()
const userStore = useUserStore()

// 最近排盘记录
const recentCharts = computed(() => {
  return userStore.chartHistory
})

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  return `${year}年${month}月${day}日 ${hour}时`
}

// 获取排盘类型中文名称
const getChartTypeName = (chartType) => {
  const typeMap = {
    'TIME': '时间排盘',
    'SPACE': '空间排盘',
    'MANUAL': '手动排盘'
  }
  return typeMap[chartType] || chartType
}

// 查看排盘详情
const viewChartDetail = (chart) => {
  // 将排盘数据保存到临时存储
  sessionStorage.setItem('viewingChart', JSON.stringify(chart))
  
  // 根据排盘类型跳转到相应页面
  switch (chart.chartType) {
    case 'TIME':
      router.push('/chart/time')
      break
    case 'SPACE':
      router.push('/chart/space')
      break
    case 'MANUAL':
      router.push('/chart/manual')
      break
    default:
      router.push('/chart/time')
  }
}

// 初始化
onMounted(() => {
  userStore.loadUserData()
})
</script>

<style lang="scss" scoped>
.chart {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.chart-header {
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

.chart-types {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.type-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
  
  &:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-lg);
  }
}

.type-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 28px;
    height: 28px;
    color: #fff;
  }
  
  &.time-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
  
  &.space-icon {
    background: linear-gradient(135deg, #f093fb, #f5576c);
  }
  
  &.manual-icon {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
  }
}

.type-content {
  flex: 1;
}

.type-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.type-desc {
  font-size: 14px;
  color: var(--text-tertiary);
}

.recent-charts,
.chart-guide {
  padding: 0 var(--spacing-md) var(--spacing-lg);
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
}

.chart-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.chart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.98);
    background: var(--bg-tertiary);
  }
}

.chart-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
  font-weight: bold;
}

.chart-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chart-date {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.chart-type {
  font-size: 12px;
  color: var(--text-tertiary);
}

.chart-xunshou {
  font-size: 14px;
  color: var(--primary-color);
  font-weight: 500;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.guide-item {
  display: flex;
  gap: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.guide-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--gold-color), var(--gold-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.guide-text {
  flex: 1;
}

.guide-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.guide-desc {
  font-size: 14px;
  color: var(--text-tertiary);
  line-height: 1.5;
}

.bottom-spacer {
  height: 20px;
}
</style>
