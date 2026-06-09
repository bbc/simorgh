import 'temporal-polyfill/global';
import getLocalisedTime from '../../helpers/localise-time';

describe('getLocalisedTime', () => {
  const originalTimeZoneId = Temporal.Now.timeZoneId;

  afterEach(() => {
    Temporal.Now.timeZoneId = originalTimeZoneId;
  });

  it('should return the same time when user is in UK timezone', () => {
    Temporal.Now.timeZoneId = () => 'Europe/London';

    const result = getLocalisedTime('Sat 15 Jun 2024', '15:00');
    expect(result).toBe('15:00');
  });

  it('should convert UK time to CET timezone (1 hour ahead in summer)', () => {
    Temporal.Now.timeZoneId = () => 'Europe/Paris';

    const result = getLocalisedTime('Sat 15 Jun 2024', '15:00');
    expect(result).toBe('16:00');
  });

  it('should convert UK time to EST timezone (5 hours behind in summer)', () => {
    Temporal.Now.timeZoneId = () => 'America/New_York';

    const result = getLocalisedTime('Sat 15 Jun 2024', '15:00');
    expect(result).toBe('10:00');
  });

  it('should handle midnight correctly', () => {
    Temporal.Now.timeZoneId = () => 'Europe/London';

    const result = getLocalisedTime('Mon 1 Jan 2024', '00:00');
    expect(result).toBe('00:00');
  });

  it('should handle day transition when converting to later timezone', () => {
    Temporal.Now.timeZoneId = () => 'Asia/Tokyo';

    const result = getLocalisedTime('Sat 15 Jun 2024', '20:00');
    expect(result).toBe('04:00');
  });

  it('should parse all months correctly', () => {
    Temporal.Now.timeZoneId = () => 'Europe/London';

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    months.forEach((month, index) => {
      const day = index + 1;
      const result = getLocalisedTime(`Mon ${day} ${month} 2024`, '12:00');
      expect(result).toBe('12:00');
    });
  });

  it('should handle winter time correctly with GMT offset', () => {
    Temporal.Now.timeZoneId = () => 'Europe/Paris';

    const result = getLocalisedTime('Sat 15 Jan 2024', '15:00');
    expect(result).toBe('16:00');
  });
});
