import 'temporal-polyfill/global';
import { getLocalisedDate } from '../../helpers/localise-datetime';

describe('getLocalisedDate', () => {
  const originalTimeZoneId = Temporal.Now.timeZoneId;

  afterEach(() => {
    Temporal.Now.timeZoneId = originalTimeZoneId;
  });

  describe('Gregorian calendar (default)', () => {
    it('should return a formatted date for UK timezone', () => {
      Temporal.Now.timeZoneId = () => 'Europe/London';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should convert to user timezone when different from UK', () => {
      Temporal.Now.timeZoneId = () => 'America/New_York';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00');
      expect(result).toContain('2024');
    });

    it('should handle day transition when time is late and timezone is ahead', () => {
      Temporal.Now.timeZoneId = () => 'Asia/Tokyo';

      // 20:00 UK time on June 15th is 04:00 on June 16th in Tokyo
      const result = getLocalisedDate('Sat 15 Jun 2024', '20:00');
      expect(result).toContain('16');
    });
  });

  describe('Jalali calendar for Persian service', () => {
    it('should return date in Persian/Jalali calendar format', () => {
      Temporal.Now.timeZoneId = () => 'Asia/Tehran';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00', 'persian');

      // June 15, 2024 in Gregorian = Khordad 26, 1403 in Jalali
      // Should contain Persian numerals and month name
      expect(result).toMatch(/[\u06F0-\u06F9]/); // Contains Persian/Eastern Arabic numerals
      expect(result).toContain('۱۴۰۳'); // Jalali year in Persian numerals
    });

    it('should use fa-IR locale for Persian service', () => {
      Temporal.Now.timeZoneId = () => 'Europe/London';

      const result = getLocalisedDate('Sun 21 Mar 2024', '12:00', 'persian');

      // March 21, 2024 (Nowruz) = 1 Farvardin 1403
      // Should contain Jalali calendar components
      expect(result).toMatch(/[\u06F0-\u06F9]/); // Persian numerals
    });
  });

  describe('Gregorian calendar for other services', () => {
    it('should use Gregorian calendar for Arabic service', () => {
      Temporal.Now.timeZoneId = () => 'Asia/Dubai';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00', 'arabic');

      // Arabic service should NOT use Jalali calendar
      // Should use Gregorian year 2024
      expect(result).toContain('2024');
    });

    it('should use Gregorian calendar for Mundo service', () => {
      Temporal.Now.timeZoneId = () => 'America/Mexico_City';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00', 'mundo');

      expect(result).toContain('2024');
    });

    it('should use default locale when service is not provided', () => {
      Temporal.Now.timeZoneId = () => 'Europe/London';

      const result = getLocalisedDate('Sat 15 Jun 2024', '15:00');

      expect(result).toContain('2024');
    });
  });
});
