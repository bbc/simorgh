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

describe('checkFailures', () => {});
