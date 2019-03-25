import React from 'react';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import Canonical from './index.canonical';

const ConsentBanner = () => (
  <RequestContextConsumer>
    {({ platform }) => (platform === 'amp' ? null : <Canonical />)}
  </RequestContextConsumer>
);

export default ConsentBanner;
