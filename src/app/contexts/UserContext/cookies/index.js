import Cookie from 'js-cookie';

export const getCookiePolicy = () => {
  const POLICY_COOKIE = 'ckns_policy';

  return Cookie.get(POLICY_COOKIE) || '000';
};

export const getPreferredVariantCookieName = service => `ckps_${service}`;

export const getPreferredVariantCookie = service => {
  if (!service) return null;

  const cookie = getPreferredVariantCookieName(service);
  return Cookie.get(cookie);
};

export const setPreferredVariantCookie = (service, variant) => {
  if (!service || !variant) return;

  const cookie = getPreferredVariantCookieName(service);
  Cookie.set(cookie, variant);
};

export const personalisationEnabled = cookiePolicy =>
  cookiePolicy && cookiePolicy.length === 3 && cookiePolicy[2] === '1';
