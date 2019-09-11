const webpack = require('webpack');
const { webpackDirAlias } = require('../dirAlias');

module.exports = {
  plugins: [
    /*
     * This replaces calls to logger.node.js with logger.web.js, a client
     * side replacement. This mimics the behaviour of the client side
     * bundle generation in webpack.config.client.js
     */
    new webpack.NormalModuleReplacementPlugin(
      /(.*)logger.node(\.*)/,
      resource => {
        // eslint-disable-next-line no-param-reassign
        resource.request = resource.request.replace(
          /logger.node/,
          `logger.web`,
        );
      },
    ),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // resolves `import '../Foo'` to `../Foo/index.jsx`
    alias: webpackDirAlias,
  },
};
