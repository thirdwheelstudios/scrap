export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRecorder(state: any, recorder: MediaRecorder | null) {
    state.recorder = recorder
  }
}
