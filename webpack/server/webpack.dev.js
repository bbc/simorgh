const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const common = require('./common');
const paths = require('../common/paths');

module.exports = merge(common, {
  entry: ['webpack/hot/poll?1000', 'babel-polyfill', paths.node.entryPath],
  watch: true,
  mode: 'development',
  plugins: [
    new StartServerPlugin(paths.node.outputFile),
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  devtool: 'cheap-eval-source-map',
  optimization: {
    noEmitOnErrors: true,
  },
});
