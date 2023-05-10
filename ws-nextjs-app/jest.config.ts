import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from '../tsconfig.json';

const config: import('jest').Config = {
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^uuid$': require.resolve('uuid'),
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

export default config;
