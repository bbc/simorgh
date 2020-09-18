import path from 'ramda/src/path';
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';
import appToggles from '../../../support/helpers/useAppToggles';
import envConfig from '../../../support/config/envs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

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
          cy.request(`${Cypress.env('currentPath')}.json`).then(
            ({ body: jsonData }) => {
              if (hasMedia(jsonData)) {
                const embedUrl = getEmbedUrl(jsonData, language);

                cy.get(`iframe[src="${embedUrl}"]`).should('be.visible');
                cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
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
      let serviceVariant = variant;
      serviceVariant =
        serviceVariant === 'default'
          ? (serviceVariant = '')
          : (serviceVariant = `/${variant}`);

      const mostWatchedPath = `/${config[service].name}/mostwatched${serviceVariant}.json`;
      it('should show/not show the Most Watched component if the toggle is enabled for the service', function test() {
        // Find if that service has componant enabled in toggles
        cy.fixture(`toggles/${config[service].name}.json`).then(toggles => {
          const mostWatchedIsEnabled = path(
            ['mostPopularMedia', 'enabled'],
            toggles,
          );
          cy.log(`Service toggle enabled ${mostWatchedIsEnabled}`);

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
      });
      it('Most Watched component shows correct number of items', function test() {
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
              // If the max number of items is 5 and the records are > 5, checks it shows 5

              if (
                maxNumberofItems === '5' &&
                mostWatchedJson.totalRecords > 5
              ) {
                cy.get('[class^="StoryPromoUl"]')
                  .find('>li')
                  .its('length')
                  .should('eq', 5);
              } else {
                cy.get('[class^="StoryPromoUl"]')
                  .find('>li')
                  .its('length')
                  .should('eq', mostWatchedJson.totalRecords);
              }
            }
          });
        });
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

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
