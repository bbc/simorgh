import { getEnvConfig } from '.';
import * as onClient from '../onClient';

const onClientSpy = jest.spyOn(onClient, 'default');

describe('getEnvConfig', () => {
  const originalProcessEnv = process.env;

  beforeEach(() => {
    onClientSpy.mockImplementation(() => false);
    process.env = originalProcessEnv;
  });

  afterEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error The operand of a 'delete' operator must be optional.ts(2790)
    delete window.SIMORGH_ENV_VARS;
  });

  it('server side - should return values from "getEnvConfig"', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    process.env.SIMORGH_BASE_URL = 'https://test.com';

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('test');
    expect(results.SIMORGH_BASE_URL).toEqual('https://test.com');
  });

  it('client side - should return values from "getEnvConfig"', () => {
    Object.defineProperty(window, 'SIMORGH_ENV_VARS', {
      writable: true,
      value: {
        SIMORGH_APP_ENV: 'test',
        SIMORGH_BASE_URL: 'https://test.com',
      },
    });

    onClientSpy.mockImplementation(() => true);

    const results = getEnvConfig();

    expect(results.SIMORGH_APP_ENV).toEqual('test');
    expect(results.SIMORGH_BASE_URL).toEqual('https://test.com');
    expect(window.SIMORGH_ENV_VARS).toEqual({
      SIMORGH_APP_ENV: 'test',
      SIMORGH_BASE_URL: 'https://test.com',
    });
  });
});
