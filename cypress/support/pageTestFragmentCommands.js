Cypress.Commands.add('headerTest', () => {
  cy.get('header a').should('contain', 'BBC News');
});

Cypress.Commands.add('footerTestBranding', () => {
  cy.get('footer a')
    .eq(0)
    .should('contain', 'BBC News');
});

Cypress.Commands.add('footerTestWorkingLinks', () => {
  const checkFooterLinks = (position, url) => {
    cy.get('a')
      .eq(position)
      .should('have.attr', 'href')
      .and('contain', url);
  };
  cy.get('footer ul').within(() => {
    checkFooterLinks('0', '/news/help-41670342');
    checkFooterLinks('1', '/terms');
    checkFooterLinks('2', '/aboutthebbc/');
    checkFooterLinks('3', '/privacy/');
    checkFooterLinks('4', '/usingthebbc/cookies/');
    checkFooterLinks('5', '/accessibility/');
    checkFooterLinks('6', '/contact/');
  });
});

Cypress.Commands.add('footerTestCopyrightLink', () => {
  cy.get('footer a')
    .eq(0)
    .should('contain', 'BBC News');
});
