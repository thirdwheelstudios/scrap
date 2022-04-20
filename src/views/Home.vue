<script setup lang="ts">
import MonitorContainer from '../components/MonitorContainer.vue'
import BrowserNotSupported from '../components/BrowserNotSupported.vue'
import { screenRecording } from '../composables/screenRecording'

const { isSupported } = screenRecording()
</script>

<template>
  <MonitorContainer v-if="isSupported" :power-on="false">
    <div class="monitor-screen"><button></button></div>
  </MonitorContainer>
  <BrowserNotSupported v-else></BrowserNotSupported>
</template>

<style scoped lang="scss">
.monitor-screen {
  display: flex;
  width: 100%;
  height: 100%;

  button {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin: auto;
  }
}
</style>
