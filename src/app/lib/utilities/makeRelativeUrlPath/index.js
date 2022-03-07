const allowList = ['bbc.com', 'bbc.co.uk', 'bbcrussian.com'];

const makeRelativeUrlPath = urlPath => {
  if (!urlPath) {
    return null;
  }
  const isBBCDomain = allowList.some(domain => urlPath.includes(domain));
  if (isBBCDomain) {
    const relativeUrl = urlPath.replace(/^.*\/\/[^/]+/, '');
    return relativeUrl.length === 0 ? '/' : relativeUrl;
  }
  return urlPath;
};

export default makeRelativeUrlPath;
