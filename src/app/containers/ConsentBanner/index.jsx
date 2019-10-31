import React, { useContext } from 'react';
import loadable from '@loadable/component';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';

const Amp = loadable(() => import('./index.amp'));

const ConsentBanner = () => {
  const { platform } = useContext(RequestContext);
  return platform === 'amp' ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
