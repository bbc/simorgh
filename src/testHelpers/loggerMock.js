import nodeLogger from '../app/lib/logger.node';

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
