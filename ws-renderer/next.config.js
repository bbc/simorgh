const { webpackDirAlias } = require('../dirAlias');

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

    return config;
  },
};
