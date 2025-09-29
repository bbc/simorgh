/* eslint-disable no-param-reassign */
import { defineConfig } from 'cypress';
import fs from 'fs';
import path from 'path';
import MomentTimezoneInclude from '../src/app/legacy/psammead/moment-timezone-include/src'
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { DefinePlugin } from 'webpack';
import dotenv from 'dotenv';

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

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

      const appConfig = parsed as Record<string, string>
      const envVars = Object.keys(appConfig).reduce((vars, key) => {
        vars[key] = JSON.stringify(appConfig[key]);
        return vars;
      }, {});

      config.baseUrl = env.baseUrl;

      // Debugging console logs to see running config
      /* eslint-disable no-console */
      console.log('\n\n\n\n\n');
      console.log('Cypress running config:');
      console.log('SMOKE:', config.env.SMOKE);
      console.log('APP_ENV:', config.env.APP_ENV);
      console.log('Base URL:', config.baseUrl);
      // console.log('UK:', config.env.UK);
      console.log('\n\n\n\n\n');
      /* eslint-enable no-console */

      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
              '#src': resolvePath('../src'),
              '#app': resolvePath('../src/app'),
              '#psammead': resolvePath('../src/app/legacy/psammead'),
              '#lib': resolvePath('../src/app/lib/'),
            },
          },
          module: {
            rules: [
              {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react',
                      '@babel/preset-typescript',
                    ],
                  },
                },
              },
            ],
          },
          plugins: [
            // @ts-expect-error - TODO: fix types
            new MomentTimezoneInclude({ startYear: 2010, endYear: 2025 }),
            new DefinePlugin({
              process: {
                env: envVars,
              },
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
  responseTimeout: 60000,
  requestTimeout: 60000,
  video: false,
  screenshotOnRunFailure: false,
});
