// global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');
const readScenario = require('./readScenario');

const defaultDataPath = './data';

const expectMethodToBeCalledTimes = (number, spyMethod, dataPath) =>
  readdirSync(dataPath).then(() =>
    expect(spyMethod).toHaveBeenCalledTimes(number),
  );

const testReaddirSync = (number, spyMethod, dataPath = defaultDataPath) =>
  expectMethodToBeCalledTimes(number, spyMethod, dataPath).catch(() => {
    process.exit('Async test failed, promise reject caught.');
  });

describe('readdirSync helper', () => {
  let fileToValidateSpy;

  beforeEach(() => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateSpy.mockRestore();
  });

  it('should call readScenario for every file in the /data directory', () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    testReaddirSync(78, readScenarioSpy);
  });

  it('should call fileToValidate for only the valid json file in the /data directory', () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    testReaddirSync(60, fileToValidateSpy);
  });

  it('should call fileToValidate for only the files in /data/prod/news', () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    testReaddirSync(2, fileToValidateSpy, './data/prod/news');
  });

  it('should return a promise', () => {
    expect(readdirSync('./data') instanceof Promise).toEqual(true);
  });
});
