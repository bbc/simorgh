export default ({ service, pageType, variant }) => {
  describe(`AMP only test for ${service} ${pageType}`, () => {
    let mediaArticleData;
    before(() => {
      cy.getPageData({ service, pageType: 'article', variant }).then(
        response => {
          mediaArticleData = response.body;
          // console.log(JSON.stringify(mediaArticleData));
        },
      );
    });
    describe('Media Player: AMP', () => {
      it('Media player is rendered on page', () => {
        cy.get('[data-e2e="media-player"]').within(() => {
          cy.get('div').should('have.attr', 'data-e2e').should('not.be.empty');
        });
      });
    });
  });
};
