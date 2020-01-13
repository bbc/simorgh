import Url from 'url-parse';

// Returns the path, excluding any query string params
export const getUrlPath = url => {
  return new Url(url).pathname;
};

// Returns the query string
export const getQueryString = url => {
  return new Url(url).query;
};
