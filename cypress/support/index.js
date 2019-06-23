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

switch (Cypress.env('APP_ENV')) {
  default:
    env = null;
    break;
  case 'local':
    env = configLocal;
    break;
  case 'test':
    env = configTest;
    break;
  // Commented out until we use it
  // case 'stage':
  //   env = configStage;
  //   break;
  case 'live':
    env = configLive;
    break;
}

export const config = env; // eslint-disable-line import/prefer-default-export

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
