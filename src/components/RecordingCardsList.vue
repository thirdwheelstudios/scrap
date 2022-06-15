<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Recording } from '../models'
import { useRecordingsListStore, useSettingsStore } from '../store'
import RecordingCard from './RecordingCard.vue'
import GroupContainer from './GroupContainer.vue'

const recordingsList = useRecordingsListStore()
const settings = useSettingsStore()

const isLoading = computed(() => recordingsList.isLoading)
const hasRecordings = computed(() => recordingsList.recordings?.length > 0)
const orderByField = computed(() => settings.orderByFieldName)
const orderByDescending = computed(() => settings.orderByDescending)
const recordings = computed(() => {
  const result = recordingsList.recordings ?? ([] as Recording[])
  const field = orderByField.value
  const compareA = orderByDescending.value ? -1 : 1
  const compareB = orderByDescending.value ? 1 : -1

  return result.sort((a, b) => (a[field] > b[field] ? compareA : compareB))
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
  <GroupContainer v-else class="status-container">
    <font-awesome-icon 
      :icon="['fas', isLoading ? 'circle-notch' : 'film']" 
      :spin="isLoading"
      size="3x"
    />
    <p>{{ isLoading ? 'Loading your scrapbook, please wait...' : 'Your screen recording scrapbook will appear here' }}</p>
    <p v-if="!isLoading && !hasRecordings">
      Press the <font-awesome-icon :icon="['fas', 'circle']" class="fill-gradient-linear" /> button to get started with your first screen recording!
    </p>
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
  margin-top: 1.5rem;
  padding: 2rem;

  p {
    margin-bottom: 0;
  }
}
</style>