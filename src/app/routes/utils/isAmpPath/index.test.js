import isAmpPath from '#app/routes/utils/isAmpPath';

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
      expect(isAmpPath(path)).toEqual(expectedIsAmp);
    });
  });
});
