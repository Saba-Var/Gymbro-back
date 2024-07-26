import type { UserTypeEnum } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
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
      currentUser?: {
        companyId: number | undefined
        userType: UserTypeEnum
        email: string
        id: number
      }
    }
  }
}

// explicitly mark a file as a module
export {}
