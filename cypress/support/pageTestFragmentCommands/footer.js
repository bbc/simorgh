Cypress.Commands.add('footerTestBranding', canonicalLink => {
  cy.get('footer')
    .should('have.length', 1)
    .should('have.attr', 'role', 'contentinfo')
    .find('a')
    .eq(0)
    .should('contain', 'BBC News')
    .and('have.attr', 'href', `${canonicalLink}`)
    .find('svg')
    .should('be.visible');
});

Cypress.Commands.add('footerTestWorkingLinksHeloer', (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
});

Cypress.Commands.add('footerTestWorkingLinks', () => {
  cy.get('footer ul').within(() => {
    cy.footerTestWorkingLinksHeloer('0', '/news/help-41670342');
    cy.footerTestWorkingLinksHeloer('1', '/terms');
    cy.footerTestWorkingLinksHeloer('2', '/aboutthebbc/');
    cy.footerTestWorkingLinksHeloer('3', '/privacy/');
    cy.footerTestWorkingLinksHeloer('4', '/usingthebbc/cookies/');
    cy.footerTestWorkingLinksHeloer('5', '/accessibility/');
    cy.footerTestWorkingLinksHeloer('6', '/contact/');
  });
});

Cypress.Commands.add('footerTestCopyrightLink', () => {
  cy.get('footer a')
    .eq(0)
    .should('contain', 'BBC News');
});
