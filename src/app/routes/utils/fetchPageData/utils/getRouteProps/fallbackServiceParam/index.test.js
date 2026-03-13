import fallbackServiceParam from '.';

describe('fallbackServiceParam', () => {
  [
    {
      description:
        'should return service name if matches known service in first path part',
      path: '/pidgin/foobar',
      expectedService: 'pidgin',
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
      path: '/foobar/pidgin',
      expectedService: 'news',
    },
  ].forEach(({ description, path, expectedService }) => {
    it(description, () => {
      expect(fallbackServiceParam(path)).toEqual(expectedService);
    });
  });
});
