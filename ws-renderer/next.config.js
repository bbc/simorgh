/* eslint-disable no-param-reassign */
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');

module.exports = {
  distDir: 'build',
  experimental: {
    externalDir: true,
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Requires pages that are routed to have the .page extension, e.g. User.page.tsx
  pageExtensions: ['page.tsx', 'page.ts'],
  webpack: config => {
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
