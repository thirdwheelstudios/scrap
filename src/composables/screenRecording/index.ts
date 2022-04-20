import { ref } from 'vue'

const mimeTypes = ['video/webm', 'video/mp4']

export function screenRecording() {
  const isSupported = ref(
    navigator && navigator.mediaDevices.getDisplayMedia !== null
  )
  const supportedMimeType = ref(
    mimeTypes
      .filter((mimeType) => MediaRecorder.isTypeSupported(mimeType))
      .pop()
  )

  return {
    isSupported,
    supportedMimeType,
  }
}
