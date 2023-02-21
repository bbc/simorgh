// Custom command to test that the specified path returns the expected status code and
// content type, as well as (for smoke tests) that the response was not a Mozart fallback.
// Automatically retries twice after a delay if it gets an unexpected response
// NB:
// - Default timeout for cy.request is 50s
// - Certain types of network error are retried automatically (retryOnNetworkFailure)
Cypress.Commands.add(
  'testResponseCodeAndType',
  ({ path, responseCode, type, retriesLeft = 2, allowFallback = false }) => {
    cy.request({ url: path, failOnStatusCode: false }).then(
      ({ status, headers }) => {
        expect(status, `Unexpected status code for ${path}`).to.equal(
          responseCode,
        );
        expect(
          headers['content-type'],
          `Unexpected content-type for ${path}`,
        ).to.include(type);

        // Ensure we're not seeing the Mozart fallback during smoke testing
        if (Cypress.env('SMOKE') && !allowFallback) {
          try {
            expect(
              headers,
              `Belfrage fallback response detected for ${path}`,
            ).not.to.have.property('belfrage-cache-status: STALE');
          } catch (e) {
            if (retriesLeft < 1) {
              throw e;
            }

            // Wait before retrying to allow for transient problems to go away
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(5000).testResponseCodeAndType({
              path,
              responseCode,
              type,
              retriesLeft: retriesLeft - 1,
              allowFallback: false,
            });
          }
        }
      },
    );
  },
);
Cypress.Commands.add(
  'testResponseCodeAndTypeRetry',
  ({ path, responseCode, type, retriesLeft = 2, allowFallback = false }) => {
    cy.request({ url: path, retryOnStatusCodeFailure: true }).then(
      ({ status, headers }) => {
        expect(status, `Unexpected status code for ${path}`).to.equal(
          responseCode,
        );
        expect(
          headers['content-type'],
          `Unexpected content-type for ${path}`,
        ).to.include(type);

        if (Cypress.env('SMOKE') && !allowFallback) {
          try {
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
            cy.wait(5000).testResponseCodeAndTypeRetry({
              path,
              responseCode,
              type,
              retriesLeft: retriesLeft - 1,
              allowFallback: false,
            });
          }
        }
      },
    );
  },
);
