<template>
  <div class="chart-type">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 时间选择 -->
    <div class="time-selector">
      <h2 class="selector-title">选择时间</h2>
      <div class="selector-content">
        <div class="time-input-group">
          <label class="input-label">年份</label>
          <Select v-model="time.year" :options="yearOptions" placeholder="选择年份" />
        </div>
        
        <div class="time-input-group">
          <label class="input-label">月份</label>
          <Select v-model="time.month" :options="monthOptions" placeholder="选择月份" />
        </div>
        
        <div class="time-input-group">
          <label class="input-label">日期</label>
          <Select v-model="time.day" :options="dayOptions" placeholder="选择日期" />
        </div>
        
        <div class="time-input-group">
          <label class="input-label">时辰</label>
          <Select v-model="time.hour" :options="hourOptions" placeholder="选择时辰" />
        </div>
      </div>
      
      <button class="btn btn-primary generate-btn" @click="generateChart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>生成排盘</span>
      </button>
    </div>

    <!-- 排盘结果 -->
    <div class="chart-result" v-if="chartData">
      <div class="result-header">
        <h3 class="result-title">排盘结果</h3>
        <div class="result-time">
          {{ time.year }}年{{ time.month }}月{{ time.day }}日 {{ hours[time.hour] }}
        </div>
        <div class="result-xunshou">旬首：{{ chartData.timeInfo.xunShou }}</div>
      </div>

      <!-- 四盘展示 -->
      <div class="plates-container">
        <ChartPlate
          title="地盘"
          subtitle="九宫天干"
          type="earth"
          :data="chartData.earthPlate"
          label="天干"
        />
        
        <ChartPlate
          title="天盘"
          subtitle="九星排布"
          type="heaven"
          :data="chartData.heavenPlate"
          label="九星"
        />
        
        <ChartPlate
          title="人盘"
          subtitle="八门排布"
          type="human"
          :data="chartData.humanPlate"
          label="八门"
        />
        
        <ChartPlate
          title="神盘"
          subtitle="八神排布"
          type="spirit"
          :data="chartData.spiritPlate"
          label="八神"
        />
      </div>

      <!-- 格局分析 -->
      <div class="chart-analysis">
        <h3 class="analysis-title">格局分析</h3>
        <div class="analysis-content">
          <div class="analysis-item">
            <span class="analysis-label">综合评价：</span>
            <span class="analysis-value">{{ analysis.overall.summary }}</span>
          </div>
          
          <div class="analysis-section">
            <h4 class="section-subtitle">八门分析</h4>
            <div
              v-for="(item, index) in analysis.gates.slice(0, 3)"
              :key="index"
              class="analysis-detail"
            >
              <span class="detail-name">{{ item.gate }}（{{ item.palace }}）</span>
              <span class="detail-meaning">{{ item.meaning }}</span>
            </div>
          </div>
          
          <div class="analysis-section">
            <h4 class="section-subtitle">九星分析</h4>
            <div
              v-for="(item, index) in analysis.stars.slice(0, 3)"
              :key="index"
              class="analysis-detail"
            >
              <span class="detail-name">{{ item.star }}（{{ item.palace }}）</span>
              <span class="detail-meaning">{{ item.meaning }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="result-actions">
        <button class="btn btn-outline" @click="saveChart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <span>保存排盘</span>
        </button>
        <button class="btn btn-primary" @click="goToPrediction">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>事件推演</span>
        </button>
      </div>
    </div>

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
import { generateChart as generateChartData, analyzeChart } from '@/utils/chart'
import ChartPlate from '@/components/ChartPlate.vue'
import BottomNav from '@/components/BottomNav.vue'
import Select from '@/components/Select.vue'
import toast from '@/utils/toast'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const chartType = computed(() => route.params.type || 'time')

// 时间选择
const time = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  hour: Math.floor(new Date().getHours() / 2)
})

// 年份列表
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

// 年份选项
const yearOptions = computed(() => {
  return years.value.map(year => ({
    value: year,
    label: `${year}年`
  }))
})

// 月份选项
const monthOptions = computed(() => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}月`
  }))
})

// 日期选项
const dayOptions = computed(() => {
  const { year, month } = time.value
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  // 闰年二月
  let days = daysInMonth[month - 1]
  if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
    days = 29
  }
  
  return Array.from({ length: days }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}日`
  }))
})

// 时辰列表
const hours = [
  '子时', '丑时', '寅时', '卯时', '辰时', '巳时',
  '午时', '未时', '申时', '酉时', '戌时', '亥时'
]

// 时辰选项
const hourOptions = computed(() => {
  return hours.map((hour, index) => ({
    value: index,
    label: hour
  }))
})

// 每月天数（保留用于计算）
const daysInMonth = computed(() => {
  const { year, month } = time.value
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  // 闰年二月
  if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
    return 29
  }
  
  return daysInMonth[month - 1]
})

// 排盘数据
const chartData = ref(null)
const analysis = ref({
  overall: { summary: '' },
  gates: [],
  stars: [],
  spirits: []
})

// 生成排盘
const generateChart = () => {
  const { year, month, day, hour } = time.value
  chartData.value = generateChartData(year, month, day, hour)
  analysis.value = analyzeChart(chartData.value)
}

// 保存排盘
const saveChart = () => {
  if (!chartData.value) return
  
  userStore.addChartHistory({
    chartType: chartType.value.toUpperCase(),
    year: time.value.year,
    month: time.value.month,
    day: time.value.day,
    hour: time.value.hour,
    xunShou: chartData.value.timeInfo.xunShou,
    chartData: chartData.value
  })
  
  toast.success('排盘已保存！')
}

// 跳转到事件推演
const goToPrediction = () => {
  router.push('/prediction')
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  userStore.loadUserData()
  
  // 检查是否有要查看的排盘数据
  const viewingChart = sessionStorage.getItem('viewingChart')
  if (viewingChart) {
    try {
      const chart = JSON.parse(viewingChart)
      if (chart.chartType === 'TIME' && chart.chartData) {
        // 设置时间
        if (chart.year !== undefined) {
          time.value.year = chart.year
        }
        if (chart.month !== undefined) {
          time.value.month = chart.month
        }
        if (chart.day !== undefined) {
          time.value.day = chart.day
        }
        if (chart.hour !== undefined) {
          time.value.hour = chart.hour
        }
        // 显示排盘数据
        chartData.value = chart.chartData
        analysis.value = analyzeChart(chartData.value)
      }
      // 清除临时存储
      sessionStorage.removeItem('viewingChart')
    } catch (error) {
      console.error('Failed to parse viewing chart:', error)
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-type {
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

.time-selector {
  background: var(--bg-card);
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.selector-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.selector-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.time-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.time-select {
  padding: var(--spacing-sm);
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

.generate-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: #fff;
  box-shadow: var(--shadow-md);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-lg);
  }
}

.chart-result {
  padding: var(--spacing-md);
}

.result-header {
  background: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.result-time {
  font-size: 16px;
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 4px;
}

.result-xunshou {
  font-size: 14px;
  color: var(--text-tertiary);
}

.plates-container {
  margin-bottom: var(--spacing-lg);
}

.chart-analysis {
  background: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
}

.analysis-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.analysis-item {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.analysis-label {
  font-weight: 500;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.analysis-value {
  color: var(--text-primary);
  flex: 1;
}

.analysis-section {
  margin-top: var(--spacing-sm);
}

.section-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  padding-left: var(--spacing-sm);
  border-left: 3px solid var(--primary-color);
}

.analysis-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
}

.detail-name {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.detail-meaning {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: right;
  flex: 1;
  margin-left: var(--spacing-sm);
}

.result-actions {
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
