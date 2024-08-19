import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

const configuredCors = cors({
  origin: allowedOrigins,
  credentials: true,
})

export default configuredCors
