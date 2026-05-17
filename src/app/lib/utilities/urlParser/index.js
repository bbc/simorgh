const parseUrl = url => {
  try {
    return new URL(url);
  } catch {
    return new URL(url, 'https://www.bbc.com');
  }
};

// Returns the path, excluding any query string params
export const getUrlPath = url => {
  return parseUrl(url).pathname;
};

// Returns the query string
export const getQueryString = url => {
  return parseUrl(url).search;
};
