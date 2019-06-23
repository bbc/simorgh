Cypress.Commands.add('headerTestBBCNewsString', () => {
  cy.get('header a').should('contain', 'BBC News');
});

Cypress.Commands.add('headerTestVisibleBanner', canonicalLink => {
  cy.get('header')
    .should('have.lengthOf', 1)
    .find('a')
    .should('have.attr', 'href', `${canonicalLink}`)
    .find('svg')
    .should('be.visible');
});

Cypress.Commands.add('headerTestHaveH1', () => {
  cy.get('h1').should('have.length', 1);
});
