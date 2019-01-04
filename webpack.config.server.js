const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = ({ resolvePath, START_DEV_SERVER }) => {
  const serverConfig = {
    target: 'node', // compile for server environment
    entry: START_DEV_SERVER ? ['webpack/hot/poll?100', './src'] : ['./src'],
    output: {
      path: resolvePath('build'),
      filename: 'server.js',
    },
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100'],
      }),
    ],
    watch: true,
  };

  if (START_DEV_SERVER) {
    const webpack = require('webpack');
    serverConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new StartServerPlugin('server.js'), // only start the server if we've run `npm run dev`
    ];
  }

  return serverConfig;
};
