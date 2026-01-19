/* eslint-disable global-require */
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ resolvePath, START_DEV_SERVER }) => {
  const serverConfig = {
    target: 'node', // compile for server environment
    entry: START_DEV_SERVER ? ['webpack/hot/poll?100', './src'] : ['./src'],
    devtool: START_DEV_SERVER ? 'source-map' : false,
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
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
    const StartServerPlugin = require('start-server-nestjs-webpack-plugin');
    serverConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin('server.js'), // only start the server if we've run `yarn dev`
      new CopyPlugin({
        patterns: [
          {
            from: 'public/**/*',
            globOptions: {
              ignore: ['**/images/**'],
            },
          },
        ],
      }),
    ];
  }

  return serverConfig;
};
