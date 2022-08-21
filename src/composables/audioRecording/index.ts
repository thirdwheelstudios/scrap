import { ref } from 'vue'

export function audioRecording() {
  const isSupported = ref(
    navigator && navigator.mediaDevices.getUserMedia !== undefined
  )

  return {
    isSupported,
  }
}
