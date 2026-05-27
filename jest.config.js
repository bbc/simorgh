const { jestDirAlias } = require('./dirAlias');

const unitTests = {
  preset: 'ts-jest',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: [
    './src/testHelpers/setupTests.js',
    'jest-expect-message',
  ],
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
    '**/?(*.)+(test).{js,jsx,ts,tsx}',
    '!**/?(*.)+(client.test).{js,jsx,ts,tsx}',
    '!**/src/integration/!(utils)/**/*',
    '!**/puppeteer/**/*',
  ],
};

const clientUnitTests = {
  preset: 'ts-jest',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: [
    './src/testHelpers/setupTests.js',
    'jest-expect-message',
  ],
  moduleNameMapper: jestDirAlias,
  testEnvironment: '@happy-dom/jest-environment',
  snapshotSerializers: ['@emotion/jest/serializer'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  displayName: 'Unit Tests (Client)',
  testMatch: [
    '**/?(*.)+(client.test).{js,jsx,ts,tsx}',
    '!**/src/integration/**/*',
    '!**/puppeteer/**/*',
  ],
};

const puppeteerTests = {
  preset: 'ts-jest',
  setupFiles: ['./puppeteer/jest-setup.js'],
  moduleNameMapper: jestDirAlias,
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  displayName: 'Puppeteer Tests',
  testMatch: ['**/puppeteer/**/*.test.js'],
};

module.exports = {
  projects: [unitTests, clientUnitTests, puppeteerTests],
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
  fakeTimers: {
    enableGlobally: true,
  },
  workerIdleMemoryLimit: '512MB',
};
