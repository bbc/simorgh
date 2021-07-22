const cookieOvenDomainBase = origin => {
  if (origin.includes('localhost')) {
    return origin;
  }

  if (origin.includes('.stage.') || origin.includes('.test.')) {
    return 'https://www.test.bbc';
  }

  return 'https://www.bbc';
};

const domainExtension = (origin, opposite) => {
  if (origin.includes('localhost')) {
    return '';
  }

  if (origin.includes('.com')) {
    if (opposite) {
      return '.co.uk';
    }
    return '.com';
  }

  if (opposite) {
    return '.com';
  }
  return '.co.uk';
};

const cookieOvenUrl = (origin, opposite) =>
  cookieOvenDomainBase(origin) + domainExtension(origin, opposite);

export default cookieOvenUrl;
