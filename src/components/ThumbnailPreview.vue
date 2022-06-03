<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  thumbnailBlob: Blob
  altText?: string
}

const props = defineProps<Props>()

const imageSrc = computed(() =>
  props.thumbnailBlob ? URL.createObjectURL(props.thumbnailBlob) : ''
)
</script>

<template>
  <img v-if="imageSrc" :src="imageSrc" :alt="altText" />
</template>

<style scoped lang="scss">
img {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
}
</style>
