export default ({
  url,
  responseCode = 200,
  retriesLeft = 2,
  allowFallback = false,
}: {
  url?: string;
  responseCode?: number;
  retriesLeft?: number;
  allowFallback?: boolean;
}) => {
  if (!url) {
    throw new Error('URL is undefined at function testResponseCodeAndRetry');
  }

  cy.request({ url, retryOnStatusCodeFailure: true }).then(
    ({ status, headers }) => {
      expect(status, `Unexpected status code for ${url}`).to.equal(
        responseCode,
      );

      if (!allowFallback) {
        try {
          expect(
            headers,
            `Belfrage fallback response detected for ${url}`,
          ).not.to.have.property('belfrage-cache-status: STALE');
        } catch (e) {
          if (retriesLeft < 1) {
            throw e;
          }

          // Wait before retrying to allow for transient problems to go away
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000).testResponseCodeAndRetry({
            url,
            responseCode,
            retriesLeft: retriesLeft - 1,
            allowFallback,
          });
        }
      }
    },
  );
};
