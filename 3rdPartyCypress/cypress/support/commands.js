// These are deliberately duplicated from the other cypress folder to avoid interrelationships blocking changes.
Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({
    url: path,
    failOnStatusCode: false,
    retryOnStatusCodeFailure: true,
  }).then(({ status, headers }) => {
    expect(status).to.eq(responseCode);
    expect(headers['content-type']).to.include(type);
  });
});
