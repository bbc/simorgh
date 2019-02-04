const testGetEnv = path => {
  const dotenv = require('dotenv'); // eslint-disable-line global-require

  jest.mock('dotenv', () => ({
    config: jest.fn().mockImplementation(() => ({ foo: 'bar' })),
  }));

  const getEnv = require('./index'); // eslint-disable-line global-require
  const result = getEnv();

  expect(dotenv.config).toHaveBeenCalledWith({ path });
  expect(result).toEqual({ foo: 'bar' });
};

describe('getEnv', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // enforce all modules to be required fresh and not from cache
  });

  it('calls dotenv with correct path when APP_ENV is "local"', async () => {
    process.env.APP_ENV = 'local';

    testGetEnv('.env');
  });

  it('calls dotenv with correct path when APP_ENV is "test"', async () => {
    process.env.APP_ENV = 'test';

    testGetEnv('.env.test');
  });

  it('calls dotenv with correct path when APP_ENV is "live"', async () => {
    process.env.APP_ENV = 'live';

    testGetEnv('.env.live');
  });

  it('calls dotenv with correct path when APP_ENV is "foobar"', async () => {
    process.env.APP_ENV = 'foobar';

    testGetEnv('.env.foobar');
  });

  it('calls dotenv with correct path when APP_ENV is undefined', async () => {
    delete process.env.APP_ENV;

    testGetEnv('.env');
  });
});
