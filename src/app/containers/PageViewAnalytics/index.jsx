import React from 'react';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import Canonical from './Canonical';

const PageViewAnalytics = props => (
  <RequestContextConsumer>
    {({ platform }) => (platform === 'amp' ? null : <Canonical {...props} />)}
  </RequestContextConsumer>
);

export default PageViewAnalytics;
