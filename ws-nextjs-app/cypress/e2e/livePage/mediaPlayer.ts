export default () => {
  describe('Media Player', () => {
    it('should render a visible placeholder image', () => {
      cy.get('[data-e2e="media-loader__container"]')
        .first()
        .within(() => {
          cy.get('[data-e2e="media-loader__placeholder"] img')
            .should('be.visible')
            .should('have.attr', 'src')
            .should('not.be.empty');
        });
    });

    it('should render a visible guidance message', () => {
      cy.get('[data-e2e="media-player__guidance"]').should('exist');
    });

    it('should have a visible play button and valid duration', () => {
      cy.get('[data-e2e="media-loader__container"]')
        .first()
        .within(() => {
          cy.get('button')
            .should('be.visible')
            .within(() => {
              cy.get('svg').should('be.visible');
              cy.get('time')
                .should('be.visible')
                .should('have.attr', 'dateTime');
            });
        });
    });

    it('should render a toucan player when a user clicks play', () => {
      cy.get('[data-e2e="media-loader__container"] button').first().click();
      cy.get(`smp-toucan-player`).should('be.visible');
    });
  });
};
