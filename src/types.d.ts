declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SUPER_USER_EMAIL: string
    SUPER_USER_PASSWORD: string
    DATABASE_URL: string
    SERVER_PORT: number
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
  }
}

declare namespace Express {
  enum UserType {
    STAFF = 'staff',
    CLIENT = 'client',
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
  }

  export interface Request {
    currentUser?: {
      id: string
      email: string
      userType: UserType
    }
  }
}
