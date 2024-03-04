/* eslint-disable no-param-reassign */
const dotenv = require('dotenv');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');
const { getClientEnvVars } = require('../src/clientEnvVars');

const DOT_ENV_CONFIG = dotenv.config();

const assetPrefix =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

const isLocal =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN?.includes('localhost');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  assetPrefix: isLocal ? undefined : assetPrefix,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    externalDir: true,
  },
  env: {
    // ...(isLocal
    //   ? // Add all env variables to the client when running locally
    //     getClientEnvVars(DOT_ENV_CONFIG, { stringify: false })
    //   : {
    //       // Expose subset of env variables to the client when on preview, test or live
    //       // The rest are set directly on the Lambda and accessible via process.env on the server
    //       SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
    //       SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
    //       SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV,
    //     }),
    LOG_TO_CONSOLE: 'true',
    NEXTJS: 'true',
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
