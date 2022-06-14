import { computed, ref } from 'vue'

const mimeTypes = ['video/webm', 'video/mp4']

export function screenRecording() {
  const isSupported = ref(
    navigator && navigator.mediaDevices.getDisplayMedia !== undefined
  )
  const supportedMimeType = ref(
    mimeTypes
      .filter((mimeType) => MediaRecorder.isTypeSupported(mimeType))
      .pop()
  )

  const thumbnailWidth = ref(296)
  const thumbnailHeight = ref(166)
  const thumbnailAspectRatio = computed(() => thumbnailWidth.value / thumbnailHeight.value)

  const resizeCoordsForThumbnail = (sourceHeight: number, sourceWidth: number) => {
    let width = sourceWidth
    let height = sourceHeight
    
    if (width > height) {
      if (width > thumbnailWidth.value) {
        height = height * (thumbnailWidth.value / width)
        width = thumbnailWidth.value
      }
    } else {
      if (height > thumbnailHeight.value) {
        width = width * (thumbnailHeight.value / height)
        height = thumbnailHeight.value
      }
    }

    return { height, width }
  }

  return {
    isSupported,
    supportedMimeType,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailAspectRatio,
    resizeCoordsForThumbnail,
  }
}
