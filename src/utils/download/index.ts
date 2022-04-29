export function downloadFile(blob: Blob, downloadName: string) {
  const a = document.createElement('a')
  document.body.appendChild(a)

  a.href = window.URL.createObjectURL(blob)
  a.setAttribute('download', downloadName)
  a.click()
}
