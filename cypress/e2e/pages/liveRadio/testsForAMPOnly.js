/* eslint-disable import/prefer-default-export */
// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    describe(
      'Audio Player',
      {
        retries: 3,
      },
      () => {
        let embedUrl;

        beforeEach(() => {
          cy.get('[data-e2e=media-player] iframe').then($iframe => {
            cy.log($iframe, 'after beforeeach');
            embedUrl = $iframe.attr('src');
          });
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
