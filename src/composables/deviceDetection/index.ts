import { ref } from 'vue'

export function deviceDetection() {
  const mobileDeviceQuery = window.matchMedia(
    'only screen and (max-width: 600px)'
  )

  const isMobile = ref(mobileDeviceQuery.matches)

  return {
    isMobile,
  }
}
