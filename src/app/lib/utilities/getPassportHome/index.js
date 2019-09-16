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
  const overrides = {
    brasil: 'portuguese',
  };

  const isValidOverride = overrides[passportHome] === service;

  return isValidOverride || (passportHome ? passportHome === service : true);
};

export default getPassportHome;
