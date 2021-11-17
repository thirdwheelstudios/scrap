export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRecorder(state: any, recorder: MediaRecorder | null) {
    state.recorder = recorder
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMediaStream(state: any, mediaStream: MediaStream | null) {
    state.mediaStream = mediaStream
  },
}
