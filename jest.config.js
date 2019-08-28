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
    '^@components(.*)$': '<rootDir>/src/app/components$1',
    '^@lib(.*)$': '<rootDir>/src/app/lib$1',
    '^@data(.*)$': '<rootDir>/data$1',
    '^@testHelpers(.*)$': '<rootDir>/src/testHelpers$1',
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@contexts(.*)$': '<rootDir>/src/app/contexts$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
};
