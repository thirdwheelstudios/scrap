<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RecordingItem from './RecordingItem.vue'
import InProgressRecording from './InProgressRecording.vue'

export default {
  setup() {
    const store = useStore()
    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const recordings = ref()
    return {
      recordings,
      isRecording,
      mediaStream,
    }
  },
  components: { InProgressRecording, RecordingItem },
}
</script>

<template>
  <h2>My Scrapbook</h2>
  <ul>
    <li v-if="isRecording">
      <InProgressRecording />
    </li>
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
