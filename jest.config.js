const path = require('path');

const nextJest = require('next/jest');
const ts = require('typescript');
const { pathsToModuleNameMapper } = require('ts-jest');

const { jestDirAlias } = require('./dirAlias');

const repoRoot = path.resolve(__dirname);
const nextRoot = path.resolve(repoRoot, 'ws-nextjs-app');
const nextTsConfigPath = path.resolve(nextRoot, 'tsconfig.json');
const rootBuildPath = path.resolve(repoRoot, 'build');
const nextBuildPath = path.resolve(nextRoot, 'build');

const nextTransformerPattern = '^.+\\.(js|jsx|ts|tsx|mjs)$';
const puppeteerNodeModulesPattern =
  'node_modules/(?!(puppeteer(?:-core)?|@puppeteer/browsers)/)';

const rootProjectPaths = {
  rootDir: repoRoot,
  testPathIgnorePatterns: [
    `${nextRoot}/`,
    `${rootBuildPath}/`,
    `${nextBuildPath}/`,
  ],
  modulePathIgnorePatterns: [`${rootBuildPath}/`, `${nextBuildPath}/`],
  watchPathIgnorePatterns: [`${rootBuildPath}/`, `${nextBuildPath}/`],
};

const commonRootConfig = {
  ...rootProjectPaths,
  setupFiles: [path.resolve(repoRoot, 'src/testHelpers/jest-setup.js')],
  setupFilesAfterEnv: [
    path.resolve(repoRoot, 'src/testHelpers/setupTests.js'),
    'jest-expect-message',
  ],
  moduleNameMapper: {
    ...jestDirAlias,
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@bbc/resonance$': path.resolve(
      repoRoot,
      'src/testHelpers/resonanceMock.ts',
    ),
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};

const unitTests = {
  ...commonRootConfig,
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
  ...commonRootConfig,
  testEnvironment: '@happy-dom/jest-environment',
  displayName: 'Unit Tests (Client)',
  testMatch: [
    '**/?(*.)+(client.test).{js,jsx,ts,tsx}',
    '!**/src/integration/**/*',
    '!**/puppeteer/**/*',
  ],
};

const puppeteerTests = {
  ...rootProjectPaths,
  setupFiles: [path.resolve(repoRoot, 'puppeteer/jest-setup.js')],
  moduleNameMapper: jestDirAlias,
  displayName: 'Puppeteer Tests',
  testMatch: ['**/puppeteer/**/*.test.js'],
};

const rootCreateJestConfig = nextJest({});
const nextCreateJestConfig = nextJest({ dir: nextRoot });

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

const buildRootProject = async config => {
  const resolvedConfig = await rootCreateJestConfig({
    ...config,
    rootDir: repoRoot,
  })();

  return withRootEmotion(resolvedConfig);
};

const buildPuppeteerProject = async () => {
  const resolvedConfig = await buildRootProject(puppeteerTests);

  return {
    ...resolvedConfig,
    transformIgnorePatterns: resolvedConfig.transformIgnorePatterns
      .filter(pattern => !pattern.includes('node_modules'))
      .concat(puppeteerNodeModulesPattern),
  };
};

const configFile = ts.readConfigFile(nextTsConfigPath, ts.sys.readFile);
if (configFile.error) {
  throw new Error(
    `Unable to read TypeScript config ${nextTsConfigPath}: ${ts.flattenDiagnosticMessageText(
      configFile.error.messageText,
      '\n',
    )}`,
  );
}

const compilerOptions = configFile.config?.compilerOptions;
if (!compilerOptions?.paths) {
  throw new Error(
    `TypeScript config ${nextTsConfigPath} must define compilerOptions.paths`,
  );
}

const nextModuleNameMapper = {
  ...pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  '^@bbc/resonance$': path.resolve(
    repoRoot,
    'src/testHelpers/resonanceMock.ts',
  ),
};

const buildNextProject = async config =>
  nextCreateJestConfig({
    ...config,
    rootDir: nextRoot,
    testPathIgnorePatterns: [
      ...(config.testPathIgnorePatterns || []),
      'build',
      'node_modules',
    ],
    modulePathIgnorePatterns: [
      ...(config.modulePathIgnorePatterns || []),
      `${nextBuildPath}/`,
    ],
    watchPathIgnorePatterns: [
      ...(config.watchPathIgnorePatterns || []),
      `${nextBuildPath}/`,
    ],
  })();

const nextCommonConfig = {
  rootDir: nextRoot,
  modulePaths: [repoRoot],
  moduleNameMapper: nextModuleNameMapper,
  setupFilesAfterEnv: [path.resolve(nextRoot, 'setupTests.ts')],
};

const nextUnitTests = {
  ...nextCommonConfig,
  displayName: 'Unit Tests (Next)',
  setupFilesAfterEnv: [
    path.resolve(nextRoot, 'setupTests.ts'),
    'jest-expect-message',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.{js,jsx,ts,tsx}',
    '**/?(*.)+(spec|test).{js,jsx,ts,tsx}',
    '!**/integration/!(utils)/**/*',
    '!**/playwright/**/*',
  ],
};

const nextIntegrationTestDescriptors = [
  {
    displayName: 'Integration Tests - Canonical',
    platform: 'canonical',
    testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*amp\\.test\\.ts$'],
  },
  {
    displayName: 'Integration Tests - AMP',
    platform: 'amp',
    testPathIgnorePatterns: ['.*lite\\.test\\.ts$', '.*canonical\\.test\\.ts$'],
  },
  {
    displayName: 'Integration Tests - Lite',
    platform: 'lite',
    testPathIgnorePatterns: ['.*canonical\\.test\\.ts$', '.*amp\\.test\\.ts$'],
  },
];

const nextIntegrationTests = nextIntegrationTestDescriptors.map(
  ({ displayName, platform, testPathIgnorePatterns }) => ({
    ...nextCommonConfig,
    displayName,
    testEnvironment: path.resolve(
      nextRoot,
      'integration/IntegrationTestEnvironment.ts',
    ),
    testEnvironmentOptions: { platform },
    testMatch: ['**/integration/!(utils)/**/*.test.ts'],
    testPathIgnorePatterns,
  }),
);

module.exports = async () => ({
  projects: [
    await buildRootProject(unitTests),
    await buildRootProject(clientUnitTests),
    await buildPuppeteerProject(),
    await buildNextProject(nextUnitTests),
    ...(await Promise.all(nextIntegrationTests.map(buildNextProject))),
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Jest Tests',
        outputDirectory: path.resolve(repoRoot, 'reports/jest'),
        uniqueOutputName: 'true',
        ancestorSeparator: ' › ',
      },
    ],
  ],
  workerIdleMemoryLimit: '512MB',
});
