import { Services } from '#app/models/types/global';
import { ServiceParametersType } from '../../types';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = (service: Services) =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

const articleHasPlayer = (articleId: string) =>
  [
    'cgwk9w4zlg8o', // pidgin/articles/cgwk9w4zlg8o on LIVE
    'cj7xrxz0e8zo', // news/articles/cj7xrxz0e8zo on LIVE
    'c25rp5glj5qo', // persian/articles/c25rp5glj5qo on LIVE
    'cwl08rd38l6o', // pidgin/articles/cwl08rd38l6o on TEST
    'cej3lzd5e0go', // persian/articles/cej3lzd5e0go on TEST
  ].includes(articleId);

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({
  service,
  pageType,
  variant = 'default',
}: ServiceParametersType) => {
  let articleId: string;

  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    before(() => {
      cy.url().then(url => {
        const match = url.match(/\/([^/]+?)(?:\.[^/.]+)?$/);
        if (match) {
          [, articleId] = match;
        }
      });
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
      it('should render an iframe with a valid URL', () => {
        if (articleHasPlayer(articleId)) {
          cy.get('[data-e2e="media-player"]').should('be.visible');
          cy.get('[data-e2e="media-player"]')
            .invoke('attr', 'src')
            .then((src = '') => {
              cy.log(`src is ${src}`);

              cy.testResponseCodeAndRetry({
                url: src,
                allowFallback: true,
              });
            });
        }
      });
    });

    /* Most Read Component
     * These cypress tests are needed as unit tests cannot be run on the jsdom.
     * web workers (which run on amp pages) do not run on the virtual dom.
     */
    // SKIPPED: Cross platform tests have been skipped until the Most Read component has been migrated
    // crossPlatform({ service, variant });
  });
};
