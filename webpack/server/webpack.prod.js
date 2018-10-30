const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const common = require('./common');
const paths = require('../common/paths');

module.exports = merge(common, {
  entry: ['babel-polyfill', paths.node.entryPath],
  externals: [nodeExternals()],
});
