// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllAMPPages = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPPages to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsForAllAMPPages for ${service} ${pageType}`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllAMPPages = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPPages to run for ${service} ${pageType}`, () => {});
};
