<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../models'
import { useModalStore } from '../store'
import { downloadFile } from '../utils/download'
import ThumbnailPreview from '../components/ThumbnailPreview.vue'
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
  <div class="card-container">
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
      <GradientContainer class="actions">
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
  .card-container {
    border-radius: 0.5rem;
    border: 1px solid $border-color;
    box-shadow: 3px 3px 5px $border-color;
    background: linear-gradient(
      140deg,
      $bg-primary-gradient-start,
      $bg-primary-gradient-end
    );
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    width: 248px;

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

        p {
            margin: 0.5rem;
        }

        .actions {
            border-radius: 0;
            border-bottom-left-radius: 0.4rem;
            border-bottom-right-radius: 0.4rem;
        }
    }
  }
</style>