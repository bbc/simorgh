const { jestDirAlias } = require('./dirAlias');

module.exports = {
  projects: [
    {
      displayName: 'Regression Tests',
      testEnvironment: './src/integration/integrationTestEnvironment.js',
      reporters: [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'Regression Tests',
            outputDirectory: 'reports/jest',
            uniqueOutputName: 'true',
            ancestorSeparator: ' › ',
          },
        ],
      ],
      setupFiles: ['./src/testHelpers/jest-setup.js'],
      testMatch: [
        '**/src/integration/regressionTests/tests/**/*.test.{js,jsx}',
      ],
      snapshotSerializers: ['jest-serializer-html'],
      setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
      moduleNameMapper: jestDirAlias,
      transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
      },
    },
  ],
};
