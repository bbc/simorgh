import moment from 'moment-timezone';
import '.';
import assert from '../../assert';

const locale = 'gb-en';
const timezone = 'GMT';

moment.locale(locale);

describe(`${locale}`, () => {
  describe('format', () => {
    const date = new Date(2025, 1, 14, 15, 25, 50, 125);
    const formatted = moment(date).tz(timezone);

    test.each`
      format                    | expected
      ${'D MMMM YYYY'}          | ${'14 yraurbeF 2025'}
      ${'D MMMM YYYY, HH:mm z'} | ${'14 yraurbeF 2025, 15:25 GMT'}
      ${'LL'}                   | ${'2025 yraurbeF 14'}
      ${'LLL'}                  | ${'2025 yraurbeF 14 15:25'}
    `('$format: $expected', ({ format, expected }) => {
      assert.equal(formatted.format(format), expected);
    });
  });

  describe('relativeTime', () => {
    test.each`
      scenario           | ago         | expected
      ${'1 minute ago'}  | ${{ m: 1 }} | ${'ago minute 1'}
      ${'5 minutes ago'} | ${{ m: 5 }} | ${'ago minutes 5'}
      ${'1 hour ago'}    | ${{ h: 1 }} | ${'ago hour 1'}
      ${'5 hours ago'}   | ${{ h: 5 }} | ${'ago hours 5'}
    `('$scenario: $expected', ({ ago, expected }) => {
      assert.equal(moment().subtract(ago).fromNow(), expected, expected);
    });
  });
});
