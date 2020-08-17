// These are deliberately duplicated from the other cypress folder to avoid interrelationships blocking changes.
Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({
    url: path,
    failOnStatusCode: false,
  }).then(({ status, headers }) => {
    expect(status).to.eq(responseCode);
    expect(headers['content-type']).to.include(type);
    if (Cypress.env('SMOKE')) {
      // Ensure we're not seeing the Mozart fallback during smoke testing
      expect(
        headers,
        `Mozart fallback response detected for ${path}`,
      ).not.to.have.property('x-mfa');
    }
  });
});
