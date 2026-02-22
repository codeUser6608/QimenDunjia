<template>
  <div class="knowledge">
    <!-- 顶部标题栏 -->
    <header class="knowledge-header">
      <h1 class="title">知识学习</h1>
      <p class="subtitle">探索奇门遁甲的奥秘</p>
    </header>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <button
        v-for="category in categories"
        :key="category.key"
        class="tab-item"
        :class="{ active: activeCategory === category.key }"
        @click="switchCategory(category.key)"
      >
        <span class="tab-icon">{{ category.icon }}</span>
        <span class="tab-label">{{ category.name }}</span>
      </button>
    </div>

    <!-- 知识列表 -->
    <main class="knowledge-main">
      <div class="knowledge-list">
        <router-link
          v-for="item in currentKnowledge"
          :key="item.id"
          :to="`/knowledge/${activeCategory}/${item.id}`"
          class="knowledge-card animate-fade-in-up"
        >
          <div class="card-icon" :style="{ background: item.color }">
            <span class="icon-text">{{ item.icon }}</span>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ item.name }}</h3>
              <span
                v-if="item.luck"
                class="luck-badge"
                :class="item.luck === '吉' ? 'lucky' : 'unlucky'"
              >
                {{ item.luck }}
              </span>
            </div>
            <p class="card-description">{{ item.description }}</p>
            <div class="card-footer">
              <span v-if="item.element" class="tag element-tag">
                {{ item.element }}行
              </span>
              <span v-if="item.direction" class="tag direction-tag">
                {{ item.direction }}
              </span>
              <span class="tag level-tag" :class="levelClass(item.level)">
                {{ levelText(item.level) }}
              </span>
            </div>
          </div>
          <div class="card-arrow">→</div>
        </router-link>
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
import { useUserStore } from '@/stores/user'
import { getKnowledgeByCategory, getKnowledgeCategories } from '@/data/knowledge'
import BottomNav from '@/components/BottomNav.vue'

const userStore = useUserStore()

// 分类列表
const categories = ref([])
const activeCategory = ref('basics')

// 当前知识列表
const currentKnowledge = computed(() => {
  return getKnowledgeByCategory(activeCategory.value)
})

// 切换分类
const switchCategory = (category) => {
  activeCategory.value = category
}

// 获取等级样式类
const levelClass = (level) => {
  return `level-${level.toLowerCase()}`
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
  categories.value = getKnowledgeCategories()
  userStore.loadUserData()
})
</script>

<style lang="scss" scoped>
.knowledge {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 60px;
}

.knowledge-header {
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

.category-tabs {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  overflow-x: auto;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
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

.tab-icon {
  font-size: 16px;
}

.tab-label {
  font-weight: 500;
}

.knowledge-main {
  padding: var(--spacing-md);
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.knowledge-card {
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

.card-content {
  flex: 1;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.luck-badge {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  
  &.lucky {
    background: #e8f5e9;
    color: #388e3c;
  }
  
  &.unlucky {
    background: #ffebee;
    color: #d32f2f;
  }
}

.card-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 500;
  
  &.element-tag {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.direction-tag {
    background: #fff3e0;
    color: #f57c00;
  }
  
  &.level-tag {
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
}

.card-arrow {
  font-size: 20px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.bottom-spacer {
  height: 20px;
}
</style>
