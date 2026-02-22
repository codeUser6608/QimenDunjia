import { createApp, h } from 'vue'
import Toast from '@/components/Toast.vue'

let toastInstance = null
let isClosing = false

const createToast = (options) => {
  // 如果有旧toast正在关闭，等待动画完成
  if (isClosing) {
    // 使用队列机制，等待300ms后再创建新toast
    setTimeout(() => {
      createToast(options)
    }, 300)
    return
  }

  // 移除已存在的 toast
  if (toastInstance) {
    const oldInstance = toastInstance
    toastInstance = null
    isClosing = true
    
    // 先触发关闭动画
    if (oldInstance._props) {
      oldInstance._props.visible = false
    }
    
    // 等待动画完成后再移除
    setTimeout(() => {
      if (oldInstance.$el && oldInstance.$el.parentNode) {
        document.body.removeChild(oldInstance.$el)
      }
      oldInstance.unmount()
      isClosing = false
    }, 300)
  }

  // 创建容器
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 创建 Vue 实例
  toastInstance = createApp({
    render() {
      return h(Toast, {
        ...options,
        onClose: () => {
          if (options.onClose) {
            options.onClose()
          }
          // 延迟移除，等待动画完成
          setTimeout(() => {
            if (container.parentNode) {
              document.body.removeChild(container)
            }
            if (toastInstance) {
              toastInstance.unmount()
              toastInstance = null
            }
          }, 300)
        }
      })
    }
  })

  toastInstance.mount(container)
}

export const toast = {
  success(message, options = {}) {
    createToast({
      type: 'success',
      message,
      ...options
    })
  },

  error(message, options = {}) {
    createToast({
      type: 'error',
      message,
      ...options
    })
  },

  warning(message, options = {}) {
    createToast({
      type: 'warning',
      message,
      ...options
    })
  },

  info(message, options = {}) {
    createToast({
      type: 'info',
      message,
      ...options
    })
  },

  show(message, options = {}) {
    createToast({
      type: 'default',
      message,
      ...options
    })
  },

  confirm(message, options = {}) {
    return new Promise((resolve, reject) => {
      createToast({
        type: options.type || 'warning',
        message,
        showActions: true,
        confirmText: options.confirmText || '确认',
        cancelText: options.cancelText || '取消',
        duration: 0,
        onConfirm: () => {
          resolve(true)
        },
        onCancel: () => {
          resolve(false)
        },
        ...options
      })
    })
  }
}

export default toast
