export default ({ service, pageType }) => {
  describe(`AMP only test for ${service} ${pageType}`, () => {
    describe('Media Player: AMP', () => {
      it('Media player is rendered on page', () => {
        cy.get('[data-e2e="media-player"]').within(() => {
          cy.get('div').should('have.attr', 'data-e2e').should('not.be.empty');
        });
      });
    });
  });
};
