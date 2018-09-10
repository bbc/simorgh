global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const readScenario = require('./readScenario');

let fileToValidateMock;
const dataDirpath = './././data';

const readFiles = (filenames, dirpath = dataDirpath) =>
  filenames.forEach(filename => {
    readScenario.readScenario(filename, dirpath);
  });

const testReadScenario = (filenames, expectedCalls) => {
  const newsDirpath = './././data/news/test';
  readFiles(filenames, newsDirpath);

  expect(fileToValidateMock.mock.calls).toEqual(expectedCalls);
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
    const expectedCalls = [
      ['./././data/news/test/c0000000001o.json'],
      ['./././data/news/test/c0000000002o.json'],
      ['./././data/news/test/c0000000003o.json'],
    ];

    testReadScenario(filenames, expectedCalls);
  });

  it('should ignore c0000000023o.json', () => {
    const filenames = ['c0000000023o.json', 'c0000000003o.json'];
    const expectedCalls = [['./././data/news/test/c0000000003o.json']];

    testReadScenario(filenames, expectedCalls);
  });

  it('should ignore onward-journeys', () => {
    const filenames = ['c0000000001o.json', 'onward-journeys'];
    const expectedCalls = [['./././data/news/test/c0000000001o.json']];

    testReadScenario(filenames, expectedCalls);
  });

  it('should ignore files that are no json format', () => {
    const filenames = ['schema.yaml', 'README.md'];

    readFiles(filenames);

    expect(fileToValidateMock).not.toHaveBeenCalled();
  });
});
