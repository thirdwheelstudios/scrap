<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../../models'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()

const videoSource = computed(() => URL.createObjectURL(props.recording.blob))
</script>

<template>
  <div><video :src="videoSource" controls autoplay></video></div>
</template>

<style scoped lang="scss">
div {
  max-height: 90vh;
  
  video {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    max-height: 90vh;
  }
}
</style>