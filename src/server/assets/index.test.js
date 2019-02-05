import path from 'path';
import getAssetsArray from '.';
import nodeLogger from '../../app/helpers/logger.node';

const mockLogError = jest.fn();
const mockLogConstructor = (filename) => {
    return { error: mockLogError };
  };
const mockLogger = jest.mock('../../app/helpers/logger.node', () => {
  console.log('constructorhere', mockLogConstructor);
  return jest.fn().mockImplementation(mockLogConstructor);
});

console.log('error', mockLogError);
console.log('constructor', mockLogConstructor);
console.log('logger', mockLogger);

describe('getAssetsArray', () => {
  describe('no assets manifest', () => {
    it('should log an error', async () => {
      delete process.env.SIMORGH_ASSETS_MANIFEST_PATH;
      getAssetsArray();
      expect(mockLogError).toHaveBeenCalled();
      // expect(spy).toHaveBeenCalledWith(
      //   `Error parsing assets manifest. SIMORGH_ASSETS_MANIFEST_PATH = ${
      //     process.env.SIMORGH_ASSETS_MANIFEST_PATH
      //   }`,
      // );
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
