import { DateTime } from 'luxon'
import { defineStore } from 'pinia'
import { screenRecording } from '../../composables/screenRecording'

export const useRecordingStore = defineStore('recording', {
  state: () => {
    let recorder: MediaRecorder | undefined

    return { recorder }
  },
  getters: {
    isRecording(state) {
      return state.recorder !== undefined
    },
  },
  actions: {
    async startRecording() {
      const constraints = {
        video: true,
        audio: true,
      } as DisplayMediaStreamConstraints
      const capture = await navigator.mediaDevices.getDisplayMedia(constraints)

      const { supportedMimeType } = screenRecording()

      const options = {
        mimeType: supportedMimeType.value,
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 1250000,
      } as MediaRecorderOptions
      const mediaRecorder = new MediaRecorder(capture, options)

      const chunks: BlobPart[] | undefined = []

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data)
      }

      const stopRecording = () => {
        this.recorder = undefined
      }

      mediaRecorder.onstop = async function () {
        // const blob = new Blob(chunks, { type: options.mimeType })
        // const startDateTime: DateTime = context.getters['recordingStartTime']
        // const finishDateTime = DateTime.now()
        // const thumbnailBlob: Blob = context.getters['thumbnailBlob']
        // const recording = {
        //   blob,
        //   thumbnailBlob,
        //   startDateTime: startDateTime.toJSDate(),
        //   finishDateTime: finishDateTime.toJSDate(),
        // } as Recording
        // await db.recordings.add(recording)
        stopRecording()
      }

      mediaRecorder.start()
      this.recorder = mediaRecorder
    },
    stopRecording() {
      this.recorder?.stop
      this.recorder = undefined
    },
  },
})
