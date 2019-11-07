import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// Limiting to only one service
const serviceHasIndexAlsos = service => service === 'thai';
// Limiting to one service for now
const serviceHasPublishedPromo = service => service === 'persian';

export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
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
        it('should be labelled by a visible section label', () => {
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

        it('should contain at least one story promo', () => {
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

            cy.get('p').then($el => {
              if ($el.length > 0) {
                cy.get('p')
                  .eq(0)
                  .should('be.visible');
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
              cy.get('h3')
                .eq(3)
                .click();
              cy.go('back');
              cy.url().should('eq', currentURL);
            });
          });
        }

        it('should contain Index Alsos if relatedItems block exists, but only within topstories block', () => {
          cy.request(`${config[service].pageTypes.frontPage.path}.json`).then(
            ({ body }) => {
              const topstories = body.content.groups[0].items[0];
              const relatedItemsExists = 'relatedItems' in topstories;

              if (relatedItemsExists && serviceHasIndexAlsos(service)) {
                cy.get('[aria-labelledby="Top-stories"]')
                  .eq(0)
                  .within(() => {
                    cy.get('div[data-e2e=index-alsos]')
                      .eq(0)
                      .within(() => {
                        cy.get('h4')
                          .eq(0)
                          .then($el => {
                            expect($el.text()).includes(
                              `${appConfig[service].default.translations.relatedContent}`,
                            );
                          });

                        if (topstories.relatedItems.length > 1) {
                          cy.get('ul li a').should('be.visible');
                        } else {
                          cy.get('div').within(() => {
                            cy.get('a span').should('be.visible');
                          });
                        }
                      });
                  });

                cy.get('section')
                  .eq(1)
                  .within(() => {
                    cy.get('div[class^="StyledIndexAlsos"]').should(
                      'not.exist',
                    );
                  });
              }
            },
          );
        });
        it('should contain Useful Links if usefulLinks block data exists', () => {
          cy.request(`${config[service].pageTypes.frontPage.path}.json`).then(
            ({ body }) => {
              const pageData = body.content.groups;
              const usefulLinks = pageData.find(data => {
                return data.type === 'useful-links';
              });

              const contentTypes = [
                'Text',
                'Feature',
                'Audio',
                'Video',
                'Gallery',
                'Guide',
              ];

              let usefulLinksItems = [];
              if (usefulLinks) {
                usefulLinksItems = usefulLinks.items.filter(item => {
                  return (
                    item.assetTypeCode === 'PRO' &&
                    contentTypes.includes(item.contentType)
                  );
                });
              }

              const isValidUsefulLinks =
                usefulLinks &&
                'strapline' in usefulLinks &&
                usefulLinksItems.length;

              if (isValidUsefulLinks) {
                //  We include the hasStrapline as we don't render Useful Links
                //  if we don't receive a strapline in the data
                cy.get('[aria-labelledby="Useful-links"]').should('be.visible');
              } else {
                cy.get('[aria-labelledby="Useful-links"]').should(
                  'not.be.visible',
                );
              }
            },
          );
        });
      });
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
