import { testResponseCode } from '../support/metaTestHelper';
import describeForLocalOnly from '../support/describeForLocalOnly';

const testArticleServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    testResponseCode(`/${service}/articles/manifest.json`, 200);
  });
};

const testFrontpageServiceWorker200s = service => {
  it(`should return a 200 status code for ${service}`, () => {
    testResponseCode(`/${service}/manifest.json`, 200);
  });
};

describe('Service worker files', () => {
  ['news'].forEach(testArticleServiceWorker200s);
});

describeForLocalOnly('Local Env - Service worker files', () => {
  ['persian'].forEach(testArticleServiceWorker200s);
  ['igbo', 'pidgin', 'yoruba'].forEach(testFrontpageServiceWorker200s);
});
