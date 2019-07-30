global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { asyncValidateDir } = require('./asyncValidateDir');
const readScenario = require('./readScenario');

const defaultDataPath = './data';

/*
  Becase the it() blocks are using this utility function and an expect returns a Promise both
  the it() block and the method execution require an `await` prefix
*/
const expectMethodToBeCalledTimes = async (
  number,
  spyMethod,
  dataPath = defaultDataPath,
) => {
  await asyncValidateDir(dataPath);
  expect(spyMethod).toHaveBeenCalledTimes(number);
};

describe('asyncValidateDir helper', () => {
  let fileToValidateSpy;

  beforeEach(() => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateSpy.mockRestore();
  });

  it('should call readScenario for every file in the /data directory', async () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    await expectMethodToBeCalledTimes(241, readScenarioSpy);
  });

  it('should call fileToValidate for only the valid json file in the /data directory', async () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    await expectMethodToBeCalledTimes(90, fileToValidateSpy);
  });

  it('should call fileToValidate for only the files in /data/news', async () => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');

    await expectMethodToBeCalledTimes(36, fileToValidateSpy, './data/news');
  });

  it('should return a promise', () => {
    expect(asyncValidateDir('./data') instanceof Promise).toEqual(true);
  });
});
