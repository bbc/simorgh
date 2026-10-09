import { useEffect, useState } from 'react';
import {
  ACCOUNT_BANNER_DISMISS_KEY,
  ACCOUNT_BANNER_LAST_DISMISS_KEY,
  isAccountPromoBannerVisible,
} from '../utilities';

// Client-side mirror of the inline script's visibility logic: has the banner been
// dismissed enough times / recently enough to be suppressed? Returns false until
// the check has run on the client, because localStorage and cookies are not
// available during server rendering. Used to gate the control arm's view event so
// it only fires for users who would actually be shown the banner — matching the
// suppression the "on" arm gets from the inline script.
const useIsAccountPromoBannerVisible = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let dismissalCount: string | null = null;
    let lastDismissed: string | null = null;

    try {
      dismissalCount = window.localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY);
      lastDismissed = window.localStorage.getItem(
        ACCOUNT_BANNER_LAST_DISMISS_KEY,
      );
    } catch {
      // localStorage unavailable (e.g. privacy mode); treat as no prior dismissals
    }

    setIsVisible(
      isAccountPromoBannerVisible({
        cookies: document.cookie,
        dismissalCount,
        lastDismissed,
      }),
    );
  }, []);

  return isVisible;
};

export default useIsAccountPromoBannerVisible;
