import { ServiceParametersType } from '../../types';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, path }: ServiceParametersType) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should return a 404 error code', () => {
      if (path) {
        cy.testResponseCodeAndType({
          path,
          responseCode: 404,
          type: 'text/html',
        });
      } else {
        throw new Error(
          'path is undefined at function /errorPage404/testsForCanonicalOnly.ts',
        );
      }
    });
  });
