global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');
const readScenario = require('./readScenario');

const defaultDataPath = './data';

let fileToValidateSpy;
let readScenarioSpy;

const expectMethodToBeCalledTimes = (
  number,
  spyMethod,
  dataPath = defaultDataPath,
) => {
  readdirSync(dataPath).then(() => {
    expect(spyMethod).toHaveBeenCalledTimes(number);
  });
};

describe('readdirSync helper', () => {
  it('should call readScenario for every file in the /data directory', () => {
    readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    expectMethodToBeCalledTimes(79, readScenarioSpy);
  });

  it('should call fileToValidate for only the valid json file in the /data directory', () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    expectMethodToBeCalledTimes(60, fileToValidateSpy);
  });

  it('should call fileToValidate for only the files in /data/prod/news', () => {
    fileToValidateSpy.mockRestore();
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    expectMethodToBeCalledTimes(2, fileToValidateSpy, './data/prod/news');
  });

  it('should return a promise', () => {
    expect(readdirSync('./data') instanceof Promise).toEqual(true);
  });
});
