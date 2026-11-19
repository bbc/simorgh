import {
  getEffectiveCutoff,
  getOverridePreviousVisit,
  parseStoredTimestamp,
  registerVisit,
  resetVisitStateForTests,
} from './lastVisit';
import { MAX_LOOKBACK_MS, getStorageKey } from './constants';

const NOW = Date.parse('2026-11-18T12:00:00.000Z');
const MINUTE = 60 * 1000;

describe('lastVisit', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    resetVisitStateForTests();
  });

  it('uses a service-specific versioned key', () => {
    expect(getStorageKey('mundo')).toBe(
      'bbc:simorgh:since-last-visited:v1:mundo',
    );
  });

  it('returns null on a first visit and records the current visit', () => {
    expect(registerVisit('mundo', NOW)).toBeNull();
    expect(localStorage.getItem(getStorageKey('mundo'))).toBe(String(NOW));
  });

  it('returns the previous visit and does not advance it on repeat calls in the same tab', () => {
    const previous = NOW - 60 * MINUTE;
    localStorage.setItem(getStorageKey('mundo'), String(previous));

    expect(registerVisit('mundo', NOW)).toBe(previous);
    expect(registerVisit('mundo', NOW + 5 * MINUTE)).toBe(previous);
    expect(localStorage.getItem(getStorageKey('mundo'))).toBe(String(NOW));
  });

  it('keeps visits for different services separate', () => {
    localStorage.setItem(getStorageKey('mundo'), String(NOW - MINUTE));

    expect(registerVisit('pidgin', NOW)).toBeNull();
  });

  it.each([
    ['empty', ''],
    ['unparseable', 'yesterday'],
    ['ISO string', '2026-11-18T11:00:00.000Z'],
    ['negative', '-5'],
    ['too far in the future', String(NOW + 6 * MINUTE)],
  ])('treats %s stored values as invalid', (_, value) => {
    expect(parseStoredTimestamp(value, NOW)).toBeNull();
  });

  it('clamps timestamps within the clock skew tolerance to now', () => {
    expect(parseStoredTimestamp(String(NOW + 4 * MINUTE), NOW)).toBe(NOW);
  });

  it('does not throw when storage throws', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    expect(registerVisit('mundo', NOW)).toBeNull();
    jest.restoreAllMocks();
  });

  describe('getEffectiveCutoff', () => {
    it('returns no cutoff without a previous visit', () => {
      expect(getEffectiveCutoff(null, NOW)).toEqual({
        cutoff: null,
        wasCapped: false,
      });
    });

    it('uses the previous visit when it is inside the lookback window', () => {
      const previous = NOW - 60 * MINUTE;
      expect(getEffectiveCutoff(previous, NOW)).toEqual({
        cutoff: previous,
        wasCapped: false,
      });
    });

    it('does not render when the previous visit is older than the lookback window', () => {
      expect(getEffectiveCutoff(NOW - MAX_LOOKBACK_MS - 1, NOW)).toEqual({
        cutoff: null,
        wasCapped: true,
      });
    });
  });

  describe('getOverridePreviousVisit', () => {
    it('parses ISO dates and epoch milliseconds', () => {
      const expected = Date.parse('2026-11-11T00:00:00.000Z');
      expect(
        getOverridePreviousVisit(
          '?sinceLastVisited=2026-11-11T00:00:00Z',
          'local',
          NOW,
        ),
      ).toBe(expected);
      expect(
        getOverridePreviousVisit(`?sinceLastVisited=${expected}`, 'test', NOW),
      ).toBe(expected);
    });

    it('treats a bare date as the end of that UTC day', () => {
      expect(
        getOverridePreviousVisit('?sinceLastVisited=2026-11-11', 'local', NOW),
      ).toBe(Date.parse('2026-11-12T00:00:00.000Z'));
    });

    it('is ignored on live and for invalid values', () => {
      expect(
        getOverridePreviousVisit('?sinceLastVisited=2026-11-11', 'live', NOW),
      ).toBeNull();
      expect(
        getOverridePreviousVisit('?sinceLastVisited=nope', 'local', NOW),
      ).toBeNull();
      expect(getOverridePreviousVisit('', 'local', NOW)).toBeNull();
    });
  });
});
