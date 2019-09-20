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

  return (
    (passportHome || '').toLowerCase() === (service || '').toLowerCase() ||
    (passportHomesOverride || []).some(
      home => (home || '').toLowerCase() === (passportHome || '').toLowerCase(),
    )
  );
};
