import isLowPath from '#app/routes/utils/isLowPath';

describe('isLowPath', () => {
  [
    {
      description: 'should return false if path ends in ".amp"',
      path: '/news/foobar.amp',
      expectedIsLow: false,
    },
    {
      description: 'should return true if path ends in ".low"',
      path: '/news/foobar.low',
      expectedIsLow: true,
    },
    {
      description:
        'should return false if path contains ".low" but doesnt end in it',
      path: '/news/foobar.lowfoo',
      expectedIsAmp: false,
    },
    {
      description:
        'should return true when path ends with .low and has renderer_env override specified',
      path: '/news/foobar.low?renderer_env=live',
      expectedIsAmp: true,
    },
    {
      description:
        'should return true when path ends with .low and has any get params specified',
      path: '/news/foobar.low?blah=1',
      expectedIsAmp: true,
    },
    {
      description: 'should return false if path ends in just "low"',
      path: '/news/foobar/low',
      expectedIsAmp: false,
    },
  ].forEach(({ description, path, expectedIsLow }) => {
    it(description, () => {
      expect(isLowPath(path)).toEqual(expectedIsLow);
    });
  });
});
