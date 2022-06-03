<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Recording } from '../models'
import { useRecordingsListStore } from '../store'
import RecordingCard from './RecordingCard.vue'
import GroupContainer from './GroupContainer.vue'

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
  <div v-if="hasRecordings">
    <RecordingCard 
      v-for="recording of recordings" 
      :key="recording.id" 
      :recording="recording"
    />
  </div>
  <GroupContainer v-else>
    <p>Your screen recordings will appear here</p>
  </GroupContainer>
</template>

<style scoped lang="scss">
div {
    display: flex;
    flex-wrap: wrap;
}
</style>