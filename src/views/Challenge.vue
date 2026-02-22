<template>
  <div class="challenge">
    <!-- 顶部标题栏 -->
    <header class="challenge-header">
      <h1 class="title">挑战模式</h1>
      <p class="subtitle">通过挑战提升奇门遁甲技能</p>
    </header>

    <!-- 挑战进度 -->
    <div class="challenge-progress animate-fade-in-down">
      <div class="progress-info">
        <div class="progress-level">
          <span class="level-text">{{ userLevel }}</span>
          <span class="level-label">当前等级</span>
        </div>
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-value">{{ completedCount }}</span>
            <span class="stat-label">已完成</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalCount }}</span>
            <span class="stat-label">总挑战</span>
          </div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <!-- 挑战分类 -->
    <div class="challenge-categories">
      <button
        v-for="category in categories"
        :key="category.key"
        class="category-btn"
        :class="{ active: activeCategory === category.key }"
        @click="switchCategory(category.key)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-label">{{ category.name }}</span>
      </button>
    </div>

    <!-- 挑战列表 -->
    <div class="challenge-list">
      <router-link
        v-for="(challenge, index) in filteredChallenges"
        :key="challenge.id"
        :to="`/challenge/${challenge.id}`"
        class="challenge-card animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-header">
          <div class="card-icon" :style="{ background: challenge.color }">
            <span class="icon-text">{{ challenge.icon }}</span>
          </div>
          <div class="card-info">
            <h3 class="card-title">{{ challenge.title }}</h3>
            <p class="card-desc">{{ challenge.description }}</p>
          </div>
          <div class="card-status">
            <span v-if="challenge.completed" class="status-badge completed">✓ 已完成</span>
            <span v-else class="status-badge pending">待挑战</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-meta">
            <span class="meta-item">
              <span class="meta-icon">⭐</span>
              <span class="meta-text">{{ challenge.points }}积分</span>
            </span>
            <span class="meta-item">
              <span class="meta-icon">📊</span>
              <span class="meta-text">{{ levelText(challenge.level) }}</span>
            </span>
          </div>
          <div class="card-arrow">→</div>
        </div>
      </router-link>
    </div>

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

// 挑战进度
const completedCount = computed(() => {
  return userStore.challengeRecords.filter(r => r.completed).length
})

const totalCount = computed(() => challenges.value.length)
const progressPercent = computed(() => {
  return Math.round((completedCount.value / totalCount.value) * 100)
})

// 挑战分类
const categories = [
  { key: 'all', name: '全部', icon: '📚' },
  { key: 'chart', name: '排盘挑战', icon: '📊' },
  { key: 'analysis', name: '解盘挑战', icon: '🔍' },
  { key: 'case', name: '案例分析', icon: '📖' }
]

const activeCategory = ref('all')

// 挑战列表
const challenges = ref([
  {
    id: 1,
    type: 'chart',
    title: '时间排盘入门',
    description: '根据给定时间完成正确排盘',
    icon: '时',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    level: 'BEGINNER',
    points: 10,
    completed: false
  },
  {
    id: 2,
    type: 'chart',
    title: '空间排盘基础',
    description: '根据方位信息完成排盘',
    icon: '空',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    level: 'BEGINNER',
    points: 10,
    completed: false
  },
  {
    id: 3,
    type: 'analysis',
    title: '八门含义识别',
    description: '识别八门的吉凶和含义',
    icon: '门',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    level: 'BEGINNER',
    points: 15,
    completed: false
  },
  {
    id: 4,
    type: 'analysis',
    title: '九星特点分析',
    description: '分析九星的特点和作用',
    icon: '星',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    level: 'INTERMEDIATE',
    points: 20,
    completed: false
  },
  {
    id: 5,
    type: 'analysis',
    title: '八神作用解析',
    description: '解析八神的作用和影响',
    icon: '神',
    color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    level: 'INTERMEDIATE',
    points: 20,
    completed: false
  },
  {
    id: 6,
    type: 'case',
    title: '历史案例解析',
    description: '分析历史奇门案例',
    icon: '史',
    color: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    level: 'INTERMEDIATE',
    points: 25,
    completed: false
  },
  {
    id: 7,
    type: 'chart',
    title: '复杂时间排盘',
    description: '完成复杂时间条件下的排盘',
    icon: '复',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    level: 'ADVANCED',
    points: 30,
    completed: false
  },
  {
    id: 8,
    type: 'analysis',
    title: '格局综合分析',
    description: '综合分析奇门格局',
    icon: '格',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    level: 'ADVANCED',
    points: 35,
    completed: false
  },
  {
    id: 9,
    type: 'case',
    title: '现代案例研究',
    description: '研究现代奇门应用案例',
    icon: '现',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    level: 'ADVANCED',
    points: 40,
    completed: false
  },
  {
    id: 10,
    type: 'chart',
    title: '手动排盘精通',
    description: '精通手动排盘技巧',
    icon: '手',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    level: 'MASTER',
    points: 50,
    completed: false
  },
  {
    id: 11,
    type: 'analysis',
    title: '高级格局解读',
    description: '解读高级奇门格局',
    icon: '高',
    color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    level: 'MASTER',
    points: 55,
    completed: false
  },
  {
    id: 12,
    type: 'case',
    title: '综合案例实战',
    description: '综合运用奇门知识解决实际问题',
    icon: '战',
    color: 'linear-gradient(135deg, #d299c2, #fef9d7)',
    level: 'MASTER',
    points: 60,
    completed: false
  }
])

// 过滤挑战
const filteredChallenges = computed(() => {
  if (activeCategory.value === 'all') {
    return challenges.value
  }
  return challenges.value.filter(c => c.type === activeCategory.value)
})

// 切换分类
const switchCategory = (category) => {
  activeCategory.value = category
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

// 初始化
onMounted(() => {
  userStore.loadUserData()
  
  // 检查已完成的挑战
  challenges.value.forEach(challenge => {
    const record = userStore.challengeRecords.find(r => r.challengeId === challenge.id)
    if (record && record.completed) {
      challenge.completed = true
    }
  })
})
</script>

<style lang="scss" scoped>
.challenge {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.challenge-header {
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

.challenge-progress {
  background: var(--bg-card);
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.progress-level {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.level-text {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.level-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.progress-stats {
  display: flex;
  gap: var(--spacing-lg);
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

.progress-bar {
  height: 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--gold-color));
  transition: width 0.5s ease;
}

.challenge-categories {
  display: flex;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md) var(--spacing-md);
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.category-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-base);
  
  &.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.category-icon {
  font-size: 16px;
}

.category-label {
  font-weight: 500;
}

.challenge-list {
  padding: 0 var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.challenge-card {
  display: block;
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

.card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-text {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-desc {
  font-size: 14px;
  color: var(--text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-status {
  flex-shrink: 0;
}

.status-badge {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  
  &.completed {
    background: #e8f5e9;
    color: #388e3c;
  }
  
  &.pending {
    background: #fff3e0;
    color: #f57c00;
  }
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-light);
}

.card-meta {
  display: flex;
  gap: var(--spacing-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--text-secondary);
}

.meta-icon {
  font-size: 14px;
}

.card-arrow {
  font-size: 18px;
  color: var(--text-tertiary);
}

.bottom-spacer {
  height: 20px;
}
</style>
