import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testing/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  setupFiles: ['<rootDir>/src/testing/setEnvVars.ts'],
}

export default config
