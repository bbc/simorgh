import { describeForLocalOnly } from '../../support/limitEnvRuns';

describe('Application', () => {
  it('Service worker files should return a 200 status code for news', () => {
    cy.testArticleServiceWorker200s('news');
  });

  it('Manifest.json files should return a 200 status code for news', () => {
    cy.testManifest200s('news');
  });
});

describeForLocalOnly('Application - Local Env', () => {
  it('Local Env - Service worker files hould return a 200 status code for news', () => {
    cy.testArticleServiceWorker200s('news');
  });

  it(`Local Env - Service worker files should return a 200 status code for igbo, pidgin and yoruba`, () => {
    cy.testFrontpageServiceWorker200s('igbo');
    cy.testFrontpageServiceWorker200s('pidgin');
    cy.testFrontpageServiceWorker200s('yoruba');
  });

  it('Local Env - Manifest.json files should return a 200 status code for persian, igbo, pidgin and yoruba without /articles', () => {
    cy.testManifest200s('persian');
    cy.testManifestServicePaths('igbo');
    cy.testManifestServicePaths('pidgin');
    cy.testManifestServicePaths('yoruba');
  });
});
