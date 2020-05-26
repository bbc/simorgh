// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Brand image visible above 400px, not visible below 400px', () => {
      let override;
      it(`Should display image on default viewport (1000x660))`, () => {
        if (Cypress.env('APP_ENV')) {
          override = '?renderer_env=live';
        } else {
          override = '';
        }
        cy.request(`${Cypress.env('currentPath')}.json${override}`);
        cy.get('div[class^="ImageContainer"]').find('img');
      });

      it(`Should not display image on iphone-6 screen (375x667)`, () => {
        cy.viewport('iphone-6');

        cy.request(`${Cypress.env('currentPath')}.json${override}`);
        cy.get('div[class^="ImageContainer"]')
          .find('img')
          .should('not.be.visible');
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
