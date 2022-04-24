<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Recording } from '../models'
import { useRecordingsListStore } from '../store'

const recordingsList = useRecordingsListStore()

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
    <li v-for="recording of recordings" :key="recording.id">
      Recording {{ recording.id }}
    </li>
  </ul>
</template>
