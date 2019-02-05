const fs = require('fs');
const path = require('path');
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

    xit('logs in format DATE TIME LEVEL [DIR/FILENAME] MESSAGE', () => {});
  });

  describe('Logging to file', () => {
    const logger = require('./logger.node'); // eslint-disable-line global-require
    const loggerInstance = logger('/path/to/file/that/is/using/the/logger.js');

    beforeEach(() => {
      jest.clearAllMocks();
    });

    const getLastLine = file =>
      fs
        .readFileSync(file, 'utf-8')
        .toString()
        .split(/[\n\r]/)[0];

    it('defaults writing logger.error to file log/app.log', () => {
      const logPath = path.join(__dirname, '../../..', 'log', 'app.log');

      const errorMessage = 'test message for app.log';

      loggerInstance.error(errorMessage);

      expect(getLastLine(logPath)).toContain('error');
      expect(getLastLine(logPath)).toContain(errorMessage);
      // TODO: need to asynchronously call the expectation, after the logger has logged to file.
    });

    describe('SIMORGH_LOG_DIR is path new_dir', () => {
      const logPath = path.join(__dirname, 'new_dir', 'app.log');
      process.env.SIMORGH_LOG_DIR = logPath;
      process.env.NODE_ENV = 'node';

      it('creates directory new_dir & file app.log within it', async () => {
        const errorMessage = 'test message for app.log';

        loggerInstance.error(errorMessage);
        // need to asyncronously call the expect, so the mkdir & app.log file creation
        // can happen and log can be saved to the file.
        expect(fs.statSync(logPath).isFile()).toBe(true);
        // then cleanup with a 'rm logPath'
      });

      it('writes to new_dir/app.log file when SIMORGH_LOG_DIR=./new_dir', () => {
        const errorMessage = 'test message for app.log';

        loggerInstance.error(errorMessage);

        // need to asynchronously call the expect after logger has logged to file
        expect(getLastLine(logPath)).toContain('error');
        expect(getLastLine(logPath)).toContain(errorMessage);
      });

      xit('logs in format DATE TIME LEVEL [DIR/FILENAME] MESSAGE', () => {});
    });
  });
});
