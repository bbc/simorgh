import Cookie from 'js-cookie';

const COOKIE_EXPIRY = 365;

export const getCookieDomain = domain => {
  const domainParts = domain.split('.');
  const isBBCDomain = domainParts.includes('bbc');

  if (isBBCDomain) {
    const indexOfBBCDomainName = domainParts.indexOf('bbc');
    return `.${domainParts.slice(indexOfBBCDomainName).join('.')}`;
  }
  return domain;
};

const setCookie = (name, value, expires = COOKIE_EXPIRY) => {
  // const isHttps = document.location.protocol === 'https:';

  return Cookie.set(name, value, {
    expires,
    domain: getCookieDomain(document.domain),
    sameSite: 'None',
    secure: false,
  });
};

export default setCookie;
