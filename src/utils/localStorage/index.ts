export function getValue<T>(key: string) {
  const json = localStorage.getItem(key)
  if (!json) return null

  const parsed: T = JSON.parse(json)

  return parsed
}

export function setValue<T>(key: string, valueToSet: T) {
  const json = JSON.stringify(valueToSet)

  localStorage.setItem(key, json)
}
