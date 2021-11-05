import getErrorPath from './getErrorPath';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    const errorPath = getErrorPath(service, pageType);

    if (errorPath) {
      it('should return a 404 error code', () => {
        cy.testResponseCodeAndType({
          path: `${errorPath}.amp`,
          responseCode: 404,
          type: 'text/html',
        });
      });
    } else {
      describe(`No ${pageType} found for ${service}`, () => {});
    }
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
