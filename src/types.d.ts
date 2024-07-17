declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SUPER_USER_EMAIL: string
    SUPER_USER_PASSWORD: string
  }
}
