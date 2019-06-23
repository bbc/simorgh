Cypress.Commands.add('hasVisibleSectionLabel', () => {
  cy.get('section')
    .should('have.length.of.at.least', 1)
    .should('be.visible')
    .each($section => {
      cy.wrap($section).within(() => {
        cy.get('h2').should('have.lengthOf', 1);
      });
    });
});

Cypress.Commands.add('hasOneOrMoreStoryPromos', () => {
  cy.get('section').within(() => {
    cy.get('img')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
    cy.get('h3')
      .should('have.length.of.at.least', 1)
      .should('be.visible')
      .find('a')
      .should('have.attr', 'href');
    cy.get('p')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
    cy.get('time')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
  });
});
