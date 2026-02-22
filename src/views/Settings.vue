<template>
  <div class="settings">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 设置内容 -->
    <main class="settings-main">
      <!-- 主题设置 -->
      <div class="settings-section animate-fade-in-up">
        <h2 class="section-title">主题设置</h2>
        <div class="theme-options">
          <button
            class="theme-btn"
            :class="{ active: settingsStore.theme === 'LIGHT' }"
            @click="setTheme('LIGHT')"
          >
            <span class="theme-icon">☀️</span>
            <span class="theme-label">浅色</span>
          </button>
          <button
            class="theme-btn"
            :class="{ active: settingsStore.theme === 'DARK' }"
            @click="setTheme('DARK')"
          >
            <span class="theme-icon">🌙</span>
            <span class="theme-label">深色</span>
          </button>
        </div>
      </div>

      <!-- 通知设置 -->
      <div class="settings-section animate-fade-in-up" style="animation-delay: 0.1s">
        <h2 class="section-title">通知设置</h2>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">每日运势提醒</span>
              <span class="setting-desc">每天推送今日运势</span>
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                v-model="settingsStore.notifications.dailyHoroscope"
                @change="updateNotification('dailyHoroscope')"
              >
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">学习提醒</span>
              <span class="setting-desc">提醒每天学习</span>
            </div>
            <label class="toggle-switch">
              <input
                type="checkbox"
                v-model="settingsStore.notifications.studyReminder"
                @change="updateNotification('studyReminder')"
              >
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="setting-item" v-if="settingsStore.notifications.studyReminder">
            <div class="setting-info">
              <span class="setting-label">提醒时间</span>
              <span class="setting-desc">设置每天提醒时间</span>
            </div>
            <Select
              v-model="settingsStore.notifications.reminderTime"
              :options="reminderTimeOptions"
              placeholder="选择提醒时间"
              @change="updateNotification('reminderTime')"
              class="setting-select"
            />
          </div>
        </div>
      </div>

      <!-- 关于 -->
      <div class="settings-section animate-fade-in-up" style="animation-delay: 0.2s">
        <h2 class="section-title">关于</h2>
        <div class="about-info">
          <div class="about-item">
            <span class="about-label">应用名称</span>
            <span class="about-value">奇门遁甲</span>
          </div>
          <div class="about-item">
            <span class="about-label">版本号</span>
            <span class="about-value">1.0.0</span>
          </div>
          <div class="about-item">
            <span class="about-label">开发者</span>
            <span class="about-value">Li xizheng</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons animate-fade-in-up" style="animation-delay: 0.3s">
        <button class="btn btn-outline" @click="clearCache">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          <span>清除缓存</span>
        </button>
        <button class="btn btn-outline" @click="resetSettings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"></path>
            <path d="M3 3v9h9"></path>
          </svg>
          <span>重置设置</span>
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import BottomNav from '@/components/BottomNav.vue'
import Select from '@/components/Select.vue'
import toast from '@/utils/toast'

const router = useRouter()
const settingsStore = useSettingsStore()

// 提醒时间选项
const reminderTimeOptions = [
  { value: '09:00', label: '09:00' },
  { value: '12:00', label: '12:00' },
  { value: '18:00', label: '18:00' },
  { value: '21:00', label: '21:00' }
]

// 设置主题
const setTheme = (theme) => {
  settingsStore.theme = theme
  const themeName = theme === 'LIGHT' ? '浅色' : '深色'
  toast.success(`已切换到${themeName}主题`)
}

// 更新通知设置
const updateNotification = (key) => {
  settingsStore.updateNotifications(key, settingsStore.notifications[key])
}

// 清除缓存
const clearCache = async () => {
  const confirmed = await toast.confirm('确定要清除缓存吗？\n\n这将清除以下数据：\n- 主题设置\n- 通知设置\n- 语言设置\n\n不会清除：\n- 学习进度\n- 排盘历史\n- 收藏内容', {
    type: 'warning',
    confirmText: '确认清除',
    cancelText: '取消'
  })
  if (confirmed) {
    // 只清除设置相关的缓存，保留用户数据
    localStorage.removeItem('qimen_settings')
    settingsStore.loadSettings()
    toast.success('缓存已清除')
  }
}

// 重置设置
const resetSettings = async () => {
  const confirmed = await toast.confirm('确定要重置所有设置吗？', {
    type: 'warning',
    confirmText: '确认重置',
    cancelText: '取消'
  })
  if (confirmed) {
    localStorage.removeItem('qimen_settings')
    settingsStore.loadSettings()
    toast.success('设置已重置')
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  settingsStore.loadSettings()
})
</script>

<style lang="scss" scoped>
.settings {
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

.settings-main {
  padding: var(--spacing-md);
}

.settings-section {
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

.theme-options {
  display: flex;
  gap: var(--spacing-md);
}

.theme-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &.active {
    border-color: var(--primary-color);
    background: var(--bg-secondary);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.theme-icon {
  font-size: 32px;
}

.theme-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.setting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}

.setting-desc {
  font-size: 12px;
  color: var(--text-tertiary);
}

.setting-select {
  width: 120px;
  flex-shrink: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  flex-shrink: 0;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.3s;
  border-radius: var(--radius-full);
  
  &::before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
}

input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

input:checked + .toggle-slider::before {
  transform: translateX(20px);
}

.time-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.about-info {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.about-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-light);
  }
}

.about-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.about-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
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
