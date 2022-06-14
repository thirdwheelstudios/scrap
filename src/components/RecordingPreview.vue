<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { screenRecording } from '../composables/screenRecording'
import { useRecordingStore } from '../store'

const recording = useRecordingStore()
const { 
  resizeCoordsForThumbnail, 
  thumbnailHeight, 
  thumbnailWidth,
} = screenRecording()

const mediaStream = computed(() => recording.mediaStream)

const videoEle = ref<HTMLVideoElement>()
const canvasEle = ref<HTMLCanvasElement>()

watchEffect(() => {
  if (!videoEle.value || !canvasEle.value) return

  const canvas = canvasEle.value
  const video = videoEle.value

  setTimeout(() => {
    canvas.width = thumbnailWidth.value
    canvas.height = thumbnailHeight.value
    const context = canvas.getContext('2d')
    if (!context) return

    context.globalAlpha = 0.1
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    const { height, width } = resizeCoordsForThumbnail(video.videoHeight, video.videoWidth)

    const xOffset = (thumbnailWidth.value - width) / 2
    const yOffset = (thumbnailHeight.value - height) / 2

    context.globalAlpha = 1
    context.drawImage(video, xOffset, yOffset, canvas.width - (xOffset * 2), canvas.height - (yOffset * 2))

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
    object-fit: contain;
    background-color: #2b2b2b;
  }

  canvas {
    display: none;
  }
}
</style>
