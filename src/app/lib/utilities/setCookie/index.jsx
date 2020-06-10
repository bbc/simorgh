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
  const isHttps = document.location.protocol === 'https:';

  // Only set sameSite=None when protocol https
  const sameSiteAttribute = isHttps ? 'None' : 'Lax';

  return Cookie.set(name, value, {
    expires,
    domain: getCookieDomain(document.domain),
    sameSite: sameSiteAttribute,
    secure: isHttps,
  });
};

export default setCookie;
