import { useEffect } from 'react';

const OFFLINE_VISIT_FLAG = 'offline_page_visit';

/**
 * Sets a flag in localStorage when user visits the offline page.
 * Note: Offline page is only accessible in PWA mode (via service worker),
 * so no need to check isPWA - if this hook runs, we're already in PWA.
 */
const useOfflinePageFlag = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Adding console logs to help debug event tracking issues - will remove later
    // eslint-disable-next-line no-console
    console.log('useOfflinePageFlag: Setting offline page visit flag.');
    try {
      localStorage.setItem(OFFLINE_VISIT_FLAG, 'true');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('useOfflinePageFlag', error);
    }
  }, []);
};

export { useOfflinePageFlag, OFFLINE_VISIT_FLAG };
