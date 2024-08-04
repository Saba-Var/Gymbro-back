import cors from 'cors'

const configuredCors = cors({
  origin: process.env.FRONTEND_URL!,
  credentials: true,
})

export default configuredCors
