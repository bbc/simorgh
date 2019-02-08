const loggerWeb = require('./logger.web');

const message = 'test message';
global.console = {
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  log: jest.fn(),
};

const expectNotCalled = (object, keys) => {
  keys.forEach(key => {
    expect(object[key]).not.toHaveBeenCalled();
  });
};

describe('Logger Web - for the client-side', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logger.error should run console.error', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.error(message);
    expect(global.console.error).toHaveBeenCalledWith(`error - ${message}`);
    expectNotCalled(global.console, ['debug', 'info', 'log', 'warn']);
  });

  it('logger.warn should run console.warn', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.warn(message);

    expect(global.console.warn).toHaveBeenCalledWith(`warn - ${message}`);
    expectNotCalled(global.console, ['debug', 'error', 'info', 'log']);
  });

  it('logger.info should run console.info', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.info(message);

    expect(global.console.info).toHaveBeenCalledWith(`info - ${message}`);
    expectNotCalled(global.console, ['debug', 'error', 'log', 'warn']);
  });

  it('logger.debug should run console.debug', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.debug(message);

    expect(global.console.debug).toHaveBeenCalledWith(`debug - ${message}`);
    expectNotCalled(global.console, ['error', 'info', 'log', 'warn']);
  });

  it('logger.verbose should run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.verbose(message);

    expect(global.console.log).toHaveBeenCalledWith(`verbose - ${message}`);
    expectNotCalled(global.console, ['debug', 'error', 'info', 'warn']);
  });

  it('logger.silly should run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.silly(message);

    expect(global.console.log).toHaveBeenCalledWith(`silly - ${message}`);
    expectNotCalled(global.console, ['debug', 'error', 'info', 'warn']);
  });
});
