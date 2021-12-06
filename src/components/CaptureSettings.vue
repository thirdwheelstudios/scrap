<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { CaptureSettings } from '../models/CaptureSettings'

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: any) {
    const store = useStore()

    const settings = computed<CaptureSettings>(
      () => store.getters['captureSettings']
    )

    const videoBitsPerSecond = ref(settings.value.videoBitsPerSecond)
    const audioBitsPerSecond = ref(settings.value.audioBitsPerSecond)

    const videoBitRateDescription = computed(() => {
      const bitRate = videoBitsPerSecond.value

      if (bitRate >= 5000000) return 'Highest'
      if (bitRate >= 2500000) return 'High'
      if (bitRate >= 1250000) return 'Medium'
      if (bitRate >= 625000) return 'Low'

      return 'Lowest'
    })

    const videoBitRateInKiloBytes = computed(
      () => `${Math.round(videoBitsPerSecond.value / 1000)}Kbps`
    )

    const audioBitRateDescription = computed(() => {
      const bitRate = audioBitsPerSecond.value

      if (bitRate >= 320000) return 'Highest'
      if (bitRate >= 192000) return 'High'
      if (bitRate >= 128000) return 'Medium'
      if (bitRate >= 96000) return 'Low'

      return 'Lowest'
    })

    const audioBitRateInKiloBytes = computed(
      () => `${Math.round(audioBitsPerSecond.value / 1000)}Kbps`
    )

    return {
      onSaveClick: () => {
        const newSettings = {
          ...settings.value,
          videoBitsPerSecond: videoBitsPerSecond.value,
          audioBitsPerSecond: audioBitsPerSecond.value,
        } as CaptureSettings

        store.dispatch('updateCaptureSettings', newSettings)
        store.dispatch('setModalComponent', null)
      },
      videoBitsPerSecond,
      audioBitsPerSecond,
      videoBitRateDescription,
      videoBitRateInKiloBytes,
      audioBitRateDescription,
      audioBitRateInKiloBytes,
    }
  },
}
</script>

<template>
  <div>
    <h2>Video Capture Settings</h2>
    <label for="videoBitsPerSecond"
      >Video Quality -
      <small :title="videoBitRateInKiloBytes">{{
        videoBitRateDescription
      }}</small></label
    >
    <input
      type="range"
      v-model="videoBitsPerSecond"
      name="videoBitsPerSecond"
      min="500000"
      max="5000000"
    />
    <label for="audioBitsPerSecond"
      >Audio Quality -
      <small :title="audioBitRateInKiloBytes">{{
        audioBitRateDescription
      }}</small></label
    >
    <input
      type="range"
      v-model="audioBitsPerSecond"
      name="audioBitsPerSecond"
      min="64000"
      max="320000"
    />
    <button @click="onSaveClick"><font-awesome-icon icon="save" /> Save</button>
  </div>
</template>

<style scoped lang="scss">
div {
  display: inline-flex;
  flex-direction: column;

  label {
    text-align: left;
  }

  button {
    margin: 1.5rem 0;
    background-color: #f52891;
    color: #fee7f3;
    padding: 0.5rem;
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem #f86db5;
    cursor: pointer;
    transition: all ease-in 0.4s;
  }

  button:hover {
    background-color: #f755a8;
    color: #fff;
    transform: scale(1.005);
  }

  button[disabled] {
    background-color: #4d1933;
    color: #df9fbf;
    box-shadow: 0 0 0.5rem #cc6699;
    cursor: not-allowed;
  }
}
</style>
