<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import GroupContainer from './GroupContainer.vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const updateApp = async () => {
  await updateServiceWorker()
  needRefresh.value = false
}
</script>

<template>
  <GroupContainer v-if="needRefresh" class="update-container">
    <p>A new version of Scrap is available!</p>
    <button @click="updateApp">Update Scrap</button>
  </GroupContainer>
</template>

<style scoped lang="scss">
.update-container {
  position: fixed;
  right: 0;
  top: 0;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 0;
  }
}
</style>