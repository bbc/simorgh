import { useEffect, useState } from 'react';
import onClient from '#app/lib/utilities/onClient';
import { GROUP_3_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import {
  OJComponentKey,
  SEARCH_COMPONENT_ORDER,
  SearchVariant,
} from './searchReferrerComponentOrder';

const getDebugVariant = (): SearchVariant | null => {
  const params = new URLSearchParams(window.location.search);
  const debugParam = params.get('debugVariant');
  if (
    debugParam === 'variant1related' ||
    debugParam === 'variant2recommended' ||
    debugParam === 'variant3hybrid' ||
    debugParam === 'variant4relatedAndMid' ||
    debugParam === 'variant5recommendedAndMid' ||
    debugParam === 'variant6hybridAndMid'
  ) {
    return debugParam;
  }
  return null;
};

const useMobileOJComponentOrder = (): OJComponentKey[] | null => {
  const [order, setOrder] = useState<OJComponentKey[] | null>(null);

  useEffect(() => {
    if (!onClient()) return undefined;

    const mediaQuery = window.matchMedia(
      `max-width: ${GROUP_3_MAX_WIDTH_BP}rem`,
    );
    const debugVariant = getDebugVariant();
    const mobileOrder = debugVariant
      ? SEARCH_COMPONENT_ORDER[debugVariant]
      : null;

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

export default useMobileOJComponentOrder;
