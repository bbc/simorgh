/* eslint-disable no-param-reassign */
import { defineConfig } from 'cypress';

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

      config.baseUrl = env.baseUrl;
      /* eslint-enable no-console */

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
