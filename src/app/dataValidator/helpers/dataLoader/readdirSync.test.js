global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirSync } = require('./readdirSync');
const readScenario = require('./readScenario');

const defaultDataPath = './data';

const expectMethodToBeCalledTimes = async (
  number,
  spyMethod,
  dataPath = defaultDataPath,
) => {
  await readdirSync(dataPath);
  try {
    expect(spyMethod).toHaveBeenCalledTimes(number);
  } catch (error) {
    expect(spyMethod).toHaveBeenCalledTimes(number);
  }
};

describe('readdirSync helper', () => {
  let fileToValidateSpy;

  beforeEach(() => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateSpy.mockRestore();
  });

  it('should call readScenario for every file in the /data directory', async () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    await expectMethodToBeCalledTimes(44, readScenarioSpy);
  });

  it('should call fileToValidate for only the valid json file in the /data directory', async () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    await expectMethodToBeCalledTimes(30, fileToValidateSpy);
  });

  it('should call fileToValidate for only the files in /data/prod/news', async () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    await expectMethodToBeCalledTimes(2, fileToValidateSpy, './data/prod/news');
  });

  it('should return a promise', () => {
    expect(readdirSync('./data') instanceof Promise).toEqual(true);
  });
});
