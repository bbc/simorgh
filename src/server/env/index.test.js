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

  it('calls dotenv with correct path when ENV_FILE is "local"', async () => {
    process.env.ENV_FILE = '.env';

    testGetEnv('.env');
  });

  it('calls dotenv with correct path when ENV_FILE is "test"', async () => {
    process.env.ENV_FILE = '.env.test';

    testGetEnv('.env.test');
  });

  it('calls dotenv with correct path when ENV_FILE is "live"', async () => {
    process.env.ENV_FILE = '.env.live';

    testGetEnv('.env.live');
  });

  it('calls dotenv with correct path when ENV_FILE is "foobar"', async () => {
    process.env.ENV_FILE = 'foobar';

    testGetEnv('foobar');
  });

  it('calls dotenv with correct path when ENV_FILE is undefined', async () => {
    delete process.env.ENV_FILE;

    testGetEnv('.env');
  });
});
