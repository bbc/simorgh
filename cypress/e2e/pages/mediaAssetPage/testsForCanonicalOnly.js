/* eslint-disable import/prefer-default-export */
import config from '../../../support/config/services';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import CafEnabledServices from '../../../../src/app/lib/cafServices.const';
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
      const isCafService = CafEnabledServices.includes(service);
      const pageTypeForFetch = isCafService ? 'article' : 'cpsAsset';

      if (isCafService) {
        it('should render media player component', () => {
          cy.getPageData({
            service,
            pageType: 'article',
            variant,
          }).then(({ body }) => {
            const {
              data: { article: jsonData },
            } = body;

            if (hasMedia(jsonData)) {
              const embedUrl = getEmbedUrl(jsonData, language);
              cy.log(embedUrl);
              cy.get('figure[data-e2e="media-loader__container"]').should(
                'be.visible',
              );
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
          });
        });
      } else {
        it('should render an iframe with a valid URL', () => {
          if (!`${Cypress.env('currentPath')}`.includes('/russian/av/')) {
            cy.getPageData({
              service,
              pageType: pageTypeForFetch,
              variant,
            }).then(({ body }) => {
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
            });
          } else {
            cy.log('skipped test for cps russian map');
          }
        });
      }
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
