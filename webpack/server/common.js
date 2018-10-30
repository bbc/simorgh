const merge = require('webpack-merge');
const common = require('../common/config');
const paths = require('../common/paths');

module.exports = merge(common, {
  target: 'node',
  output: { path: paths.node.outputPath, filename: paths.node.outputFile },
});
