import { getEnvConfig } from '.';

let windowSpy: jest.SpyInstance<Window | undefined, []>;

describe('getEnvConfig', () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    process.env = originalProcessEnv;
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('server side - should return values from "getEnvConfig"', () => {
    process.env.SIMORGH_APP_ENV = 'local';
    process.env.SIMORGH_BASE_URL = 'https://example.com';

    // simulate server side by removing window object
    windowSpy.mockImplementation(() => undefined);

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('local');
    expect(results.SIMORGH_BASE_URL).toEqual('https://example.com');
  });

  it('client side - should return values from "getEnvConfig"', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    process.env.SIMORGH_BASE_URL = 'https://test.com';

    // simulate client side by adding window object
    windowSpy.mockImplementation(
      () =>
        ({
          location: {
            origin: 'https://example.com',
          },
          SIMORGH_ENV_VARS: {
            SIMORGH_APP_ENV: 'test',
            SIMORGH_BASE_URL: 'https://test.com',
          },
        } as Window),
    );

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('test');
    expect(results.SIMORGH_BASE_URL).toEqual('https://test.com');
  });
});
