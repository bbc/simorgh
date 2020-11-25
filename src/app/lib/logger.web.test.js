const loggerWeb = require('./logger.web');

const message = 'test message';
const event = 'test event';
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
    loggerInstance.error(event, message);

    expect(global.console.error).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'info', 'log', 'warn']);
  });

  it('logger.warn should not run console.warn', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.warn(message);

    expect(global.console.warn).not.toHaveBeenCalled();
  });

  it('logger.info should not run console.info', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.info(message);

    expect(global.console.info).not.toHaveBeenCalled();
  });

  it('logger.debug should not run console.debug', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.debug(message);

    expect(global.console.debug).not.toHaveBeenCalled();
  });

  it('logger.verbose should not run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.verbose(message);

    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.silly should not run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.silly(message);

    expect(global.console.log).not.toHaveBeenCalled();
  });
});
