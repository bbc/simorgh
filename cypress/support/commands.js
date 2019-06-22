Cypress.Commands.add('testResponseCode', (path, responseCode) => {
  cy.request({ url: path, failOnStatusCode: false }).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
});
