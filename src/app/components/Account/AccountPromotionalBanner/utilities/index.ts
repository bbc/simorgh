const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const ACCOUNT_BANNER_DISMISS_KEY =
  'account_promotional_banner_dismissals';
export const ACCOUNT_BANNER_LAST_DISMISS_KEY =
  'account_promotional_banner_last_dismissed';
export const ACCOUNT_BANNER_MAX_DISMISSALS = 3;
export const ACCOUNT_BANNER_DISMISS_INTERVAL_MS = 10 * ONE_DAY_IN_MS;
export const DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS =
  'display-account-promotional-banner';

export const isAccountPromoBannerVisible = ({
  cookies,
  dismissalCount,
  lastDismissed,
}: {
  cookies: string;
  dismissalCount: string | null;
  lastDismissed: string | null;
}): boolean => {
  if (cookies.split(';').some(item => item.trim().startsWith('ckns_id='))) {
    return false;
  }

  const count = Number(dismissalCount);
  const effectiveCount = Number.isNaN(count) ? 0 : count;

  if (effectiveCount >= ACCOUNT_BANNER_MAX_DISMISSALS) {
    return false;
  }

  const lastDismissedMs = Number(lastDismissed);
  if (
    lastDismissedMs &&
    Date.now() - lastDismissedMs < ACCOUNT_BANNER_DISMISS_INTERVAL_MS
  ) {
    return false;
  }

  return true;
};

export const setAccountPromoBannerDismissed = (): void => {
  const stored = localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY);
  const count = Number(stored);
  const effectiveCount = Number.isNaN(count) ? 0 : count;
  localStorage.setItem(ACCOUNT_BANNER_DISMISS_KEY, String(effectiveCount + 1));
  localStorage.setItem(ACCOUNT_BANNER_LAST_DISMISS_KEY, String(Date.now()));
};

export const buildAccountBannerClientScript = (): string => `(() => {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('ckns_id='))) {
    return;
  }

  function localStorageIsAvailable() {
    try {
      var storage = window && window.localStorage;
      if (typeof storage.getItem === 'function') {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  if (localStorageIsAvailable()) {
    var dismissCount = Number(window.localStorage.getItem('${ACCOUNT_BANNER_DISMISS_KEY}'));
    if (dismissCount >= ${ACCOUNT_BANNER_MAX_DISMISSALS}) {
      return;
    }

    var lastDismissedDate = Number(window.localStorage.getItem('${ACCOUNT_BANNER_LAST_DISMISS_KEY}'));
    if (lastDismissedDate && Date.now() - lastDismissedDate < ${ACCOUNT_BANNER_DISMISS_INTERVAL_MS}) {
      return;
    }
  }

  document.querySelector('html').classList.add('${DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS}');
})()`;
