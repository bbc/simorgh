const dotenv = require('dotenv');
const getEnv = require('./index');

jest.mock('dotenv', () => ({
  config: jest.fn().mockImplementation(() => ({ foo: 'bar' })),
}));

describe('getEnv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls dotenv with correct path when APP_ENV is "local"', async () => {
    process.env.APP_ENV = 'local';

    const result = getEnv();

    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('calls dotenv with correct path when APP_ENV is "test"', async () => {
    process.env.APP_ENV = 'test';

    const result = getEnv();

    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env.test' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('calls dotenv with correct path when APP_ENV is "live"', async () => {
    process.env.APP_ENV = 'live';

    const result = getEnv();

    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env.live' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('calls dotenv with correct path when APP_ENV is "foobar"', async () => {
    process.env.APP_ENV = 'foobar';

    const result = getEnv();

    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env.foobar' });
    expect(result).toEqual({ foo: 'bar' });
  });

  it('calls dotenv with correct path when APP_ENV is undefined', async () => {
    delete process.env.APP_ENV;

    const result = getEnv();

    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env' });
    expect(result).toEqual({ foo: 'bar' });
  });
});
