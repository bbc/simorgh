export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) => {
  describe(`No testsThatFollowSmokeTestConfig to run for ${service} ${pageType}`, () => {
    describe(`Tests for ${service} ${pageType}`, () => {
      it('should have a visually hidden top-level header', () => {
        cy.get('h1').should('have.length', 1);
      });

      it('should have mostread component rendered ', () => {
        cy.get('main').should('have.attr', 'data-e2e', 'most-read');
      });
      if (Cypress.env('APP_ENV') !== 'local') {
        it('should have articles list each linking to article page', () => {
          cy.get('main ol[role="list"]>li')
            .eq(0)
            .within(() => {
              cy.get('a')
                .should('have.attr', 'href')
                .then(href => {
                  cy.request({
                    url: href,
                    failOnStatusCode: false,
                  }).then(resp => {
                    expect(resp.status).to.not.equal(404);
                  });
                });
            });
        });
      }
    });
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
