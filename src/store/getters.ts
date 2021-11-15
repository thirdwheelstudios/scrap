export default {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isCapturing(state: any) {
        return state.currentCapture !== null
    }
}