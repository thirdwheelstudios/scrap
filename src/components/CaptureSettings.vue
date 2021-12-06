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

    return {
      onSaveClick: () => {
        console.log('Save Clicked')
      },
      videoBitsPerSecond,
      audioBitsPerSecond,
    }
  },
}
</script>

<template>
  <div>
    <h2>Video Capture Settings</h2>
    <label for="videoBitsPerSecond">Video Quality - <small>Low</small></label>
    <input
      type="range"
      v-model="videoBitsPerSecond"
      name="videoBitsPerSecond"
      min="500000"
      max="5000000"
    />
    <label for="audioBitsPerSecond">Audio Quality - <small>Low</small></label>
    <input
      type="range"
      v-model="audioBitsPerSecond"
      name="audioBitsPerSecond"
      min="96000"
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
