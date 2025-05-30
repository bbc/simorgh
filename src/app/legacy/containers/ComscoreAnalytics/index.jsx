import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp } = useContext(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled || isAmp) {
    return null;
  }

  return <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
