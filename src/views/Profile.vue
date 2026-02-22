<template>
  <div class="profile">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 用户信息 -->
    <div class="user-header animate-fade-in-down">
      <div class="user-avatar">
        <span class="avatar-text">{{ userStore.user.username.charAt(0) }}</span>
      </div>
      <div class="user-info">
        <h1 class="user-name">{{ userStore.user.username }}</h1>
        <p class="user-level">{{ userLevel }}</p>
      </div>
      <div class="user-points">
        <span class="points-value">{{ userStore.user.knowledgePoints }}</span>
        <span class="points-label">积分</span>
      </div>
    </div>

    <!-- 学习统计 -->
    <div class="statistics-section animate-fade-in-up" style="animation-delay: 0.1s">
      <h2 class="section-title">学习统计</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon chart-icon">📊</div>
          <div class="stat-value">{{ userStore.statistics.chartsCreated }}</div>
          <div class="stat-label">排盘次数</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon challenge-icon">🏆</div>
          <div class="stat-value">{{ userStore.statistics.challengesCompleted }}</div>
          <div class="stat-label">挑战完成</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon time-icon">⏰</div>
          <div class="stat-value">{{ formatTime(userStore.user.totalStudyTime) }}</div>
          <div class="stat-label">学习时长</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon days-icon">📅</div>
          <div class="stat-value">{{ userStore.statistics.daysActive }}</div>
          <div class="stat-label">活跃天数</div>
        </div>
      </div>
    </div>

    <!-- 排盘历史 -->
    <div class="history-section animate-fade-in-up" style="animation-delay: 0.2s" v-if="userStore.chartHistory.length > 0">
      <div class="section-header">
        <h2 class="section-title">排盘历史</h2>
        <router-link to="/chart" class="more-link">新建 →</router-link>
      </div>
      <div class="history-list">
        <div
          v-for="(chart, index) in userStore.chartHistory.slice(0, 5)"
          :key="index"
          class="history-item"
          @click="viewChartDetail(chart)"
        >
          <div class="history-info">
            <span class="history-date">{{ formatDate(chart.timestamp) }}</span>
            <span class="history-type">{{ getChartTypeName(chart.chartType) }}</span>
          </div>
          <div class="history-xunshou">旬首：{{ chart.xunShou }}</div>
          <div class="history-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- 收藏列表 -->
    <div class="favorites-section animate-fade-in-up" style="animation-delay: 0.3s" v-if="userStore.favorites.length > 0">
      <div class="section-header">
        <h2 class="section-title">我的收藏</h2>
      </div>
      <div class="favorites-list">
        <div
          v-for="(favorite, index) in userStore.favorites.slice(0, 5)"
          :key="index"
          class="favorite-item"
        >
          <div class="favorite-icon">
            <span v-if="favorite.type === 'KNOWLEDGE'">📚</span>
            <span v-else-if="favorite.type === 'CHART'">📊</span>
            <span v-else>📖</span>
          </div>
          <div class="favorite-info">
            <span class="favorite-title">{{ favorite.title }}</span>
            <span class="favorite-date">{{ formatDate(favorite.addedAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section animate-fade-in-up" style="animation-delay: 0.4s">
      <div class="menu-list">
        <router-link to="/settings" class="menu-item">
          <div class="menu-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <span class="menu-label">设置</span>
          <div class="menu-arrow">→</div>
        </router-link>
        <div class="menu-item" @click="clearData">
          <div class="menu-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <span class="menu-label">清除数据</span>
          <div class="menu-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- 底部占位 -->
    <div class="bottom-spacer"></div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'
import toast from '@/utils/toast'

const router = useRouter()
const userStore = useUserStore()

// 用户等级
const userLevel = computed(() => {
  const levelMap = {
    'BEGINNER': '入门',
    'INTERMEDIATE': '进阶',
    'ADVANCED': '高级',
    'MASTER': '精通'
  }
  return levelMap[userStore.user.level] || '入门'
})

// 格式化时间
const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}分钟`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}小时${mins}分钟`
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  return `${year}-${month}-${day} ${hour}时`
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

// 清除数据
const clearData = async () => {
  const confirmed = await toast.confirm('确定要清除所有数据吗？此操作不可恢复。', {
    type: 'warning',
    confirmText: '确认清除',
    cancelText: '取消'
  })
  if (confirmed) {
    localStorage.removeItem('qimen_user')
    localStorage.removeItem('qimen_settings')
    userStore.loadUserData()
    toast.success('数据已清除')
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  userStore.loadUserData()
})
</script>

<style lang="scss" scoped>
.profile {
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

.user-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: var(--spacing-xl) var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: #fff;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  font-size: 28px;
  font-weight: bold;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.user-level {
  font-size: 14px;
  opacity: 0.9;
}

.user-points {
  text-align: center;
}

.points-value {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.points-label {
  font-size: 12px;
  opacity: 0.9;
}

.statistics-section,
.history-section,
.favorites-section,
.menu-section {
  padding: var(--spacing-md);
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-align: center;
}

.stat-icon {
  font-size: 24px;
  margin-bottom: var(--spacing-sm);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.history-list,
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.history-item,
.favorite-item {
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

.history-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
  font-weight: bold;
}

.history-info,
.favorite-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-date,
.favorite-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.history-type,
.favorite-date {
  font-size: 12px;
  color: var(--text-tertiary);
}

.history-xunshou {
  font-size: 14px;
  color: var(--primary-color);
  font-weight: 500;
}

.favorite-icon {
  font-size: 24px;
  margin-right: var(--spacing-md);
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-decoration: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.98);
    background: var(--bg-tertiary);
  }
}

.menu-icon {
  width: 24px;
  height: 24px;
  color: var(--text-secondary);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.menu-label {
  flex: 1;
  font-size: 15px;
}

.menu-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
}

.bottom-spacer {
  height: 20px;
}
</style>
