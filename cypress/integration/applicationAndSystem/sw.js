import { describeForLocalAndTest } from '../../support/limitEnvRuns';

const testArticleServiceWorker200s = service => {
  it(`should return a 200 status code and JS file for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/articles/sw.js`,
      200,
      'application/javascript',
    );
  });
};

const testFrontpageServiceWorker200s = service => {
  it(`should return a 200 status code and JS file for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/sw.js`,
      200,
      'application/javascript',
    );
  });
};

describe('Service worker files', () => {
  ['news'].forEach(testArticleServiceWorker200s);
});

describeForLocalAndTest('Service worker files', () => {
  ['persian'].forEach(testArticleServiceWorker200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testFrontpageServiceWorker200s);
});
