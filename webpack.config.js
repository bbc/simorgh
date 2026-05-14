/* eslint-disable import/no-dynamic-require, global-require */
const { merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const MomentTimezoneInclude = require('./src/app/legacy/psammead/moment-timezone-include/src');
const { webpackDirAlias } = require('./dirAlias');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const IS_PROD = process.env.NODE_ENV === 'production';
const START_DEV_SERVER = !IS_PROD;
const IS_PROD_PROFILE = process.env.IS_PROD_PROFILE === 'true';
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

const getBaseConfig = BUNDLE_TYPE => ({
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // resolves `import '../Foo'` to `../Foo/index.jsx`
    alias: {
      ...webpackDirAlias,
      ...(IS_PROD_PROFILE && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      }),
      'safe-buffer': path.resolve(__dirname, 'node_modules/safe-buffer'),
    },
  },
  devServer: {
    devMiddleware: {
      stats,
    },
  },
  stats,
  node: {
    // tell Webpack to provide a polyfill for this functionality.
    __filename: true,
    __dirname: true,
  },
  /**
   * Remove all default timezone data and allow importing it via import
   * '@bbc/moment-timezone-include/tz/Europe/London'. Restrict data
   * between 2010 (earliest articles using ATI, so likely earliest timestamps
   * we will find via most read) and 2025 which is soon enough to save space,
   * but long enough that we dont need to worry about forgetting it.
   */
  plugins: [new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 })],
  watchOptions: {
    ignored: ['**/tz/**'],
  },
  module: {
    rules: [
      // tell Webpack to use the .babelrc to know how to transform JS/JSX to ES2015 JS
      {
        test: /\.(js|jsx|mjs)$/,
        include: [resolvePath('src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: BUNDLE_TYPE,
              babelrc: true,
              cacheDirectory: true,
              presets: [],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      IS_PROD
        ? {
            test: /\.(js|jsx|mjs)$/,
            include: [resolvePath('node_modules/@bbc')],
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [],
                  plugins: [],
                },
              },
            ],
          }
        : {},
    ],
  },
  // Bundle sizes are monitored by `./scripts/bundleSize.js`
  performance: {
    hints: false,
  },
});

// `shell` parameter populated via CLI, e.g. --env.platform=web
module.exports = (shell = {}) => {
  const CONFIG_FILE = shell.config;
  const CLIENT_LEGACY = ['client', 'legacy'];
  const CLIENT_MODERN = ['client', 'modern'];
  const SERVER = ['server'];

  const mergeIntoBaseConfig = ([app, BUNDLE_TYPE]) => {
    const baseConfig = getBaseConfig(BUNDLE_TYPE);
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_PROD,
      START_DEV_SERVER,
      IS_PROD_PROFILE,
      BUNDLE_TYPE,
    });
    return merge(baseConfig, specialisedConfig);
  };

  // if we've passed env.config, just compile that one file
  if (CONFIG_FILE === 'client') {
    return [CLIENT_LEGACY, CLIENT_MODERN].map(mergeIntoBaseConfig);
  }
  if (CONFIG_FILE === 'server') {
    return mergeIntoBaseConfig(SERVER);
  }

  // else compile both (we've run `webpack` on its own)
  return [CLIENT_LEGACY, CLIENT_MODERN, SERVER].map(mergeIntoBaseConfig);
};
