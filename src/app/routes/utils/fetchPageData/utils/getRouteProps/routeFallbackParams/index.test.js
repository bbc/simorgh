import { fallbackAmpParam, fallbackServiceParam } from '.';

jest.mock('#lib/config/services/loadableConfig', () => ({
  dasher: 'data',
  dancer: 'data',
  prancer: 'data',
  vixen: 'data',
  comet: 'data',
}));

describe('routeFallBackParams', () => {
  describe('fallbackAmpParam', () => {
    [
      {
        description: 'should return true if path ends in ".amp"',
        path: '/news/foobar.amp',
        expectedIsAmp: true,
      },
      {
        description:
          'should return false if path contains ".amp" but doesnt end in it',
        path: '/news/foobar.ampfoo',
        expectedIsAmp: false,
      },
      {
        description: 'should return false if path ends in just "amp"',
        path: '/news/foobar/amp',
        expectedIsAmp: false,
      },
    ].forEach(({ description, path, expectedIsAmp }) => {
      it(description, () => {
        expect(fallbackAmpParam(path)).toEqual(expectedIsAmp);
      });
    });
  });

  describe('fallbackServiceParam', () => {
    [
      {
        description:
          'should return service name if matches known service in first path part',
        path: '/prancer/foobar',
        expectedService: 'prancer',
      },
      {
        description:
          'should return "news" if first path part is not known service',
        path: '/foobar/barfoo',
        expectedService: 'news',
      },
      {
        description:
          'should not match known services with path parts other than the first',
        path: '/foobar/prancer',
        expectedService: 'news',
      },
    ].forEach(({ description, path, expectedService }) => {
      it(description, () => {
        expect(fallbackServiceParam(path)).toEqual(expectedService);
      });
    });
  });
});
