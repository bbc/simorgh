import Cookie from 'js-cookie';

const COOKIE_EXPIRY = 365;

const removeDomainRestrictions = domain => {
  const domainParts = domain.split('.');
  const isBBCDomain = domainParts.includes('bbc');

  if (isBBCDomain) {
    const indexOfBBCDomainName = domainParts.indexOf('bbc');
    return `.${domainParts.slice(indexOfBBCDomainName).join('.')}`;
  }
  return domain;
};

const setCookie = (name, value) =>
  Cookie.set(name, value, {
    expires: COOKIE_EXPIRY,
    domain: removeDomainRestrictions(document.domain),
  });

export default setCookie;
