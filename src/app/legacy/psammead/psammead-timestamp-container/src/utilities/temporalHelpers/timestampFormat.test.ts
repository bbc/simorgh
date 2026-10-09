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
      ['LLL', '19 October 2018 17:10'],
      ['D MMMM YYYY, HH:mm z', '19 October 2018, 17:10 GMT'],
      ['D MMMM YYYY', '19 October 2018'],
      ['DD MMMM YYYY', '19 October 2018'],
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

    it('pads the day for DD MMMM YYYY', () => {
      expect(
        formatTimestampToken({
          format: 'DD MMMM YYYY',
          timestamp: Date.UTC(2018, 9, 9, 16, 30, 6),
          timezone: 'GMT',
          locale: 'en-GB',
        }),
      ).toEqual('09 October 2018');
    });

    it('preserves Arabic editorial digits and replaces the default comma', () => {
      expect(
        formatTimestampToken({
          format: 'LL, LT z',
          timestamp,
          timezone: 'GMT',
          locale: 'ar',
        }),
      ).toEqual('19 أكتوبر/ تشرين الأول 2018، 17:10 GMT');
    });

    it.each([
      ['fa-AF', '۲۱ نوامبر ۲۰۲۴'],
      ['pt-BR', '21 novembro 2024'],
      ['zh-TW', '2024年11月21日'],
      ['zh-CN', '2024年11月21日'],
      ['hu', '2024. november 21.'],
      ['ja', '2024年11月21日'],
      ['ko', '2024년 11월 21일'],
      ['ky', '21 ноябрь 2024'],
      ['ne', '२१ नोभेम्बर २०२४'],
      ['mr', '21 नोव्हेंबर 2024'],
    ])('formats the editorial date style for %s', (locale, expected) => {
      expect(
        formatTimestampToken({
          format: 'LL',
          timestamp: Date.UTC(2024, 10, 21),
          timezone: 'UTC',
          locale,
        }),
      ).toEqual(expected);
    });

    it.each([
      ['fa-AF', '۲۱ نوامبر ۲۰۲۴ ۰۰:۰۰'],
      ['hu', '2024. november 21. 0:00'],
      ['ja', '2024年11月21日 00:00'],
      ['ko', '2024년 11월 21일 오전 12:00'],
      ['zh-CN', '2024年11月21日凌晨12点00分'],
      ['zh-TW', '2024年11月21日 00:00'],
    ])(
      'formats the long editorial date and time for %s',
      (locale, expected) => {
        expect(
          formatTimestampToken({
            format: 'LLL',
            timestamp: Date.UTC(2024, 10, 21),
            timezone: 'UTC',
            locale,
          }),
        ).toEqual(expected);
      },
    );

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

    it.each<[TimestampFormat, string]>([
      ['LL', '24th March 2026'],
      ['LL, LT z', '24th March 2026, 00:00 GMT'],
    ])('uses Pidgin ordinal days for %s', (format, expected) => {
      expect(
        formatTimestampToken({
          format,
          timestamp: Date.UTC(2026, 2, 24),
          timezone: 'GMT',
          locale: 'pcm',
        }),
      ).toEqual(expected);
    });

    it('keeps explicit numeric day formats unchanged for Pidgin', () => {
      expect(
        formatTimestampToken({
          format: 'D MMMM YYYY',
          timestamp: Date.UTC(2026, 2, 24),
          timezone: 'GMT',
          locale: 'pcm',
        }),
      ).toEqual('24 March 2026');
    });
  });
});
