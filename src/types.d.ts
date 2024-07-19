declare global {
  import type { AuthJWTPayload } from 'types/globalTypes'

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local-testing' | 'production' | 'test'
      SUPER_USER_EMAIL: string
      SUPER_USER_PASSWORD: string
      DATABASE_URL: string
      SERVER_PORT: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
    }
  }

  namespace Express {
    interface Request {
      currentUser?: AuthJWTPayload
    }
  }
}

// explicitly mark a file as a module
export {}
