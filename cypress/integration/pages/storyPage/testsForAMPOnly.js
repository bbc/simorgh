import appConfig from '../../../../src/server/utilities/serviceConfigs';
import config from '../../../support/config/services';
import runAMPAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';
import { serviceNumerals } from '../../../../src/app/legacy/containers/MostRead/Canonical/Rank';

export const testsThatAlwaysRunForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsToAlwaysRunForAMPOnly for ${service} ${pageType}`, () => {
    it('If there is a table in the json, display it on the page', () => {
      if (service === 'sport') {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const tableBlock = body.content.blocks.find(
            block => block.type === 'table',
          );
          if (tableBlock) {
            cy.get('table');
          }
        });
      }
    });
    it('Table displays expected number of rows and columns', () => {
      if (service === 'sport') {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const tableBlock = body.content.blocks.find(
            block => block.type === 'table',
          );
          if (tableBlock) {
            const numberOfRows = tableBlock.rows.length;
            cy.get('table')
              .find('tr')
              .then(row => {
                expect(row.length).to.equal(numberOfRows);
                cy.log(
                  `Number of rows in json = ${numberOfRows}. Number of rows displayed on page = ${row.length}`,
                );
                const numberOfColumns = tableBlock.width;
                cy.get('table')
                  .find('tr')
                  .eq(0)
                  .find('th')
                  .then(th => {
                    expect(th.length).to.equal(numberOfColumns);
                    cy.log(
                      `Number of columns in json = ${numberOfColumns}. Number of columns displayed on page = ${th.length}`,
                    );
                  });
              });
          }
        });
      }
    });
    it('Table has a heading', () => {
      if (service === 'sport') {
        cy.request(`${Cypress.env('currentPath')}.json`).then(({ body }) => {
          const tableBlock = body.content.blocks.find(
            block => block.type === 'table',
          );
          if (tableBlock) {
            cy.get('table').find('thead');
          }
        });
      }
    });

    describe('Most Read Component', () => {
      /* These cypress tests are needed as unit tests cannot be run on the jsdom.
       * web workers (which run on amp pages) do not run on the virtual dom.
       */

      const skipServices = ['scotland', 'sport', 'newsround'];

      if (!skipServices.includes(service)) {
        it(`should show the correct number of items for ${service}\`s ${pageType}`, () => {
          const expectedMostReadItems =
            appConfig[config[service].name][variant].mostRead.numberOfItems;
          cy.get('[data-e2e="most-read"]').scrollIntoView();
          cy.get('[data-e2e="most-read"] li').should(
            'have.length',
            expectedMostReadItems,
          );
        });

        it(`should show numerals used for the corresponding ${service} service`, () => {
          const expectedMostReadRank = serviceNumerals(service);
          cy.get('[data-e2e="most-read"]').scrollIntoView();
          cy.get('[data-e2e="most-read"] > amp-script > amp-list div')
            .find('li span')
            .each(($el, index) => {
              expect($el.text()).equal(expectedMostReadRank[index + 1]);
            });
        });

        it(`Most read list should contain hrefs`, () => {
          cy.get('[data-e2e="most-read"]').scrollIntoView();
          cy.get('[data-e2e="most-read"] > amp-script > amp-list div')
            .next()
            .within(() => {
              cy.get('a').should('have.attr', 'href');
            });
        });
      }
    });
  });
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({ service }) => {
  if (Cypress.env('APP_ENV') === 'local') {
    runAMPAdsTests({ service });
  }
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
