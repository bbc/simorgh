import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack from 'webpack';
import {
  getProjectRoot,
  resolvePathInStorybookCache,
} from 'storybook/internal/common';
import alias from '../dirAlias';
import { fontInfo } from '../src/app/components/ThemeProvider/fontFaces';

const require = createRequire(import.meta.url);

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
    '../src/app/pages/**/*.stories.@(t|j)sx',
    './DocsDecorator/**/*.stories.@(t|j)sx',
    './StorybookComponents/**/*.stories.@(t|j)sx',
    '../ws-nextjs-app/**/*.stories.tsx',
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
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
      // @ts-expect-error
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
