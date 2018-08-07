global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');
const readScenario = require('./readScenario');

const expectMethodToBeCalledTimes = (number, spyMethod) => {
  readdirSync('./././data').then(() => {
    expect(spyMethod).toHaveBeenCalledTimes(number);
  });
};

describe('readdirSync helper', () => {
  it('should call readScenario for every file in the /data directory', () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    expectMethodToBeCalledTimes(29, readScenarioSpy);
  });

  it('should call fileToValidate for only the valid json file in the /data directory', () => {
    const fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    expectMethodToBeCalledTimes(25, fileToValidateSpy);
  });

  it('should return a promise', () => {
    expect(readdirSync('./././data') instanceof Promise).toEqual(true);
  });
});
