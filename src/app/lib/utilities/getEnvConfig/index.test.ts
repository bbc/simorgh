import { getEnvConfig } from '.';

describe('getEnvConfig', () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    process.env = originalProcessEnv;
  });

  it('server side - should return values from "getEnvConfig"', () => {
    process.env.SIMORGH_APP_ENV = 'local';
    process.env.SIMORGH_BASE_URL = 'https://example.com';

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('local');
    expect(results.SIMORGH_BASE_URL).toEqual('https://example.com');
  });

  it('client side - should set window object values', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    process.env.SIMORGH_BASE_URL = 'https://test.com';

    global.window.SIMORGH_ENV_VARS = {
      SIMORGH_APP_ENV: 'test',
      SIMORGH_BASE_URL: 'https://test.com',
    } as typeof global.window.SIMORGH_ENV_VARS;

    expect(global.window.SIMORGH_ENV_VARS).toEqual({
      SIMORGH_APP_ENV: 'test',
      SIMORGH_BASE_URL: 'https://test.com',
    });
  });

  it('client side - should return values from "getEnvConfig"', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    process.env.SIMORGH_BASE_URL = 'https://test.com';

    global.window.SIMORGH_ENV_VARS = {
      SIMORGH_APP_ENV: 'test',
      SIMORGH_BASE_URL: 'https://test.com',
    } as typeof global.window.SIMORGH_ENV_VARS;

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('test');
    expect(results.SIMORGH_BASE_URL).toEqual('https://test.com');
  });
});
