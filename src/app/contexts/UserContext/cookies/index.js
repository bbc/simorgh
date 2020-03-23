import Cookie from 'js-cookie';
import { getVariantCookieName } from '#lib/utilities/variantHandler';
import setCookie from '#lib/utilities/setCookie';

export const getCookiePolicy = () => {
  const POLICY_COOKIE = 'ckns_policy';

  return Cookie.get(POLICY_COOKIE) || '000';
};

export const personalisationEnabled = (cookiePolicy) =>
  cookiePolicy && cookiePolicy.length === 3 && cookiePolicy[2] === '1';

export const getPreferredVariant = (service) => {
  if (!service) return null;
  const VARIANT_COOKIE = `ckps_${getVariantCookieName(service)}`;

  return Cookie.get(VARIANT_COOKIE);
};

export const setPreferredVariantCookie = (service, variant) => {
  if (!service || !variant || !personalisationEnabled(getCookiePolicy())) {
    return;
  }

  const variantCookieName = `ckps_${getVariantCookieName(service)}`;
  const COOKIE_EXPIRY = 7;
  setCookie(variantCookieName, variant, COOKIE_EXPIRY);
};
