/* eslint-disable no-param-reassign */
const dotenv = require('dotenv');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');
const { getClientEnvVars } = require('../src/clientEnvVars');

const DOT_ENV_CONFIG = dotenv.config();
const clientEnvVars = getClientEnvVars(DOT_ENV_CONFIG, { stringify: false });

const assetPrefix =
  clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  assetPrefix: clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN.includes(
    'localhost',
  )
    ? undefined
    : assetPrefix,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    externalDir: true,
  },
  env: clientEnvVars,
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
  webpack: (config, { webpack, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.plugins.push(
      new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
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
