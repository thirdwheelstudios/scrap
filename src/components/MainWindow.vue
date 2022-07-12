<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ContentContainer from './ContentContainer.vue'
import MonitorContainer from './MonitorContainer.vue'
import RecordingPreview from './RecordingPreview.vue'
import RecordingCardsList from './RecordingCardsList.vue'
import { useRecordingStore, useSettingsStore } from '../store'
import InfoHeader from './InfoHeader.vue'
import AboutScrap from './AboutScrap.vue'

const router = useRouter()
const recording = useRecordingStore()
const settings = useSettingsStore()

const isRecording = computed(() => recording.isRecording)

const onSettings = () => {
  router.push({ name: 'settings' })
}

const onToggleRecording = async () => {
  if (isRecording.value) {
    recording.stopRecording()
  } else {
    await recording.startRecording(settings.audioBitsPerSecond, settings.videoBitsPerSecond)
  }
}
</script>

<template>
<div class="scrap-container">
  <InfoHeader />
  <MonitorContainer :power-on="isRecording">
    <div class="monitor-screen">
      <RecordingPreview />
      <button
        type="button"
        :title="`${isRecording ? 'Stop' : 'Start'} Recording`"
        :class="{ 'is-recording': isRecording }"
        @click="onToggleRecording"
      ></button>
    </div>
  </MonitorContainer>
  <ContentContainer title="My Scrapbook">
    <template #title-content>
      <button type="button" @click="onSettings">Go to Settings</button>
    </template>
    <RecordingCardsList />
  </ContentContainer>
  <AboutScrap />
</div>
</template>

<style scoped lang="scss">

.scrap-container {
  margin: auto;
  max-width: 960px;
  
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
}
</style>
