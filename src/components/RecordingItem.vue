<script lang="ts">
import { PropType, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { DateTime } from 'luxon'
import { Recording } from '../models/Recording'
import RecordingItemActionButton from './RecordingItemActionButton.vue'
import { useStore } from 'vuex'

export default {
  props: {
    recording: {
      type: Object as PropType<Recording>,
      required: true,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any) {
    const store = useStore()
    const duration = computed(() => {
      const startDateTime = DateTime.fromJSDate(props.recording.startDateTime)
      const finishDateTime = DateTime.fromJSDate(props.recording.finishDateTime)
      return finishDateTime.diff(startDateTime).toFormat('hh:mm:ss')
    })

    const recordingDate = computed(() => {
      const startDateTime = DateTime.fromJSDate(props.recording.startDateTime)
      return startDateTime.toLocaleString(DateTime.DATETIME_SHORT)
    })

    const imageSrc = computed(() =>
      URL.createObjectURL(props.recording.thumbnailBlob)
    )

    const description = ref(props.recording.description)

    return {
      onDownloadClick: () => {
        store.dispatch('downloadRecording', props.recording.id)
      },
      onDeleteClick: () => {
        store.dispatch('deleteRecording', props.recording.id)
      },
      duration,
      recordingDate,
      description,
      imageSrc,
    }
  },
  components: { RecordingItemActionButton },
}
</script>

<template>
  <div class="recording-item">
    <img :src="imageSrc" :alt="`Sreen recording from ${recordingDate}`" />
    <div class="content">
      <span><input type="text" v-model="description" /></span>
      <span><font-awesome-icon icon="calendar" /> {{ recordingDate }}</span>
      <ul>
        <li>
          <RecordingItemActionButton
            icon="file-download"
            @click="onDownloadClick"
            title="Download this recording"
            >Download</RecordingItemActionButton
          >
        </li>
        <li>
          <RecordingItemActionButton
            icon="trash-alt"
            @click="onDeleteClick"
            title="Delete this recording"
            >Delete</RecordingItemActionButton
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recording-item {
  display: inline-flex;

  img {
    width: 10rem;
    border-radius: 0.1rem;
  }

  .content {
    text-align: left;
    margin-left: 0.5rem;

    * {
      margin-top: 0.25rem;
    }

    span {
      display: block;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 1rem;
      display: inline-flex;

      li {
        margin-right: 0.5rem;
      }
    }

    input {
      border: 0;
      font-size: 1.5em;
    }
  }
}
</style>
