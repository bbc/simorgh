import config from '../../../support/config/services';

export const testsToAlwaysRunForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForAMPOnly to run for ${service} ${pageType}`, () => {});
};

export const testsForAMPOnly = ({ service, pageType }) =>
  describe(`Amp Tests for ${service} ${pageType}`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        `${config[service].pageTypes.errorPage404.path}.amp`,
        404,
        'text/html',
      );
    });
  });

export const testsToNeverSmokeTestForAMPOnly = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run for ${service} ${pageType}`, () => {});
};
