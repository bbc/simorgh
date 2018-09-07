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
      'c0000000001o.json',
      'c0000000002o.json',
      'c0000000003o.json',
    ];

    filenames.forEach(filename => {
      readFiles(filename);
    });

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/news/test/c0000000001o.json'],
      ['./././data/news/test/c0000000002o.json'],
      ['./././data/news/test/c0000000003o.json'],
    ]);
  });

  it('should ignore c0000000023o.json', () => {
    const filenames = ['c0000000023o.json'];

    readFiles(filenames);

    expect(fileToValidateMock).not.toBeCalled();
  });

  it('should ignore files that are no json format', () => {
    const filenames = ['schema.yaml', 'c0000000023o.yaml', 'README.md', 'prod'];

    filenames.forEach(filename => {
      readFiles(filename);
    });

    expect(fileToValidateMock).not.toHaveBeenCalled();
  });
});
