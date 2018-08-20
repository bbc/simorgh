import { testNonHTMLResponseCode } from '../support/testHelper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testNonHTMLResponseCode('/data/c0000000001o.json', 200);
  });
});
