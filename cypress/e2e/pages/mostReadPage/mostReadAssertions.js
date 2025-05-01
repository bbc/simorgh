/* eslint-disable import/no-unresolved */
import appConfig from '#src/server/utilities/serviceConfigs';
import { getMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import { serviceNumerals } from '#app/components/MostRead/Canonical/Rank';
import config from '#cypress/support/config/services';
import getAppEnv from '#cypress/support/helpers/getAppEnv';
import ampOnlyServices from '#cypress/support/helpers/ampOnlyServices';

// news, newsround, and sport are services we serve on amp, but do not want to run most read tests on
const MOST_READ_EXCLUDED_SERVICES = [...ampOnlyServices, 'ukchina'];

export const crossPlatform = ({ service, variant = 'default' }) => {
  const serviceID = config[service]?.name || service;

  if (!MOST_READ_EXCLUDED_SERVICES.includes(serviceID)) {
    const {
      mostRead: { hasMostRead, numberOfItems },
    } = appConfig[serviceID][variant];

    if (hasMostRead) {
      describe('Most Read Component', () => {
        beforeEach(() => {
          cy.getToggles(serviceID);
        });
        it(`should render ${numberOfItems} items`, () => {
          cy.fixture(`toggles/${serviceID}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"] li').should(
                'have.length',
                numberOfItems,
              );
            }
          });
        });

        it(`should show correct numerals`, () => {
          cy.fixture(`toggles/${serviceID}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              const expectedMostReadRank = serviceNumerals(serviceID);
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"]')
                .find('li span')
                .each(($el, index) => {
                  expect($el.text()).equal(expectedMostReadRank[index + 1]);
                });
            }
          });
        });

        it(`should have links with href and title`, () => {
          cy.fixture(`toggles/${serviceID}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"]').within(() => {
                cy.get('a').each($el => {
                  cy.wrap($el)
                    .should('not.be.empty') // ensures that the link has text
                    .should('have.attr', 'href')
                    .should('not.be.empty'); // ensures that the href is not empty
                });
              });
            }
          });
        });
      });
    }
  }
};

export const ampOnly = ({ service, variant = 'default' }) => {
  const serviceID = config[service]?.name || service;

  if (!MOST_READ_EXCLUDED_SERVICES.includes(serviceID)) {
    const {
      mostRead: { hasMostRead },
    } = appConfig[serviceID][variant];
    if (hasMostRead) {
      describe('Most Read Component', () => {
        beforeEach(() => {
          cy.getToggles(serviceID);
        });
        it('should not render when data fetch fails', () => {
          const mostReadPath = getMostReadEndpoint({
            service: serviceID,
            variant: variant !== 'default' && variant,
            isBff: getAppEnv() !== 'local',
          });
          cy.intercept(
            {
              method: 'GET',
              pathname: mostReadPath,
            },
            { statusCode: 404 },
          );
          cy.reload();
          cy.fixture(`toggles/${serviceID}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"] li').should('not.exist');
            }
          });
        });
      });
    }
  }
};
