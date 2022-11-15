// eslint-disable-next-line import/no-unresolved
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const fs = require('fs');
const path = require('path');
const envConfig = require('../support/config/envs');
const { webpackDirAlias } = require('../../dirAlias');
const MomentTimezoneInclude = require('../../src/app/legacy/psammead/moment-timezone-include/src');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

/* eslint-disable no-param-reassign */
module.exports = (on, config) => {
  config.baseUrl = envConfig(config.env.APP_ENV, config.env.UK).baseUrl;

  // Debugging console logs to see running config
  /* eslint-disable no-console */
  console.log('\n\n\n\n\n');
  console.log('Cypress running config:');
  console.log('SMOKE:', config.env.SMOKE);
  console.log('APP_ENV:', config.env.APP_ENV);
  console.log('UK:', config.env.UK);
  console.log('\n\n\n\n\n');
  /* eslint-enable no-console */

  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          ...webpackDirAlias,
        },
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
              },
            ],
          },
          {
            test: /\.(ts|tsx)$/,
            include: [resolvePath('src')],
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
        ],
      },
      plugins: [new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 })],
    },
    watchOptions: {
      ignored: ['**/tz/**'],
    },
  };

  on('file:preprocessor', webpackPreprocessor(options));

  // Add options for the cypress terminal report (cy.logs) here
  const logPrinterOptions = {
    defaultTrimLength: 2000,
  };
  // eslint-disable-next-line global-require
  require('cypress-terminal-report/src/installLogsPrinter')(
    on,
    logPrinterOptions,
  );

  on('task', {
    log(message) {
      // eslint-disable-next-line no-console
      console.log(message);

      return null;
    },
    table(message) {
      // eslint-disable-next-line no-console
      console.table(message);

      return null;
    },
  });

  return config;
};
