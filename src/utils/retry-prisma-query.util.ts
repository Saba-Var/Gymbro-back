export const retryPrismaQuery = async <T>(
  queryFn: () => Promise<T | null>,
  maxRetries = 2,
  delay = 100
): Promise<T | null> => {
  if (process.env.NODE_ENV.includes('test')) {
    for (let i = 0; i < maxRetries; i++) {
      const result = await queryFn()
      if (result !== null) {
        return result
      }
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  const result = await queryFn()

  return result || null
}
