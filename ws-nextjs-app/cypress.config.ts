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

      // Debugging console logs to see running config
      /* eslint-disable no-console */
      console.log('\n\n\n\n\n');
      console.log('Cypress running config:');
      // console.log('SMOKE:', config.env.SMOKE);
      console.log('APP_ENV:', config.env.APP_ENV);
      console.log('Base URL:', config.baseUrl);
      // console.log('UK:', config.env.UK);
      console.log('\n\n\n\n\n');
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
      isNextJs: true,
      live: {
        baseUrl: 'https://www.bbc.com',
      },
      test: {
        baseUrl: 'https://www.test.bbc.com',
      },
      local: {
        baseUrl: 'http://localhost.bbc.com:7081',
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
