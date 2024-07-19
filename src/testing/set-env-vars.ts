const setEnvForLocalTesting = () => {
  const envObj: typeof process.env = {
    SERVER_PORT: '3000',
    DATABASE_URL: 'mysql://sabavar:supercell1!@localhost:3306/gymbro-testing',
    SUPER_USER_EMAIL: 'vartasashvili94@gmail.com',
    SUPER_USER_PASSWORD: '123456',
    ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_SECRET',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
    NODE_ENV: 'local-testing',
  }

  for (const key in envObj) {
    process.env[key] = envObj[key]
  }
}

setEnvForLocalTesting()
