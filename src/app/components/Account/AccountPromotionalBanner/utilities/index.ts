import setCookie from '#app/lib/utilities/setCookie';

export const ACCOUNT_BANNER_DISMISS_COOKIE = 'accountPromoDismissals';
export const ACCOUNT_BANNER_LAST_DISMISS_COOKIE = 'accountPromoLastDismissed';
export const ACCOUNT_BANNER_MAX_DISMISSALS = 3;
export const ACCOUNT_BANNER_DISMISS_INTERVAL_MS = 10 * 24 * 60 * 60 * 1000; // 10 days

const getCookieValue = (cookieString: string, name: string): string | null => {
  if (!cookieString) return null;
  const match = cookieString
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
};

const parseIntOrZero = (value: string | null) =>
  parseInt(value ?? '0', 10) || 0;

/**
 * Determines whether the account promotional banner should be visible based on the
 * dismissal cookies in the provided cookie string.
 *
 * Designed to run on both the server (pass `req.headers.cookie`) and the client
 * (pass `document.cookie`), so that SSR output matches the post-hydration render
 * and avoids a layout shift.
 */
export const isAccountPromoBannerVisible = (cookieHeader = ''): boolean => {
  const dismissals = parseIntOrZero(
    getCookieValue(cookieHeader, ACCOUNT_BANNER_DISMISS_COOKIE),
  );
  const lastDismissed = parseIntOrZero(
    getCookieValue(cookieHeader, ACCOUNT_BANNER_LAST_DISMISS_COOKIE),
  );

  if (dismissals >= ACCOUNT_BANNER_MAX_DISMISSALS) return false;
  if (
    lastDismissed &&
    Date.now() - lastDismissed < ACCOUNT_BANNER_DISMISS_INTERVAL_MS
  ) {
    return false;
  }
  return true;
};

export const setAccountPromoBannerDismissed = () => {
  if (typeof document === 'undefined') return;

  const dismissals =
    parseIntOrZero(
      getCookieValue(document.cookie, ACCOUNT_BANNER_DISMISS_COOKIE),
    ) + 1;

  setCookie({
    name: ACCOUNT_BANNER_DISMISS_COOKIE,
    value: String(dismissals),
  });
  setCookie({
    name: ACCOUNT_BANNER_LAST_DISMISS_COOKIE,
    value: String(Date.now()),
  });
};
