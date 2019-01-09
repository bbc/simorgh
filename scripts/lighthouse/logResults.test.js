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
    it('Should log failure message and exit 1 if failures are present', () => {
      global.console.log = jest.fn();
      process.exit = jest.fn();

      try {
        checkFailures(failures);
      } catch (error) {
        expect(global.console.log).toHaveBeenCalled();
        expect(process.exit).toHaveBeenCalledWith(1);
      }
    });
  });
});
