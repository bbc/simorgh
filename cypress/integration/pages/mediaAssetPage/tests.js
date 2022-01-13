// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsThatAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it.only('Media Asset Page', () => {
        if (Cypress.env('APP_ENV') === 'local' && Cypress.browser.isHeadless) {
          cy.matchImageSnapshot();
        } else {
          cy.log('Snapshot skipped in headed mode');
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsThatNeverRunDuringSmokeTesting to run for ${service} ${pageType}`, () => {});
};
