import { testNonHTMLResponseCode } from './test-helper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testNonHTMLResponseCode('/data/test/scenario-01.json', 200);
  });
});
