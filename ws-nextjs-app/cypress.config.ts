// biome-ignore-all lint/style/noCommonJs: we want this
/* eslint-disable no-param-reassign */

import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import { DefinePlugin } from 'webpack';

import { webpackDirAlias } from '../dirAlias';
import MomentTimezoneInclude from '../src/app/legacy/psammead/moment-timezone-include/src';

export default defineConfig({
  // Consider moving 'retries' to a per-test level once we have more tests
  retries: 3,
  e2e: {
    setupNodeEvents(on, config) {
      if (!config.env.APP_ENV) {
        config.env.APP_ENV = 'local';
      }
      const appEnv = config.env.APP_ENV;
      const env = config.env[appEnv];

      const { parsed } = dotenv.config({
        path: `./envConfig/${config.env.APP_ENV}.env`,
      });

      const appConfig = parsed as Record<string, string>;
      const envVars = Object.keys(appConfig).reduce((vars, key) => {
        vars[key] = JSON.stringify(appConfig[key]);
        return vars;
      }, {});

      config.baseUrl = env.baseUrl;
      /* eslint-enable no-console */

      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: webpackDirAlias,
          },
          module: {
            rules: [
              {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'swc-loader',
                options: {
                  jsc: {
                    parser: {
                      syntax: 'typescript',
                      tsx: true,
                    },
                  },
                },
              },
            ],
          },
          plugins: [
            MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
            new DefinePlugin({
              process: { env: envVars },
            }),
          ],
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
      require('cypress-terminal-report/src/installLogsPrinter')(
        on,
        logPrinterOptions,
      );

      on('task', {
        log(_message) {
          return null;
        },
        table(_message) {
          return null;
        },
        error(_message) {
          return null;
        },
      });

      return config;
    },
    env: {
      APP_ENV: 'local',
      SMOKE: true,
      UK: false,
      isNextJs: true,
      live: {
        baseUrl: 'https://www.bbc.com',
      },
      test: {
        baseUrl: 'https://www.test.bbc.com',
      },
      local: {
        baseUrl: 'http://localhost:7081',
      },
    },
    testIsolation: false,
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  reporter: '../node_modules/cypress-multi-reporters/index.js',
  reporterOptions: {
    configFile: 'cypress/reporter-config.json',
  },
  responseTimeout: 70000,
  requestTimeout: 60000,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
});
