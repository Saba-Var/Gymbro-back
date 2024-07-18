import type { Config } from 'jest'

const setupFiles =
  process.env.NODE_ENV === 'local-testing'
    ? ['<rootDir>/src/testing/setEnvVars.ts']
    : []

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testing/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  setupFiles,
}

export default config
