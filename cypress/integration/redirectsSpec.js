import config from '../support/config';

describe('Persian redirects', () => {
  // We are testing redirects from .co.uk to com
  // This means we need to enforce these tests to call .co.uk
  // We are assuming that these tests are running outside of the uk
  Cypress.config('baseUrl', 'https://www.bbc.co.uk');

  // Given I go to https://www.bbc.co.uk/persian/articles/:id
  // Then I am given a 301 redirect to https://www.bbc.com/persian/articles/:id
  it('should redirect me to .com if I am hitting the .co.uk on persian canonical', () => {
    cy.request({
      url: `/persian/articles/${config.assets.persian}`,
      followRedirect: false,
    }).then(resp => {
      expect(resp.status).to.eq(302);
      expect(resp.redirectedToUrl).to.eq(
        `https://www.bbc.com/persian/articles/${config.assets.persian}`,
      );
    });
  });
});
