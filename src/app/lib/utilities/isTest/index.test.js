import isTest from '.';

describe('istest', () => {
  it('should return true when SIMORGH_APP_ENV is test', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    expect(isTest()).toBe(true);
  });

  it('should return false when SIMORGH_APP_ENV is not test', () => {
    process.env.SIMORGH_APP_ENV = 'non-test';
    expect(isTest()).toBe(false);
  });

  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });
});
