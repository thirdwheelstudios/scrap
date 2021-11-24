/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'luxon'
import { Recording } from '../models/Recording'

export default {
  setRecorder(state: any, recorder: MediaRecorder | null) {
    state.recorder = recorder
    state.recordingStartTime = recorder ? DateTime.now() : null
  },
  setMediaStream(state: any, mediaStream: MediaStream | null) {
    state.mediaStream = mediaStream
  },
  setRecordings(state: any, recordings: Recording[]) {
    state.recordings = recordings
  },
  addRecording(state: any, recording: Recording) {
    state.recordings.push(recording)
  },
  deleteRecording(state: any, recording: Recording) {
    const newRecordings = state.recordings.filter(
      (x: Recording) => x.id !== recording.id
    )
    state.recordings = [...newRecordings]
  },
  setThumbnail(state: any, blob: Blob) {
    state.thumbnailBlob = blob
  },
}
