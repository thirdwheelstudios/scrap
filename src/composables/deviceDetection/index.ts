import { ref } from 'vue'

export function deviceDetection() {
  const mobileDeviceQuery = window.matchMedia(
    'only screen and ((orientation: portrait and max-width: 600px) or (orientation: landscape and max-height: 600px))'
  )

  const isMobile = ref(mobileDeviceQuery.matches)

  return {
    isMobile,
  }
}
