const LoadablePlugin = require('@loadable/webpack-plugin');
const { webpackDirAlias } = require('../dirAlias');

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: config => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackDirAlias,
    };

    config.plugins.push(new LoadablePlugin());

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
