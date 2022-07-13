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
  const descending = orderByDescending.value

  return result.sort((a, b) => {
    if (a[field] instanceof Date || a[field] instanceof Number) {
      if (descending) return +b[field] - +a[field]

      return +a[field] - +b[field]
    }

    const aValue = a[field]?.toString() ?? `Recording ${a.id}`
    const bValue = b[field]?.toString() ?? `Recording ${b.id}`

    if (descending) return bValue.localeCompare(aValue)

    return aValue.localeCompare(bValue)
  })
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
    <p>
      {{
        isLoading
          ? 'Loading your scrapbook, please wait...'
          : 'Your screen recording scrapbook will appear here'
      }}
    </p>
    <p v-if="!isLoading && !hasRecordings">
      Press the
      <font-awesome-icon
        :icon="['fas', 'circle']"
        class="fill-gradient-linear"
      />
      button to get started with your first screen recording!
    </p>
  </GroupContainer>
</template>

<style scoped lang="scss">
div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
