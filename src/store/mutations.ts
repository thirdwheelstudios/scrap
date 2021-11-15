export default {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentCapture(state: any, capture: MediaStream) {
        state.currentCapture = capture
    }
}