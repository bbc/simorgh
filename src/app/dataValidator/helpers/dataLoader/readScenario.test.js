global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const readScenario = require('./readScenario');

let fileToValidateMock;
const defaultDirname = './././data';

const readFiles = (filenames, dirname = defaultDirname) => {
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
      readFiles(filename, './././data/news/test');
    });

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/news/test/c0000000001o.json'],
      ['./././data/news/test/c0000000002o.json'],
      ['./././data/news/test/c0000000003o.json'],
    ]);
  });

  it('should ignore c0000000023o.json', () => {
    const filenames = ['c0000000023o.json', 'c0000000003o.json'];

    filenames.forEach(filename => {
      readFiles(filename, './././data/news/test');
    });

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/news/test/c0000000003o.json'],
    ]);
  });

  it('should ignore onward-journeys', () => {
    const filenames = ['c0000000001o.json', 'onward-journeys'];

    filenames.forEach(filename => {
      readFiles(filename, './././data/news/test');
    });

    expect(fileToValidateMock.mock.calls).toEqual([
      ['./././data/news/test/c0000000001o.json'],
    ]);
  });

  it('should ignore files that are no json format', () => {
    const filenames = ['schema.yaml', 'README.md'];

    filenames.forEach(filename => {
      readFiles(filename);
    });

    expect(fileToValidateMock).not.toHaveBeenCalled();
  });
});
