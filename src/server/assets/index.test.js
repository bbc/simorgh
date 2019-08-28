/* eslint-disable global-require */
import path from 'path';
import nodeLogger from '../../app/lib/logger.node';
import { localBaseUrl } from '../../testHelpers/config';

const mockLogError = jest.fn();

jest.mock('../../app/lib/logger.node', () => jest.fn());

nodeLogger.mockImplementation(() => ({ error: mockLogError }));

describe('getAssetsArray', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('no assets manifest', () => {
    it('should log an error', async () => {
      delete process.env.SIMORGH_ASSETS_MANIFEST_PATH;
      const { getAssetsArray } = require('./index.js');
      getAssetsArray();
      expect(mockLogError).toHaveBeenCalledWith(
        `Error parsing assets manifest. SIMORGH_ASSETS_MANIFEST_PATH = ${process.env.SIMORGH_ASSETS_MANIFEST_PATH}`,
      );
    });
  });

  describe('assets manifest exists', () => {
    it('should return the main, vendor and service manifest contents as key-value pairs when service matches', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixture.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray('serviceName')).toEqual([
        `${localBaseUrl}/static/js/serviceName-12345.12345.js`,
        `${localBaseUrl}/static/js/vendor-54321.12345.js`,
        `${localBaseUrl}/static/js/vendor-12345.12345.js`,
        `${localBaseUrl}/static/js/main-12345.12345.js`,
      ]);
      expect(mockLogError).not.toHaveBeenCalled();
    });

    it('should return main and vendor manifest contents only when service doesnt match', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixture.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray()).toEqual([
        `${localBaseUrl}/static/js/vendor-54321.12345.js`,
        `${localBaseUrl}/static/js/vendor-12345.12345.js`,
        `${localBaseUrl}/static/js/main-12345.12345.js`,
      ]);
      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('assets manifest corrupted', () => {
    it('should return only main, vendor and service manifest contents which have a key', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixtureMissingKey.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray('serviceName')).toEqual([
        `${localBaseUrl}/static/js/serviceName-12345.12345.js`,
        `${localBaseUrl}/static/js/vendor-54321.12345.js`,
        `${localBaseUrl}/static/js/main-12345.12345.js`,
      ]);
      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('getAssetOrigins', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return the asset origins as an array', async () => {
      const defaultOrigins = [
        'https://ichef.bbci.co.uk',
        'https://gel.files.bbci.co.uk',
      ];
      process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
        'http://some.statichost.net';
      process.env.SIMORGH_ATI_BASE_URL = 'http://some.ati.static.host.net';
      const { getAssetOrigins } = require('./index.js');
      expect(getAssetOrigins()).toEqual([
        ...defaultOrigins,
        'http://some.statichost.net',
        'http://some.ati.static.host.net',
      ]);
    });
  });
});
