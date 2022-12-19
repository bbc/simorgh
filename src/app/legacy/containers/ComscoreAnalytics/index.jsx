import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp, isNextJs } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  // TODO: Fix this for NextJS
  if (!enabled || isNextJs) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
