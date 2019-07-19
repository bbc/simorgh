import { describeForLocalOnly } from '../../support/limitEnvRuns';

const testArticleServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/articles/sw.js`,
      200,
      'application/javascript',
    );
  });
};

const testFrontpageServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
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

describeForLocalOnly('Local Env - Service worker files', () => {
  ['persian'].forEach(testArticleServiceWorker200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testFrontpageServiceWorker200s);
});

const testManifest200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/articles/manifest.json`,
      200,
      'application/json',
    );
  });
};

const testManifestServicePaths = service => {
  it(`should return a 200 status code for ${service} without /articles`, () => {
    cy.testResponseCodeAndType(
      `/${service}/manifest.json`,
      200,
      'application/json',
    );
  });
};

describe('Manifest.json files', () => {
  ['news'].forEach(testManifest200s);
});

describeForLocalOnly('Local Env - Manifest.json files', () => {
  ['persian'].forEach(testManifest200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testManifestServicePaths);
});
