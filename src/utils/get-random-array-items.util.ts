export const getArrayRandomItems = <T>(
  array: T[],
  options?: { count?: number }
): T[] => {
  const count = options?.count ?? 1

  if (array.length === 0 || count < 1) {
    return []
  }

  const result: T[] = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length)
    result.push(array[randomIndex])
  }

  return result
}
