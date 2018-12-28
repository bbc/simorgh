const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = ({ resolvePath, IS_DEV }) => {
  return {
    target: 'node',
    entry: ['./src'],
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
    },
    plugins: IS_DEV ? [new StartServerPlugin('server.js')] : undefined,
  };
};
