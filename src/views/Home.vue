<script setup lang="ts">
import BrowserNotSupported from '../components/BrowserNotSupported.vue'
import MainWindow from '../components/MainWindow.vue'
import { screenRecording } from '../composables/screenRecording'

const { isSupported } = screenRecording()
</script>

<template>
  <MainWindow v-if="isSupported" />
  <BrowserNotSupported v-else />
</template>

<style scoped lang="scss"></style>
