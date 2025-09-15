export const assertLiveTvPage = () => {
  it('should render the Live TV Page', () => {
    cy.contains('Youtube - BBC News').should('exist');
  });
};

export const assertLiveTvPageLocal = () => {
  it('should render the Live TV Page with fixture content', () => {
    cy.get('h1').should('contain.text', 'HELLO WORLD');
  });
};
