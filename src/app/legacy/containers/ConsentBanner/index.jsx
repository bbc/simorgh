import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const ConsentBanner = ({ onDismissFocusRef = null }) => {
  const { isAmp, isLite, showCookieBannerBasedOnCountry } = useContext(RequestContext);
  if (isLite || (isAmp && showCookieBannerBasedOnCountry)) return null;

  return isAmp ? <Amp /> : <Canonical onDismissFocusRef={onDismissFocusRef} />;
};

export default ConsentBanner;
