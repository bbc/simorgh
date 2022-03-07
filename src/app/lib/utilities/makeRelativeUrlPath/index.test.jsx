import makeRelativeUrlPath from '.';

describe('makeRelativeUrlPath', () => {
  it('should strip the domain if it is a BBC page', () => {
    const url = 'https://www.bbc.com/russian/a-test-12345';
    const relativeUrl = makeRelativeUrlPath(url);
    expect(relativeUrl).toBe('/russian/a-test-12345');
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
