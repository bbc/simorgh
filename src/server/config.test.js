import { getPublicDirectory } from './config';

describe('Config', () => {
  describe('publicDirectory', () => {
    process.env.RAZZLE_PUBLIC_DIR = 'test-public';
    process.env.RAZZLE_PUBLIC_DIR_DEV = `test-public-dev`;

    describe('Production build', () => {
      it('should equal the RAZZLE_PUBLIC_DIR environment variable', async () => {
        process.env.NODE_ENV = 'production';
        expect(getPublicDirectory()).toEqual(process.env.RAZZLE_PUBLIC_DIR);
      });
    });

    describe('Development build', () => {
      it('should equal the RAZZLE_PUBLIC_DIR_DEV environment variable', async () => {
        process.env.NODE_ENV = 'development';
        expect(getPublicDirectory()).toEqual(process.env.RAZZLE_PUBLIC_DIR_DEV);
      });
    });
  });
});
