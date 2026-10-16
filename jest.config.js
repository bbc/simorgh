const nextJest = require('next/jest');

const { jestDirAlias } = require('./dirAlias');

const nextTransformerPattern = '^.+\\.(js|jsx|ts|tsx|mjs)$';
const puppeteerNodeModulesPattern =
  'node_modules/(?!(puppeteer(?:-core)?|@puppeteer/browsers)/)';

const commonConfig = {
  setupFiles: ['./src/testHelpers/jest-setup.js'],
  setupFilesAfterEnv: [
    './src/testHelpers/setupTests.js',
    'jest-expect-message',
  ],
  moduleNameMapper: {
    ...jestDirAlias,
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@bbc/resonance$': '<rootDir>/src/testHelpers/resonanceMock.ts',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};

const unitTests = {
  ...commonConfig,
  testEnvironment: 'jsdom',
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
  ...commonConfig,
  testEnvironment: '@happy-dom/jest-environment',
  displayName: 'Unit Tests (Client)',
  testMatch: [
    '**/?(*.)+(client.test).{js,jsx,ts,tsx}',
    '!**/src/integration/**/*',
    '!**/puppeteer/**/*',
  ],
};

const puppeteerTests = {
  setupFiles: ['./puppeteer/jest-setup.js'],
  moduleNameMapper: jestDirAlias,
  displayName: 'Puppeteer Tests',
  testMatch: ['**/puppeteer/**/*.test.js'],
};

const createNextJestConfig = nextJest({});

const withRootEmotion = config => {
  const [transformer, options] = config.transform[nextTransformerPattern];

  return {
    ...config,
    transform: {
      ...config.transform,
      [nextTransformerPattern]: [
        transformer,
        {
          ...options,
          compilerOptions: {
            ...options.compilerOptions,
            emotion: {
              ...options.compilerOptions?.emotion,
              autoLabel: 'always',
            },
          },
          jsConfig: {
            ...options.jsConfig,
            compilerOptions: {
              ...options.jsConfig?.compilerOptions,
              jsxImportSource: '@emotion/react',
            },
          },
        },
      ],
    },
  };
};

const buildProject = async config => {
  const resolvedConfig = await createNextJestConfig(config)();
  return withRootEmotion(resolvedConfig);
};

const buildPuppeteerProject = async () => {
  const resolvedConfig = await buildProject(puppeteerTests);

  return {
    ...resolvedConfig,
    transformIgnorePatterns: resolvedConfig.transformIgnorePatterns
      .filter(pattern => !pattern.includes('node_modules'))
      .concat(puppeteerNodeModulesPattern),
  };
};

module.exports = async () => ({
  projects: [
    await buildProject(unitTests),
    await buildProject(clientUnitTests),
    await buildPuppeteerProject(),
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
});
