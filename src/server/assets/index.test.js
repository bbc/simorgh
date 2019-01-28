import path from 'path';
import getAssetsArray from '.';

const logger = require('../../app/helpers/logger')(__filename);

describe('getAssetsArray', () => {
  describe('no assets manifest', () => {
    it('should log an error', async () => {
      delete process.env.SIMORGH_ASSETS_MANIFEST_PATH;

      Object.defineProperty(logger, 'error', { value: jest.fn() });
      getAssetsArray();
      expect(logger.error).toHaveBeenCalledWith(
        `Error parsing assets manifest. SIMORGH_ASSETS_MANIFEST_PATH = ${
          process.env.SIMORGH_ASSETS_MANIFEST_PATH
        }`,
      );
    });
  });

  describe('assets manifest exists', () => {
    it('should return the manifest contents as key-value pairs', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixture.json',
      );
      expect(getAssetsArray()).toEqual(['one.js']);
    });
  });

  describe('assets manifest corrupted', () => {
    it('should return only assets which have a key', async () => {
      process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
        __dirname,
        'fixtureMissingKey.json',
      );
      expect(getAssetsArray()).toEqual(['foo.js']);
    });
  });
});
