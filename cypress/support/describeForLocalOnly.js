// Allows tests to skipped on live.
// Used currently to stop persian tests running on
// live due to them not yet being routed in the STMs
const describeForLocalOnly = (name, func) => {
  if (Cypress.env('APP_ENV') === 'local') {
    describe(name, func);
  }
};

export default describeForLocalOnly;
