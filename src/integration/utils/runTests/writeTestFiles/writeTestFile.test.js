import fs from 'fs';
import prettifyContent from './prettifyContent';
import writeTestFile from './writeTestFile';

const { SERVICES_TESTS_DIR } = require('../constants');

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

const getExpectedFileContent = ({
  service,
  pathname,
  expectedImports,
  expectedDescribeBlock,
}) =>
  prettifyContent(`
  /**
   * @service ${service}
   * @pathname ${pathname}
   */

  ${expectedImports}

  ${expectedDescribeBlock}
`);

const runTests = ({
  service,
  pageType,
  pathname,
  expectedParentDir,
  expectedTestDir,
}) => {
  afterEach(() => {
    fs.writeFileSync.mockClear();
    fs.mkdirSync.mockClear();
  });

  it('should create the directory for the generated tests to go in', () => {
    const [dirPath] = fs.mkdirSync.mock.calls[0];

    expect(dirPath).toMatch(
      `/simorgh/src/integration/${SERVICES_TESTS_DIR}/${expectedTestDir}`,
    );
  });

  describe('AMP platform', () => {
    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[0];

      expect(encoding).toEqual('utf8');
      expect(filePath).toMatch(
        `/simorgh/src/integration/${SERVICES_TESTS_DIR}/${expectedTestDir}/amp.test.js`,
      );

      const expectedImports = `import runAmpTests from '${expectedParentDir}pages/${pageType}/ampTests';`;
      const expectedDescribeBlock = `describe('AMP ${service} ${pageType}', runAmpTests)`;

      expect(fileContent).toEqual(
        getExpectedFileContent({
          service,
          pathname,
          expectedImports,
          expectedDescribeBlock,
        }),
      );
    });
  });

  describe('Canonical platform', () => {
    it('should write the generated test file in the new directory', () => {
      const [filePath, fileContent, encoding] = fs.writeFileSync.mock.calls[1];

      expect(encoding).toEqual('utf8');

      expect(filePath).toMatch(
        `/simorgh/src/integration/${SERVICES_TESTS_DIR}/${expectedTestDir}/canonical.test.js`,
      );

      const expectedImports = `import runCanonicalTests from '${expectedParentDir}pages/${pageType}/canonicalTests';`;
      const expectedDescribeBlock = `describe('Canonical ${service} ${pageType}', runCanonicalTests)`;

      expect(fileContent).toEqual(
        getExpectedFileContent({
          service,
          pathname,
          expectedImports,
          expectedDescribeBlock,
        }),
      );
    });
  });
};

describe('should generate test files from a given test example', () => {
  const service = 'persian';
  const pageType = 'liveRadio';
  const pathname = '/persian/bbc_persian_radio/liveradio';

  beforeEach(() => {
    writeTestFile({
      service,
      pageType,
      pathname,
    });
  });

  runTests({
    service,
    pageType,
    pathname,
    expectedParentDir: '../../../',
    expectedTestDir: `${service}/${pageType}`,
  });
});

describe('should generate test files from a given test example for services with variants', () => {
  const service = 'zhongwen';
  const pageType = 'articles';
  const pathname = '/zhongwen/articles/c3xd4x9prgyo/simp';
  const variant = 'simp';

  beforeEach(() => {
    writeTestFile({
      service,
      pageType,
      pathname,
      variant,
    });
  });

  runTests({
    service,
    pageType,
    pathname,
    expectedParentDir: '../../../../',
    expectedTestDir: `${service}/${variant}/${pageType}`,
  });
});
