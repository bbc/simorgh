import { ServiceParametersType } from '../../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }: ServiceParametersType) => {
  describe(`AMP tests for ${service} ${pageType} ${path}`, () => {
    describe('Media Player', () => {
      it('should render an iframe with a valid URL', () => {
        if (!`${Cypress.env('currentPath')}`.includes('/russian/av/')) {
          cy.get(`amp-iframe`).should('be.visible');

          cy.get('amp-iframe').then($ampIframe => {
            const src = $ampIframe.attr('src');
            if (src) {
              cy.testResponseCodeAndRetry({
                url: src,
                allowFallback: true,
              });
            } else {
              throw new Error(
                'path is undefined at function mediaAssetPage/testsForAMPOnly.ts',
              );
            }
          });
        } else {
          cy.log('skipped test for cps russian map');
        }
      });
    });
  });
};
