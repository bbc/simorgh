// Allows tests to skipped on live.
// Used currently to stop persian tests running on
// live due to them not yet being routed in the STMs
const skipLiveDescribe = (name, func) => {
  if (Cypress.env('APP_ENV') !== 'live') {
    describe(name, func);
  }
};

export default skipLiveDescribe;
