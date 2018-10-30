const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const common = require('../common/config');
const paths = require('../common/paths');

module.exports = merge(common, {
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(paths.outputPath, {
      root: paths.appDirectory,
      verbose: false,
    }),
    new AssetsPlugin({
      path: paths.outputPath,
      filename: paths.assetsManifestFile,
    }),
  ],
});
