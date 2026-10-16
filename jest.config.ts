import path from 'path';
import type { Config as JestConfig } from 'jest';
// Native Node TypeScript loading requires explicit extensions for these imports.
// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';
import type { NextConfig } from 'next';
import ts, { type CompilerOptions } from 'typescript';
import { pathsToModuleNameMapper } from 'ts-jest';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/extensions
import dirAlias from './dirAlias.js';

const { jestDirAlias } = dirAlias;

type JestProjectConfig = JestConfig;

type NextJsConfig = {
  compilerOptions: Record<string, unknown>;
};

type NextTransformerOptions = Record<string, unknown> & {
  compilerOptions?: NextConfig['compiler'];
  jsConfig?: NextJsConfig;
};

type RootTransformEntry = [string, NextTransformerOptions];

type ResolvedRootJestConfig = Omit<
  JestProjectConfig,
  'transform' | 'transformIgnorePatterns'
> & {
  transform: Record<string, RootTransformEntry>;
  transformIgnorePatterns: string[];
};

type IntegrationPlatform = 'canonical' | 'amp' | 'lite';

type IntegrationTestDescriptor = {
  displayName: string;
  platform: IntegrationPlatform;
  testPathIgnorePatterns: string[];
};

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const nextRoot = path.resolve(repoRoot, 'ws-nextjs-app');
const nextTsConfigPath = path.resolve(nextRoot, 'tsconfig.json');
const nextBuildPath = path.resolve(nextRoot, 'build');

const nextTransformerPattern = '^.+\\.(js|jsx|ts|tsx|mjs)$';
const puppeteerNodeModulesPattern =
  'node_modules/(?!(puppeteer(?:-core)?|@puppeteer/browsers)/)';

const rootProjectPaths = {
  rootDir: repoRoot,
  testPathIgnorePatterns: [`${nextRoot}/`, `${nextBuildPath}/`],
  modulePathIgnorePatterns: [`${nextBuildPath}/`],
  watchPathIgnorePatterns: [`${nextBuildPath}/`],
} satisfies JestProjectConfig;

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
} satisfies JestProjectConfig;

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
} satisfies JestProjectConfig;

const clientUnitTests = {
  ...commonRootConfig,
  testEnvironment: '@happy-dom/jest-environment',
  displayName: 'Unit Tests (Client)',
  testMatch: [
    '**/?(*.)+(client.test).{js,jsx,ts,tsx}',
    '!**/src/integration/**/*',
    '!**/puppeteer/**/*',
  ],
} satisfies JestProjectConfig;

const puppeteerTests = {
  ...rootProjectPaths,
  setupFiles: [path.resolve(repoRoot, 'puppeteer/jest-setup.js')],
  moduleNameMapper: jestDirAlias,
  displayName: 'Puppeteer Tests',
  testMatch: ['**/puppeteer/**/*.test.js'],
} satisfies JestProjectConfig;

const rootCreateJestConfig = nextJest({});
const nextCreateJestConfig = nextJest({ dir: nextRoot });

const withRootEmotion = (
  config: ResolvedRootJestConfig,
): ResolvedRootJestConfig => {
  const [transformer, options] = config.transform[nextTransformerPattern];
  const emotionOptions =
    typeof options.compilerOptions?.emotion === 'object' &&
    options.compilerOptions.emotion !== null
      ? options.compilerOptions.emotion
      : {};
  const compilerOptions: NextConfig['compiler'] = {
    ...options.compilerOptions,
    emotion: {
      ...emotionOptions,
      autoLabel: 'always',
    },
  };
  const jsConfig: NextJsConfig = {
    ...options.jsConfig,
    compilerOptions: {
      ...options.jsConfig?.compilerOptions,
      jsxImportSource: '@emotion/react',
    },
  };
  const transformedOptions: NextTransformerOptions = {
    ...options,
    compilerOptions,
    jsConfig,
  };
  const transformEntry: RootTransformEntry = [transformer, transformedOptions];

  return {
    ...config,
    transform: {
      ...config.transform,
      [nextTransformerPattern]: transformEntry,
    },
  };
};

const buildRootProject = async (
  config: JestProjectConfig,
): Promise<ResolvedRootJestConfig> => {
  // Next's public factory type leaves its known SWC transform options opaque.
  const resolvedConfig = (await rootCreateJestConfig({
    ...config,
    rootDir: repoRoot,
  })()) as ResolvedRootJestConfig;

  return withRootEmotion(resolvedConfig);
};

const buildPuppeteerProject = async (): Promise<ResolvedRootJestConfig> => {
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

const compilerOptions: CompilerOptions | undefined =
  configFile.config?.compilerOptions;
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

const buildNextProject = async (
  config: JestProjectConfig,
): Promise<JestProjectConfig> =>
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
} satisfies JestProjectConfig;

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
} satisfies JestProjectConfig;

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
] satisfies IntegrationTestDescriptor[];

const nextIntegrationTests: JestProjectConfig[] =
  nextIntegrationTestDescriptors.map(
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

export default async function createJestConfig(): Promise<JestConfig> {
  return {
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
  };
}
