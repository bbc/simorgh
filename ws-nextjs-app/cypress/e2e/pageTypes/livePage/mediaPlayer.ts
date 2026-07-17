export default () => {
  describe('Media Player', () => {
    it('should render a media player', () => {
      cy.get('[data-e2e="media-loader__container"]')
        .first()
        .within(() => {
          cy.get('[data-e2e="media-player"]').should('be.visible');
        });

      cy.get(`smp-toucan-player`).should('be.visible');
    });

    it('should render a visible caption', () => {
      cy.get('[data-testid="caption-paragraph"]').should('exist');
    });
  });
};
