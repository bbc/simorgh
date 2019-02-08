import { testResponseCode } from '../support/metaTestHelper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testResponseCode('/news/articles/c85pqyj5m2ko.json', 200);
  });
});
