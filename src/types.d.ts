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
