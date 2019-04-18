import { isValidDateTime, isTenHoursAgoOrLess, relativeTime } from './timestampUtilities';
import { timestampGenerator } from '../Timestamp/helpers/testHelpers';

const timestamp = 1539969006000; // 19 October 2018

const relativeBehaviour = (description, input, expectedOutput) => {
  it(description, () => {
    const result = relativeTime(input);
    expect(result).toEqual(expectedOutput);
  });
};

describe('ArticleTimestamp Utility functions', () => {
  describe('isValidDateTime', () => {
    it('should return true if timestamp is valid', () => {
      expect(isValidDateTime(timestamp)).toEqual(true);
      expect(isValidDateTime(0)).toEqual(true);
      expect(isValidDateTime(-30000000)).toEqual(true);
    });
    it('should return false if timestamp is invalid or missing', () => {
      expect(isValidDateTime('foo')).toEqual(false);
      expect(isValidDateTime(null)).toEqual(false);
      expect(isValidDateTime(undefined)).toEqual(false);
      expect(isValidDateTime()).toEqual(false);
    });
  });

  describe('isTenHoursAgoOrLess', () => {
    it('should return true if 10 hours ago or less', () => {
      const currentTime = Date.now();
      const threeHoursAgo = currentTime - 60 * 60 * 1000 * 3;
      const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
      const buffer = 100; // allow 100 milliseconds computation time as Date.now() value is different by the time we call `isTenHoursAgoOrLess`
      expect(isTenHoursAgoOrLess(currentTime)).toEqual(true);
      expect(isTenHoursAgoOrLess(threeHoursAgo)).toEqual(true);
      expect(isTenHoursAgoOrLess(tenHoursAgo + buffer)).toEqual(true);
    });
    it('should return false if more than 10 hours ago', () => {
      const currentTime = Date.now();
      const tenHoursAgo = currentTime - 60 * 60 * 1000 * 10;
      const tenHoursAgoAndOneSecond = tenHoursAgo - 1000;
      expect(isTenHoursAgoOrLess(tenHoursAgoAndOneSecond)).toEqual(false);
    });
  });
});

describe('relativeTime', () => {
  it('returns a string which ends in ago', () => {
    const timestamp = timestampGenerator({ minutes: 1 });
    const result = relativeTime(timestamp);
    expect(typeof result).toEqual('string');
    expect(result.split(' ').pop()).toEqual('ago');
  });

  relativeBehaviour(
    'returns 1 minute ago',
    timestampGenerator({ minutes: 1 }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns 5 minutes ago',
    timestampGenerator({ minutes: 5 }),
    '5 minutes ago',
  );

  relativeBehaviour(
    'returns 5 mins ago for 5 mins 50 seconds',
    timestampGenerator({ minutes: 5, seconds: 50 }),
    '5 minutes ago',
  );

  relativeBehaviour(
    'returns 1 hour ago',
    timestampGenerator({ hours: 1 }),
    '1 hour ago',
  );

  relativeBehaviour(
    'returns 5 hours ago',
    timestampGenerator({ hours: 5 }),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 5 hours ago for 5 hours 30 mins',
    timestampGenerator({ hours: 5, minutes: 30 }),
    '5 hours ago',
  );

  relativeBehaviour(
    'returns 1 minute ago for 10 seconds',
    timestampGenerator({ milliseconds: 10 }),
    '1 minute ago',
  );

  relativeBehaviour(
    'returns null when greater than 10 hours ago',
    timestampGenerator({ hours: 94 }),
    null,
  );

  relativeBehaviour(
    'returns null for 10 seconds in the future',
    timestampGenerator({ seconds: -10 }),
    null,
  );
});
