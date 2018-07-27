global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const fs = require('fs');
const {
  validateData,
  validateFile,
  readAllFiles,
  readdirAsync,
} = require('./index');
const data = require('../../../data/scenario-01.json');

const dirname = './././data';
let readFileSyncMock;

const readFiles = filenames => {
  expect(() => {
    readAllFiles(filenames, dirname);
  }).not.toThrowError();
};

describe('Data Validator', () => {
  it('should not error on validateData', () => {
    expect(() => {
      validateData(data);
    }).not.toThrowError();
  });
});

describe('Data Validator requires mocking', () => {
  beforeEach(() => {
    readFileSyncMock = jest.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    readFileSyncMock.mockRestore();
  });

  it('should read valid files', () => {
    expect(() => {
      validateFile('./././data/scenario-01.json');
    }).not.toThrowError();
  });

  it('should readAllFiles given a valid array and directory name', () => {
    const filenames = [
      'scenario-01.json',
      'scenario-02.json',
      'scenario-03.json',
    ];

    readFiles(filenames);

    expect(readFileSyncMock.mock.calls).toEqual([
      ['./././data/scenario-01.json'],
      ['./././data/scenario-02.json'],
      ['./././data/scenario-03.json'],
    ]);
  });

  it('should ignore scenario-23.json', () => {
    const filenames = ['scenario-23.json'];

    readFiles(filenames);

    expect(readFileSyncMock).not.toBeCalled();
  });

  it('should ignore scenario-23.json', () => {
    const filenames = [
      'scenario-01.json',
      'schema.yaml',
      'scenario-01.yaml',
      'README.md',
      'prod',
    ];

    readFiles(filenames);

    expect(readFileSyncMock.mock.calls).toEqual([
      ['./././data/scenario-01.json'],
    ]);
  });

  it('should error if readdirAsync Promise rejects as directory does not exist', async () => {
    await expect(readdirAsync('./././notData')).rejects.toThrowError(
      `no such file or directory, scandir './././notData'`,
    );
  });

  it('should not error if readdirAsync gets a valid directory', async () => {
    await expect(readdirAsync('./././data')).resolves.not.toThrowError();
  });
});
