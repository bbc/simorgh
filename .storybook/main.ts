/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack from 'webpack';
import {
  getProjectRoot,
  resolvePathInStorybookCache,
} from '@storybook/core-common';
import { webpackDirAlias } from '../dirAlias';

const storybookConfig: StorybookConfig = {
  staticDirs: ['./static', { from: '../data', to: 'data' }],
  stories: [
    '../src/app/legacy/components/**/*.stories.@(t|j)sx',
    '../src/app/legacy/containers/**/*.stories.@(t|j)sx',
    '../src/app/components/**/*.stories.@(t|j)sx',
    '../src/app/pages/**/*.stories.@(t|j)sx',
    './DocsDecorator/**/*.stories.@(t|j)sx',
    './StorybookComponents/**/*.stories.@(t|j)sx',
    './SidebarLabel/**/*.stories.@(t|j)sx',
    '../ws-nextjs-app/**/*.stories.tsx',

    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../AdHocCypress/**/*.mdx',
    '../3rdPartyCypress/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    './SidebarLabel/preset.cjs',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  webpackFinal: async (config, options) => {
    const babelOptions = await options.presets.apply('babel', {}, options);
    const typescriptOptions = await options.presets.apply(
      'typescript',
      {},
      options,
    );

    config.module = {
      ...(config.module || {}),
      rules: [
        ...(config.module?.rules || []),
        {
          test: typescriptOptions.skipCompiler
            ? /\.((c|m)?jsx?)$/
            : /\.((c|m)?(j|t)sx?)$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: resolvePathInStorybookCache('babel'),
                ...babelOptions,
              },
            },
          ],
          include: [getProjectRoot()],
          exclude: [/node_modules/],
        },
      ],
    };

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
    );

    config.resolve!.fallback = {
      ...config.resolve!.fallback,
      fs: false,
      stream: false,
      zlib: false,
    };

    config.resolve!.alias = {
      ...config.resolve!.alias,
      ...webpackDirAlias,
    };
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'README',
    autodocs: true,
  },
};

export default storybookConfig;
