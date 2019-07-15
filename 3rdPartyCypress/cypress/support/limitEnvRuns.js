// Allow tests to be skipped on live.

// For use before routes are open in live env
export default (name, func) => {
  if (Cypress.env('APP_ENV') === 'local' || Cypress.env('APP_ENV') === 'test') {
    describe(name, func);
  }
};
