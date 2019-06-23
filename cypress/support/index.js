import './commands';
import './pageTestFragmentCommands/header';
import './pageTestFragmentCommands/footer';
import './pageTestFragmentCommands/section';

const configLocal = require('./configLocal');
const configTest = require('./configTest');
// Commented out until we use it
// const configStage = require('./configStage');
const configLive = require('./configLive');

let env;

if (Cypress.env('APP_ENV') === 'local') {
  env = configLocal;
} else if (Cypress.env('APP_ENV') === 'test') {
  env = configTest;
  // Commented out until we use it
  // } else if (Cypress.env('APP_ENV') === 'stage') {
  //   env = configStage;
} else if (Cypress.env('APP_ENV') === 'live') {
  env = configLive;
}
export const config = env; // eslint-disable-line import/prefer-default-export

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
