global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const readScenario = require('./readScenario');

let fileToValidateMock;
const dirname = './././data';

const readFiles = filenames => {
  expect(() => {
    readScenario.readScenario(filenames, dirname);
  }).not.toThrowError();
};

describe('readScenario helper', () => {
  beforeEach(() => {
    fileToValidateMock = jest.spyOn(readScenario, 'fileToValidate');
  });

  afterEach(() => {
    fileToValidateMock.mockRestore();
  });

  it('should readScenario given a valid array and directory name', () => {
    const filenames = [
      'scenario-01.json',
      'scenario-02.json',
      'scenario-03.json',
    ];

    filenames.forEach(filename => {
      readFiles(filename);
    });

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
    const filenames = ['schema.yaml', 'scenario-01.yaml', 'README.md', 'prod'];

    filenames.forEach(filename => {
      readFiles(filename);
    });

    expect(fileToValidateMock).not.toHaveBeenCalled();
  });
});
