import isAppPath from '#routes/utils/isAppPath';

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
      expect(isAppPath(path)).toEqual(expectedIsApp);
    });
  });
});
