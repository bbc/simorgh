const allowList = [
  'www.bbc.com',
  'bbc.com',
  'www.bbc.co.uk',
  'bbc.co.uk',
  'www.bbcrussian.com',
  'bbcrussian.com',
];

const makeRelativeUrlPath = urlPath => {
  if (!urlPath) return null;

  try {
    const url = new URL(urlPath);
    const isBBCDomain = allowList.some(domain => url.hostname === domain);

    if (isBBCDomain) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return urlPath;
  }

  return urlPath;
};

export default makeRelativeUrlPath;
