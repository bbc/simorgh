/* eslint-disable no-param-reassign */
const dotenv = require('dotenv');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');
const { getClientEnvVars } = require('../src/clientEnvVars');

const DOT_ENV_CONFIG = dotenv.config();

const assetPrefix =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

const isLocal =
  process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN.includes('localhost');

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
    // Only add client env variables and values in local development
    // In preview, test and live, the variables are set on the Lambda function directly and their values only read here
    ...(isLocal
      ? getClientEnvVars(DOT_ENV_CONFIG, { stringify: false })
      : {
          // These are a subset of the env variables that are set on the Lambda function that need exposing to the client
          SIMORGH_BASE_URL: process.env.SIMORGH_BASE_URL,
          SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN:
            process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
          SIMORGH_PUBLIC_STATIC_ASSETS_PATH:
            process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
          SIMORGH_ATI_BASE_URL: process.env.SIMORGH_ATI_BASE_URL,
          SIMORGH_CONFIG_URL: process.env.SIMORGH_CONFIG_URL,
          SIMORGH_INCLUDES_BASE_URL: process.env.SIMORGH_INCLUDES_BASE_URL,
          SIMORGH_INCLUDES_BASE_AMP_URL:
            process.env.SIMORGH_INCLUDES_BASE_AMP_URL,
          SIMORGH_ICHEF_BASE_URL: process.env.SIMORGH_ICHEF_BASE_URL,
          SIMORGH_APP_ENV: process.env.SIMORGH_APP_ENV,
          SIMORGH_CONFIG_CACHE_ITEMS: process.env.SIMORGH_CONFIG_CACHE_ITEMS,
          SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS:
            process.env.SIMORGH_CONFIG_CACHE_MAX_AGE_SECONDS,
          SIMORGH_CONFIG_TIMEOUT_SECONDS:
            process.env.SIMORGH_CONFIG_TIMEOUT_SECONDS,
          SIMORGH_MOST_READ_CDN_URL: process.env.SIMORGH_MOST_READ_CDN_URL,
          SIMORGH_WEBVITALS_REPORTING_ENDPOINT:
            process.env.SIMORGH_WEBVITALS_REPORTING_ENDPOINT,
          SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE:
            process.env.SIMORGH_WEBVITALS_DEFAULT_SAMPLING_RATE,
          SIMORGH_CSP_REPORTING_ENDPOINT:
            process.env.SIMORGH_CSP_REPORTING_ENDPOINT,
          SIMORGH_OPTIMIZELY_SDK_KEY: process.env.SIMORGH_OPTIMIZELY_SDK_KEY,
        }),
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
