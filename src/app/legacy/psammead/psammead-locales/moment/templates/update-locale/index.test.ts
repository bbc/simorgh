import moment from 'moment-timezone';
import '.';
import assert from '../../assert';

const locale = 'en-gb';
const timezone = 'GMT';

moment.locale(locale);

describe(`${locale}`, () => {
  describe('format', () => {
    const date = new Date(2025, 1, 14, 15, 25, 50, 125);
    const formatted = moment(date).tz(timezone);

    test.each`
      format                    | expected
      ${'D MMMM YYYY'}          | ${'14 FEBRUARY 2025'}
      ${'D MMMM YYYY, HH:mm z'} | ${'14 FEBRUARY 2025, 15:25 GMT'}
      ${'LL'}                   | ${'14 FEBRUARY 2025'}
      ${'LLL'}                  | ${'14 FEBRUARY 2025 15:25'}
    `('$format: $expected', ({ format, expected }) => {
      assert.equal(formatted.format(format), expected);
    });
  });

  describe('relativeTime', () => {
    test.each`
      scenario           | ago         | expected
      ${'1 minute ago'}  | ${{ m: 1 }} | ${'1 MINUTE AGO'}
      ${'5 minutes ago'} | ${{ m: 5 }} | ${'5 MINUTES AGO'}
      ${'1 hour ago'}    | ${{ h: 1 }} | ${'1 HOUR AGO'}
      ${'5 hours ago'}   | ${{ h: 5 }} | ${'5 HOURS AGO'}
    `('$scenario: $expected', ({ ago, expected }) => {
      assert.equal(moment().subtract(ago).fromNow(), expected, expected);
    });
  });
});
