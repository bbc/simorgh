import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = () => {
  const { isAmp } = useContext(RequestContext);
  return isAmp ? <Amp /> : <Canonical />;
};

export default ConsentBanner;
