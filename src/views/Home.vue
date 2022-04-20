<script setup lang="ts">
import MonitorContainer from '../components/MonitorContainer.vue'
import { screenRecording } from '../composables/screenRecording'
import BrowserNotSupported from '../components/BrowserNotSupported.vue'

const { isSupported } = screenRecording()
</script>

<template>
  <MonitorContainer v-if="isSupported" :power-on="false"></MonitorContainer>
  <BrowserNotSupported v-else></BrowserNotSupported>
</template>
