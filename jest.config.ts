import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  setupFiles: ['<rootDir>/src/test/setEnvVars.ts'],
}

export default config
