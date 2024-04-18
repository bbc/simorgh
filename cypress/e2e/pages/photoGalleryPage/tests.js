/* eslint-disable import/prefer-default-export */
// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) => {
  describe(`testsThatFollowSmokeTestConfig to run for ${service} ${variant} ${pageType}`, () => {
    it('should render a description for the page', () => {
      if (['thai', 'pidgin', 'hausa'].includes(service)) {
        cy.getPageData({ service, pageType: 'article', variant }).then(
          ({ body }) => {
            const description =
              body.data.article.promo.summary.blocks[0].model.blocks[0].model
                .text;
            cy.get('main p').first().should('contain', description);
          },
        );
      } else {
        cy.getPageData({ service, pageType: 'cpsAsset', variant }).then(
          ({ body }) => {
            const description = body.data.article.promo.summary;
            cy.get('main p').first().should('contain', description);
          },
        );
      }
    });
  });
};
