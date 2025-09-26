import services from '../../../../../server/utilities/serviceConfigs';
import expectedFormats from './expectedFormats.json';
import { format, timestampsFixtures } from './testUtils';

delete services.ws;

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
});
