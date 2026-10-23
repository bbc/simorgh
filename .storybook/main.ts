import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import { resolvePathInStorybookCache } from 'storybook/internal/common';
import type { Options as StorybookOptions } from 'storybook/internal/types';
import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Options as SwcOptions } from '@swc/types';

import alias from '../dirAlias';

import { fontInfo } from '../src/app/components/ThemeProvider/fontFaces';
const require = createRequire(import.meta.url);
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');
const DOT_ENV_CONFIG = dotenv.config({ quiet: true });

const storybookConfig: StorybookConfig = {
  previewHead(config) {
    const fontLinkTags = Object.values(fontInfo)
      .map(font => {
        return `
        <link
          rel="preload"
          href="${font.downloadSrc}"
          as="font"
          crossorigin="anonymous"
        />
      `;
      })
      .join('\n');

    return `
      ${config}
      ${fontLinkTags}
    `;
  },
  staticDirs: ['./static', { from: '../data', to: 'data' }],
  stories: [
    '../src/app/legacy/components/**/*.stories.@(t|j)sx',
    '../src/app/legacy/containers/**/*.stories.@(t|j)sx',
    '../src/app/legacy/psammead/psammead-locales/**/*.stories.@(t|j)sx',
    '../src/app/legacy/psammead/index.stories.tsx',
    '../src/app/components/**/*.stories.@(t|j)sx',
    '../src/app/components-webcore/**/*.stories.@(t|j)sx',
    '../src/app/pages/**/*.stories.@(t|j)sx',
    './DocsDecorator/**/*.stories.@(t|j)sx',
    './StorybookComponents/**/*.stories.@(t|j)sx',
    '../ws-nextjs-app/pages/**/*.stories.tsx',
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.module\.scss$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  esModule: false,
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            test: /(?<!\.module)\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
        ],
      },
    },
  ],
  swc: (config: SwcOptions, { configType }: StorybookOptions): SwcOptions => ({
    ...config,
    jsc: {
      ...config.jsc,
      transform: {
        ...config.jsc?.transform,
        react: {
          ...config.jsc?.transform?.react,
          development: configType === 'DEVELOPMENT',
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
      experimental: {
        ...config.jsc?.experimental,
        cacheRoot: resolvePathInStorybookCache('swc'),
        plugins: [
          ...(config.jsc?.experimental?.plugins ?? []),
          [
            '@swc/plugin-emotion',
            {
              autoLabel: 'dev-only',
              labelFormat: '[local]',
            },
          ],
        ],
      },
    },
  }),
  env: config => ({
    ...config,
    ...DOT_ENV_CONFIG.parsed,
  }),
  webpackFinal: async config => {
    config.plugins!.push(
      /*
       * This replaces calls to logger.node.js with logger.web.js, a client
       * side replacement. This mimics the behaviour of the client side
       * bundle generation in webpack.config.client.js
       */
      new webpack.NormalModuleReplacementPlugin(
        /(.*)logger.node(\.*)/,
        resource => {
          resource.request = resource.request.replace(
            /logger.node/,
            `logger.web`,
          );
        },
      ),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new MomentTimezoneInclude({
        startYear: 2010,
        endYear: new Date().getFullYear() + 1,
      }),
    );

    config.resolve!.fallback = {
      ...config.resolve!.fallback,
      fs: false,
      stream: false,
      zlib: false,
    };

    config.resolve!.alias = {
      ...config.resolve!.alias,
      ...alias.webpackDirAlias,
    };
    return config;
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    defaultName: 'README',
  },
};

export default storybookConfig;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
