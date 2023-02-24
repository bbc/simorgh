/* eslint-disable global-require */
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = ({ resolvePath, START_DEV_SERVER }) => {
  const serverConfig = {
    target: 'node', // compile for server environment
    entry: START_DEV_SERVER ? ['webpack/hot/poll?100', './src'] : ['./src'],
    devtool: false,
    output: {
      path: resolvePath('build'),
      filename: 'index.js',
    },
    optimization: {
      minimize: false,
    },
    externals: [
      /**
       * Prevents `node_modules` from being bundled into the server.js
       * And therefore stops `node_modules` being watched for file changes
       */
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],

    node: {
      /**
       * Override webpacks default handling of __dirname
       * which replaces it with '/'.
       */
      __dirname: false,
    },
    plugins: [
      /**
       * Limit chunks to 1 to avoid unnecessary service bundle splitting
       */
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  };

  if (START_DEV_SERVER) {
    /**
     * Fix for start-server-webpack-plugin for migration from webpack 4 to 5
     * See https://github.com/ericclemmons/start-server-webpack-plugin/issues/40
     */
    const StartServerPlugin = require('start-server-nestjs-webpack-plugin');
    serverConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin('index.js'), // only start the server if we've run `yarn dev`
    ];
  }

  return serverConfig;
};
