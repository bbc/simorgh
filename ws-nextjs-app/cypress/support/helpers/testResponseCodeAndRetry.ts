export default ({
  url,
  responseCode = 200,
  retriesLeft = 2,
  allowFallback = false,
  headers,
}: {
  url: string;
  responseCode?: number;
  retriesLeft?: number;
  allowFallback?: boolean;
  headers?: Record<string, string>;
}) => {
  cy.request({
    url,
    retryOnStatusCodeFailure: true,
    ...(headers && { headers }),
  }).then(({ status, headers: responseHeaders }) => {
    expect(status, `Unexpected status code for ${url}`).to.equal(responseCode);

    if (!allowFallback) {
      try {
        expect(
          responseHeaders,
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
          headers,
        });
      }
    }
  });
};
