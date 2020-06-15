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

const setCookie = ({ name, value, expires = COOKIE_EXPIRY, sameSite }) => {
  const isHttps = window.location.protocol === 'https:';

  // Modern browsers default sameSite value to Lax
  // Setting sameSite='None' allows cookies will be sent in all contexts, i.e sending cross-origin is allowed.
  // Setting sameSite='Strict' allows cookies to only set on first-party context
  const sameSiteSecure = {
    Strict: {
      sameSite: 'Strict',
    },
    None: isHttps && {
      sameSite: 'None',
      secure: true, // When setting sameSite='None', the attribute secure=true must also be passed into the cookie otherwise the cookie will not be set.
    },
  };

  return Cookie.set(name, value, {
    expires,
    domain: getCookieDomain(document.domain),
    ...sameSiteSecure[sameSite],
  });
};

export default setCookie;
