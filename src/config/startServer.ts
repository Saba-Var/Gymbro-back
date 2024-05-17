/* eslint-disable no-console */
import connectToMongoDB from 'config/mongoDB'
import type { Express } from 'express'

export const startServer = async (server: Express) => {
  const PORT = process.env.PORT

  server.listen(PORT, async () => {
    await connectToMongoDB()
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}
