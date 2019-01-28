/* eslint-disable import/no-dynamic-require, global-require */
const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const getEnv = require('./src/server/env');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

// Load in environment variables configured in `.env` files.
const DOT_ENV_CONFIG = getEnv();

// `shell` parameter populated via CLI, e.g. --env.platform=web
module.exports = (shell = {}) => {
  const APP_ENV = process.env.APP_ENV || 'live';
  const IS_PROD = process.env.NODE_ENV === 'production';
  const IS_CI = process.env.CI;
  const START_DEV_SERVER = !IS_PROD;
  const CONFIG_FILE = shell.config;
  const stats = IS_PROD
    ? {}
    : {
        // reduce verbosity of console output
        assets: false,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: false,
        version: false,
        warnings: true,
        colors: true, // color the console output in terminal
        entrypoints: false,
      };

  const baseConfig = {
    mode: IS_PROD ? 'production' : 'development',
    devtool: IS_PROD ? 'source-map' : 'cheap-eval-source-map',
    resolve: { extensions: ['.js', '.jsx'] }, // resolves `import '../Foo'` to `../Foo/index.jsx`
    node: {
      __dirname: false,
    },
    devServer: {
      stats,
    },
    stats,
    module: {
      rules: [
        // tell Webpack to use the .babelrc to know how to transform JS/JSX to ES2015 JS
        {
          test: /\.(js|jsx|mjs)$/,
          include: /src/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                cacheDirectory: true,
                presets: [],
              },
            },
          ],
        },
        {
          test: /\.(png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name]-[hash:8].[ext]',
                publicPath: '/',
              },
            },
          ],
        },
      ],
    },
    // This is to override bundle performance test. @TODO explain better
    performance: IS_CI
      ? {
          maxAssetSize: 245760, // 240kb - individual bundles
          maxEntrypointSize: 491520, // 480kb - total bundles
        }
      : undefined,
  };

  const mergeIntoBaseConfig = app => {
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_PROD,
      IS_CI,
      START_DEV_SERVER,
      APP_ENV,
      DOT_ENV_CONFIG,
    });
    return merge(baseConfig, specialisedConfig);
  };

  // if we've passed env.config, just compile that one file
  if (CONFIG_FILE) {
    return mergeIntoBaseConfig(CONFIG_FILE);
  }
  // else compile both (we've run `webpack` on its own)
  return ['client', 'server'].map(mergeIntoBaseConfig);
};
