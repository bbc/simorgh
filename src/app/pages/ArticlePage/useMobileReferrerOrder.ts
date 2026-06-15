import { useState, useEffect } from 'react';
import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import onClient from '#app/lib/utilities/onClient';
import { getReferrer } from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes';
import {
  MOBILE_COMPONENT_ORDER,
  OJComponentKey,
  ReferrerType,
} from './mobileReferrerComponentOrder';

const getDebugReferrer = (): ReferrerType | null => {
  const params = new URLSearchParams(window.location.search);
  const debugParam = params.get('debugReferrer');
  if (
    debugParam === 'direct'
    || debugParam === 'search'
    || debugParam === 'social'
  ) {
    return debugParam;
  }
  return null;
};

const useMobileReferrerOrder = (): OJComponentKey[] | null => {
  const [order, setOrder] = useState<OJComponentKey[] | null>(null);

  useEffect(() => {
    if (!onClient()) return undefined;

    const mediaQuery = window.matchMedia(
      `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
    );
    const debugReferrer = getDebugReferrer();
    const referrer = (debugReferrer ?? getReferrer() ?? 'direct') as ReferrerType;
    const mobileOrder =
      MOBILE_COMPONENT_ORDER[referrer] ?? MOBILE_COMPONENT_ORDER.direct;

    const updateOrder = (matches: boolean) => {
      setOrder(matches ? mobileOrder : null);
    };

    // Initial check
    updateOrder(mediaQuery.matches);

    // Listen for changes and use the event's matches value
    const handleChange = (event: MediaQueryListEvent) => {
      updateOrder(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return order;
};

export default useMobileReferrerOrder;
