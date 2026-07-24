import { SearchVariant } from './searchReferrerComponentOrder';

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
