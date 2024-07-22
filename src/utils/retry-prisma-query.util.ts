export const retryPrismaQuery = async <T>(
  queryFn: () => Promise<T | null>,
  maxRetries = 3,
  delay = 100
): Promise<T | null> => {
  for (let i = 0; i < maxRetries; i++) {
    const result = await queryFn()
    if (result !== null) {
      return result
    }
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return null
}
