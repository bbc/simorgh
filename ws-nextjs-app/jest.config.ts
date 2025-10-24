/* eslint-disable import/no-relative-packages */
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';
import nextJest from 'next/jest';
import { compilerOptions } from '../tsconfig.json';

const { ...compilerOptionsPaths } = compilerOptions.paths;

const createJestConfig = nextJest({ dir: './' });

const buildConfig = async (config: Config): Promise<Config> => {
  return createJestConfig(config)();
};

export default async (): Promise<Config> => {
  const canonicalIntegrationTests = await buildConfig({
    displayName: 'Integration Tests - Canonical',
    testEnvironment: './integration/IntegrationTestEnvironment.ts',
    testEnvironmentOptions: { platform: 'canonical' },
    modulePaths: ['../'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptionsPaths),
    setupFilesAfterEnv: ['./setupTests.ts'],
    testMatch: ['**/integration/!(utils)/**/*.test.ts'],
    testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*amp\\.test\\.ts$'],
  });

  const ampIntegrationTests = await buildConfig({
    displayName: 'Integration Tests - AMP',
    testEnvironment: './integration/IntegrationTestEnvironment.ts',
    testEnvironmentOptions: { platform: 'amp' },
    modulePaths: ['../'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptionsPaths),
    setupFilesAfterEnv: ['./setupTests.ts'],
    testMatch: ['**/integration/!(utils)/**/*.test.ts'],
    testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*canonical\\.test\\.ts$'],
  });

  const liteIntegrationTests = await buildConfig({
    displayName: 'Integration Tests - Lite',
    testEnvironment: './integration/IntegrationTestEnvironment.ts',
    testEnvironmentOptions: { platform: 'lite' },
    modulePaths: ['../'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptionsPaths),
    setupFilesAfterEnv: ['./setupTests.ts'],
    testMatch: ['**/integration/!(utils)/**/*.test.ts'],
    testPathIgnorePatterns: ['.*canonical\\.test\\.ts$', '.*amp\\.test\\.ts$'],
  });

  const unitTests = await buildConfig({
    displayName: 'Unit Tests',
    modulePaths: ['../'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptionsPaths),
    setupFilesAfterEnv: ['./setupTests.ts', 'jest-expect-message'],
    snapshotSerializers: ['@emotion/jest/serializer'],
    testEnvironment: 'jsdom',
    testMatch: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
      '!**/integration/!(utils)/**/*',
    ],
  });

  const config: Config = {
    projects: [
      unitTests,
      canonicalIntegrationTests,
      ampIntegrationTests,
      liteIntegrationTests,
    ],
    workerIdleMemoryLimit: '512MB',
  };

  return config;
};
