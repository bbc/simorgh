// Returns the path, excluding any query string params
export const getUrlPath = url => {
  return new URL(url, 'https://www.bbc.com').pathname;
};

// Returns the query string
export const getQueryString = url => {
  return new URL(url, 'https://www.bbc.com').search;
};
