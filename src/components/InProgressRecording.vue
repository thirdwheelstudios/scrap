<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  mediaStream: MediaStream,
})

const { mediaStream } = toRefs(props)
</script>

<template>
  <video :src-object.prop.camel="mediaStream" autoplay="true"></video>
</template>

<style scoped lang="scss">
video {
  max-height: 120px;
}
</style>
