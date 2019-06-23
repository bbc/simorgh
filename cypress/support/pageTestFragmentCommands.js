Cypress.Commands.add('headerTest', () => {
  cy.get('header a').should('contain', 'BBC News');
});
