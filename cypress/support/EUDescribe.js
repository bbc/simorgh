// Allows tests to skipped outside the EU
// Used currently to stop EU specific tests
// from running on servers in the US
const EUDescribe = (name, func) => {
  if (!Cypress.env('SKIP_EU')) {
    describe(name, func);
  }
};

export default EUDescribe;
