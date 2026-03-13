import getPathExtension from '.';

describe('getPathExtension', () => {
  describe('isLitePath', () => {
    [
      {
        description: 'should return true if path ends in ".lite"',
        path: '/news/foobar.lite',
        expectedIsLite: true,
      },
      {
        description:
          'should return false if path contains ".lite" but does not end in it',
        path: '/news/foobar.litefoo',
        expectedIsLite: false,
      },
      {
        description:
          'should return false if path only contains ".lite" as part of the trailing text',
        path: '/news/foobar.foolitebar',
        expectedIsLite: false,
      },
      {
        description:
          'should return true when path ends with .lite and has renderer_env override specified',
        path: '/news/foobar.lite?renderer_env=live',
        expectedIsLite: true,
      },
      {
        description:
          'should return true when path ends with .lite and has any query params specified',
        path: '/news/foobar.lite?blah=1',
        expectedIsLite: true,
      },
      {
        description: 'should return false if path ends in just "lite"',
        path: '/news/foobar/lite',
        expectedIsLite: false,
      },
    ].forEach(({ description, path, expectedIsLite }) => {
      it(description, () => {
        expect(getPathExtension(path).isLite).toEqual(expectedIsLite);
      });
    });
  });

  describe('isAppPath', () => {
    [
      {
        description: 'should return true if path ends in ".app"',
        path: '/news/foobar.app',
        expectedIsApp: true,
      },
      {
        description:
          'should return false if path contains ".app" but does not end in it',
        path: '/news/foobar.appfoo',
        expectedIsApp: false,
      },
      {
        description:
          'should return false if path only contains ".app" as part of the trailing text',
        path: '/news/foobar.fooappbar',
        expectedIsApp: false,
      },
      {
        description:
          'should return true when path ends with .app and has renderer_env override specified',
        path: '/news/foobar.app?renderer_env=live',
        expectedIsApp: true,
      },
      {
        description:
          'should return true when path ends with .app and has any query params specified',
        path: '/news/foobar.app?blah=1',
        expectedIsApp: true,
      },
      {
        description: 'should return false if path ends in just "app"',
        path: '/news/foobar/app',
        expectedIsApp: false,
      },
    ].forEach(({ description, path, expectedIsApp }) => {
      it(description, () => {
        expect(getPathExtension(path).isApp).toEqual(expectedIsApp);
      });
    });
  });

  describe('isAmpPath', () => {
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
        description:
          'should return true when path ends with .amp and has renderer_env override specified',
        path: '/news/foobar.amp?renderer_env=live',
        expectedIsAmp: true,
      },
      {
        description:
          'should return true when path ends with .amp and has any get params specified',
        path: '/news/foobar.amp?blah=1',
        expectedIsAmp: true,
      },
      {
        description: 'should return false if path ends in just "amp"',
        path: '/news/foobar/amp',
        expectedIsAmp: false,
      },
    ].forEach(({ description, path, expectedIsAmp }) => {
      it(description, () => {
        expect(getPathExtension(path).isAmp).toEqual(expectedIsAmp);
      });
    });
  });
});
