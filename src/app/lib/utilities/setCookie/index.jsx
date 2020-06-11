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
  const isHttps = window.location.protocol === 'https:';

  const sameSiteSecure = {
    sameSite: 'None',
    secure: true,
  };

  return Cookie.set(name, value, {
    expires,
    domain: getCookieDomain(document.domain),
    ...(isHttps && sameSiteSecure),
  });
};

export default setCookie;
