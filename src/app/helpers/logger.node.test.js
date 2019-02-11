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

    describe('Folder creation', () => {
      const logPath = path.join(__dirname, '../../..', 'log-temp');
      const defaultLogPath = path.join(__dirname, '../../..', 'log');

      beforeEach(() => {
        process.env.LOG_DIR = logPath;
        deleteFolder(logPath);
        deleteFolder(defaultLogPath);
        jest.resetModules();
        jest.resetAllMocks();
      });

      afterAll(() => {
        deleteFolder(logPath);
        deleteFolder(defaultLogPath);
      });

      it('creates folder log-temp', () => {
        require('./logger.node');

        expect(fs.existsSync(logPath)).toBe(true);
      });

      it('creates default folder log when LOG_DIR isnt set', () => {
        delete process.env.LOG_DIR;
        require('./logger.node');

        expect(fs.existsSync(defaultLogPath)).toBe(true);
      });

      it('does not create folder log-temp when it already exists', () => {
        fs.mkdirSync(logPath);

        jest.spyOn(fs, 'mkdirSync');

        require('./logger.node');

        expect(fs.mkdirSync).not.toHaveBeenCalled();
      });
    });

    describe('Configuring Winston', () => {
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

      it('sets up file transport when LOG_DIR is set ', () => {
        process.env.LOG_DIR = 'foobarDir';
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

      it('sets up file transport when LOG_DIR isnt set', () => {
        delete process.env.LOG_DIR;
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
        process.env.LOG_DIR = 'foobarDir';
        require('./logger.node');

        expect(winston.transports.Console).toHaveBeenCalledWith({
          handleExceptions: true,
          humanReadableUnhandledException: true,
          level: 'info',
          timestamp: true,
        });
      });

      it('calls printf with a function', () => {
        process.env.LOG_DIR = 'foobarDir';
        require('./logger.node');

        expect(winston.format.printf).toHaveBeenCalledWith(
          expect.any(Function),
        );
      });

      describe('createLogger', () => {
        it('is configured correctly', () => {
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
