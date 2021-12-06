import { DateTime } from 'luxon'
import { CaptureSettings } from '../models/CaptureSettings'
import { Recording } from '../models/Recording'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  isRecording(state: any) {
    return state.recorder !== null && state.mediStream !== null
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
  thumbnailBlob(state: any): Blob {
    return state.thumbnailBlob
  },
  captureSettings(state: any): CaptureSettings {
    return state.captureSettings
  },
}
