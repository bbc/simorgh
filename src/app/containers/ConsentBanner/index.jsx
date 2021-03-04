import React, { useContext, forwardRef } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = forwardRef(({ ...props }, onDismissFocusRef) => {
  const { isAmp } = useContext(RequestContext);
  return isAmp ? <Amp /> : <Canonical ref={onDismissFocusRef} {...props} />;
});

export default ConsentBanner;
