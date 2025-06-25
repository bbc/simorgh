import React, { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp, showCookieBannerBasedOnCountry } = use(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled || (isAmp && showCookieBannerBasedOnCountry)) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
