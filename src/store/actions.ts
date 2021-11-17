export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async startRecording(context: any) {
    try {
      const isCapturing: boolean = context.getters['isCapturing']
      if (isCapturing) return

      const constraints = {
        video: true,
        audio: false,
      } as DisplayMediaStreamConstraints
      const capture = await navigator.mediaDevices.getDisplayMedia(constraints)

      const options = {
        mimeType: 'video/webm',
      } as MediaRecorderOptions
      const recorder = new MediaRecorder(capture, options)

      const chunks: BlobPart[] | undefined = []

      recorder.ondataavailable = function (e) {
        chunks.push(e.data)
      }

      recorder.onstop = function () {
        const blob = new Blob(chunks, { type: 'video/webm' })

        const reader = new FileReader()
        reader.onload = function () {
          console.log(this.result)
        }

        reader.readAsDataURL(blob)

        context.commit('setRecorder', null)
        context.commit('setMediaStream', null)
        console.log('recording stopped', URL.createObjectURL(blob))
      }

      context.commit('setRecorder', recorder)
      context.commit('setMediaStream', capture)

      recorder.start()
    } catch (err) {
      console.error('Unable to start capture', err)
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async stopRecording(context: any) {
    const isRecording: boolean = context.getters['isRecording']
    if (!isRecording) return

    const recorder: MediaRecorder = context.getters['recorder']

    recorder.stop()
  },
}
