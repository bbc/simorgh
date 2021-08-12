const getCookieOvenDomainBase = origin => {
  if (origin.includes('localhost')) {
    return origin;
  }

  if (origin.includes('.stage.') || origin.includes('.test.')) {
    return 'https://www.test.bbc';
  }

  return 'https://www.bbc';
};

const getDomainExtension = (origin, options = { switchDomain: false }) => {
  const DOT_COM = '.com';
  const DOT_CO_DOT_UK = '.co.uk';
  const { switchDomain } = options;

  if (origin.includes('localhost')) {
    return '';
  }

  if (origin.includes(DOT_COM)) {
    return switchDomain ? DOT_CO_DOT_UK : DOT_COM;
  }

  return switchDomain ? DOT_COM : DOT_CO_DOT_UK;
};

const getCookieOvenUrl = (origin, switchDomain) => {
  const cookieOvenDomainBase = getCookieOvenDomainBase(origin);
  const domainExtension = getDomainExtension(origin, switchDomain);

  return `${cookieOvenDomainBase}${domainExtension}`;
};

export default getCookieOvenUrl;
