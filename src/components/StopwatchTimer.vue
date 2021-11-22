<script lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { DateTime } from 'luxon'

export default {
  props: {
    date: { type: DateTime, default: null },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any) {
    const store = useStore()

    const isRecording = computed(() => store.getters['isRecording'])
    const elapsed = ref('00:00:00')
    const intervalHandle = setInterval(() => {
      let newElapsed = '00:00:00'

      if (props.date) {
        const startDateTime: DateTime = props.date
        newElapsed = DateTime.now().diff(startDateTime).toFormat('hh:mm:ss')
      }

      elapsed.value = newElapsed
    }, 1000)

    onBeforeUnmount(() => clearInterval(intervalHandle))

    return {
      isRecording,
      elapsed,
      intervalHandle,
    }
  },
}
</script>

<template>
  <div>
    <font-awesome-icon icon="stopwatch" />
    <span>{{ elapsed }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  color: #606060;
  display: inline-block;

  span {
    margin-left: 0.2rem;
    font-family: 'Inter', sans-serif;
  }
}
</style>
