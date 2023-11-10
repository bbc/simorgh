import stripAnsi from 'strip-ansi';
import { jest } from '@jest/globals';
import pageTypeBundleExtractor from './__mocks__/pageTypeBundleExtractor.js';

jest.unstable_mockModule(
  './pageTypeBundleExtractor',
  () => pageTypeBundleExtractor,
);

jest.unstable_mockModule('./bundleSizeConfig', () => ({
  MIN_SIZE: 632,
  MAX_SIZE: 728,
}));

jest.unstable_mockModule('./serviceList.js', () => ({
  default: ['service1', 'service2'],
}));

jest.unstable_mockModule('fs', () => ({
  default: {
    readdirSync: jest.fn(),
    statSync: jest.fn(),
  },
}));

const start = jest.fn();
const succeed = jest.fn();
const fail = jest.fn();

jest.unstable_mockModule('ora', () => {
  const mock = jest.fn();
  mock.mockReturnValue({
    start,
    succeed,
    fail,
  });
  return {
    default: mock,
  };
});

jest.unstable_mockModule('chalk', () => ({
  default: {
    red: a => a,
    green: a => a,
    blue: a => a,
    yellow: a => a,
    cyan: { bold: b => b },
    bold: a => a,
  },
}));

const setUpFSMocks = (service1FileSize, service2FileSize) => {
  beforeEach(async () => {
    const { default: fs } = await import('fs');

    const bundles = [
      'modern.main-12345.js',
      'modern.service1-12345.12345.js',
      'modern.service2-12345.12345.js',
      'modern.themes-service1.12345.js',
      'modern.themes-service2.12345.js',
      'modern.1111-lib-1111.js',
      'modern.commons-1111.js',
      'modern.commons-2222.js',
      'modern.commons-3333.js',
      'modern.shared-1111.js',
      'modern.shared-2222.js',
      'modern.framework-1111.js',
    ];
    fs.readdirSync.mockReturnValue(bundles);

    const filePatternToSizeMap = {
      service1: service1FileSize,
      service2: service2FileSize,
      main: 20000,
      lib: 80000,
      shared: 40000,
      commons: 50000,
      framework: 100000,
      Page: 20000,
    };
    fs.statSync.mockImplementation(filePath => {
      const filePattern = Object.keys(filePatternToSizeMap).find(key =>
        filePath.includes(key),
      );
      return { size: filePatternToSizeMap[filePattern] };
    });
  });
};

const { default: ora } = await import('ora');

describe('bundleSize', () => {
  const originalConsoleLog = global.console.log;
  const originalConsoleError = global.console.error;

  beforeAll(async () => {
    const chalk = await import('chalk');
    chalk.default.red.bold = a => a;

    global.console.log = jest.fn();
    global.console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.console.log = originalConsoleLog;
    global.console.error = originalConsoleError;
  });

  describe('when all service bundles are within the defined limits', () => {
    setUpFSMocks(145000, 150000);

    it('should not throw an error', async () => {
      let didThrow = false;
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        didThrow = true;
      }
      expect(didThrow).toBe(false);
    });

    it('should use ora to show loading and success states', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(succeed).toHaveBeenCalledWith('All bundle sizes are good!');
    });

    it('should log a summary of bundle sizes', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }

      const calls = global.console.log.mock.calls.reduce(
        (scriptOutput, [message]) => {
          return scriptOutput + stripAnsi(message);
        },
        '',
      );

      expect(calls).toMatchInlineSnapshot(`""`);
    });
  });
  describe('when one or more of the service bundles are too small', () => {
    setUpFSMocks(2000, 150000);

    it('should throw an error', async () => {
      let didThrow = false;
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        didThrow = true;
      }
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service1 FrontPage is too small at 357 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpFSMocks(145000, 165000);

    it('should throw an error', async () => {
      let didThrow = false;
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        didThrow = true;
      }
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service2 MostWatchedPage is too large at 753 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });
});
