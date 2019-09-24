import services from '../../../../testHelpers/serviceConfigs';
import expectedFormats from './expectedFormats.json';
import { format, timestampsFixtures } from './testUtils';

const testsServces = ['news', 'persian', 'igbo', 'arabic'];

describe('Timestamp Formats', () => {
  Object.keys(services).forEach(service => {
    if (testsServces.includes(service)) {
      describe(`for ${service}`, () => {
        const { datetimeLocale, timezone } = services[service].default;

        Object.keys(timestampsFixtures).forEach(fixture => {
          it(`should match expected value for ${fixture}`, () => {
            expect(format(datetimeLocale, timezone, fixture)).toEqual(
              expectedFormats[service][fixture],
            );
          });
        });
      });
    }
  });
});
