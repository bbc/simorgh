import React from 'react';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import Canonical from './Canonical';

const ConsentBanner = props => (
  <RequestContextConsumer>
    {({ platform }) => (platform === 'amp' ? null : <Canonical {...props} />)}
  </RequestContextConsumer>
);

export default ConsentBanner;
