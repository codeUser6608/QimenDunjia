import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 用户选择的主题（包括AUTO）
  const autoTheme = ref('LIGHT')
  
  // 当前实际应用的主题（只有DARK或LIGHT）
  const currentTheme = ref('LIGHT')
  
  // 通知设置
  const notifications = ref({
    dailyHoroscope: true,
    studyReminder: true,
    reminderTime: '09:00'
  })
  
  // 语言
  const language = ref('zh-CN')
  
  // 更新当前主题
  const updateCurrentTheme = () => {
    if (autoTheme.value === 'AUTO') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentTheme.value = prefersDark ? 'DARK' : 'LIGHT'
    } else {
      currentTheme.value = autoTheme.value
    }
  }
  
  // 从本地存储加载设置
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('qimen_settings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        autoTheme.value = settings.theme || 'LIGHT'
        notifications.value = { ...notifications.value, ...settings.notifications }
        language.value = settings.language || 'zh-CN'
      }
      
      // 根据autoTheme设置currentTheme
      updateCurrentTheme()
    } catch (error) {
      console.error('加载设置失败:', error)
    }
  }
  
  // 保存设置到本地存储
  const saveSettings = () => {
    try {
      const settings = {
        theme: autoTheme.value,
        notifications: notifications.value,
        language: language.value
      }
      localStorage.setItem('qimen_settings', JSON.stringify(settings))
    } catch (error) {
      console.error('保存设置失败:', error)
    }
  }
  
  // 切换主题
  const toggleTheme = () => {
    autoTheme.value = autoTheme.value === 'LIGHT' ? 'DARK' : 'LIGHT'
    updateCurrentTheme()
  }
  
  // 设置主题（支持AUTO）
  const setTheme = (newTheme) => {
    autoTheme.value = newTheme
    updateCurrentTheme()
  }
  
  // 更新通知设置
  const updateNotifications = (key, value) => {
    notifications.value[key] = value
  }
  
  // 监听设置变化
  watch([autoTheme, notifications, language], () => {
    saveSettings()
  }, { deep: true })
  
  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleThemeChange = () => {
    updateCurrentTheme()
  }
  mediaQuery.addEventListener('change', handleThemeChange)
  
  return {
    // 向后兼容：theme指向currentTheme
    theme: currentTheme,
    autoTheme,
    currentTheme,
    notifications,
    language,
    loadSettings,
    saveSettings,
    toggleTheme,
    setTheme,
    updateNotifications
  }
})
