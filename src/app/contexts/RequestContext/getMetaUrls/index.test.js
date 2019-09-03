import getMetaUrls from '.';

const tests = [
  {
    origin: 'https://www.bbc.co.uk',
    pathname: '/foo/bar',
    expected: {
      canonicalLink: 'https://www.bbc.co.uk/foo/bar',
      ampLink: 'https://www.bbc.co.uk/foo/bar.amp',
      canonicalUkLink: 'https://www.bbc.co.uk/foo/bar',
      ampUkLink: 'https://www.bbc.co.uk/foo/bar.amp',
      canonicalNonUkLink: 'https://www.bbc.com/foo/bar',
      ampNonUkLink: 'https://www.bbc.com/foo/bar.amp',
    },
    assertion: 'should return expected output for .co.uk origin and pathname',
  },
  {
    origin: 'https://www.bbc.com',
    pathname: '/foo/bar',
    expected: {
      canonicalLink: 'https://www.bbc.com/foo/bar',
      ampLink: 'https://www.bbc.com/foo/bar.amp',
      canonicalUkLink: 'https://www.bbc.co.uk/foo/bar',
      ampUkLink: 'https://www.bbc.co.uk/foo/bar.amp',
      canonicalNonUkLink: 'https://www.bbc.com/foo/bar',
      ampNonUkLink: 'https://www.bbc.com/foo/bar.amp',
    },
    assertion: 'should return expected output for .com origin and pathname',
  },
  {
    origin: 'https://www.bbc.com',
    pathname: '/serbian/lat',
    expected: {
      canonicalLink: 'https://www.bbc.com/serbian/lat',
      ampLink: 'https://www.bbc.com/serbian/lat.amp',
      canonicalUkLink: 'https://www.bbc.co.uk/serbian/lat',
      ampUkLink: 'https://www.bbc.co.uk/serbian/lat.amp',
      canonicalNonUkLink: 'https://www.bbc.com/serbian/lat',
      ampNonUkLink: 'https://www.bbc.com/serbian/lat.amp',
    },
    assertion:
      'should return expected output for .com origin and serbian/lat pathname',
  },
];

tests.forEach(({ origin, pathname, expected, assertion }) => {
  it(assertion, () => {
    expect(getMetaUrls(origin, pathname)).toEqual(expected);
  });
});
