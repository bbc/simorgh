import moment from 'moment-timezone';
import '.';
import assert from '../assert';

const locale = 'zh-tw';
const timezone = 'GMT';

moment.locale(locale);

describe(`${locale}`, () => {
  describe('format', () => {
    const date = new Date(2025, 1, 14, 15, 25, 50, 125);
    const formatted = moment(date).tz(timezone);

    test.each`
      format                    | expected
      ${'D MMMM YYYY'}          | ${'14 二月 2025'}
      ${'D MMMM YYYY, HH:mm z'} | ${'14 二月 2025, 15:25 GMT'}
      ${'LL'}                   | ${'2025年2月14日'}
      ${'LLL'}                  | ${'2025年2月14日下午3時25分'}
    `('$format: $expected', ({ format, expected }) => {
      assert.equal(formatted.format(format), expected);
    });
  });

  describe('relativeTime', () => {
    test.each`
      scenario           | ago         | expected
      ${'1 minute ago'}  | ${{ m: 1 }} | ${'1 分鐘前'}
      ${'5 minutes ago'} | ${{ m: 5 }} | ${'5 分鐘前'}
      ${'1 hour ago'}    | ${{ h: 1 }} | ${'1 小時前'}
      ${'5 hours ago'}   | ${{ h: 5 }} | ${'5 小時前'}
    `('$scenario: $expected', ({ ago, expected }) => {
      assert.equal(moment().subtract(ago).fromNow(), expected, expected);
    });
  });
});
