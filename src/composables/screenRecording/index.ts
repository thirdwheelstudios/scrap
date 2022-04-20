import { ref } from 'vue'

export function screenRecording() {
  const isSupported = ref(
    navigator && navigator.mediaDevices.getDisplayMedia !== null
  )
  const supportedMimeType = ref(() => {
    const mimeTypes = ['video/webm', 'video/mp4']

    return mimeTypes
      .filter((mimeType) => MediaRecorder.isTypeSupported(mimeType))
      .pop()
  })

  return {
    isSupported,
    supportedMimeType,
  }
}
