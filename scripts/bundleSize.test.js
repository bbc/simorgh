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
jest.mock('../src/app/lib/config/services/loadableConfig', () => ({
  default: {
    service1: {},
    service2: {},
  },
}));
jest.mock('fs');
jest.mock('./bundleSizeConfig', () => ({
  MIN: 564,
  MAX: 582,
}));

const setUpExecSyncMock = (service1FileSize, service2FileSize) => {
  beforeEach(() => {
    readdirSync.mockReturnValue([
      'main-12345.js',
      'vendor-11111.js',
      'vendor-22222.js',
      'vendor-33333.js',
      'vendor-44444.js',
      'service1-12345.12345.js',
      'service2-12345.12345.js',
    ]);
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
    setUpExecSyncMock(145000, 150000);

    it('should use ora to show loading and success states', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(succeed).toHaveBeenCalledWith('All bundle sizes are good!');
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          ['\nBundle size summary:\n'],
          ['    20 kB   Main bundle '],
          ['   400 kB   Vendor bundle '],
          ['   565 kB   Smallest bundle - Service1'],
          ['   570 kB   Largest bundle - Service2'],
          ['   568 kB   Average bundle '],
        ]),
      );
    });
  });

  describe('when one or more of the service bundles are too small', () => {
    setUpExecSyncMock(2000, 150000);

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for Service1 is too small at 422 kB. Please update thresholds in './scripts/bundleSize.js'",
      );
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          ['\nBundle size summary:\n'],
          ['    20 kB   Main bundle '],
          ['   400 kB   Vendor bundle '],
          ['   422 kB   Smallest bundle - Service1'],
          ['   570 kB   Largest bundle - Service2'],
          ['   496 kB   Average bundle '],
        ]),
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpExecSyncMock(145000, 165000);

    it('should use ora to show loading and failure states', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(ora).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'Analysing bundles...' }),
      );
      expect(start).toHaveBeenCalled();
      expect(fail).toHaveBeenCalledWith('Issues with service bundles: ');
    });

    it('should log an error telling dev how to update thresholds', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.error).toHaveBeenCalledWith(
        "Bundle size for Service2 is too large at 585 kB. Please update thresholds in './scripts/bundleSize.js'",
      );
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          ['\nBundle size summary:\n'],
          ['    20 kB   Main bundle '],
          ['   400 kB   Vendor bundle '],
          ['   565 kB   Smallest bundle - Service1'],
          ['   585 kB   Largest bundle - Service2'],
          ['   575 kB   Average bundle '],
        ]),
      );
    });
  });
});
