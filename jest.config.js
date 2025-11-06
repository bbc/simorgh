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

const ampIntegrationTests = {
  displayName: 'Integration Tests - AMP',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'amp',
  },
  moduleNameMapper: jestDirAlias,
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: [
    '.*lite\\.test\\.js$',
    '.*canonical\\.test\\.js$',
    '<rootDir>/src/integration/pages/articles/',
    '<rootDir>/src/integration/pages/mediaArticlePage/',
    '<rootDir>/src/integration/pages/mediaAssetPage/',
    '<rootDir>/src/integration/pages/photoGalleryPage/',
    '<rootDir>/src/integration/pages/storyPage/',
  ],
};

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  moduleNameMapper: jestDirAlias,
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: [
    '.*lite\\.test\\.js$',
    '.*amp\\.test\\.js$',
    '<rootDir>/src/integration/pages/articles/',
    '<rootDir>/src/integration/pages/mediaArticlePage/',
    '<rootDir>/src/integration/pages/mediaAssetPage/',
    '<rootDir>/src/integration/pages/photoGalleryPage/',
    '<rootDir>/src/integration/pages/storyPage/',
  ],
};

const liteIntegrationTests = {
  displayName: 'Integration Tests - Lite',
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'lite',
  },
  moduleNameMapper: jestDirAlias,
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*.test.js'],
  testPathIgnorePatterns: [
    '.*canonical\\.test\\.js$',
    '.*amp\\.test\\.js$',
    '<rootDir>/src/integration/pages/articles/',
    '<rootDir>/src/integration/pages/mediaArticlePage/',
    '<rootDir>/src/integration/pages/mediaAssetPage/',
    '<rootDir>/src/integration/pages/photoGalleryPage/',
    '<rootDir>/src/integration/pages/storyPage/',
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
  projects: [
    unitTests,
    clientUnitTests,
    ampIntegrationTests,
    canonicalIntegrationTests,
    liteIntegrationTests,
    puppeteerTests,
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
  fakeTimers: {
    enableGlobally: true,
  },
  workerIdleMemoryLimit: '512MB',
};
