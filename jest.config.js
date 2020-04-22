const { jestDirAlias } = require('./dirAlias');

const unitTests = {
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: jestDirAlias,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  displayName: 'Unit Tests',
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
    '!**/src/integration/!(utils)/**/*',
  ],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
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
  testMatch: ['**/src/integration/!(utils)/**/*[^.canonical].test.js'],
};

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/!(utils)/**/*[^.amp].test.js'],
};

module.exports = {
  projects: [unitTests, ampIntegrationTests, canonicalIntegrationTests],
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
};
