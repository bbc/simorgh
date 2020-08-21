// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
const serviceHasAds = service => service === 'afrique';

export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should not have an AMP attribute', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
  });
  describe('Ads', () => {
    if (serviceHasAds(service) && Cypress.env('APP_ENV') !== 'local') {
      it('should render an ad slot', () => {
        cy.url().then(url => {
          let currentURL = null;
          currentURL = url;
          cy.mockGeolocation();
          cy.visit(currentURL);
          cy.get('[data-e2e=advertisement]').should('be.visible');
        });
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
