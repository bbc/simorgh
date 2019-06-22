import { describeForLocalOnly } from '../../support/limitEnvRuns';

const testManifest200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.request(`/${service}/articles/manifest.json`);
  });
};

const testManifestServicePaths = service => {
  it(`should return a 200 status code for ${service} without /articles`, () => {
    cy.request(`/${service}/manifest.json`);
  });
};

describe('Manifest.json files', () => {
  ['news'].forEach(testManifest200s);
});

describeForLocalOnly('Local Env - Manifest.json files', () => {
  ['persian'].forEach(testManifest200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testManifestServicePaths);
});
