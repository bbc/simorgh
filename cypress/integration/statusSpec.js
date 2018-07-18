import { testNonHTMLResponseCode } from '../support/testHelper';

describe('Simorgh Status', () => {
  it('should return 200', () => {
    testNonHTMLResponseCode('/status', 200);
  });
});
