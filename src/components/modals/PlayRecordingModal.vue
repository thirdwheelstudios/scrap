<script setup lang="ts">
import { onUnmounted, ref, onMounted } from 'vue'
import { Recording } from '../../models'
import fixWebmDuration from 'webm-duration-fix'

interface Props {
  recording: Recording
}

defineEmits(['cancel'])
const props = defineProps<Props>()

const blobUrl = ref<string>()

onMounted(async () => {
  const isWebmVideo = props.recording.mimeType === 'video/webm'

  const blob = new Blob(props.recording.chunks, {
    type: props.recording.mimeType,
  })

  const seekableBlob = isWebmVideo ? await fixWebmDuration(blob) : blob

  blobUrl.value = URL.createObjectURL(seekableBlob)
})

onUnmounted(() => {
  if (blobUrl.value) URL.revokeObjectURL(blobUrl.value)
})
</script>

<template>
  <div class="video-preview-container">
    <video :src="blobUrl" controls autoplay />
    <button title="Close" @click="$emit('cancel')">
      <font-awesome-icon :icon="['fas', 'xmark']" size="2x" />
    </button>
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
