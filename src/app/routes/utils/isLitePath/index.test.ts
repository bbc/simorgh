import isLitePath from '#routes/utils/isLitePath';

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
      expect(isLitePath(path)).toEqual(expectedIsLite);
    });
  });
});
