/* eslint-disable consistent-return */
import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';
import {
  getEpisodeAvailability,
  videoPlaceholderImageUrl,
} from '../../../support/helpers/onDemandRadioTv';

export default ({ service, pageType, variant, isLite }) => {
  describe(`Tests for ${service} ${pageType}${isLite ? ' - isLite' : ''}`, () => {
    if (!isLite) {
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

              cy.get('[data-e2e="media-loader__container"]').should(
                'be.visible',
              );
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
    }
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
              const recentEpisodesMaxNumber = parseInt(
                toggles?.recentVideoEpisodes.value,
                10,
              );

              cy.log(
                `Number of available episodes? ${recentEpisodesMaxNumber}`,
              );
              // More than one episode expected
              cy.getPageDataFromWindow().then(data => {
                const { recentEpisodes } = data;
                cy.log({ recentEpisodes });

                if (recentEpisodes?.length > 0 && recentEpisodesMaxNumber > 1) {
                  cy.get('[data-e2e=recent-episodes-list]').should('exist');

                  cy.get('[data-e2e=recent-episodes-list]').within(() => {
                    cy.get('[data-e2e=recent-episodes-list-item]').should(
                      'have.length.of.at.most',
                      recentEpisodesMaxNumber,
                    );
                  });
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
