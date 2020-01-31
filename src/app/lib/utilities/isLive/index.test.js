import isLive from '.';

describe('isLive', () => {
  it('should return true when SIMORGH_APP_ENV is live', () => {
    process.env.SIMORGH_APP_ENV = 'live';
    expect(isLive()).toBe(true);
  });

  it('should return false when SIMORGH_APP_ENV is not live', () => {
    process.env.SIMORGH_APP_ENV = 'non-live';
    expect(isLive()).toBe(false);
  });

  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
