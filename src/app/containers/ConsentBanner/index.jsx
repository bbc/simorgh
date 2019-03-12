import React from 'react';
import { PlatformContextConsumer } from '../../contexts/PlatformContext';
import Canonical from './Canonical';

const ConsentBanner = () => (
  <PlatformContextConsumer>
    {platform => (platform === 'amp' ? null : <Canonical />)}
  </PlatformContextConsumer>
);

export default ConsentBanner;
