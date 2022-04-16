export function getValue<T>(key: string, defaultValue: T) {
  const json = localStorage.getItem(key)
  if (!json) return defaultValue

  const parsed: T = JSON.parse(json)

  return parsed
}

export function setValue<T>(key: string, valueToSet: T) {
  const json = JSON.stringify(valueToSet)

  localStorage.setItem(key, json)
}
