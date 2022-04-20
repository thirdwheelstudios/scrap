import { DateTime } from 'luxon'
import { defineStore } from 'pinia'
import { screenRecording } from '../../composables/screenRecording'
import { Recording } from '../../models'
import { db } from '../../persistence'

export const useRecordingStore = defineStore('recording', {
  state: () => {
    let recorder: MediaRecorder | undefined
    let recorderStartTime: Date | undefined
    let recorderThumbnailBlob: Blob | undefined
    let recorderMediaStream: MediaStream | undefined

    return {
      recorder,
      recorderStartTime,
      recorderThumbnailBlob,
      recorderMediaStream,
    }
  },
  getters: {
    isRecording(state) {
      return state.recorder !== undefined
    },
    startTime(state) {
      return state.recorderStartTime
    },
    thumbnailBlob(state) {
      return state.recorderThumbnailBlob
    },
    mediaStream(state) {
      return state.recorderMediaStream
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
        this.recorderStartTime = undefined
      }

      const startTime = DateTime.utc().toJSDate()
      const thumbnailBlob = this.thumbnailBlob

      mediaRecorder.onstop = async function () {
        const blob = new Blob(chunks, { type: options.mimeType })

        const recording = {
          blob,
          thumbnailBlob,
          startDateTime: startTime,
          finishDateTime: DateTime.utc().toJSDate(),
        } as Recording

        await db.recordings.add(recording)

        stopRecording()
      }

      mediaRecorder.start()
      this.recorder = mediaRecorder
      this.recorderStartTime = startTime
      this.recorderMediaStream = capture
    },
    stopRecording() {
      this.recorder?.stop
      this.recorder = undefined
      this.recorderStartTime = undefined
    },
    setThumbnail(thumbnailBlob: Blob) {
      this.recorderThumbnailBlob = thumbnailBlob
    },
  },
})
