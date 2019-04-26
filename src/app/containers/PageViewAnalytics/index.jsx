import React from 'react';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import CanonicalPageViewAnalytics from './canonical';
import AmpPageViewAnalytics from './amp';

const PageViewAnalytics = props => (
  <RequestContextConsumer>
    {({ platform }) =>
      platform === 'amp' ? (
        <AmpPageViewAnalytics {...props} />
      ) : (
        <CanonicalPageViewAnalytics {...props} />
      )
    }
  </RequestContextConsumer>
);

export default PageViewAnalytics;
