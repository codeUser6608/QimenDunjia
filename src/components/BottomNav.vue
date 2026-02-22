<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
    >
      <div class="nav-icon">
        <component :is="item.icon" />
      </div>
      <span class="nav-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 导航项配置
const navItems = [
  {
    path: '/',
    label: '首页',
    icon: 'HomeIcon'
  },
  {
    path: '/knowledge',
    label: '学习',
    icon: 'BookIcon'
  },
  {
    path: '/chart',
    label: '排盘',
    icon: 'ChartIcon'
  },
  {
    path: '/daily',
    label: '运势',
    icon: 'StarIcon'
  },
  {
    path: '/challenge',
    label: '挑战',
    icon: 'TrophyIcon'
  }
]

// 判断是否激活
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<script>
// 图标组件
const HomeIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  `
}

const BookIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  `
}

const ChartIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `
}

const StarIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `
}

const TrophyIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  `
}

export default {
  components: {
    HomeIcon,
    BookIcon,
    ChartIcon,
    StarIcon,
    TrophyIcon
  }
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: var(--bg-card);
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -2px 8px rgba(139, 69, 19, 0.1);
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  text-decoration: none;
  color: var(--text-tertiary);
  transition: all var(--transition-base);
  cursor: pointer;
  
  &.active {
    color: var(--primary-color);
    
    .nav-icon {
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  transition: transform var(--transition-base);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.nav-label {
  font-size: 12px;
  line-height: 1;
}
</style>
