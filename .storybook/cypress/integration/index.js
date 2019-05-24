describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });
});
