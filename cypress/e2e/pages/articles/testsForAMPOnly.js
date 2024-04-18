/* eslint-disable import/prefer-default-export */
import { ampOnly as mostReadAssertions } from '../mostReadPage/mostReadAssertions';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);

const articleHasPlayer = testAssetId =>
  ['cgwk9w4zlg8o', 'cj7xrxz0e8zo', 'cwl08rd38l6o'].includes(testAssetId);

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
