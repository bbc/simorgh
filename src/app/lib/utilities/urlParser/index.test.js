// eslint-disable-next-line import/named
import { getUrlPath, getQueryString, getQueryParams } from '.';

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

describe('getQueryParams', () => {
  it('should return empty query string object from url when no query string exists ', () => {
    expect(getQueryParams(url)).toEqual({});
  });
  it('should return empty query string object from partial url when no query string exists ', () => {
    expect(getQueryParams(partialRequestUrl)).toEqual({});
  });

  describe('parsed query string object', () => {
    const parsedQueryString = {
      param: 'test',
      qs: '1',
    };

    it('should be returned from url when query string exists', () => {
      expect(getQueryParams(urlWithQueryString)).toEqual(parsedQueryString);
    });
    it('should be returned from partial url when query string exists', () => {
      expect(getQueryParams(partialRequestUrlWithQueryString)).toEqual(
        parsedQueryString,
      );
    });
  });
});
