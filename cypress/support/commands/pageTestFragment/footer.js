Cypress.Commands.add('checkFooterLinks', (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
});
