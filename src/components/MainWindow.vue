<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import MonitorContainer from '../components/MonitorContainer.vue'
import Group from '../components/Group.vue'
import ContentContainer from '../components/ContentContainer.vue'
import { useRecordingStore } from '../store'

const router = useRouter()
const recording = useRecordingStore()

const isRecording = computed(() => recording.isRecording)

const onSettings = () => {
  router.push({ name: 'settings' })
}

const onStartRecording = async () => {
  await recording.startRecording()
}
</script>

<template>
  <MonitorContainer :power-on="isRecording">
    <div class="monitor-screen">
      <button @click="onStartRecording"></button>
    </div>
  </MonitorContainer>
  <ContentContainer title="My Scraps">
    <template v-slot:title-content>
      <button type="button" @click="onSettings">Go to Settings</button>
    </template>
    <Group></Group>
  </ContentContainer>
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
