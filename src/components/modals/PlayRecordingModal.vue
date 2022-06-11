<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import { Recording } from '../../models'

interface Props {
  recording: Recording
}

defineEmits(['cancel'])
const props = defineProps<Props>()

const videoSource = computed(() => URL.createObjectURL(props.recording.blob))

onUnmounted(() => URL.revokeObjectURL(videoSource.value))
</script>

<template>
  <div class="video-preview-container">
    <video :src="videoSource" controls autoplay />
    <button title="Close" @click="$emit('cancel')"><font-awesome-icon :icon="['fas','xmark']" size="2x" /></button>
  </div>
</template>

<style scoped lang="scss">
.video-preview-container {
  max-height: 90vh;
  position: relative;
  
  video {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    max-height: 90vh;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
    opacity: 0.5;
    transition: opacity 0.2s ease-in;
  }

  button:hover {
    opacity: 1;
  }
}
</style>