import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';
import getDataUrl from '../../../support/helpers/getDataUrl';
import config from '../../../support/config/services';

export default ({ service, pageType }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });
  describe('Recent Episodes component', () => {
    it('should be displayed if the toggle is on, and shows the expected number of items (max 4)', function test() {
      cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
        const recentEpisodesEnabled = path(
          ['recentAudioEpisodes', 'enabled'],
          toggles,
        );
        cy.log(`Recent Episodes component enabled? ${recentEpisodesEnabled}`);

        if (recentEpisodesEnabled) {
          const currentPath = Cypress.env('currentPath');
          const url =
            Cypress.env('APP_ENV') === 'test'
              ? `${currentPath}?renderer_env=live`
              : `${currentPath}`;

          cy.request(getDataUrl(url)).then(({ body }) => {
            const maxNumberofItems = 4;
            const numberOfEpisodes =
              body.relatedContent.groups[0].promos.length;

            cy.log(`Number of recent episodes ? ${numberOfEpisodes}`);
            if (numberOfEpisodes > 0) {
              cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                'exist',
              );

              const expectedNumberOfEpisodes = Math.min(
                numberOfEpisodes,
                maxNumberofItems,
              );
              cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").within(
                () => {
                  cy.get("li[class*='css-9kvqqh-StyledEpisodeListItem']")
                    .its('length')
                    .should('eq', expectedNumberOfEpisodes);
                },
              );
            } else {
              cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                'not.exist',
              );
            }
          });
        } else {
          cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
            'not.exist',
          );
          cy.log('No recent episodes in data');
        }
      });
    });
  });
};
