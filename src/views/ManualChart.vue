<template>
  <div class="manual-chart">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 手动排盘说明 -->
    <div class="manual-guide">
      <h2 class="guide-title">手动排盘</h2>
      <p class="guide-desc">点击宫位可手动调整四盘布局</p>
    </div>

    <!-- 排盘设置 -->
    <div class="chart-settings">
      <div class="setting-tabs">
        <button
          v-for="plate in plateTabs"
          :key="plate.value"
          class="tab-button"
          :class="{ 'active': currentPlate === plate.value }"
          @click="currentPlate = plate.value"
        >
          {{ plate.label }}
        </button>
      </div>
      
      <div class="setting-actions">
        <button class="btn btn-outline reset-btn" @click="resetChart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          <span>重置</span>
        </button>
        <button class="btn btn-primary analyze-btn" @click="analyzeChart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>分析格局</span>
        </button>
      </div>
    </div>

    <!-- 四盘展示 -->
    <div class="plates-container">
      <ChartPlate
        title="地盘"
        subtitle="九宫天干（点击编辑）"
        type="earth"
        :data="manualData.earthPlate"
        label="天干"
        :editable="currentPlate === 'earth'"
        @edit="openEditModal"
      />
      
      <ChartPlate
        title="天盘"
        subtitle="九星排布（点击编辑）"
        type="heaven"
        :data="manualData.heavenPlate"
        label="九星"
        :editable="currentPlate === 'heaven'"
        @edit="openEditModal"
      />
      
      <ChartPlate
        title="人盘"
        subtitle="八门排布（点击编辑）"
        type="human"
        :data="manualData.humanPlate"
        label="八门"
        :editable="currentPlate === 'human'"
        @edit="openEditModal"
      />
      
      <ChartPlate
        title="神盘"
        subtitle="八神排布（点击编辑）"
        type="spirit"
        :data="manualData.spiritPlate"
        label="八神"
        :editable="currentPlate === 'spirit'"
        @edit="openEditModal"
      />
    </div>

    <!-- 格局分析 -->
    <div class="chart-analysis" v-if="analysis">
      <h3 class="analysis-title">格局分析</h3>
      <div class="analysis-content">
        <div class="analysis-item">
          <span class="analysis-label">综合评价：</span>
          <span class="analysis-value">{{ analysis.overall.summary }}</span>
        </div>
        
        <div class="analysis-section">
          <h4 class="section-subtitle">八门分析</h4>
          <div
            v-for="(item, index) in analysis.gates"
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
            v-for="(item, index) in analysis.stars"
            :key="index"
            class="analysis-detail"
          >
            <span class="detail-name">{{ item.star }}（{{ item.palace }}）</span>
            <span class="detail-meaning">{{ item.meaning }}</span>
          </div>
        </div>
        
        <div class="analysis-section">
          <h4 class="section-subtitle">八神分析</h4>
          <div
            v-for="(item, index) in analysis.spirits"
            :key="index"
            class="analysis-detail"
          >
            <span class="detail-name">{{ item.spirit }}（{{ item.palace }}）</span>
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

    <!-- 编辑弹窗 -->
    <div class="modal-overlay" v-if="showEditModal" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">编辑{{ getPlateName(currentPlate) }}</h3>
          <button class="modal-close" @click="closeEditModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="palace-info">
            <span class="palace-label">宫位：</span>
            <span class="palace-value">{{ editingPalace?.name }}</span>
          </div>
          
          <div class="edit-options">
            <div
              v-for="option in getEditOptions()"
              :key="option"
              class="edit-option"
              :class="{ 'selected': selectedOption === option }"
              @click="selectedOption = option"
            >
              {{ option }}
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-outline" @click="closeEditModal">取消</button>
          <button class="btn btn-primary" @click="confirmEdit">确定</button>
        </div>
      </div>
    </div>

    <!-- 底部占位 -->
    <div class="bottom-spacer"></div>

    <!-- 底部导航 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { generateChart, analyzeChart as analyzeChartData, STEMS, GATES, STARS, SPIRITS, PALACES } from '@/utils/chart'
import ChartPlate from '@/components/ChartPlate.vue'
import BottomNav from '@/components/BottomNav.vue'
import toast from '@/utils/toast'

const router = useRouter()
const userStore = useUserStore()

// 四盘标签
const plateTabs = [
  { value: 'earth', label: '地盘' },
  { value: 'heaven', label: '天盘' },
  { value: 'human', label: '人盘' },
  { value: 'spirit', label: '神盘' }
]

// 当前编辑的四盘
const currentPlate = ref('earth')

// 手动排盘数据
const manualData = reactive({
  earthPlate: {},
  heavenPlate: {},
  humanPlate: {},
  spiritPlate: {}
})

// 分析结果
const analysis = ref(null)

// 编辑弹窗
const showEditModal = ref(false)
const editingPalace = ref(null)
const selectedOption = ref('')

// 初始化排盘数据
const initChartData = () => {
  const now = new Date()
  const chart = generateChart(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    Math.floor(now.getHours() / 2)
  )
  
  manualData.earthPlate = { ...chart.earthPlate }
  manualData.heavenPlate = { ...chart.heavenPlate }
  manualData.humanPlate = { ...chart.humanPlate }
  manualData.spiritPlate = { ...chart.spiritPlate }
}

// 获取四盘名称
const getPlateName = (plate) => {
  const tab = plateTabs.find(t => t.value === plate)
  return tab ? tab.label : ''
}

// 获取编辑选项
const getEditOptions = () => {
  switch (currentPlate.value) {
    case 'earth':
      return STEMS
    case 'heaven':
      return STARS
    case 'human':
      return GATES
    case 'spirit':
      return SPIRITS
    default:
      return []
  }
}

// 打开编辑弹窗
const openEditModal = (palaceId) => {
  editingPalace.value = PALACES.find(p => p.id === palaceId)
  
  // 获取当前值
  let currentValue = ''
  switch (currentPlate.value) {
    case 'earth':
      currentValue = manualData.earthPlate[palaceId]?.stem || ''
      break
    case 'heaven':
      currentValue = manualData.heavenPlate[palaceId]?.star || ''
      break
    case 'human':
      currentValue = manualData.humanPlate[palaceId]?.gate || ''
      break
    case 'spirit':
      currentValue = manualData.spiritPlate[palaceId]?.spirit || ''
      break
  }
  
  selectedOption.value = currentValue
  showEditModal.value = true
}

// 关闭编辑弹窗
const closeEditModal = () => {
  showEditModal.value = false
  editingPalace.value = null
  selectedOption.value = ''
}

// 确认编辑
const confirmEdit = () => {
  if (!editingPalace.value) return
  
  const palaceId = editingPalace.value.id
  
  switch (currentPlate.value) {
    case 'earth':
      manualData.earthPlate[palaceId].stem = selectedOption.value
      break
    case 'heaven':
      manualData.heavenPlate[palaceId].star = selectedOption.value
      break
    case 'human':
      manualData.humanPlate[palaceId].gate = selectedOption.value
      break
    case 'spirit':
      manualData.spiritPlate[palaceId].spirit = selectedOption.value
      break
  }
  
  closeEditModal()
  toast.success('修改成功！')
}

// 重置排盘
const resetChart = () => {
  initChartData()
  analysis.value = null
  toast.success('排盘已重置！')
}

// 分析格局
const analyzeChart = () => {
  const chartData = {
    earthPlate: manualData.earthPlate,
    heavenPlate: manualData.heavenPlate,
    humanPlate: manualData.humanPlate,
    spiritPlate: manualData.spiritPlate
  }
  
  analysis.value = analyzeChartData(chartData)
  toast.success('格局分析完成！')
}

// 保存排盘
const saveChart = () => {
  userStore.addChartHistory({
    chartType: 'MANUAL',
    xunShou: '手动',
    chartData: {
      earthPlate: manualData.earthPlate,
      heavenPlate: manualData.heavenPlate,
      humanPlate: manualData.humanPlate,
      spiritPlate: manualData.spiritPlate
    }
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
      
      // 检查数据是否过期（1小时）
      const EXPIRE_TIME = 60 * 60 * 1000 // 1小时
      const now = new Date().getTime()
      const chartTime = chart.timestamp ? new Date(chart.timestamp).getTime() : 0
      
      if (now - chartTime > EXPIRE_TIME) {
        console.warn('Viewing chart data has expired')
        sessionStorage.removeItem('viewingChart')
        initChartData()
        return
      }
      
      if (chart.chartType === 'MANUAL' && chart.chartData) {
        // 使用保存的排盘数据
        manualData.earthPlate = { ...chart.chartData.earthPlate }
        manualData.heavenPlate = { ...chart.chartData.heavenPlate }
        manualData.humanPlate = { ...chart.chartData.humanPlate }
        manualData.spiritPlate = { ...chart.chartData.spiritPlate }
        
        // 分析格局
        analysis.value = analyzeChartData({
          earthPlate: manualData.earthPlate,
          heavenPlate: manualData.heavenPlate,
          humanPlate: manualData.humanPlate,
          spiritPlate: manualData.spiritPlate
        })
      } else {
        initChartData()
      }
      
      // 清除临时存储
      sessionStorage.removeItem('viewingChart')
    } catch (error) {
      console.error('Failed to parse viewing chart:', error)
      toast.error('加载排盘数据失败，已恢复默认数据')
      sessionStorage.removeItem('viewingChart')
      initChartData()
    }
  } else {
    initChartData()
  }
})

// 组件卸载时清理sessionStorage
onBeforeUnmount(() => {
  try {
    sessionStorage.removeItem('viewingChart')
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error)
  }
})
</script>

<style lang="scss" scoped>
.manual-chart {
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

.manual-guide {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  color: #fff;
  text-align: center;
}

.guide-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: var(--spacing-xs);
}

.guide-desc {
  font-size: 14px;
  opacity: 0.9;
}

.chart-settings {
  background: var(--bg-card);
  margin: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-md);
}

.setting-tabs {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);
}

.tab-button {
  flex: 1;
  min-width: 60px;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
  
  &:active {
    transform: scale(0.95);
  }
  
  &.active {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: #fff;
    border-color: transparent;
  }
}

.setting-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.reset-btn,
.analyze-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.reset-btn {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.analyze-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: #fff;
}

.plates-container {
  margin: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

// 九宫标题样式
.plates-container :deep(.plate-title) {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-primary);
}

// 九宫外边距
.plates-container :deep(.chart-plate) {
  margin-bottom: var(--spacing-xl);
}

.chart-analysis {
  background: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin: var(--spacing-md);
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
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin: var(--spacing-md);
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

// 编辑弹窗
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-md);
}

.modal-content {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--text-secondary);
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:active {
    background: var(--bg-tertiary);
  }
}

.modal-body {
  padding: var(--spacing-md);
  overflow-y: auto;
  flex: 1;
}

.palace-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.palace-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.palace-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
}

.edit-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
}

.edit-option {
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  
  &:active {
    transform: scale(0.95);
  }
  
  &.selected {
    border-color: var(--primary-color);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  }
}

.modal-footer {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.modal-footer .btn {
  flex: 1;
  padding: var(--spacing-sm);
  font-size: 14px;
}

.bottom-spacer {
  height: 20px;
}
</style>
