import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const user = ref({
    username: '访客',
    level: 'BEGINNER',
    totalStudyTime: 0,
    lastStudyDate: null,
    knowledgePoints: 0,
    daysActive: 0
  })
  
  // 学习进度
  const learningProgress = ref({
    currentLevel: 'BEGINNER',
    completedModules: [],
    currentModule: null
  })
  
  // 排盘历史
  const chartHistory = ref([])
  
  // 挑战记录
  const challengeRecords = ref([])
  
  // 收藏
  const favorites = ref([])
  
  // 统计信息
  const statistics = computed(() => ({
    chartsCreated: chartHistory.value.length,
    challengesCompleted: challengeRecords.value.filter(r => r.completed).length,
    knowledgePoints: user.value.knowledgePoints,
    daysActive: user.value.daysActive
  }))
  
  // 加载用户数据
  const loadUserData = () => {
    try {
      const savedUser = localStorage.getItem('qimen_user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        user.value = { ...user.value, ...userData.user }
        learningProgress.value = { ...learningProgress.value, ...userData.learningProgress }
        chartHistory.value = userData.chartHistory || []
        challengeRecords.value = userData.challengeRecords || []
        favorites.value = userData.favorites || []
        
        // 加载后清理旧记录
        cleanOldHistory()
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
    }
  }
  
  // 保存用户数据
  const saveUserData = () => {
    try {
      const userData = {
        user: user.value,
        learningProgress: learningProgress.value,
        chartHistory: chartHistory.value,
        challengeRecords: challengeRecords.value,
        favorites: favorites.value
      }
      localStorage.setItem('qimen_user', JSON.stringify(userData))
    } catch (error) {
      console.error('保存用户数据失败:', error)
    }
  }
  
  // 更新学习进度
  const updateLearningProgress = (module) => {
    if (!learningProgress.value.completedModules.includes(module)) {
      learningProgress.value.completedModules.push(module)
      user.value.knowledgePoints += 10
      saveUserData()
    }
  }
  
  // 清理超过30天的旧记录
  const cleanOldHistory = () => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    chartHistory.value = chartHistory.value.filter(chart => {
      const chartDate = new Date(chart.timestamp)
      return chartDate >= thirtyDaysAgo
    })
    
    // 同时限制最多50条记录
    if (chartHistory.value.length > 50) {
      chartHistory.value = chartHistory.value.slice(0, 50)
    }
  }
  
  // 清空排盘历史
  const clearChartHistory = () => {
    chartHistory.value = []
    saveUserData()
  }
  
  // 添加排盘记录
  const addChartHistory = (chart) => {
    chartHistory.value.unshift({
      ...chart,
      timestamp: new Date().toISOString()
    })
    
    // 清理旧记录
    cleanOldHistory()
    
    saveUserData()
  }
  
  // 添加挑战记录
  const addChallengeRecord = (record) => {
    challengeRecords.value.push({
      ...record,
      completedAt: new Date().toISOString()
    })
    saveUserData()
  }
  
  // 添加收藏
  const addFavorite = (item) => {
    const exists = favorites.value.find(
      f => f.type === item.type && f.itemId === item.itemId
    )
    if (!exists) {
      favorites.value.push({
        ...item,
        addedAt: new Date().toISOString()
      })
      saveUserData()
    }
  }
  
  // 移除收藏
  const removeFavorite = (type, itemId) => {
    favorites.value = favorites.value.filter(
      f => !(f.type === type && f.itemId === itemId)
    )
    saveUserData()
  }
  
  // 更新学习时间
  const updateStudyTime = (minutes) => {
    user.value.totalStudyTime += minutes
    user.value.lastStudyDate = new Date().toISOString()
    saveUserData()
  }
  
  // 检查模块是否完成
  const isModuleCompleted = (module) => {
    return learningProgress.value.completedModules.includes(module)
  }
  
  return {
    user,
    learningProgress,
    chartHistory,
    challengeRecords,
    favorites,
    statistics,
    loadUserData,
    saveUserData,
    updateLearningProgress,
    addChartHistory,
    cleanOldHistory,
    clearChartHistory,
    addChallengeRecord,
    addFavorite,
    removeFavorite,
    updateStudyTime,
    isModuleCompleted
  }
})
