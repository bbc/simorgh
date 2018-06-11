import { getPublicDirectory } from './config';

describe('Config', () => {
  describe('publicDirectory', () => {
    process.env.RAZZLE_PUBLIC_DIR = 'test-public';
    process.env.RAZZLE_PUBLIC_DIR_DEV = `test-public-dev`;

    const testOutput = (testTitle, environment, expectedOutput) => {
      it(testTitle, () => {
        process.env.NODE_ENV = environment;
        expect(getPublicDirectory()).toEqual(expectedOutput);
      });
    };

    describe('Production build', () => {
      testOutput(
        'should equal the RAZZLE_PUBLIC_DIR environment variable',
        'production',
        process.env.RAZZLE_PUBLIC_DIR,
      );
    });

    describe('Development build', () => {
      testOutput(
        'should equal the RAZZLE_PUBLIC_DIR_DEV environment variable',
        'development',
        process.env.RAZZLE_PUBLIC_DIR_DEV,
      );
    });
  });
});
