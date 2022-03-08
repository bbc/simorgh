import makeRelativeUrlPath from '.';

describe('makeRelativeUrlPath', () => {
  it('should strip the domain if it is a BBC page', () => {
    const url = 'https://www.bbc.com/russian/a-test-12345';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/russian/a-test-12345');
  });

  it('should return "/" if just a valid BBC domain is given', () => {
    const url = 'https://www.bbc.com/';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/');
  });

  it('should return search params if supplied in the URL', () => {
    const url = 'https://www.bbc.com?limit=4';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/?limit=4');
  });

  it('should return hash params if supplied in the URL', () => {
    const url = 'https://www.bbc.com#content';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/#content');
  });

  it('should return search and hash params if supplied in the URL', () => {
    const url = 'https://www.bbc.com?limit=4#content';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/?limit=4#content');
  });

  it('should not strip the domain if it is an external link', () => {
    const url = 'https://www.facebook.com/not-the-bbc';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe(url);
  });

  it('should return null if urlPath is null', () => {
    const url = null;
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe(url);
  });
});
