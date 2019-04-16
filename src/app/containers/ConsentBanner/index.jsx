import React from 'react';
import { RequestContextConsumer } from '../../contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = () => (
  <RequestContextConsumer>
    {({ platform }) => (platform === 'amp' ? <Amp /> : <Canonical />)}
  </RequestContextConsumer>
);

export default ConsentBanner;
