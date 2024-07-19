export interface Recording {
  id?: number
  description: string
  blob: Blob
  chunks: BlobPart[]
  mimeType: string
  thumbnailBlob: Blob
  startDateTime: Date
  finishDateTime: Date
}
