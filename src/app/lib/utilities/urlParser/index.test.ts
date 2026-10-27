// eslint-disable-next-line import/named
import { getUrlPath, getQueryString } from '.';

const queryString = '?param=test&qs=1';
const partialRequestUrl = 'foo/bar';
const partialRequestUrlWithQueryString = `${partialRequestUrl}${queryString}`;
const url = `https://www.test.com/${partialRequestUrl}`;
const urlWithQueryString = `${url}${queryString}`;

describe('getUrlPath', () => {
  it('should return path from url', () => {
    expect(getUrlPath(url)).toBe(`/${partialRequestUrl}`);
  });
  it('should return path from partial url', () => {
    expect(getUrlPath(partialRequestUrl)).toBe(`/${partialRequestUrl}`);
  });

  it('should return path from url when query string exists', () => {
    expect(getUrlPath(urlWithQueryString)).toBe(`/${partialRequestUrl}`);
  });
  it('should return path from partial url when query string exists', () => {
    expect(getUrlPath(partialRequestUrlWithQueryString)).toBe(
      `/${partialRequestUrl}`,
    );
  });
});

describe('getQueryString', () => {
  it('should not return query string from url when no query string exists ', () => {
    expect(getQueryString(url)).toBe('');
  });
  it('should not return query string from partial url when no query string exists ', () => {
    expect(getQueryString(partialRequestUrl)).toBe('');
  });

  it('should return query string from url when query string exists', () => {
    expect(getQueryString(urlWithQueryString)).toBe(queryString);
  });
  it('should return query string from partial url when query string exists', () => {
    expect(getQueryString(partialRequestUrlWithQueryString)).toBe(queryString);
  });
});
