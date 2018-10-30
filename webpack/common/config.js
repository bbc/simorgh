const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  mode: 'production',
  module: {
    rules: [{ test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_PATH: JSON.stringify('http://localhost:7080'),
        RAZZLE_ASSETS_MANIFEST: JSON.stringify(paths.assetsManifestPath),
        RAZZLE_PUBLIC_DIR: JSON.stringify('build/public'),
        RAZZLE_PUBLIC_DIR_DEV: JSON.stringify('public'),
      },
    }),
  ],
};
