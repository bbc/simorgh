global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');
const readScenario = require('./readScenario');

describe('readdirSync helper', () => {
  it('should call readScenario for every file in the /data directory', () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');
    return readdirSync('./././data').then(() => {
      expect(readScenarioSpy).toHaveBeenCalledTimes(29);
    });
  });

  it('should call fileToValidate for only the valid json file in the /data directory', () => {
    const fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');
    return readdirSync('./././data').then(() => {
      expect(fileToValidateSpy).toHaveBeenCalledTimes(25);
    });
  });

  it('should return a promise', () => {
    expect(readdirSync('./././data') instanceof Promise).toEqual(true);
  });
});
