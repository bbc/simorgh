import { testResponseCode } from '../support/metaTestHelper';
import { describeForLocalOnly } from '../support/limitEnvRuns';

const testManifest200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    testResponseCode(`/${service}/articles/manifest.json`, 200);
  });
};

const testManifestServicePaths = service => {
  it(`should return a 200 status code for ${service} without /articles`, () => {
    testResponseCode(`/${service}/manifest.json`, 200);
  });
};

describe('Manifest.json files', () => {
  ['news'].forEach(testManifest200s);
});

describeForLocalOnly('Local Env - Manifest.json files', () => {
  ['persian'].forEach(testManifest200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testManifestServicePaths);
});
