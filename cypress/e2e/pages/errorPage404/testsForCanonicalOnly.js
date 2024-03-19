/* eslint-disable import/prefer-default-export */
import getErrorPath from './getErrorPath';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    const errorPath = getErrorPath(service, pageType);

    if (errorPath) {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType({
          path: errorPath,
          responseCode: 404,
          type: 'text/html',
        });
      });
    } else {
      describe(`No ${pageType} found for ${service}`, () => {});
    }
  });
