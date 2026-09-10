import services from '#utilities/serviceConfigs';
import expectedFormats from './expectedFormats.json';
import { format, formatTimestamp, timestampsFixtures } from './testUtils';

describe('Timestamp Formats', () => {
  Object.keys(services).forEach(service => {
    describe(`for ${service}`, () => {
      const variants = Object.keys(services[service]);
      variants.forEach(variant => {
        describe(`${variant}`, () => {
          const { datetimeLocale, timezone, altCalendar } =
            services[service][variant];

          Object.keys(timestampsFixtures).forEach(fixture => {
            it(`should match expected value for ${fixture}`, () => {
              expect(
                format({ datetimeLocale, timezone, fixture, altCalendar }),
              ).toEqual(expectedFormats[service][variant][fixture]);
            });
          });
        });
      });
    });
  });

  describe('Timestamp Edge Cases', () => {
    it('should preserve timezone output around DST start for Europe/London', () => {
      const beforeDSTStart = Date.UTC(2021, 2, 28, 0, 30, 0); // 00:30 GMT
      const afterDSTStart = Date.UTC(2021, 2, 28, 1, 30, 0); // 02:30 BST

      expect(
        formatTimestamp({
          datetimeLocale: services.news.default.datetimeLocale,
          timezone: services.news.default.timezone,
          time: beforeDSTStart,
        }),
      ).toEqual('28 March 2021, 00:30 GMT');

      expect(
        formatTimestamp({
          datetimeLocale: services.news.default.datetimeLocale,
          timezone: services.news.default.timezone,
          time: afterDSTStart,
        }),
      ).toEqual('28 March 2021, 02:30 BST');
    });

    it('should preserve timezone output around DST end for Europe/London', () => {
      const beforeDSTEnd = Date.UTC(2021, 9, 31, 0, 30, 0); // 01:30 BST
      const afterDSTEnd = Date.UTC(2021, 9, 31, 1, 30, 0); // 01:30 GMT

      expect(
        formatTimestamp({
          datetimeLocale: services.news.default.datetimeLocale,
          timezone: services.news.default.timezone,
          time: beforeDSTEnd,
        }),
      ).toEqual('31 October 2021, 01:30 BST');

      expect(
        formatTimestamp({
          datetimeLocale: services.news.default.datetimeLocale,
          timezone: services.news.default.timezone,
          time: afterDSTEnd,
        }),
      ).toEqual('31 October 2021, 01:30 GMT');
    });

    it('should preserve half-hour offset output for Asia/Kabul', () => {
      const utcTimestamp = Date.UTC(2021, 5, 15, 12, 0, 0); // 15 June 2021 12:00 UTC

      expect(
        formatTimestamp({
          datetimeLocale: services.dari.default.datetimeLocale,
          timezone: services.dari.default.timezone,
          time: utcTimestamp,
        }),
      ).toEqual('۱۵ جون ۲۰۲۱ ۱۶:۳۰');
    });

    it('should preserve timezone output around DST start for Europe/Bucharest', () => {
      const beforeDSTStart = Date.UTC(2021, 2, 28, 0, 30, 0); // 02:30 EET
      const afterDSTStart = Date.UTC(2021, 2, 28, 1, 30, 0); // 04:30 EEST

      expect(
        formatTimestamp({
          datetimeLocale: services.romania.default.datetimeLocale,
          timezone: services.romania.default.timezone,
          time: beforeDSTStart,
        }),
      ).toEqual('28 martie 2021, 02:30 EET');

      expect(
        formatTimestamp({
          datetimeLocale: services.romania.default.datetimeLocale,
          timezone: services.romania.default.timezone,
          time: afterDSTStart,
        }),
      ).toEqual('28 martie 2021, 04:30 EEST');
    });
  });
});
