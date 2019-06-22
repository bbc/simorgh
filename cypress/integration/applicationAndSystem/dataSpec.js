import config from '../../support/config';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    cy.testResponseCode(`/news/articles/${config.assets.news}.json`, 200);
  });
});
