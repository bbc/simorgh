import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from '@jest/types';
import { compilerOptions } from '../tsconfig.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { react, ...compilerOptionsPaths } = compilerOptions.paths;

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'canonical',
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
  testMatch: ['**/integration/!(utils)/**/*[^.amp].test.ts'],
} satisfies Config.InitialProjectOptions;

const ampIntegrationTests = {
  displayName: 'Integration Tests - AMP',
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'amp',
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
  testMatch: ['**/integration/!(utils)/**/amp.test.ts'],
} satisfies Config.InitialProjectOptions;

const unitTests = {
  displayName: 'Unit Tests',
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptionsPaths),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
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
  projects: [unitTests, canonicalIntegrationTests, ampIntegrationTests],
};

export default config;
