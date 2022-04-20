<script setup lang="ts">
import { useRouter } from 'vue-router'
import MonitorContainer from '../components/MonitorContainer.vue'

const router = useRouter()

const onSettings = () => {
  router.push({ name: 'settings' })
}
</script>

<template>
  <MonitorContainer :power-on="false">
    <div class="monitor-screen"><button></button></div>
  </MonitorContainer>
  <div><button type="button" @click="onSettings">Settings</button></div>
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
