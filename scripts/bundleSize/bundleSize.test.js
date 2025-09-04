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

      expect(calls).toMatchInlineSnapshot(`
          "

          Results
          MODERN service config bundle sizes
          ┌──────────────┬─────────────────────────────────┬────────────────────┬─────────────────┐
          │ Service name │ bundles                         │ Total size (Bytes) │ Total size (kB) │
          ├──────────────┼─────────────────────────────────┼────────────────────┼─────────────────┤
          │ service1     │ service1-12345.12345.js (142kB) │ 145000             │ 142             │
          ├──────────────┼─────────────────────────────────┼────────────────────┼─────────────────┤
          │ service2     │ service2-12345.12345.js (146kB) │ 150000             │ 146             │
          └──────────────┴─────────────────────────────────┴────────────────────┴─────────────────┘

          MODERN service config bundle sizes summary
          ┌─────────────────────────────────┬─────┐
          │ Smallest total bundle size (kB) │ 142 │
          ├─────────────────────────────────┼─────┤
          │ Largest total bundle size (kB)  │ 146 │
          ├─────────────────────────────────┼─────┤
          │ Average total bundle size (kB)  │ 144 │
          └─────────────────────────────────┴─────┘
          MODERN service theme bundle sizes
          ┌──────────────┬──────────────────────────────────┬────────────────────┬─────────────────┐
          │ Service name │ bundles                          │ Total size (Bytes) │ Total size (kB) │
          ├──────────────┼──────────────────────────────────┼────────────────────┼─────────────────┤
          │ service1     │ themes-service1.12345.js (142kB) │ 145000             │ 142             │
          ├──────────────┼──────────────────────────────────┼────────────────────┼─────────────────┤
          │ service2     │ themes-service2.12345.js (146kB) │ 150000             │ 146             │
          └──────────────┴──────────────────────────────────┴────────────────────┴─────────────────┘

          MODERN service theme bundle sizes summary
          ┌─────────────────────────────────┬─────┐
          │ Smallest total bundle size (kB) │ 142 │
          ├─────────────────────────────────┼─────┤
          │ Largest total bundle size (kB)  │ 146 │
          ├─────────────────────────────────┼─────┤
          │ Average total bundle size (kB)  │ 144 │
          └─────────────────────────────────┴─────┘

          MODERN page type bundle sizes
          ┌───────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬────────────────────┬─────────────────┐
          │ Page type         │ main                     │ framework                │ lib                      │ shared                   │ commons                  │ page                     │ Total size (Bytes) │ Total size (kB) │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ HomePage          │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ HomePage-3…c5c.js (20kB) │ 360000             │ 353             │
          │                   │                          │                          │                          │                          │ commons-22…222.js (49kB) │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ OnDemandTvPage    │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ OnDemandTv…b7f.js (20kB) │ 390000             │ 382             │
          │                   │                          │                          │ 3333-lib-2…222.js (78kB) │                          │                          │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ ArticlePage       │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ ArticlePag…c35.js (20kB) │ 400000             │ 392             │
          │                   │                          │                          │                          │ shared-333…333.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ OnDemandAudioPage │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-222…222.js (39kB) │ commons-11…111.js (49kB) │ OnDemandAu…2d0.js (20kB) │ 400000             │ 392             │
          │                   │                          │                          │                          │ shared-333…333.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ ErrorPage         │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ ErrorPage-…c35.js (20kB) │ 440000             │ 431             │
          │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
          │                   │                          │                          │                          │ shared-333…333.js (39kB) │                          │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ MostReadPage      │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ MostReadPa…f05.js (20kB) │ 440000             │ 431             │
          │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
          │                   │                          │                          │                          │ shared-333…333.js (39kB) │                          │                          │                    │                 │
          ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
          │ LiveRadioPage     │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ LiveRadioP…a90.js (20kB) │ 440000             │ 431             │
          │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
          │                   │                          │                          │                          │ shared-333…333.js (39kB) │                          │                          │                    │                 │
          └───────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴────────────────────┴─────────────────┘

          MODERN page bundle sizes summary (excludes service bundle)
          ┌─────────────────────────────────┬─────┐
          │ Smallest total bundle size (kB) │ 353 │ b
          ├─────────────────────────────────┼─────┤
          │ Largest total bundle size (kB)  │ 431 │
          ├─────────────────────────────────┼─────┤
          │ Average total bundle size (kB)  │ 403 │
          └─────────────────────────────────┴─────┘

          MODERN service config & theme + page bundle sizes summary
          ┌────────────────────────────────────────────────────────────────────┬─────┐
          │ Smallest total bundle size (kB) (smallest service + smallest page) │ 637 │
          ├────────────────────────────────────────────────────────────────────┼─────┤
          │ Largest total bundle size (kB) (largest service + largest page)    │ 723 │
          └────────────────────────────────────────────────────────────────────┴─────┘"
        `);
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

    it('should log an error telling dev how to update thresholds', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service1 HomePage is too small at 357 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
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

    it('should log an error telling dev how to update thresholds', async () => {
      try {
        const { default: bundleSize } = await import('./index.js');
        bundleSize();
      } catch (e) {
        // silence error
      }
      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service2 MediaAssetPage is too large at 753 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });
});
