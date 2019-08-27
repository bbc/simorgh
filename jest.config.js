module.exports = {
  collectCoverageFrom: [
    '**/(src|scripts)/**/*.{js,jsx}',
    '!**/src/testHelpers/**',
    '!**/*.stories.jsx',
  ],
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./src/testHelpers/setupTests.js'],
  moduleNameMapper: {
    '^@lib(.*)$': '<rootDir>/src/app/lib$1',
    '^@data(.*)$': '<rootDir>/data$1',
    '^@testHelpers(.*)$': '<rootDir>/src/testHelpers$1',
  },
};
