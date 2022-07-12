<script setup lang="ts">
import { useRouter } from 'vue-router'
import ContentContainer from '../components/ContentContainer.vue'
import RecordingCardsList from '../components/RecordingCardsList.vue'

const router = useRouter()

const onSettings = () => {
  router.push({ name: 'settings' })
}
</script>

<template>
  <ContentContainer title="My Scrapbook">
    <template #title-content>
      <button type="button" @click="onSettings">Go to Settings</button>
    </template>
    <RecordingCardsList />
  </ContentContainer>
</template>

<style scoped lang="scss"></style>
