import snapshotConfig from '../../../support/helpers/snapshotConfig';

export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`Running tests for ${service} ${pageType}`, () => {
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it('Feature Index Page', () => {
        if (
          Cypress.env('APP_ENV') === 'local' &&
          Cypress.browser.isHeadless &&
          snapshotConfig(service)
        ) {
          cy.setCookie('ckns_privacy', 'july2019');
          cy.setCookie('ckns_policy', '111');
          cy.setCookie('ckns_explicit', '1');
          cy.reload();
          cy.document().its('fonts.status').should('equal', 'loaded');

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
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
