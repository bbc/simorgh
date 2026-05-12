import { use, useMemo } from 'react';
import Cookie from 'js-cookie';
import { AccountContext } from '#app/contexts/AccountContext';
import onClient from '#lib/utilities/onClient';

interface UserTrackingData {
  isSignedIn: boolean;
  hashedId: string | null;
}

/**
 * Hook to get user tracking data (signed-in state and hashed ID)
 * for use in analytics events.
 *
 * Returns:
 * - isSignedIn: boolean (from cookie or AccountContext)
 * - hashedId: hashed user ID from ckns_sylphid cookie, or null if not present
 */
const useUserTrackingData = (): UserTrackingData => {
  const { isSignedIn: isSignedInFromContext } = use(AccountContext);

  const trackingData = useMemo(() => {
    let isSignedIn = !!isSignedInFromContext;
    let hashedId: string | null = null;

    if (onClient()) {
      const userCookie = Cookie.get('ckns_id');
      const userIdCookie = Cookie.get('ckns_sylphid');

      if (userCookie) {
        isSignedIn = true;
        hashedId = userIdCookie || null;
      }
    }

    return {
      isSignedIn,
      hashedId,
    };
  }, [isSignedInFromContext]);

  return trackingData;
};

export default useUserTrackingData;
export type { UserTrackingData };
