import Cookie from 'js-cookie';
import setCookie from '#app/lib/utilities/setCookie';
import getUUID from '#app/lib/utilities/getUUID';

export const CKNS_MVT_COOKIE_NAME = 'ckns_mvt';

// Returns the ckns_mvt (Optimizely user ID) cookie value, creating it first if it doesn't exist.
// The value is read back after writing so null is returned when the browser blocks cookies,
// rather than an ID that won't persist.
const getOrCreateCknsMvtCookie = (): string | null => {
  const existingValue = Cookie.get(CKNS_MVT_COOKIE_NAME);

  if (existingValue) return existingValue;

  setCookie({ name: CKNS_MVT_COOKIE_NAME, value: getUUID() });

  return Cookie.get(CKNS_MVT_COOKIE_NAME) ?? null;
};

export default getOrCreateCknsMvtCookie;
