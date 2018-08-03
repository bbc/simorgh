global.console.log = jest.fn(); // silence console.log during jest tests

const { log } = require('./messaging');

describe('Messaging utility', () => {
  it('should not log as default behaviour', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');

    log('some message');

    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  it('should log when debugMode is true', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    process.env.npm_config_DEBUG_MODE = true;

    log('some message');

    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });
});
