import { DateTime } from 'luxon'
import { CaptureSettings } from '../models/CaptureSettings'
import { Recording } from '../models/Recording'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  isRecording(state: any) {
    return state.recorder !== null && state.mediaStream !== null
  },
  recorder(state: any): MediaRecorder {
    return state.recorder
  },
  mediaStream(state: any): MediaStream {
    return state.mediaStream
  },
  recordingStartTime(state: any): DateTime | null {
    return state.recordingStartTime
  },
  recordings(state: any): Recording[] | null {
    return state.recordings ?? []
  },
  isLoadingRecordings(state: any): boolean {
    return state.isLoadingRecordings
  },
  thumbnailBlob(state: any): Blob {
    return state.thumbnailBlob
  },
  captureSettings(state: any): CaptureSettings {
    return state.captureSettings
  },
  currentModalComponentName(state: any): string {
    return state.currentModalComponentName
  },
}
