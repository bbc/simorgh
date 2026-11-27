import moment from 'moment-timezone';
import '#lib/locales/moment/pcm';
import getDayAndMonthFormat from '.';

describe('getDayAndMonthFormat', () => {
  it('returns the ordinal day token for locales whose LL format uses one', () => {
    expect(getDayAndMonthFormat('pcm')).toBe('Do MMMM');
  });

  it('returns a plain day token for locales whose LL format does not use one', () => {
    expect(getDayAndMonthFormat('en-gb')).toBe('D MMMM');
  });

  it('renders the ordinal suffix for pcm', () => {
    expect(
      moment('2026-03-25').locale('pcm').format(getDayAndMonthFormat('pcm')),
    ).toBe('25th March');
  });
});
