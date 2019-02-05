const loggerWeb = require('./logger.web');

const message = 'test message';
global.console.error = jest.fn();
global.console.warn = jest.fn();
global.console.info = jest.fn();
global.console.debug = jest.fn();
global.console.log = jest.fn();

describe('Logger Web - for the client-side', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logger.error should run console.error', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.error(message);
    expect(global.console.error).toHaveBeenCalledWith(`error - ${message}`);
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(global.console.info).not.toHaveBeenCalled();
    expect(global.console.debug).not.toHaveBeenCalled();
    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.warn should run console.warn', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.warn(message);

    expect(global.console.warn).toHaveBeenCalledWith(`warn - ${message}`);
    expect(global.console.error).not.toHaveBeenCalled();
    expect(global.console.info).not.toHaveBeenCalled();
    expect(global.console.debug).not.toHaveBeenCalled();
    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.info should run console.info', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.info(message);

    expect(global.console.info).toHaveBeenCalledWith(`info - ${message}`);
    expect(global.console.error).not.toHaveBeenCalled();
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(global.console.debug).not.toHaveBeenCalled();
    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.debug should run console.debug', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.debug(message);

    expect(global.console.debug).toHaveBeenCalledWith(`debug - ${message}`);
    expect(global.console.error).not.toHaveBeenCalled();
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(global.console.info).not.toHaveBeenCalled();
    expect(global.console.log).not.toHaveBeenCalled();
  });

  it('logger.verbose should run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.verbose(message);

    expect(global.console.log).toHaveBeenCalledWith(`verbose - ${message}`);
    expect(global.console.error).not.toHaveBeenCalled();
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(global.console.debug).not.toHaveBeenCalled();
    expect(global.console.info).not.toHaveBeenCalled();
  });

  it('logger.silly should run console.log', () => {
    const loggerInstance = loggerWeb('');
    loggerInstance.silly(message);

    expect(global.console.log).toHaveBeenCalledWith(`silly - ${message}`);
    expect(global.console.error).not.toHaveBeenCalled();
    expect(global.console.warn).not.toHaveBeenCalled();
    expect(global.console.debug).not.toHaveBeenCalled();
    expect(global.console.info).not.toHaveBeenCalled();
  });
});
