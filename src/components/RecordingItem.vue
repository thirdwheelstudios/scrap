<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../models'
import { downloadFile } from '../utils/download'
import ThumbnailPreview from './ThumbnailPreview.vue'
import GradientContainer from './GradientContainer.vue'
import GradientIconButton from './GradientIconButton.vue'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()

const description = computed(
  () => props.recording?.description ?? `Recording ${props.recording.id}`
)

const onDownload = () => {
  const name = props.recording.description ?? `Scrap #${props.recording.id}`

  downloadFile(props.recording.blob, name)
}
</script>

<template>
  <div>
    <ThumbnailPreview
      :thumbnail-blob="recording.thumbnailBlob"
      :alt-text="`Screen recording from ${recording.startDateTime}`"
    />
    <div class="details">
      <p>{{ description }}</p>
      <GradientContainer>
        <GradientIconButton
          :icon="['fas', 'file-download']"
          title="Download"
          @click="onDownload"
        />
      </GradientContainer>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;

  .details {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
  }
}
</style>
