<script setup lang="ts">
import { watch, computed, onBeforeMount } from 'vue'
import { useSettingsStore } from './store'
import { setTheme } from './utils/theme'

const settings = useSettingsStore()

const appTheme = computed(() => settings.theme)

watch(
  () => appTheme.value,
  (theme) => {
    setTheme(theme)
  }
)

onBeforeMount(() => setTheme(appTheme.value))
</script>

<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2rem;
}
</style>
