const LoadablePlugin = require('@loadable/webpack-plugin');
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

    config.plugins = [...config.plugins, new LoadablePlugin()];

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
