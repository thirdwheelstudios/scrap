<script setup lang="ts">
import RecordButton from './components/RecordButton.vue'
import RecordingList from './components/RecordingList.vue'
import ModalContainer from './components/ModalContainer.vue'
</script>

<template>
  <RecordButton />
  <RecordingList />
  <ModalContainer />
</template>

<style lang="scss">
body {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  background-color: $background;
  color: #2c3e50;
  text-align: center;
}
</style>
