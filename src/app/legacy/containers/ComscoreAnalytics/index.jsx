import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp, isLow } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled) {
    return null;
  }

  return isAmp || isLow ? (
    <AmpComscoreAnalytics />
  ) : (
    <CanonicalComscoreAnalytics />
  );
};

export default ComscoreAnalytics;
