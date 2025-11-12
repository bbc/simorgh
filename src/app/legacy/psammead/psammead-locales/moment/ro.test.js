import moment from './ro';

describe('moment locale – ro', () => {
  it('should use the Romanian locale', () => {
    expect(moment.locale()).toBe('ro');
  });

  it('should format relative time correctly (past)', () => {
    // 1 minute ago
    const result = moment().subtract(1, 'minute').fromNow();
    expect(result).toBe('acum un minut');
  });

  it('should format relative time correctly (future)', () => {
    // in 3 days
    const result = moment().add(3, 'days').fromNow();
    expect(result).toBe('peste 3 zile');
  });

  it('should format absolute dates correctly', () => {
    const result = moment('2019-07-12T13:55:00Z').format('D MMMM YYYY, HH:mm');
    expect(result).toContain('iulie');
  });
});
