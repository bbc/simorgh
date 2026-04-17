/* eslint-disable no-param-reassign */
const path = require('path');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');

const assetPrefix =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-frame-options',
            value: 'DENY',
          },
        ],
      },
      // Service worker headers to allow scope to be set correctly */
      {
        source: '/:service/sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/:service',
          },
          {
            key: 'Cache-Control',
            value:
              'public, stale-if-error=6000, stale-while-revalidate=600, max-age=300',
          },
          { key: 'Content-Type', value: 'application/javascript' },
        ],
      },
      {
        source: '/:service/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, stale-if-error=172800, stale-while-revalidate=172800, max-age=86400',
          },
          { key: 'Content-Type', value: 'application/manifest+json' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:service/sw.js',
        destination: '/sw.js',
      },
      {
        source: '/:service/og/:id',
        destination: '/api/:service/og/:id',
      },
    ];
  },
  allowedDevOrigins: ['localhost.bbc.com'],
  assetPrefix,
  compiler: { emotion: true },
  distDir: 'build',
  env: {
    LOG_TO_CONSOLE: 'true',
    NEXTJS: 'true',
  },
  generateEtags: false,
  output: 'standalone',
  /*
   Requires pages that are routed to have the .page extension, e.g. [variant].page.tsx,
   which allows for co-locating components within the pages directory, e.g. styles.ts
   - https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  */
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ['simorgh'],
  webpack: (config, { webpack, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@scss': path.join(__dirname, '../src/app/components/ThemeProviderSCSSModules'),
    };

    config.plugins.push(
      new MomentTimezoneInclude({ startYear: 2010, endYear: 2026 }),
    );

    /*
      Taken from https://github.com/bbc/simorgh/blob/861c2b50df3d41cdc9e854752a898ed4b1b89727/webpack.config.client.js#L213-L228
    */
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /(.*)logger.node(\.*)/,
          resource => {
            resource.request = resource.request.replace(
              /logger.node/,
              'logger.web',
            );
          },
        ),
      );
    }

    return config;
  },
};
