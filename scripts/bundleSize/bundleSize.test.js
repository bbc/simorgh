/* eslint-disable import/extensions */

import { createRequire } from 'module';

import stripAnsi from 'strip-ansi';
import { jest } from '@jest/globals';
const require = createRequire(import.meta.url);

// let ora;

// import(/* webpackChunkName: "ora" */ 'ora').then(oraModule => {
//   ora = oraModule.default || oraModule;
// });
// import(/* webpackChunkName: "fs" */ 'fs').then(fsModule => {
//   fs = fsModule.default || fsModule;
//   readdirSync = fsModule.readdirSync;
//   statSync = fsModule.statSync;
// });
// import(/* webpackChunkName: "chalk" */ 'chalk').then(chalkModule => {
//   chalk = chalkModule.default || chalkModule;
// });
jest.unstable_mockModule('./pageTypeBundleExtractor', () => ({
  execSync: jest.fn(),
}));
jest.unstable_mockModule('ora', () => ({
  mockReturnValue: jest.fn(),
}));
// const { mockReturnValue } = await import('ora');
// jest.unstable_mockModule('chalk', () => ({
//   red: jest.fn().mockReturnThis(),
//   green: jest.fn().mockReturnThis(),
//   blue: jest.fn().mockReturnThis(),
//   yellow: jest.fn().mockReturnThis(),
//   cyan: { bold: jest.fn().mockReturnThis() },
//   bold: jest.fn().mockReturnThis(),
// }));

jest.unstable_mockModule('../../cypress/support/config/services', () => ({
  service1: {},
  service2: {},
}));

jest.unstable_mockModule('./bundleSizeConfig', () => ({
  MIN_SIZE: 490,
  MAX_SIZE: 583,
}));
// jest.unstable_mockModule('fs', () => ({
//   readdirSync: jest.fn(),
//   statSync: jest.fn(),
// }));

// jest.mock('fs', () => {
//   return {
//     default: {
//       readdirSync: jest.fn(),
//     },
//   };
// });
const fs = jest.createMockFromModule('fs');
fs.readdirSync = jest.fn();
fs.statSync = jest.fn();

const ora = jest.createMockFromModule('ora');
ora.start = jest.fn();
ora.succeed = jest.fn();
ora.fail = jest.fn();

const chalk = jest.createMockFromModule('chalk');
chalk.red = jest.fn();
chalk.green = jest.fn();
chalk.blue = jest.fn();
chalk.yellow = jest.fn();
chalk.cyan = { bold: jest.fn() };
chalk.bold = jest.fn();

function setUpFSMocks(service1FileSize, service2FileSize) {
  beforeEach(() => {
    const bundles = [
      'modern.main-12345.js',
      'modern.service1-12345.12345.js',
      'modern.service2-12345.12345.js',
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
}

describe('bundleSize', () => {
  const originalConsoleLog = global.console.log;
  const originalConsoleError = global.console.error;

  let start;
  let succeed;
  let fail;

  beforeAll(() => {
    // start = jest.fn();
    // succeed = jest.fn();
    // fail = jest.fn();

    // ora.mockReturnValue({
    //   start,
    //   succeed,
    //   fail,
    // });
    // chalk.red.bold = a => a;

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
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          console.debug('ERROR BEANS 2', e);
          didThrow = true;
        }
      });
      expect(didThrow).toBe(false);
    });

    it('should use ora to show loading and success states', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(ora.start).toHaveBeenCalled();
      expect(ora.succeed).toHaveBeenCalledWith('All bundle sizes are good!');
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          console.debug('DAMN BEANS', e);
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
        MODERN service bundle sizes
        ┌──────────────┬─────────────────────────────────┬────────────────────┬─────────────────┐
        │ Service name │ bundles                         │ Total size (Bytes) │ Total size (kB) │
        ├──────────────┼─────────────────────────────────┼────────────────────┼─────────────────┤
        │ service1     │ service1-12345.12345.js (142kB) │ 145000             │ 142             │
        ├──────────────┼─────────────────────────────────┼────────────────────┼─────────────────┤
        │ service2     │ service2-12345.12345.js (146kB) │ 150000             │ 146             │
        └──────────────┴─────────────────────────────────┴────────────────────┴─────────────────┘

        MODERN service bundle sizes summary
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
        │ FrontPage         │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ FrontPage-…07e.js (20kB) │ 360000             │ 353             │
        │                   │                          │                          │                          │                          │ commons-22…222.js (49kB) │                          │                    │                 │
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
        │ PhotoGalleryPage  │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ PhotoGalle…83a.js (20kB) │ 400000             │ 392             │
        │                   │                          │                          │                          │ shared-333…333.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
        ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
        │ StoryPage         │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ StoryPage-…76d.js (20kB) │ 400000             │ 392             │
        │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
        ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
        │ ErrorPage         │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ ErrorPage-…c35.js (20kB) │ 440000             │ 431             │
        │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
        │                   │                          │                          │                          │ shared-333…333.js (39kB) │                          │                          │                    │                 │
        ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
        │ IdxPage           │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ IdxPage-31…555.js (20kB) │ 440000             │ 431             │
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
        ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
        │ MediaAssetPage    │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ MediaAsset…c9c.js (20kB) │ 440000             │ 431             │
        │                   │                          │                          │ 3333-lib-2…222.js (78kB) │                          │ commons-22…222.js (49kB) │                          │                    │                 │
        ├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼────────────────────┼─────────────────┤
        │ MostWatchedPage   │ main-12345…345.js (20kB) │ framework-…111.js (98kB) │ 1111-lib-1…111.js (78kB) │ shared-111…111.js (39kB) │ commons-11…111.js (49kB) │ MostWatche…f05.js (20kB) │ 440000             │ 431             │
        │                   │                          │                          │                          │ shared-222…222.js (39kB) │ commons-22…222.js (49kB) │                          │                    │                 │
        │                   │                          │                          │                          │ shared-333…333.js (39kB) │                          │                          │                    │                 │
        └───────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┴────────────────────┴─────────────────┘

        MODERN page bundle sizes summary (excludes service bundle)
        ┌─────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) │ 353 │
        ├─────────────────────────────────┼─────┤
        │ Largest total bundle size (kB)  │ 431 │
        ├─────────────────────────────────┼─────┤
        │ Average total bundle size (kB)  │ 403 │
        └─────────────────────────────────┴─────┘

        MODERN service + page bundle sizes summary
        ┌────────────────────────────────────────────────────────────────────┬─────┐
        │ Smallest total bundle size (kB) (smallest service + smallest page) │ 495 │
        ├────────────────────────────────────────────────────────────────────┼─────┤
        │ Largest total bundle size (kB) (largest service + largest page)    │ 577 │
        └────────────────────────────────────────────────────────────────────┴─────┘"
      `);
    });
  });

  describe('when one or more of the service bundles are too small', () => {
    setUpFSMocks(2000, 150000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(ora.start).toHaveBeenCalled();
      expect(ora.fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service1 FrontPage is too small at 355 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpFSMocks(145000, 165000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          // silence error
        }
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(ora.start).toHaveBeenCalled();
      expect(ora.fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(async () => {
        try {
          const bundleSize = await import('./index.js');
          bundleSize();
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service2 MostWatchedPage is too large at 592 kB. Please update thresholds in './scripts/bundleSize/bundleSizeConfig.js'",
      );
    });
  });
});
