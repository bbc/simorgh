// eslint-disable-next-line import/named
import { getUrlPath, getQueryString, getParsedQueryString } from '.';

const requestUrl = 'foo/bar';
const queryString = '?param=test&qs=1';
const requestUrlWithQueryString = `${requestUrl}${queryString}`;

describe('getUrlPath', () => {
  it('should return path', () => {
    expect(getUrlPath(requestUrl)).toBe(requestUrl);
  });

  it('should return path when query string exists', () => {
    expect(getUrlPath(requestUrlWithQueryString)).toBe(requestUrl);
  });
});

describe('getQueryString', () => {
  it('should not return query string when none exists ', () => {
    expect(getQueryString(requestUrl)).toBe('');
  });

  it('should return query string when query string exists', () => {
    expect(getQueryString(requestUrlWithQueryString)).toBe(queryString);
  });
});

describe('getParsedQueryString', () => {
  it('should return empty query string object when none exists ', () => {
    expect(getParsedQueryString(requestUrl)).toEqual({});
  });

  it('should return parsed query string object when query string exists', () => {
    const parsedQueryString = {
      param: 'test',
      qs: '1',
    };
    expect(getParsedQueryString(requestUrlWithQueryString)).toEqual(
      parsedQueryString,
    );
  });
});
