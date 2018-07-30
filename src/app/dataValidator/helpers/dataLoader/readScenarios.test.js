global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const readScenarios = require('./readScenarios');

let fileToValidateMock;
const dirname = './././data';

const readFiles = filenames => {
  expect(() => {
    readScenarios.readScenarios(filenames, dirname);
  }).not.toThrowError();
};

describe('readScenarios helper', () => {
  beforeEach(() => {
    fileToValidateMock = jest.spyOn(readScenarios, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateMock.mockRestore();
  });

  it('should readScenarios given a valid array and directory name', () => {
    const filenames = [
      'scenario-01.json',
      'scenario-02.json',
      'scenario-03.json',
    ];

    readFiles(filenames);

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/scenario-01.json'],
      ['./././data/scenario-02.json'],
      ['./././data/scenario-03.json'],
    ]);
  });

  it('should ignore scenario-23.json', () => {
    const filenames = ['scenario-23.json'];

    readFiles(filenames);

    expect(fileToValidateMock).not.toBeCalled();
  });

  it('should ignore files that are no json format', () => {
    const filenames = [
      'scenario-01.json',
      'schema.yaml',
      'scenario-01.yaml',
      'README.md',
      'prod',
    ];

    readFiles(filenames);

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/scenario-01.json'],
    ]);
  });
});
