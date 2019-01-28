const dotenv = require('dotenv');
const getEnv = require('./index');

jest.mock('dotenv', () => ({
  config: jest.fn().mockImplementation(() => ({ foo: 'bar' })),
}));

const testGetEnv = path => {
  const result = getEnv();

  expect(dotenv.config).toHaveBeenCalledWith({ path });
  expect(result).toEqual({ foo: 'bar' });
};

describe('getEnv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
