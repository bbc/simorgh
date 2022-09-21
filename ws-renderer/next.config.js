const { webpackDirAlias } = require('../dirAlias');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackDirAlias,
    };

    config.plugins = [...config.plugins, new LoadablePlugin()];

    return config;
  },
};
