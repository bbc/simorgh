// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }) => {
  describe(`AMP tests for ${service} ${pageType} ${path}`, () => {
    describe('Media Player', () => {
      it('should render an iframe with a valid URL', () => {
        if (!`${Cypress.env('currentPath')}`.includes('/russian/av/')) {
          cy.get(`amp-iframe`).should('be.visible');

          cy.get('amp-iframe').then($ampIframe => {
            cy.testResponseCodeAndRetry({
              path: $ampIframe.attr('src'),
              responseCode: 200,
              type: 'text/html',
              allowFallback: true,
            });
          });
        } else {
          cy.log('skipped test for cps russian map');
        }
      });
    });
  });
};
