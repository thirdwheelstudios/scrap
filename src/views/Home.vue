<script setup lang="ts">
import { computed } from 'vue'
import BrowserNotSupported from '../components/BrowserNotSupported.vue'
import MainWindow from '../components/MainWindow.vue'
import { deviceDetection } from '../composables/deviceDetection'
import { screenRecording } from '../composables/screenRecording'

const { isSupported } = screenRecording()
const { isMobile } = deviceDetection()

const deviceIsSupported = computed(() => isSupported.value && !isMobile.value)
</script>

<template>
  <MainWindow v-if="deviceIsSupported" />
  <BrowserNotSupported v-else />
</template>

<style scoped lang="scss"></style>
