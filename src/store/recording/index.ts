import { DateTime } from 'luxon'
import { defineStore } from 'pinia'
import { screenRecording } from '../../composables/screenRecording'
import { Recording } from '../../models'
import { useRecordingsListStore } from '../recordingsList'

export const useRecordingStore = defineStore('recording', {
  state: () => {
    let _recorder: MediaRecorder | undefined
    let _recorderStartTime: Date | undefined
    let _recorderThumbnailBlob: Blob | undefined
    let _recorderVideoStream: MediaStream | undefined
    let _captureAudio: boolean | undefined

    return {
      _recorder,
      _recorderStartTime,
      _recorderThumbnailBlob,
      _recorderVideoStream,
      _captureAudio,
    }
  },
  getters: {
    isRecording(state) {
      return state._recorder !== undefined
    },
    startTime(state) {
      return state._recorderStartTime
    },
    thumbnailBlob(state) {
      return state._recorderThumbnailBlob
    },
    videoStream(state) {
      return state._recorderVideoStream
    },
    captureAudio(state) {
      return state._captureAudio ?? false
    },
  },
  actions: {
    async startRecording(
      audioBitsPerSecond = 128000,
      videoBitsPerSecond = 1250000
    ) {
      const constraints = {
        video: true,
        audio: true,
      } as DisplayMediaStreamConstraints
      const videoCapture = await navigator.mediaDevices.getDisplayMedia(
        constraints
      )

      const { supportedMimeType } = screenRecording()

      const options = {
        mimeType: supportedMimeType.value,
        audioBitsPerSecond,
        videoBitsPerSecond,
      } as MediaRecorderOptions

      let mediaRecorder: MediaRecorder

      if (this._captureAudio) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })

        const combined = new MediaStream([
          ...videoCapture.getTracks(),
          ...audioStream.getAudioTracks(),
        ])

        mediaRecorder = new MediaRecorder(combined, options)
      } else {
        mediaRecorder = new MediaRecorder(videoCapture, options)
      }

      const chunks: BlobPart[] | undefined = []

      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data)
      }

      const stopRecording = () => {
        this._recorderVideoStream?.getTracks().forEach((track) => track.stop())
        this._recorderVideoStream = undefined
        this._recorderStartTime = undefined
        this._recorder = undefined
      }

      const startTime = DateTime.utc().toJSDate()
      const piniaContext = this

      mediaRecorder.onstop = async function () {
        const recording = {
          chunks,
          mimeType: options.mimeType,
          thumbnailBlob: piniaContext.thumbnailBlob,
          startDateTime: startTime,
          finishDateTime: DateTime.utc().toJSDate(),
        } as Recording

        const recordingsList = useRecordingsListStore()

        await recordingsList.add(recording)

        stopRecording()
      }

      mediaRecorder.start()
      this._recorder = mediaRecorder
      this._recorderStartTime = startTime
      this._recorderVideoStream = videoCapture
    },
    stopRecording() {
      this._recorder?.stop()
    },
    setThumbnail(thumbnailBlob: Blob) {
      this._recorderThumbnailBlob = thumbnailBlob
    },
    setCaptureAudio(value: boolean) {
      this._captureAudio = value
    },
  },
})
