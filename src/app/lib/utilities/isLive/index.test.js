import isLive from '.';

describe('isLive', () => {
  const environment = process.env.SIMORGH_APP_ENV;

  it('should return true when APP_ENV is live', () => {
    process.env.SIMORGH_APP_ENV = 'live';
    expect(isLive()).toBe(true);
  });

  it('should return false when APP_ENV is not live', () => {
    process.env.SIMORGH_APP_ENV = 'non-live';
    expect(isLive()).toBe(false);
  });

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = environment;
  });
});
