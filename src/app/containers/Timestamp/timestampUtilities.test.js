import {
  isValidDateTime,
  leadingZero,
  isTenHoursAgoOrLess,
  formatUnixTimestamp,
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

  describe('formatUnixTimestamp', () => {
    it('should return BST for a BST timestamp', () => {
      // 31 May 2017 BST
      const BSTTimestamp = 1496235600000;
      const result = formatUnixTimestamp(BSTTimestamp, 'D MMMM YYYY, HH:mm z');
      expect(result).toContain('BST');
    });

    it('should return GMT for a GMT timestamp', () => {
      // 1 January 2017 GMT
      const GMTTimestamp = 1483275600000;
      const result = formatUnixTimestamp(GMTTimestamp, 'D MMMM YYYY, HH:mm z');
      expect(result).toContain('GMT');
    });

    it('should return date and time in expected format', () => {
      const GMTTimestamp = 1483275600000;
      const result = formatUnixTimestamp(GMTTimestamp, 'D MMMM YYYY, HH:mm z');
      expect(result).toEqual('1 January 2017, 13:00 GMT');
    });

    it('should return short date in expected format', () => {
      const GMTTimestamp = 1483275600000;
      const result = formatUnixTimestamp(GMTTimestamp, 'YYYY-MM-DD');
      expect(result).toEqual('2017-01-01');
    });

    it('should return long date in expected format', () => {
      const GMTTimestamp = 1483275600000;
      const result = formatUnixTimestamp(GMTTimestamp, 'D MMMM YYYY');
      expect(result).toEqual('1 January 2017');
    });
  });
});
