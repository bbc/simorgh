import '#app/lib/locales/timestamp/ar';
import '#app/lib/locales/timestamp/cy';
import '#app/lib/locales/timestamp/en-gb';
import '#app/lib/locales/timestamp/fa-af';
import '#app/lib/locales/timestamp/gd';
import '#app/lib/locales/timestamp/hi';
import '#app/lib/locales/timestamp/id';
import '#app/lib/locales/timestamp/ja';
import '#app/lib/locales/timestamp/ky';
import '#app/lib/locales/timestamp/mr';
import '#app/lib/locales/timestamp/my';
import '#app/lib/locales/timestamp/ne';
import '#app/lib/locales/timestamp/om';
import '#app/lib/locales/timestamp/pcm';
import '#app/lib/locales/timestamp/pl';
import '#app/lib/locales/timestamp/ps';
import '#app/lib/locales/timestamp/pt-br';
import '#app/lib/locales/timestamp/ro';
import '#app/lib/locales/timestamp/ru';
import '#app/lib/locales/timestamp/si';
import '#app/lib/locales/timestamp/so';
import '#app/lib/locales/timestamp/sr';
import '#app/lib/locales/timestamp/sr-cyrl';
import '#app/lib/locales/timestamp/sw';
import '#app/lib/locales/timestamp/ur';
import '#app/lib/locales/timestamp/vi';
import '#app/lib/locales/timestamp/yo';
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
      ['Asia/Kathmandu', 'en-GB', '+0545'],
      ['America/Sao_Paulo', 'en-GB', '-03'],
      ['GMT', 'en-GB', 'GMT'],
      ['GMT', 'ar', 'GMT'],
      ['Africa/Lagos', 'yo', 'WAT'],
      ['Africa/Lagos', 'pcm', 'WAT'],
      ['Africa/Addis_Ababa', 'om', 'EAT'],
      ['Africa/Mogadishu', 'so', 'EAT'],
      ['Africa/Nairobi', 'sw', 'EAT'],
      ['Asia/Kolkata', 'hi', 'IST'],
      ['Asia/Karachi', 'ur', 'PKT'],
      ['Asia/Jakarta', 'id', 'WIB'],
      ['Asia/Tokyo', 'ja', 'JST'],
    ])('resolves %s for %s to %s', (timezone, locale, expected) => {
      expect(
        resolveTimeZoneLabel({
          timestamp: Date.UTC(2021, 5, 15, 12),
          timezone,
          locale,
        }),
      ).toEqual(expected);
    });

    it.each([
      ['en-GB', 'Europe/London', Date.UTC(2021, 2, 28, 0, 30), 'GMT'],
      ['en-GB', 'Europe/London', Date.UTC(2021, 2, 28, 1, 30), 'BST'],
      ['cy', 'Europe/London', Date.UTC(2021, 6, 1, 12), 'BST'],
      ['gd', 'Europe/London', Date.UTC(2021, 6, 1, 12), 'BST'],
      ['gd', 'Europe/London', Date.UTC(2021, 0, 1, 12), 'GMT'],
      ['pl', 'Europe/Warsaw', Date.UTC(2021, 0, 1, 12), 'CET'],
      ['pl', 'Europe/Warsaw', Date.UTC(2021, 6, 1, 12), 'CEST'],
      ['ro', 'Europe/Bucharest', Date.UTC(2021, 0, 1, 12), 'EET'],
      ['ro', 'Europe/Bucharest', Date.UTC(2021, 6, 1, 12), 'EEST'],
    ])(
      'resolves %s DST label for %s at %i to %s',
      (locale, timezone, timestampValue, expected) => {
        expect(
          resolveTimeZoneLabel({
            timestamp: timestampValue,
            timezone,
            locale,
          }),
        ).toEqual(expected);
      },
    );
  });

  describe('formatTimestampToken', () => {
    it('formats Nepali numeric timestamps with Devanagari numerals', () => {
      const timestampValue = Date.UTC(2024, 10, 21, 0, 5);

      expect(
        formatTimestampToken({
          format: 'YYYY-MM-DD',
          timestamp: timestampValue,
          timezone: 'UTC',
          locale: 'ne',
        }),
      ).toEqual('२०२४-११-२१');

      expect(
        formatTimestampToken({
          format: 'HH:mm',
          timestamp: timestampValue,
          timezone: 'UTC',
          locale: 'ne',
        }),
      ).toEqual('००:०५');
    });

    it.each<[TimestampFormat, string]>([
      ['YYYY年M月D日', '2024年11月1日'],
      ['YYYY年M月DD日', '2024年11月01日'],
    ])('formats Zhongwen compatibility token %s', (format, expected) => {
      expect(
        formatTimestampToken({
          format,
          timestamp: Date.UTC(2024, 10, 1),
          timezone: 'UTC',
          locale: 'zh-cn',
        }),
      ).toEqual(expected);
    });

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
      ['ru', '21 ноября 2024'],
      ['vi', '21 tháng 11 năm 2024'],
      ['si', '2024 නොවැම්බර් 21'],
      ['my', '၂၁ နိုဝင်ဘာ ၂၀၂၄'],
      ['id', '21 November 2024'],
      ['yo', '21 Bélú 2024'],
      ['gd', '21 An t-Samhain 2024'],
      ['de', '21 November 2024'],
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
      ['sr', '18 oktobar 2024'],
      ['sr-cyrl', '18 октобар 2024'],
    ])(
      'formats Serbian dates without a year terminator for %s',
      (locale, expected) => {
        expect(
          formatTimestampToken({
            format: 'LL',
            timestamp: Date.UTC(2024, 9, 18),
            timezone: 'UTC',
            locale,
          }),
        ).toEqual(expected);
      },
    );

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
