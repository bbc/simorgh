/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const path = require('path');
const { webpackDirAlias } = require('../dirAlias');

const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../src/app/legacy/components/**/*.stories.@(t|j)sx',
    '../src/app/legacy/containers/**/*.stories.@(t|j)sx',
    '../src/app/components/**/*.stories.@(t|j)sx',
    '../src/app/pages/**/*.stories.@(t|j)sx',
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
  ],
  webpackFinal: async config => {
    config.target = ['web', 'es5'];
    config.plugins.push(
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

    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx'); // resolves `import '../Foo'` to `../Foo/index.jsx`
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackDirAlias,

      // Storybook 6 does not support emotion 11 - these 3 aliases work around that
      // https://github.com/storybookjs/storybook/issues/13277
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };

    return config;
  },
};
