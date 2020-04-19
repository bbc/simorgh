const { jestDirAlias } = require('./dirAlias');

const unitTests = {
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: jestDirAlias,
  snapshotSerializers: ['jest-serializer-html'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  displayName: 'Unit Tests',
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
    '!**/src/integration/**/*.{js,jsx}',
  ],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
    '!**/src/integration/**/*',
  ],
};

const ampIntegrationTests = {
  displayName: 'Integration Tests - AMP',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'amp',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/**/*[^.canonical].test.js'],
};

const canonicalIntegrationTests = {
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  testMatch: ['**/src/integration/**/*[^.amp].test.js'],
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
