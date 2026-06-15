import { useState, useEffect } from 'react';
import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import onClient from '#app/lib/utilities/onClient';
import { getReferrer } from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes';
import {
  MOBILE_COMPONENT_ORDER,
  OJComponentKey,
  ReferrerType,
} from './mobileReferrerComponentOrder';

const useMobileReferrerOrder = (): OJComponentKey[] | null => {
  const [order, setOrder] = useState<OJComponentKey[] | null>(null);

  useEffect(() => {
    if (!onClient()) return undefined;

    const mediaQuery = window.matchMedia(
      `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
    );
    const referrer = (getReferrer() ?? 'direct') as ReferrerType;
    const mobileOrder =
      MOBILE_COMPONENT_ORDER[referrer] ?? MOBILE_COMPONENT_ORDER.direct;

    const updateOrder = () => {
      setOrder(mediaQuery.matches ? mobileOrder : null);
    };

    updateOrder();
    mediaQuery.addEventListener('change', updateOrder);

    return () => mediaQuery.removeEventListener('change', updateOrder);
  }, []);

  return order;
};

export default useMobileReferrerOrder;
