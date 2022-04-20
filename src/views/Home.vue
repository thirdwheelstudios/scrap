<script setup lang="ts">
import BrowserNotSupported from '../components/BrowserNotSupported.vue'
import { screenRecording } from '../composables/screenRecording'
import MainWindow from '../components/MainWindow.vue'

const { isSupported } = screenRecording()
</script>

<template>
  <MainWindow v-if="isSupported" />
  <BrowserNotSupported v-else />
</template>

<style scoped lang="scss"></style>
