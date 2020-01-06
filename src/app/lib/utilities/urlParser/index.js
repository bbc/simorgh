import Url from 'url-parse';

// Returns the path, excluding any query string params
export const getUrlPath = url => {
  return new Url(url).pathname;
};

// Returns the query string
export const getQueryString = url => {
  return new Url(url).query;
};

/* Returns a parsed object containing the query string
 * e.g. for query string ?foo=bar&x=y, the resulting object is
 * {
 *   foo: 'bar',
 *   x:'y'
 * }
 */
export const getQueryParams = url => {
  return new Url(url, true).query;
};
