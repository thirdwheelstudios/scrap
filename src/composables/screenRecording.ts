import { ref } from 'vue'

export function screenRecording() {
  const isSupported = ref(navigator && navigator.mediaDevices.getDisplayMedia !== null)

  return {
    isSupported,
  }
}
