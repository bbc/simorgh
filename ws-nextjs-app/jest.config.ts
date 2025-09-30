/* eslint-disable import/no-relative-packages */
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from '@jest/types';
import { compilerOptions } from '../tsconfig.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { react, ...compilerOptionsPaths } = compilerOptions.paths;

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  // setupFiles: ['../src/testHelpers/jest-setup.js'], // see - don't think this does anything
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptionsPaths),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: './.babelrc',
        presets: ['next/babel'],
      },
    ],
  },
  testMatch: ['**/integration/!(utils)/**/*.test.ts'],
  testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*amp\\.test\\.ts$'],
} satisfies Config.InitialProjectOptions;

const ampIntegrationTests = {
  displayName: 'Integration Tests - AMP',
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'amp',
  },
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptionsPaths),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: './.babelrc',
        presets: ['next/babel'],
      },
    ],
  },
  testMatch: ['**/integration/!(utils)/**/*.test.ts'],
  testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*canonical\\.test\\.ts$'],
} satisfies Config.InitialProjectOptions;

const liteIntegrationTests = {
  displayName: 'Integration Tests - Lite',
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'lite',
  },
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptionsPaths),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: './.babelrc',
        presets: ['next/babel'],
      },
    ],
  },
  testMatch: ['**/integration/!(utils)/**/*.test.ts'],
  testPathIgnorePatterns: ['.*canonical\\.test\\.ts$', '.*amp\\.test\\.ts$'],
} satisfies Config.InitialProjectOptions;

const unitTests = {
  displayName: 'Unit Tests',
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptionsPaths),
  },
  setupFilesAfterEnv: ['./setupTests.ts', 'jest-expect-message'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        configFile: './.babelrc',
        presets: ['next/babel'],
      },
    ],
  },
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
    '!**/integration/!(utils)/**/*',
  ],
} satisfies Config.InitialProjectOptions;

const config: import('jest').Config = {
  projects: [
    unitTests,
    canonicalIntegrationTests,
    ampIntegrationTests,
    liteIntegrationTests,
  ],
  workerIdleMemoryLimit: '512MB',
};

export default config;
