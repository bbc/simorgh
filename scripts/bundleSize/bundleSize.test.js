import ora from 'ora';
import chalk from 'chalk';
import { readdirSync, statSync } from 'fs';
import stripAnsi from 'strip-ansi';

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
  MIN_SIZE: 373,
  MAX_SIZE: 563,
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
      '1111-lib-1111.js',
      'commons-1111.js',
      'commons-2222.js',
      'commons-3333.js',
      'shared-1111.js',
      'shared-2222.js',
    ];
    readdirSync.mockReturnValue(bundles);

    const filePatternToSizeMap = {
      service1: service1FileSize,
      service2: service2FileSize,
      main: 20000,
      vendor: 100000,
      lib: 80000,
      shared: 40000,
      commons: 50000,
      Page: 20000,
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
        ┌──────────────┬─────────────────────────────────┬─────────────────┐
        │ Service name │ bundles                         │ Total size (kB) │
        ├──────────────┼─────────────────────────────────┼─────────────────┤
        │ service1     │ service1-12345.12345.js (142kB) │ 142             │
        ├──────────────┼─────────────────────────────────┼─────────────────┤
        │ service2     │ service2-12345.12345.js (146kB) │ 146             │
        └──────────────┴─────────────────────────────────┴─────────────────┘

        Service bundles summary
        ┌─────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) │ 142 │
        ├─────────────────────────────────┼─────┤
        │ Largest total bundle size (kB)  │ 146 │
        ├─────────────────────────────────┼─────┤
        │ Average total bundle size (kB)  │ 144 │
        └─────────────────────────────────┴─────┘

        Page type bundles
        ┌───────────────────┬──────────────────────────┬───────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬─────────────────┐
        │ Page type         │ main                     │ framework │ lib                      │ shared                   │ commons                  │ page                     │ Total size (kB) │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ ErrorPage         │ main-12345…345.js (20kB) │           │                          │                          │ commons-0f…458.js (49kB) │ ErrorPage-…931.js (20kB) │ 236             │
        │                   │                          │           │                          │                          │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ MostReadPage      │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ MostReadPa…378.js (20kB) │ 353             │
        │                   │                          │           │                          │                          │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ OnDemandTvPage    │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ OnDemandTv…c9e.js (20kB) │ 353             │
        │                   │                          │           │                          │                          │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ ArticlePage       │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ ArticlePag…b86.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ FrontPage         │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ FrontPage-…043.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ IdxPage           │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ IdxPage-31…7b8.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ LiveRadioPage     │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ LiveRadioP…8bd.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ MediaAssetPage    │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ MediaAsset…eea.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ OnDemandRadioPage │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ OnDemandRa…6ac.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ PhotoGalleryPage  │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ PhotoGalle…839.js (20kB) │ 392             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        ├───────────────────┼──────────────────────────┼───────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼─────────────────┤
        │ StoryPage         │ main-12345…345.js (20kB) │           │ ../moment-…c50.js (78kB) │ shared-Udd…3aa.js (39kB) │ commons-0f…458.js (49kB) │ StoryPage-…414.js (20kB) │ 412             │
        │                   │                          │           │                          │ shared-nj6…c3a.js (39kB) │ commons-7d…5c9.js (49kB) │ StoryPage-…d12.js (20kB) │                 │
        │                   │                          │           │                          │                          │ commons-84…fc0.js (49kB) │                          │                 │
        │                   │                          │           │                          │                          │ commons-92…2d7.js (49kB) │                          │                 │
        └───────────────────┴──────────────────────────┴───────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴─────────────────┘

        Page bundles summary (excludes service bundle)
        ┌─────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) │ 236 │
        ├─────────────────────────────────┼─────┤
        │ Largest total bundle size (kB)  │ 412 │
        ├─────────────────────────────────┼─────┤
        │ Average total bundle size (kB)  │ 373 │
        └─────────────────────────────────┴─────┘

        Service + Page bundles summary
        ┌────────────────────────────────────────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) (smallest service + smallest page) │ 378 │
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
        "Bundle size for service1 ErrorPage is too small at 238 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
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
        "Bundle size for service2 StoryPage is too large at 573 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });
});
