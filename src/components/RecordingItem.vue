<script setup lang="ts">
import { computed } from 'vue'
import { Recording } from '../models'

interface Props {
  recording: Recording
}

const props = defineProps<Props>()

const description = computed(
  () => props.recording?.description ?? `Recording ${props.recording.id}`
)
</script>

<template>
  <div>{{ description }}</div>
</template>

<style scoped lang="scss"></style>
