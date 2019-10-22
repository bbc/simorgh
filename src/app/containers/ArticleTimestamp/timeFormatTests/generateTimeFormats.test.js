import { writeFile } from 'fs';

jest.mock('fs');
jest.mock('#server/utilities/serviceConfigs', () => ({
  service: {
    default: {
      datetimeLocale: 'en-gb',
      timezone: 'Europe/London',
    },
  },
}));

describe('generateTimeFormats', () => {
  afterEach(jest.clearAllMocks);
  it('should run without errors', async () => {
    writeFile.mockImplementation(() => jest.fn());
    let hasError = false;
    jest.isolateModules(() => {
      try {
        // eslint-disable-next-line global-require
        require('./generateTimeFormats');
      } catch (e) {
        hasError = true;
      }
      expect(writeFile).toHaveBeenCalled();
      expect(hasError).toBe(false);
    });
  });

  it('should catch errors', async () => {
    writeFile.mockImplementation(() => {
      throw new Error();
    });
    let hasError = false;
    jest.isolateModules(() => {
      try {
        // eslint-disable-next-line global-require
        require('./generateTimeFormats');
      } catch (e) {
        hasError = true;
      }
      expect(writeFile).toHaveBeenCalled();
      expect(hasError).toBe(true);
    });
  });
});
