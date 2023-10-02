/* eslint-disable no-param-reassign */
const dotenv = require('dotenv');
const MomentTimezoneInclude = require('../src/app/legacy/psammead/moment-timezone-include/src');
const { getClientEnvVars } = require('../src/clientEnvVars');

const DOT_ENV_CONFIG = dotenv.config();
const clientEnvVars = getClientEnvVars(DOT_ENV_CONFIG, { stringify: false });

const assetPrefix =
  clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN +
  clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_PATH;

/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: clientEnvVars.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN.includes(
    'localhost',
  )
    ? undefined
    : assetPrefix,
  compiler: {
    emotion: true,
  },
  distDir: 'build',
  env: { ...clientEnvVars, LOG_TO_CONSOLE: 'true', NEXTJS: 'true' },
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateEtags: false,
  output: 'standalone',
  pageExtensions: ['page.tsx', 'page.ts'],
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: [],
  webpack: (config, { webpack, isServer }) => {
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

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};
