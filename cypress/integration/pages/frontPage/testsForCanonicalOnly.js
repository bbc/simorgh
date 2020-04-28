// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.

export const testsThatAlwaysRunForCanonicalOnly = () => {};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should not have an AMP attribute', () => {
      cy.get('html').should('not.have.attr', 'amp');
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = () => {};
