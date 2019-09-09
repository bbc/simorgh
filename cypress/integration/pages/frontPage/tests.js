import * as moment from 'moment-timezone';
import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';
// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.

// Defaulting to false for now whilst we look to improve the index also's test coverage to cater for the varying scenarios: https://github.com/bbc/simorgh/issues/3586
const serviceHasIndexAlsos = () => false;

const serviceHasTimestamp = service => service === 'thai';

export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`Running testsToAlwaysRun for ${service} ${pageType}`, () => {
    if (serviceHasTimestamp(service)) {
      it('should render a formatted timestamp in the top story', () => {
        cy.request(`${config[service].pageTypes.frontPage.path}.json`).then(
          ({ body }) => {
            const { language } = body.metadata;
            const { timestamp } = body.content.groups[0].items[0];
            const formattedTimestamp = moment
              .tz(timestamp, `${appConfig[service].timezone}`)
              .locale(language)
              .format('D MMMM YYYY');
            cy.get('section')
              .eq(0)
              .within(() => {
                cy.get('div div time').should('contain', formattedTimestamp);
              });
          },
        );
      });
    }
  });
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
                  .should('be.hidden');
              }
            });

            cy.get('time')
              .should('have.length.of.at.least', 1)
              .should('be.visible');
          });
        });

        if (serviceHasIndexAlsos(service)) {
          it('should contain Index Alsos at a mobile view', () => {
            cy.viewport('iphone-5');
            cy.get('section li')
              .eq(0)
              .within(() => {
                cy.get('div div div a')
                  .eq(0)
                  .within(() => {
                    cy.get('span').then($el => {
                      if ($el.length > 1) {
                        cy.get('svg').should('be.visible');
                      } else {
                        expect($el).not.to.have.descendants('svg');
                      }
                    });
                  });
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
