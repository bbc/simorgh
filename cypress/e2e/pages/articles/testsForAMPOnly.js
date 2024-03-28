/* eslint-disable import/prefer-default-export */
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import { getBlockData, getVideoEmbedUrl } from './helpers';
import { ampOnly as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  let articlesData;
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    before(() => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        ({ body }) => {
          articlesData = body;
        },
      );
    });

    it('should contain an amp-img', () => {
      if (serviceHasFigure(service)) {
        cy.get('figure')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.get('amp-img').should('be.visible');
          });
      }
    });

    describe('Media Player: AMP', () => {
      it('should render a placeholder image', () => {
        const media = getBlockData('video', articlesData);
        if (media && media.type === 'video') {
          cy.get('[data-e2e="media-player"]').within(() => {
            cy.get('div')
              .should('have.attr', 'data-e2e')
              .should('not.be.empty');
          });
        }
      });

      it('should render an iframe with a valid URL', () => {
        const media = getBlockData('video', articlesData);
        if (media && media.type === 'video') {
          const { lang } = appConfig[service][variant];
          const embedUrl = getVideoEmbedUrl(articlesData, lang, true);
          cy.get(`amp-iframe[src="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndTypeRetry({
            path: embedUrl,
            responseCode: 200,
            type: 'text/html',
            allowFallback: true,
          });
        }
      });
    });

    /* Most Read Component
     * These cypress tests are needed as unit tests cannot be run on the jsdom.
     * web workers (which run on amp pages) do not run on the virtual dom.
     */
    mostReadAssertions({ service, variant });
  });
};
