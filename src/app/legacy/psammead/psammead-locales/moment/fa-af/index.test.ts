import moment from 'moment-timezone';
import '.';
import assert from '../assert';

const locale = 'fa-af';
const timezone = 'Asia/Kabul';

moment.locale(locale);

describe(`${locale}`, () => {
  describe('format', () => {
    const date = new Date(2025, 1, 14, 15, 25, 50, 125);
    const formatted = moment(date).tz(timezone);

    test.each`
      format                    | expected
      ${'D MMMM YYYY'}          | ${'۱۴ فبروری ۲۰۲۵'}
      ${'D MMMM YYYY, HH:mm z'} | ${'۱۴ فبروری ۲۰۲۵، ۱۹:۵۵ +۰۴۳۰'}
      ${'LL'}                   | ${'۱۴ فبروری ۲۰۲۵'}
      ${'LLL'}                  | ${'۱۴ فبروری ۲۰۲۵ ۱۹:۵۵'}
    `('$format: $expected', ({ format, expected }) => {
      assert.equal(formatted.format(format), expected);
    });
  });

  describe('relativeTime', () => {
    test.each`
      scenario           | ago         | expected
      ${'1 minute ago'}  | ${{ m: 1 }} | ${'یک دقیقه پیش'}
      ${'5 minutes ago'} | ${{ m: 5 }} | ${'۵ دقیقه پیش'}
      ${'1 hour ago'}    | ${{ h: 1 }} | ${'یک ساعت پیش'}
      ${'5 hours ago'}   | ${{ h: 5 }} | ${'۵ ساعت پیش'}
    `('$scenario: $expected', ({ ago, expected }) => {
      assert.equal(moment().subtract(ago).fromNow(), expected, expected);
    });
  });
});
