const { log } = require('./messaging');

describe('Messaging utility', () => {
  it('should not log as default behaviour', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    log('some message');

    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  // it('should log when debugMode is true', () => {
  //   const consoleLogSpy = jest.spyOn(console, 'log');
  //   process.env.npm_config_debugMode = true;

  //   log('some message');

  //   expect(consoleLogSpy).toHaveBeenCalled();
  //   delete process.env.npm_config_debugMode;
  // });
});
