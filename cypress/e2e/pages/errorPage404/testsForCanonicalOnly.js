// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType({
        path,
        responseCode: 404,
        type: 'text/html',
      });
    });
  });
