export default {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async startCapture(context: any) {
        try {
            const isCapturing: boolean = context.getters['isCapturing']
            if (isCapturing) return

            const capture = await navigator.mediaDevices.getDisplayMedia()
            context.commit('currentCapture', capture)
        } catch (err) {
            console.error('Unable to start capture', err)
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async stopCapture(context: any) {
        const isCapturing: boolean = context.getters['isCapturing']
        if (!isCapturing) return

        const currentCapture: MediaStream = context.getters['currentCapture']
        const tracks = currentCapture.getTracks()

        tracks.forEach(track => track.stop())

        // TODO Save capture

        context.commit('currentCapture', null)
    },
}
