<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isRecording = computed(() => store.getters['isRecording'])
    const mediaStream = computed(() => store.getters['mediaStream'])
    const recordings = ref()
    const elapsedTime = '00:01:23'
    return {
      recordings,
      isRecording,
      mediaStream,
      elapsedTime,
    }
  },
  components: {},
}
</script>

<template>
  <div class="container">
    <video :src-object.prop.camel="mediaStream" autoplay="true"></video>
    <div class="timer">
      <small>{{ elapsedTime }}</small>
    </div>
    <div class="info">
      <span>This is a video title</span>
      <ul>
        <li><button>Stop</button></li>
        <li><button>Delete</button></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
}

video {
  max-height: 100px;
  background-color: #646464;
  border: 0.1rem #646464 solid;
  border-radius: 0.5rem;
}

.timer {
  background-color: #888888;
  border-radius: 0.25rem;
  border-top-left-radius: 0.5rem;
  color: #fff;
  position: absolute;
  margin-left: 0.25rem;
  margin-top: 0.25rem;
  padding: 0.25rem;
  padding-top: 0;
}

.info {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: initial;
  margin: 0.5rem;
  margin-left: 1rem;
}

ul {
  display: inline-flex;
  list-style: none;
  padding-left: 0;
  flex-grow: 1;
  place-items: flex-end;
}
</style>
