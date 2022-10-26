import isLocal from '.';

describe('isLive', () => {
  it('should return true when SIMORGH_APP_ENV is local', () => {
    process.env.SIMORGH_APP_ENV = 'local';
    expect(isLocal()).toBe(true);
  });

  it('should return false when SIMORGH_APP_ENV is not local', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    expect(isLocal()).toBe(false);
  });

  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
