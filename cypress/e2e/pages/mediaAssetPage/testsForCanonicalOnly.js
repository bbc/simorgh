/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';
import appToggles from '../../../support/helpers/useAppToggles';
import envConfig from '../../../support/config/envs';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfigForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Media Player', () => {
      const language = appConfig[config[service].name][variant].lang;

      it('should render an iframe with a valid URL', () => {
        if (!`${Cypress.env('currentPath')}`.includes('/russian/av/')) {
          cy.getPageData({ service, pageType: 'cpsAsset', variant }).then(
            ({ body }) => {
              const {
                data: { article: jsonData },
              } = body;

              if (hasMedia(jsonData)) {
                const embedUrl = getEmbedUrl(jsonData, language);
                cy.log(embedUrl);
                cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
                cy.testResponseCodeAndTypeRetry({
                  path: embedUrl,
                  responseCode: 200,
                  type: 'text/html',
                  allowFallback: true,
                });
              } else {
                cy.log(
                  `No media on ${pageType} for ${Cypress.env('currentPath')}`,
                );
              }
            },
          );
        } else {
          cy.log('skipped test for cps russian map');
        }
      });
    });
    describe('Most Watched component', () => {
      before(() => {
        cy.getToggles(config[service].name);
      });
      // Allows constructing most watched path with variant
      const serviceVariant = variant === 'default' ? '' : `/${variant}`;

      const mostWatchedPath = `/${config[service].name}/mostwatched${serviceVariant}.json`;
      it('should show/not show the Most Watched component if the toggle is enabled for the service', function test() {
        // Find if the service has component enabled in toggles
        if (service === 'persian' || service === 'amharic') {
          cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
            const mostWatchedIsEnabled = path(
              ['mostPopularMedia', 'enabled'],
              toggles,
            );
            cy.log(`Service toggle enabled ${mostWatchedIsEnabled}`);
            // If toggle is enabled for that service, also check there are more than 0 records to show
            if (mostWatchedIsEnabled) {
              cy.request(mostWatchedPath).then(({ body: mostWatchedJson }) => {
                if (mostWatchedJson.totalRecords > 0) {
                  cy.log('Enough records to show component');
                  cy.get('[data-e2e=most-watched-heading]').should('exist');
                } else {
                  cy.log('Not enough records to show component');

                  cy.get('[data-e2e=most-watched-heading]').should('not.exist');
                }
              });
            } else {
              cy.get('[data-e2e=most-watched-heading]').should('not.exist');
            }
          });
        } else {
          cy.log(
            'Skipping this test on services that are not Persian or Amharic',
          );
        }
      });
      it('should show correct number of items', function test() {
        if (service === 'persian' || service === 'amharic') {
          cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
            const mostWatchedIsEnabled = path(
              ['mostPopularMedia', 'enabled'],
              toggles,
            );

            cy.request(mostWatchedPath).then(({ body: mostWatchedJson }) => {
              if (mostWatchedIsEnabled && mostWatchedJson.totalRecords > 0) {
                const maxNumberofItems = path(
                  ['mostPopularMedia', 'value'],
                  toggles,
                );
                cy.log(
                  `Max number of items is ${maxNumberofItems}. Number of items is ${mostWatchedJson.totalRecords}`,
                );
                // Compares number of items in json to number of items shown in the component
                // If there is only one record, the item is not in a list
                // If the max number of items is 5 and the records are >= 5, checks it shows 5
                // If the max number of items is 10 and the records are >= 10, checks it shows 10
                const expectedNumberOfItems = Math.min(
                  mostWatchedJson.totalRecords,
                  maxNumberofItems,
                );
                if (mostWatchedJson.totalRecords === 1) {
                  cy.get('[data-e2e=most-watched-heading]').within(() => {
                    cy.get('[data-e2e="story-promo-wrapper"]')
                      .its('length')
                      .should('eq', 1);
                  });
                } else {
                  cy.get('[data-e2e=most-watched-heading]').within(() => {
                    cy.get('[data-e2e="most-watched-ol"]')
                      .find('>li')
                      .its('length')
                      .should('eq', expectedNumberOfItems);
                  });
                }
              }
            });
          });
        } else {
          cy.log(
            'Skipping this test on services that are not Persian or Amharic',
          );
        }
      });
    });
    if (appToggles.chartbeatAnalytics.enabled && envConfig.chartbeatEnabled) {
      describe('Chartbeat', () => {
        it('should have a script with correct src', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have correct config', () => {
          cy.hasGlobalChartbeatConfig();
        });
      });
    }
  });
};
