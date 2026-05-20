/* eslint-disable import/no-unresolved */

import { serviceNumerals } from '#app/components/MostRead/Canonical/Rank';
import appConfig from '#src/server/utilities/serviceConfigs';

const MOST_READ_EXCLUDED_SERVICES = ['ukchina'];

export default ({ service, variant = 'default' }) => {
  if (!MOST_READ_EXCLUDED_SERVICES.includes(service)) {
    const {
      mostRead: { hasMostRead, numberOfItems },
    } = appConfig[service][variant];

    if (hasMostRead) {
      describe('Most Read Component', () => {
        beforeEach(() => {
          cy.getToggles(service);
        });

        it('should not render section label', () => {
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"] h2').should('not.exist');
            }
          });
        });

        it(`should render ${numberOfItems} items`, () => {
          cy.fixture(`toggles/${service}.json`).then(toggles => {
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
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            if (toggles.mostRead?.enabled) {
              const expectedMostReadRank = serviceNumerals(service);
              cy.get('[data-e2e="most-read"]').scrollIntoView();
              cy.get('[data-e2e="most-read"]')
                .find('li span[data-e2e="most-read-rank"]')
                .each(($el, index) => {
                  expect($el.text()).equal(expectedMostReadRank[index + 1]);
                });
            }
          });
        });

        it(`should have links with href and title`, () => {
          cy.fixture(`toggles/${service}.json`).then(toggles => {
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
