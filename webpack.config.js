/* eslint-disable import/no-dynamic-require, global-require */
const merge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const MomentTimezoneInclude = require('@bbc/moment-timezone-include');
const { webpackDirAlias } = require('./dirAlias');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

// `shell` parameter populated via CLI, e.g. --env.platform=web
module.exports = (shell = {}) => {
  const IS_PROD = process.env.NODE_ENV === 'production';
  const IS_CI = process.env.CI;
  const START_DEV_SERVER = !IS_PROD;
  const IS_PROD_PROFILE = process.env.IS_PROD_PROFILE === 'true';
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
    resolve: {
      extensions: ['.js', '.jsx'], // resolves `import '../Foo'` to `../Foo/index.jsx`
      alias: {
        ...webpackDirAlias,
        /*
           This is needed to avoid multiple versions of isarray in multiple chunks.
           It tells it to use a single version, in a single location.
        */
        isarray: path.resolve(__dirname, 'node_modules/isarray'),
        ...(IS_PROD_PROFILE && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
      },
    },
    devServer: {
      stats,
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
                babelrc: true,
                cacheDirectory: true,
                presets: [],
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
                    plugins: [
                      [
                        'transform-react-remove-prop-types',
                        {
                          mode: 'remove',
                          removeImport: true,
                        },
                      ],
                    ],
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
  };

  const mergeIntoBaseConfig = app => {
    const specialisedConfig = require(`./webpack.config.${app}.js`)({
      resolvePath,
      IS_PROD,
      IS_CI,
      START_DEV_SERVER,
      IS_PROD_PROFILE,
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
