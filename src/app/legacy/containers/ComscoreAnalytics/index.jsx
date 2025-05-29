import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

// TODO: if x-country US on AMP cache, `showCookieBannerBasedOnCountry` will be false; AmpComscoreAnalytics would be loaded?
const ComscoreAnalytics = () => {
  const { isAmp, showCookieBannerBasedOnCountry } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled || (isAmp && showCookieBannerBasedOnCountry)) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
