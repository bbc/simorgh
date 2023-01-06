/* eslint-disable no-param-reassign */
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');

const assetPrefix =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  assetPrefix,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    externalDir: true,
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /*
   Requires pages that are routed to have the .page extension, e.g. [variant].page.tsx,
   which allows for co-locating components within the pages directory, e.g. styles.ts
   - https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  */
  pageExtensions: ['page.tsx', 'page.ts'],
  webpack: config => {
    // TODO: Figure out why this doesn't fix the Logger.node issue
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
