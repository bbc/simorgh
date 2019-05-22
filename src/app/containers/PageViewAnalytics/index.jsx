import React from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import CanonicalPageViewAnalytics from './canonical';
import AmpPageViewAnalytics from './amp';

const PageViewAnalytics = props => {
  const { platform } = React.useContext(RequestContext);

  return platform === 'amp' ? (
    <AmpPageViewAnalytics {...props} />
  ) : (
    <CanonicalPageViewAnalytics {...props} />
  );
};

export default PageViewAnalytics;
