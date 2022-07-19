<script setup lang="ts">
import { computed } from 'vue'
import ContentContainer from '../components/ContentContainer.vue'
import GroupContainer from '../components/GroupContainer.vue'
import MonitorContainer from '../components/MonitorContainer.vue'
import RecordingPreview from '../components/RecordingPreview.vue'
import { useRecordingStore, useSettingsStore } from '../store'

const recording = useRecordingStore()
const settings = useSettingsStore()

const isRecording = computed(() => recording.isRecording)

const onToggleRecording = async () => {
  if (isRecording.value) {
    recording.stopRecording()
  } else {
    await recording.startRecording(
      settings.audioBitsPerSecond,
      settings.videoBitsPerSecond
    )
  }
}
</script>

<template>
  <ContentContainer class="scrap-container">
    <template #title-content>
      <h1>Scrap <small>online screen recording made easy</small></h1>
    </template>
    <GroupContainer>
      <MonitorContainer :power-on="isRecording" class="monitor">
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
      <div class="instruction-text">
        Press the
        <font-awesome-icon
          :icon="['fas', 'circle']"
          class="fill-gradient-linear clickable"
          @click="onToggleRecording"
        />
        button to create a screen recording!
      </div>
    </GroupContainer>
  </ContentContainer>
</template>

<style scoped lang="scss">
.scrap-container {
  max-width: $max-width;

  h1 {
    margin: 0;
  }

  .monitor {
    margin: 3rem auto;
  }

  .instruction-text {
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem;

    .clickable {
      cursor: pointer;
    }
  }
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