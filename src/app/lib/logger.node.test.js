/* eslint-disable global-require */
const fs = require('fs');

jest.mock('fs');

let winston;

describe('Logger folder creation', () => {
  it('creates folder log-temp', () => {
    fs.existsSync.mockReturnValue(false);

    require('./logger.node');

    expect(fs.mkdirSync).toHaveBeenCalled();
  });

  it('creates default folder log when LOG_DIR isnt set', () => {
    jest.resetModules();
    process.env.LOG_DIR = '';
    fs.existsSync.mockReturnValue(false);

    require('./logger.node');

    expect(fs.existsSync).toHaveBeenCalledWith('log');
  });
});

describe('Logger node - for the server', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Setting up logger', () => {
    beforeEach(() => {
      jest.resetModules();
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

        fs.existsSync = jest.fn();
        fs.mkdirSync = jest.fn();
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
          maxFiles: 5,
          maxsize: 104857600,
          tailable: true,
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
          maxFiles: 5,
          maxsize: 104857600,
          tailable: true,
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
