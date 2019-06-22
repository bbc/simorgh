import { describeForLocalOnly } from '../../support/limitEnvRuns';

const testArticleServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.request(`/${service}/articles/sw.js`);
  });
};

const testFrontpageServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.request(`/${service}/sw.js`);
  });
};

describe('Service worker files', () => {
  ['news'].forEach(testArticleServiceWorker200s);
});

describeForLocalOnly('Local Env - Service worker files', () => {
  ['persian'].forEach(testArticleServiceWorker200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testFrontpageServiceWorker200s);
});
