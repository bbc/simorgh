import ora from 'ora';
import chalk from 'chalk';
import { execSync } from 'child_process';

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
jest.mock('child_process');

const setUpExecSyncMock = (service1Size, service2Size) => {
  beforeEach(() => {
    const filePatternToSizeMap = {
      service1: service1Size,
      service2: service2Size,
      'main-*.js': '20000',
      'vendor-*.js': '350000',
    };
    execSync.mockImplementation(filePath => {
      const filePattern = Object.keys(filePatternToSizeMap).find(key =>
        filePath.includes(key),
      );
      return filePatternToSizeMap[filePattern];
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
    setUpExecSyncMock('560000', '570000');

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
          ['\nBundle size summary:'],
          ['    20 kB   Main bundle '],
          ['   350 kB   Vendor bundle '],
          ['   560 kB   Smallest bundle - Service1'],
          ['   570 kB   Largest bundle - Service2'],
          ['   565 kB   Average bundle '],
        ]),
      );
    });
  });

  describe('when one or more of the service bundles are too small', () => {
    setUpExecSyncMock('2000', '570000');

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
        "Bundle size for Service1 is too small at 2 kB. Please update thresholds in './scripts/bundleSize.js'",
      );
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          ['\nBundle size summary:'],
          ['    20 kB   Main bundle '],
          ['   350 kB   Vendor bundle '],
          ['     2 kB   Smallest bundle - Service1'],
          ['   570 kB   Largest bundle - Service2'],
          ['   286 kB   Average bundle '],
        ]),
      );
    });
  });

  describe('when one or more of the service bundles are too large', () => {
    setUpExecSyncMock('560000', '580000');

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
        "Bundle size for Service2 is too large at 580 kB. Please update thresholds in './scripts/bundleSize.js'",
      );
    });

    it('should log a summary of bundle sizes', () => {
      jest.isolateModules(() => {
        require('./bundleSize'); // eslint-disable-line global-require
      });

      expect(global.console.log.mock.calls).toEqual(
        expect.arrayContaining([
          ['\nBundle size summary:'],
          ['    20 kB   Main bundle '],
          ['   350 kB   Vendor bundle '],
          ['   560 kB   Smallest bundle - Service1'],
          ['   580 kB   Largest bundle - Service2'],
          ['   570 kB   Average bundle '],
        ]),
      );
    });
  });
});
