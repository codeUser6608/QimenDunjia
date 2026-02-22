<template>
  <div class="prediction">
    <!-- 顶部标题栏 -->
    <header class="prediction-header">
      <h1 class="title">事件推演</h1>
      <p class="subtitle">根据奇门格局分析吉凶</p>
    </header>

    <!-- 推演类型选择 -->
    <div class="prediction-types">
      <router-link
        to="/prediction/career"
        class="type-card animate-fade-in-up"
      >
        <div class="type-icon career-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">事业推演</h3>
          <p class="type-desc">分析事业发展吉凶</p>
        </div>
      </router-link>
      
      <router-link
        to="/prediction/marriage"
        class="type-card animate-fade-in-up"
        style="animation-delay: 0.1s"
      >
        <div class="type-icon marriage-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">婚姻推演</h3>
          <p class="type-desc">分析婚姻运势</p>
        </div>
      </router-link>
      
      <router-link
        to="/prediction/travel"
        class="type-card animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <div class="type-icon travel-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polyline>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">出行推演</h3>
          <p class="type-desc">分析出行吉凶</p>
        </div>
      </router-link>
      
      <router-link
        to="/prediction/investment"
        class="type-card animate-fade-in-up"
        style="animation-delay: 0.3s"
      >
        <div class="type-icon investment-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="type-content">
          <h3 class="type-title">投资推演</h3>
          <p class="type-desc">分析投资时机</p>
        </div>
      </router-link>
    </div>

    <!-- 推演说明 -->
    <section class="prediction-guide">
      <div class="section-header">
        <h2 class="section-title">推演说明</h2>
      </div>
      <div class="guide-content">
        <div class="guide-item">
          <div class="guide-icon">📊</div>
          <div class="guide-text">
            <h4 class="guide-title">基于四盘</h4>
            <p class="guide-desc">综合天盘、地盘、人盘、神盘信息进行分析</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🎯</div>
          <div class="guide-text">
            <h4 class="guide-title">精准定位</h4>
            <p class="guide-desc">针对不同事件类型，提供专业分析建议</p>
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">💡</div>
          <div class="guide-text">
            <h4 class="guide-title">实用建议</h4>
            <p class="guide-desc">提供宜忌事项和最佳时机建议</p>
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
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import BottomNav from '@/components/BottomNav.vue'

const userStore = useUserStore()

// 初始化
onMounted(() => {
  userStore.loadUserData()
})
</script>

<style lang="scss" scoped>
.prediction {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.prediction-header {
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

.prediction-types {
  padding: var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
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
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 28px;
    height: 28px;
    color: #fff;
  }
  
  &.career-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
  
  &.marriage-icon {
    background: linear-gradient(135deg, #f093fb, #f5576c);
  }
  
  &.travel-icon {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
  }
  
  &.investment-icon {
    background: linear-gradient(135deg, #fa709a, #fee140);
  }
}

.type-content {
  text-align: center;
}

.type-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.type-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

.prediction-guide {
  padding: 0 var(--spacing-md) var(--spacing-lg);
}

.section-header {
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
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
