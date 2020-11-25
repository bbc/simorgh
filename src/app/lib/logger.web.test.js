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

describe('Logger Web - for the client-side in production', () => {
  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'production';
  });

  it('logger.error should run console.error in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.error(event, message);

    expect(global.console.error).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'info', 'log', 'warn']);
  });

  it('logger.warn should not run console.warn in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.warn(message);

    expect(global.console.warn).not.toHaveBeenCalled();
  });

  it('logger.info should not run console.info in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.info(message);

    expect(global.console.info).not.toHaveBeenCalled();
  });

  it('logger.debug should not run console.debug in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.debug(message);

    expect(global.console.debug).not.toHaveBeenCalled();
  });

  it('logger.verbose should not run console.log in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.verbose(message);

    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.silly should not run console.log in production', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.silly(message);

    expect(global.console.log).not.toHaveBeenCalled();
  });
});

describe('Logger Web - for the client-side in development', () => {
  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'development';
  });

  it('logger.error should run console.error in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.error(event, message);

    expect(global.console.error).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'info', 'log', 'warn']);
  });

  it('logger.warn should run console.warn in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.warn(event, message);

    expect(global.console.warn).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'error', 'info', 'log']);
  });

  it('logger.info should run console.info in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.info(event, message);

    expect(global.console.info).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'error', 'log', 'warn']);
  });

  it('logger.debug should run console.debug in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.debug(event, message);

    expect(global.console.debug).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['error', 'info', 'log', 'warn']);
  });

  it('logger.verbose should run console.log in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.verbose(event, message);

    expect(global.console.log).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'error', 'info', 'warn']);
  });

  it('logger.silly should run console.log in development', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.silly(event, message);

    expect(global.console.log).toHaveBeenCalledWith({ event, message });
    expectNotCalled(global.console, ['debug', 'error', 'info', 'warn']);
  });
});
