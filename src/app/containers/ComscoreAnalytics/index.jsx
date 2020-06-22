import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import AmpComscoreAnalytics from './Amp';

const ComscoreAnalytics = () => {
  const { isAmp } = useContext(RequestContext);
  return isAmp ? <AmpComscoreAnalytics /> : null;
};

export default ComscoreAnalytics;
