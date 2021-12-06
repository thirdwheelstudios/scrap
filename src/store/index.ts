import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { CaptureSettings } from '../models/CaptureSettings'

export default createStore({
  state() {
    return {
      recorder: null,
      mediaStream: null,
      recordingStartTime: null,
      recordings: [],
      thumbnailBlob: null,
      captureSettings: {
        mimeType: 'video/webm',
        captureAudio: true,
        captureVideo: true,
        audioBitsPerSecond: 960000,
        videoBitsPerSecond: 960000,
      } as CaptureSettings,
    }
  },
  mutations,
  actions,
  getters,
})
