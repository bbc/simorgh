const { jestDirAlias } = require('./dirAlias');

const baseProjectConfig = {
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: jestDirAlias,
  snapshotSerializers: ['jest-serializer-html'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
};

const unitTests = {
  ...baseProjectConfig,
  displayName: 'Unit Tests',
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
    '!**/src/integration/**/*.{js,jsx}',
  ],
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
    '!**/src/integration/**/*',
  ],
};

const ampIntegrationTests = {
  ...baseProjectConfig,
  displayName: 'Integration Tests - AMP',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'amp',
  },
  testMatch: ['**/src/integration/**/*[^.canonical].test.js'],
};

const canonicalIntegrationTests = {
  ...baseProjectConfig,
  displayName: 'Integration Tests - Canonical',
  testEnvironment: './src/integration/integrationTestEnvironment.js',
  testEnvironmentOptions: {
    platform: 'canonical',
  },
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
