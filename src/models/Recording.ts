export interface Recording {
  id?: number
  description: string
  blob: Blob
  thumbnailBlob: Blob
  startDateTime: Date
  finishDateTime: Date
}
