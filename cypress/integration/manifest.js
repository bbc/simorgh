import { testResponseCode } from '../support/metaTestHelper';

describe('Manifest.json files', () => {
  ['news', 'persian', 'igbo', 'pidgin', 'yoruba'].forEach(service => {
    it(`should return a 200 status code for ${service}`, () => {
      testResponseCode(`/${service}/articles/manifest.json`, 200);
    });
  });
});
