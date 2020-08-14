import ora from 'ora';
import chalk from 'chalk';
import { readdirSync, statSync } from 'fs';
import stripAnsi from 'strip-ansi';

jest.mock('./pageTypeBundleExtractor');

jest.mock('../../reports/webpackBundleReport.json', () => {}, {
  virtual: true,
});
jest.mock('ora');
jest.mock('chalk', () => ({
  red: a => a,
  green: a => a,
  blue: a => a,
  yellow: a => a,
  cyan: { bold: b => b },
  bold: a => a,
}));
jest.mock('../../cypress/support/config/services', () => ({
  service1: {},
  service2: {},
}));
jest.mock('fs');
jest.mock('./bundleSizeConfig', () => ({
  MIN_SIZE: 554,
  MAX_SIZE: 572,
}));

const setUpFSMocks = (service1FileSize, service2FileSize) => {
  beforeEach(() => {
    const bundles = [
      'main-12345.js',
      'vendor-11111.js',
      'vendor-22222.js',
      'vendor-33333.js',
      'vendor-44444.js',
      'service1-12345.12345.js',
      'service2-12345.12345.js',
    ];
    readdirSync.mockReturnValue(bundles);

    const filePatternToSizeMap = {
      service1: service1FileSize,
      service2: service2FileSize,
      main: 20000,
      vendor: 100000,
    };
    statSync.mockImplementation(filePath => {
      const filePattern = Object.keys(filePatternToSizeMap).find(key =>
        filePath.includes(key),
      );
      return { size: filePatternToSizeMap[filePattern] };
    });
  });
};

describe('bundleSize', () => {
  const originalConsoleLog = global.console.log;
  const originalConsoleError = global.console.error;

  let start;
  let succeed;
  let fail;

  beforeAll(() => {
    start = jest.fn();
    succeed = jest.fn();
    fail = jest.fn();

    ora.mockReturnValue({
      start,
      succeed,
      fail,
    });
    chalk.red.bold = a => a;

    global.console.log = jest.fn();
    global.console.error = jest.fn();
  });

  afterEach(jest.clearAllMocks);

  afterAll(() => {
    global.console.log = originalConsoleLog;
    global.console.error = originalConsoleError;
  });

  describe('when all service bundles are within the defined limits', () => {
    setUpFSMocks(145000, 150000);

    it('should not throw an error', () => {
      let didThrow = false;
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(false);
    });

    it('should use ora to show loading and success states', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(succeed).toHaveBeenCalledWith('All bundle sizes are good!');
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      const calls = global.console.log.mock.calls.reduce(
        (scriptOutput, [message]) => {
          return scriptOutput + stripAnsi(message);
        },
        '',
      );

      expect(calls).toMatchInlineSnapshot(`
        "

        Results
        Service bundles
        ┌──────────────┬───────────────────────────┬─────────────────────────────────┐
        │ Service name │ Service bundle sizes (kB) │ Total service bundle sizes (kB) │
        ├──────────────┼───────────────────────────┼─────────────────────────────────┤
        │ service1     │ 142                       │ 142                             │
        ├──────────────┼───────────────────────────┼─────────────────────────────────┤
        │ service2     │ 146                       │ 146                             │
        └──────────────┴───────────────────────────┴─────────────────────────────────┘

        Service bundles summary
        ┌─────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) │ 142 │
        ├─────────────────────────────────┼─────┤
        │ Largest total bundle size (kB)  │ 146 │
        ├─────────────────────────────────┼─────┤
        │ Average total bundle size (kB)  │ 144 │
        └─────────────────────────────────┴─────┘

        Page type bundles
        ┌───────────────────┬───────────────────┬─────────────────────┬─────────────────────┬─────────────────────────┐
        │ Page type         │ main bundles (kB) │ vendor bundles (kB) │ common bundles (kB) │ Total bundles size (kB) │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ ArticlePage       │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ MediaAssetPage    │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ PhotoGalleryPage  │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ StoryPage         │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ FrontPage         │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ MostReadPage      │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ LiveRadioPage     │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ OnDemandRadioPage │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        ├───────────────────┼───────────────────┼─────────────────────┼─────────────────────┼─────────────────────────┤
        │ OnDemandTvPage    │ 20                │ 98, 98, 98, 98      │                     │ 412                     │
        └───────────────────┴───────────────────┴─────────────────────┴─────────────────────┴─────────────────────────┘

        Page bundles summary (excludes service bundle)
        ┌─────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) │ 412 │
        ├─────────────────────────────────┼─────┤
        │ Largest total bundle size (kB)  │ 412 │
        ├─────────────────────────────────┼─────┤
        │ Average total bundle size (kB)  │ 412 │
        └─────────────────────────────────┴─────┘

        Service + Page bundles summary
        ┌────────────────────────────────────────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) (smallest service + smallest page) │ 554 │
        ├────────────────────────────────────────────────────────────────────┼─────┤
        │ Largest total bundle size (kB) (largest service + largest page)    │ 558 │
        └────────────────────────────────────────────────────────────────────┴─────┘"
      `);
    });
  });

  describe('when one or more of the service bundles are too small', () => {
    setUpFSMocks(2000, 150000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service1 ArticlePage is too small at 414 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpFSMocks(145000, 165000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(() => {
        try {
          require('.'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service2 OnDemandTvPage is too large at 573 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });
});
