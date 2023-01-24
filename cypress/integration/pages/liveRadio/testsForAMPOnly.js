import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getEmbedUrl from '../../../support/helpers/getEmbedUrl';
import getDataUrl from '../../../support/helpers/getDataUrl';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = () => {};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      const { lang } = appConfig[service][variant];
      let embedUrl;

      beforeEach(() => {
        cy.request(getDataUrl(Cypress.env('currentPath'))).then(({ body }) => {
          embedUrl = getEmbedUrl(body, lang, true);
        });
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
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = () => {};
