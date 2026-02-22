<template>
  <div class="select" :class="{ 'select-open': isOpen, 'select-disabled': disabled }" ref="selectRef">
    <div
      class="select-trigger"
      @click="handleTriggerClick"
      :class="{ 'select-trigger-placeholder': !selectedLabel }"
    >
      <span class="select-value">{{ selectedLabel || placeholder }}</span>
      <div class="select-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <Transition name="select-dropdown">
      <div class="select-dropdown" v-show="isOpen" ref="dropdownRef">
        <div class="select-search" v-if="searchable">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            class="select-search-input"
            :placeholder="searchPlaceholder"
            @click.stop
          />
        </div>
        <div class="select-options">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            class="select-option"
            :class="{
              'select-option-selected': isSelected(option),
              'select-option-disabled': option.disabled
            }"
            @click="handleOptionClick(option)"
          >
            <slot name="option" :option="option">
              <span class="select-option-label">{{ option.label }}</span>
            </slot>
            <div class="select-option-check" v-if="isSelected(option)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div class="select-empty" v-if="filteredOptions.length === 0">
            {{ emptyText }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  searchable: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String,
    default: '搜索...'
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'clear'])

const selectRef = ref(null)
const dropdownRef = ref(null)
const searchInputRef = ref(null)
const isOpen = ref(false)
const searchQuery = ref('')
let isListenerAdded = false

const selectedLabel = computed(() => {
  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0) return ''
    return props.options
      .filter(opt => props.modelValue.includes(opt.value))
      .map(opt => opt.label)
      .join(', ')
  } else {
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option ? option.label : ''
  }
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => {
    return option.label.toLowerCase().includes(query)
  })
})

const isSelected = (option) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(option.value)
  } else {
    return props.modelValue === option.value
  }
}

const handleTriggerClick = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.searchable) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
}

const handleOptionClick = (option) => {
  if (option.disabled) return
  
  if (Array.isArray(props.modelValue)) {
    const index = props.modelValue.indexOf(option.value)
    if (index > -1) {
      const newValue = [...props.modelValue]
      newValue.splice(index, 1)
      emit('update:modelValue', newValue)
    } else {
      emit('update:modelValue', [...props.modelValue, option.value])
    }
  } else {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
  
  emit('change', option)
  searchQuery.value = ''
}

const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  if (!isListenerAdded) {
    document.addEventListener('click', handleClickOutside)
    isListenerAdded = true
  }
})

onBeforeUnmount(() => {
  if (isListenerAdded) {
    document.removeEventListener('click', handleClickOutside)
    isListenerAdded = false
  }
})

watch(() => props.modelValue, () => {
  searchQuery.value = ''
})
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-family);
  font-size: var(--font-md);
  color: var(--text-primary);
  
  &:hover {
    border-color: var(--primary-color);
  }
  
  &.select-trigger-placeholder {
    color: var(--text-tertiary);
  }
}

.select-open .select-trigger {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.select-disabled .select-trigger {
  background: var(--bg-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}

.select-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-arrow {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  transition: transform var(--transition-base);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.select-open .select-arrow {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.select-search {
  padding: var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
}

.select-search-input {
  width: 100%;
  padding: var(--spacing-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--font-sm);
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--transition-fast);
  
  &:focus {
    border-color: var(--primary-color);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
}

.select-options {
  max-height: 260px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
    
    &:hover {
      background: var(--primary-color);
    }
  }
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-family);
  font-size: var(--font-sm);
  color: var(--text-primary);
  
  &:hover {
    background: var(--bg-tertiary);
  }
  
  &.select-option-selected {
    background: var(--bg-tertiary);
    color: var(--primary-color);
    font-weight: 500;
  }
  
  &.select-option-disabled {
    cursor: not-allowed;
    opacity: 0.5;
    
    &:hover {
      background: transparent;
    }
  }
}

.select-option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-option-check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: var(--primary-color);
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.select-empty {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--font-sm);
}

.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: all var(--transition-base);
}

.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
