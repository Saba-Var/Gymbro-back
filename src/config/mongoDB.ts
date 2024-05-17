/* eslint-disable no-console */
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const generateLocalMongoURL = () => {
  const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env

  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
}

const generateAtlasMongoURL = () => {
  const {
    MONGO_PASSWORD,
    MONGO_PROTOCOL,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_HOST,
  } = process.env

  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
}

const shouldConnectToLocalDatabase = () =>
  process.env.MONGO_PROTOCOL === 'mongodb'

const connectToMongoDB = async () => {
  try {
    const connectionURL = shouldConnectToLocalDatabase()
      ? generateLocalMongoURL()
      : generateAtlasMongoURL()

    return mongoose.connect(connectionURL)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`Error connecting to MongoDB: ${error.message}`)
    throw new Error(error.message)
  }
}

export default connectToMongoDB
