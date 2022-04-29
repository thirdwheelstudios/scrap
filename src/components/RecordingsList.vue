<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Recording } from '../models'
import { useRecordingsListStore } from '../store'
import RecordingItem from './RecordingItem.vue'

const recordingsList = useRecordingsListStore()

const hasRecordings = computed(() => recordingsList.recordings?.length > 0)
const recordings = computed(() => {
  const result = recordingsList.recordings ?? ([] as Recording[])

  return result.sort((a, b) => (a.startDateTime > b.startDateTime ? -1 : 1))
})

onMounted(async () => {
  recordingsList.load()
})
</script>

<template>
  <ul>
    <li v-if="!hasRecordings">
      <p>Your screen recordings will appear here</p>
    </li>
    <li v-else v-for="recording of recordings" :key="recording.id">
      <RecordingItem :recording="recording"></RecordingItem>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;

  li {
    list-style: none;
    margin: 1rem 0;
  }
}
</style>
