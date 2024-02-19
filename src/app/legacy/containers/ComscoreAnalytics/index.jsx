import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp, isLite } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled || isLite) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
