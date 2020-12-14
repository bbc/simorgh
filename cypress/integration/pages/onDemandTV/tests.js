/* eslint-disable consistent-return */
import path from 'ramda/src/path';
import {
  isAvailable,
  overrideRendererOnTest,
  getEmbedUrl,
  isBrand,
} from '../../../support/helpers/onDemandRadioTv';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getDataUrl from '../../../support/helpers/getDataUrl';
import config from '../../../support/config/services';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    describe('Video Player', () => {
      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${overrideRendererOnTest()}`,
        ).then(({ body: jsonData }) => {
          if (!isAvailable(jsonData)) {
            return cy.log(
              `Episode is not available: ${Cypress.env('currentPath')}`,
            );
          }

          const language = appConfig[service][variant].lang;
          const embedUrl = getEmbedUrl({ body: jsonData, language, isAmp });
          const isBrandPage = isBrand(jsonData);

          cy.get('iframe').then(iframe => {
            // If a brand, get the src of the iframe, otherwise, use the embed URL from the data
            const iframeURL = isBrandPage ? iframe.prop('src') : embedUrl;

            cy.get(`iframe[src*="${iframeURL}"]`).should('be.visible');
            cy.testResponseCodeAndTypeRetry({
              path: embedUrl,
              responseCode: 200,
              type: 'text/html',
              allowFallback: true,
            });
          });
        });
      });
    });
    describe(`Tests for ${service} ${pageType} ${variant} with toggle use`, () => {
      before(() => {
        cy.getToggles(config[service].name);
      });
      describe('Recent Episodes component', () => {
        it('should be displayed if the toggle is on, and shows the expected number of items (max 4)', function test() {
          cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
            const recentEpisodesEnabled = path(
              ['recentVideoEpisodes', 'enabled'],
              toggles,
            );
            cy.log(
              `Recent Episodes component enabled? ${recentEpisodesEnabled}`,
            );

            if (recentEpisodesEnabled) {
              // There cannot be more episodes shown than the max allowed
              const recentEpisodesMaxNumber = path(
                ['recentVideoEpisodes', 'value'],
                toggles,
              );
              cy.log(`Recent Episodes max limit? ${recentEpisodesMaxNumber}`);
              const currentPath = Cypress.env('currentPath');
              const url =
                Cypress.env('APP_ENV') === 'test'
                  ? `${currentPath}?renderer_env=live`
                  : `${currentPath}`;

              cy.request(getDataUrl(url)).then(({ body }) => {
                const numberOfEpisodesinData =
                  body.relatedContent.groups[0].promos.length;
                // There cannot be more episodes than the number present in the data
                const numberOfEpisodesinDataUnderLimit = Math.min(
                  numberOfEpisodesinData,
                  recentEpisodesMaxNumber,
                );
                let countAvailableEpisodes = 0;
                // Count the number of episodes that are available and so will show (there can be unavailable episodes in the list)
                for (let i = 0; i < numberOfEpisodesinDataUnderLimit; i += 1) {
                  if (
                    body.relatedContent.groups[0].promos[i].media.versions
                      .length > 0
                  ) {
                    countAvailableEpisodes += 1;
                  }
                }
                // There cannot be more episodes than are AVAILABLE in the data (episodes don't show if versions is empty)
                const expectedNumberOfEpisodes = Math.min(
                  numberOfEpisodesinDataUnderLimit,
                  countAvailableEpisodes,
                );

                cy.log(
                  `Number of available episodes ? ${expectedNumberOfEpisodes}`,
                );
                if (expectedNumberOfEpisodes > 0) {
                  cy.get("ul[class*='css-1ddpce6-StyledEpisodeList']").should(
                    'exist',
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
    });
  });
};
