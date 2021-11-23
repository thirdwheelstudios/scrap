/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon'
import { Recording } from '../models/Recording'
import { db } from '../persistence/db'

export default {
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

      recorder.onstop = async function () {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const startDateTime: DateTime = context.getters['recordingStartTime']
        const finishDateTime = DateTime.now()

        const count: number = context.getters['recordings'].length

        const recording = {
          description: `Scrap #${count + 1}`,
          blob,
          startDateTime: startDateTime.toJSDate(),
          finishDateTime: finishDateTime.toJSDate(),
        } as Recording

        await db.recordings.add(recording)

        context.commit('setRecorder', null)
        context.commit('setMediaStream', null)
        context.commit('addRecording', recording)
      }

      context.commit('setRecorder', recorder)
      context.commit('setMediaStream', capture)

      recorder.start()
    } catch (err) {
      console.error('Unable to start capture', err)
    }
  },
  async stopRecording(context: any) {
    const isRecording: boolean = context.getters['isRecording']
    if (!isRecording) return

    const recorder: MediaRecorder = context.getters['recorder']

    recorder.stop()
  },
  async getRecordings(context: any) {
    const recordings = await db.recordings.toArray()

    context.commit('setRecordings', recordings)
  },
}
