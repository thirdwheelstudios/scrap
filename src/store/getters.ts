export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isRecording(state: any) {
    return state.recorder !== null
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recorder(state: any): MediaRecorder {
    return state.recorder
  },
}
