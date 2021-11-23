<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import RecordingItem from './RecordingItem.vue'

export default {
  setup() {
    const store = useStore()
    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const recordings = computed(() => store.getters['recordings'])

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
      <RecordingItem />
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
}
</style>
