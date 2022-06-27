<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const updateApp = async () => {
  await updateServiceWorker()
  needRefresh.value = false
}
</script>

<template>
  <div v-if="needRefresh">
    <button @click="updateApp">Update Scrap</button>
  </div>
</template>