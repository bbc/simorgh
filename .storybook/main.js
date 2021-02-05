/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const { webpackDirAlias } = require('../dirAlias');

module.exports = {
  stories: ['../src/app/**/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async config => {
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
    );

    config.resolve.extensions.push('.js', '.jsx'); // resolves `import '../Foo'` to `../Foo/index.jsx`
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackDirAlias,

      // Storybook 6 does not support emotion 11 - these 3 aliases work around that
      // https://github.com/storybookjs/storybook/issues/13277#issuecomment-751747964
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };

    return config;
  },
};
