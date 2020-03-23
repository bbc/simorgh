// Custom command to test that the specified path returns the expected status code and
// content type
// Note: Certain types of network error are retried automatically (retryOnNetworkFailure)
Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({ url: path, failOnStatusCode: false }).then(
    ({ status, headers }) => {
      expect(status, `Unexpected status code for ${path}`).to.equal(
        responseCode,
      );
      expect(
        headers['content-type'],
        `Unexpected content-type for ${path}`,
      ).to.include(type);
    },
  );
});
