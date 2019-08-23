import config from '../../../support/config/services';

const tests = ({ service }) =>
  describe(`Amp Tests`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        `${config[service].pageTypes.errorPage404.path}.amp`,
        404,
        'text/html',
      );
    });
  });

export default tests;
