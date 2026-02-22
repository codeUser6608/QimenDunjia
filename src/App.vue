<template>
  <div id="app" :class="['theme-' + theme]">
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme)

onMounted(() => {
  // 初始化设置
  settingsStore.loadSettings()
})
</script>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
