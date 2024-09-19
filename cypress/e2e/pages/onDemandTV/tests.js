/* eslint-disable consistent-return */
import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';
import {
  getEpisodeAvailability,
  videoPlaceholderImageUrl,
} from '../../../support/helpers/onDemandRadioTv';
import getDataUrl from '../../../support/helpers/getDataUrl';
import processRecentEpisodes from '../../../../src/app/routes/utils/processRecentEpisodes';

export default ({ service, pageType, variant }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe(
      'Video Player',
      {
        retries: 3,
      },
      () => {
        it('should render a valid media player', () => {
          cy.getPageDataFromWindow().then(({ pageData }) => {
            if (!getEpisodeAvailability(pageData)) {
              return cy.log(
                `Episode is not available: ${Cypress.env('currentPath')}`,
              );
            }

            cy.get('[data-e2e="media-loader__container"]').should('be.visible');
            cy.get('[data-e2e="media-loader__placeholder"]').within(() => {
              cy.get('div img')
                .should('be.visible')
                .should('have.attr', 'src')
                .should('not.be.empty')
                .and('equal', videoPlaceholderImageUrl(pageData));
            });
          });
        });
      },
      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have a script with src value set to chartbeat source', () => {
            cy.hasScriptWithChartbeatSrc();
          });
          it('should have chartbeat config set to window object', () => {
            cy.hasGlobalChartbeatConfig();
          });
        }
      }),
    );
    describe(`Tests for ${service} ${pageType} ${variant} with toggle use`, () => {
      before(() => {
        cy.getToggles(service);
      });
      describe('Recent Episodes component', () => {
        it('should be displayed if the toggle is on, and shows the expected number of items', function test() {
          cy.fixture(`toggles/${service}.json`).then(toggles => {
            const recentEpisodesEnabled = path(
              ['recentVideoEpisodes', 'enabled'],
              toggles,
            );
            cy.log(
              `Recent Episodes component enabled? ${recentEpisodesEnabled}`,
            );
            // There cannot be more episodes shown than the max allowed
            if (recentEpisodesEnabled) {
              const recentEpisodesMaxNumber = path(
                ['recentVideoEpisodes', 'value'],
                toggles,
              );
              const currentPath = Cypress.env('currentPath');
              const url =
                Cypress.env('APP_ENV') === 'test'
                  ? `${currentPath}?renderer_env=live`
                  : `${currentPath}`;

              cy.request(getDataUrl(url)).then(({ body }) => {
                const episodeId = path(['content', 'blocks', 0, 'id'], body);

                const expectedNumberOfEpisodes = processRecentEpisodes(body, {
                  exclude: episodeId,
                  recentEpisodesLimit: recentEpisodesMaxNumber,
                }).length;

                cy.log(
                  `Number of available episodes? ${expectedNumberOfEpisodes}`,
                );
                // More than one episode expected
                if (expectedNumberOfEpisodes > 1) {
                  cy.get('[data-e2e=recent-episodes-list]').should('exist');

                  cy.get('[data-e2e=recent-episodes-list]').within(() => {
                    cy.get('[data-e2e=recent-episodes-list-item]')
                      .its('length')
                      .should('eq', expectedNumberOfEpisodes);
                  });
                }
                // If there is only one item, it is not in a list
                else if (expectedNumberOfEpisodes === 1) {
                  cy.get('aside[aria-labelledby=recent-episodes]').within(
                    () => {
                      cy.get('[data-e2e="recent-episodes-list"]').should(
                        'not.exist',
                      );
                    },
                  );
                }
                // No items expected
                else {
                  cy.get('aside[aria-labelledby=recent-episodes]').should(
                    'not.exist',
                  );

                  cy.log('No episodes present or available');
                }
              });
            }
            // Not toggled on for this service
            else {
              cy.get('[data-e2e=recent-episodes-list]').should('not.exist');
              cy.log('Recent episodes is not toggled on for this service');
            }
          });
        });
      });
    });
  });
};
