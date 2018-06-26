import { testNonHTMLResponseCode } from '../support/test-helper';

describe('Simorgh Status', () => {
  it('should return 200', () => {
    testNonHTMLResponseCode('/status', 200);
  });
});
