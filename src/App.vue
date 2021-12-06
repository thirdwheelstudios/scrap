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

<style>
body {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  background-color: #f5f7fb;
  color: #2c3e50;
  text-align: center;
}
</style>
