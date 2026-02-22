<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="toast"
      :class="[`toast-${type}`, { 'toast-with-actions': showActions }]"
    >
      <div class="toast-icon" v-if="type !== 'default'">
        <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <svg v-else-if="type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title" v-if="title">{{ title }}</div>
        <div class="toast-message">{{ message }}</div>
      </div>
      <div class="toast-close" @click="handleClose" v-if="closable">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div class="toast-actions" v-if="showActions">
        <button class="btn btn-ghost btn-sm" @click="handleCancel" v-if="cancelText">
          {{ cancelText }}
        </button>
        <button class="btn btn-primary btn-sm" @click="handleConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  closable: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  onClose: {
    type: Function,
    default: null
  },
  onConfirm: {
    type: Function,
    default: null
  },
  onCancel: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['close', 'confirm', 'cancel'])

const visible = ref(true)
let timer = null
let timerCleared = false

const clearTimer = () => {
  if (timer && !timerCleared) {
    clearTimeout(timer)
    timer = null
    timerCleared = true
  }
}

const handleClose = () => {
  clearTimer()
  visible.value = false
  if (props.onClose) {
    props.onClose()
  }
  emit('close')
}

const handleConfirm = () => {
  if (props.onConfirm) {
    props.onConfirm()
  }
  emit('confirm')
  handleClose()
}

const handleCancel = () => {
  if (props.onCancel) {
    props.onCancel()
  }
  emit('cancel')
  handleClose()
}

onMounted(() => {
  if (props.duration > 0 && !props.showActions) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  max-width: 90vw;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-xl);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  
  &.toast-with-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  &.toast-success {
    border-color: var(--lucky-color);
    
    .toast-icon {
      color: var(--lucky-color);
    }
  }
  
  &.toast-error {
    border-color: var(--unlucky-color);
    
    .toast-icon {
      color: var(--unlucky-color);
    }
  }
  
  &.toast-warning {
    border-color: var(--gold-color);
    
    .toast-icon {
      color: var(--gold-color);
    }
  }
  
  &.toast-info {
    border-color: var(--primary-color);
    
    .toast-icon {
      color: var(--primary-color);
    }
  }
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: var(--font-md);
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.toast-message {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--text-primary);
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.toast-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
  justify-content: flex-end;
}

.toast-enter-active,
.toast-leave-active {
  transition: all var(--transition-base);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
