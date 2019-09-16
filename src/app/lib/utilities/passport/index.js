import pathOr from 'ramda/src/pathOr';

export const getPassportHome = pageData => {
  const homeServiceUrl = pathOr(
    null,
    ['metadata', 'passport', 'home'],
    pageData,
  );
  const passportHomeOverride = pathOr(
    null,
    ['metadata', 'passportHome'],
    pageData,
  );
  return (
    passportHomeOverride ||
    (pageData && homeServiceUrl
      ? homeServiceUrl
          .split('/')
          .slice(-1)
          .pop()
          .toLowerCase()
      : null)
  );
};

export const isValidPassportHome = (passportHome, service) => {
  if (!passportHome) return true;

  const overrides = {
    portuguese: ['brasil'],
  };

  if (overrides[service]) {
    return overrides[service].includes(passportHome);
  }

  return passportHome === service;
};
