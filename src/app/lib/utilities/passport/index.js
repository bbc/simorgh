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
  if (!passportHome && !(passportHomesOverride || []).length) return true;

  const passportHomeLower = (passportHome || '').toLowerCase();

  return (
    passportHomeLower === service ||
    (passportHomesOverride || []).some(
      home => (home || '').toLowerCase() === passportHomeLower,
    )
  );
};
