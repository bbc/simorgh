import moment from 'moment';

import formatDuration from '.';

describe('formatDuration', () => {
  it('should handle 1:23:45', () => {
    const dur = moment.duration({
      hours: 1,
      minutes: 23,
      seconds: 45,
    });
    expect(formatDuration(dur)).toBe('1:23:45');
  });

  it('should handle 23:45', () => {
    const dur = moment.duration({
      minutes: 23,
      seconds: 45,
    });
    expect(formatDuration(dur)).toBe('23:45');
  });

  it('should handle 3:45', () => {
    const dur = moment.duration({
      minutes: 3,
      seconds: 45,
    });
    expect(formatDuration(dur)).toBe('3:45');
  });

  it('should handle 0:42', () => {
    const dur = moment.duration({
      seconds: 42,
    });
    expect(formatDuration(dur)).toBe('0:42');
  });

  it('should handle 0:02', () => {
    const dur = moment.duration({
      seconds: 2,
    });
    expect(formatDuration(dur)).toBe('0:02');
  });

  it('should handle 1:01:01', () => {
    const dur = moment.duration({
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
    expect(formatDuration(dur)).toBe('1:01:01');
  });

  it('should handle 999:59:59', () => {
    const dur = moment.duration({
      hours: 999,
      minutes: 59,
      seconds: 59,
    });
    expect(formatDuration(dur)).toBe('999:59:59');
  });

  it('should handle 1:00:00', () => {
    const dur = moment.duration({
      hours: 1,
    });
    expect(formatDuration(dur)).toBe('1:00:00');
  });
});
