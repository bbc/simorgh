const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = ({ resolvePath, START_SERVER }) => {
  return {
    target: 'node', // compile for server environment
    entry: ['./src'],
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
    },
    // only start the server if we've run `npm run dev`
    plugins: START_SERVER ? [new StartServerPlugin('server.js')] : undefined,
  };
};
