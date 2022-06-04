<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Recording } from '../models'
import { useRecordingsListStore } from '../store'
import RecordingCard from './RecordingCard.vue'
import GroupContainer from './GroupContainer.vue'

const recordingsList = useRecordingsListStore()

const isLoading = computed(() => recordingsList.isLoading)
const hasRecordings = computed(() => recordingsList.recordings?.length > 0)
const recordings = computed(() => {
  const result = recordingsList.recordings ?? ([] as Recording[])

  return result.sort((a, b) => (a.startDateTime > b.startDateTime ? -1 : 1))
})

onMounted(async () => {
  await recordingsList.load(1000)
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
    <div class="status-container">
      <font-awesome-icon :icon="['fas', 'circle-notch']" spin size="3x" />
      <p>{{ isLoading ? 'Loading your scrapbook, please wait...' : 'Your screen recording scrapbook will appear here' }}</p>
    </div>
  </GroupContainer>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-wrap: wrap;
}

.status-container {
  display: block;
  text-align: center;
  margin: 1rem auto;
}
</style>