import { testResponseCode } from './test-helper';

describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    testResponseCode('/data/test/scenario-01.json', 200)
  });
});
