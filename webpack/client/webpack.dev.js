const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');
const paths = require('../common/paths');

const HOST = 'localhost';
const PORT = 7081;
const FULL_HOST = `http://${HOST}:${PORT}`;

module.exports = merge(common, {
  entry: [
    `webpack-dev-server/client?${FULL_HOST}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    paths.web.entryPath,
  ],
  mode: 'development',
  output: {
    path: paths.web.outputPath,
    publicPath: `${FULL_HOST}/`,
    filename: paths.web.outputFile,
  },
  devServer: {
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
