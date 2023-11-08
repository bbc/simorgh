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
  beforeAll(() => {
    process.env.LOG_LEVEL = 'info';
  });

  afterAll(() => {
    delete process.env.LOG_LEVEL;
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.LOG_LEVEL;
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
        winston.format.printf = jest.fn();
        winston.format.simple = jest.fn();
        winston.format.json = jest.fn();
        winston.format.prettyPrint = jest.fn();
        winston.format.timestamp = jest.fn();
        winston.format.colorize = jest.fn();
        winston.format.metadata = jest.fn();
        winston.format.label = jest.fn();
        winston.transports = jest.fn();
        winston.transports.File = jest.fn();
        winston.transports.Console = jest.fn();
        winston.format.simple.mockImplementation(() => 'Simple Mock');
        winston.format.timestamp.mockImplementation(() => 'Timestamp Mock');
        winston.format.printf.mockImplementation(() => 'Printf Mock');
        winston.format.combine.mockImplementation(() => 'Combine Mock');
        winston.format.json.mockImplementation(() => 'Json Mock');
        winston.format.colorize.mockImplementation(() => 'Colorize Mock');
        winston.format.metadata.mockImplementation(() => 'Metadata Mock');
        winston.format.prettyPrint.mockImplementation(() => 'PrettyPrint Mock');
        winston.format.label.mockImplementation(() => 'Label Mock');

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
          format: 'Combine Mock',
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
          format: 'Combine Mock',
          level: 'info',
          maxFiles: 5,
          maxsize: 104857600,
          tailable: true,
        });
      });

      it('does not create a console transport by default', () => {
        process.env.LOG_DIR = 'foobarDir';
        require('./logger.node');

        expect(winston.transports.Console).not.toHaveBeenCalled();
      });

      it('does not create a console transport when process.LOG_TO_CONSOLE is false', () => {
        process.env.LOG_DIR = 'foobarDir';
        process.env.LOG_TO_CONSOLE = 'false';
        require('./logger.node');

        expect(winston.transports.Console).not.toHaveBeenCalled();
      });

      it('sets up console transport when process.LOG_TO_CONSOLE is true', () => {
        process.env.LOG_DIR = 'foobarDir';
        process.env.LOG_TO_CONSOLE = 'true';
        require('./logger.node');

        expect(winston.transports.Console).toHaveBeenCalledWith({
          format: 'Combine Mock',
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
        it('is configured correctly for Express', () => {
          const loggerNode = require('./logger.node');
          loggerNode('path/file/foo.js');

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            1,
            'Json Mock',
          );

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            2,
            'PrettyPrint Mock',
            'Colorize Mock',
            'Printf Mock',
          );

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            3,
            'Simple Mock',
            'Timestamp Mock',
            'Label Mock',
            'Metadata Mock',
          );

          expect(winston.format.simple).toHaveBeenCalled();
          expect(winston.format.timestamp).toHaveBeenCalledWith({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
          });
          expect(winston.format.metadata).toHaveBeenCalledWith({
            fillExcept: ['timestamp', 'level', 'message'],
          });
          expect(winston.createLogger).toHaveBeenCalledWith({
            format: 'Combine Mock',
            transports: [{}],
          });
        });

        it('is configured correctly for NextJS', () => {
          process.env.NEXTJS = 'true';
          const loggerNode = require('./logger.node');
          loggerNode('path/file/foo.js');

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            1,
            'Json Mock',
          );

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            2,
            'Json Mock',
          );

          expect(winston.format.combine).toHaveBeenNthCalledWith(
            3,
            'Simple Mock',
            'Timestamp Mock',
            'Label Mock',
            'Metadata Mock',
          );

          expect(winston.format.simple).toHaveBeenCalled();
          expect(winston.format.timestamp).toHaveBeenCalledWith({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
          });
          expect(winston.format.metadata).toHaveBeenCalledWith({
            fillExcept: ['timestamp', 'level', 'message'],
          });
          expect(winston.createLogger).toHaveBeenCalledWith({
            format: 'Combine Mock',
            transports: [{}],
          });
        });
      });
    });
  });
});
