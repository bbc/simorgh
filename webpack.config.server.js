const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = ({ resolvePath, START_SERVER }) => {
  return {
    target: 'node',
    entry: ['./src'],
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
    },
    plugins: START_SERVER ? [new StartServerPlugin('server.js')] : undefined,
  };
};
