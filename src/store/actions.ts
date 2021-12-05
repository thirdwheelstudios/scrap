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
        videoBitsPerSecond: 480000,
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

        const thumbnailBlob: Blob = context.getters['thumbnailBlob']

        const recording = {
          blob,
          thumbnailBlob,
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
  async deleteRecording(context: any, id: number) {
    await db.recordings.where('id').equals(id).delete()

    context.commit('deleteRecording', { id })
  },
  async downloadRecording(context: any, id: number) {
    const recording = await db.recordings.where('id').equals(id).first()

    if (!recording) return

    const a = document.createElement('a')
    document.body.appendChild(a)

    a.href = window.URL.createObjectURL(recording.blob)
    const name = recording.description ?? `Scrap #${recording.id}`
    a.setAttribute('download', name)
    a.click()
  },
  setThumbnail(context: any, blob: Blob) {
    context.commit('setThumbnail', blob)
  },
  async updateDescription(context: any, recording: Recording) {
    if (!recording.id) return

    await db.recordings.update(recording.id, { description: recording.description })

    context.commit('updateDescription', recording)
  },
}
