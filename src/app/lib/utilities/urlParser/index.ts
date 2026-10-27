const BASE = 'https://www.bbc.com';

// Returns the path, excluding any query string params
export const getUrlPath = (url: string) => {
  return new URL(url, BASE).pathname;
};

// Returns the query string
export const getQueryString = (url: string) => {
  return new URL(url, BASE).search;
};
