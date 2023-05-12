import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack from 'webpack';
import path from 'path';
import { webpackDirAlias } from '../dirAlias';

const toPath = (_path: string) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  staticDirs: ['./static'],
  stories: [
    // '../docs/**/*.stories.mdx',
    // '../src/**/*.stories.mdx',
    // '../AdHocCypress/**/*.stories.mdx',
    // '../3rdPartyCypress/**/*.stories.mdx',
    // '../src/app/legacy/components/**/*.stories.@(t|j)sx',
    // '../src/app/legacy/containers/**/*.stories.@(t|j)sx',
    // '../src/app/components/**/*.stories.@(t|j)sx',
    // '../src/app/pages/**/*.stories.@(t|j)sx',
    // '../ws-nextjs-app/**/*.stories.tsx',
    // './DocsDecorator/**/*.stories.@(t|j)sx',
    // './SidebarLabel/**/*.stories.@(t|j)sx',
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    // 'storybook-addon-designs',
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
  webpackFinal: async config => {
    config.target = ['web', 'es5'];
    config.plugins!.push(
      /*
       * This replaces calls to logger.node.js with logger.web.js, a client
       * side replacement. This mimics the behaviour of the client side
       * bundle generation in webpack.config.client.js
       */
      // @ts-ignore
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
    config.resolve!.extensions!.push('.js', '.jsx', '.ts', '.tsx'); // resolves `import '../Foo'` to `../Foo/index.jsx`
    config.resolve!.alias = {
      ...config.resolve?.alias,
      ...webpackDirAlias,
      // Storybook 6 does not support emotion 11 - these 3 aliases work around that
      // https://github.com/storybookjs/storybook/issues/13277
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: { lazyCompilation: false },
    },
  },
};

export default config;
