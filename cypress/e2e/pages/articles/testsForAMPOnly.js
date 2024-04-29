/* eslint-disable import/prefer-default-export */
import { ampOnly as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

const articleHasPlayer = testAssetId =>
  [
    'cgwk9w4zlg8o', // pidgin/articles/cgwk9w4zlg8o on LIVE
    'cj7xrxz0e8zo', // news/articles/cj7xrxz0e8zo on LIVE
    'c25rp5glj5qo', // persian/articles/c25rp5glj5qo on LIVE
    'cwl08rd38l6o', // pidgin/articles/cwl08rd38l6o on TEST
    'cej3lzd5e0go', // persian/articles/cej3lzd5e0go on TEST
  ].includes(testAssetId);

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
  variant,
}) => {
  describe(`Running testsForAMPOnly for ${service} ${pageType}`, () => {
    let testAssetId;
    before(() => {
      cy.url().then(url => {
        // eslint-disable-next-line prefer-destructuring
        testAssetId = url.match(/\/([^/]+?)(?:\.[^/.]+)?$/)[1];
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
      // eslint-disable-next-line no-only-tests/no-only-tests
      it('should render an iframe with a valid URL', () => {
        if (articleHasPlayer(testAssetId)) {
          cy.get('[data-e2e="media-player"]').should('be.visible');
          cy.get('[data-e2e="media-player"]')
            .invoke('attr', 'src')
            .then(src => {
              cy.log(`src is ${src}`);

              cy.testResponseCodeAndTypeRetry({
                path: src,
                responseCode: 200,
                type: 'text/html',
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
    mostReadAssertions({ service, variant });
  });
};
