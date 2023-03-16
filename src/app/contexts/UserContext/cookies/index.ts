import Cookie from 'js-cookie';
import { getVariantCookieName } from '#lib/utilities/variantHandler';
import setCookie from '#lib/utilities/setCookie';
import { Services, Variants } from '#app/models/types/global';

export const getCookiePolicy = () => {
  const POLICY_COOKIE = 'ckns_policy';

  return Cookie.get(POLICY_COOKIE) || '000';
};

export const personalisationEnabled = (cookiePolicy: string) =>
  !!(cookiePolicy && cookiePolicy.length === 3 && cookiePolicy[2] === '1');

export const getPreferredVariant = (service: Services) => {
  if (!service) return null;
  const VARIANT_COOKIE = `ckps_${getVariantCookieName(service)}`;

  return Cookie.get(VARIANT_COOKIE);
};

export const setPreferredVariantCookie = (
  service: Services,
  variant: Variants,
) => {
  if (!service || !variant || !personalisationEnabled(getCookiePolicy())) {
    return;
  }

  const variantCookieName = `ckps_${getVariantCookieName(service)}`;
  const COOKIE_EXPIRY = 7;

  // Setting variant cookie to have sameSite=Lax because the purpose of this
  // cookie is to only be used in a first-party context and make sure the page
  // is rendered correctly on initial load when arrived from external source.
  setCookie({
    name: variantCookieName,
    value: variant,
    expires: COOKIE_EXPIRY,
    sameSite: 'Lax',
  });
};
