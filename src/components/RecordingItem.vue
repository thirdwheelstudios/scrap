<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../models'
import ThumbnailPreview from './ThumbnailPreview.vue'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()

const description = computed(
  () => props.recording?.description ?? `Recording ${props.recording.id}`
)
</script>

<template>
  <div>
    <ThumbnailPreview
      :thumbnail-blob="recording.thumbnailBlob"
      :alt-text="`Screen recording from ${recording.startDateTime}`"
    />
    <div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;

  div {
    flex-grow: 1;
  }
}
</style>
