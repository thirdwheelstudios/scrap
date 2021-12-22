<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Recording } from '../models/Recording'
import RecordingItem from './RecordingItem.vue'
import { screenRecording } from '../composables/screenRecording'
import WaitPulse from './WaitPulse.vue'

export default {
  setup() {
    const store = useStore()
    const { isSupported } = screenRecording()

    const titleText = ref(
      isSupported.value ? 'My Scrapbook' : 'Unsupported Browser'
    )

    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const isLoadingRecordings = computed(
      () => store.getters['isLoadingRecordings']
    )
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
      isSupported,
      titleText,
      isLoadingRecordings,
    }
  },
  components: { RecordingItem, WaitPulse },
}
</script>

<template>
  <div class="container">
    <h2>{{ titleText }}</h2>
    <ul>
      <li v-if="isLoadingRecordings"><WaitPulse /></li>
      <li v-else-if="!isSupported">
        Your browser doesn't appear to support screen recording. Scrap is
        designed to work with Chrome, Edge, Firefox & Safari.
      </li>
      <li v-else-if="!recordings.length">
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
  width: 90%;
  max-width: 60rem;
  margin: 2rem auto;
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

@media screen and (min-width: 768px) {
  .container {
    width: 75%;
  }
}

@media screen and (min-width: 1024px) {
  .container {
    width: 50%;
  }
}
</style>
