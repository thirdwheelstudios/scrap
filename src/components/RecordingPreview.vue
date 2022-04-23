<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRecordingStore } from '../store'

const recording = useRecordingStore()

const mediaStream = computed(() => recording.mediaStream)

const videoEle = ref<HTMLVideoElement>()
const canvasEle = ref<HTMLCanvasElement>()

watchEffect(() => {
  if (!videoEle.value || !canvasEle.value) return

  const canvas = canvasEle.value
  const video = videoEle.value

  setTimeout(() => {
    canvas.width = video.clientWidth
    canvas.height = video.clientHeight
    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => recording.setThumbnail(blob!))
  }, 500)
})
</script>

<template>
  <div v-if="mediaStream">
    <video
      ref="videoEle"
      :src-object.prop.camel="mediaStream"
      autoplay="true"
    ></video>
    <canvas ref="canvasEle"></canvas>
  </div>
</template>

<style scoped lang="scss">
div {
  width: calc(100% - 1.2rem);
  height: calc(100% - 3rem);
  position: absolute;

  video {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }

  canvas {
    display: none;
  }
}
</style>
