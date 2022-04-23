<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ContentContainer from '../components/ContentContainer.vue'
import MonitorContainer from '../components/MonitorContainer.vue'
import RecordingPreview from '../components/RecordingPreview.vue'
import Group from '../components/Group.vue'
import { useRecordingStore } from '../store'

const router = useRouter()
const recording = useRecordingStore()

const isRecording = computed(() => recording.isRecording)

const onSettings = () => {
  router.push({ name: 'settings' })
}

const onToggleRecording = async () => {
  if (isRecording.value) {
    recording.stopRecording()
  } else {
    await recording.startRecording()
  }
}
</script>

<template>
  <MonitorContainer :power-on="isRecording">
    <div class="monitor-screen">
      <RecordingPreview />
      <button
        type="button"
        @click="onToggleRecording"
        :title="`${isRecording ? 'Stop' : 'Start'} Recording`"
        :class="{ 'is-recording': isRecording }"
      ></button>
    </div>
  </MonitorContainer>
  <ContentContainer title="My Recordings">
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
    z-index: 1;
    transition: all 0.2s ease-in;
  }

  button.is-recording {
    width: 65px;
    height: 65px;
    border-radius: 0.5rem;
  }
}
</style>
