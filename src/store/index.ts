import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { CaptureSettings } from '../models/CaptureSettings'
import { screenRecording } from '../composables/screenRecording'

function getCaptureSettings() {
  const settingsJson = localStorage.getItem('captureSettings')

  const bitsSettings = settingsJson
    ? JSON.parse(settingsJson)
    : { audioBitsPerSecond: 128000, videoBitsPerSecond: 1250000 }

  const { supportedMimeType } = screenRecording()

  return {
    mimeType: supportedMimeType.value(),
    captureAudio: true,
    captureVideo: true,
    audioBitsPerSecond: bitsSettings.audioBitsPerSecond,
    videoBitsPerSecond: bitsSettings.videoBitsPerSecond,
  } as CaptureSettings
}

export default createStore({
  state() {
    return {
      recorder: null,
      mediaStream: null,
      recordingStartTime: null,
      recordings: [],
      isLoadingRecordings: false,
      thumbnailBlob: null,
      captureSettings: getCaptureSettings(),
      currentModalComponentName: null,
    }
  },
  mutations,
  actions,
  getters,
})
