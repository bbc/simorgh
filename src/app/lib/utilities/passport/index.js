import { pathOr } from 'rambda';

export const getPassportHome = pageData => {
  const homeServiceUrl = pathOr(
    null,
    ['metadata', 'passport', 'home'],
    pageData,
  );
  return pageData && homeServiceUrl
    ? homeServiceUrl.split('/').pop().toLowerCase()
    : null;
};

export const isValidPassportHome = (
  passportHome,
  service,
  passportHomesOverride = [],
) => {
  const isMissingRequiredArgs = !passportHome;
  if (isMissingRequiredArgs) return true;

  const matchesPassportHome = home =>
    (home || '').toLowerCase() === passportHome.toLowerCase();

  if (matchesPassportHome(service)) return true;

  const passportHomesOverrideArray = passportHomesOverride || [];

  return passportHomesOverrideArray.some(matchesPassportHome);
};

export const getCanonicalUrl = pageData => {
  const canonicalUrl = pathOr(
    null,
    ['metadata', 'locators', 'canonicalUrl'],
    pageData,
  );
  return canonicalUrl
    ? canonicalUrl.replace(/.*(bbc\.com|bbc\.co\.uk|localhost:\d*)/, '')
    : null;
};

export const matchesCanonicalUrl = (canonicalUrl, pathName) => {
  const strippedPathName = pathName ? pathName.replace(/(\.|\?).*/g, '') : null;
  return canonicalUrl === strippedPathName;
};
