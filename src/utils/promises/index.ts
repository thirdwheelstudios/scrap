export async function promiseWithDelay<T>(promise: Promise<T>, timeoutInMilliseconds?: number) {
  if (!timeoutInMilliseconds) return promise

  const delay = new Promise((resolve) => setTimeout(resolve, timeoutInMilliseconds))
  const allPromises = await Promise.all([promise, delay])

  return allPromises[0]
}