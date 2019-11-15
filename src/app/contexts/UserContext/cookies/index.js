import Cookie from 'js-cookie';

export const getCookiePolicy = () => {
  const POLICY_COOKIE = 'ckns_policy';

  return Cookie.get(POLICY_COOKIE) || '000';
};

export const getPreferredVariant = service => {
  if (!service) return null;
  const VARIANT_COOKIE = `ckps_${service}`;

  return Cookie.get(VARIANT_COOKIE);
};

export const personalisationEnabled = cookiePolicy =>
  cookiePolicy && cookiePolicy.length === 3 && cookiePolicy[2] === '1';
