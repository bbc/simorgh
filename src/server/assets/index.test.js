/* eslint-disable global-require */
import path from 'path';
import nodeLogger from '../../app/lib/logger.node';

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
    it('should return the manifest contents as key-value pairs', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixture.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray()).toEqual(['one.js']);
      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('assets manifest corrupted', () => {
    it('should return only assets which have a key', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixtureMissingKey.json',
      );
      const { getAssetsArray } = require('./index.js');
      expect(getAssetsArray()).toEqual(['foo.js']);
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
      const { getAssetOrigins } = require('./index.js');
      expect(getAssetOrigins()).toEqual([
        ...defaultOrigins,
        'http://some.statichost.net',
      ]);
    });
  });
});
