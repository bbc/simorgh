import Cookie from 'js-cookie';

const COOKIE_EXPIRY = 365;
const SAMESITE_DEFAULT = 'Lax';

export const getCookieDomain = domain => {
  const domainParts = domain.split('.');
  const isBBCDomain = domainParts.includes('bbc');

  if (isBBCDomain) {
    const indexOfBBCDomainName = domainParts.indexOf('bbc');
    return `.${domainParts.slice(indexOfBBCDomainName).join('.')}`;
  }
  return domain;
};

const setCookie = ({
  name,
  value,
  expires = COOKIE_EXPIRY,
  sameSite = SAMESITE_DEFAULT,
}) => {
  const isHttps = window.location.protocol === 'https:';

  // Modern browsers default sameSite value to Lax
  // Setting sameSite='None' allows cookies will be sent in all contexts, i.e sending cross-origin is allowed.
  // Setting sameSite='Strict' allows cookies to only set in first-party context
  const sameSiteValues = {
    Lax: 'Lax',
    Strict: 'Strict',
    None: isHttps ? 'None' : undefined, // SameSite=None can only be added to cookie when the page is https
  };

  return Cookie.set(name, value, {
    expires,
    domain: getCookieDomain(window.location.hostname),
    sameSite: sameSiteValues[sameSite],
    ...(isHttps && { secure: true }),
  });
};

export default setCookie;
