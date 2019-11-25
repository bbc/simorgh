import moment from 'moment';

import formatDuration, { lpad } from '.';

describe('formatDuration', () => {
  it('should handle 1:23:45', () => {
    const duration = moment.duration({
      hours: 1,
      minutes: 23,
      seconds: 45,
    });
    expect(formatDuration({ duration })).toBe('1:23:45');
  });

  it('should handle 23:45', () => {
    const duration = moment.duration({
      minutes: 23,
      seconds: 45,
    });
    expect(formatDuration({ duration })).toBe('23:45');
  });

  it('should handle 3:45', () => {
    const duration = moment.duration({
      minutes: 3,
      seconds: 45,
    });
    expect(formatDuration({ duration })).toBe('3:45');
  });

  it('should handle 0:42', () => {
    const duration = moment.duration({
      seconds: 42,
    });
    expect(formatDuration({ duration })).toBe('0:42');
  });

  it('should handle 0:02', () => {
    const duration = moment.duration({
      seconds: 2,
    });
    expect(formatDuration({ duration })).toBe('0:02');
  });

  it('should handle 1:01:01', () => {
    const duration = moment.duration({
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
    expect(formatDuration({ duration })).toBe('1:01:01');
  });

  it('should handle 999:59:59', () => {
    const duration = moment.duration({
      hours: 999,
      minutes: 59,
      seconds: 59,
    });
    expect(formatDuration({ duration })).toBe('999:59:59');
  });

  it('should handle 1:00:00', () => {
    const duration = moment.duration({
      hours: 1,
    });
    expect(formatDuration({ duration })).toBe('1:00:00');
  });

  it('should apply the correct separator', () => {
    const duration = moment.duration({
      hours: 1,
    });

    expect(formatDuration({ duration, separator: ',' })).toBe('1,00,00');
  });

  it('should apply lpad if padMinutes is true', () => {
    const duration = moment.duration({
      minutes: 3,
      seconds: 45,
    });
    const padMinutes = lpad(duration.minutes());
    if (padMinutes) {
      expect(formatDuration({ duration, padMinutes })).toBe('03:45');
    }
  });
});
