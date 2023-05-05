/* eslint-disable import/extensions */
import { createRequire } from 'module';
import nextJest from 'next/jest.js';
import pkg from 'ts-jest/utils/index.js';

const { pathsToModuleNameMapper } = pkg;

const require = createRequire(import.meta.url);
const { compilerOptions } = require('../tsconfig.json');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  displayName: 'Next.JS - Unit Tests',
  modulePaths: ['../'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^uuid$': require.resolve('uuid'),
  },
  setupFilesAfterEnv: ['./setupTests.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
