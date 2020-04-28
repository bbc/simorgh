// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = () => {};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${Cypress.env('currentPath')}.amp`,
          200,
          'text/html',
        );
      });
    });

    it('should contain an amp-img', () => {
      cy.get('li')
        .should('be.visible')
        .within(() => {
          cy.get('amp-img').should('be.visible');
        });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = () => {};
