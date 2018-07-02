describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });

  it('should not have an empty story panel', () => {
    cy.get('div').contains('Article'); // Choice of Article is arbitrary
  });
});
