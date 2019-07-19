import { describeForLocalOnly } from '../../support/limitEnvRuns';

describe.only('Service worker files', () => {
  it('runs', () => {
    cy.testArticleServiceWorker200s('news');
  });
});

describeForLocalOnly('Local Env - Service worker files', () => {
  it('runs', () => {
    cy.testArticleServiceWorker200s('cheese');
    cy.testFrontpageServiceWorker200s('igbo');
    cy.testFrontpageServiceWorker200s('pidgin');
    cy.testFrontpageServiceWorker200s('yoruba');
  });
});

describe('Manifest.json files', () => {
  it('runs', () => {
    cy.testManifest200s('news');
  });
});

describeForLocalOnly('Local Env - Manifest.json files', () => {
  it('runs', () => {
    cy.testManifest200s('persian');
    cy.testManifestServicePaths('igbo');
    cy.testManifestServicePaths('pidgin');
    cy.testManifestServicePaths('yoruba');
  });
});
