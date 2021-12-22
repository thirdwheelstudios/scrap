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

    const originalDescription = computed(
      () => props.recording.description ?? `Scrap #${props.recording.id}`
    )

    const description = ref(originalDescription.value)

    const isInEditMode = ref(false)
    const descriptionEle = ref(null)

    return {
      onDownloadClick: () => {
        store.dispatch('downloadRecording', props.recording.id)
      },
      onEditClick: () => {
        isInEditMode.value = true
        if (descriptionEle.value) {
          const element: HTMLInputElement = descriptionEle.value
          element.select()
          element.focus()
        }
      },
      onProcessEditClick: (save: boolean) => {
        if (save) {
          const payload = {
            id: props.recording.id,
            description: description.value,
          } as Recording
          store.dispatch('updateDescription', payload)
        } else {
          description.value = originalDescription.value
        }

        if (descriptionEle.value) {
          const element: HTMLInputElement = descriptionEle.value
          element.focus()
          element.setSelectionRange(0, 0)
        }
        isInEditMode.value = false
      },
      onDeleteClick: () => {
        store.dispatch('deleteRecording', props.recording.id)
      },
      duration,
      recordingDate,
      description,
      imageSrc,
      isInEditMode,
      descriptionEle,
    }
  },
  components: { RecordingItemActionButton },
}
</script>

<template>
  <div class="recording-item">
    <div class="thumbnail">
      <img :src="imageSrc" :alt="`Screen recording from ${recordingDate}`" />
      <small>{{ duration }}</small>
    </div>
    <div class="content">
      <span
        ><input
          ref="descriptionEle"
          type="text"
          v-model="description"
          :readonly="!isInEditMode"
      /></span>
      <span><font-awesome-icon icon="calendar" /> {{ recordingDate }}</span>
      <ul>
        <li v-if="isInEditMode">
          <RecordingItemActionButton
            icon="check"
            @click="onProcessEditClick(true)"
            title="Save changes"
            >Save</RecordingItemActionButton
          >
        </li>
        <li v-if="isInEditMode">
          <RecordingItemActionButton
            icon="times"
            @click="onProcessEditClick(false)"
            title="Cancel changes"
            >Cancel</RecordingItemActionButton
          >
        </li>
        <li v-if="!isInEditMode">
          <RecordingItemActionButton
            icon="pencil-alt"
            @click="onEditClick"
            title="Edit this recording"
            >Edit</RecordingItemActionButton
          >
        </li>
        <li v-if="!isInEditMode">
          <RecordingItemActionButton
            icon="file-download"
            @click="onDownloadClick"
            title="Download this recording"
            >Download</RecordingItemActionButton
          >
        </li>
        <li v-if="!isInEditMode">
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

  .thumbnail {
    position: relative;

    small {
      position: absolute;
      border-radius: 0.5rem;
      background-color: #2c3e50;
      color: $background;
      bottom: 0;
      left: 0;
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
      padding: 0.125rem 0.25rem;
    }

    img {
      width: 10rem;
      border-radius: 0.1rem;
    }
  }

  .content {
    text-align: left;
    margin-left: 0.5rem;

    span {
      display: block;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
    }

    span:first-of-type {
      margin: 0;
      height: 2.5rem;
    }

    ul {
      list-style: none;
      padding-left: 0;
      display: inline-flex;
      margin-top: 0.5rem;
      margin-left: 0.5rem;

      li {
        margin-right: 0.5rem;
      }
    }

    input {
      border: 0.1rem solid #d1d1d1;
      border-radius: 0.25rem;
      font-size: 1.5em;
      padding: 0.25rem;
    }

    input[readonly] {
      border: 0;
    }

    input[readonly]:focus {
      outline: none;
    }
  }
}
</style>
