export default {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async startCapture(context: any) {
        try {
            const capture = await navigator.mediaDevices.getDisplayMedia()
            context.commit('currentCapture', capture)
        } catch (err) {
            console.error('Unable to start capture', err)
        }
    },
}
