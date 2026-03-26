/* eslint-disable no-param-reassign */
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');

const assetPrefix =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

const isLocal = process.env.SIMORGH_APP_ENV === 'local';

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
    ];
  },
  async rewrites() {
    return [
      // Service worker is registered at the root (e.g. /pidgin) so will work as is on Test/Live
      // but will not work on localhost. This rewrites requests from paths outside of root
      // to the sw.js file found in the 'public' folder, which is served from the root.
      ...(isLocal
        ? [
            {
              source: '/:path/sw.js',
              destination: '/sw.js',
            },
          ]
        : []),
      {
        source: '/:service/og/:id',
        destination: '/api/:service/og/:id',
      },
      // TODO: This can be removed once we redirect variant paths to have variant at the end of the path,
      //  e.g. /serbian/cyr/popular/read -> /serbian/popular/read/cyr
      {
        source: '/:service/:variant/popular/read',
        destination: '/:service/popular/read/:variant',
      },
    ];
  },
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
