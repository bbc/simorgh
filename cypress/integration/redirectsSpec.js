import config from '../support/config';
import { testRedirect } from '../support/metaTestHelper';
import { describeForLocalAndTest } from '../support/limitEnvRuns';

describeForLocalAndTest('Persian redirects', () => {
  // We are testing redirects from .co.uk to com
  // This means we need to enforce these tests to call .co.uk
  // We are assuming that these tests are running outside of the uk
  Cypress.config('baseUrl', 'https://www.test.bbc.co.uk');

  it('should redirect me to .com if I am hitting the .co.uk on Persian canonical', () => {
    testRedirect(
      `/persian/articles/${config.assets.persian}`,
      302,
      `https://www.test.bbc.com/persian/articles/${config.assets.persian}`,
    );
  });

  // Using the full url due to http enforce
  it('should redirect me to the https site if visiting http on Persian canonical', () => {
    testRedirect(
      `http://www.test.bbc.co.uk/persian/articles/${config.assets.persian}`,
      301,
      `https://www.test.bbc.co.uk/persian/articles/${config.assets.persian}`,
    );
  });

  it('should redirect me to .com if I am hitting the .co.uk on Persian amp', () => {
    testRedirect(
      `/persian/articles/${config.assets.persian}.amp`,
      302,
      `https://www.test.bbc.com/persian/articles/${config.assets.persian}.amp`,
    );
  });

  // Using the full url due to http enforce
  it('should redirect me to the https site if visiting http on Persian amp', () => {
    testRedirect(
      `http://www.test.bbc.co.uk/persian/articles/${config.assets.persian}.amp`,
      301,
      `https://www.test.bbc.co.uk/persian/articles/${config.assets.persian}.amp`,
    );
  });
});
