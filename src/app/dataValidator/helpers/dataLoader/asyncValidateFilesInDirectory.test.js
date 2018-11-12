global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const {
  asyncValidateFilesInDirectory,
} = require('./asyncValidateFilesInDirectory');
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
  await asyncValidateFilesInDirectory(dataPath);
  expect(spyMethod).toHaveBeenCalledTimes(number);
};

describe('asyncValidateFilesInDirectory helper', () => {
  let fileToValidateSpy;

  beforeEach(() => {
    fileToValidateSpy = jest.spyOn(readScenario, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateSpy.mockRestore();
  });

  it('should call readScenario for every file in the /data directory', async () => {
    const readScenarioSpy = jest.spyOn(readScenario, 'readScenario');

    await expectMethodToBeCalledTimes(500, readScenarioSpy);
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
    expect(asyncValidateFilesInDirectory('./data') instanceof Promise).toEqual(
      true,
    );
  });
});
