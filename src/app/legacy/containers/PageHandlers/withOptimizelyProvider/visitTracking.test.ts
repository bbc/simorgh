import registerVisitActivity from './visitTracking';

const VISIT_STORAGE_KEY = 'last_visit_ts';

describe('registerVisitActivity', () => {
  const now = 1000000;

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Date, 'now').mockReturnValue(now);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should report a new visit and record activity when no previous visit exists', () => {
    expect(registerVisitActivity(now)).toBe(true);
    expect(localStorage.getItem(VISIT_STORAGE_KEY)).toBe(String(now));
  });

  it('should report a new visit when the last activity is older than the timeout', () => {
    const fortyMinutesAgo = now - 40 * 60 * 1000;
    localStorage.setItem(VISIT_STORAGE_KEY, String(fortyMinutesAgo));

    expect(registerVisitActivity(now)).toBe(true);
    expect(localStorage.getItem(VISIT_STORAGE_KEY)).toBe(String(now));
  });

  it('should not report a new visit within the timeout but rolls activity forward', () => {
    const tenMinutesAgo = now - 10 * 60 * 1000;
    localStorage.setItem(VISIT_STORAGE_KEY, String(tenMinutesAgo));

    expect(registerVisitActivity(now)).toBe(false);
    expect(localStorage.getItem(VISIT_STORAGE_KEY)).toBe(String(now));
  });
});
