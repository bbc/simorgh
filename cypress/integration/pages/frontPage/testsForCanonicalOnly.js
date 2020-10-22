import path from 'ramda/src/path';
import runCanonicalAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import config from '../../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({ service }) => {
  if (Cypress.env('APP_ENV') === 'local') {
    runCanonicalAdsTests({ service });
  }

  describe(`US Election Banner`, () => {
    it('should have US Election banner if toggle is enabled', () => {
      cy.getToggles(config[service].name);
      cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
        const usElectionBannerEnabled = path(
          ['us2020ElectionBanner', 'enabled'],
          toggles,
        );
        if (usElectionBannerEnabled) {
          cy.get('[data-e2e="us-election-banner"]').should('be.visible');
        } else {
          cy.log('This service is not expected to have the banner');
        }
      });
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
