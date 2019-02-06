/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

let winston;

describe('Logger node - for the server', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const deleteFile = (logPath, logFile) => {
    fs.unlink(path.join(logPath, logFile), () => {});
  };

  const deleteFolder = logPath => {
    if (fs.existsSync(logPath)) {
      deleteFile(logPath, 'app.log');
      fs.rmdir(logPath, err => {
        if (err) throw err;
      });
    }
  };

  describe('Setting up logger', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    describe('folder creation', () => {
      const logPath = path.join(__dirname, '../../..', 'log-temp');

      beforeEach(() => {
        // These tests can only be run when SIMORGH_LOG_DIR is
        // overridden due to the '.keep' file in /log
        process.env.SIMORGH_LOG_DIR = logPath;
        deleteFolder(logPath);
        jest.resetModules();
      });

      afterAll(() => {
        deleteFolder(logPath);
      });

      it('creates folder log when NODE_ENV equals `node`', () => {
        process.env.NODE_ENV = 'node';

        require('./logger.node');

        expect(fs.existsSync(logPath)).toBe(true);
      });

      it('does not create folder log when NODE_ENV equals `foo`', () => {
        process.env.NODE_ENV = 'foo';

        require('./logger.node');

        expect(fs.existsSync(logPath)).toBe(false);
      });

      it('does not create folder log when NODE_ENV equals `foo`', () => {
        delete process.env.NODE_ENV;

        require('./logger.node');

        expect(fs.existsSync(logPath)).toBe(false);
      });
    });

    describe('stuff', () => {
      beforeEach(() => {
        jest.mock('winston', () => jest.fn());

        winston = require('winston');

        winston.format = jest.fn();
        winston.createLogger = jest.fn();
        winston.format.combine = jest.fn();
        winston.format.label = jest.fn();
        winston.format.printf = jest.fn();
        winston.format.simple = jest.fn();
        winston.format.timestamp = jest.fn();
        winston.transports = jest.fn();
        winston.transports.File = jest.fn();
        winston.transports.Console = jest.fn();

        winston.format.label.mockImplementation(() => 'Label Mock');
        winston.format.simple.mockImplementation(() => 'Simple Mock');
        winston.format.timestamp.mockImplementation(() => 'Timestamp Mock');
        winston.format.printf.mockImplementation(() => 'Printf Mock');
        winston.format.combine.mockImplementation(() => 'Combine Mock');
      });

      it('sets up file transport', () => {
        process.env.SIMORGH_LOG_DIR = 'foobarDir';

        require('./logger.node');

        expect(winston.transports.File).toHaveBeenCalledWith({
          filename: 'foobarDir/app.log',
          handleExceptions: true,
          humanReadableUnhandledException: true,
          json: true,
          level: 'info',
          maxFiles: 1,
          maxsize: 104857600,
        });
      });

      it('sets up file transport', () => {
        delete process.env.SIMORGH_LOG_DIR;

        require('./logger.node');

        expect(winston.transports.File).toHaveBeenCalledWith({
          filename: 'log/app.log',
          handleExceptions: true,
          humanReadableUnhandledException: true,
          json: true,
          level: 'info',
          maxFiles: 1,
          maxsize: 104857600,
        });
      });

      it('sets up console transport', () => {
        process.env.SIMORGH_LOG_DIR = 'foobarDir';

        require('./logger.node');

        expect(winston.transports.Console).toHaveBeenCalledWith({
          handleExceptions: true,
          humanReadableUnhandledException: true,
          level: 'info',
          timestamp: true,
        });
      });

      it('calls printf', () => {
        process.env.SIMORGH_LOG_DIR = 'foobarDir';

        require('./logger.node');

        expect(winston.format.printf).toHaveBeenCalledWith(
          expect.any(Function),
        );
      });

      describe('main logger', () => {
        it('calls printf', () => {
          const loggerNode = require('./logger.node');
          loggerNode('path/file/foo.js');

          expect(winston.format.combine).toHaveBeenCalledWith(
            'Label Mock',
            'Simple Mock',
            'Timestamp Mock',
            'Printf Mock',
          );
          expect(winston.format.label).toHaveBeenCalledWith({
            label: 'file/foo.js',
          });
          expect(winston.format.simple).toHaveBeenCalled();
          expect(winston.format.timestamp).toHaveBeenCalledWith({
            format: 'YYYY-MM-DD HH:mm:ss',
          });
          expect(winston.createLogger).toHaveBeenCalledWith({
            format: 'Combine Mock',
            transports: [{}, {}],
          });
        });
      });
    });
  });
});
