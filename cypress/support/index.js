import './commands';

let env;

if (Cypress.env('APP_ENV') === 'local') {
  env = require('./configLocal'); // eslint-disable-line
} else if (Cypress.env('APP_ENV') === 'test') {
  env = require('./configTest'); // eslint-disable-line
} else if (Cypress.env('APP_ENV' === 'stage')) {
  env = require('./configStage'); // eslint-disable-line
} else if (Cypress.env('APP_ENV' === 'live')) {
  env = require('./configLive'); // eslint-disable-line
}
export const config = env; // eslint-disable-line import/prefer-default-export

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
