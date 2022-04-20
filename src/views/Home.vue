<script setup lang="ts">
import MonitorContainer from '../components/MonitorContainer.vue'
import BrowserNotSupported from '../components/BrowserNotSupported.vue'
import { screenRecording } from '../composables/screenRecording'

const { isSupported } = screenRecording()
</script>

<template>
  <MonitorContainer v-if="isSupported" :power-on="false"></MonitorContainer>
  <BrowserNotSupported v-else></BrowserNotSupported>
</template>
