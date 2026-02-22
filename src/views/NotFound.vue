<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-icon animate-float">🔮</div>
      <h1 class="error-title animate-fade-in-down">404</h1>
      <p class="error-message animate-fade-in-up">页面不存在</p>
      <p class="error-desc animate-fade-in-up" style="animation-delay: 0.1s">
        您访问的页面可能已被移除或暂时无法访问
      </p>
      <router-link to="/" class="btn btn-primary animate-fade-in-up" style="animation-delay: 0.2s">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>返回首页</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 可以在这里添加页面访问日志等
})
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: var(--spacing-md);
}

.not-found-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-lg);
}

.error-title {
  font-size: 72px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.error-message {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.error-desc {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all var(--transition-base);
  
  svg {
    width: 20px;
    height: 20px;
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
}
</style>
