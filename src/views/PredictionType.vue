<template>
  <div class="prediction-type">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>返回</span>
    </div>

    <!-- 推演内容 -->
    <main class="prediction-main" v-if="predictionData">
      <!-- 标题区域 -->
      <div class="prediction-header animate-fade-in-down">
        <div class="header-icon" :style="{ background: predictionData.color }">
          <span class="icon-text">{{ predictionData.icon }}</span>
        </div>
        <div class="header-info">
          <h1 class="detail-title">{{ predictionData.title }}</h1>
          <p class="detail-subtitle">{{ predictionData.subtitle }}</p>
        </div>
      </div>

      <!-- 推演结果 -->
      <div class="prediction-result animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="result-rating" :class="predictionData.ratingClass">
          <span class="rating-icon">{{ predictionData.ratingIcon }}</span>
          <span class="rating-text">{{ predictionData.rating }}</span>
        </div>
        <div class="result-summary">
          {{ predictionData.summary }}
        </div>
      </div>

      <!-- 详细分析 -->
      <div class="prediction-analysis animate-fade-in-up" style="animation-delay: 0.2s">
        <h2 class="section-title">详细分析</h2>
        <div class="analysis-content">
          <div class="analysis-item">
            <span class="analysis-label">八门：</span>
            <span class="analysis-value">{{ predictionData.gateAnalysis }}</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">九星：</span>
            <span class="analysis-value">{{ predictionData.starAnalysis }}</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">八神：</span>
            <span class="analysis-value">{{ predictionData.spiritAnalysis }}</span>
          </div>
        </div>
      </div>

      <!-- 宜忌事项 -->
      <div class="prediction-advice animate-fade-in-up" style="animation-delay: 0.3s">
        <h2 class="section-title">宜忌事项</h2>
        <div class="advice-grid">
          <div class="advice-card lucky">
            <div class="advice-header">
              <span class="advice-icon">✓</span>
              <span class="advice-title">宜</span>
            </div>
            <ul class="advice-list">
              <li v-for="(item, index) in predictionData.shouldDo" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="advice-card unlucky">
            <div class="advice-header">
              <span class="advice-icon">✗</span>
              <span class="advice-title">忌</span>
            </div>
            <ul class="advice-list">
              <li v-for="(item, index) in predictionData.shouldNotDo" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 最佳时机 -->
      <div class="prediction-timing animate-fade-in-up" style="animation-delay: 0.4s" v-if="predictionData.timing">
        <h2 class="section-title">最佳时机</h2>
        <div class="timing-list">
          <div
            v-for="(time, index) in predictionData.timing"
            :key="index"
            class="timing-item"
          >
            <span class="timing-icon">⏰</span>
            <span class="timing-text">{{ time }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons animate-fade-in-up" style="animation-delay: 0.5s">
        <button class="btn btn-primary" @click="goToChart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>重新排盘</span>
        </button>
        <button class="btn btn-outline" @click="sharePrediction">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>分享</span>
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
import BottomNav from '@/components/BottomNav.vue'
import toast from '@/utils/toast'

const route = useRoute()
const router = useRouter()

const predictionType = computed(() => route.params.type || 'career')

// 推演数据
const predictionData = computed(() => {
  const data = {
    career: {
      title: '事业推演',
      subtitle: '分析事业发展吉凶',
      icon: '事',
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      rating: '吉',
      ratingClass: 'lucky',
      ratingIcon: '🌟',
      summary: '今日事业运势整体向好，适合开展新项目、寻求合作。开门在乾宫，贵人相助，利于事业发展。',
      gateAnalysis: '开门在乾宫，贵人相助，利于事业发展',
      starAnalysis: '天心星在乾宫，智慧谋略，利于策划',
      spiritAnalysis: '值符在乾宫，吉祥助力，事事顺利',
      shouldDo: ['开展新项目', '寻求合作', '制定计划', '向上汇报'],
      shouldNotDo: ['冲动决策', '盲目投资', '与人争执'],
      timing: ['上午9-11点', '下午3-5点']
    },
    marriage: {
      title: '婚姻推演',
      subtitle: '分析婚姻运势',
      icon: '婚',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      rating: '中平',
      ratingClass: 'neutral',
      ratingIcon: '⚖️',
      summary: '今日婚姻运势平稳，适合与伴侣沟通，增进感情。六合在巽宫，利于感情发展。',
      gateAnalysis: '休门在坎宫，平和安详，利于沟通',
      starAnalysis: '天任星在坤宫，贵人助力，感情和睦',
      spiritAnalysis: '六合在巽宫，和合美满，利于婚姻',
      shouldDo: ['与伴侣沟通', '增进感情', '安排约会', '表达爱意'],
      shouldNotDo: ['争吵冷战', '猜忌多疑', '冲动分手'],
      timing: ['晚上7-9点', '深夜11-1点']
    },
    travel: {
      title: '出行推演',
      subtitle: '分析出行吉凶',
      icon: '行',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      rating: '吉',
      ratingClass: 'lucky',
      ratingIcon: '✈️',
      summary: '今日出行运势良好，适合远行、出差。开门在乾宫，一路平安。',
      gateAnalysis: '开门在乾宫，一路平安，出行顺利',
      starAnalysis: '天辅星在巽宫，贵人相助，旅途平安',
      spiritAnalysis: '值符在乾宫，吉祥护佑，平安无事',
      shouldDo: ['远行出差', '旅游观光', '拜访亲友', '商务洽谈'],
      shouldNotDo: ['冒险行动', '前往危险地区', '深夜出行'],
      timing: ['上午7-9点', '下午1-3点']
    },
    investment: {
      title: '投资推演',
      subtitle: '分析投资时机',
      icon: '投',
      color: 'linear-gradient(135deg, #fa709a, #fee140)',
      rating: '中平',
      ratingClass: 'neutral',
      ratingIcon: '💰',
      summary: '今日投资运势一般，建议谨慎行事，不宜大额投资。生门在艮宫，财运平稳。',
      gateAnalysis: '生门在艮宫，财源平稳，不宜大额投资',
      starAnalysis: '天禽星在离宫，收获可期，但需谨慎',
      spiritAnalysis: '九地在艮宫，稳固防守，保守为宜',
      shouldDo: ['小额投资', '稳健理财', '观望市场', '分散风险'],
      shouldNotDo: ['大额投资', '盲目跟风', '高风险操作'],
      timing: ['上午10-12点', '下午2-4点']
    }
  }
  return data[predictionType.value] || data.career
})

// 跳转到排盘
const goToChart = () => {
  router.push('/chart/time')
}

// 分享推演
const sharePrediction = () => {
  toast.info('分享功能开发中...')
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  // 可以在这里加载用户数据或其他初始化操作
})
</script>

<style lang="scss" scoped>
.prediction-type {
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

.prediction-main {
  padding: var(--spacing-md);
}

.prediction-header {
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
  margin-bottom: var(--spacing-xs);
}

.detail-subtitle {
  font-size: 14px;
  color: var(--text-tertiary);
}

.prediction-result {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.result-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: var(--spacing-md);
  
  &.lucky {
    background: #e8f5e9;
    color: #388e3c;
  }
  
  &.neutral {
    background: #fff3e0;
    color: #f57c00;
  }
  
  &.unlucky {
    background: #ffebee;
    color: #d32f2f;
  }
}

.rating-icon {
  font-size: 24px;
}

.result-summary {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.prediction-analysis {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
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

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
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

.prediction-advice {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.advice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.advice-card {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  
  &.lucky {
    background: #e8f5e9;
    border: 1px solid #c8e6c9;
  }
  
  &.unlucky {
    background: #ffebee;
    border: 1px solid #ffcdd2;
  }
}

.advice-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.advice-icon {
  font-size: 18px;
  font-weight: bold;
}

.advice-title {
  font-size: 16px;
  font-weight: 600;
}

.advice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advice-list li {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 4px 0;
  padding-left: 20px;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 8px;
    color: var(--text-tertiary);
  }
}

.prediction-timing {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.timing-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.timing-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.timing-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.timing-text {
  font-size: 14px;
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
