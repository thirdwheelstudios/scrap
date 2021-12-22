/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSimpleExpression } from '@vue/compiler-core'
import { DateTime } from 'luxon'
import { CaptureSettings } from '../models/CaptureSettings'
import { Recording } from '../models/Recording'
import { db } from '../persistence/db'

export default {
  async startRecording(context: any) {
    try {
      const isCapturing: boolean = context.getters['isCapturing']
      if (isCapturing) return
      const settings: CaptureSettings = context.getters['captureSettings']

      const constraints = {
        video: settings.captureVideo,
        audio: settings.captureAudio,
      } as DisplayMediaStreamConstraints
      const capture = await navigator.mediaDevices.getDisplayMedia(constraints)

      const options = {
        mimeType: settings.mimeType,
        audioBitsPerSecond: settings.audioBitsPerSecond,
        videoBitsPerSecond: settings.videoBitsPerSecond,
      } as MediaRecorderOptions
      const recorder = new MediaRecorder(capture, options)

      const chunks: BlobPart[] | undefined = []

      recorder.ondataavailable = function (e) {
        chunks.push(e.data)
      }

      recorder.onstop = async function () {
        const blob = new Blob(chunks, { type: settings.mimeType })
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
      console.error('Unable to start recording', err)
    }
  },
  async stopRecording(context: any) {
    const isRecording: boolean = context.getters['isRecording']
    if (!isRecording) return

    const recorder: MediaRecorder = context.getters['recorder']

    recorder.stop()
  },
  async getRecordings(context: any) {
    context.commit('setIsLoadingRecordings', true)
    const recordings = await db.recordings.toArray()

    context.commit('setRecordings', recordings)
    context.commit('setIsLoadingRecordings', false)
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

    await db.recordings.update(recording.id, {
      description: recording.description,
    })

    context.commit('updateDescription', recording)
  },
  setModalComponent(context: any, modalComponentName: string | null) {
    context.commit('setModalComponent', modalComponentName)
  },
  updateCaptureSettings(context: any, settings: CaptureSettings) {
    const settingsJson = JSON.stringify(settings)

    localStorage.setItem('captureSettings', settingsJson)

    context.commit('updateCaptureSettings', settings)
  },
}
