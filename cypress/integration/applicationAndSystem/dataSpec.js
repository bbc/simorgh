import config from '../../support/config';
import { testResponseCode } from '../../support/metaTestHelper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testResponseCode(`/news/articles/${config.assets.news}.json`, 200);
  });
});
