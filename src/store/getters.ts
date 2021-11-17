export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isRecording(state: any) {
    return state.recorder !== null && state.mediStream !== null
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recorder(state: any): MediaRecorder {
    return state.recorder
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mediaStream(state: any): MediaStream {
    return state.mediaStream
  },
}
