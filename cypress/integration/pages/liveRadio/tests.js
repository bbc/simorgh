import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Live Radio body', () => {
      it('should render a H1, which contains/displays a styled headline', () => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          const [{ text: headline }] = body.content.blocks;
          cy.get('h1').should('contain', headline);
        });
      });

      it('should render a paragraph, which contains/displays a styled summary', () => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          const { text } = body.content.blocks[1];
          cy.get('[role="main"] p').should('contain', text);
        });
      });
    });

    describe('LinkedData', () => {
      // will be addressed by this https://github.com/bbc/simorgh/issues/3117
      it.skip('should include mainEntityOfPage in the LinkedData', () => {
        cy.get('script[type="application/ld+json"]')
          .should('contain', 'mainEntityOfPage')
          .and('contain', 'headline');
      });
    });
    describe(`Visual comparison tests for ${service} ${pageType}`, () => {
      it('Live Radio', () => {
        if (Cypress.env('APP_ENV') === 'local' && Cypress.browser.isHeadless) {
          cy.document().its('fonts.status').should('equal', 'loaded');
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(3000);
          cy.matchImageSnapshot();
        } else {
          cy.log('Snapshot skipped in headed mode');
        }
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
