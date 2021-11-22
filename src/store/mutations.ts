import { DateTime } from 'luxon'

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRecorder(state: any, recorder: MediaRecorder | null) {
    state.recorder = recorder
    state.recordingStartTime = recorder ? DateTime.now() : null
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMediaStream(state: any, mediaStream: MediaStream | null) {
    state.mediaStream = mediaStream
  },
}
