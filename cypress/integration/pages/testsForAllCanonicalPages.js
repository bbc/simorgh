// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  describe(`No testsThatAlwaysRunForAllCanonicalPages to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  describe(`Running testsThatFollowSmokeTestConfigForAllCanonicalPages for ${service} ${pageType}`, () => {
    if (['photoGalleryPage', 'storyPage'].includes(pageType)) {
      describe('CPS PGL and STY Tests', () => {
        it('should render at least one image', () => {
          cy.get('figure').first().find('img').should('be.visible');
        });
      });
    }
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAllCanonicalPages = ({
  service,
  pageType,
}) => {
  describe(`No testsThatNeverRunDuringSmokeTestingForAllCanonicalPages to run for ${service} ${pageType}`, () => {});
};
