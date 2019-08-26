import config from '../../../support/config/services';

export const testsToAlwaysRunForCanonicalOnly = () => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run`, () => {});
};

export const testsForCanonicalOnly = ({ service }) =>
  describe(`Canonical Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        config[service].pageTypes.errorPage404.path,
        404,
        'text/html',
      );
    });
  });

export const testsToNeverSmokeTestForCanonicalOnly = () => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run`, () => {});
};
