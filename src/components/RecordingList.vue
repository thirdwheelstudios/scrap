<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Recording } from '../models/Recording'
import RecordingItem from './RecordingItem.vue'

export default {
  setup() {
    const store = useStore()
    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const recordings = computed(() => {
      const recordings: Recording[] = store.getters['recordings'] ?? []

      return recordings.sort((a, b) => a.startDateTime > b.startDateTime ? -1 : 1)
    })

    store.dispatch('getRecordings')

    return {
      recordings,
      isRecording,
      mediaStream,
    }
  },
  components: { RecordingItem },
}
</script>

<template>
  <h2>My Scrapbook</h2>
  <ul>
    <li v-for="recording of recordings" :key="recording.id">
      <RecordingItem :recording="recording" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding-left: 0;
}
</style>
