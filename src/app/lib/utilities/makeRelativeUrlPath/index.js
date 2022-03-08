const allowList = ['bbc.com', 'bbc.co.uk', 'bbcrussian.com'];

const makeRelativeUrlPath = urlPath => {
  if (!urlPath) return null;

  const isBBCDomain = allowList.some(domain => urlPath.includes(domain));

  if (isBBCDomain) {
    const url = new URL(urlPath);
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return urlPath;
};

export default makeRelativeUrlPath;
