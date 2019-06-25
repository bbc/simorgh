import config from '../support/config';

// Best to run this on every page visit rather than like this.
describe('Mozart status', () => {
  it('test a specific page does not get a mozart fallback', () => {
    cy.testResponseCodeAndType(
      `/news/articles/${config.assets.news}`,
      200,
      'text/html',
    );
  });
});
