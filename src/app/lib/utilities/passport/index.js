import pathOr from 'ramda/src/pathOr';

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
