import React from 'react';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = () => (
  <PlatformContextConsumer>
    {platform => (platform === 'amp' ? <Amp /> : <Canonical />)}
  </PlatformContextConsumer>
);

export default ConsentBanner;
