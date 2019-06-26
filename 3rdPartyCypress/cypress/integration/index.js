describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('https://www.bbc.co.uk');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'BBC - Home');
  });
});
