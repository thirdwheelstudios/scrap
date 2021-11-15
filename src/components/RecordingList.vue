<script setup lang="ts">
import { ref } from 'vue'
import RecordingItem from './RecordingItem.vue'

const recordings = ref()
</script>

<template>
  <div>Recordings go here 😃</div>
  <ul>
    <li v-for="recording of recordings" :key="recording.id">
      <RecordingItem />
    </li>
  </ul>
</template>

<style scoped lang="scss">
div {
  padding: 5rem;
}
</style>
