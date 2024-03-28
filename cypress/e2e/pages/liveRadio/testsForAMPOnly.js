/* eslint-disable import/prefer-default-export */
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getEmbedUrl from '../../../support/helpers/getEmbedUrl';
import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    describe(
      'Audio Player',
      {
        retries: 3,
      },
      () => {
        const { lang } = appConfig[service][variant];
        let embedUrl;

        beforeEach(() => {
          cy.request(getDataUrl(Cypress.env('currentPath'))).then(
            ({ body }) => {
              embedUrl = getEmbedUrl(body, lang, true);
            },
          );
        });

        it('should be rendered', () => {
          cy.get(`amp-iframe[src*="${embedUrl}"]`).should('be.visible');
        });

        it('should render an image placeholder', () => {
          cy.get(`div[data-e2e="image-placeholder"][placeholder]`).should(
            'exist',
          );
        });

        it('embed URL should be reachable', () => {
          cy.testResponseCodeAndTypeRetry({
            path: embedUrl,
            responseCode: 200,
            type: 'text/html',
            allowFallback: true,
          });
        });
      },
    );
  });
