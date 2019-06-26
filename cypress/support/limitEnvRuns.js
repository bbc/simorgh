// Allow tests to skipped on live or test and live.
// Used currently to stop persian tests running on
// live due to them not yet being routed in the STMs

// For use before routes are open in test env
export const describeForLocalOnly = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local') {
    describe(name, func);
  }
};

// For use before routes are open in live env
export const describeForLocalAndTest = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local' || Cypress.env('APP_ENV') === 'test') {
    describe(name, func);
  }
};

export const describeForLocalAndLive = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local' || Cypress.env('APP_ENV') === 'live') {
    describe(name, func);
  }
};
