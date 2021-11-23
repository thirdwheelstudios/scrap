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
      const recordings: Recording[] = store.getters['recordings']

      return recordings.sort((a, b) =>
        a.startDateTime > b.startDateTime ? -1 : 1
      )
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
  <div class="container">
    <h2>My Scrapbook</h2>
    <ul>
      <li v-if="!recordings.length">
        It's looking quiet here, make a recording to get started!
      </li>
      <li v-else v-for="recording of recordings" :key="recording.id">
        <RecordingItem :recording="recording" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin: 2rem 25%;
  text-align: left;
  box-shadow: 0.1rem 0.1rem 0.5rem #dbe2f0;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  padding-left: 0;

  li {
    padding-top: 0.5rem;
  }
}
</style>
