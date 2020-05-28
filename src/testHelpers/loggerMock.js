import nodeLogger from '../app/lib/logger.node';

// NOTE: When testing using any of the logger mocks, the specific
// logger mock function should be imported before the content that is being tested
// See: https://github.com/bbc/simorgh/blob/latest/src/app/routes/utils/fetchPageData/index.test.js#L2

const mocks = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  verbose: jest.fn(),
  debug: jest.fn(),
  silly: jest.fn(),
};

jest.mock('../app/lib/logger.node', () => jest.fn());
nodeLogger.mockImplementation(() => mocks);

export default mocks;
