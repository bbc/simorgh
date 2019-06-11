import React from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalATIAnalytics from './canonical';
import AmpATIAnalytics from './amp';

const ATIAnalytics = props => {
  const { platform } = React.useContext(RequestContext);

  return platform === 'amp' ? (
    <AmpATIAnalytics {...props} />
  ) : (
    <CanonicalATIAnalytics {...props} />
  );
};

export default ATIAnalytics;
