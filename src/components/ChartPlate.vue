<template>
  <div class="chart-plate">
    <div class="plate-header">
      <h3 class="plate-title">{{ title }}</h3>
      <span class="plate-subtitle">{{ subtitle }}</span>
    </div>
    
    <div class="plate-grid">
      <div
        v-for="palace in palaces"
        :key="palace.id"
        class="palace-cell"
        :class="[
          `palace-${palace.id}`,
          { 'center-palace': palace.id === 5 },
          { 'editable': editable }
        ]"
        @click="editable && palace.id !== 5 && emit('edit', palace.id)"
      >
        <div class="palace-number">{{ palace.id }}</div>
        <div class="palace-name">{{ palace.name }}</div>
        <div class="palace-content">
          <div v-if="getItem(palace.id)" class="content-item animate-scale-in">
            <span class="item-label">{{ label }}：</span>
            <span class="item-value">{{ getItem(palace.id) }}</span>
          </div>
          <div v-if="editable && palace.id !== 5" class="edit-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PALACES } from '@/utils/chart'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit'])

// 获取宫位列表
const palaces = computed(() => {
  return PALACES
})

// 获取宫位内容
const getItem = (palaceId) => {
  const item = props.data[palaceId]
  if (!item) return ''
  
  switch (props.type) {
    case 'earth':
      return item.stem
    case 'heaven':
      return item.star
    case 'human':
      return item.gate
    case 'spirit':
      return item.spirit
    default:
      return ''
  }
}
</script>

<style lang="scss" scoped>
.chart-plate {
  margin-bottom: var(--spacing-xl);
}

.plate-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--border-color);
}

.plate-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.plate-subtitle {
  font-size: 14px;
  color: var(--text-tertiary);
}

.plate-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  background: var(--bg-card);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
}

.palace-cell {
  min-height: 100px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(139, 69, 19, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  
  &.center-palace {
    background: linear-gradient(135deg, var(--gold-color), var(--gold-dark));
    color: #fff;
    
    .palace-number,
    .palace-name {
      color: #fff;
    }
  }
  
  &:not(.center-palace):hover {
    background: var(--bg-tertiary);
    transform: scale(1.02);
    transition: all var(--transition-base);
  }
  
  &.editable:not(.center-palace) {
    cursor: pointer;
  }
}

.palace-number {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 2px;
  line-height: 1;
}

.palace-name {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.2;
}

.palace-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
}

.content-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-sm);
  width: 100%;
  min-height: 40px;
  justify-content: center;
}

.item-label {
  font-size: 9px;
  color: var(--text-tertiary);
  line-height: 1.2;
  white-space: nowrap;
}

.item-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
  word-break: break-word;
  overflow-wrap: break-word;
}

.edit-hint {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.2);
  border-radius: var(--radius-full);
  color: var(--primary-color);
  opacity: 0;
  transition: opacity var(--transition-base);
  
  svg {
    width: 12px;
    height: 12px;
  }
}

.palace-cell:hover .edit-hint {
  opacity: 1;
}
</style>
