// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    // const errorPath = getErrorPath(service, pageType, variant);

    // if (errorPath) {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType({
        path,
        responseCode: 404,
        type: 'text/html',
      });
    });
  });
