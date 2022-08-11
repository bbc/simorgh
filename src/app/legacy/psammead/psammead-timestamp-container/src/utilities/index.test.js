import moment from 'moment-timezone';
import {
  formatDuration,
  formatUnixTimestamp,
  isValidDateTime,
  localisedMoment,
} from '.';
import timestampGenerator from '../helpers/testHelpers';

const timezone = 'Europe/London';
const timestamp = 1539969006000; // 19 October 2018
const locale = 'en-gb';

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

  describe('localisedMoment', () => {
    it('should be a valid moment when timestamp and locale are passed in', () => {
      expect(localisedMoment({ timestamp, locale })).toHaveProperty('isValid');
    });
  });

  describe('formatUnixTimestamp', () => {
    const GMTTimestamp = 1483275600000; // 1 January 2017 GMT
    const BSTTimestamp = 1496235600000; // 31 May 2017 BST
    const isRelative = false;

    it('should return BST for a BST timestamp', () => {
      const result = formatUnixTimestamp({
        timestamp: BSTTimestamp,
        format: 'D MMMM YYYY, HH:mm z',
        timezone,
        locale,
      });
      expect(result).toContain('BST');
    });

    it('should return GMT for a GMT timestamp', () => {
      const result = formatUnixTimestamp({
        timestamp: GMTTimestamp,
        format: 'D MMMM YYYY, HH:mm z',
        timezone,
        locale,
      });
      expect(result).toContain('GMT');
    });

    it('should return date and time in expected format', () => {
      const result = formatUnixTimestamp({
        timestamp: GMTTimestamp,
        format: 'D MMMM YYYY, HH:mm z',
        timezone,
        locale,
      });
      expect(result).toEqual('1 January 2017, 13:00 GMT');
    });

    it('should return short date in expected format', () => {
      const result = formatUnixTimestamp({
        timestamp: GMTTimestamp,
        format: 'YYYY-MM-DD',
        timezone,
        locale,
      });
      expect(result).toEqual('2017-01-01');
    });

    it('should return long date in expected format', () => {
      const result = formatUnixTimestamp({
        timestamp: GMTTimestamp,
        format: 'D MMMM YYYY',
        timezone,
        locale,
      });
      expect(result).toEqual('1 January 2017');
    });
    it('should return relative timestamp if isRelative is true', () => {
      const nineHoursAgo = timestampGenerator({ hours: 9 });
      const output = formatUnixTimestamp({
        timestamp: nineHoursAgo,
        format: 'D MMMM YYYY',
        timezone,
        locale,
        isRelative: true,
      });
      const expectedOutput = '9 hours ago';
      expect(output).toEqual(expectedOutput);
    });

    it('should return timestamp with format if format is provided', () => {
      const output = formatUnixTimestamp({
        timestamp,
        format: 'D MMMM YYYY',
        timezone,
        locale,
        isRelative,
      });
      const expectedOutput = '19 October 2018';
      expect(output).toEqual(expectedOutput);
    });

    it('should return timestamp with default format if format is not provided', () => {
      const output = formatUnixTimestamp({
        timestamp,
        format: null,
        timezone,
        locale,
        isRelative,
      });
      const expectedOutput = '19 October 2018, 18:10 BST';
      expect(output).toEqual(expectedOutput);
    });

    it('should not return a timestamp when you do not pass in a timestamp to be formatted', () => {
      const result = formatUnixTimestamp({
        format: 'D MMMM YYYY, HH:mm z',
        timezone,
        locale,
      });
      expect(result).toBeUndefined();
    });
  });
});

describe('Moment configuration', () => {
  it('rounds down', () => {
    const wouldOtherwiseRoundUp = moment()
      .subtract(59, 'minutes')
      .subtract(59, 'seconds');

    // default moment configuration would return 'an hour ago'
    expect(wouldOtherwiseRoundUp.fromNow()).toEqual('59 minutes ago');
  });

  it('never reports relative timestamps in seconds', () => {
    const now = moment();
    // default moment configuration would return 'a few seconds ago'
    expect(now.fromNow()).toEqual('a minute ago');

    const ten = moment().subtract(10, 'seconds');
    // default moment configuration would return '10 seconds ago'
    expect(ten.fromNow()).toEqual('a minute ago');
  });

  it('reports all relative timestamps < 1 hour rounded down to nearest minute', () => {
    const ten = moment().subtract(10, 'minutes');
    // default moment configuration would return '10 minutes ago' (no change)
    expect(ten.fromNow()).toEqual('10 minutes ago');

    const fifty = moment().subtract(50, 'minutes');
    // default moment configuration would return 'an hour ago'
    expect(fifty.fromNow()).toEqual('50 minutes ago');
  });

  it('reports all relative timestamps >= 1 hour and < 24 hours rounded down to nearest hour', () => {
    const one = moment().subtract(1, 'hour');
    // default moment configuration would return 'an hour ago' (no change)
    expect(one.fromNow()).toEqual('an hour ago');

    const two = moment().subtract(2, 'hours');
    // default moment configuration would return '2 hours ago' (no change)
    expect(two.fromNow()).toEqual('2 hours ago');

    const twentyThree = moment().subtract(23, 'hours');
    // default moment configuration would return 'a day ago'
    expect(twentyThree.fromNow()).toEqual('23 hours ago');

    const allButADay = moment().subtract(23, 'hours').subtract(59, 'seconds');
    // default moment configuration would return 'a day ago'
    expect(allButADay.fromNow()).toEqual('23 hours ago');
  });

  // the expect functionality fails, is done to fix the bug.
  it('reports all relative timestamps >= 1 day and < 1 month rounded down to nearest day in DST', () => {
    moment.now = jest.fn().mockImplementation(() => {
      // July
      return 1657637911000;
    });
    const one = moment().subtract(1, 'day');
    // default moment configuration would return 'a day ago' (no change)
    expect(one.fromNow()).toEqual('a day ago');

    const two = moment().subtract(2, 'days');
    // default moment configuration would return '2 days ago' (no change)
    expect(two.fromNow()).toEqual('2 days ago');

    const allButAMonth = moment().subtract(30, 'days').add(1, 'second');
    // default moment configuration would return 'a month ago'
    expect(allButAMonth.fromNow()).toEqual('29 days ago');
  });

  it('reports all relative timestamps >= 1 day and < 1 month rounded down to nearest day out of DST', () => {
    moment.now = jest.fn().mockImplementation(() => {
      // Nov
      return 1668265111000;
    });
    const one = moment().subtract(1, 'day');
    // default moment configuration would return 'a day ago' (no change)
    expect(one.fromNow()).toEqual('a day ago');

    const two = moment().subtract(2, 'days');
    // default moment configuration would return '2 days ago' (no change)
    expect(two.fromNow()).toEqual('2 days ago');

    const allButAMonth = moment().subtract(30, 'days').add(1, 'day');
    // default moment configuration would return 'a month ago'
    expect(allButAMonth.fromNow()).toEqual('29 days ago');
  });

  it('reports all relative timestamps >= 1 month and < 1 year rounded down to nearest month', () => {
    const one = moment().subtract(1, 'month');
    // default moment configuration would return 'a month ago' (no change)
    expect(one.fromNow()).toEqual('a month ago');

    const two = moment().subtract(2, 'months');
    // default moment configuration would return '2 months ago' (no change)
    expect(two.fromNow()).toEqual('2 months ago');

    const allButAYear = moment()
      .subtract(12, 'months')
      // this was originally `.add(1, 'second') but that caused the tests to fail on the 31st of the month
      // (because the threshold for a month has been configured to 30 days) so instead
      // be safely away from this edge case by going 5 days away
      .add(5, 'days');
    // default moment configuration would return 'a month ago'
    expect(allButAYear.fromNow()).toEqual('11 months ago');
  });

  describe('formatDuration', () => {
    it('should return duration in default format', () => {
      const duration = 'PT30M'; // 30:00
      expect(formatDuration({ duration })).toEqual('30:00');
    });
    it('should return duration with hours in default format', () => {
      const duration = 'PT1H30M'; // 1:30:00
      expect(formatDuration({ duration })).toEqual('1:30:00');
    });
    it('should return duration in relevant format when a format is passed in', () => {
      const duration = 'PT30M'; // 30:00
      expect(formatDuration({ duration, format: 'mm,ss' })).toEqual('30,00');
    });
    it('should return duration that is localised when locale is passed in', () => {
      const duration = 'PT30M'; // 30:00
      expect(formatDuration({ duration, locale: 'my' })).toEqual('၃၀:၀၀');
    });
  });
});
