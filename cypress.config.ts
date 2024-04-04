/* eslint-disable no-param-reassign */
import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import fs from 'fs';
import path from 'path';
import MomentTimezoneInclude from './src/app/legacy/psammead/moment-timezone-include/src';
import { webpackDirAlias } from './dirAlias';

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'cypress/reporter-config.json',
  },
  e2e: {
    setupNodeEvents(on, config) {
      if (!config.env.APP_ENV) {
        config.env.APP_ENV = 'local';
      }

      const appEnv = config.env.APP_ENV;
      const env = config.env[appEnv];

      config.baseUrl = env.baseUrl;

      // Debugging console logs to see running config
      /* eslint-disable no-console */
      console.log('\n\n\n\n\n');
      console.log('Cypress running config:');
      console.log('SMOKE:', config.env.SMOKE);
      console.log('APP_ENV:', config.env.APP_ENV);
      console.log('UK:', config.env.UK);
      console.log('ONLY_SERVICE:', config.env.ONLY_SERVICE || '');
      console.log('SKIP_EU:', Boolean(config.env.SKIP_EU));
      console.log('\n\n\n\n\n');
      /* eslint-enable no-console */

      const options = {
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
          plugins: [
            // @ts-expect-error - TODO: fix types
            new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
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
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
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
        error(message) {
          // eslint-disable-next-line no-console
          console.error(message);
          return null;
        },
      });

      return config;
    },
    env: {
      APP_ENV: 'local',
      SMOKE: true,
      UK: false,
      live: {
        baseUrl: 'https://www.bbc.com',
      },
      test: {
        baseUrl: 'https://www.test.bbc.com',
      },
      local: {
        baseUrl: 'http://localhost:7080',
      },
    },
    testIsolation: false,
    excludeSpecPattern: [
      '**/README.md',
      '**/pages/**/tests.js',
      '**/pages/**/urls.js',
      '**/pages/**/testsForAMPOnly.js',
      '**/*/pages/**/testsForCanonicalOnly.js',
      '**/pages/testsForAllPages.js',
      '**/pages/testsForAllAMPPages.js',
      '**/pages/testsForAllCanonicalPages.js',
      '**/pages/**/helper.js',
      '**/pages/**/helpers.js',
      '**/pages/**/getErrorPath.js',
      '**/pages/**/mostReadAssertions.js',
      '**/123PlaygroundForTests/**',
      '**/specialFeatures/utilities/**',
      '**/specialFeatures/**/testsForAMPOnly.js',
      '**/specialFeatures/**/testsForCanonicalOnly.js',
      '**/specialFeatures/**/config.js',
    ],
  },
  video: false,
  screenshotOnRunFailure: false,
  blockHosts: 'gn-web-assets.api.bbc.com',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 100000,
  responseTimeout: 50000,
  chromeWebSecurity: false,
});
