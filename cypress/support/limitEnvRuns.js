// Allow tests to be only run on certain environments or if the appropriate
// toggle is enabled for that environment

import defaultToggles from '../../lib/config/toggles';

// For use when behaviour can only be tested locally
export const describeForLocalOnly = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local') {
    describe(name, func);
  }
};

// For use when behaviour can be tested locally and always in the test env
export const describeForLocalAndTest = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local' || Cypress.env('APP_ENV') === 'test') {
    describe(name, func);
  }
};

// For use when testability of behaviour for each envionment is governed by a toggle
export const describeIfToggleEnabled = (toggleName, name, func) => {
  if (defaultToggles(Cypress.env('APP_ENV'))[toggleName]['enabled']) {
    describe(name, func);
  }
};
