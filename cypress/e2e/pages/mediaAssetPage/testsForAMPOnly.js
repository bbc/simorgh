/* eslint-disable import/prefer-default-export */
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getEmbedUrl, hasMedia } from './helpers';

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
          cy.getPageData({ service, pageType: 'article', variant }).then(
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
