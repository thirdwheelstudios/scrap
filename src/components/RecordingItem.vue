<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '../store'
import { Recording } from '../models'
import { downloadFile } from '../utils/download'
import ThumbnailPreview from './ThumbnailPreview.vue'
import GradientContainer from './GradientContainer.vue'
import GradientIconButton from './GradientIconButton.vue'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()
const modal = useModalStore()

const description = computed(
  () => props.recording?.description ?? `Recording ${props.recording.id}`
)

const onDownload = () => {
  const name = props.recording.description ?? `Scrap #${props.recording.id}`

  downloadFile(props.recording.blob, name)
}

const onDelete = async () => {
  modal.open('delete-recording-modal', { id: props.recording.id })
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
        <GradientIconButton
          :icon="['fas', 'trash']"
          title="Delete"
          @click="onDelete"
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
