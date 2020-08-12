import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';

const ComscoreAnalytics = () => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');
  if (!enabled) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : null;
};

export default ComscoreAnalytics;
