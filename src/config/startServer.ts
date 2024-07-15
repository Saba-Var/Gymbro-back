/* eslint-disable no-console */
import type { Express } from 'express'

export const startServer = async (server: Express) => {
  const SERVER_PORT = process.env.SERVER_PORT

  server.listen(SERVER_PORT, async () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`)
  })
}
