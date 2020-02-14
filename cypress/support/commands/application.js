// Custom command to test that the specified path returns the expected status code and
// content type, as well as that's the response was not a Mozart fallback. Automatically
// retries twice after a delay if it gets an unexpected response
// NB:
// - Default timeout for cy.request is 50s
// - Certain types of network error are retried automatically (retryOnNetworkFailure)
Cypress.Commands.add(
  'testResponseCodeAndType',
  (path, responseCode, type, retriesLeft = 2) => {
    cy.request({ url: path, failOnStatusCode: false }).then(
      ({ status, headers }) => {
        expect(status, `Unexpected status code for ${path}`).to.equal(
          responseCode,
        );
        expect(
          headers['content-type'],
          `Unexpected content-type for ${path}`,
        ).to.include(type);

        try {
          // Always ensure we're not seeing the Mozart fallback (denoted by x-mfa header)
          expect(
            headers,
            `Mozart fallback response detected for ${path}`,
          ).not.to.have.property('x-mfa');
        } catch (e) {
          if (retriesLeft < 1) {
            throw e;
          }

          // Wait before retrying to allow for transient problems to go away
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000).testResponseCodeAndType(
            path,
            responseCode,
            type,
            retriesLeft - 1,
          );
        }
      },
    );
  },
);

Cypress.Commands.add('iframe', (iframeSelector, innerElement) => {
  return cy
    .get(iframeSelector, { timeout: 10000 })
    .should($iframe => expect($iframe.contents().find(innerElement)).to.exist)
    .then($iframe => {
      return cy.wrap($iframe.contents().find(innerElement), { timeout: 10000 });
    });
});
