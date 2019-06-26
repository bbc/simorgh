import deepGet from '../deepGet';

const getPassportHome = pageData => {
  const homeServiceUrl = deepGet(['metadata', 'passport', 'home'], pageData);
  return pageData && homeServiceUrl
    ? homeServiceUrl
        .split('/')
        .slice(-1)
        .pop()
        .toLowerCase()
    : null;
};

export default getPassportHome;
