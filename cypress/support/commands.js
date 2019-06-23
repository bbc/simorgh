Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({ url: path, failOnStatusCode: false }).then(
    ({ status, headers }) => {
      expect(status).to.eq(responseCode);
      expect(headers['content-type']).to.include(type);
      // Always ensure we're not seeing the Mozart fallback
      expect(headers).not.to.have.property('x-mfa');
    },
  );
});

Cypress.Commands.add('hasHtmlLangDirAttributes', ({ lang, dir }) => {
  cy.get('html')
    .should('have.attr', 'lang', lang)
    .and('have.attr', 'dir', dir);
});

Cypress.Commands.add('hasScriptToFetchBundle', () => {
  // Testing the actual fetch is not currently possible
  cy.get('script')
    .last()
    .should('have.attr', 'src')
    .and('match', /(\/static\/js\/main-\w+\.\w+\.js)/g);
});
