import config from '../../../support/config/services';

export const testsToAlwaysRunForAMPOnly = () => {
  describe(`No testsToAlwaysRunForAMPOnly to run`, () => {});
};

export const testsForAMPOnly = ({ service }) =>
  describe(`Amp Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        `${config[service].pageTypes.errorPage404.path}.amp`,
        404,
        'text/html',
      );
    });
  });

export const testsToNeverSmokeTestForAMPOnly = () => {
  describe(`No testsToNeverSmokeTestForAMPOnly to run`, () => {});
};
