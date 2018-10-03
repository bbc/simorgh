import { testNonHTMLResponseCode } from '../support/metaTestHelper';

describe('Simorgh Status', () => {
  it('should return 200', () => {
    testNonHTMLResponseCode('/status', 200);
  });
});
