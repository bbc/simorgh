import pathOr from 'ramda/src/pathOr';

export const getPassportHome = pageData => {
  const homeServiceUrl = pathOr(
    null,
    ['metadata', 'passport', 'home'],
    pageData,
  );
  return pageData && homeServiceUrl
    ? homeServiceUrl
        .split('/')
        .slice(-1)
        .pop()
        .toLowerCase()
    : null;
};

export const isValidPassportHome = (
  passportHome,
  service,
  passportHomesOverride = [],
) => {
  const passportHomesOverrideArray = passportHomesOverride || [];
  const passportHomeLower = (passportHome || '').toLowerCase();

  if (!passportHome) return true;

  return (
    passportHomeLower === service ||
    passportHomesOverrideArray.some(
      home => (home || '').toLowerCase() === passportHomeLower,
    )
  );
};
