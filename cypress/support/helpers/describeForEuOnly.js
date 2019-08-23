/**
 * Travis servers are based in USA so EU-specific behaviour cannot be tested.
 * Therefore skip these tests on Travis.
 */
const describeForEuOnly = (name, func) => {
  if (!Cypress.env('SKIP_EU')) {
    describe(name, func);
  }
};

export default describeForEuOnly;
