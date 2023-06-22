import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
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
                const embedUrl = getEmbedUrl(jsonData, language, true);

                cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
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
  });
};

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
