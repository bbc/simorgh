const allowList = ['www.bbc.com', 'www.bbc.co.uk', 'www.bbcrussian.com'];

const makeRelativeUrlPath = urlPath => {
  if (!urlPath) return null;

  const url = new URL(urlPath);
  const isBBCDomain = allowList.some(domain => url.hostname === domain);

  if (isBBCDomain) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return urlPath;
};

export default makeRelativeUrlPath;
