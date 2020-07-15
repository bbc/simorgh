import ora from 'ora';
import chalk from 'chalk';
import { readdirSync, statSync } from 'fs';

jest.mock('ora');
jest.mock('chalk', () => ({
  red: a => a,
  green: a => a,
  blue: a => a,
  yellow: a => a,
}));
jest.mock('../cypress/support/config/services', () => ({
  service1: {},
  service2: {},
}));
jest.mock('fs');
jest.mock('./bundleSizeConfig', () => ({
  MIN_SIZE: 564,
  MAX_SIZE: 582,
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
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(false);
    });

    it('should use ora to show loading and success states', () => {
      jest.isolateModules(() => {
        try {
          require('./bundleSize'); // eslint-disable-line global-require
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
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          [
            [
              '┌──────────────┬───────────────────────────┬─────────────────────────────────┬───────────────────────┬─────────────────────────┬─────────────────────────────────────┐',
              '│ Service name │ Service bundle sizes (kB) │ Total service bundle sizes (kB) │ Main bundle size (kB) │ Vendor bundle size (kB) │ Total bundles size for service (kB) │',
              '├──────────────┼───────────────────────────┼─────────────────────────────────┼───────────────────────┼─────────────────────────┼─────────────────────────────────────┤',
              '│ service1     │ 145                       │ 145                             │ 20                    │ 400                     │ 565                                 │',
              '├──────────────┼───────────────────────────┼─────────────────────────────────┼───────────────────────┼─────────────────────────┼─────────────────────────────────────┤',
              '│ service2     │ 150                       │ 150                             │ 20                    │ 400                     │ 570                                 │',
              '└──────────────┴───────────────────────────┴─────────────────────────────────┴───────────────────────┴─────────────────────────┴─────────────────────────────────────┘',
            ].join('\n'),
          ],
          [
            [
              '┌─────────────┬───────────────────┬─────────────────────────┐',
              '│ Bundle name │ Bundle sizes (kB) │ Total bundles size (kB) │',
              '├─────────────┼───────────────────┼─────────────────────────┤',
              '│ main        │ 20                │ 20                      │',
              '└─────────────┴───────────────────┴─────────────────────────┘',
            ].join('\n'),
          ],
          [
            [
              '┌─────────────┬────────────────────┬─────────────────────────┐',
              '│ Bundle name │ Bundle sizes (kB)  │ Total bundles size (kB) │',
              '├─────────────┼────────────────────┼─────────────────────────┤',
              '│ vendor      │ 100, 100, 100, 100 │ 400                     │',
              '└─────────────┴────────────────────┴─────────────────────────┘',
            ].join('\n'),
          ],
          [
            [
              '┌────────────────────────────────┬─────────────────────────────────┬────────────────────────────────┐',
              '│ Average total bundle size (kB) │ Smallest total bundle size (kB) │ Largest total bundle size (kB) │',
              '├────────────────────────────────┼─────────────────────────────────┼────────────────────────────────┤',
              '│ 568                            │ 565                             │ 570                            │',
              '└────────────────────────────────┴─────────────────────────────────┴────────────────────────────────┘',
            ].join('\n'),
          ],
        ]),
      );
    });
  });

  describe('when one or more of the service bundles are too small', () => {
    setUpFSMocks(2000, 150000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(() => {
        try {
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        try {
          require('./bundleSize'); // eslint-disable-line global-require
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
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service1 is too small at 422 kB. Please update thresholds in './scripts/bundleSizeConfig.js'",
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpFSMocks(145000, 165000);

    it('should throw an error', () => {
      let didThrow = false;
      jest.isolateModules(() => {
        try {
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          didThrow = true;
        }
      });
      expect(didThrow).toBe(true);
    });

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        try {
          require('./bundleSize'); // eslint-disable-line global-require
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
          require('./bundleSize'); // eslint-disable-line global-require
        } catch (e) {
          // silence error
        }
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for service2 is too large at 585 kB. Please update thresholds in './scripts/bundleSizeConfig.js'",
      );
    });
  });
});
