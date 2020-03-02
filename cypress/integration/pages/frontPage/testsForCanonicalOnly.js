// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
import useAppToggles from '../../../support/helpers/useAppToggles';

// Limiting to two services
const serviceHasMostRead = service => ['persian', 'yoruba'].includes(service);

export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should not have an AMP attribute', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
    // Once the most read is implemented for amp and all other pages this test will be moved to testforallpages
    if (serviceHasMostRead(service)) {
      it('should contain most read component if the toggle is enabled', () => {
        if (useAppToggles.mostRead) {
          // For testing most read renders when ARES endpoint returns correctly.
          cy.get('[data-e2e="most-read"]').should('be.visible');
        }
      });
    }
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
