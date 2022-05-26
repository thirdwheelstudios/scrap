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
  downloadFile(props.recording.blob, description.value)
}

const onPlay = () => {
  modal.open('play-recording-modal', { recording: props.recording })
}

const onDelete = async () => {
  modal.open('delete-recording-modal', { recording: props.recording })
}
</script>

<template>
  <div>
    <div class="thumbnail" @click="onPlay">
      <ThumbnailPreview
        :thumbnail-blob="recording.thumbnailBlob"
        :alt-text="`Screen recording from ${recording.startDateTime}`"
      />
      <div class="overlay">
        <font-awesome-icon :icon="['fas', 'play']" size="3x" />
      </div>
    </div>
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

  .thumbnail {
    position: relative;
    cursor: pointer;

    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      transition: opacity 0.2s ease-in;
    }
  }

  .thumbnail:hover {
    .overlay {
      opacity: 1;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
  }
}
</style>
