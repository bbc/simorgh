const cookieOvenDomainBase = (origin) => {
  if (origin.includes('localhost')) {
    return origin;
  }

  if (origin.includes('.stage.') || origin.includes('.test.')) {
    return 'https://cookie-oven.test.api.bbc';
  }

  return 'https://cookie-oven.api.bbc';
};

const domainExtension = (origin) => {
  if (origin.includes('localhost')) {
    return '';
  }

  if (origin.includes('.com')) {
    return '.co.uk';
  }

  return '.com';
};

const cookieOvenUrl = (origin) =>
  cookieOvenDomainBase(origin) + domainExtension(origin);

export default cookieOvenUrl;
