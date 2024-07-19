import fixWebmDuration from 'webm-duration-fix'

export function downloadFile(blob: Blob, downloadName: string) {
  const a = document.createElement('a')
  document.body.appendChild(a)

  a.href = window.URL.createObjectURL(blob)
  a.setAttribute('download', downloadName)
  a.click()
}

export async function downloadRecording(
  recording: { chunks: BlobPart[]; mimeType: string },
  downloadName: string
) {
  const blob = new Blob(recording.chunks, { type: recording.mimeType })

  const isWebmVideo = recording.mimeType === 'video/webm'

  const seekableBlob = isWebmVideo ? await fixWebmDuration(blob) : blob

  downloadFile(seekableBlob, downloadName)
}
