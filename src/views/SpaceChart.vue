<template>
  <div class="space-chart">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 方位选择 -->
    <div class="direction-selector">
      <h2 class="selector-title">选择方位</h2>
      <div class="direction-grid">
        <div
          v-for="direction in directions"
          :key="direction.value"
          class="direction-item"
          :class="{ 'active': selectedDirection === direction.value }"
          @click="selectDirection(direction.value)"
        >
          <div class="direction-icon">{{ direction.icon }}</div>
          <div class="direction-name">{{ direction.name }}</div>
          <div class="direction-palace">{{ direction.palace }}</div>
        </div>
      </div>

      <!-- 位置输入 -->
      <div class="location-input">
        <label class="input-label">当前位置</label>
        <input
          v-model="location"
          type="text"
          class="input-field"
          placeholder="请输入位置（如：北京、上海）"
        />
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
        <h3 class="result-title">空间排盘结果</h3>
        <div class="result-direction">
          方位：{{ getDirectionName(selectedDirection) }}
        </div>
        <div class="result-location" v-if="location">
          位置：{{ location }}
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
            <h4 class="section-subtitle">方位分析</h4>
            <div class="analysis-detail">
              <span class="detail-name">选择方位</span>
              <span class="detail-meaning">{{ getDirectionName(selectedDirection) }}（{{ getDirectionPalace(selectedDirection) }}）</span>
            </div>
            <div class="analysis-detail">
              <span class="detail-name">方位吉凶</span>
              <span class="detail-meaning" :class="getDirectionLuckClass(selectedDirection)">
                {{ getDirectionLuck(selectedDirection) }}
              </span>
            </div>
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
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { generateSpaceChart, analyzeChart } from '@/utils/chart'
import ChartPlate from '@/components/ChartPlate.vue'
import BottomNav from '@/components/BottomNav.vue'
import toast from '@/utils/toast'

const router = useRouter()
const userStore = useUserStore()

// 方位选项
const directions = [
  { value: 'north', name: '北方', icon: '⬆️', palace: '坎一宫' },
  { value: 'northeast', name: '东北', icon: '↗️', palace: '艮八宫' },
  { value: 'east', name: '东方', icon: '➡️', palace: '震三宫' },
  { value: 'southeast', name: '东南', icon: '↘️', palace: '巽四宫' },
  { value: 'south', name: '南方', icon: '⬇️', palace: '离九宫' },
  { value: 'southwest', name: '西南', icon: '↙️', palace: '坤二宫' },
  { value: 'west', name: '西方', icon: '⬅️', palace: '兑七宫' },
  { value: 'northwest', name: '西北', icon: '↖️', palace: '乾六宫' }
]

// 选中的方位
const selectedDirection = ref('north')
const location = ref('')

// 排盘数据
const chartData = ref(null)
const analysis = ref({
  overall: { summary: '' },
  gates: [],
  stars: [],
  spirits: []
})

// 选择方位
const selectDirection = (direction) => {
  selectedDirection.value = direction
}

// 获取方位名称
const getDirectionName = (direction) => {
  const dir = directions.find(d => d.value === direction)
  return dir ? dir.name : ''
}

// 获取方位宫位
const getDirectionPalace = (direction) => {
  const dir = directions.find(d => d.value === direction)
  return dir ? dir.palace : ''
}

// 获取方位吉凶
const getDirectionLuck = (direction) => {
  const luckMap = {
    'north': '吉',
    'northeast': '吉',
    'east': '吉',
    'southeast': '吉',
    'south': '吉',
    'southwest': '凶',
    'west': '凶',
    'northwest': '吉'
  }
  return luckMap[direction] || '平'
}

// 获取方位吉凶样式
const getDirectionLuckClass = (direction) => {
  const luck = getDirectionLuck(direction)
  return {
    'luck-good': luck === '吉',
    'luck-bad': luck === '凶',
    'luck-average': luck === '平'
  }
}

// 生成排盘
const generateChart = () => {
  chartData.value = generateSpaceChart(selectedDirection.value)
  analysis.value = analyzeChart(chartData.value)
}

// 保存排盘
const saveChart = () => {
  if (!chartData.value) return
  
  userStore.addChartHistory({
    chartType: 'SPACE',
    direction: selectedDirection.value,
    location: location.value,
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
      if (chart.chartType === 'SPACE' && chart.chartData) {
        // 设置方位和位置
        if (chart.direction) {
          selectedDirection.value = chart.direction
        }
        if (chart.location) {
          location.value = chart.location
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
.space-chart {
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

.direction-selector {
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
  text-align: center;
}

.direction-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.direction-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.95);
  }
  
  &.active {
    border-color: var(--primary-color);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  }
}

.direction-icon {
  font-size: 28px;
  line-height: 1;
}

.direction-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}

.direction-palace {
  font-size: 10px;
  color: var(--text-tertiary);
}

.location-input {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

.input-field {
  width: 100%;
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
  
  &::placeholder {
    color: var(--text-tertiary);
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

.result-direction,
.result-location {
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
  font-weight: 500;
  color: var(--text-secondary);
}

.detail-meaning {
  font-size: 14px;
  color: var(--text-primary);
  text-align: right;
  
  &.luck-good {
    color: #52c41a;
  }
  
  &.luck-bad {
    color: #f5222d;
  }
  
  &.luck-average {
    color: #faad14;
  }
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: #fff;
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.bottom-spacer {
  height: 20px;
}
</style>
