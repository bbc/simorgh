/* eslint-disable no-param-reassign */
const { webpackDirAlias } = require('../dirAlias');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');

module.exports = {
  experimental: {
    externalDir: true,
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackDirAlias,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.plugins.push(
      new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
    );

    return config;
  },
};
