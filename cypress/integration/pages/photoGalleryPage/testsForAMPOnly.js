import config from '../../../support/config/services';
// import envConfig from '../../../support/config/envs';
// import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForAMPOnly = ({
  service,
  pageType,
}) =>
  describe(`testsThatFollowSmokeTestConfigForAMPOnly for ${service} ${pageType}`, () => {
    describe('AMP Status', () => {
      it('should return a 200 response', () => {
        cy.testResponseCodeAndType(
          `${config[service].pageTypes.photoGalleryPage.path}.amp`,
          200,
          'text/html',
        );
      });
    });
    it('should render at least one amp image', () => {
      cy.get('amp-img').should('be.visible');
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForAMPOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
