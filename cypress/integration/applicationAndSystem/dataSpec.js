import config from '../../support/config';

describe('Static Articles data', () => {
  it('should return a 200 status code and JSON file', () => {
    cy.testResponseCodeAndType(
      `${config.assets.news}.json`,
      200,
      'application/json',
    );
  });
});
