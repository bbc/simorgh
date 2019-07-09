import services from '../support/config/services';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    cy.testResponseCodeAndType(
      `/news/articles/${services.news.pageTypes.articles.asset}.json`,
      200,
      'application/json',
    );
  });
});
