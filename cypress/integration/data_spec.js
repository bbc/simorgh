import { testResponseCode } from './test-helper';

describe('Static Articles data', () => {
  describe('Page Status', () => {
      it('should display 200', () => {
        testResponseCode('/data/test/scenario-01.json', 200)
      })
  });
});
