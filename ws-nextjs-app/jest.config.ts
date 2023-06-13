import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { Config } from '@jest/types';
import { compilerOptions } from '../tsconfig.json';

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './integration/IntegrationTestEnvironment.ts',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
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
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testMatch: ['**/integration/!(utils)/**/amp.test.ts'],
} satisfies Config.InitialProjectOptions;

const unitTests = {
  displayName: 'Unit Tests',
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
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
