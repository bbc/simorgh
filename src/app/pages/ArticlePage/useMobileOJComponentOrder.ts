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
    debugParam === 'variant_1_related' ||
    debugParam === 'variant_2_recommended' ||
    debugParam === 'variant_3_hybrid' ||
    debugParam === 'variant_4_related_mid' ||
    debugParam === 'variant_5_recommended_mid' ||
    debugParam === 'variant_6_hybrid_mid'
  ) {
    return debugParam;
  }
  return null;
};

export const useDebugVariant = (): SearchVariant | null => {
  const [debugVariant, setDebugVariant] = useState<SearchVariant | null>(null);

  useEffect(() => {
    if (!onClient()) return;

    setDebugVariant(getDebugVariant());
  }, []);

  return debugVariant;
};

const useMobileOJComponentOrder = (
  searchVariant: SearchVariant | null,
): OJComponentKey[] | null => {
  const [order, setOrder] = useState<OJComponentKey[] | null>(null);

  useEffect(() => {
    if (!onClient()) return undefined;

    const mediaQuery = window.matchMedia(
      `(max-width: ${GROUP_3_MAX_WIDTH_BP}rem)`,
    );

    const mobileOrder = searchVariant
      ? SEARCH_COMPONENT_ORDER[searchVariant]
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
  }, [searchVariant]);

  return order;
};

export default useMobileOJComponentOrder;
