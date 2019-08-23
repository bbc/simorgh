import config from '../../../support/config/services';

const tests = ({ service }) =>
  describe(`Canonical Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        config[service].pageTypes.errorPage404.path,
        404,
        'text/html',
      );
    });
  });

export default tests;
