import Cookie from 'js-cookie';

export const getCookiePolicy = () => {
  const POLICY_COOKIE = 'ckns_policy';

  return Cookie.get(POLICY_COOKIE) || '000';
};

export const getPreferredVariantCookie = service => `ckps_${service}`;

export const getPreferredVariant = service => {
  if (!service) return null;

  const cookie = getPreferredVariantCookie(service);
  return Cookie.get(cookie);
};

export const setPreferredVariant = (service, variant) => {
  if (!service || !variant) return;

  const cookie = getPreferredVariantCookie(service);
  Cookie.set(cookie, variant);
};

export const personalisationEnabled = cookiePolicy =>
  cookiePolicy && cookiePolicy.length === 3 && cookiePolicy[2] === '1';
