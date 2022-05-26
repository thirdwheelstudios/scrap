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
  max-width: 80vw;

  video {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
}
</style>