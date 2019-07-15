import services from '../support/config/services';
import describeForLocalAndTest from '../support/limitEnvRuns';

const testRedirect = (url, expectedStatus, expectedUrl) => {
  cy.request({
    url,
    followRedirect: false,
  }).then(resp => {
    expect(resp.status).to.eq(expectedStatus);
    expect(resp.redirectedToUrl).to.eq(expectedUrl);
  });
};

describeForLocalAndTest('Persian redirects', () => {
  // We are testing redirects from .co.uk to com
  // This means we need to enforce these tests to call .co.uk
  // We are assuming that these tests are running outside of the uk
  Cypress.config('baseUrl', 'https://www.test.bbc.co.uk');

  it('should redirect me to .com if I am hitting the .co.uk on Persian canonical', () => {
    testRedirect(
      `/persian/articles/${services.persian.pageTypes.articles.asset}`,
      302,
      `https://www.test.bbc.com/persian/articles/${services.persian.pageTypes.articles.asset}`,
    );
  });

  // Using the full url due to http enforce
  it('should redirect me to the https site if visiting http on Persian canonical', () => {
    testRedirect(
      `http://www.test.bbc.co.uk/persian/articles/${services.persian.pageTypes.articles.asset}`,
      301,
      `https://www.test.bbc.co.uk/persian/articles/${services.persian.pageTypes.articles.asset}`,
    );
  });

  it('should redirect me to .com if I am hitting the .co.uk on Persian amp', () => {
    testRedirect(
      `/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
      302,
      `https://www.test.bbc.com/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
    );
  });

  // Using the full url due to http enforce
  it('should redirect me to the https site if visiting http on Persian amp', () => {
    testRedirect(
      `http://www.test.bbc.co.uk/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
      301,
      `https://www.test.bbc.co.uk/persian/articles/${services.persian.pageTypes.articles.asset}.amp`,
    );
  });
});
