<template>
  <div class="knowledge-detail">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 知识详情内容 -->
    <main class="detail-main" v-if="knowledge">
      <!-- 标题区域 -->
      <div class="detail-header animate-fade-in-down">
        <div class="header-icon" :style="{ background: knowledge.color }">
          <span class="icon-text">{{ knowledge.icon }}</span>
        </div>
        <div class="header-info">
          <h1 class="detail-title">{{ knowledge.name }}</h1>
          <div class="header-tags">
            <span
              v-if="knowledge.luck"
              class="tag luck-tag"
              :class="knowledge.luck === '吉' ? 'lucky' : 'unlucky'"
            >
              {{ knowledge.luck }}
            </span>
            <span v-if="knowledge.element" class="tag element-tag">
              {{ knowledge.element }}行
            </span>
            <span v-if="knowledge.direction" class="tag direction-tag">
              {{ knowledge.direction }}
            </span>
          </div>
        </div>
      </div>

      <!-- 含义 -->
      <section class="detail-section animate-fade-in-up" style="animation-delay: 0.1s">
        <h2 class="section-title">含义</h2>
        <p class="section-content">{{ knowledge.meaning }}</p>
      </section>

      <!-- 详细描述 -->
      <section class="detail-section animate-fade-in-up" style="animation-delay: 0.2s">
        <h2 class="section-title">详细说明</h2>
        <p class="section-content">{{ knowledge.description }}</p>
      </section>

      <!-- 应用建议 -->
      <section class="detail-section animate-fade-in-up" style="animation-delay: 0.3s" v-if="knowledge.advice">
        <h2 class="section-title">应用建议</h2>
        <div class="advice-box">
          <div class="advice-item">
            <span class="advice-label">宜：</span>
            <span class="advice-content">{{ extractAdvice(knowledge.advice, '宜') }}</span>
          </div>
          <div class="advice-item" v-if="knowledge.advice.includes('忌')">
            <span class="advice-label">忌：</span>
            <span class="advice-content">{{ extractAdvice(knowledge.advice, '忌') }}</span>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="detail-section animate-fade-in-up" style="animation-delay: 0.4s" v-if="knowledge.applications">
        <h2 class="section-title">应用场景</h2>
        <div class="applications-grid">
          <div
            v-for="(app, index) in knowledge.applications"
            :key="index"
            class="application-item"
          >
            <span class="application-icon">📌</span>
            <span class="application-text">{{ app }}</span>
          </div>
        </div>
      </section>

      <!-- 内容详情（基础知识） -->
      <section class="detail-section animate-fade-in-up" style="animation-delay: 0.5s" v-if="knowledge.content">
        <h2 class="section-title">详细介绍</h2>
        <p class="section-content">{{ knowledge.content }}</p>
      </section>

      <!-- 操作按钮 -->
      <div class="action-buttons animate-fade-in-up" style="animation-delay: 0.6s">
        <button class="btn btn-primary" @click="markAsLearned">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>标记为已学</span>
        </button>
        <button class="btn btn-outline" @click="toggleFavorite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              :fill="isFavorite ? 'currentColor' : 'none'"
            ></path>
          </svg>
          <span>{{ isFavorite ? '已收藏' : '收藏' }}</span>
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
import { getKnowledgeById } from '@/data/knowledge'
import BottomNav from '@/components/BottomNav.vue'
import toast from '@/utils/toast'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const category = computed(() => route.params.category)
const id = computed(() => route.params.id)
const isFavorite = ref(false)

// 获取知识详情
const knowledge = computed(() => {
  return getKnowledgeById(category.value, id.value)
})

// 提取建议
const extractAdvice = (advice, type) => {
  const regex = new RegExp(`${type}：([^\\n]+)`)
  const match = advice.match(regex)
  return match ? match[1].trim() : ''
}

// 返回
const goBack = () => {
  router.back()
}

// 标记为已学
const markAsLearned = () => {
  const moduleId = `${category.value}_${id.value}`
  userStore.updateLearningProgress(moduleId)
  toast.success('已标记为已学习！')
}

// 切换收藏
const toggleFavorite = () => {
  if (isFavorite.value) {
    userStore.removeFavorite('KNOWLEDGE', `${category.value}_${id.value}`)
    isFavorite.value = false
  } else {
    userStore.addFavorite({
      type: 'KNOWLEDGE',
      itemId: `${category.value}_${id.value}`,
      title: knowledge.value?.name || ''
    })
    isFavorite.value = true
  }
}

// 初始化
onMounted(() => {
  userStore.loadUserData()
  
  // 滚动到页面顶部
  window.scrollTo(0, 0)
  
  // 检查是否已收藏
  const favorite = userStore.favorites.find(
    f => f.type === 'KNOWLEDGE' && f.itemId === `${category.value}_${id.value}`
  )
  isFavorite.value = !!favorite
})
</script>

<style lang="scss" scoped>
.knowledge-detail {
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

.detail-main {
  padding: var(--spacing-md);
}

.detail-header {
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

.header-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  
  &.luck-tag {
    &.lucky {
      background: #e8f5e9;
      color: #388e3c;
    }
    
    &.unlucky {
      background: #ffebee;
      color: #d32f2f;
    }
  }
  
  &.element-tag {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.direction-tag {
    background: #fff3e0;
    color: #f57c00;
  }
}

.detail-section {
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

.section-content {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
  background: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.advice-box {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.advice-item {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-light);
  }
}

.advice-label {
  font-weight: bold;
  color: var(--primary-color);
  flex-shrink: 0;
}

.advice-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

.applications-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.application-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-secondary);
}

.application-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
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
  
  &-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: #fff;
    box-shadow: var(--shadow-md);
    
    &:active {
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
