import runCanonicalAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';

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
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service}`, () => {
    describe(`US Election Banner`, () => {
      it('should have US Election banner for Hindi, Arabic, Portuguese, Mundo, Persian, Russian', () => {
        const servicesWithBanner = [
          'hindi',
          'arabic',
          'portuguese',
          'mundo',
          'persian',
          'russian',
        ];
        if (servicesWithBanner.includes(service)) {
          cy.get('[class^="gel-wrap"]').should('be.visible');
          cy.get('[class^="IndexPageContainer-sc-1yb6vt4-0"]').should(
            'be.visible',
          );
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
