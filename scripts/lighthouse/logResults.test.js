import { logHighLevelScores, checkFailures } from './logResults';
import {
  validatedFailingScores,
  validatedPassingScores,
  failures,
} from './fixtures';

describe('logHighLevelScores', () => {
  it('Should return an array of failures when there are failures', () => {
    expect(logHighLevelScores(validatedFailingScores)).toEqual(failures);
  });
  it('Should return an empty array when there are no failures', () => {
    expect(logHighLevelScores(validatedPassingScores)).toEqual([]);
  });
});

describe('checkFailures', () => {
  describe('no failures', () => {
    it('Should return false if there are no failures', () => {
      const result = checkFailures([]);
      expect(result).toBe(false);
    });
  });
  describe('failures', () => {
    it('Should return true', () => {
      const result = checkFailures(failures);
      expect(result).toBe(true);
    });
    it('Should log failure message if failures are present', () => {
      global.console.log = jest.fn();

      checkFailures(failures);
      expect(global.console.log).toHaveBeenCalled();
    });
  });
});
