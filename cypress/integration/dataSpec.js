import { testNonHTMLResponseCode } from '../support/metaTestHelper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testNonHTMLResponseCode('/data/news/articles/c85pqyj5m2ko.json', 200);
  });
});
