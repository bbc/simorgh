import {
  isValidDateTime,
  leadingZero,
  formatUnixTimestamp,
  isTenHoursAgoOrLess,
} from './timestampUtilities';

const timestamp = 1539969006000; // 19 October 2018

describe('Timestamp utility functions', () => {
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

  describe('leadingZero', () => {
    it('should add a leading zero when needed', () => {
      expect(leadingZero(3)).toEqual('03');
    });
    it('should NOT add a leading zero when NOT needed', () => {
      expect(leadingZero(10)).toEqual('10');
    });
  });

  describe('formatUnixTimestamp', () => {
    it('should format timestamp according to given format', () => {
      const longNumericFormat = {
        day: date => leadingZero(date.getDate()),
        month: date => leadingZero(date.getMonth() + 1),
        year: date => date.getFullYear(),
        format: (d, m, y) => [y, m, d].join('-'),
      };
      const shortAlphaNumericFormat = {
        day: date => date.getDate(),
        month: date => date.toLocaleString('en-us', { month: 'long' }),
        year: date => date.getFullYear(),
        format: (d, m, y) => [d, m, y].join(' '),
      };
      expect(formatUnixTimestamp(timestamp, longNumericFormat)).toEqual(
        '2018-10-19',
      );
      expect(formatUnixTimestamp(timestamp, shortAlphaNumericFormat)).toEqual(
        '19 October 2018',
      );
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
