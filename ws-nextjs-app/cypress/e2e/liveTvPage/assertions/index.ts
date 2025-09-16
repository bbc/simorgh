export const assertLiveTvPageLocal = () => {
  it('hould render the Live TV Page on Local with a h1', () => {
    cy.get('h1').should('contain.text', 'HELLO WORLD');
  });
};

export const assertLiveTvPageTest = () => {
  it('should render the Live TV Page on Test with a h1', () => {
    cy.get('h1').should('contain.text', 'HELLO WORLD');
  });
};
