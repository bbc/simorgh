import { getDateRangeLabel, getDayKey } from './dateLabels';

describe('dateLabels', () => {
  const noon = (day: number) => new Date(2026, 10, day, 12).toISOString();

  it('returns a single date when both promos are on the same day', () => {
    expect(getDateRangeLabel(noon(19), noon(19), 'es')).toBe('19 nov');
  });

  it('returns a range when promos span several days', () => {
    expect(getDateRangeLabel(noon(19), noon(17), 'es')).toBe('19 nov – 17 nov');
  });

  it('returns an empty label for missing dates', () => {
    expect(getDateRangeLabel('', noon(17), 'es')).toBe('');
    expect(getDayKey('')).toBeNull();
  });
});
