// Limiting to one service for now
const serviceHasPublishedPromo = service => service === 'persian';

export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({ service, pageType }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Frontpage body', () => {
      before(() => {
        cy.viewport(1008, 768);
      });

      describe('Header', () => {
        it('should have a visually hidden top-level header', () => {
          cy.get('h1').should('have.length', 1);
        });
      });

      describe('Section', () => {
        it('should be labelled by a visible section label for 1008px & 320px layouts', () => {
          cy.viewport(1008, 768);
          cy.get('section')
            .should('have.length.of.at.least', 1)
            .should('be.visible')
            .each($section => {
              cy.wrap($section).within(() => {
                cy.get('h2').should('have.lengthOf', 1);
              });
            });
          cy.viewport(320, 480);
          cy.get('section')
            .should('have.length.of.at.least', 1)
            .should('be.visible')
            .each($section => {
              cy.wrap($section).within(() => {
                cy.get('h2').should('have.lengthOf', 1);
              });
            });
        });

        it('should contain at least one story promo for 1008px & 320px layouts', () => {
          cy.viewport(1008, 768);
          cy.get('section').within(() => {
            cy.get('img')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('h3')
              .should('have.length.of.at.least', 1)
              .should('be.visible')
              .find('a')
              .should('have.attr', 'href');

            cy.get('p').then($el => {
              if ($el.length > 0) {
                cy.get('p')
                  .should('have.length.of.at.least', 1)
                  .should('be.visible');
              }
            });

            cy.get('time')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });

          cy.viewport(320, 480);
          cy.get('section').within(() => {
            cy.get('img')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
            cy.get('h3')
              .should('have.length.of.at.least', 1)
              .should('be.visible')
              .find('a')
              .should('have.attr', 'href');
            // This check would only run for the top stories section and not any other sections
            cy.get('p').then($el => {
              if ($el.length > 0) {
                cy.get('p').eq(0).should('be.visible');
              }
            });

            cy.get('time')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });
        });

        if (
          serviceHasPublishedPromo(service) &&
          Cypress.env('APP_ENV') !== 'local'
        ) {
          it('individual promo should link to corresponding article pages and back navigation should link to frontpage', () => {
            let currentURL = null;
            cy.get('h3')
              .eq(3)
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

            cy.url().then(url => {
              currentURL = url;
              cy.get('h3').eq(3).click();
              cy.go('back');
              cy.url().should('eq', currentURL);
            });
          });
        }
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
