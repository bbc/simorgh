const loggerNode = require('./logger.node');

const message = 'test message';
const mockLogError = jest.fn();
const mockLogWarn = jest.fn();
const mockLogInfo = jest.fn();
const mockLogVerbose = jest.fn();
const mockLogDebug = jest.fn();
const mockLogSilly = jest.fn();

jest.mock('../../app/helpers/logger.node', () => jest.fn());

loggerNode.mockImplementation(() => ({
  error: mockLogError,
  warn: mockLogWarn,
  info: mockLogInfo,
  verbose: mockLogVerbose,
  debug: mockLogDebug,
  silly: mockLogSilly,
}));

global.console.log = jest.fn();

describe('Logger node - for the server', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Console logging', () => {
    it('logger.error', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.error(message);

      expect(mockLogError).toHaveBeenCalledWith(message);
      expect(mockLogWarn).not.toHaveBeenCalled();
      expect(mockLogInfo).not.toHaveBeenCalled();
      expect(mockLogVerbose).not.toHaveBeenCalled();
      expect(mockLogDebug).not.toHaveBeenCalled();
      expect(mockLogSilly).not.toHaveBeenCalled();
    });

    it('logger.warn', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.warn(message);

      expect(mockLogWarn).toHaveBeenCalledWith(message);
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockLogInfo).not.toHaveBeenCalled();
      expect(mockLogVerbose).not.toHaveBeenCalled();
      expect(mockLogDebug).not.toHaveBeenCalled();
      expect(mockLogSilly).not.toHaveBeenCalled();
    });

    it('logger.info', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.info(message);

      expect(mockLogInfo).toHaveBeenCalledWith(message);
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockLogWarn).not.toHaveBeenCalled();
      expect(mockLogVerbose).not.toHaveBeenCalled();
      expect(mockLogDebug).not.toHaveBeenCalled();
      expect(mockLogSilly).not.toHaveBeenCalled();
    });

    it('logger.verbose', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.verbose(message);

      expect(mockLogVerbose).toHaveBeenCalledWith(message);
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockLogWarn).not.toHaveBeenCalled();
      expect(mockLogInfo).not.toHaveBeenCalled();
      expect(mockLogDebug).not.toHaveBeenCalled();
      expect(mockLogSilly).not.toHaveBeenCalled();
    });

    it('logger.debug', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.debug(message);

      expect(mockLogDebug).toHaveBeenCalledWith(message);
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockLogWarn).not.toHaveBeenCalled();
      expect(mockLogInfo).not.toHaveBeenCalled();
      expect(mockLogVerbose).not.toHaveBeenCalled();
      expect(mockLogSilly).not.toHaveBeenCalled();
    });

    it('logger.silly', () => {
      const loggerInstance = loggerNode('/path/to/file.js');
      loggerInstance.silly(message);

      expect(mockLogSilly).toHaveBeenCalledWith(message);
      expect(mockLogError).not.toHaveBeenCalled();
      expect(mockLogWarn).not.toHaveBeenCalled();
      expect(mockLogInfo).not.toHaveBeenCalled();
      expect(mockLogVerbose).not.toHaveBeenCalled();
      expect(mockLogDebug).not.toHaveBeenCalled();
    });
  });

  xdescribe('Logging to file', () => {});
});
