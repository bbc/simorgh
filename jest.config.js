const { jestDirAlias } = require('./dirAlias');

const unitTests = {
  preset: 'ts-jest',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: jestDirAlias,
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  displayName: 'Unit Tests',
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx,ts,tsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
    '!**/*.stories.tsx',
    '!**/src/integration/!(utils)/**/*',
  ],
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
    '!**/src/integration/!(utils)/**/*',
  ],
};

const ampIntegrationTests = {
  displayName: 'Integration Tests - AMP',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'amp',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: ['.*lite\\.test\\.js$', '.*canonical\\.test\\.js$'],
};

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: ['.*lite\\.test\\.js$', '.*amp\\.test\\.js$'],
};

const liteIntegrationTests = {
  displayName: 'Integration Tests - Lite',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'lite',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: ['.*canonical\\.test\\.js$', '.*amp\\.test\\.js$'],
};

module.exports = {
  projects: [
    unitTests,
    ampIntegrationTests,
    canonicalIntegrationTests,
    liteIntegrationTests,
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Jest Tests',
        outputDirectory: 'reports/jest',
        uniqueOutputName: 'true',
        ancestorSeparator: ' › ',
      },
    ],
  ],
  timers: 'modern',
};
