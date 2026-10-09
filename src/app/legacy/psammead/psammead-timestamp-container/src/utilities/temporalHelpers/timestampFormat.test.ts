import {
  formatTimestampToken,
  resolveTimeZoneLabel,
  TimestampFormat,
  toZonedDateTime,
} from './timestampFormat';

const timestamp = 1539969006000;

describe('Timestamp formatting Temporal helpers', () => {
  describe('toZonedDateTime', () => {
    it('creates a ZonedDateTime in the requested timezone', () => {
      const result = toZonedDateTime({
        timestamp,
        timezone: 'Europe/London',
      });

      expect(result?.epochMilliseconds).toEqual(timestamp);
      expect(result?.timeZoneId).toEqual('Europe/London');
    });

    it('returns undefined when Temporal is unavailable', () => {
      const originalTemporal = globalThis.Temporal;
      try {
        // @ts-expect-error - simulating an environment without Temporal support
        delete globalThis.Temporal;
        expect(toZonedDateTime({ timestamp })).toBeUndefined();
      } finally {
        globalThis.Temporal = originalTemporal;
      }
    });
  });

  describe('resolveTimeZoneLabel', () => {
    it.each([
      ['Africa/Lagos', 'WAT'],
      ['Asia/Kathmandu', '+0545'],
      ['America/Sao_Paulo', '-03'],
      ['GMT', 'GMT'],
    ])('resolves %s to %s', (timezone, expected) => {
      expect(
        resolveTimeZoneLabel({
          timestamp: Date.UTC(2021, 5, 15, 12),
          timezone,
          locale: 'en-GB',
        }),
      ).toEqual(expected);
    });

    it.each([
      [Date.UTC(2021, 2, 28, 0, 30), 'GMT'],
      [Date.UTC(2021, 2, 28, 1, 30), 'BST'],
    ])(
      'resolves Europe/London DST labels to %s',
      (timestampValue, expected) => {
        expect(
          resolveTimeZoneLabel({
            timestamp: timestampValue,
            timezone: 'Europe/London',
            locale: 'en-GB',
          }),
        ).toEqual(expected);
      },
    );
  });

  describe('formatTimestampToken', () => {
    it.each<[TimestampFormat, string]>([
      ['LL, LT z', '19 October 2018, 17:10 GMT'],
      ['LL', '19 October 2018'],
      ['D MMMM YYYY, HH:mm z', '19 October 2018, 17:10 GMT'],
      ['D MMMM YYYY', '19 October 2018'],
      ['HH:mm', '17:10'],
      ['YYYY-MM-DD', '2018-10-19'],
    ])('formats %s as %s', (format, expected) => {
      expect(
        formatTimestampToken({
          format,
          timestamp,
          timezone: 'GMT',
          locale: 'en-GB',
        }),
      ).toEqual(expected);
    });

    it('localises Arabic digits and replaces the default comma', () => {
      expect(
        formatTimestampToken({
          format: 'LL, LT z',
          timestamp,
          timezone: 'GMT',
          locale: 'ar',
        }),
      ).toEqual('١٩ أكتوبر ٢٠١٨، ١٧:١٠ GMT');
    });

    it('uses the Gregorian calendar and existing field order for Pashto', () => {
      expect(
        formatTimestampToken({
          format: 'LL',
          timestamp: Date.UTC(2024, 10, 21),
          timezone: 'UTC',
          locale: 'ps',
        }),
      ).toEqual('۲۱ نومبر ۲۰۲۴');
    });
  });
});
