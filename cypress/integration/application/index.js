import { describeForLocalOnly } from '../../support/limitEnvRuns';

describe('Service worker files', () => {
  ['news'].forEach(cy.testArticleServiceWorker200s);
});

describeForLocalOnly('Local Env - Service worker files', () => {
  ['persian'].forEach(cy.testArticleServiceWorker200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(cy.testFrontpageServiceWorker200s);
});

describe('Manifest.json files', () => {
  ['news'].forEach(cy.testManifest200s);
});

describeForLocalOnly('Local Env - Manifest.json files', () => {
  ['persian'].forEach(cy.testManifest200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(cy.testManifestServicePaths);
});
