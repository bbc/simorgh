import { testNonHTMLResponseCode } from '../support/metaTestHelper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testNonHTMLResponseCode('/news/articles/c0000000027o.json', 200);
  });
});
